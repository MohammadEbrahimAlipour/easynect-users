import React, { useState, useEffect } from "react";
import { CloseIconSmall, TickSuccess } from "../Icons";

const NFCTag = ({ result, setResult }) => {
  const [nfcMessage, setNfcMessage] = useState("");
  const [nfcError, setNfcError] = useState("");

  useEffect(() => {
    // Make sure NFC functionality is only initialized once when the component mounts
    if ("NDEFReader" in window) {
      initializeNFC();
    } else {
      setNfcError("Web NFC is not supported by this browser.");
    }
  }, []);

  const initializeNFC = async () => {
    try {
      const ndef = new window.NDEFReader();
      await ndef.scan();

      ndef.onreading = (event) => {
        for (const record of event.message.records) {
          // Handle URL records
          if (record.recordType === "url") {
            const textDecoder = new TextDecoder();
            const url = textDecoder.decode(record.data);
            setNfcMessage(`NFC Tag URL: ${url}`);
            setResult(url); // Assuming `setResult` updates the parent component's state with the URL.
          } else {
            // Handle any non-URL records if necessary
            setNfcMessage("Unhandled NFC Tag data received.");
          }
        }
      };

      ndef.onerror = () => {
        setNfcError("Error reading NFC tag.");
      };
    } catch (error) {
      setNfcError("Error initializing NFC reader.");
    }
  };

  return (
    <div className="flex flex-col items-start justify-start mt-2">
      {!nfcError ? (
        <span className="me-2 flex gap-1 items-center">
          {result !== null ? <TickSuccess /> : <CloseIconSmall />}
          {result ? "کارت با موفقیت اسکن شد." : "کارت را اسکن کنید."}
        </span>
      ) : (
        <p className="mt-2 text-[#CB3434] text-sm">
          {nfcError && "مرورگر یا دستگاه شما از nfc پشتیبانی نمی‌کند."}
        </p>
      )}
    </div>
  );
};

export default NFCTag;
