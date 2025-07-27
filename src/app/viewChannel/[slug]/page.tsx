"use client";
import { Button } from "@/components/ui/button";
import { InfoIcon, ListVideo, Youtube } from "lucide-react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import {
  GetUserPlaylists,
  ToggleSubscription,
  checkIfSubscribed,
  formatTimeDifference,
  getChannelStats,
  getUserByID,
  getUserVideos,
} from "@/functions";
import Video from "@/components/video";
import { redirect } from "next/navigation";
import PlaylistCard from "@/components/PlaylistCard";

export default function ViewChannel({ params }: { params: { slug: string } }) {
  const userData = useSelector((state: any) => state.user);
  const user = userData.user[0];
  const id = params.slug;

  if (!user) {
    redirect("/");
  }

  const [userVideos, setUserVideos] = useState<any>();
  const [userPlaylistData, setUserPlaylistData] = useState<any>();
  const [channelOwner, setChannelOwner] = useState<any>();
  const [channelStats, setChannelStats] = useState<any>();
  const [subscribe, setSubscribe] = useState(false);

  //getting user video
  useEffect(() => {
    const fetchUserVideos = async () => {
      try {
        const userVideos = await getUserVideos({
          userId: id,
          accessToken: user.accessToken,
        });
        setUserVideos(userVideos);
      } catch (error) {
        // Handle error if any
        console.error("Error fetching user videos:", error);
      }
    };

    fetchUserVideos();
  }, [id, user.accessToken]);

  //getting user by id
  useEffect(() => {
    const fetchVideoOwner = async () => {
      const response = await getUserByID({
        userId: id,
        accessToken: user.accessToken,
      });
      if (response.status === true) {
        setChannelOwner(response.data);
      } else {
        console.log(response.data);
      }
    };
    if (user) {
      fetchVideoOwner();
    }
  }, [id, user]);

  //checking if user already subscribed?
  useEffect(() => {
    const checkSubscribed = async () => {
      const response = await checkIfSubscribed({
        accessToken: user.accessToken,
        channelId: channelOwner?._id,
      });

      if (response?.subscribe === true) {
        const data = response.data;
        setSubscribe(data.subscribed);
      } else {
        setSubscribe(false);
      }
    };
    if (channelOwner) {
      checkSubscribed();
    }
  }, [user, channelOwner]);

  //getting user Playlists

  useEffect(() => {
    const getUserPlaylist = async () => {
      const response = await GetUserPlaylists({
        accessToken: user.accessToken,
        userId: user.id,
      });
      if (response.status === true) {
        setUserPlaylistData(response.data.data);
      } else {
        console.log("Error fetching user playlist");
      }
    };
    if (user) {
      getUserPlaylist();
    }
  }, [user]);

  const handleSubscribeButton = () => {
    ToggleSubscription;
    setSubscribe(!subscribe);
    ToggleSubscription({
      channelId: channelOwner?._id,
      accessToken: user.accessToken,
    });
  };

  useEffect(() => {
    const getUserChannel = async () => {
      const stats = await getChannelStats({
        accessToken: user.accessToken,
        channelId: user.id,
      });
      setChannelStats(stats);
    };

    getUserChannel();
  }, [user]);

  // Convert CreatedAt to IST (India Standard Time)
  const createdAtUTC = new Date(channelOwner?.createdAt);
  const createdAtIST = createdAtUTC.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });

  return (
    <div className="w-screen flex justify-center items-center">
      <div className="flex flex-col pt-4 justify-center items-center">
        <div className="flex flex-col items-start space-y-8">
          <div>
            {channelOwner && (
              <Image
                width={400}
                height={200}
                className="md:w-[800px] sm:w-[340px] md:h-32 rounded-lg"
                alt="banner"
                src={channelOwner?.coverImage}
              />
            )}
          </div>
          <div className="sm:flex sm:flex-col md:flex md:flex-row md:space-x-8">
            {channelOwner && (
              <Image
                width={200}
                height={200}
                className="rounded-xl shadow-md shadow-white"
                alt="banner"
                src={channelOwner?.avatar}
              />
            )}

            <div className="mt-4 space-y-2">
              <h4 className="font-bold text-4xl">{channelOwner?.fullName}</h4>
              <div className="text-gray-400 flex space-x-4 justify-start pb-2 items-center">
                <div>@{channelOwner?.username}</div>{" "}
                <div className="bg-muted text-muted-foreground px-2  rounded-2xl opacity-60">
                  {channelStats?.totalSubscribers} Subscribers
                </div>
              </div>
              {subscribe ? (
                <button
                  onClick={handleSubscribeButton}
                  className="bg-green-500 px-3 py-2 rounded-3xl"
                >
                  Subscribed
                </button>
              ) : (
                <button
                  onClick={handleSubscribeButton}
                  className="bg-red-500 px-3 py-2 rounded-3xl hover:bg-red-400"
                >
                  Subscribe
                </button>
              )}
            </div>
          </div>
        </div>
        <hr className="border-gray-300 h-1 md:w-[800px] sm:w-[320px] my-6" />
        <div className="flex flex-col">
          <Tabs defaultValue="videos" className="md:w-[800px]  sm:w-[340px] ">
            <TabsList className="md:w-[800px] mb-8 md:px-8 md:justify-between px-4 bg-black sm:w-[340px]">
              <TabsTrigger value="videos">
                {" "}
                <div className="flex items-center cursor-pointer">
                  <ListVideo size={20} />
                  <p>Videos</p>
                </div>{" "}
              </TabsTrigger>
              <TabsTrigger value="playlist">
                <div className="flex items-center space-x-1  cursor-pointer">
                  {" "}
                  <Youtube size={20} />
                  <p>Playlists</p>
                </div>{" "}
              </TabsTrigger>
              <TabsTrigger value="info">
                <div className="flex items-center space-x-1  cursor-pointer">
                  {" "}
                  <InfoIcon size={20} />
                  <p>Channel Info</p>
                </div>{" "}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="videos">
              {
                <>
                  {userVideos &&
                  userVideos.some((video: any = {}) => video.isPublished) ? (
                    <div className="md:flex md:flex-row md:flex-wrap md:gap-8 mt-4 sm:flex sm:flex-col sm:space-y-4 sm:items-center">
                      {userVideos.map(
                        (video: any = {}) =>
                          video.isPublished && (
                            <div key={video._id}>
                              <Video
                                key={video._id}
                                videoId={video._id}
                                title={video.title}
                                videoUrl={video.videoFile}
                                thumbnailUrl={video.thumbnail}
                                owner={id}
                                views={video.view}
                                createdAt={video.createdAt}
                                duration={video.duration}
                                description={video.description}
                                isPublished={video.isPublished}
                                edit={false}
                              />
                            </div>
                          )
                      )}
                    </div>
                  ) : (
                    <div>
                      {/* Render something else here when there are no published videos */}
                      No published videos found.
                    </div>
                  )}
                </>
              }
            </TabsContent>
            <TabsContent value="playlist">
              <div className="md:flex md:flex-row md:flex-wrap md:gap-8 mt-4 sm:flex sm:flex-col sm:space-y-4 sm:items-center">
                {userPlaylistData &&
                  userPlaylistData.map((playlist: any) => {
                    const updatedAt = formatTimeDifference(playlist.updatedAt);
                    const videoCount = playlist.videos
                      ? playlist.videos.length
                      : 0;
                    const thumbnail =
                      playlist &&
                      playlist.videos &&
                      playlist.videos[0] &&
                      playlist.videos[0].thumbnail
                        ? playlist.videos[0].thumbnail
                        : "https://res.cloudinary.com/dlahahicg/image/upload/v1713085405/imgEmpty_n2fiyp.jpg";

                    return (
                      <PlaylistCard
                        key={playlist._id}
                        playlistId={playlist._id}
                        description={playlist.description}
                        owner={user!.fullName}
                        name={playlist.name}
                        thumbnail={thumbnail}
                        videoCount={videoCount}
                        ownerId={playlist.owner}
                        userId={user.id}
                        accessToken={user.accessToken}
                        updatedAt={updatedAt}
                      />
                    );
                  })}
              </div>
            </TabsContent>
            <TabsContent value="info">
              <div>
                <h2>Channel Name:- {channelOwner?.fullName}</h2>
                <p>Joined:-{createdAtIST} IST</p>
                <p>username:-@{channelOwner?.username}</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
