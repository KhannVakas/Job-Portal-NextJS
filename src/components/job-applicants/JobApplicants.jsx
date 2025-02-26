import React from "react";
import { Drawer, DrawerContent } from "../ui/drawer";
import { ScrollArea } from "../ui/scroll-area";
import CandidateList from "../candidate-list/CandidateList";

const JobApplicants = ({
  showApplicantsDrawer,
  setShowApplicantsDrawer,
  showCurrentCandidateDetailsModal,
  setShowCurrentCandidateDetailsModal,
  currentCandidateDetails,
  setCurrentCandidateDetails,
  jobItem,
  jobApplications,
}) => {
  // console.log("Job Applications for Recruiter: ", jobApplications);

  return (
    <Drawer open={showApplicantsDrawer} onOpenChange={setShowApplicantsDrawer}>
      <DrawerContent className={"max-h-[50vh]"}>
        <ScrollArea className={"h-auto overflow-y-auto"}>
          <CandidateList
            currentCandidateDetails={currentCandidateDetails}
            setCurrentCandidateDetails={setCurrentCandidateDetails}
            jobApplications={jobApplications}
            showCurrentCandidateDetailsModal={showCurrentCandidateDetailsModal}
            setShowCurrentCandidateDetailsModal={
              setShowCurrentCandidateDetailsModal
            }
            jobItem={jobItem}
          />
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};

export default JobApplicants;
