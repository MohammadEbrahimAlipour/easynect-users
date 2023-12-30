import React, { useState, useEffect } from "react";

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
    <div>
      <div>NFCTag</div>
      {nfcMessage && <p>{nfcMessage}</p>}
      <p>result: {result}</p>
      {nfcError && <p className="error">{nfcError}</p>}
      {/* You can also place a button here to manually start scanning */}
    </div>
  );
};

export default NFCTag;
