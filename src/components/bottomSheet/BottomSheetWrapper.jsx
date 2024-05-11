import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import tw from "tailwind-styled-components";

export default function BottomSheetWrapper({
  onClose,
  open,
  children,
  maxHeight,
  height,
  className,
  fullScreen,
}) {
  const ref = useRef(null);

  useEffect(() => {
    ref.current = document.body;
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style = "padding-right: 15px; overflow: hidden;";
    } else {
      document.body.style = "";
    }
  }, [open]);

  return ref.current
    ? createPortal(
        <Wrapper>
          <Backdrop $open={open} onClick={onClose} />
          <Card
            $open={open}
            $fullScreen={fullScreen}
            style={{
              "--maxHeight": maxHeight || "600px",
              "--height": height || "unset",
            }}
            className={className || "p-2"}
          >
            {children}
          </Card>
        </Wrapper>,
        ref.current
      )
    : null;
}

const Wrapper = tw.div`
  z-[1200]
`;

const Backdrop = tw.div`
  fixed
  top-0
  left-0
  right-0
  h-screen
  bg-zinc-900/[.55]
  opacity-0
  pointer-events-none

  transition-all
  duration-300
  ease-out

  ${({ $open }) =>
    $open &&
    `
    pointer-events-auto
    opacity-100
  `}
`;

const Card = tw.div`
  fixed
  bottom-0
  left-3
  right-3
  bg-white
  shadow-[rgba(0,0,0,0.2)_0px_8px_10px_-5px,rgba(0,0,0,0.14)_0px_16px_24px_2px,rgba(0,0,0,0.12)_0px_6px_30px_5px]
  opacity-0
  pointer-events-none
  translate-y-full
  overflow-y-auto

  ${({ $fullScreen }) =>
    !$fullScreen &&
    `
    rounded-t-2xl
    h-[var(--height)]
    max-h-[var(--maxHeight)]
  `}

  transition-all
  duration-200
  ease-out

  ${({ $open }) =>
    $open &&
    `
    pointer-events-auto
    opacity-100
    translate-y-0
  `}

  ${({ $fullScreen }) =>
    $fullScreen &&
    `
    left-0
    right-0
    top-0
  `}
`;
