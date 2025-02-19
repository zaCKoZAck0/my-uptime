import Link from "next/link";

import { MobileDrawer } from "~/components/platform/mobile-drawer";
import { ThemeSwitcher } from "~/components/platform/theme-switcher";
import { buttonVariants } from "../ui/button";
import { FaGithub } from "react-icons/fa6";
import { auth } from "~/auth";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Menu } from "lucide-react";

export async function Navbar() {
  const session = await auth();

  return (
    <nav className="fixed left-0 top-0 z-20 mx-auto flex py-3 w-full items-center border-b-4 border-border dark:border-darkNavBorder bg-white dark:bg-secondaryBlack px-5 m500:h-16 ">
      <div className="mx-auto flex container dark:text-darkText text-text max-w-full items-center justify-between">
        <MobileDrawer />

        <div className="flex items-center gap-10">
          <Link
            className="text-[30px] h-11 w-11 rounded-base flex bg-main text-text border-2 border-black m500:w-9 m500:h-9 m500:text-[22px] items-center justify-center font-heading"
            href={"/"}
          >
            N
          </Link>

          <div className="flex items-center gap-10 m1100:gap-8 m900:hidden">
            <Link className="text-xl m1100:text-base font-base" href="/docs">
              Docs
            </Link>

            <Link
              className="text-xl m1100:text-base font-base"
              href="/components/accordion"
            >
              Components
            </Link>

            <Link
              className="text-xl m1100:text-base font-base"
              href="/templates"
            >
              Templates
            </Link>

            <Link
              className="text-xl m1100:text-base font-base"
              href="/showcase"
            >
              Showcase
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-5 m1000:gap-5">
          <div className="flex items-center justify-end gap-5 m800:w-[unset] m400:gap-3">
            <a
              target="_blank"
              href="https://twitter.com/samuelbreznjak"
              className={buttonVariants({ variant: "neutral", size: "icon" })}
            >
              <FaGithub />
            </a>

            <ThemeSwitcher />
            <a
              target="_blank"
              href="https://github.com/ekmas/neobrutalism-components"
              className={buttonVariants({ variant: "neutral" })}
            >
              <Avatar className="size-6">
                <AvatarImage src={session?.user?.image ?? ""} />
                <AvatarFallback>
                  {(session?.user.name && session?.user.name[0]) ?? ""}
                </AvatarFallback>
              </Avatar>
              <Menu />
              <span className="sr-only">User Menu</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
