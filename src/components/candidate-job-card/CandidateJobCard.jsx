"use client";
import { useState } from "react";
import CommonCard from "../common-card/CommonCard";
import JobIcon from "../job-icon/JobIcon";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { createJobApplicationAction } from "@/actions";

const CandidateJobCard = ({ jobItem, profileInfo, jobApplications }) => {
  const [showJobDetailsDrawer, setShowJobDetailsDrawrer] = useState(false);

  const { toast } = useToast();
  const formatExperience = (experience) => {
    if (!experience) return "";
    return experience.toLowerCase().includes("years")
      ? experience
      : `${experience} Years`;
  };
  // console.log("jobItem", jobItem);
  console.log("Applications", jobApplications);
  try {
    console.log(profileInfo, "Profile Info");
  } catch (error) {
    console.log(error);
  }

  const handleJobApply = async () => {
    if (!profileInfo?.isPremiumUser && jobApplications.length >= 2) {
      setShowJobDetailsDrawrer(false);
      toast({
        variant: "destructive",
        title: "You can apply for max 2 jobs",
        description: "Please opt for membership to apply for more jobs",
      });
      return;
    }

    await createJobApplicationAction(
      {
        recruiterUserID: jobItem?.recruiterId,
        name: profileInfo?.candidateInfo?.name,
        email: profileInfo?.email,
        candidateUserID: profileInfo?.userId,
        status: ["Applied"],
        jobID: jobItem?._id,
        jobAppliedDate: new Date().toLocaleDateString(),
      },
      "/jobs"
    );
    setShowJobDetailsDrawrer(false);
  };

  const handleApplyMethod = () => {
    setShowJobDetailsDrawrer(true);
  };
  return (
    <>
      <Drawer
        open={showJobDetailsDrawer}
        onOpenChange={setShowJobDetailsDrawrer}
      >
        <CommonCard
          title={jobItem?.title}
          icon={<JobIcon />}
          description={jobItem?.companyName}
          footerContent={
            // <DrawerTrigger> OR
            <Button
              onClick={() => setShowJobDetailsDrawrer(true)}
              className={"flex h-11 items-center justify-center px-5"}
            >
              View Details
            </Button>
            // </DrawerTrigger>
          }
        />
        <DrawerContent className={"p-6"}>
          <DrawerHeader className={"px-0"}>
            <div className="flex justify-between">
              <DrawerTitle className={"text-4xl font-extrabold text-gray-800"}>
                {jobItem?.title}
              </DrawerTitle>
              <div className="flex gap-3">
                <Button
                  onClick={handleJobApply}
                  className={
                    "flex h-11 items-center justify-center px-5 disabled:opacity-50"
                  }
                  disabled={
                    jobApplications.findIndex(
                      (item) => item.jobID === jobItem?._id
                    ) > -1
                      ? true
                      : false
                  }
                >
                  {jobApplications.findIndex(
                    (item) => item.jobID === jobItem?._id
                  ) > -1
                    ? "Applied"
                    : "Apply"}
                </Button>
                <Button
                  className={"flex h-11 items-center justify-center px-5"}
                  onClick={() => setShowJobDetailsDrawrer(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DrawerHeader>
          <DrawerDescription className={"text-2xl font-medium text-gray-600"}>
            {jobItem?.description}
            <span className="text-xl ml-4 font-normal text-gray-500">
              {jobItem?.location}
            </span>
          </DrawerDescription>
          <div className="w-[150px] mt-6 flex items-center justify-center h-[40px] bg-black rounded">
            <h2 className="text-white text-xl font-bold">
              {jobItem?.type} Time
            </h2>
          </div>
          <div>
            <h3 className="text-2xl font-medium text-black mt-3">
              Experience:{" "}
              {jobItem?.experience.toLowerCase().includes("years")
                ? jobItem?.experience
                : `${jobItem?.experience} Years`}
            </h3>
          </div>
          <div className="flex gap-4 mt-6">
            {jobItem?.skills.split(",").map((skill) => (
              <div className="min-w-[100px] px-2 flex justify-center items-center h-[35px] bg-black rounded">
                <h2 className="text-[13px] font-medium text-white">{skill}</h2>
              </div>
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CandidateJobCard;
