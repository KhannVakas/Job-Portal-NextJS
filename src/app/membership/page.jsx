import { fetchProfileAction } from "@/actions";
import Membership from "@/components/membership/Membership";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const MembershipPage = async () => {
  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);
  if (!profileInfo) redirect("/onboard");
  return (
    <Membership
      user={JSON.parse(JSON.stringify(user))}
      profileInfo={profileInfo}
    />
  );
};

export default MembershipPage;
