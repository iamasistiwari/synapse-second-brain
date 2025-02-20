import React from 'react';
import { Brain, Link2, Search } from 'lucide-react';
import LoginDailog from '@/components/LoginDailog';
import Link from 'next/link';
export default function Page() {
  return (
    <div className="h-screen text-white">
      <div className="absolute inset-0 -z-10 h-screen w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <nav className="flex items-center justify-center transition-all duration-200 xl:mx-44">
        <div className="flex h-16 w-full items-center justify-between border-neutral-700 px-4 text-center text-lg xl:h-24 xl:border-b">
          <div className="flex items-center justify-center">
            <Brain className="h-6 w-6 text-custom-purple xl:h-10 xl:w-10" />
            <span className="pl-2 text-2xl font-semibold leading-10 tracking-wider text-slate-200">
              Synapse
            </span>
          </div>
          {/* Navbar Links */}
          <div className="hidden gap-x-6 rounded-2xl border border-neutral-700 px-6 py-1 opacity-80 xl:flex">
            <Link
              href={`https://github.com/iamasistiwari/synapse-second-brain`}
              target="_blank"
              className="transition-all duration-500 hover:cursor-pointer hover:text-purple-400"
            >
              GitHub
            </Link>
            <Link
              href={`https://x.com/iamasistiwari`}
              target="_blank"
              className="transition-all duration-500 hover:cursor-pointer hover:text-purple-400"
            >
              Twitter
            </Link>
          </div>
          <div>
            <LoginDailog />
          </div>
        </div>
      </nav>
      <main className="mt-16">
        <div className="flex flex-col items-center justify-center">
          <div className="inline-block text-4xl font-thin xl:text-[80px]">
            Simplify Your Brain
          </div>
          <div className="mt-10 px-10 text-center text-sm tracking-tight text-neutral-400 xl:max-w-[40vw] xl:text-xl">
            Your second brain for storing and connecting notes, links, and
            tweets with powerful vector search capabilities.
          </div>
        </div>
      </main>

      <div className="mt-20 flex flex-col space-y-2 px-8 text-neutral-400 xl:hidden">
        <li>Second brain</li>
        <li>Responsive UI</li>
        <li>Saves your link notes with novel editor</li>
        <li>Vector search</li>
        <li>Auto link metadata fetching.</li>
      </div>

      <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 transform items-center justify-center gap-x-6 rounded-2xl border px-6 py-1 opacity-50 xl:hidden">
        <Link
          href={`https://github.com/iamasistiwari/synapse-second-brain`}
          target="_blank"
          className="transition-all duration-500 hover:cursor-pointer hover:text-purple-400"
        >
          GitHub
        </Link>
        <Link
          href={`https://x.com/iamasistiwari`}
          target="_blank"
          className="transition-all duration-500 hover:cursor-pointer hover:text-purple-400"
        >
          Twitter
        </Link>
      </div>
      <div className="mt-20 hidden flex-row justify-center opacity-85 transition-all duration-200 xl:flex xl:space-x-20">
        <div className="flex flex-col rounded-lg border border-neutral-700 p-2 text-start transition-all duration-500 hover:cursor-pointer hover:border-purple-400">
          <div className="flex items-center">
            <Search className="h-6 w-6 font-semibold" />
            <span className="pl-2 font-semibold xl:text-2xl">
              Vector Search
            </span>
          </div>
          <span className="pl-2 text-neutral-400 xl:max-w-[20vw]">
            Find exactly what you need with <br></br>AI-powered vector
            embeddings search that understands context.
          </span>
        </div>
        <div className="flex flex-col rounded-lg border border-neutral-700 p-2 text-start transition-all duration-500 hover:cursor-pointer hover:border-purple-400">
          <div className="flex items-center">
            <Link2 className="h-6 w-6 font-semibold" />
            <span className="pl-2 font-semibold xl:text-2xl">Metdata</span>
          </div>
          <span className="pl-2 text-neutral-400 xl:max-w-[20vw]">
            It saves your links with auto-fetched metadata, allowing you to
            search them using embeddings.
          </span>
        </div>
      </div>

      {/* needs to work on landing page still */}

      {/* <div className="flex items-center justify-center bg-[#0d1116] h-screen mt-52">
        <div className="flex flex-col items-center justify-center">
          <div>
            <div className="relative h-[450px] w-[700px]">
              <Image src={'/ds.png'} alt="desktop-version" fill className="" />
            </div>
          </div>
          <span>Desktop UI</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div>
            <div className="relative h-[550px] w-[300px]">
              <Image src={'/mb.png'} alt="desktop-version" fill className="" />
            </div>
          </div>
          <span>Mobile UI</span>
        </div>
      </div> */}
    </div>
  );
}
