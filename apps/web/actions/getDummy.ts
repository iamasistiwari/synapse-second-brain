// import { ReceivedContent } from "@repo/common/type";

// export function getDummy(): ReceivedContent[] {
//   const contents: ReceivedContent[] = [
//     {
//       id: '8faa64bb-2949-4ad1-ad77-8819de0b8874',
//       type: 'Tweet',
//       url: 'https://x.com/takeUforward_/status/1887174779947589713',
//       title: 'funny joke',
//       description:
//         '{"lang":"en","author":"takeUforward (takeUforward_)","title":"@takeUforward_ on X","publisher":"X","image":{"url":"https://pbs.twimg.com/media/GjCXdN6a4AAW8hP.jpg:large","type":"jpg","size":85276,"height":756,"width":500,"size_pretty":"85.3 kB"},"date":"2025-02-07T09:10:33.000Z","url":"https://x.com/takeUforward_/status/1887174779947589713","description":"😶‍🌫️","logo":{"url":"https://abs.twimg.com/favicons/twitter.3.ico","type":"png","size":549,"height":32,"width":32,"size_pretty":"549 B"}}',
//       createdAt: '2025-02-07T09:10:34.647743',
//       Tags: [{ title: 'hello' }],
//       tags: [],
//     },
//     {
//       id: 'c2922fcf-b505-4b9c-86c9-7a9f01324c59',
//       type: 'Link',
//       url: 'https://youtu.be/rCkpobSlTf8?si=5GcJAVcYUexxSarL',
//       title: 'desk setup best video',
//       description:
//         '{"lang":"en","author":"Andrew Ethan Zeng","title":"The DREAM Home Office Transformation & Desk Setup!","publisher":"YouTube","image":{"url":"https://i.ytimg.com/vi/rCkpobSlTf8/maxresdefault.jpg","type":"jpg","size":167881,"height":720,"width":1280,"size_pretty":"168 kB"},"date":"2024-06-04T15:01:01.000Z","url":"https://www.youtube.com/watch?v=rCkpobSlTf8","description":"Here’s the DIY transformation of an empty room in the house to a cozy, productive home office and desk setup! After 8 weeks and moving out of the studio spac…","logo":{"url":"https://www.youtube.com/s/desktop/56c1e4db/img/logos/favicon_144x144.png","type":"png","size":5020,"height":144,"width":144,"size_pretty":"5.02 kB"}}',
//       createdAt: '2025-02-06T14:26:42.239888',
//       Tags: [{ title: 'hello' }],
//       tags: [],
//     },
//     {
//       id: 'bbca8738-b38b-47b8-b7eb-8a247048132f',
//       type: 'Link',
//       url: 'https://drive.google.com/drive/my-drive',
//       title: 'drive imp project list',
//       description:
//         '{"lang":"en","author":null,"title":"Google Drive: Sign-in","publisher":"google.com","image":null,"date":"2025-02-07T06:24:49.000Z","url":"https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fdrive.google.com%2Fdrive%2Fmy-drive&followup=https%3A%2F%2Fdrive.google.com%2Fdrive%2Fmy-drive&ifkv=ASSHykqXSs4B9uykfrSAP2W6NNzx8rxFd6pOdZ8zsKac_NB7xxaz3gZulNAshM2kdeZTvpaujLXc-Q&osid=1&passive=1209600&service=wise&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S909197926%3A1738909488928342&ddm=1","description":"Access Google Drive with a Google account (for personal use) or Google Workspace account (for business use).","logo":{"url":"https://www.google.com/favicon.ico","type":"ico","size":5430,"height":16,"width":16,"size_pretty":"5.43 kB"}}',
//       createdAt: '2025-02-07T08:07:24.040562',
//       Tags: [{ title: 'hello' }],
//       tags: [],
//     },
//     {
//       id: 'bbca8738-b38b-47b8-b7eb-8a247048132f',
//       type: 'Link',
//       url: 'https://drive.google.com/drive/my-drive',
//       title: 'drive imp project list',
//       description:
//         '{"lang":"en","author":null,"title":"Google Drive: Sign-in","publisher":"google.com","image":null,"date":"2025-02-07T06:24:49.000Z","url":"https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fdrive.google.com%2Fdrive%2Fmy-drive&followup=https%3A%2F%2Fdrive.google.com%2Fdrive%2Fmy-drive&ifkv=ASSHykqXSs4B9uykfrSAP2W6NNzx8rxFd6pOdZ8zsKac_NB7xxaz3gZulNAshM2kdeZTvpaujLXc-Q&osid=1&passive=1209600&service=wise&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S909197926%3A1738909488928342&ddm=1","description":"Access Google Drive with a Google account (for personal use) or Google Workspace account (for business use).","logo":{"url":"https://www.google.com/favicon.ico","type":"ico","size":5430,"height":16,"width":16,"size_pretty":"5.43 kB"}}',
//       createdAt: '2025-02-07T08:07:24.040562',
//       Tags: [{ title: 'hello' }],
//       tags: [],
//     },
//     {
//       id: 'bbca8738-b38b-47b8-b7eb-8a247048132f',
//       type: 'Link',
//       url: 'https://drive.google.com/drive/my-drive',
//       title: 'drive imp project list',
//       description:
//         '{"lang":"en","author":null,"title":"Google Drive: Sign-in","publisher":"google.com","image":null,"date":"2025-02-07T06:24:49.000Z","url":"https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fdrive.google.com%2Fdrive%2Fmy-drive&followup=https%3A%2F%2Fdrive.google.com%2Fdrive%2Fmy-drive&ifkv=ASSHykqXSs4B9uykfrSAP2W6NNzx8rxFd6pOdZ8zsKac_NB7xxaz3gZulNAshM2kdeZTvpaujLXc-Q&osid=1&passive=1209600&service=wise&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S909197926%3A1738909488928342&ddm=1","description":"Access Google Drive with a Google account (for personal use) or Google Workspace account (for business use).","logo":{"url":"https://www.google.com/favicon.ico","type":"ico","size":5430,"height":16,"width":16,"size_pretty":"5.43 kB"}}',
//       createdAt: '2025-02-07T08:07:24.040562',
//       Tags: [{ title: 'hello' }],
//       tags: [],
//     },
//     {
//       id: 'bbca8738-b38b-47b8-b7eb-8a247048132f',
//       type: 'Link',
//       url: 'https://drive.google.com/drive/my-drive',
//       title: 'drive imp project list',
//       description:
//         '{"lang":"en","author":null,"title":"Google Drive: Sign-in","publisher":"google.com","image":null,"date":"2025-02-07T06:24:49.000Z","url":"https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fdrive.google.com%2Fdrive%2Fmy-drive&followup=https%3A%2F%2Fdrive.google.com%2Fdrive%2Fmy-drive&ifkv=ASSHykqXSs4B9uykfrSAP2W6NNzx8rxFd6pOdZ8zsKac_NB7xxaz3gZulNAshM2kdeZTvpaujLXc-Q&osid=1&passive=1209600&service=wise&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S909197926%3A1738909488928342&ddm=1","description":"Access Google Drive with a Google account (for personal use) or Google Workspace account (for business use).","logo":{"url":"https://www.google.com/favicon.ico","type":"ico","size":5430,"height":16,"width":16,"size_pretty":"5.43 kB"}}',
//       createdAt: '2025-02-07T08:07:24.040562',
//       Tags: [{ title: 'hello' }],
//       tags: [],
//     },
//     {
//       id: '53ecf901-2f8d-4ba2-9467-4d5eb0ee99bd',
//       type: 'Note',
//       url: '',
//       title: 'Codes block',
//       description:
//         '# GOOD TO SEE SOMETHING \n' +
//         '\n' +
//         '# i am good guy\n' +
//         '\n' +
//         '- 8 pm go to gym \n' +
//         '- 9pm eat breakfast\n' +
//         '- study\n' +
//         '- study more\n' +
//         '\n' +
//         '  ```\n' +
//         '  something() {\n' +
//         '  //inside here you can call your components\n' +
//         '  }\n' +
//         '  ```\n' +
//         '\n' +
//         '> where they are\n' +
//         '>\n' +
//         '> now i can see\n' +
//         '>\n' +
//         '> you \n' +
//         '>\n' +
//         '> ## now they are arguing\n' +
//         '\n' +
//         '```typescript\n' +
//         'export async function getNotes(): Promise<ReceivedContent[] | null> {\n' +
//         '  const session = await getServerSession(authOptions);\n' +
//         '  if (!session) {\n' +
//         '    return null;\n' +
//         '  }\n' +
//         '\n' +
//         '  try {\n' +
//         '    const res = await fetch(`http://localhost:3001/api/v1/content/get/notes`, {\n' +
//         "      method: 'GET',\n" +
//         '      headers: {\n' +
//         '        Cookie: (await cookies()).toString(),\n' +
//         '      },\n' +
//         "      cache: 'force-cache',\n" +
//         "      credentials: 'include',\n" +
//         '      next: {\n' +
//         "        tags: ['contents'],\n" +
//         '      },\n' +
//         '    });\n' +
//         '\n' +
//         '    const data = await res.json();\n' +
//         '    if (!res.ok) {\n' +
//         '      throw new Error(`Error is ${data.error}`);\n' +
//         '    }\n' +
//         '    const content = data.content as ReceivedContent[];\n' +
//         '    return content;\n' +
//         '  } catch (error) {\n' +
//         "    error instanceof Error ? error.message : 'Something went wrong';\n" +
//         '    console.log(error);\n' +
//         '    return null;\n' +
//         '  }\n' +
//         '}\n' +
//         '```',
//       createdAt: '2025-02-07T12:49:10.331317',
//       Tags: [{ title: 'hello' }, { title: 'production' }],
//       tags: [],
//     },
//     {
//       id: '3066c64f-7797-48c5-a473-be681da27eab',
//       type: 'Tweet',
//       url: 'https://x.com/kirat_tw/status/1887162702482882972',
//       title: 'Super30 news',
//       description:
//         '{"lang":"en","author":"Harkirat Singh (kirat_tw)","title":"@kirat_tw on X","publisher":"X","image":{"url":"https://pbs.twimg.com/media/GjCMcPBXAAAev4K.jpg:large","type":"jpg","size":358193,"height":1066,"width":1600,"size_pretty":"358 kB"},"date":"2025-02-05T16:44:41.000Z","url":"https://x.com/kirat_tw/status/1887162702482882972","description":"Thanks @ShriKaranHanda for dropping by Super 30","logo":{"url":"https://abs.twimg.com/favicons/twitter.3.ico","type":"png","size":549,"height":32,"width":32,"size_pretty":"549 B"}}',
//       createdAt: '2025-02-05T16:44:43.104795',
//       Tags: [{ title: 'hello' }, { title: 'Good' }],
//       tags: [],
//     },
//     {
//       id: '9ab492c3-72f4-4568-8db6-8163ff0c469f',
//       type: 'Link',
//       url: 'https://tailwindcss.com/docs/display',
//       title: 'import display property of tailwind',
//       description:
//         '{"lang":"en","author":null,"title":"display - Layout","publisher":"tailwindcss.com","image":{"url":"https://tailwindcss.com/api/og?path=/docs/display","type":"png","size":207952,"height":630,"width":1200,"size_pretty":"208 kB"},"date":"2025-02-07T08:34:11.000Z","url":"https://tailwindcss.com/docs/display","description":"Utilities for controlling the display box type of an element.","logo":{"url":"https://tailwindcss.com/favicons/apple-touch-icon.png?v=4","type":"png","size":2745,"height":180,"width":180,"size_pretty":"2.75 kB"}}',
//       createdAt: '2025-02-07T08:34:15.644001',
//       Tags: [{ title: 'hello' }, { title: 'Good' }],
//       tags: [],
//     },
//     {
//       id: 'c0e1695d-6ed9-4c5d-a1cf-c5bfd335b610',
//       type: 'Tweet',
//       url: 'https://x.com/mannupaaji/status/1887563091694788813',
//       title: 'Good project',
//       description:
//         '{"lang":"en","author":"Manu Arora (mannupaaji)","title":"@mannupaaji on X","publisher":"X","image":{"url":"https://pbs.twimg.com/profile_images/1417752099488636931/cs2R59eW_400x400.jpg","type":"jpg","size":22365,"height":400,"width":400,"size_pretty":"22.4 kB"},"date":"2025-02-07T05:55:21.000Z","url":"https://x.com/mannupaaji/status/1887563091694788813","description":"If someone is not going to build a platform where frontend engineers can practice for tech interviews with test cases, get help from AI somehow (not answers), implement best coding practices and pair program with other coders I will.","logo":{"url":"https://abs.twimg.com/favicons/twitter.3.ico","type":"png","size":549,"height":32,"width":32,"size_pretty":"549 B"}}',
//       createdAt: '2025-02-07T05:55:22.413246',
//       Tags: [{ title: 'hello' }, { title: 'Good' }],
//       tags: [],
//     },
//   ];
//   return contents;
// }
