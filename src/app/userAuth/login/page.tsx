/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import Input from "../../../components/input";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { userActions } from "../../../store/userSlice";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { LogIn, Mail, User, Lock, Sparkles, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [errorMsg, setErrorMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const url = process.env.url;
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleFormSubmittion = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsProcessing(true);

    const fd = new FormData(event.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const userData = {
      email: data.email,
      password: data.password,
      username: data.username,
    };

    const response = await fetch(url + "/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
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

      setIsProcessing(false);
      setIsLoggedIn(true);
      toast("Login Successful", {
        description: "User has been logged in successfully",
        action: {
          label: "Okay",
          onClick: () => console.log("Welcome back to the App"),
        },
      });
    } else {
      const error = await response.json();

      setErrorMessage(error.msg);
      setIsProcessing(false);
      setIsLoggedIn(false);
    }
  };

  if (isLoggedIn) {
    redirect("/");
  }

  return (
    <main className="w-screen flex justify-center pt-8 bg-background">
      <div className="flex flex-col justify-center items-center w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow-md px-6 py-10 gap-8">
        {/* Heading with icon */}
        <div className="flex flex-col items-center gap-2">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-orange-100 mb-1 shadow-sm">
            <LogIn className="w-7 h-7 text-orange-400" />
          </span>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
            Welcome back <Sparkles className="w-5 h-5 text-orange-400" />
          </h3>
          <p className="text-base text-muted-foreground mt-1 flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-blue-400" />
            Sign in to your Vidloom account
          </p>
        </div>

        {/* Error message */}
        {errorMsg ? (
          <p className="text-red-400 text-sm relative text-center">
            {errorMsg}
          </p>
        ) : null}

        {/* Login Form */}
        <form
          className="flex flex-col gap-6 w-full"
          onSubmit={handleFormSubmittion}
        >
          <div className="flex flex-col gap-4">
            <div className="relative w-full">
              <Input
                name="email"
                placeholder="Email"
                type="email"
                className="pl-10"
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
            <div className="text-center text-sm text-gray-500">or</div>
            <div className="relative w-full">
              <Input
                name="username"
                placeholder="Username"
                type="text"
                className="pl-10"
              />
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative w-full">
              <Input
                name="password"
                placeholder="Password"
                type="password"
                required
                className="pl-10"
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-2">
            {isProcessing ? (
              <button
                className="bg-orange-200 border text-orange-600 w-full animate-pulse hover:bg-orange-100 duration-700 px-4 py-3 rounded font-semibold flex items-center justify-center gap-2"
                disabled
              >
                <Sparkles className="w-5 h-5 animate-spin" /> Logging in...
              </button>
            ) : (
              <button className="bg-orange-200 border text-orange-600 w-full hover:bg-orange-100 duration-500 px-4 py-3 rounded font-semibold flex items-center justify-center gap-2">
                <LogIn className="w-5 h-5" /> Log in
              </button>
            )}
            <div className="flex flex-col items-center">
              <p className="text-[15px] text-gray-400">
                Don't have an account yet?{" "}
                <span className="text-orange-400 ml-2">
                  <Link
                    href="/userAuth/register"
                    className="font-bold underline"
                  >
                    Register
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
