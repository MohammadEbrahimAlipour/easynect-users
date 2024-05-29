import FileIcon from "@/assets/icons/file.svg";
import { useTranslation } from "react-i18next";
import tw from "tailwind-styled-components";

export default function UnsupportedFileError({ extension }) {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Icon />
      <Error>
        <Title>
          {t("unsupported_file.title")}
          <Extension>{extension}</Extension>
        </Title>
        {t("unsupported_file.message")}
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
