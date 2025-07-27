"use client";

import Footer from "@/components/Footer";
import HomePage from "@/components/HomePage";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { motion } from "motion/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "@/store/userSlice";
import { toast } from "sonner";
import { cookies } from "next/headers";
import { LoadingScreen } from "@/components/loadingScreen";

export default function Home() {
  const userData = useSelector((state: any) => state.user);
  const user = userData.user[0];
  const [isGuestLoading, setIsGuestLoading] = useState(false);
  const dispatch = useDispatch();

  const handleGuestLogin = async () => {
    setIsGuestLoading(true);

    try {
      const url = process.env.url;
      const guestCredentials = {
        email: "user02@example.com",
        password: "mrbeast",
        username: "user02",
      };

      const response = await fetch(url + "/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(guestCredentials),
      });

      if (response.ok) {
        const res_data = await response.json();
        const data = res_data.data;
        const userData = data.user;

        // Store user data in local storage
        const currentTime = new Date().getTime();
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("timestamp", JSON.stringify(currentTime));

        dispatch(
          userActions.updateUser({
            username: userData.username,
            email: userData.email,
            avatar: userData.avatar,
            coverImage: userData.coverImage,
            fullName: userData.fullName,
            watchHistory: userData.watchHistory,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            id: userData._id,
          })
        );

        toast("Guest Login Successful", {
          description: "Welcome! You're now logged in as a guest.",
          action: {
            label: "Okay",
            onClick: () => console.log("Welcome guest user"),
          },
        });
      } else {
        const error = await response.json();
        toast("Guest Login Failed", {
          description: error.msg || "Failed to login as guest",
          action: {
            label: "Okay",
            onClick: () => console.log("Guest login failed"),
          },
        });
      }
    } catch {
      toast("Connection Error", {
        description: "Failed to connect to the server",
        action: {
          label: "Okay",
          onClick: () => console.log("Connection error"),
        },
      });
    } finally {
      setIsGuestLoading(false);
    }
  };

  if (isGuestLoading) {
    // Show your beautiful loading screen while logging in as guest
    return <LoadingScreen />;
  }

  if (!user) {
    return (
      <main className="flex flex-col items-center justify-center h-screen bg-background relative overflow-hidden">
        {/* Animated blurred background blobs using motion */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/3 w-96 h-96 bg-orange-300 opacity-30 rounded-full filter blur-3xl"
            animate={{
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-2/3 right-1/4 w-80 h-80 bg-purple-300 opacity-30 rounded-full filter blur-2xl"
            animate={{
              y: [0, 20, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-0 left-1/2 w-72 h-72 bg-blue-300 opacity-20 rounded-full filter blur-2xl"
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="relative z-10 flex pb-40 flex-col items-center justify-center text-center px-4 w-full max-w-2xl">
          {/* Animated heading with blur entry effect using motion */}
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold text-foreground drop-shadow-lg mb-2"
            initial={{ opacity: 0, filter: "blur(32px)", y: 40 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 0.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Welcome to <span className="text-orange-400">Vidloom</span>
          </motion.h1>
          {/* Animated subtext with blur entry effect using motion */}
          <motion.p
            className="text-lg md:text-2xl text-muted-foreground mb-8 max-w-xl mx-auto"
            initial={{ opacity: 0, filter: "blur(32px)", y: 40 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 0.7, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            Discover, share, and enjoy videos from creators around the world.
            Join us or jump right in!
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-2"
            initial={{ opacity: 0, filter: "blur(32px)", y: 40 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 1, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/userAuth/register"
              className="px-6 py-3 rounded-lg bg-orange-400 text-white font-semibold shadow hover:bg-orange-500 transition"
            >
              Register
            </Link>
            <button
              onClick={handleGuestLogin}
              disabled={isGuestLoading}
              className="px-6 py-3 rounded-lg bg-secondary text-foreground font-semibold shadow hover:bg-secondary/80 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGuestLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-foreground border-t-transparent rounded-full animate-spin"></div>
                  <span>Logging in...</span>
                </div>
              ) : (
                "Continue as Guest"
              )}
            </button>
          </motion.div>

          {/* Extra content for engagement using motion */}
          <motion.div
            className="mt-12 flex flex-col items-center gap-4"
            initial={{ opacity: 0, filter: "blur(32px)", y: 40 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 1.4, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 bg-orange-400 rounded-full animate-pulse" />
              <span className="text-sm text-muted-foreground">
                No account needed to explore trending videos!
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-sm text-muted-foreground">
                Sign up to like, comment, and create playlists.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 bg-purple-400 rounded-full animate-pulse" />
              <span className="text-sm text-muted-foreground">
                Enjoy a seamless, ad-free experience.
              </span>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="flex min-h-screen flex-col items-start justify-between md:pt-16 sm:pt-8 md:px-10 sm:mx-4">
        <div>
          <HomePage />
        </div>
      </div>

      <Footer />
    </main>
  );
}
