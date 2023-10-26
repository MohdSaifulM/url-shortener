import { Router } from "express";
import { fetchAllClicks } from "../controllers/clickController";

const clickRoutes: Router = Router();

clickRoutes.get('/all/:urlId', fetchAllClicks);

export default clickRoutes;