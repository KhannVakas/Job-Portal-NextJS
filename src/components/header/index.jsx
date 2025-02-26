"use client";

import { AlignJustify } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Header = ({ user, profileInfo }) => {
  const menuItems = [
    { label: "Home", path: "/", show: true },
    { label: "Login", path: "/sign-in", show: !user },
    { label: "Register", path: "/sign-up", show: !user },
    {
      label: "Activity",
      path: "/activity",
      show: profileInfo?.role === "candidate",
    },
    { label: "Jobs", path: "/jobs", show: user },
    { label: "Membership", path: "/membership", show: user },
    { label: "Account", path: "/account", show: user },
  ];

  const router = useRouter();
  return (
    <div>
      <header className="flex h-16 w-full shrink-0 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button className={"lg:hidden"}>
              <AlignJustify className="h-6 w-6" />
              <span className="sr-only">Toggle Navigation Menu</span>
            </Button>
          </SheetTrigger>
          <SheetHeader>
            <SheetTitle className={"sr-only"}>Title</SheetTitle>
          </SheetHeader>
          <SheetContent side={"left"}>
            <Link className="mr-6 hidden lg:flex" href={"/"}>
              <h3>JOBSCO</h3>
            </Link>
            <div className="grid gap-2 py-6">
              <UserButton />

              {menuItems.map((item) =>
                item.show ? (
                  <Link
                    key={item.label}
                    href={item.path}
                    className="flex w-full items-center py-2 text-lg font-semibold"
                    onClick={() => sessionStorage.removeItem("filterParams")}
                  >
                    {item?.label}
                  </Link>
                ) : null
              )}
            </div>
          </SheetContent>
        </Sheet>
        <Link className="hidden font-bold text-3xl lg:flex mr-6" href={"/"}>
          JOBSCO
        </Link>

        <nav className="ml-auto hidden lg:flex gap-6 ">
          {menuItems.map((item) =>
            item.show ? (
              <Link
                key={item.label}
                href={"#"}
                onClick={(e) => {
                  e.preventDefault();
                  sessionStorage.removeItem("filterParams");
                  router.push(item.path);
                }}
                className="group h-9 inline-flex w-max items-center rounded-md bg-white px-4 py-2 text-sm font-medium"
              >
                {item?.label}
              </Link>
            ) : null
          )}
          <UserButton />
        </nav>
      </header>
    </div>
  );
};

export default Header;
