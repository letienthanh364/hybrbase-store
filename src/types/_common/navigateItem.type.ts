import { ReactNode } from "react";

export interface NavigateItem {
  name: string;
  url: string;
  label?: ReactNode;
}
