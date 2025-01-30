import express, { Request, Response } from "express";
import contentRouter from "./content";
import metaRouter from "./metadata.js";
import cookieParser from "cookie-parser";
import cors from "cors";



const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));


app.use("/api/v1/content", contentRouter);
app.use("/api/v1/metadata", metaRouter);



app.listen(3001, () => {
  console.log("Server is listing on 3001");
});
