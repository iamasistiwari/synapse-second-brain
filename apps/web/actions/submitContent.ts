'use server'
import { ContentType } from '@repo/common/type';
import { cookies } from 'next/headers';

interface ReceivedData {
    message: string,
    error: string
}

export default async function submitContent(data: ContentType): Promise<ReceivedData> {
  try {
    const res = await fetch(
      `https://api-synapse.ashishtiwari.net/api/v1/content/add`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: (await cookies()).toString(),
        },
        credentials: 'include',
        body: JSON.stringify(data),
      }
    );
    const parseRes = await res.json();
    if(!parseRes.ok){
        return {
            message: "",
            error: parseRes.error
        }
    }
    const response = parseRes as ReceivedData;
    return response;
  } catch (error) {
    return {
        message: "",
        error: "Something went wrong"
    }
  }
}
