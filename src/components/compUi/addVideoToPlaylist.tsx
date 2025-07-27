"use client";

import {
  AddVideoToPlaylist,
  CreatePlaylist,
  GetUserPlaylists,
} from "@/functions";
import { userActions } from "@/store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EllipsisVertical, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export default function AddVideoToPlaylistComp({
  videoId,
  isWatchingPage,
}: {
  videoId: string;
  isWatchingPage: boolean;
}) {
  const data = useSelector((state: any) => state.user);
  const user = data.user[0];
  const dispatch = useDispatch();
  const [userPlaylistData, setUserPlaylistData] = useState<any>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isPosting, setIsPosting] = useState(false);

  //creating new playlists

  const handleButtonClick = async (playlistId: string) => {
    const response = await AddVideoToPlaylist({
      accessToken: user.accessToken,
      videoId,
      playlistId,
    });
    if (response.status === true) {
      dispatch(userActions.isChanged({}));
      toast("Video Added", {
        description: "Video added to playlist successfully",
        action: {
          label: "Okay",
          onClick: () => {},
        },
      });
    } else {
      toast("Failed", {
        description: "failed to add video to playlist",
        action: {
          label: "Okay",
          onClick: () => {},
        },
      });
    }
  };

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
    if (user && isWatchingPage) {
      getUserPlaylist();
    }
  }, [user, isWatchingPage]);

  //new Playlist

  const handleFormSubmittion = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsPosting(true);
    const selectElement: any = document.getElementById("category");
    const category = selectElement?.value;
    const fd = new FormData(event.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const name = data.name;
    const description = data.description;

    const response = await CreatePlaylist({
      accessToken: user.accessToken,
      category,
      description,
      name,
    });
    if (response.status === true) {
      setIsPosting(false);

      dispatch(userActions.isChanged({}));
      buttonRef.current?.click();
      toast("Playlist Created", {
        description: "Plalist has been created successfully",
        action: {
          label: "Okay",
          onClick: () => {},
        },
      });
    } else {
      setIsPosting(false);
      toast("Failed", {
        description: "Error while creating playlist",
        action: {
          label: "Okay",
          onClick: () => {},
        },
      });
    }
  };

  return (
    <div className="h-5">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-black">
          {isWatchingPage && (
            <>
              <DropdownMenuLabel>Add To Playlist</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {userPlaylistData &&
                userPlaylistData.map((playlist: any) => (
                  <DropdownMenuItem key={playlist._id}>
                    <button onClick={() => handleButtonClick(playlist._id)}>
                      {playlist.name}
                    </button>
                  </DropdownMenuItem>
                ))}
              <DropdownMenuSeparator />
            </>
          )}

          <Dialog>
            <DialogTrigger className="bg-black">
              <div className="flex items-center bg-black rounded-xl hover:opacity-80 duration-700 ease-out bg-accent px-2 py-2 font-semibold space-x-1">
                <h4 className="text-sm ml-1">New Playlist </h4>
                <Plus size={20} />
              </div>
            </DialogTrigger>
            <DialogContent className="sm:w-80 md:w-auto">
              <DialogHeader>
                <DialogTitle className="text-gray-400 text-center">
                  Create New Playlist
                </DialogTitle>

                <form
                  className="flex md:pt-8 sm:pt-2  flex-col md:justify-start md:items-start space-y-4"
                  onSubmit={handleFormSubmittion}
                >
                  <div className="sm:flex sm:flex-col md:flex md:flex-row justify-between md:items-start md:space-x-4 sm:space-y-4 md:space-y-0">
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" className="h-8 w-60" />
                    </div>

                    <div className="flex flex-col justify-start space-y-2">
                      <Label htmlFor="category">Select Playlist Category</Label>
                      <select
                        className="w-28 h-8 border border-accent px-2 rounded-lg space-y-2"
                        id="category"
                      >
                        <option className="" value="general">
                          General
                        </option>
                        <option className="" value="gaming">
                          Gaming
                        </option>
                        <option className="" value="tech">
                          Tech
                        </option>
                        <option className="" value="comedy">
                          Comedy
                        </option>
                        <option className="" value="music">
                          Music
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      className="w-60"
                    />
                  </div>

                  {isPosting ? (
                    <button
                      disabled
                      className="px-8 bg-gray-400 rounded-xl animate-pulse  duration-500 text-accent font-bold  py-2 "
                    >
                      creating playlist..
                    </button>
                  ) : (
                    <button className="px-8 hover:bg-gray-400 rounded-xl duration-500 text-accent font-bold  py-2 bg-white">
                      Create Playlist
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
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
