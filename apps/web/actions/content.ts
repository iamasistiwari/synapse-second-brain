'use server';
import { authOptions } from '@/lib/auth';
import { ReceivedContent } from '@repo/common/type';
import { getServerSession } from 'next-auth';
import { cookies } from 'next/headers';

export async function getContents(): Promise<ReceivedContent[] | null> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  try {
    const res = await fetch(
      `https://api-synapse.ashishtiwari.net/api/v1/content/get/all`,
      {
        method: 'GET',
        headers: {
          Cookie: (await cookies()).toString(),
        },
        credentials: 'include',
        cache: 'force-cache',
        next: {
          tags: ['contents'],
        },
      }
    );
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
    const res = await fetch(`https://api-synapse.ashishtiwari.net/api/v1/content/get/tweets`, {
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
    const res = await fetch(`https://api-synapse.ashishtiwari.net/api/v1/content/get/links`, {
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
    const res = await fetch(`https://api-synapse.ashishtiwari.net/api/v1/content/get/notes`, {
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
      `https://api-synapse.ashishtiwari.net/api/v1/content/get/content/${contentId}`,
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
