import React, { ReactNode } from "react";
import MainHeader from "../MainHeader";
import MainFooter from "../MainFooter";

interface MainLayoutProps {
  children?: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />
      <main className="flex-1 bg-gray-100 items-center flex justify-center w-full">
        {children}
      </main>
      <MainFooter />
    </div>
  );
}
