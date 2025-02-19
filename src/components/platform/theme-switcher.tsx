"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import * as React from "react";

import { Button } from "~/components/ui/button";

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();

  return (
    <>
      <Button
        size="icon"
        variant="neutral"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <Sun className="hidden dark:inline " />
        <Moon className="inline dark:hidden" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </>
  );
}
