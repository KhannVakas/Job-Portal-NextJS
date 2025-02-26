"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import CommonForm from "../common-form";
import {
  InitialPostNewJobFormData,
  postNewJobFormControls,
} from "@/static-utils";
import { postNewJobAction } from "@/actions";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

const PostNewJob = ({ user, profileInfo, jobList }) => {
  console.log("JobListINPostNewJob: ", jobList);

  const { toast } = useToast();

  const [showJobDialog, setShowJobDialog] = useState(false);
  const [jobFormData, setJobFormData] = useState({
    ...InitialPostNewJobFormData,
    companyName: profileInfo?.recruiterInfo?.companyName,
  });
  // console.log(user?.id, "UserID");
  // console.log(jobFormData);

  const handlePostNewBtnValid = () => {
    return Object.keys(jobFormData).every(
      (control) => jobFormData[control].trim() !== ""
    );
  };

  const createNewJob = async () => {
    await postNewJobAction(
      {
        ...jobFormData,
        recruiterId: user?.id,
        applicants: [],
      },
      "/jobs"
    );

    setJobFormData({
      ...InitialPostNewJobFormData,
      companyName: profileInfo?.recruiterInfo?.companyName,
    });
    setShowJobDialog(false);
  };

  function handleAddNewJob() {
    if (!profileInfo?.isPremiumUser && jobList.length >= 2) {
      toast({
        variant: "destructive",
        title: "You can post max 2 jobs",
        description: "Please opt for membership to post more jobs",
      });
      return;
    }
    setShowJobDialog(true);
  }
  return (
    <div>
      <Button
        onClick={handleAddNewJob}
        className={"disabled:opacity-50 flex h-11 items-center justify-center"}
      >
        Post A Job
      </Button>
      <Dialog
        open={showJobDialog}
        onOpenChange={() => {
          setShowJobDialog(false);
          setJobFormData({
            ...InitialPostNewJobFormData,
            companyName: profileInfo?.recruiterInfo?.companyName,
          });
        }}
      >
        <DialogContent className={"sm:max-w-screen-md h-[600px] overflow-auto"}>
          <DialogHeader>
            <DialogTitle>Post New Job</DialogTitle>
            <div className="grid gap-4 py-4">
              <CommonForm
                buttonText={"Add"}
                formData={jobFormData}
                setFormData={setJobFormData}
                formControls={postNewJobFormControls}
                isBtnDisabled={!handlePostNewBtnValid()}
                action={createNewJob}
              />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostNewJob;
