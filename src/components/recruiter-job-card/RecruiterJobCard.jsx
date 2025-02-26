"use client";

import { useState } from "react";
import CommonCard from "../common-card/CommonCard";
import JobIcon from "../job-icon/JobIcon";
import { Button } from "../ui/button";
import JobApplicants from "../job-applicants/JobApplicants";

const RecruiterJobCard = ({ jobItem, jobApplications }) => {
  // console.log("Job applicants: ", jobApplications);

  const [showApplicantsDrawer, setShowApplicantsDrawer] = useState(false);
  const [currentCandidateDetails, setCurrentCandidateDetails] = useState(null);
  const [
    showCurrentCandidateDetailsModal,
    setShowCurrentCandidateDetailsModal,
  ] = useState(false);

  const handleApplicantsBtnValid = () => {
    return (
      jobApplications.filter((item) => item.jobID === jobItem?._id).length === 0
    );
  };

  // console.log("jobItem", jobItem);
  return (
    <div>
      <CommonCard
        icon={<JobIcon />}
        title={jobItem?.title}
        description={jobItem?.description}
        footerContent={
          <Button
            disabled={handleApplicantsBtnValid()}
            onClick={() => setShowApplicantsDrawer(true)}
            className={
              "disabled:opacity-50 flex items-center h-11 justify-center px-5"
            }
          >
            {
              jobApplications.filter((item) => item.jobID === jobItem?._id)
                .length
            }{" "}
            Applicants
          </Button>
        }
      />
      <JobApplicants
        currentCandidateDetails={currentCandidateDetails}
        setCurrentCandidateDetails={setCurrentCandidateDetails}
        setShowApplicantsDrawer={setShowApplicantsDrawer}
        setShowCurrentCandidateDetailsModal={
          setShowCurrentCandidateDetailsModal
        }
        showApplicantsDrawer={showApplicantsDrawer}
        showCurrentCandidateDetailsModal={showCurrentCandidateDetailsModal}
        jobItem={jobItem}
        jobApplications={jobApplications.filter(
          (jobApplicantItem) => jobApplicantItem.jobID === jobItem?._id
        )}
      />
    </div>
  );
};

export default RecruiterJobCard;
