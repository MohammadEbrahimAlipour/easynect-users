"use client";
import { useCallback, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import tw from "tailwind-styled-components";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { useResizeObserver } from "@wojtekmaj/react-hooks";

// components
import SquareData from "@/components/publicPageView/SquareData";
import BottomSheetWrapper from "@/components/bottomSheet/BottomSheetWrapper";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const resizeObserverOptions = {};

const maxWidth = 800;

const fakeBol = true;

export default function Playground() {
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [isPreviewSheetOpen, setIsPreviewSheetOpen] = useState(false);
  const [containerRef, setContainerRef] = useState(null);
  const [containerWidth, setContainerWidth] = useState();

  const onResize = useCallback((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleBottomSheetClose = () => {
    setIsPreviewSheetOpen(false);
  };

  return (
    <div>
      <h1>Playground</h1>
      <h3> Testing pdf and image preview</h3>

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
        handleCountingItemClicks={(e) => {
          console.log("e", e);
          setIsPreviewSheetOpen(true);
        }}
      />

      <BottomSheetWrapper
        open={isPreviewSheetOpen}
        onClose={handleBottomSheetClose}
      >
        <div className="flex flex-col h-[62vh]">
          <PreviewContainer ref={setContainerRef}>
            {fakeBol ? (
              <Document
                file={"./sample.pdf"}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    width={
                      containerWidth
                        ? Math.min(containerWidth, maxWidth)
                        : maxWidth
                    }
                  />
                ))}
              </Document>
            ) : (
              <Image src="https://dummyimage.com/326x436/000/fff" />
            )}
          </PreviewContainer>
          <DownloadButton>دانلود قایل</DownloadButton>
        </div>
      </BottomSheetWrapper>
    </div>
  );
}

const DownloadButton = tw.button`
  bg-black
  py-3
  text-white
  mt-2
  rounded-md
  shadow-xl
`;

const PreviewContainer = tw.div`
  flex
  justify-center
  border-2
  border-gray-300
  rounded-xl
  overflow-x-hidden
  overflow-y-scroll
  flex-1
  mt-2
`;

const Image = tw.img`
  w-full
  h-full
  object-contain	
  bg-gray-200
`;
