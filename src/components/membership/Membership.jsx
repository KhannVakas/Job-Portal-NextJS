"use client";
import { membershipPlans } from "@/static-utils";
import React, { use, useEffect } from "react";
import CommonCard from "../common-card/CommonCard";
import JobIcon from "../job-icon/JobIcon";
import { Button } from "../ui/button";
import {
  createPriceIdAction,
  stripePaymentAction,
  updateProfileAction,
} from "@/actions";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";

const Membership = ({ user, profileInfo }) => {
  const pathName = useSearchParams();
  async function updateProfile() {
    const fetchCurrentPlanFromSessionStorage = JSON.parse(
      sessionStorage.getItem("currentPlan")
    );

    await updateProfileAction(
      {
        ...profileInfo,
        isPremiumUser: true,
        membershipType: fetchCurrentPlanFromSessionStorage?.type,
        membershipStartDate: new Date().toString(),
        membershipEndDate: new Date(
          new Date().getFullYear() +
            (fetchCurrentPlanFromSessionStorage?.type === "Basic"
              ? 1
              : fetchCurrentPlanFromSessionStorage?.type === "Teams"
              ? 2
              : 5),
          new Date().getMonth(),
          new Date().getDate() // ✅ Fixed
        ),
      },
      "/membership"
    );
  }
  useEffect(() => {
    if (pathName?.get("status") === "success") updateProfile();
  }, [pathName]);

  const stripePromise = loadStripe(
    "pk_test_51QqD0mB7nnAzprm7xqU1BAfkaaFyPFW70WqDLlY3vox0SH8xtoBXGa2l1NfmPwqcloK0CKFR8SznJZ6lnnf3K4e000KcwqQ7O3"
  );
  const handlePayment = async (getCurrentPlan) => {
    const stripe = await stripePromise;
    const extractPriceId = await createPriceIdAction({
      amount: Number(getCurrentPlan?.price),
    });

    if (extractPriceId) {
      sessionStorage.setItem("currentPlan", JSON.stringify(getCurrentPlan));
      const result = await stripePaymentAction({
        lineItems: [
          {
            price: extractPriceId?.id,
            quantity: 1,
          },
        ],
      });
      console.log("result", result);

      await stripe.redirectToCheckout({
        sessionId: result?.id,
      });
    }
    console.log("ExtractPriceId: ", extractPriceId);
  };
  console.log("ProfileInfo ", profileInfo);
  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex items-baseline justify-between border-b pb-6 pt-24">
        <h1 className="text-4xl font-bold tracking-tight text-gray-950">
          {profileInfo?.isPremiumUser
            ? "You are a Premium User"
            : "Choose Your Best Plan    "}
        </h1>
        <div>
          {profileInfo?.isPremiumUser ? (
            <Button className={"flex h-11 items-center justify-center px-5"}>
              {
                membershipPlans.find(
                  (planItem) => planItem.type === profileInfo?.membershipType
                ).heading
              }
            </Button>
          ) : null}
        </div>
      </div>
      <div className="py-20 pb-24 pt-6">
        <div className="container mx-auto p-0 space-y-8">
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {membershipPlans.map((plan, index) => (
              <CommonCard
                icon={
                  <div className="flex justify-between">
                    <div>
                      <JobIcon />
                    </div>
                    <h1 className="font-bold text-2xl">{plan.heading}</h1>
                  </div>
                }
                title={`$ ${plan.price} /yr`}
                description={plan.type}
                footerContent={
                  profileInfo?.membershipType === "Enterprice" ||
                  (profileInfo?.membershipType === "Basic" && index === 0) ||
                  (profileInfo?.membershipType === "Teams" &&
                  index >= 0 &&
                  index < 2 ? null : (
                    <Button
                      onClick={() => handlePayment(plan)}
                      className={"flex h-11 items-center justify-center px-5"}
                    >
                      {profileInfo?.membershipType === "Basic" ||
                      profileInfo?.membershipType === "Teams"
                        ? "Update Plan"
                        : "Get Premium"}
                    </Button>
                  ))
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;
