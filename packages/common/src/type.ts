import z from "zod";

export const zod = z;

export interface ReceivedContent extends ContentType {
  id: string;
  createdAt: string;
  Tags: { title: string }[];
}

export interface ContentType {
  type: "Note" | "Tweet" | "Link";
  title: string;
  description: string;
  url: string;
  tags: string[];
}
export const noteValidator = z.object({
  type: z.enum(["Note"]),
  title: z.string().min(5),
  description: z.string().min(5),
  tags: z.array(z.string()).min(1),
});

export const tweetLinkValidator = z.object({
  type: z.enum(["Tweet", "Link"]),
  url: z.string().url(),
  title: z.string().min(5),
  tags: z.array(z.string()).min(1),
});

export interface LinkType {
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

export interface SearchType {
  content_id: string;
  content_title: string;
  content_type: "Note" | "Tweet" | "Link";
  section_id: string;
  sections_content: string;
  similarity: number;
}

export type NoteType = z.infer<typeof noteValidator>;
export type tweetLinkValidator = z.infer<typeof tweetLinkValidator>;
