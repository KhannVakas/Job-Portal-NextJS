"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import CommonForm from "../common-form";
import {
  candidateOnBoardFormControls,
  initialCandidateFormData,
  initialRecruiterFormData,
  recruiterOnBoardFormControls,
} from "@/static-utils";
import { useUser } from "@clerk/nextjs";
import { createProfile } from "@/actions";
import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient(
  "https://qgztwtprtkmxzgoudxub.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnenR3dHBydGtteHpnb3VkeHViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU5MTkyMDIsImV4cCI6MjA1MTQ5NTIwMn0.50Yjj5YqpMfe3Ydp1m-5TO3c_SkJiwln4qWXYwIF0wA"
);

const OnBoard = () => {
  const [currentTab, setCurrentTab] = useState("candidate");
  const [recruiterFormData, setRecruiterFormData] = useState(
    initialRecruiterFormData
  );
  const [candidateFormData, setCandidateFormData] = useState(
    initialCandidateFormData
  );
  const [file, setFile] = useState(null);

  // console.log("recruiterFormData", recruiterFormData);
  console.log(candidateFormData);

  const handleRecruiterFormValid = () => {
    return (
      recruiterFormData &&
      recruiterFormData.name.trim() !== "" &&
      recruiterFormData.companyName.trim() !== "" &&
      recruiterFormData.companyRole.trim() !== ""
    );
  };

  const handleCandidateFormValid = () => {
    return Object.keys(candidateFormData).every(
      (control) => candidateFormData[control].trim() !== ""
    );
  };

  const handleFileChange = (event) => {
    event.preventDefault();
    console.log(event.target.files);
    setFile(event.target.files[0]);
    // console.log("File", file);
  };

  const handleUploadPdfToSupabase = async () => {
    const { data, error } = await supabaseClient.storage
      .from("job-board")
      .upload(`/public/${file.name}`, file, {
        cacheControl: "3600",
        upsert: false,
      });
    console.log(data, error);
    if (data) {
      setCandidateFormData({
        ...candidateFormData,
        resume: data.path,
      });
    }
  };
  useEffect(() => {
    if (file) handleUploadPdfToSupabase();
  }, [file]);
  const currentAuthUser = useUser();
  const { user } = currentAuthUser;
  console.log(currentAuthUser);

  const createProfileAction = async () => {
    // we'll get recruiter's email & id etc from  clerk using clerkHook
    const data =
      currentTab === "candidate"
        ? {
            candidateInfo: candidateFormData,
            role: "candidate",
            isPremiumUser: false,
            userId: user?.id,
            email: user?.primaryEmailAddress?.emailAddress,
          }
        : {
            recruiterInfo: recruiterFormData,
            role: "recruiter",
            isPremiumUser: false,
            userId: user?.id,
            email: user?.primaryEmailAddress?.emailAddress,
          };

    await createProfile(data, "/onboard");
  };
  const handleTabChange = (value) => {
    setCurrentTab(value);
  };
  return (
    <div className="bg-white">
      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <div className="w-full">
          <div className="flex items-baseline justify-between border-b pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Welcome To Onboarding
            </h1>
            <TabsList>
              <TabsTrigger value="candidate">Candidate</TabsTrigger>
              <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
            </TabsList>
          </div>
        </div>
        <TabsContent value={"candidate"}>
          <CommonForm
            formControls={candidateOnBoardFormControls}
            buttonText={"Onboard as a candidate"}
            formData={candidateFormData}
            setFormData={setCandidateFormData}
            handleFileChange={handleFileChange}
            isBtnDisabled={!handleCandidateFormValid()}
            action={createProfileAction}
          />
        </TabsContent>
        <TabsContent value={"recruiter"}>
          <CommonForm
            formControls={recruiterOnBoardFormControls}
            buttonText={"Onboard as recruiter"}
            formData={recruiterFormData}
            setFormData={setRecruiterFormData}
            isBtnDisabled={!handleRecruiterFormValid()}
            action={createProfileAction}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OnBoard;
