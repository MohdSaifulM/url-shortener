import { Router } from "express";
import { createShortURL } from "../controllers/urlController";

const urlRoutes: Router = Router();

urlRoutes.post('/create', createShortURL);

export default urlRoutes;