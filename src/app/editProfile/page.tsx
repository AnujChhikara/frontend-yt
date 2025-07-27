"use client";

import {
  changeUserPassword,
  updateUserAccount,
  updateUserAvatar,
  updateUserCoverImage,
} from "@/functions";
import { redirect } from "next/navigation";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { userActions } from "@/store/userSlice";
import Image from "next/image";
import { Pencil } from "lucide-react";

export default function EditProfile() {
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.user);
  const user = userData.user[0];

  const avatarFileInputRef = useRef<HTMLInputElement>(null);
  const coverImageFileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    null
  );

  const [errorMsg, setErrorMessage] = useState("");
  const [isPasswordChanging, setIsPasswordChanging] = useState(false);
  const [isuserDetailsChanging, setIsUserDetailsChanging] = useState(false);
  const [isUserAvatarUpdating, setIsUserAvatarUpdating] = useState(false);
  const [isUserCoverImageUpdating, setIsUserCoverImageUpdating] =
    useState(false);

  const clearLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  const logoutUser = () => {
    clearLocalStorage();
    dispatch(userActions.logoutUser({}));
  };

  if (!user) {
    redirect("/");
  }

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

  const handleChangePasswordForm = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    setIsPasswordChanging(true);
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const data = Object.fromEntries(fd.entries());

    const response = await changeUserPassword({
      accessToken: user.accessToken,
      oldPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
    if (response.status === true) {
      logoutUser();
    } else {
      setErrorMessage(response.data);
    }

    setIsPasswordChanging(false);
  };

  const handleAccountDetailsForm = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    setIsUserDetailsChanging(true);
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const response = await updateUserAccount({
      accessToken: user.accessToken,
      fullName: data.fullName,
      email: data.email,
    });
    if (response.status === true) {
      logoutUser();
    } else {
      setErrorMessage(response.data);
    }

    setIsUserDetailsChanging(false);
  };

  const handleUserAvatarForm = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsUserAvatarUpdating(true);

    const formData = new FormData();

    formData.append("avatar", avatarFileInputRef.current!.files![0]);

    const response = await updateUserAvatar({
      accessToken: user.accessToken,
      file: formData,
    });

    if (response.status) {
      const userData = response.data.data;
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("Avatar updated");
      dispatch(userActions.updateUserAvatar(userData.avatar));
    } else {
      setErrorMessage("failed to update user avatar");
    }

    setIsUserAvatarUpdating(false);
  };

  const handleUserCoverImageForm = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsUserCoverImageUpdating(true);

    const formData = new FormData();

    formData.append("coverImage", coverImageFileInputRef.current!.files![0]);

    const response = await updateUserCoverImage({
      accessToken: user.accessToken,
      file: formData,
    });

    if (response.status) {
      const userData = response.data.data;
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("Cover Image updated");
      dispatch(userActions.updateUserCoverImage(userData.coverImage));
    } else {
      setErrorMessage("failed to update user cover image");
    }

    setIsUserCoverImageUpdating(false);
  };

  return (
    <div className="flex flex-col items-center md:pt-20 sm:pt-8 pb-12">
      {/* updating user cover image */}

      <div>
        <form
          onSubmit={handleUserCoverImageForm}
          className="flex sm:px-4 md:px-0 flex-col justify-center items-center space-y-4"
        >
          <div className="flex flex-col  items-end justify-end">
            {coverImagePreview ? (
              <Image
                width={800}
                height={200}
                className="rounded-xl"
                src={coverImagePreview}
                alt="user cover image"
              />
            ) : (
              <Image
                width={800}
                height={200}
                className="rounded-xl"
                src={user!.coverImage}
                alt="user cover image"
              />
            )}

            <Pencil
              color="#000000"
              className="absolute m-2 hover:scale-110 duration-500"
              onClick={handleCoverImageFileSelect}
            />
            <Input
              required
              onChange={handleCoverImageFileChange}
              accept="image/jpeg, image/png, image/jpg"
              ref={coverImageFileInputRef}
              className="w-40 hidden"
              type="file"
              name="avatar"
              id="avatar"
            />
          </div>
          {isUserCoverImageUpdating ? (
            <button
              className="bg-white text-black px-4 py-2 hover:bg-gray-300 animate-pulse duration-700 rounded-lg text-sm font-semibold"
              type="submit"
            >
              Updating Cover image..
            </button>
          ) : (
            <button
              className="bg-white text-black px-4 py-2 hover:bg-gray-300 duration-300 rounded-lg text-sm font-semibold"
              type="submit"
            >
              Update CoverImage
            </button>
          )}
        </form>
      </div>

      <div className="pt-12 md:flex sm:flex-col sm:flex md:flex-row md:justify-around md:items-start md:space-x-40 sm:space-y-4 md:space-y-0">
        {/* for updating user avatar */}

        <div>
          <form
            onSubmit={handleUserAvatarForm}
            className="flex flex-col justify-center items-center space-y-4"
          >
            <div className="flex flex-col  items-end justify-end">
              {avatarPreview ? (
                <Image
                  width={200}
                  height={200}
                  className="rounded-xl"
                  src={avatarPreview}
                  alt="user avatar"
                />
              ) : (
                <Image
                  width={200}
                  height={200}
                  className="rounded-xl"
                  src={user!.avatar}
                  alt="user avatar"
                />
              )}

              <Pencil
                color="#000000"
                className="absolute m-2 hover:scale-110 duration-500"
                onClick={handleAvatarFileSelect}
              />
              <Input
                required
                onChange={handleAvatarFileChange}
                accept="image/jpeg, image/png, image/jpg"
                ref={avatarFileInputRef}
                className="w-40 hidden"
                type="file"
                name="avatar"
                id="avatar"
              />
            </div>
            {isUserAvatarUpdating ? (
              <button
                className="bg-white text-black px-4 py-2 hover:bg-gray-300 animate-pulse duration-700 rounded-lg text-sm font-semibold"
                type="submit"
              >
                Updating Avatar..
              </button>
            ) : (
              <button
                className="bg-white text-black px-4 py-2 hover:bg-gray-300 duration-300 rounded-lg text-sm font-semibold"
                type="submit"
              >
                Update Avatar
              </button>
            )}
          </form>
        </div>
        {/* for user details and password change */}
        <div>
          <Tabs defaultValue="account" className="md:w-[400px] sm:w-[320px] ">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            {errorMsg && (
              <p className="text-center h-4 text-sm text-red-400">{errorMsg}</p>
            )}
            {!errorMsg && (
              <p className="text-center h-4 text-sm text-red-400"></p>
            )}
            <TabsContent value="account">
              <form onSubmit={handleAccountDetailsForm} className="space-y-2">
                <Card className="bg-black">
                  <CardHeader>
                    <CardTitle>Account</CardTitle>
                    <CardDescription>
                      Make changes to your account here. Click save when
                      you&apos;re done.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        defaultValue={user.fullName}
                        name="fullName"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="email">Username</Label>
                      <Input
                        id="email"
                        defaultValue={user.email}
                        name="email"
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    {isuserDetailsChanging ? (
                      <button
                        className="bg-white animate-pulse duration-1000 text-black px-4 py-2 rounded-lg"
                        type="submit"
                      >
                        updating user details...
                      </button>
                    ) : (
                      <button
                        className="bg-white text-black px-4 py-2 rounded-lg"
                        type="submit"
                      >
                        Save changes
                      </button>
                    )}
                  </CardFooter>
                </Card>
              </form>
            </TabsContent>
            <TabsContent value="password">
              <form onSubmit={handleChangePasswordForm} className="space-y-2">
                <Card className="bg-black">
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>
                      Change your password here. After saving, you&apos;ll be
                      logged out.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="current">Current password</Label>
                      <Input
                        required
                        id="current"
                        type="password"
                        name="currentPassword"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="new">New password</Label>
                      <Input
                        required
                        id="new"
                        type="password"
                        name="newPassword"
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    {isPasswordChanging ? (
                      <button
                        className="bg-white animate-pulse duration-1000 text-black px-4 py-2 rounded-lg text-sm font-bold"
                        type="submit"
                      >
                        Saving new password..
                      </button>
                    ) : (
                      <button
                        className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold"
                        type="submit"
                      >
                        Save password
                      </button>
                    )}
                  </CardFooter>
                </Card>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
