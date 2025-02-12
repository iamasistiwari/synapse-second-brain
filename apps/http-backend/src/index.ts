import express from "express";
import contentRouter from "./content";
import cookieParser from "cookie-parser";
import cors from "cors";
import middleware from "./middleware";
import checkEnv from "./helpers/checkEnvs";

checkEnv();

const app = express();
const PORT = 3001;

app.use(cors({ origin: "https://synapse.ashishtiwari.net", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use(middleware);
app.use("/v1/content", contentRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
