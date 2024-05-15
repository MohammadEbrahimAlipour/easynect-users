import { useState } from "react";
import tw from "tailwind-styled-components";
import { toast } from "react-toastify";

// files
import BaseCopyIcon from "@/assets/icons/copy.svg";

export default function CopyButton({ content, title }) {
  const [isCopied, setIsCopied] = useState(false);

  const fallbackCopyToClipboard = (content) => {
    const textarea = document.createElement("textarea");
    textarea.value = content;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    toast.success(`${title} کپی شد`); // The link is copied successfully
  };

  const handleClick = async () => {
    if (isCopied) return;

    try {
      await navigator.clipboard.writeText(content);
      toast.success(`${title} کپی شد`); // The link is copied successfully
    } catch (err) {
      console.error("خطایی رخ داده است:", err); // An error occurred
      fallbackCopyToClipboard(content);
    }

    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <Wrapper $isCopied={isCopied} onClick={handleClick}>
      <CopyIcon $isCopied={isCopied} />
      {isCopied ? "کپی شد" : "کپی"}
    </Wrapper>
  );
}

const Wrapper = tw.button`
  absolute
  bg-gray-200
  rounded-md
  left-3
  text-sm
  py-1
  pe-2
  ps-1
  text-gary-600

  transition
  ease-in-out
  duration-300

  ${({ $isCopied }) =>
    $isCopied &&
    `
    bg-black 
    text-white
    shadow-lg
 `}
`;

const CopyIcon = tw(BaseCopyIcon)`
  w-4
  inline
  scale-110
  me-1
  text-black

  transition
  ease-in-out
  duration-300

  ${({ $isCopied }) =>
    $isCopied &&
    `
    text-white
 `}
`;
