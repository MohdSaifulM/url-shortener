import { Router } from "express";
import { createShortURL, fetchAllURLs } from "../controllers/urlController";

const urlRoutes: Router = Router();

urlRoutes.post('/create', createShortURL);

urlRoutes.get('/all', fetchAllURLs);

export default urlRoutes;