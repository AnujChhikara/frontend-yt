import {
  addVideoToWatchHistory,
  formatSecondsToMinutes,
  formatTimeDifference,
  getUserByID,
} from "@/functions";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BadgeCheck } from "lucide-react";
import { VideoEditButton } from "./compUi/videoEditButton";

interface VideoProps {
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: number;
  owner: any;
  views: number;
  videoId: string;
  createdAt: string;
  description: string;
  edit: boolean;
  isPublished: boolean;
}

const Video: React.FC<VideoProps> = ({
  title,
  isPublished,
  videoId,
  thumbnailUrl,
  duration,
  owner,
  views,
  createdAt,
  edit,
}) => {
  const data = useSelector((state: any) => state.user);
  const user = data.user[0];
  const [ownerDetails, setOwnerDetails] = useState<any>();
  const [videoOwner, setVideoOwner] = useState(false);

  //getting video owner details
  useEffect(() => {
    const fetchVideoOwner = async () => {
      const response = await getUserByID({
        userId: owner,
        accessToken: user.accessToken,
      });
      if (response.status === true) {
        setOwnerDetails(response.data);
      } else {
        console.log(response.data);
      }
    };
    if (user) {
      fetchVideoOwner();
    }
  }, [user, owner]);

  //checking if logged in user is owner of video

  useEffect(() => {
    if (user.id === ownerDetails?._id) {
      setVideoOwner(true);
    }
  }, [user, ownerDetails]);

  //coverting created at to real time

  const formattedTimeDifference = formatTimeDifference(createdAt);
  const videoDuration = formatSecondsToMinutes(duration);

  function handleClick() {
    const addingVideoToWatchHistory = async () => {
      await addVideoToWatchHistory({
        videoId: videoId,
        accessToken: user.accessToken,
      });
    };

    addingVideoToWatchHistory();
  }

  return (
    <div className="flex flex-col items-start space-y-2 font-bold text-gray-300">
      <div className="flex relative">
        <Link
          onClick={handleClick}
          href={`/watchVideo/${videoId}`}
          className="flex items-end justify-end"
        >
          <div className="">
            <Image
              width={340}
              height={200}
              className="w-[340px] h-[200px] hover:opacity-50 duration-500 rounded-md"
              src={thumbnailUrl}
              alt="Thumbnail"
            />
          </div>

          <span className="bg-foreground absolute text-background rounded-xl px-2  py-0.5 mb-1 text-[12px] ">
            {videoDuration}
          </span>
        </Link>
        {edit && videoOwner && (
          <VideoEditButton
            key={videoId}
            isPublished={isPublished}
            videoId={videoId}
          />
        )}
      </div>

      <div className="flex items-start space-x-2">
        <Avatar className="w-10 h-10">
          <AvatarImage src={ownerDetails?.avatar} />
          <AvatarFallback>AC</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h3 className="md:w-60 text-sm">{title}</h3>
          <div className=" md:w-60 sm:w-60  flex items-center justify-between">
            <Link href={`/viewChannel/${ownerDetails?._id}`}>
              <div className="flex items-center space-x-1">
                <h4 className="text-[12px] text-gray-300">
                  {" "}
                  {ownerDetails?.fullName}
                </h4>
                <p>
                  <BadgeCheck size={14} />
                </p>
              </div>
            </Link>

            <div className="text-[11px] flex items-center space-x-2   text-gray-400">
              <p>{views} views</p>

              <p>{formattedTimeDifference}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
