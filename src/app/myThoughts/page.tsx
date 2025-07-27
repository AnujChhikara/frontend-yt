"use client";

import { Plus } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllTweets, getUserLikedTweets, getUserTweets } from "@/functions";
import { useDispatch, useSelector } from "react-redux";
import { redirect } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import Tweets from "@/components/Thought";
import { userActions } from "@/store/userSlice";

export default function MyThoughts() {
  const [allTweets, setAllTweets] = useState<any>([]);
  const [userTweets, setUserTweets] = useState<any>([]);
  const [userLikedTweets, setUserLikedTweets] = useState<any>([]);
  const [isPosting, setIsPosting] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const data = useSelector((state: any) => state.user);
  const user = data.user[0];
  const dispatch = useDispatch();

  if (!user) {
    redirect("/");
  }
  //getting all tweets
  const getTweets = useCallback(async () => {
    const response = await getAllTweets({ accessToken: user.accessToken });
    if (response.status === true) {
      const res_data = response.data;
      setAllTweets(res_data.data);
    } else {
      console.log(response.data);
    }
  }, [user.accessToken]);

  useEffect(() => {
    getTweets();
  }, [user, getTweets]);

  //getting logged in User tweets

  useEffect(() => {
    const fetchUserTweet = async () => {
      const response = await getUserTweets({
        accessToken: user.accessToken,
        userId: user.id,
      });

      if (response.status === true) {
        const data = response.data.data;
        setUserTweets(data);
      } else {
        console.log(response.data);
      }
    };
    if (user) {
      fetchUserTweet();
    }
  }, [user]);

  //getting logged in user liked tweets
  useEffect(() => {
    const likedTweets = async () => {
      const response = await getUserLikedTweets({
        accessToken: user.accessToken,
      });

      if (response.status === true) {
        setUserLikedTweets(response.data.data);
      } else {
        console.log("error" + response.data);
      }
    };
    if (user) {
      likedTweets();
    }
  }, [user]);

  //  posting new tweet
  const handleFormSubmittion = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsPosting(true);
    const fd = new FormData(event.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const tweet = {
      tweet: data.tweet,
    };

    const response = await fetch(process.env.url + "/tweets", {
      method: "POST",

      headers: {
        Authorization: `Bearer ${user.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tweet),
    });

    if (response.ok) {
      const res_data = await response.json();
      dispatch(userActions.isChanged({}));
      buttonRef.current?.click();
      // After posting successfully, refetch tweets
      getTweets();
    } else {
      const error = await response.json();
      console.log(error);
    }
    setIsPosting(false);
  };

  return (
    <div className="flex h-screen flex-col pt-12 space-y-20 justify-start items-center">
      <div className="w-screen flex sm:px-4 justify-around">
        <div></div>
        <div className="">
          <h1 className="md:text-6xl sm:text-3xl font-bold">
            The conversation starts here
          </h1>
          <h2 className="text-muted-foreground">
            Join the platform for Web enthusiasts and access the latest
            discussions, news, and insights.
          </h2>
        </div>
        <div>
          <Dialog>
            <DialogTrigger className="">
              {" "}
              <Plus
                className="bg-accent px-2 hover:-translate-y-1 hover:scale-105 duration-500 rounded-full"
                size={40}
              />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-gray-400">
                  What&apos;s on your mind?
                </DialogTitle>

                <form
                  className="flex pt-8 flex-col justify-center items-center space-y-4"
                  onSubmit={handleFormSubmittion}
                >
                  <Textarea name="tweet" />

                  {isPosting ? (
                    <button
                      disabled
                      className="px-8 bg-gray-400 rounded-xl animate-pulse  duration-500 text-accent font-bold  py-2 "
                    >
                      Posting
                    </button>
                  ) : (
                    <button className="px-8 hover:bg-gray-400 rounded-xl duration-500 text-accent font-bold  py-2 bg-white">
                      Post
                    </button>
                  )}
                </form>
              </DialogHeader>
              <DialogClose asChild>
                <button ref={buttonRef} className="hidden">
                  close
                </button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Tabs defaultValue="AllTweets" className="md:w-5/6  sm:w-[340px] ">
        <TabsList className="md:w-[800px] mb-8 md:px-8 md:justify-between bg-gray-900 sm:w-[340px]">
          <TabsTrigger value="AllTweets">
            {" "}
            <div className="flex items-center  cursor-pointer">
              <p>Home</p>
            </div>{" "}
          </TabsTrigger>
          <TabsTrigger value="YourTweets">
            <div className="flex items-center space-x-1  cursor-pointer">
              {" "}
              <p>Your Thoughts</p>
            </div>{" "}
          </TabsTrigger>
          <TabsTrigger value="LikedTweets">
            <div className="flex items-center space-x-1  cursor-pointer">
              <p>Liked Thoughts</p>
            </div>{" "}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="AllTweets">
          <div className="grid grid-cols-1 md:grid-cols-3  gap-8">
            {allTweets && (
              <>
                {allTweets
                  .slice()
                  .reverse()
                  .map((tweet: any) => (
                    <Tweets
                      key={tweet._id}
                      id={tweet._id}
                      tweet={tweet.content}
                      createdAt={tweet.createdAt}
                      userId={tweet.owner}
                      accessToken={user.accessToken}
                    />
                  ))}
              </>
            )}
          </div>
        </TabsContent>
        <TabsContent value="YourTweets">
          <div className="grid grid-cols-1 md:grid-cols-3  gap-8">
            {userTweets && (
              <>
                {userTweets
                  .slice()
                  .reverse()
                  .map((tweet: any) => (
                    <Tweets
                      key={tweet._id}
                      id={tweet._id}
                      tweet={tweet.content}
                      createdAt={tweet.createdAt}
                      userId={tweet.owner}
                      accessToken={user.accessToken}
                    />
                  ))}
              </>
            )}
          </div>
        </TabsContent>

        <TabsContent value="LikedTweets">
          {userLikedTweets && (
            <div className="grid grid-cols-1 md:grid-cols-3  gap-8">
              {userLikedTweets.map((item: any) => {
                return item
                  .slice()
                  .reverse()
                  .map((tweet: any) => (
                    <Tweets
                      key={tweet._id}
                      id={tweet._id}
                      tweet={tweet.content}
                      createdAt={tweet.createdAt}
                      userId={tweet.owner}
                      accessToken={user.accessToken}
                    />
                  ));
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
