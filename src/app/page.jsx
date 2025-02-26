import { fetchProfileAction } from "@/actions";
import HomeBtnControls from "@/components/home-page-btn-controls/HomeBtnControls";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

/*
  Check if user is authenticated. 
  Check if profile info is there or not.

  if profile info is there, it means user is already onboarded 
  as candidate or a recruiter 

  if first time a person is register and he is neither candidate nor recruitor
  on the onboard page, user can select he is candidate or recruitor 


  --> If user is login and he is a recruiter so he should be redirect to the membership page. Cox he posts the jobs so he has to pay

  if you're a recruiter, you will not see the activity section & if you're a candidate, you'll see every section
*/
export default async function Home() {
  const user = await currentUser();
  console.log(user, "current user");

  // profileInfo means user is candidate or recruiter
  // userInfo means user is authenticated or not
  const profileInfo = await fetchProfileAction(user?.id);
  if (user && !profileInfo?._id) redirect("/onboard");

  return (
    <>
      <div className="bg=white">
        <div className="relative w-full">
          <div className="min-h-screen flex">
            <div className="container m-auto p-0">
              <div className="flex items-center flex-wrap gap-12 lg:gap-0">
                <div className="lg:w-5/12 space-y-8">
                  <span className="flex space-x-2">
                    <span className="block w-14 mb-2 border-b-2 border-gray-700"></span>
                    <span className="font-medium text-gray-600">
                      One Stop Solution to Find Jobs
                    </span>
                  </span>
                  <h1 className="text-4xl font-bold md:text-6xl">
                    The Best <br /> Job Portal App
                  </h1>
                  <p className="text-xl text-gray-700">
                    Find Best Jobs From Top Product Based Company and Build Your
                    Career
                  </p>
                  <HomeBtnControls
                    user={JSON.parse(JSON.stringify(user))}
                    profileInfo={profileInfo}
                  />
                </div>
                <div className="hidden relative md:block lg:w-7/12">
                  <img
                    src="https://digifylocal.com/wp-content/uploads/2023/05/Starting-a-business-project-rafiki.png"
                    alt="HomeImage"
                    className="relative ml-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
