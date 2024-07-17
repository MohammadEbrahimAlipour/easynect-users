import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";

const Custom403 = () => {
  const animationControls0 = useAnimation();
  const animationControls4 = useAnimation();
  const animationControlsLast4 = useAnimation();

  const fallAnimation = {
    y: [0, 100, 0],
    transition: {
      duration: 1,
      ease: ["easeOut", "easeInOut", "easeIn"],
    },
  };

  const fallAnimationFirst4 = {
    y: [0, 100, 0],
    transition: {
      duration: 1.5,
      ease: "easeInOut",
    },
  };

  const fallAnimationLast4 = {
    y: [0, 100, 0],
    transition: {
      duration: 2.2,
      ease: ["easeOut", "easeInOut", "easeIn"],
    },
  };

  const shakeAnimation = {
    x: [0, -15, 15, -5, 15, -5, 5, -5, 0],
    transition: {
      duration: 0.5,
    },
  };

  useEffect(() => {
    const animateZero = async () => {
      await animationControls0.start(fallAnimation);
    };

    const animateFirst4 = async () => {
      await animationControls4.start(fallAnimationFirst4);
    };

    const animateLast4 = async () => {
      await animationControlsLast4.start(fallAnimationLast4);
      await animationControlsLast4.start(shakeAnimation);
    };

    animateZero();
    animateFirst4();
    animateLast4();
  }, [animationControls0, animationControls4, animationControlsLast4]);

  return (
    <div className="h-screen bg-light">
      <div className="relative pt-[100px]">
        <div className="absolute left-[30px] w-full flex  justify-center items-end flex-row-reverse">
          <motion.span
            animate={animationControls4}
            className="absolute left-[30px] font-extrabold text-[180px] opacity-70 custom-text-shadow-left4"
          >
            4
          </motion.span>
          <motion.span
            className="absolute z-10 left-[90px] font-extrabold text-[230px] text-gold custom-text-shadow-zero "
            animate={animationControls0}
          >
            0
          </motion.span>
          <motion.span
            animate={animationControlsLast4}
            className="relative z-20 left-[40px] -bottom-3 font-extrabold text-[180px] text-gray-900 custom-text-shadow-right4"
          >
            3
          </motion.span>
        </div>
      </div>

      <Link
        href="/app/cards/profileCard"
        className="absolute bottom-[370px] font-extrabold text-lg px-10"
      >
        متأسفانه هیچ دستگاهی به این صفحه متصل نیست
        <span className="underline mx-2 ">به صفحه اصلی بروید</span>
      </Link>
    </div>
  );
};

export default Custom403;
