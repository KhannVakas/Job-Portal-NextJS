"use client";

import { Button } from "../ui/button";
import { Fragment } from "react";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../ui/dialog";
import {
  getCandidateDetailsByIDAction,
  updateJobApplicationAction,
} from "@/actions";
import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient(
  "https://qgztwtprtkmxzgoudxub.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnenR3dHBydGtteHpnb3VkeHViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU5MTkyMDIsImV4cCI6MjA1MTQ5NTIwMn0.50Yjj5YqpMfe3Ydp1m-5TO3c_SkJiwln4qWXYwIF0wA"
);
const CandidateList = ({
  currentCandidateDetails,
  setCurrentCandidateDetails,
  showCurrentCandidateDetailsModal,
  setShowCurrentCandidateDetailsModal,
  jobApplications,
  jobItem,
}) => {
  // console.log("Job Item in the Card", jobItem);

  const handleFetchCandidateDetails = async (getCurrentCandidateID) => {
    const data = await getCandidateDetailsByIDAction(getCurrentCandidateID);
    console.log(data);
    if (data) {
      setCurrentCandidateDetails(data);
      setShowCurrentCandidateDetailsModal(true);
    }
  };
  console.log("CurrentCandidateDetails: ", currentCandidateDetails);

  const handlePreviewResume = () => {
    const { data } = supabaseClient.storage
      .from("job-board")
      .getPublicUrl(currentCandidateDetails?.candidateInfo?.resume);

    console.log(data, "resume");
    // window.open(data?.publicUrl, "_blank");

    const a = document.createElement("a");
    a.href = data?.publicUrl;
    a.setAttribute("target", "_blank");
    a.setAttribute("download", "Resume.pdf");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleUpdateJobStatus = async (getCurrentStatus) => {
    let copyJobApplicants = [...jobApplications];
    const indexOfCurrentJobApplicant = copyJobApplicants.findIndex(
      (item) => item.candidateUserID === currentCandidateDetails?.userId
    );
    console.log(indexOfCurrentJobApplicant);
    const jobApplicantsToUpdate = {
      ...copyJobApplicants[indexOfCurrentJobApplicant],
      status:
        copyJobApplicants[indexOfCurrentJobApplicant].status.concat(
          getCurrentStatus
        ),
    };
    console.log("JobApplicantsToUpdate", jobApplicantsToUpdate);
    await updateJobApplicationAction(jobApplicantsToUpdate, "/jobs");
  };
  console.log("jobApplications", jobApplications);
  return (
    <Fragment>
      <div className="grid grid-cols-1 gap-3 p-10 md:grid-cols-2 lg:grid-cols-3">
        {jobApplications && jobApplications.length > 0
          ? jobApplications.map((jobApplicantItem) => (
              <div className="bg-white shadow-lg w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
                <div className="px-4 my-6 flex justify-between items-center">
                  <h3 className="text-lg font-bold">
                    {jobApplicantItem?.name}
                  </h3>
                  <Button
                    onClick={() =>
                      handleFetchCandidateDetails(
                        jobApplicantItem?.candidateUserID
                      )
                    }
                    className={"h-11 flex items-center justify-center px-5"}
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            ))
          : null}
      </div>

      <Dialog
        open={showCurrentCandidateDetailsModal}
        onOpenChange={() => {
          setCurrentCandidateDetails(null);
          setShowCurrentCandidateDetailsModal(false);
        }}
      >
        <DialogContent className={"min-w-[600px]"}>
          <DialogTitle className={"sr-only"}>Title</DialogTitle>
          <div>
            <h1 className="text-2xl font-bold ">
              {currentCandidateDetails?.candidateInfo?.name},{" "}
              {currentCandidateDetails?.email}
            </h1>
            <p className="text-xl font-medium ">
              {currentCandidateDetails?.candidateInfo?.currentCompany}
            </p>
            <p className="text-sm font-normal">
              {currentCandidateDetails?.candidateInfo?.currentJobLocation}
            </p>
            <p>
              Total Experience:{" "}
              {currentCandidateDetails?.candidateInfo?.totalExperience}{" "}
              {currentCandidateDetails?.candidateInfo?.totalExperience
                .toLowerCase()
                .includes("years")
                ? ""
                : "Years"}
            </p>
            <p>
              Salary: {currentCandidateDetails?.candidateInfo?.currentSalary}{" "}
              LPA
            </p>
            <p>
              Notice Period:{" "}
              {currentCandidateDetails?.candidateInfo?.noticePeriod} Days
            </p>
            <div className="flex gap-4 mt-6 flex-wrap items-center">
              <h1>Previous Companies: </h1>
              {currentCandidateDetails?.candidateInfo?.previousCompanies
                .split(",")
                .map((skillItem) => (
                  <div className="min-w-[100px] flex relative bg-black px-2 rounded items-center justify-center h-[35px]">
                    <h2 className="text-white text-[13px] font-medium">
                      {skillItem}
                    </h2>
                  </div>
                ))}
            </div>
            <div className="flex gap-4 mt-6 flex-wrap items-center">
              {currentCandidateDetails?.candidateInfo?.skills
                .split(",")
                .map((skillItem) => (
                  <div className="min-w-[100px] flex relative bg-black px-2 rounded items-center justify-center h-[35px]">
                    <h2 className="text-white text-[13px] font-medium">
                      {skillItem}
                    </h2>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handlePreviewResume}
              className={"h-11 flex items-center justify-center px-5"}
            >
              Resume
            </Button>
            <Button
              onClick={() => handleUpdateJobStatus("Selected")}
              className={
                "h-11 disabled:opacity-50 flex items-center justify-center px-5"
              }
              disabled={
                jobApplications
                  .find(
                    (item) =>
                      item.candidateUserID === currentCandidateDetails?.userId
                  )
                  ?.status.includes("Selected") ||
                jobApplications
                  .find(
                    (item) =>
                      item.candidateUserID === currentCandidateDetails?.userId
                  )
                  ?.status.includes("Rejected")
                  ? true
                  : false
              }
            >
              {jobApplications
                .find(
                  (item) =>
                    item.candidateUserID === currentCandidateDetails?.userId
                )
                ?.status.includes("Selected")
                ? "Selected"
                : "Select"}
            </Button>
            <Button
              onClick={() => handleUpdateJobStatus("Rejected")}
              className={
                "h-11 disabled:opacity-50 flex items-center justify-center px-5"
              }
              disabled={
                jobApplications
                  .find(
                    (item) =>
                      item.candidateUserID === currentCandidateDetails?.userId
                  )
                  ?.status.includes("Selected") ||
                jobApplications
                  .find(
                    (item) =>
                      item.candidateUserID === currentCandidateDetails?.userId
                  )
                  ?.status.includes("Rejected")
                  ? true
                  : false
              }
            >
              {jobApplications
                .find(
                  (item) =>
                    item.candidateUserID === currentCandidateDetails?.userId
                )
                ?.status.includes("Rejected")
                ? "Rejected"
                : "Reject"}
            </Button>
          </div>{" "}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default CandidateList;
