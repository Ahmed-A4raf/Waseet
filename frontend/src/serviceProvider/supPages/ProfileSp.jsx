import React, { useState, useEffect } from "react";
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
  const [imageSource, setImageSource] = useState("url");
  const [imageURL, setImageURL] = useState("");

  const token = storedUser?.token; //! get token from localStorage

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
      
      if (imageSource === "upload") {
        const response = await fetch(profileImage);
        const blob = await response.blob();
        formData.append("profileImage", blob, "profile.jpg");
      } else {
        formData.append("profileImage", imageURL);
      }

      formData.append("displayName", username);
      formData.append("bio", bio);
      formData.append("profession", profession);

      const response = await fetch("http://waseet.runasp.net/api/auth/UploadProfilePhoto", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();

      //! Update the user data in localStorage
      const updatedUser = { ...storedUser, ...data };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      //! Update the user data in the Redux store
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
      <div className="p-4">
        <motion.div
          className="bg-white p-4 rounded-lg shadow-md flex items-center my-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src={profileImage || avatarImg}
            alt="Profile"
            className="w-24 h-24 rounded-full mr-4"
          />
          <div className="w-1/3 overflow-hidden">
            <p className="font-bold">Username: {username}</p>
            <p className="text-gray-600">User Bio: {bio}</p>
            <p className="text-gray-600">Profession: {profession}</p>
          </div>
          <button
            className="ml-auto px-2 py-1 bg-primary-light text-2xl text-primary rounded hover:bg-gray-100"
            onClick={() => setIsEditing(true)}
          >
            <i className="ri-edit-line"></i>
          </button>
        </motion.div>

        {isEditing && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-lg font-bold mb-4">Edit Profile</h2>
              <label className="block mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border rounded mb-2 focus:outline-primary bg-primary-light hover:border"
              />

              <label className="block mb-2">Select Image Source</label>
              <select
                className="w-full p-2 border rounded mb-2 focus:outline-primary bg-primary-light hover:border"
                value={imageSource}
                onChange={(e) => setImageSource(e.target.value)}
              >
                <option value="url">Image URL</option>
                <option value="upload">Upload Image</option>
              </select>

              {imageSource === "url" ? (
                <>
                  <label className="block mb-2">Profile Image URL</label>
                  <input
                    type="text"
                    value={imageURL}
                    onChange={(e) => setImageURL(e.target.value)}
                    className="w-full p-2 border rounded mb-2 focus:outline-primary bg-primary-light hover:border"
                  />
                </>
              ) : (
                <>
                  <label className="block mb-2">Upload Profile Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-2 border rounded mb-2 focus:outline-primary bg-primary-light hover:border"
                  />
                </>
              )}

              <label className="block mb-2">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-2 border rounded mb-2 resize-y min-h-12 max-h-32 focus:outline-primary bg-primary-light hover:border"
              ></textarea>

              <label className="block mb-2">Profession</label>
              <input
                type="text"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                className="w-full p-2 border rounded mb-4 focus:outline-primary bg-primary-light hover:border"
              />

              <button
                className="w-full bg-primary text-white p-2 rounded hover:bg-primary-dark transition-all duration-300"
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
