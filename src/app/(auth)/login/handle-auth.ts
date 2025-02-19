"use server";

import { signIn, signOut } from "~/auth";
import { DEFAULT_REDIRECT } from "~/lib/routes";

export const handleLogin = async () => {
  await signIn("github", {
    redirect: true,
    redirectTo: DEFAULT_REDIRECT,
  });
};

export const handleLogout = async () => {
  await signOut({
    redirect: true,
    redirectTo: "/login",
  });
};
