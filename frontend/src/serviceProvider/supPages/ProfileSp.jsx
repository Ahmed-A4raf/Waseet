import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/features/auth/authSlice";
import HeaderSp from "../commenSp/HeaderSp";
import avatarImg from "/src/assets/avatar.png";
import { motion } from "framer-motion";

const ProfileSp = () => {
  const dispatch = useDispatch();
  const storedUser = useSelector((state) => state.auth.user);
  
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(storedUser?.displayName || "");
  const [profileImage, setProfileImage] = useState(storedUser?.profileImage || "");
  const [bio, setBio] = useState(storedUser?.bio || "N/A");
  const [profession, setProfession] = useState(storedUser?.profession || "N/A");

  const token = storedUser?.token;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      const response = await fetch(profileImage);
      const blob = await response.blob();
      formData.append("profileImage", blob, "profile.jpg");

      formData.append("displayName", username);
      formData.append("bio", bio);
      formData.append("profession", profession);

      const responseApi = await fetch("http://waseet.runasp.net/api/auth/UploadProfilePhoto", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!responseApi.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await responseApi.json();

      const updatedUser = { ...storedUser, ...data };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      dispatch(setUser({ user: updatedUser }));

      setProfileImage(data.profileImage);
      setUsername(data.displayName);
      setBio(data.bio);
      setProfession(data.profession);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <HeaderSp title="My Profile" />
      <div className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="bg-white p-4 rounded-lg shadow-md flex items-center dark:bg-zinc-900 dark:text-zinc-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src={profileImage || avatarImg}
            alt="Profile"
            className="w-28 h-28 md:w-32 md:h-32 rounded-full border-2 border-primary mr-4 object-cover"
          />
          <div className="w-1/3 overflow-hidden dark:text-zinc-50">
            <p className="font-bold">Username: {username}</p>
            <p className="text-gray-600">User Bio: {bio}</p>
            <p className="text-gray-600">Profession: {profession}</p>
          </div>
          <button
            className="ml-auto px-2 py-1 bg-primary-light text-2xl text-primary rounded hover:bg-gray-100 dark:bg-zinc-800"
            onClick={() => setIsEditing(true)}
          >
            <i className="ri-edit-line"></i>
          </button>
        </motion.div>

        {isEditing && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 dark:bg-zinc-900 dark:text-zinc-50">
              <h2 className="text-lg font-bold mb-4">Edit Profile</h2>

              <label className="block mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full focus:outline-primary bg-primary-light hover:border px-5 py-3 rounded-md dark:bg-zinc-800 dark:text-zinc-50 dark:border-zinc-800 dark:focus:outline-zinc-900"
              />

              <label className="block mb-2 mt-4">Upload Profile Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full focus:outline-primary bg-primary-light hover:border px-5 py-3 rounded-md dark:bg-zinc-800 dark:text-zinc-50 dark:border-zinc-800 dark:focus:outline-zinc-900"
              />

              <label className="block mb-2 mt-4">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full resize-y min-h-[60px] max-h-32 px-5 py-3 bg-primary-light rounded-md dark:bg-zinc-800 dark:text-zinc-50 dark:border-zinc-800 dark:focus:outline-zinc-900"
              ></textarea>

              <label className="block mb-2 mt-4">Profession</label>
              <input
                type="text"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                className="w-full px-5 py-3 bg-primary-light rounded-md dark:bg-zinc-800 dark:text-zinc-50 dark:border-zinc-800 dark:focus:outline-zinc-900"
              />

              <button
                className="w-full mt-6 bg-primary text-white py-2 rounded hover:bg-primary-dark transition-all duration-300"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSp;
