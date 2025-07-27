"use client";
import { Input } from "@/components/ui/input";
import {
  Image as ImageIcon,
  Lock,
  Mail,
  Sparkles,
  User,
  UserPlus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useRef, useState } from "react";
import { toast } from "sonner";

export default function RegsiterPage() {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    null
  );
  const [errorMsg, setErrorMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRegisteredSuccessfully, setIsRegisteredSuccessfully] =
    useState(false);

  const avatarFileInputRef = useRef<HTMLInputElement>(null);
  const coverImageFileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarFileSelect = () => {
    avatarFileInputRef.current!.click();
  };

  const handleAvatarFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target!.files![0];
    if (file) {
      // Read the selected file and create a data URL representing the image
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setAvatarPreview(result); // Set the data URL as the image preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverImageFileSelect = () => {
    coverImageFileInputRef.current!.click();
  };

  const handleCoverImageFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target!.files![0];
    if (file) {
      // Read the selected file and create a data URL representing the image
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setCoverImagePreview(result); // Set the data URL as the image preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handelFormSubmittion = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsProcessing(true);
    if (!avatarPreview) {
      setErrorMessage("avatar required!");
      setIsProcessing(false);
      return;
    }

    const formData = new FormData();
    formData.append("fullName", event.currentTarget.fullName.value);
    formData.append("username", event.currentTarget.username.value);
    formData.append("email", event.currentTarget.email.value);
    formData.append("password", event.currentTarget.password.value);
    formData.append("avatar", avatarFileInputRef.current!.files![0]);
    formData.append("coverImage", coverImageFileInputRef.current!.files![0]);

    const response = await fetch(process.env.url + "/users/register", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      setIsRegisteredSuccessfully(true);
      setIsProcessing(false);
      toast("Registration Successful", {
        description: "User has been register successfully",
        action: {
          label: "Okay",
          onClick: () => console.log("Welcome to the App"),
        },
      });
    } else {
      const error = await response.json();
      setErrorMessage(error.msg);
      setIsProcessing(false);
    }
  };

  if (isRegisteredSuccessfully) {
    redirect("/userAuth/login");
  }

  return (
    <main className="w-screen flex justify-center pt-8 bg-background ">
      <div className="flex flex-col justify-center items-center w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow-md px-6 py-10 gap-8">
        {/* Heading with icon */}
        <div className="flex flex-col items-center gap-2">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-orange-100 mb-1 shadow-sm">
            <UserPlus className="w-7 h-7 text-orange-400" />
          </span>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
            Create your account <Sparkles className="w-5 h-5 text-orange-400" />
          </h3>
          <p className="text-base text-muted-foreground mt-1 flex items-center gap-2">
            <User className="w-4 h-4 text-blue-400" />
            Join Vidloom and start sharing your story
          </p>
        </div>

        {/* Error message */}
        {errorMsg ? (
          <p className="text-red-400 text-sm relative text-center">
            {errorMsg}
          </p>
        ) : null}

        {/* Registration Form */}
        <form
          className="flex flex-col gap-6 w-full"
          onSubmit={handelFormSubmittion}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative w-full">
              <Input
                name="username"
                placeholder="Username"
                type="text"
                required
                className="pl-10"
              />
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative w-full">
              <Input
                name="email"
                placeholder="Email"
                type="email"
                required
                className="pl-10"
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative w-full">
              <Input
                name="fullName"
                placeholder="Full name"
                type="text"
                required
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
          <div className="flex flex-col md:flex-row gap-4">
            {/* Avatar upload */}
            <div className="w-full flex flex-col items-center gap-2">
              <input
                ref={avatarFileInputRef}
                accept="image/jpeg, image/png, image/jpg"
                onChange={handleAvatarFileChange}
                type="file"
                hidden
                name="avatar"
                id="avatar"
              />
              <div
                onClick={handleAvatarFileSelect}
                className="flex items-center gap-2 cursor-pointer w-full border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
              >
                {avatarPreview ? (
                  <Image
                    width={40}
                    height={40}
                    src={avatarPreview}
                    alt="Avatar Preview"
                    className=" w-10 h-10"
                  />
                ) : (
                  <span className="w-10 h-10 flex items-center justify-center  bg-gray-200">
                    <ImageIcon className="w-6 h-6 text-gray-400" />
                  </span>
                )}
                <span className="text-sm text-gray-600">
                  Upload your avatar
                </span>
              </div>
            </div>
            {/* Cover image upload */}
            <div className="w-full flex flex-col items-center">
              <input
                type="file"
                ref={coverImageFileInputRef}
                accept="image/jpeg, image/png, image/jpg"
                onChange={handleCoverImageFileChange}
                hidden
                name="coverImage"
                id="coverImage"
              />
              <div
                onClick={handleCoverImageFileSelect}
                className="flex items-center gap-2 cursor-pointer w-full border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
              >
                {coverImagePreview ? (
                  <Image
                    width={40}
                    height={40}
                    src={coverImagePreview}
                    alt="Cover Preview"
                    className="rounded w-10 h-10 object-cover"
                  />
                ) : (
                  <span className="w-10 h-10 flex items-center justify-center rounded bg-gray-200">
                    <ImageIcon className="w-6 h-6 text-gray-400" />
                  </span>
                )}
                <span className="text-sm text-gray-600">
                  Upload cover image
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row  gap-16 items-center pt-2">
            {isProcessing ? (
              <button
                type="submit"
                className="bg-orange-200 border text-orange-600 w-full md:w-48  hover:bg-orange-100 duration-700 px-4 py-3 rounded font-semibold flex items-center justify-center gap-2"
                disabled
              >
                <Sparkles className="w-5 h-5 animate-spin" /> Registering user
              </button>
            ) : (
              <button
                type="submit"
                className="bg-orange-200 border text-orange-600 w-full md:w-48 hover:bg-orange-100 duration-500 px-4 py-3 rounded font-semibold flex items-center justify-center gap-2"
              >
                <UserPlus className="w-5 h-5" /> Register
              </button>
            )}
            <div className="flex flex-col items-center">
              <p className="text-[15px] text-gray-400">
                Already registered?{" "}
                <span className="text-orange-400 ml-2">
                  <Link href="/userAuth/login" className="font-bold underline ">
                    Login
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </form>

        <div className="flex flex-col items-center text-center mt-2">
          <p className="text-[12px] text-gray-400 text-center">
            * By registering here, you agree to our Terms of
          </p>
          <p className="text-[12px] text-gray-400 text-center">
            Service and Privacy Policy.
          </p>
        </div>
      </div>
    </main>
  );
}
