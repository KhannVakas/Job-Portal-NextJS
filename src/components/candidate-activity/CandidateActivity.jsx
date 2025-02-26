"use client";

import CommonCard from "../common-card/CommonCard";
import JobIcon from "../job-icon/JobIcon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const CandidateActivity = ({ jobList, jobApplicants }) => {
  console.log("JobList", jobList);
  console.log("JobApplicants", jobApplicants);

  // const uniqueStatusesArray = [
  //   ...new Set(
  //     jobApplicants.map((jobApplicantItem) => jobApplicantItem.status).flat(1)
  //   ),
  // ];
  const jobsByStatus = jobApplicants.reduce((acc, applicant) => {
    applicant.status.forEach((status) => {
      if (!acc[status]) {
        acc[status] = [];
      }

      // Find the matching job for the applicant
      const matchingJob = jobList.find((job) => job._id === applicant.jobID);
      if (matchingJob) {
        acc[status].push(matchingJob);
      }
    });
    return acc;
  }, {});
  console.log("Jobs By Status:", jobsByStatus);
  const uniqueStatusesArray = Object.keys(jobsByStatus);
  console.log("UniqueStatuses: ", uniqueStatusesArray);

  return (
    <div className="mx-auto max-w-7xl">
      <Tabs defaultValue="Applied" className="w-full">
        <div className="flex items-baseline justify-between border-b pb-6 pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-950">
            Your Activity
          </h1>
          <TabsList>
            {uniqueStatusesArray.map((status) => (
              <TabsTrigger key={status} value={status}>
                {status}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div className="pb-24 pt-6">
          <div className="container mx-auto p-0 space-y-8">
            <div className="flex flex-col gap-4">
              {/* {uniqueStatusesArray.map((status) => (
                <TabsContent value={status}>
                  {jobList
                    .filter(
                      (jobItem) =>
                        jobApplicants
                          .filter(
                            (applicantItem) =>
                              applicantItem?.status.indexOf(status) > -1
                          )
                          .findIndex(
                            (filteredItemByStatus) =>
                              jobItem?._id === filteredItemByStatus?.jobID
                          ) > -1
                    )
                    .map((finalFilteredItem) => (
                      <CommonCard
                        icon={<JobIcon />}
                        title={finalFilteredItem?.title}
                        description={finalFilteredItem?.companyName}
                      />
                    ))}
                </TabsContent>
              ))} */}
              {uniqueStatusesArray.map((status) => (
                <TabsContent key={status} value={status}>
                  {jobsByStatus[status].map((job) => (
                    <CommonCard
                      key={job._id}
                      icon={<JobIcon />}
                      title={job.title}
                      description={job.companyName}
                    />
                  ))}
                </TabsContent>
              ))}
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default CandidateActivity;
