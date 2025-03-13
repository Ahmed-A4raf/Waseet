import React, { useState } from "react";
import HeaderSp from "../commenSp/HeaderSp";
import avatarImg from "/src/assets/avatar.png";
import { motion } from "framer-motion";

const ProfileSp = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [bio, setBio] = useState("N/A");
  const [profession, setProfession] = useState("N/A");
  const [imageSource, setImageSource] = useState("url");
  const [imageURL, setImageURL] = useState("");

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

  const handleSave = () => {
    setProfileImage(imageSource === "url" ? imageURL : profileImage);
    setIsEditing(false);
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <HeaderSp title="My Profile" />
      <div className="p-4">
        <motion.div
          className="bg-white p-4 rounded-lg shadow-md flex items-center my-4"
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
