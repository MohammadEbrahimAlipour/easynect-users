"use client";
import { useCallback, useMemo, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import tw from "tailwind-styled-components";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { useResizeObserver } from "@wojtekmaj/react-hooks";

// components
import BottomSheetWrapper from "@/components/bottomSheet/BottomSheetWrapper";
import { getFileExtension } from "@/utils/file";
import { FILE_EXTENSIONS } from "@/constants/file";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const resizeObserverOptions = {};

const maxWidth = 800;

const fakeBol = true;

export default function FilePreviewBottomSheet({ url, isOpen, onClose }) {
  const [numPages, setNumPages] = useState(0);
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

  const isPDF = useMemo(
    () => getFileExtension(url) === FILE_EXTENSIONS.pdf,
    [url]
  );

  return (
    <BottomSheetWrapper open={isOpen} onClose={onClose} maxHeight={"unset"}>
      <div className="flex flex-col h-[87vh]">
        <PreviewContainer ref={setContainerRef}>
          {isPDF ? (
            <Document
              externalLinkTarget="_blank"
              file={url}
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
            <Image alt="" src={url} />
          )}
        </PreviewContainer>
        <Buttons>
          <DownloadButton>دانلود قایل</DownloadButton>
          <CancelButton onClick={onClose}>بستن</CancelButton>
        </Buttons>
      </div>
    </BottomSheetWrapper>
  );
}

const Buttons = tw.div`
  flex
  mt-2
  gap-2
`;

const BaseButton = tw.button`
  flex-1
  py-3
  rounded-xl
  shadow-xl
  border-2
  border-black
`;

const CancelButton = tw(BaseButton)`
  text-black
`;

const DownloadButton = tw(BaseButton)`
  bg-black
  text-white
`;

const PreviewContainer = tw.div`
  flex
  justify-center
  border-4
  border-gray-300
  rounded-xl
  overflow-x-hidden
  overflow-y-auto
  flex-1
  mt-3
  mb-2
`;

const Image = tw.img`
  w-full
  h-full
  object-contain	
  bg-gray-200
`;
