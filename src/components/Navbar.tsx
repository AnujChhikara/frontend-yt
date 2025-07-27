"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {} from "@/store/userSlice";
import {
  Clapperboard,
  History,
  Home,
  ListVideo,
  Menu,
  MessageSquareQuote,
  ThumbsUp,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/userSlice";
import Navigation from "./Navigation";

function Navbar() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedTime = localStorage.getItem("timestamp");

    if (storedUser) {
      const currentTime = new Date().getTime();
      const timeStamp = JSON.parse(storedTime!);
      const timeElapsed = currentTime - timeStamp;

      const timeLimit = 4 * 60 * 60 * 1000; // 4 hours in milliseconds

      if (timeElapsed >= timeLimit) {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      } else {
        const parsedUser = JSON.parse(storedUser);
        const storedAccessToken = localStorage.getItem("accessToken");
        const storedRefreshToken = localStorage.getItem("refreshToken");

        // Initialize Redux state with stored user data
        dispatch(
          userActions.updateUser({
            username: parsedUser.username,
            email: parsedUser.email,
            avatar: parsedUser.avatar,
            coverImage: parsedUser.coverImage,
            fullName: parsedUser.fullName,
            watchHistory: parsedUser.watchHistory,
            accessToken: storedAccessToken,
            refreshToken: storedRefreshToken,
            id: parsedUser._id,
          })
        );
      }
    }
  }, [dispatch]);

  const userData = useSelector((state: any) => state.user);
  const user = userData.user[0];

  return (
    <div>
      <div className="w-screen shadow-lg md:py-2 sm:py-1 ">
        <div className="flex justify-between items-center md:px-12 sm:px-2 py-2">
          <div className="flex space-x-4">
            {user && (
              <Sheet>
                <SheetTrigger>
                  <Menu />
                </SheetTrigger>
                <SheetContent side={"left"} className="w-60">
                  <SheetHeader>
                    <SheetTitle className="pt-4 underline mb-8">
                      Welcome to Vidloom
                    </SheetTitle>
                  </SheetHeader>

                  <SheetDescription className="flex flex-col space-y-4">
                    <SheetClose asChild>
                      <Link href="/">
                        <Button className="flex w-48 pl-8 items-end justify-start text-start space-x-1">
                          <Home size={20} />
                          <p>Home Page</p>
                        </Button>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/user/likedVideos">
                        <Button className="flex w-48 pl-8  items-end justify-start space-x-1">
                          <ThumbsUp size={20} />
                          <p>Like Videos</p>
                        </Button>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/user/watchHistory">
                        <Button className="flex w-48 pl-8  items-end justify-start space-x-1">
                          <History size={20} />
                          <p>Watch History</p>
                        </Button>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/userPlaylist">
                        <Button className="flex w-48 pl-8  items-end justify-start space-x-1">
                          <ListVideo size={20} />
                          <p>Your Playlists</p>
                        </Button>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/myThoughts">
                        <Button className="flex w-48 pl-8   items-end justify-start space-x-1">
                          <MessageSquareQuote size={20} />
                          <p>Thoughts</p>
                        </Button>
                      </Link>
                    </SheetClose>
                  </SheetDescription>
                </SheetContent>
              </Sheet>
            )}
            <Link href="/">
              <div className="flex justify-center items-center gap-1">
                <Clapperboard />

                <h1 className="font-semibold  text-2xl text-foreground">
                  Vidloom
                </h1>
              </div>
            </Link>
          </div>

          <div className="flex flex-row-reverse justify-center items-center pr-2 ">
            {user && (
              <>
                <Navigation />

                <Link href="/videoUpload">
                  <Upload className="mr-6" />
                </Link>
              </>
            )}
            {!user && (
              <div className="flex flex-row gap-2">
                <Link
                  className="font-semibold focus:underline"
                  href="/userAuth/login"
                >
                  <Button variant={"outline"}>Log In</Button>
                </Link>
                <Link className=" font-semibold" href="/userAuth/register">
                  <Button>Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
