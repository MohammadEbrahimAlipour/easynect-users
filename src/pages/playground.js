import RectangleData from "@/components/publicPageView/RectangleData";
import SquareData from "@/components/publicPageView/SquareData";

export default function Playground() {
  return (
    <div>
      <h1 className="text-xl text-gray-500 mb-4">در حال تست کپی کردن</h1>
      <RectangleData
        object={{
          guid: "5d85b2b3-5da5-41e1-826d-02cdbb241d22",
          display_box_type: "square",
          main_order: 1,
          data: [
            {
              id: "1a94fbb0-fed7-421a-83ad-d551096d15f1",
              sub_order: 1,
              main_order: 1,
              guid: "2f248677-dbb7-4fdb-bd71-cc8792836615",
              title: "شماره‌ی شبا",
              description: "شماره‌ی شبای کارت رسالت",
              content_val: "IR580540102680020817909002",
              s3_icon_url:
                "https://easynect-static-contents.s3.ir-thr-at1.arvanstorage.ir/users/contents_store/icons/5a3c1dbe-0f6c-43f3-919b-a81aa7ff0be2.png",
              type: "text",
            },
            {
              id: "1bea9b32-596f-4c28-8148-663c871e432f",
              sub_order: 2,
              main_order: 1,
              guid: "453d038b-d088-48cf-a5f1-7c974ad4511a",
              title: "اینستاگرام",
              description: "توضیحات بلاب بلاب بلا",
              content_val: "https://instagram.com/sample url",
              s3_icon_url:
                "https://easynect-static-contents.s3.ir-thr-at1.arvanstorage.ir/users/contents_store/icons/48b718f7-bbec-45b2-89a2-ac49d5ee5e85.png",
              type: "link",
            },
          ],
        }}
        handleCountingItemClicks={() => {}}
      />
      <SquareData
        object={{
          guid: "5d85b2b3-5da5-41e1-826d-02cdbb241d22",
          display_box_type: "square",
          main_order: 1,
          data: [
            {
              id: "1a94fbb0-fed7-421a-83ad-d551096d15f1",
              sub_order: 1,
              main_order: 1,
              guid: "2f248677-dbb7-4fdb-bd71-cc8792836615",
              title: "شماره‌ی شبا",
              description: "شماره‌ی شبای کارت رسالت",
              content_val: "IR580540102680020817909002",
              s3_icon_url:
                "https://easynect-static-contents.s3.ir-thr-at1.arvanstorage.ir/users/contents_store/icons/5a3c1dbe-0f6c-43f3-919b-a81aa7ff0be2.png",
              type: "text",
            },
            {
              id: "1bea9b32-596f-4c28-8148-663c871e432f",
              sub_order: 2,
              main_order: 1,
              guid: "453d038b-d088-48cf-a5f1-7c974ad4511a",
              title: "اینستاگرام",
              description: "توضیحات بلاب بلاب بلا",
              content_val: "https://instagram.com/sample url",
              s3_icon_url:
                "https://easynect-static-contents.s3.ir-thr-at1.arvanstorage.ir/users/contents_store/icons/48b718f7-bbec-45b2-89a2-ac49d5ee5e85.png",
              type: "link",
            },
          ],
        }}
        handleCountingItemClicks={() => {}}
      />
    </div>
  );
}
