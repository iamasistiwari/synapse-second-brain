'use server';

import { authOptions } from '@/lib/auth';
import { ReceivedContent } from '@repo/common/type';
import { getServerSession } from 'next-auth';
import { cookies } from 'next/headers';


export async function getContent(): Promise<ReceivedContent[] | null> {
  console.log("REQUEST CAME")
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }

  try {
    const res = await fetch(`http://localhost:3001/api/v1/content/get/all`, {
      method: 'GET',
      headers: {
        Cookie: (await cookies()).toString()
      },
      credentials: 'include',
    });
    
    const data = await res.json();
    if(!res.ok){
        throw new Error(`Error is ${data.error}`)
    }
    const content = data.content as ReceivedContent[]
    return content;
  } catch (error) {
    error instanceof Error? error.message : "Something went wrong"
    console.log(error)
    return null;
  }
}
