import express, { Router, Request, Response } from "express";
import { ContentType, tweetLinkValidator } from "@repo/common/type";
import { zod } from "@repo/common/type";
import { supabase } from "@repo/db/supabase";
import { title } from "process";
import getMeta from "./getMeta";


const contentRouter: Router = express.Router();

contentRouter.post("/add", async (req: Request, res: Response) => {
  try {
    console.log("USER ID", req.userId)
    console.log("BODY", req.body)
    const body: ContentType = req.body;

    if (body.type === "Link" || body.type === "Tweet") {
      const validation = tweetLinkValidator.safeParse(body);
      if (!validation.success) {
        const errorss = validation.error.issues.map((issue) => issue.message);
        res.status(400).json({
          message: "Invalid payload",
          error: errorss.map((issue) => issue),
        });
        return;
      }

      const metadata = await getMeta(validation.data.url)
      if(!metadata){
        res.status(400).json({
          message: "Something wrong with the url",
          error: "Cannot able to fetch the url",
        });
        return;
      }
      const userTitle = validation.data.title
      const urlTitle = metadata.body.data.title

      // send the backend request
      const { data: Content, error: ContentError } = await supabase
        .from("Content")
        .insert([
          {
            userId: req.userId,
            type: validation.data.type,
            title: userTitle,
            url: validation.data.url,
            description: JSON.stringify(metadata.body.data)
          },
        ])
        .select("id")
        .single();
      if (ContentError) {
        res.status(400).json({
          message: "Invalid payload",
          error: ContentError.message,
        });
        return;
      }
      const tagsToInsert = validation.data.tags.map((tag) => ({
        title: tag,
        contentId: Content?.id,
      }));

      const { data: Tags, error: TagError } = await supabase
        .from("Tags")
        .upsert(tagsToInsert, {
          onConflict: "title"
        });


      if (TagError) {
        res.status(400).json({
          message: "Invalid payload",
          error: TagError.message,
        });
        return;
      }
      res.status(200).json({
        message: "Successfull",
        error: "",
      });
      return 
    }

    if (body.type === "Note") {
    }
    res.status(400).json({
      message: "Invalid payload",
      error: "Provide correct payload",
    });
    return;
  } catch (error) {
    if (error instanceof zod.ZodError) {
      const errorss = error.issues.map((issue) => issue.message);
      res.status(400).json({
        message: "Invalid payload",
        error: errorss.map((issue) => issue),
      });
      return;
    }
    res.status(500).json("Something went wrong");
    return;
  }
});

export default contentRouter;
