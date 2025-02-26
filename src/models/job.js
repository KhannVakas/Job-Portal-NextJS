import mongoose from "mongoose";
const jobSchema = new mongoose.Schema({
  companyName: String,
  title: String,
  location: String,
  type: String,
  experience: String,
  description: String,
  skills: String,
  recruiterId: String,
  applicants: [
    {
      name: String,
      email: String,
      userId: String,
      status: String, // accepted or rejected
    },
  ],
});

const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);

export default Job;
