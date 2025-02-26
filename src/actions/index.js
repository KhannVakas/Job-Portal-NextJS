"use server";

import connectToDB from "@/database";
import Application from "@/models/application";
import Job from "@/models/job";
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";
import Stripe from "stripe";
const stripe = require("stripe")(
  "sk_test_51QqD0mB7nnAzprm7ALtA7Onri599ysLOm18J4aaKV0Z0hpefnd9zPwGsLRcndFD32yU9dxTJxZL8OaEPgRGGg56H00Lu7xunLu"
);

// create profile action
export async function createProfile(formData, pathToRevalidate) {
  await connectToDB();
  await Profile.create(formData);
  revalidatePath(pathToRevalidate);
}

export async function fetchProfileAction(id) {
  await connectToDB();
  const result = await Profile.findOne({ userId: id });
  return JSON.parse(JSON.stringify(result));
}

export async function postNewJobAction(formData, pathToRevalidate) {
  await connectToDB();
  await Job.create(formData);
  revalidatePath(pathToRevalidate);
}

/* 
  fetchJobAction will have two parts. i.e recruiter and candidate

  e.g 100 jobs posted by 5 recruiters, that means
  --> recruiters will see the list of jobs they have posted but
  --> candidates will see all the jobs posted by 5 recruiters

*/

// for recruiter
export async function fetchJobsForRecruiterAction(id) {
  await connectToDB();
  const result = await Job.find({ recruiterId: id });
  return JSON.parse(JSON.stringify(result));
}

// for candidate
export async function fetchJobsForCandidateAction(filterParams = {}) {
  await connectToDB();
  let updatedParams = {};
  Object.keys(filterParams).forEach((filterKey) => {
    updatedParams[filterKey] = { $in: filterParams[filterKey].split(",") };
  });
  console.log(updatedParams, "updatedParams: ");
  const result = await Job.find(
    filterParams && Object.keys(filterParams).length > 0 ? updatedParams : {}
  );

  return JSON.parse(JSON.stringify(result));
}

// job Application Action

export async function createJobApplicationAction(data, pathToRevalidate) {
  await connectToDB();
  await Application.create(data);
  revalidatePath(pathToRevalidate);
}

// fetch job applications - candidate
export async function fetchJobApplicationsForCandidate(candidateID) {
  await connectToDB();
  const result = await Application.find({ candidateUserID: candidateID });
  return JSON.parse(JSON.stringify(result));
}

// fetch job application - recuiter
export async function fetchJobApplicationForRecruiter(recruiterID) {
  await connectToDB();
  const result = await Application.find({ recruiterUserID: recruiterID });
  return JSON.parse(JSON.stringify(result));
}
// update job application
export async function updateJobApplicationAction(data, pathToRevalidate) {
  await connectToDB();
  const {
    recruiterUserID,
    name,
    email,
    candidateUserID,
    status,
    jobID,
    jobAppliedDate,
    _id,
  } = data;
  await Application.findOneAndUpdate(
    { _id: _id },
    {
      recruiterUserID,
      name,
      email,
      candidateUserID,
      status,
      jobID,
      jobAppliedDate,
    },
    { new: true }
  );
  revalidatePath(pathToRevalidate);
  /* recruiterUserID: String,
  name: String,
  email: String,
  candidateUserID: String,
  status: Array,
  jobID: String,
  jobAppliedDate: String, */
}

// get candidate details by candidateID
export async function getCandidateDetailsByIDAction(currentCandidateID) {
  await connectToDB();
  const result = await Profile.findOne({ userId: currentCandidateID });
  return JSON.parse(JSON.stringify(result));
}

// create filter categories

export async function createFilterCategoryAction() {
  await connectToDB();
  const result = await Job.find({});
  return JSON.parse(JSON.stringify(result));
}

export async function updateProfileAction(data, pathToRevalidate) {
  await connectToDB();
  const {
    userId,
    role,
    email,
    isPremiumUser,
    membershipType,
    membershipStartDate,
    membershipEndDate,
    recruiterInfo,
    candidateInfo,
    _id,
  } = data;

  await Profile.findOneAndUpdate(
    { _id: _id },
    {
      userId,
      role,
      email,
      isPremiumUser,
      membershipType,
      membershipStartDate,
      membershipEndDate,
      recruiterInfo,
      candidateInfo,
    },
    { new: true }
  );
  revalidatePath(pathToRevalidate);
}

// create stipe price id based on tier selection

export async function createPriceIdAction(data) {
  const session = await stripe.prices.create({
    currency: "usd",
    unit_amount: data?.amount * 100,
    recurring: {
      interval: "year",
    },
    product_data: {
      name: "Premium Plan",
    },
  });
  return {
    success: true,
    id: session?.id,
  };
}
// payment logic

export async function stripePaymentAction(data) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: data?.lineItems,
    mode: "subscription",
    success_url: "http://localhost:3000/membership" + "?status=success",
    cancel_url: "http://localhost:3000/membership" + "?status=cancel",
  });
  return {
    success: true,
    id: session?.id,
  };
}
