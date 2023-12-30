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
        const decoder = new TextDecoder();
        for (const record of event.message.records) {
          switch (record.recordType) {
            case "text":
              const textDecoder = new TextDecoder(record.encoding);
              setNfcMessage(`NFC Tag Text: ${textDecoder.decode(record.data)}`);
              setResult(`NFC Tag Text: ${textDecoder.decode(record.data)}`);
              break;
            // Handle other record types as necessary
            default:
              setNfcMessage("NFC Tag data received.");
              setResult("NFC Tag data received.");
              break;
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
      {nfcError && <p className="error">{nfcError}</p>}
      {/* You can also place a button here to manually start scanning */}
    </div>
  );
};

export default NFCTag;
