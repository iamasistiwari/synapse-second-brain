import express, { Router, Request, Response } from "express";
import Keyv from "keyv";
import got from "got";

const metaRouter: Router = express.Router();
const cache = new Keyv({ store: new Map() });

interface XPostType {
  body: {
    data: {
      author: string;
      title: string;
      publisher: string;
      image: {
        url: string;
      };
      date: string;
      url: string;
      description: string;
      logo: {
        url: string;
      };
    };
  };
}

metaRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { url } = req.body;
    if (!url) {
      res.status(400).json("URL is required");
      return;
    }
    const cachedData = await cache.get(url);
    if (cachedData) {
      res.status(200).json(cachedData);
      return;
    }
    const { body } = (await got(
      `https://api.microlink.io?url=${encodeURIComponent(url)}`,
      { responseType: "json" }
    )) as unknown as XPostType;
    cache.set(url, body.data, 1000 * 60 * 60 * 24);
    res.status(200).json(body.data);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong. Check url" });
  }
});

export default metaRouter;
