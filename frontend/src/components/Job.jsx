import React, { useState } from "react";
import { Button } from "./ui/button";
import { Bookmark, CheckCircle } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const [savedJobs, setSavedJobs] = useState(() => {
    const saved = localStorage.getItem("savedJobs");
    return saved ? JSON.parse(saved) : [];
  });

  const isJobSaved = savedJobs.some((savedJob) => savedJob._id === job._id);

  const handleSaveJob = (job) => {
    if (isJobSaved) {
      const updatedSavedJobs = savedJobs.filter((savedJob) => savedJob._id !== job._id);
      setSavedJobs(updatedSavedJobs);
      localStorage.setItem("savedJobs", JSON.stringify(updatedSavedJobs));
    } else {
      const updatedSavedJobs = [...savedJobs, job];
      setSavedJobs(updatedSavedJobs);
      localStorage.setItem("savedJobs", JSON.stringify(updatedSavedJobs));
    }
  };

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button
          variant="outline"
          className={`rounded-full ${isJobSaved ? "bg-green-500 text-white" : ""}`}
          size="icon"
          onClick={() => handleSaveJob(job)}
        >
          {isJobSaved ? <CheckCircle /> : <Bookmark />}
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Avatar>
          <AvatarImage src={job?.company?.logo} />
        </Avatar>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className={"text-[#F83002] font-bold"} variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
          {job?.salary}LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">
          Details
        </Button>
        <Button
          className={`bg-[#7209b7] ${isJobSaved ? "opacity-70" : ""}`}
          onClick={() => handleSaveJob(job)}
        >
          {isJobSaved ? "Saved" : "Save for Later"}
        </Button>
      </div>
    </div>
  );
};

export default Job;
