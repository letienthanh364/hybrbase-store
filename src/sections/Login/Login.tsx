"use client";

import React from "react";
import { useLoginMethodStore } from "./_stores/useLoginMethods.store";
import LoginMethods from "./_children/LoginMethods";
import LoginWithEmail from "./_children/LoginWithEmail";

export default function Login() {
  const { currentMethod } = useLoginMethodStore();

  return currentMethod === "social" ? <LoginMethods /> : <LoginWithEmail />;
}
