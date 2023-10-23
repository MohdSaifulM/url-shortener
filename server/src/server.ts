import express, { Application, NextFunction, Request, Response } from "express";
import { catchAsync } from "./middleware/catchAsync";
import url from "./models/url";
import mongoose from "mongoose";
import config from 'config';
import cors from "cors";

//?===========Import Routes=======
import urlRoutes from "./routes/urlRoutes";

const app: Application = express();
const base = '/api/v1';
const PORT: number = config.get("SERVER_PORT");
const uri = config.get("MONGODB_URI") as string;

//?===========Middleware==========
app.use(express.json());

//?===========Enable CORS==========
app.use(cors());

//?===========Routes==============
app.get('/:short_url', catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const urlEntry = await url.findOne({ short_url: req.params.short_url }, { original_url: 1, _id: 0 });
    if (urlEntry) return res.redirect(urlEntry.original_url);
    else next();
}));

app.use(`${base}/url`, urlRoutes);

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
