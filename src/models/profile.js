// in profile we are going to manage both candidate and recruiter

import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  userId: String,
  role: String,
  email: String,
  isPremiumUser: Boolean,
  membershipType: String,
  membershipStartDate: String,
  membershipEndDate: String,
  recruiterInfo: {
    name: String,
    companyName: String,
    companyRole: String,
  },
  candidateInfo: {
    name: String,
    currentCompany: String,
    currentJobLocation: String,
    preferedJobLocation: String,
    currentSalary: String,
    noticePeriod: String,
    skills: String,
    previousCompanies: String,
    totalExperience: String,
    college: String,
    collegeLocation: String,
    graduationYear: String,
    linkedInProfile: String,
    githubProfile: String,
    resume: String,
  },
});

const Profile =
  mongoose.models.Profile || mongoose.model("Profile", profileSchema);

export default Profile;
