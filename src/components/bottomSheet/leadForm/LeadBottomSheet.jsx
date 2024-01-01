import React from "react";
import BottomSheetWrapper from "../BottomSheetWrapper";

const LeadBottomSheet = ({ showList, setShowList, leadOptions }) => {
  console.log("leadOptions", leadOptions);
  return (
    <>
      <BottomSheetWrapper open={showList} onClose={() => setShowList(false)}>
        {leadOptions && (
          <>
            {leadOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => handleExtractId(option.id, option.title)}
                className="border-b w-full py-2 mx-5 text-right font-ravi"
              >
                {option.title}
              </div>
            ))}
          </>
        )}
      </BottomSheetWrapper>
    </>
  );
};

export default LeadBottomSheet;
