import React from "react";

import Image from "next/image";

const ProfileImage = ({ className, width, height, src, id, ...rest }) => {
  return (
    <div className={`${className}`}>
      <Image
        priority={true}
        className={`rounded-full object-contain`}
        src={src}
        width={width}
        height={height}
        alt="Person Name"
      />
    </div>
  );
};

ProfileImage.defaultProps = {
  width: 80,
  height: 80
};

export default ProfileImage;
