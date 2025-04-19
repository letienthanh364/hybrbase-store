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
      <div className="flex-1 p-8">{children}</div>
      <MainFooter />
    </div>
  );
}
