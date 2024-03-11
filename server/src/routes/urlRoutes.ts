import { Router } from "express";
import { createShortURL, fetchAllURLs, deleteURL } from "../controllers/urlController";

const urlRoutes: Router = Router();

urlRoutes.post('/create', createShortURL);

urlRoutes.get('/all/:userId', fetchAllURLs);

urlRoutes.delete('/delete/:urlId', deleteURL);

export default urlRoutes;
