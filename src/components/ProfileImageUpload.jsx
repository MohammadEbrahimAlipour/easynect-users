import React, { useState } from "react";
import ProfileImage from "./ProfileImage";
import { ChangePhotoIcon } from "./Icons";
import axios from "axios";

const ProfileImageUpload = () => {
  const [imageUrl, setImageUrl] = useState(""); // State to store the uploaded image URL

  // Function to handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0]; // Get the selected file

    if (file) {
      const formData = new FormData();
      formData.append("profile", file); // Append the file to the FormData

      try {
        const response = await axios.post(
          `http://188.121.115.0:8000/api/v1/pages/upload_profile/{page_id}/`, // Replace {page_id} with the actual page ID
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "accept-language": "fa"
            }
          }
        );

        console.log(formData);

        if (response.status === 200) {
          // If the upload is successful, set the uploaded image URL
          setImageUrl(response.data.url);
        } else {
          console.error("Image upload failed");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <div className="flex justify-center">
      <div className="">
        {/* Profile image display */}
        <div
          id="photo_here"
          className="border-[3px] box-content border-gold w-[80px] h-[80px] rounded-full
          overflow-hidden"
        >
          <ProfileImage
            width={80}
            height={80}
            defaultImageUrl={imageUrl} // Set the default image URL here
            className=""
          />
        </div>

        {/* Upload button */}
        <label
          htmlFor="fileInput"
          id="uploadPhoto"
          className="relative right-0 bottom-9 cursor-pointer"
        >
          <ChangePhotoIcon />
          <input
            type="file"
            id="fileInput"
            accept=".jpg, .jpeg, .png, .webp"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </label>
      </div>
    </div>
  );
};

export default ProfileImageUpload;
