import React, { useState, useEffect } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

const SaveJobPage = () => {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("savedJobs");
    if (saved) {
      setSavedJobs(JSON.parse(saved));
    }
  }, []);

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-5">
      {savedJobs.length === 0 ? (
        <p>No jobs saved yet.</p>
      ) : (
        <div className="grid gap-6">
          {savedJobs.map((job, index) => (
            <div key={index} className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SaveJobPage;
