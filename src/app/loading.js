import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className={"h-[400px] w-[400px] rounded-full bg-zinc-500"} />
    </div>
  );
};

export default Loading;
