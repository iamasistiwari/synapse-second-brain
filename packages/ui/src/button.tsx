"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
}

export const Button = ({ children, className }: ButtonProps) => {
  return (
    <button className="text-2xl" onClick={() => alert(`Hello from your app!`)}>
      {children}
    </button>
  );
};
