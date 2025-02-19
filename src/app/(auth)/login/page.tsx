"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { handleLogin, handleLogout } from "./handle-auth";
import { useSession } from "next-auth/react";
import { LogOutIcon } from "lucide-react";

export default function LoginPage() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center">
      <Card>
        <CardHeader>
          <CardTitle>Login to My Uptime</CardTitle>
          <CardDescription>
            Please use your Github account to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            size="lg"
            className="w-full"
            variant="neutral"
            onClick={handleLogin}
            disabled={!!session}
          >
            <FaGithub size={8} />
            Login with Github
          </Button>
          {!!session && (
            <div className="p-2">
              <p>You are already logged in</p>
            </div>
          )}
        </CardContent>
        {!!session && (
          <CardFooter>
            <Button
              size="lg"
              className="w-full"
              variant="neutral"
              onClick={handleLogout}
            >
              <LogOutIcon />
              Sign out
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
