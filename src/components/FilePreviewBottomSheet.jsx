"use client";
import { useCallback, useMemo, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import tw from "tailwind-styled-components";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { useResizeObserver } from "@wojtekmaj/react-hooks";

// components
import BottomSheetWrapper from "@/components/bottomSheet/BottomSheetWrapper";
import ZoomController from "@/components/ZoomController";
import UnsupportedFileError from "@/components/UnsupportedFileError";

// utils
import { downloadFile, getFileExtension } from "@/utils/file";

// constants
import { FILE_EXTENSIONS } from "@/constants/file";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const resizeObserverOptions = {};

const maxWidth = 800;

export default function FilePreviewBottomSheet({ url, isOpen, onClose }) {
  const [numPages, setNumPages] = useState(0);
  const [containerRef, setContainerRef] = useState(null);
  const [containerWidth, setContainerWidth] = useState();
  const [scale, setScale] = useState(1);

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

  const handleScaleChange = (scale) => {
    setScale(scale);
  };

  const displayFile = () => {
    const fileExtension = getFileExtension(url);

    if (fileExtension === FILE_EXTENSIONS.pdf) {
      return (
        <Document
          externalLinkTarget="_blank"
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              scale={scale}
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={
                containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
              }
            />
          ))}
        </Document>
      );
    }

    if (Object.keys(FILE_EXTENSIONS.images).includes(fileExtension)) {
      return <Image alt="" src={url} />;
    }

    return <UnsupportedFileError extension={fileExtension} />;
  };

  return (
    <BottomSheetWrapper
      open={isOpen}
      onClose={onClose}
      fullScreen
      className={"px-0"}
    >
      <Wrapper>
        <PreviewContainer ref={setContainerRef}>
          {displayFile()}
        </PreviewContainer>
        {isPDF && <ZoomController scale={scale} onChange={handleScaleChange} />}
        <Buttons>
          <DownloadButton onClick={() => downloadFile(url)}>
            دانلود فایل
          </DownloadButton>
          {onClose !== null && (
            <CancelButton onClick={onClose}>بستن</CancelButton>
          )}
        </Buttons>
      </Wrapper>
    </BottomSheetWrapper>
  );
}

const Wrapper = tw.div`
  flex
  flex-col
  h-full
  bg-gray-300/75
  px-3
  py-2
`;

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
  font-['__raviFont_c3f3ce']
`;

const CancelButton = tw(BaseButton)`
  text-black
`;

const DownloadButton = tw(BaseButton)`
  bg-black
  text-white
`;

const PreviewContainer = tw.div`
  rounded-xl
  overflow-auto
  flex-1
  mt-1
  mb-2
  bg-white
`;

const Image = tw.img`
  w-full
  h-full
  object-contain	
  bg-gray-200
`;
