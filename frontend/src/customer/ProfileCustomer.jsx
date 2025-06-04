import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/features/auth/authSlice";
import avatarImg from "/src/assets/avatar.png";
import { motion, AnimatePresence } from "framer-motion";

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
      setPopupMessage("❌ Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="pt-24 bg-gray-50 dark:bg-zinc-900">
      <div className="max-w-4xl mx-auto py-10 px-4 lg:px-8">
        <motion.div
          className="relative bg-white dark:bg-zinc-800 rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Profile Header/Banner */}
          <div className="h-32 bg-gradient-to-r from-primary/80 to-primary"></div>
          
          {/* Profile Content */}
          <div className="px-6 pb-6">
            {/* Profile Image */}
            <div className="relative -mt-16 mb-6">
              <img
                src={profileImage || avatarImg}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white dark:border-zinc-800 object-cover shadow-lg"
              />
            </div>

            {/* Profile Info */}
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{username}</h1>
                  <p className="text-primary dark:text-primary-light font-medium">{profession}</p>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-all dark:bg-zinc-700 dark:text-primary-light"
                >
                  <i className="ri-edit-line"></i>
                  <span>Edit Profile</span>
                </button>
              </div>

              {/* Bio Section */}
              <div className="bg-gray-50 dark:bg-zinc-700/50 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">About</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{bio}</p>
              </div>
              
            </div>
          </div>
        </motion.div>

        {/* Edit Profile Modal */}
        <AnimatePresence>
          {isEditing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 px-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-2xl w-full max-w-md"
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Edit Profile</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Profile Picture
                    </label>
                    <div className="flex items-center space-x-4">
                      <img
                        src={profileImage || avatarImg}
                        alt="Preview"
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="flex-1 text-sm text-gray-600 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-light file:text-primary hover:file:bg-primary-light/80"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                      placeholder="Enter your username"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Profession
                    </label>
                    <input
                      type="text"
                      value={profession}
                      onChange={(e) => setProfession(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                      placeholder="Enter your profession"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Bio
                    </label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white resize-none h-32"
                      placeholder="Tell us about yourself"
                    ></textarea>
                  </div>

                  <div className="flex gap-4">
                    <button
                      className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-all dark:bg-zinc-700 dark:text-white dark:hover:bg-zinc-600"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="flex-1 bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-all"
                      onClick={handleSave}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification Modal */}
        <AnimatePresence>
          {popupMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
            >
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-lg max-w-md mx-auto">
                <p className="text-center text-lg mb-4 dark:text-white">{popupMessage}</p>
                <button
                  onClick={() => setPopupMessage(null)}
                  className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-all"
                >
                  OK
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProfileCustomer;
