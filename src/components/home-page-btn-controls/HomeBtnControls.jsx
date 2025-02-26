"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const HomeBtnControls = ({ user, profileInfo }) => {
  const router = useRouter();
  return (
    <div className="flex space-x-4">
      <Button
        onClick={() => router.push("/jobs")}
        className={"flex h-11 items-center justify-center px-5"}
      >
        {user
          ? profileInfo?.role === "candidate"
            ? "Browse Jobs"
            : "Jobs Dashboard"
          : "Find Jobs"}
      </Button>
      <Button
        onClick={() =>
          router.push(
            user
              ? profileInfo?.role === "candidate"
                ? "/activity"
                : "/jobs"
              : "/jobs"
          )
        }
        className={"flex h-11 items-center justify-center px-5"}
      >
        {user
          ? profileInfo?.role === "candidate"
            ? "Your Activity"
            : "Post New Job"
          : "Hire Now"}
      </Button>
    </div>
  );
};

export default HomeBtnControls;
