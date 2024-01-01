import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import Devider from "@/components/Devider";
import Image from "next/image";
import bgGradient from "../../public/images/backgrounds/bgGradient.jpg";
import { useRouter } from "next/router";
import { generateApiUrl } from "@/components/ApiUr";
import IconReg from "@/components/icons/IconReg";
import EasynecVertLogo from "@/components/icons/EasynecVertLogo";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const RegisterUser = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password1: "",
    password2: ""
  });
  const { email, password1, password2 } = formData;

  const [passwordError, setPasswordError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  const passwordRequirements = {
    minChar: 8,
    upperChar: /[A-Z]/,
    lowerChar: /[a-z]/,
    number: /[0-9]/
    // specialChar: /[^A-Za-z0-9]/
  };

  // pass strength
  const checkPasswordStrength = (password) => {
    let strength = 0;
    const requirements = [
      passwordRequirements.upperChar,
      passwordRequirements.lowerChar,
      passwordRequirements.number
      // passwordRequirements.specialChar
    ];

    // Increment the strength for each requirement met
    requirements.forEach((requirement) => {
      if (requirement.test(password)) {
        strength++;
      }
    });

    // Increment further based on length
    if (password.length >= passwordRequirements.minChar) {
      strength++;
    }

    // Set password strength to state (e.g., strength can be from 0 to 5)
    setPasswordStrength(strength);
  };

  const onChangePassword = (e) => {
    const { name, value } = e.target;
    checkPasswordStrength(value);
    // Call the original onChange handler
    onChange(e);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Check for password match before submitting
    if (password1 !== password2) {
      toast.error("Passwords do not match.");
      return; // stop the function if passwords do not match
    }

    const form = e.target;
    const formData = new FormData(form);
    // Convert form data to a plain object
    const formObject = {};

    formData.forEach((value, key) => {
      formObject[key] = value;
    });
    try {
      // api url
      const apiUrl = generateApiUrl("/api/v1/users/");
      const response = await axios.post(
        apiUrl, //api url
        formObject,
        {
          headers: {
            "Content-Type": "application/json",
            "accept-language": "fa"
          }
        }
      );

      if (response.status === 201) {
        // Handle a successful response (e.g., show a success message)
        console.log("Registration successful");

        // Redirect to OTP confirm page with email as a query parameter
        router.push(`/verifyOTP?email=${encodeURIComponent(email)}`);
      } else {
        // Handle errors (e.g., show an error message)
        console.log("Registration failed");
      }
    } catch (error) {
      if (error.response) {
        // If the server responded with a conflict error and provided detail message
        if (error.response.status === 409 && error.response.data?.detail) {
          toast.error(error.response.data.detail);
        } else {
          // Handle other errors with a status code from the server
          toast.error(`Error: ${error.response.statusText}`);
        }
        console.error("Error response:", error.response);
      } else {
        // Handle network error (no response received)
        toast.error("Network error, please try again later.");
        console.error("Network error:", error);
      }
    }
  };

  //  pass colors
  // Define colors based on the strength
  const strengthColors = ["#dc3545", "#ffc107", "#28a745"];
  const strengthText = [
    "کلمه عبور شما باید شامل حداقل یک عدد و حرف کوچک و حرف بزرگ و حداقل ۸ کاراکتر باشد "
  ];

  // This returns a color and width for the strength bar based on the password strength level
  const getStrengthBarStyle = (strengthLevel) => {
    let width;
    let color;
    let text;

    switch (strengthLevel) {
      case 0:
        width = "0%";
        color = "";
        text = "";
        break;
      case 1:
        width = "33%";
        color = strengthColors[0]; // Weak
        text = strengthText[0];
        break;
      case 2:
      case 3:
        width = "66%";
        color = strengthColors[1]; // Moderate
        text = strengthText[0];
        break;
      case 4:
        width = "100%";
        color = strengthColors[2]; // Strong
        text = strengthText[0];
        break;
      default:
        break;
    }

    return { width, backgroundColor: color, text };
  };

  // Inside your return statement, add the strength bar UI component
  const strengthBarStyle = getStrengthBarStyle(passwordStrength);

  return (
    <>
      <div className="container mb-10">
        <div className="w-full h-[320px] rounded-[20px] mt-5 gradient relative overflow-hidden">
          <span className="absolute z-100 flex items-center justify-center w-full top-10">
            <EasynecVertLogo />
          </span>
          <Image className="rounded-[20px]" src={bgGradient} alt="img" />

          {/* animated cards */}
          <div className="absolute bottom-12 w-full flex flex-col justify-center items-center">
            <div className="bg-white opacity-40  w-[54px] h-[15px] relative top-[620px] rounded-lg  "></div>
            <motion.div
              initial={{ y: 80, scale: 2 }}
              animate={{ y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="bg-white opacity-10  w-[80%] h-[230px] relative top-[590px] rounded-lg  "
            ></motion.div>

            <motion.div
              initial={{ y: 90 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="bg-white opacity-25 shadow-2xl w-[42%] h-[200px] relative top-[410px] rounded-lg  "
            ></motion.div>

            <motion.div
              initial={{ y: 80 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="bg-white opacity-40 shadow-2xl w-[52%] h-[200px] relative top-[230px] rounded-lg "
            ></motion.div>
            {/* middle of the photo icon */}
            <motion.div
              initial={{ y: 80 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="w-full relative bottom-[-55px]"
            >
              <IconReg />
            </motion.div>
            {/* end of icon */}
          </div>
        </div>

        {/* register */}
        <h3 className="font-semibold text-lg mt-7 mb-3">ثبت‌نام</h3>
        <Link href="/loginUser" className="flex justify-start items-center">
          <span className="text-muted me-1">قبلا ثبت‌نام کرده‌اید؟ </span>
          وارد شوید
        </Link>
        <Devider className="mt-6 mb-8" text="یا ثبت نام با استفاده از ایمیل" />

        <form method="" onSubmit={onSubmit}>
          {/* user/pass */}
          <div>
            {/* email */}
            <input
              required
              onChange={onChange}
              name="email"
              value={email}
              placeholder="ایمیل"
              className="border-2 px-3 py-4 w-full rounded-lg mb-4 bg-lightMenu outline-none"
            />

            {/* password */}
            <div className="border-2 px-3 py-4 w-full rounded-lg mb-4 bg-lightMenu">
              <input
                required
                // onChange={onChange}
                onChange={onChangePassword}
                type="password"
                name="password1"
                value={password1}
                className="bg-lightMenu outline-none"
                placeholder=" انتخاب رمز عبور"
              />
            </div>
            {/* password2 */}
            <div className="border-2 px-3 py-4 w-full rounded-lg bg-lightMenu">
              <input
                required
                onChange={onChange}
                type="password"
                name="password2"
                value={password2}
                className="bg-lightMenu outline-none"
                placeholder=" تکرار رمز عبور"
              />
            </div>

            {/* pass strength*/}
            <div className="w-full bg-gray-200 rounded h-3 overflow-hidden mt-3 mb-1">
              <div
                style={{
                  width: strengthBarStyle.width,
                  backgroundColor: strengthBarStyle.backgroundColor,
                  transition: "width 0.5s"
                }}
                className="h-3 rounded"
              ></div>
            </div>
            {strengthBarStyle.text && (
              <div className="text-xs text-gray-600">
                {strengthBarStyle.text}
              </div>
            )}

            {/* register btn */}
            <div>
              <button
                type="submit"
                className="w-full mt-6 bg-dark text-white font-semibold
            text-lg py-3 rounded-lg"
              >
                ثبت‌ نام
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterUser;
