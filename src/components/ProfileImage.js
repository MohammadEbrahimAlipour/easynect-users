import React from "react";

import Image from "next/image";

const ProfileImage = ({ className, width, height, src, id, ...rest }) => {
  // Add a timestamp to the image src URL parameters
  const imageSrcWithTimestamp = `${src}?${new Date().getTime()}`;
  return (
    <div className={`${className}`}>
      <Image
        priority={true}
        className={`rounded-full object-contain`}
        src={src}
        width={80}
        height={80}
        alt="Person Name"
      />
    </div>
  );
};

export default ProfileImage;
