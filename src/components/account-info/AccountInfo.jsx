"use client";

import {
  candidateOnBoardFormControls,
  initialCandidateAccountFormData,
  initialRecruiterFormData,
  recruiterOnBoardFormControls,
} from "@/static-utils";
import { useEffect, useState } from "react";
import CommonForm from "../common-form";
import { updateProfileAction } from "@/actions";

const AccountInfo = ({ profileInfo }) => {
  const [candidateFormData, setCandidateFormData] = useState(
    initialCandidateAccountFormData
  );
  const [recruiterFormData, setRecruiterFormData] = useState(
    initialRecruiterFormData
  );

  useEffect(() => {
    if (profileInfo?.role === "recruiter")
      setRecruiterFormData(profileInfo?.recruiterInfo);
    if (profileInfo?.role === "candidate")
      setCandidateFormData(profileInfo?.candidateInfo);
  }, [profileInfo]);

  const handleUpdateAccount = async () => {
    await updateProfileAction(
      profileInfo?.role === "candidate"
        ? {
            _id: profileInfo?._id,
            userId: profileInfo?.userId,
            role: profileInfo?.role,
            email: profileInfo?.email,
            isPremiumUser: profileInfo?.isPremiumUser,
            membershipType: profileInfo?.membershipType,
            membershipStartDate: profileInfo?.membershipStartDate,
            membershipEndDate: profileInfo?.membershipEndDate,
            candidateInfo: {
              ...candidateFormData,
              resume: profileInfo?.candidateInfo?.resume,
            },
          }
        : {
            _id: profileInfo?._id,
            userId: profileInfo?.userId,
            role: profileInfo?.role,
            email: profileInfo?.email,
            isPremiumUser: profileInfo?.isPremiumUser,
            membershipType: profileInfo?.membershipType,
            membershipStartDate: profileInfo?.membershipStartDate,
            membershipEndDate: profileInfo?.membershipEndDate,
            recruiterInfo: {
              ...recruiterFormData,
            },
          },
      "/account"
    );
  };

  console.log(
    "CandidateFormData: ",
    candidateFormData,
    "\nRecruiterFormData: ",
    recruiterFormData
  );
  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex items-baseline mx-auto max-sm:flex-col justify-between pb-6 border-b pt-24">
        <h1 className="text-4xl font-bold tracking-tight text-gray-950">
          Account Info
        </h1>
        <div className="py-24 pt-6">
          <div className="container mx-auto p-0 space-y-8">
            <CommonForm
              action={handleUpdateAccount}
              formControls={
                profileInfo?.role === "candidate"
                  ? candidateOnBoardFormControls.filter(
                      (item) => item.name !== "resume"
                    )
                  : recruiterOnBoardFormControls
              }
              formData={
                profileInfo?.role === "candidate"
                  ? candidateFormData
                  : recruiterFormData
              }
              setFormData={
                profileInfo?.role === "candidate"
                  ? setCandidateFormData
                  : setRecruiterFormData
              }
              buttonText={"Update Profile"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
