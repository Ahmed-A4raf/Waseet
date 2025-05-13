import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/features/auth/authSlice";
import avatarImg from "/src/assets/avatar.png";
import { motion } from "framer-motion";

const ProfileCustomer = () => {
  const dispatch = useDispatch();
  const storedUser = useSelector((state) => state.auth.user);

  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(storedUser?.displayName || "");
  const [profileImage, setProfileImage] = useState(storedUser?.profileImage || "");
  const [bio, setBio] = useState(storedUser?.bio || "N/A");
  const [profession, setProfession] = useState(storedUser?.profession || "N/A");
  const [rawFile, setRawFile] = useState(null);
  const [popupMessage, setPopupMessage] = useState(null);

  const token = storedUser?.token;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRawFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      // If image exists, check with AI
      if (rawFile) {
        const aiFormData = new FormData();
        aiFormData.append("image", rawFile);

        try {
          const aiResponse = await fetch("https://09ea-102-189-87-56.ngrok-free.app/predict", {
            method: "POST",
            body: aiFormData,
          });

          if (aiResponse.ok) {
            const aiResult = await aiResponse.json();
            if (aiResult.overall_status !== "accepted") {
              setPopupMessage("❌ The image was rejected by the AI due to inappropriate content.");
              return;
            }
          } else {
            setPopupMessage("⚠️ AI server responded with error, skipping AI check...");
          }
        } catch (error) {
          setPopupMessage("⚠️ AI server is not reachable, skipping AI check...");
        }
      }

      const formData = new FormData();

      if (rawFile) {
        formData.append("profileImage", rawFile, "profile.jpg");
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

      if (!response.ok) throw new Error("Failed to update profile");

      const data = await response.json();

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
    <div className="flex-1 pt-24 overflow-auto relative z-10">
      <div className="max-w-4xl mx-auto py-10 px-4 lg:px-8">
        <motion.div
          className="bg-white p-6 rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-3 gap-6 items-center dark:bg-zinc-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex justify-center md:justify-start">
            <img
              src={profileImage || avatarImg}
              alt="Profile"
              className="w-28 h-28 md:w-32 md:h-32 rounded-full border-2 border-primary object-cover dark:border-zinc-600"
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <p className="font-bold text-xl text-gray-800 dark:text-zinc-50">Username: {username}</p>
            <p className="text-gray-600 text-sm dark:text-zinc-400">Bio: {bio}</p>
            <p className="text-gray-600 text-sm dark:text-zinc-400">Profession: {profession}</p>
            <button
              className="mt-4 px-4 py-2 bg-primary-light text-primary font-medium rounded hover:bg-primary/10 transition-all dark:bg-primary dark:text-zinc-50 dark:hover:bg-primary-dark"
              onClick={() => setIsEditing(true)}
            >
              <i className="ri-edit-line mr-2"></i>Edit Profile
            </button>
          </div>
        </motion.div>

        {isEditing && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 px-4">
            <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md space-y-4 dark:bg-zinc-900">
              <h2 className="text-2xl font-bold mb-2 text-center dark:text-zinc-50">Edit Profile</h2>

              <div>
                <label className="block text-sm font-medium mb-1">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full focus:outline-primary bg-primary-light hover:border px-5 py-3 rounded-md dark:bg-zinc-800 dark:text-zinc-50 dark:border-zinc-800 dark:focus:outline-zinc-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full focus:outline-primary bg-primary-light hover:border px-5 py-3 rounded-md dark:bg-zinc-800 dark:text-zinc-50 dark:border-zinc-800 dark:focus:outline-zinc-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full p-2 border resize-y min-h-[60px] bg-gray-100 focus:outline-primary hover:border px-5 py-3 rounded-md dark:bg-zinc-800 dark:text-zinc-50 dark:border-zinc-800 dark:focus:outline-zinc-900"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Profession</label>
                <input
                  type="text"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  className="w-full focus:outline-primary bg-primary-light hover:border px-5 py-3 rounded-md dark:bg-zinc-800 dark:text-zinc-50 dark:border-zinc-800 dark:focus:outline-zinc-900"
                />
              </div>

              <button
                className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition-all"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* AI Popup Modal */}
        {popupMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
          >
            <div className="bg-white dark:bg-zinc-900 text-black dark:text-white p-6 rounded-xl shadow-lg text-center max-w-md mx-auto">
              <p className="mb-4">{popupMessage}</p>
              <button
                onClick={() => setPopupMessage(null)}
                className="mt-2 bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition-all"
              >
                OK
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProfileCustomer;
