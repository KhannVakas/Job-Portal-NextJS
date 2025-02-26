import { fetchProfileAction } from "@/actions";
import AccountInfo from "@/components/account-info/AccountInfo";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const AccountPage = async () => {
  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);
  if (!profileInfo) redirect("/onboard");
  console.log("user: ", user);
  console.log("Profile: ", profileInfo);
  return <AccountInfo profileInfo={profileInfo} />;
};

export default AccountPage;
