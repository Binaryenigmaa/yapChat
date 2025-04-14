import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";

const ProfilePage = () => {
  // start
  const { authUser } = useAuthStore();
  const [base64String, setBase64String] = useState("");
  const [selectedImg, setSelectedImg] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setBase64String(reader.result); // Store the Base64 string in state
        alert("Image converted to Base64!");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="profile picture"
                className="size-32 rounded-full object-cover border-4"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
