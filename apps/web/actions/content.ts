'use server';
import getAPI from '@/lib/api';
import { authOptions } from '@/lib/auth';
import { ContentType, ReceivedContent, SearchType } from '@repo/common/type';
import { getServerSession } from 'next-auth';
import { cookies } from 'next/headers';
import revalidate from './revalidate';


interface ReceivedData {
  message: string;
  error: string;
  content?: SearchType[];
}

const API_URL = getAPI();

export async function getContents(): Promise<ReceivedContent[] | null> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  try {
    const res = await fetch(`${API_URL}/api/v1/content/get/all`, {
      method: 'GET',
      headers: {
        Cookie: (await cookies()).toString(),
      },
      credentials: 'include',
      cache: 'force-cache',
      next: {
        tags: ['contents'],
      },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`Error is ${data.error}`);
    }
    const content = data.content as ReceivedContent[];
    return content;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log('Something went wrong');
    }
    return null;
  }
}

export async function getTweets(): Promise<ReceivedContent[] | null> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  try {
    const res = await fetch(`${API_URL}/api/v1/content/get/tweets`, {
      method: 'GET',
      headers: {
        Cookie: (await cookies()).toString(),
      },
      cache: 'force-cache',
      credentials: 'include',
      next: {
        tags: ['contents'],
      },
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(`Error is ${data.error}`);
    }
    const content = data.content as ReceivedContent[];
    return content;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log('Something went wrong');
    }
    return null;
  }
}

export async function getLinks(): Promise<ReceivedContent[] | null> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  try {
    const res = await fetch(`${API_URL}/api/v1/content/get/links`, {
      method: 'GET',
      headers: {
        Cookie: (await cookies()).toString(),
      },
      cache: 'force-cache',
      credentials: 'include',
      next: {
        tags: ['contents'],
      },
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(`Error is ${data.error}`);
    }
    const content = data.content as ReceivedContent[];
    return content;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log('Something went wrong');
    }
    return null;
  }
}

export async function getNotes(): Promise<ReceivedContent[] | null> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }

  try {
    const res = await fetch(`${API_URL}/api/v1/content/get/notes`, {
      method: 'GET',
      headers: {
        Cookie: (await cookies()).toString(),
      },
      cache: 'force-cache',
      credentials: 'include',
      next: {
        tags: ['contents'],
      },
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(`Error is ${data.error}`);
    }
    const content = data.content as ReceivedContent[];
    return content;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log('Something went wrong');
    }
    return null;
  }
}

export async function getContent(
  contentId: string
): Promise<ReceivedContent[] | null> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }

  try {
    const res = await fetch(
      `${API_URL}/api/v1/content/get/content/${contentId}`,
      {
        method: 'GET',
        headers: {
          Cookie: (await cookies()).toString(),
        },
        cache: 'force-cache',
        credentials: 'include',
        next: {
          tags: ['contents'],
        },
      }
    );

    const data = await res.json();
    if (!res.ok) {
      throw new Error(`Error is ${data.error}`);
    }
    const parsedContent: ReceivedContent[] = [];
    const content = data.content as unknown as ReceivedContent[];
    if (!Array.isArray(content)) {
      parsedContent.push(content);
      return parsedContent;
    } else {
      return content;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log('Something went wrong');
    }
    return null;
  }
}

export async function submitContent(data: ContentType): Promise<ReceivedData> {
  try {
    const res = await fetch(`${API_URL}/api/v1/content/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: (await cookies()).toString(),
      },
      credentials: 'include',

      body: JSON.stringify(data),
    });
    const parseRes = await res.json();
    revalidate();
    if (!res.ok) {
      return {
        message: '',
        error: parseRes.error,
      };
    }
    const response = parseRes as ReceivedData;
    return response;
  } catch (error) {
    return {
      message: '',
      error: 'Something went wrong',
    };
  }
}

export async function askContent({
  data,
}: {
  data: string;
}): Promise<ReceivedData> {
  try {
    const res = await fetch(`${API_URL}/api/v1/content/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: (await cookies()).toString(),
      },
      credentials: 'include',
      cache: 'no-cache',
      body: JSON.stringify({ data: data }),
    });
    const parseRes = await res.json();
    if (!res.ok) {
      return {
        message: '',
        error: parseRes.error,
      };
    }
    return {
      message: '',
      error: '',
      content: parseRes.message as unknown as SearchType[],
    };
  } catch (error) {
    return {
      message: '',
      error: 'Something went wrong',
    };
  }
}
