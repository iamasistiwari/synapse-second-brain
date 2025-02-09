import Keyv from "keyv";
import got from "got";
import { LinkType } from "@repo/common/type";

const cache: Keyv<LinkType> = new Keyv({ store: new Map() });

export default async function fetchMeta(url: string): Promise<LinkType | null> {
  try {
    const cachedData = await cache.get(url);
    if (cachedData) {
      return cachedData;
    }
    const { body } = (await got(
      `https://api.microlink.io?url=${encodeURIComponent(url)}`,
      { responseType: "json", timeout: 800 },
    )) as unknown as LinkType;
    cache.set(url, { body }, 1000 * 60 * 60 * 24);
    return { body };
  } catch (error) {
    return null;
  }
}
