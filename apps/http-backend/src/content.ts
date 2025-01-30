import express, { Router, Request, Response } from "express";
import middleware from "./middleware";

const contentRouter: Router = express.Router();

contentRouter.use(middleware)
contentRouter.post("/add", (req: Request, res: Response) => {
  
});

export default contentRouter;
