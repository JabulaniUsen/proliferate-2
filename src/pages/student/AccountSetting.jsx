import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/authContext";
import { useGlobalContext } from "../../context/globalContext";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext";
import { BASE_URL } from "../../config";

const AccountSetting = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { setIsLoaderOpen } = useGlobalContext();
  const { profile, getBio } = useUser();

  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    getBio();
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    } else {
      setSelectedImage(null);
    }
  };

  const [bio, setBio] = useState(profile?.bio);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedImage == null && bio == "") {
      toast.error("Please add a bio");
      return;
    }

    const formData = new FormData();
    formData.append("bio", bio);
    if (selectedImage != null) {
      formData.append("studentImage", selectedImage);
    }

    setIsLoaderOpen(true);

    axios
      .post(
        `${BASE_URL}/auth/update-student`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        toast.success("Profile updated successfully");

        setBio("");
        setSelectedImage(null);
        setIsLoaderOpen(false);

        navigate("/settings/profile");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to update profile");
        setIsLoaderOpen(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="account-setting p-[30px]">
      <div className="size-[150px] relative">
        {!selectedImage ? (
          <div className="size-full">
            <label className="size-full cursor-pointer bg-[#EDF2F7] border-[0.62px] border-dashed border-[#4C535F] rounded-[11.09px] flex flex-col justify-center items-center">
              <LuImagePlus />
              <p className="text-[13px] text-center font-[500] font-Poppins mt-[10px] text-[#4C535F]">
                Upload your photo
              </p>
              <input
                className="hidden"
                type="file"
                name="Profile photo"
                accept=".png,.jpg,.jpeg,.webp"
                onChange={handleImageChange}
                ref={fileInputRef}
              />
            </label>

            <div
              className={`${
                !profile.profileImage && "hidden"
              } absolute top-0 left-0 size-full`}
            >
              <img
                className="size-full object-cover"
                src={`data:image/jpeg;base64,${profile?.profileImage}`}
                alt="User Profile"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="absolute left-1/2 -translate-x-1/2 bottom-[10px] bg-blue px-[20px] py-[4px] font-Montserrat text-white font-medium"
              >
                EDIT
              </button>
            </div>
          </div>
        ) : (
          <div className="size-full bg-[#EDF2F7] rounded-[11.09px] flex justify-center items-center">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Uploaded"
              className="h-full w-full object-cover rounded-[11.09px]"
            />
          </div>
        )}
      </div>

      <div className="my-[30px] w-full h-0 border-[1.23px] border-[#E0E4EC]" />

      <div className="form flex flex-col gap-[30px]">
        {/* <div className="flex items-center gap-[40px]">
          <div className="w-[40%]">
            <label htmlFor="fname">First Name</label>
            <input
              required
              type="text"
              id="fname"
              placeholder="Please enter your first name"
            />
          </div>

          <div className="w-[40%]">
            <label htmlFor="lname">Last Name</label>
            <input
              required
              type="text"
              id="lname"
              placeholder="Please enter your last name"
            />
          </div>
        </div>

        <div className="flex items-center gap-[40px]">
          <div className="w-[40%]">
            <label htmlFor="mail">Email Address</label>
            <input
              required
              type="mail"
              id="mail"
              placeholder="Please enter your Email Address"
            />
          </div>

          <div className="w-[40%]">
            <label htmlFor="num">Phone number</label>
            <input
              required
              type="number"
              id="num"
              placeholder="Please enter your phone number"
            />
          </div>
        </div> */}

        <div className="w-full">
          <label htmlFor="bio">Bio</label>
          <textarea
            className="w-full h-[200px] resize-none"
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write your Bio here e.g your hobbies, interests etc."
          ></textarea>
        </div>

        <div className="flex gap-[50px] items-center">
          <button
            type="submit"
            className="bg-blue text-white font-bold text-[14px] font-Poppins rounded-[5px] px-[8px] py-[9px]"
          >
            Update Profile
          </button>
          <button
            type="button"
            onClick={() => {
              setBio("");
              setSelectedImage(null);
            }}
            className="text-[14px] font-[500] font-Poppins text-[#4C535F] hover:underline"
          >
            Reset
          </button>
        </div>
      </div>
    </form>
  );
};

export default AccountSetting;
