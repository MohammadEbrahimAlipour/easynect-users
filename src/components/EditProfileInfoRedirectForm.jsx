import { useState } from "react";
import tw from "tailwind-styled-components";

// components
import SwitchTile from "@/components/SwitchTile";
import BottomSheetWrapper from "@/components/bottomSheet/BottomSheetWrapper";
import EditProfileInfoRedirectFormItem from "@/components/EditProfileInfoRedirectFormItem";

// files
import BaseArrowDownIcon from "@/assets/icons/arrow-down.svg";

const mockItems = [
  {
    id: "db696a9b-1b81-4bfa-9f78-488766f64a72",
    title: "اسپاتیفای",
    description: "لورم ایپسوم برای محتوای در صورتی که کاغذ دیگه حالا",
    icon: "https://easynect-static-contents.s3.ir-thr-at1.arvanstorage.ir/users/contents_store/icons/db696a9b-1b81-4bfa-9f78-488766f64a72.png",
  },
  {
    id: "5a3c1dbe-0f6c-43f3-919b-a81aa7ff0be2",
    title: "یوتوب",
    description: "لورم ایپسوم برای محتوای در صورتی که کاغذ دیگه حالا",
    icon: "https://easynect-static-contents.s3.ir-thr-at1.arvanstorage.ir/users/contents_store/icons/5a3c1dbe-0f6c-43f3-919b-a81aa7ff0be2.png",
  },
  {
    id: "48b718f7-bbec-45b2-89a2-ac49d5ee5e85",
    title: "اینستاگرام",
    description: "لورم ایپسوم برای محتوای در صورتی که کاغذ دیگه حالا",
    icon: "https://easynect-static-contents.s3.ir-thr-at1.arvanstorage.ir/users/contents_store/icons/48b718f7-bbec-45b2-89a2-ac49d5ee5e85.png",
  },
  {
    id: "f73239c2-f27a-4317-be1c-6359faf09aad",
    title: "فایل",
    description: "لورم ایپسوم برای محتوای در صورتی که کاغذ دیگه حالا",
    icon: "https://easynect-static-contents.s3.ir-thr-at1.arvanstorage.ir/users/contents_store/icons/f73239c2-f27a-4317-be1c-6359faf09aad.png",
  },
  {
    id: "a002d7a3-a869-4a28-81e1-a9edf379bae9",
    title: "ایمیل",
    description: "لورم ایپسوم برای محتوای در صورتی که کاغذ دیگه حالا",
    icon: "https://easynect-static-contents.s3.ir-thr-at1.arvanstorage.ir/users/contents_store/icons/a002d7a3-a869-4a28-81e1-a9edf379bae9.png",
  },
];

const fakeNoItem = false;

export default function EditProfileInfoRedirectForm() {
  const [isChecked, setIsChecked] = useState(false);
  const [isItemsSheetOpen, setIsItemSheetOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleToggleSwitch = () => {
    setIsChecked((prevState) => {
      const newState = !prevState;

      if (newState && selectedItem === null) {
        setIsItemSheetOpen(true);
      }

      return newState;
    });
  };

  const toggleItemSheet = () => {
    if (!isChecked && !isItemsSheetOpen) return;

    setIsItemSheetOpen((prevState) => !prevState);
  };

  const handleBottomSheetClose = () => {
    if (!selectedItem) {
      setIsChecked(false);
    }

    setIsItemSheetOpen(false);
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);

    setTimeout(() => {
      setIsItemSheetOpen(false);
    }, 250);
  };

  return (
    <>
      <SwitchTile onToggle={handleToggleSwitch} isChecked={isChecked}>
        انتقال مستقیم
      </SwitchTile>
      <RedirectPathButton onClick={toggleItemSheet} $isDisabled={!isChecked}>
        {selectedItem !== null
          ? selectedItem.title
          : "آیتم مورد نظر را انتخاب کنید"}
        <ArrowDownIcon />
      </RedirectPathButton>
      <BottomSheetWrapper
        open={isItemsSheetOpen}
        onClose={handleBottomSheetClose}
      >
        {fakeNoItem ? (
          <NotItemMessage>
            موردی جهت انتخاب وجود ندارد به قسمت ویرایش آیتم ها بروید و موارد
            جدید خود را ایجاد کنید.
          </NotItemMessage>
        ) : (
          <ItemsWrapper>
            {mockItems.map((item) => (
              <EditProfileInfoRedirectFormItem
                key={item.id}
                active={item.id === selectedItem?.id}
                data={item}
                onSelect={handleSelectItem}
              />
            ))}
          </ItemsWrapper>
        )}
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

const ItemsWrapper = tw.div`
  flex
  flex-col
  gap-2
`;

const NotItemMessage = tw.p`
  bg-gray-100
  text-black
  py-5
  text-center
`;
