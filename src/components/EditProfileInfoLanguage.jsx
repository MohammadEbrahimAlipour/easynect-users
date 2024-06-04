import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";

// components
import BottomSheetWrapper from "@/components/bottomSheet/BottomSheetWrapper";
import EditProfileInfoLanguageItem from "./EditProfileInfoLanguageItem";

// files
import BaseArrowDownIcon from "@/assets/icons/arrow-down.svg";

// constants
import { LANGUAGES } from "@/constants/language";

export default function EditProfileInfoLanguage({
  currentLanguage = null,
  onSelect,
}) {
  const [isLanguageSheetOpen, setIsLanguageSheetOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  useEffect(() => {
    if (currentLanguage !== null) {
      setSelectedLanguage(currentLanguage);
    }
  }, []);

  const toggleLinkSheet = () => {
    setIsLanguageSheetOpen((prevState) => !prevState);
  };

  const handleBottomSheetClose = () => {
    setIsLanguageSheetOpen(false);
  };

  const handleSelectLanguage = (language) => {
    setIsLanguageSheetOpen(false);
    setSelectedLanguage(language);
    onSelect(language);
  };

  return (
    <>
      <Label>زبان صفحه</Label>
      <RedirectPathButton onClick={toggleLinkSheet}>
        {selectedLanguage !== null
          ? selectedLanguage
          : "آیتم مورد نظر را انتخاب کنید"}
        <ArrowDownIcon />
      </RedirectPathButton>
      <BottomSheetWrapper
        open={isLanguageSheetOpen}
        onClose={handleBottomSheetClose}
        className={"p-2"}
      >
        <LinksWrapper>
          {Object.keys(LANGUAGES).map((language) => (
            <EditProfileInfoLanguageItem
              key={language}
              active={language === selectedLanguage}
              language={LANGUAGES[language]}
              onSelect={handleSelectLanguage}
            />
          ))}
        </LinksWrapper>
      </BottomSheetWrapper>
    </>
  );
}

const RedirectPathButton = tw.div`
  flex
  items-center
  justify-between
  p-3
  border-2
  rounded-lg
  border-black
  cursor-pointer
  uppercase

  transition
  duration-300
  ease-in-out

  ${({ $isDisabled }) =>
    $isDisabled &&
    `
  opacity-25 
  `}
`;

const ArrowDownIcon = tw(BaseArrowDownIcon)`
  w-6
`;

const LinksWrapper = tw.div`
  flex
  flex-col
  gap-2
`;

const Label = tw.p`
  text-muted
  whitespace-nowrap
  my-2
  mt-5
`;
