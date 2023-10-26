import express, { Application, NextFunction, Request, Response } from "express";
import { catchAsync } from "./middleware/catchAsync";
import url from "./models/url";
import click from "./models/click";
import { ClickType } from "./types/clickType";
import mongoose from "mongoose";
import config from 'config';
import cors from "cors";
import useragent from 'express-useragent';
import IPinfoWrapper, { IPinfo } from "node-ipinfo";

//?===========Import Routes=======
import urlRoutes from "./routes/urlRoutes";
import clickRoutes from "./routes/clickRoutes";

const app: Application = express();
const base = '/api/v1';
const PORT: number = config.get("SERVER_PORT");
const uri = config.get("MONGODB_URI") as string;
const ipinfoWrapper = new IPinfoWrapper("6b772a5c97a017");

//?===========Middleware==========
app.use(express.json());
app.use(useragent.express());

//?===========Enable CORS==========
app.use(cors());

//?===========Routes==============

// Handle the redirection of short url
app.get('/:short_url', catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const urlEntry = await url.findOne({ short_url: req.params.short_url }, { original_url: 1, _id: 1, short_url: 1 });
    if (urlEntry) {
        // Obtain client's IP
        const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        // Perform IP geolocation lookup
        const response: IPinfo = await ipinfoWrapper.lookupIp(clientIp && clientIp !== '::1' ? clientIp.toString() : "8.8.8.8");

        if (response) {
            // Create click payload
            const payload = {
                location: {
                    country: response.country,
                    state: response.region,
                    city: response.city
                },
                deviceType: req.useragent?.isMobile ? 'mobile' : req.useragent?.isTablet ? 'tablet' : 'desktop',
                browser: req.useragent?.browser,
                operatingSystem: req.useragent?.os,
                urlId: urlEntry._id
            }
            // Save new click document
            const newClick: ClickType = await click.create(payload);
            // Push click to url
            if (newClick) {
                const updatedUrl = await url.updateOne({
                    _id: urlEntry._id
                }, {
                    $addToSet: {
                        clicks: newClick._id
                    }
                });
                if (updatedUrl) {
                    console.log(`Successfully added click to url :: ${urlEntry.short_url}`);
                } else {
                    console.error(`Error adding click to url :: ${urlEntry.short_url}`);
                }
            } else {
                console.error("Error creating new click");
            }
        } else {
            console.error(`Error retrieving ip info :: ${clientIp}`);
        }
        return res.redirect(urlEntry.original_url);
    } else {
        next();
    }
}));

app.use(`${base}/url`, urlRoutes);
app.use(`${base}/click`, clickRoutes);

app.all("*", (req, res) => {
    res.send("404!");
});

app.use(
    (err: any | unknown, req: Request, res: Response) => {
        const { status = 500 } = err;
        res.status(status).send(err.message);
    },
);

//?===========Connect=============
mongoose.set("strictQuery", false);

mongoose
    .connect(uri)
    .then(() => {
        const nodeEnv = config.get('NODE_ENV');
        console.log(`Current NODE_ENV: ${nodeEnv}`);
        app.listen(PORT, () => {
            console.log(`Connected to DB & listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(`Failed to connect to server :: ${error}`);
    });
