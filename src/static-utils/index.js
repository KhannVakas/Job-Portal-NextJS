import qs from "query-string";
export const recruiterOnBoardFormControls = [
  {
    label: "Name",
    name: "name",
    placeholder: "Enter your name",
    componentType: "input",
  },
  {
    label: "Company Name",
    name: "companyName",
    placeholder: "Enter your company name",
    componentType: "input",
  },
  {
    label: "Company Role",
    name: "companyRole",
    placeholder: "Enter your company role",
    componentType: "input",
  },
];

export const initialRecruiterFormData = {
  name: "",
  companyName: "",
  companyRole: "",
};

export const candidateOnBoardFormControls = [
  {
    label: "Resume",
    name: "resume",
    componentType: "file",
  },
  {
    label: "Name",
    name: "name",
    placeholder: "Enter your name",
    componentType: "input",
  },
  {
    label: "Current Company",
    name: "currentCompany",
    placeholder: "Enter your current company",
    componentType: "input",
  },
  {
    label: "Current Job Location",
    name: "currentJobLocation",
    placeholder: "Enter your current job location",
    componentType: "input",
  },
  {
    label: "Prefered Job Location",
    name: "preferedJobLocation",
    placeholder: "Enter your prefered job location",
    componentType: "input",
  },
  {
    label: "Current Salary",
    name: "currentSalary",
    placeholder: "Enter your current salary",
    componentType: "input",
  },
  {
    label: "Notice Period",
    name: "noticePeriod",
    placeholder: "Enter your notice period",
    componentType: "input",
  },
  {
    label: "Skills",
    name: "skills",
    placeholder: "Enter your skills",
    componentType: "input",
  },
  {
    label: "Previous Companies",
    name: "previousCompanies",
    placeholder: "Enter your previous companies",
    componentType: "input",
  },
  {
    label: "Total Experience",
    name: "totalExperience",
    placeholder: "Enter your total experience",
    componentType: "input",
  },
  {
    label: "College",
    name: "college",
    placeholder: "Enter your college",
    componentType: "input",
  },
  {
    label: "College Location",
    name: "collegeLocation",
    placeholder: "Enter your college location",
    componentType: "input",
  },
  {
    label: "Graduation Year",
    name: "graduationYear",
    placeholder: "Enter your graduation year",
    componentType: "input",
  },
  {
    label: "LinkedIn Profile",
    name: "linkedInProfile",
    placeholder: "Enter your linkedIn profile",
    componentType: "input",
  },
  {
    label: "Github Profile",
    name: "githubProfile",
    placeholder: "Enter your github profile",
    componentType: "input",
  },
];

export const initialCandidateFormData = {
  resume: "",
  name: "",
  currentCompany: "",
  currentJobLocation: "",
  preferedJobLocation: "",
  currentSalary: "",
  noticePeriod: "",
  skills: "",
  previousCompanies: "",
  totalExperience: "",
  college: "",
  collegeLocation: "",
  graduationYear: "",
  linkedInProfile: "",
  githubProfile: "",
};
export const initialCandidateAccountFormData = {
  name: "",
  currentCompany: "",
  currentJobLocation: "",
  preferedJobLocation: "",
  currentSalary: "",
  noticePeriod: "",
  skills: "",
  previousCompanies: "",
  totalExperience: "",
  college: "",
  collegeLocation: "",
  graduationYear: "",
  linkedInProfile: "",
  githubProfile: "",
};

export const postNewJobFormControls = [
  {
    label: "Company Name",
    name: "companyName",
    placeholder: "Enter company name",
    componentType: "input",
    disabled: true,
  },
  {
    label: "Title",
    name: "title",
    placeholder: "Enter job title",
    componentType: "input",
  },
  {
    label: "Type",
    name: "type",
    placeholder: "Enter job type",
    componentType: "input",
  },
  {
    label: "Location",
    name: "location",
    placeholder: "Enter job location",
    componentType: "input",
  },
  {
    label: "Experience",
    name: "experience",
    placeholder: "Experience",
    componentType: "input",
  },
  {
    label: "Description",
    name: "description",
    placeholder: "Enter job description",
    componentType: "input",
  },
  {
    label: "Skills",
    name: "skills",
    placeholder: "Skills",
    componentType: "input",
  },
];

export const InitialPostNewJobFormData = {
  companyName: "",
  title: "",
  type: "",
  location: "",
  experience: "",
  description: "",
  skills: "",
};

export const filterMenuDataArray = [
  {
    id: "companyName",
    label: "Company Name",
  },
  {
    id: "title",
    label: "Title",
  },
  {
    id: "type",
    label: "Type",
  },
  {
    id: "location",
    label: "Location",
  },
];

export const formUrlQuery = ({ params, dataToAdd }) => {
  let currentURL = qs.parse(params);

  if (Object.keys(dataToAdd).length > 0) {
    Object.keys(dataToAdd).map((key) => {
      if (dataToAdd[key].length === 0) delete currentURL[key];
      else currentURL[key] = dataToAdd[key].join(",");
    });
  }

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentURL,
    },
    { skipNull: true }
  );
};

export const membershipPlans = [
  {
    heading: "Tier 1",
    price: 100,
    type: "Basic",
  },
  {
    heading: "Tier 2",
    price: 500,
    type: "Teams",
  },
  {
    heading: "Tier 3",
    price: 1000,
    type: "Enterprice",
  },
];
