import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";

//?===========Import Routes=======

const app: Application = express();
const PORT: number = 5000; //! Should be placed in environment variables
const uri = "mongodb://127.0.0.1:27017/url-shortener"; //! Should be placed in environment variables

//?===========Middleware==========
app.use(express.json());

//?===========Enable CORS==========
app.use(cors());

//?===========Routes==============

app.all("*", (req, res) => {
    res.send("404!");
});

app.use(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        app.listen(PORT, () => {
            console.log(`Connected to DB & listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(`Failed to connect to server :: ${error}`);
    });
