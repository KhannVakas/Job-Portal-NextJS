import {
  createFilterCategoryAction,
  fetchJobApplicationForRecruiter,
  fetchJobApplicationsForCandidate,
  fetchJobsForCandidateAction,
  fetchJobsForRecruiterAction,
  fetchProfileAction,
} from "@/actions";
import JobListing from "@/components/job-listing";
import { currentUser } from "@clerk/nextjs/server";

const JobsPage = async ({ searchParams }) => {
  console.log("Search: ", await searchParams);
  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);

  const jobList =
    profileInfo?.role === "candidate"
      ? await fetchJobsForCandidateAction(searchParams)
      : await fetchJobsForRecruiterAction(user?.id);
  // console.log(jobList, "Vakas");

  const getJobApplicationList =
    profileInfo?.role === "candidate"
      ? await fetchJobApplicationsForCandidate(user?.id)
      : await fetchJobApplicationForRecruiter(user?.id);

  const getFilterCategories = await createFilterCategoryAction();

  return (
    <JobListing
      user={JSON.parse(JSON.stringify(user))}
      profileInfo={profileInfo}
      jobList={jobList}
      jobApplications={getJobApplicationList}
      filterCategories={getFilterCategories}
    />
  );
};

export default JobsPage;
