import Keyv from "keyv";
import got from "got";

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
const cache: Keyv<XPostType> = new Keyv({ store: new Map() });

export default async function fetchMeta(
  url: string
): Promise<XPostType | null> {
  try {
    const cachedData = await cache.get(url);
    if (cachedData) {
      return cachedData;
    }
    const { body } = (await got(
      `https://api.microlink.io?url=${encodeURIComponent(url)}`,
      { responseType: "json" }
    )) as unknown as XPostType;
    cache.set(url, { body }, 1000 * 60 * 60 * 24);
    return { body };
  } catch (error) {
    return null;
  }
}
