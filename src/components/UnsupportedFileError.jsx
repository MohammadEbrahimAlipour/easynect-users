import FileIcon from "@/assets/icons/file.svg";
import tw from "tailwind-styled-components";

export default function UnsupportedFileError({ extension }) {
  return (
    <Wrapper>
      <Icon />
      <Error>
        <Title>
          قالب فایل
          <Extension>{extension}</Extension>
        </Title>
        متاسفانه امکان پیش‌ نمایش این فایل ممکن نیست، جهت مشاهده می‌توانید فایل
        را دانلود کنید.
      </Error>
    </Wrapper>
  );
}

const Wrapper = tw.div`
  flex
  flex-col
  items-center
  justify-center
  h-full
`;

const Error = tw.p`
  text-sm
  text-gray-500
  px-16
  mt-10
`;

const Title = tw.h3`
  text-gray-800
  text-lg
  text-center
  mb-3
`;

const Icon = tw(FileIcon)`
  w-32
`;

const Extension = tw.div`
  bg-black
  rounded-md
  text-white
  inline
  px-2
  mx-2
  shadow-xl
`;
