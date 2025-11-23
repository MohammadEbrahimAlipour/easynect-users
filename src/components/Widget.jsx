import React, { useMemo } from "react";
import tw from "tailwind-styled-components";

// components
import Box from "@/components/Box";

// constants
import { WIDGET_TYPE } from "@/constants";

export default function Widget({ data, handleCountingItemClicks, theme }) {
  const boxContainers = useMemo(
    () => Array(data.display_box_type === WIDGET_TYPE.square ? 2 : 1).fill(),
    [data]
  );

  const { data: boxes, display_box_type } = data;
console.log(boxes, 'boxes')
  return (
    <Wrapper
      style={{
        background: theme?.background,
        borderColor: theme?.borderColor,
      }}
    >
      {boxContainers.map((_, index) => {
  const box = boxes[index];

  return (
    <React.Fragment key={box?.guid || index}>
      {box.type === "embedded videos" ? (
       
          <iframe
            src={box.content_val}
            title={box.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              width: "100%",
              height: "100%",
              minHeight: '300px',
              minWidth: '300px'
            }}
          />
      ) : (
        <Box
          data={box}
          handleCountingItemClicks={handleCountingItemClicks}
          containerDisplayType={display_box_type}
          theme={theme}
        />
      )}
    </React.Fragment>
  );
})}

    </Wrapper>
  );
}

const Wrapper = tw.div`
  mb-5
  flex
  gap-5
  p-3
  rounded-xl
  border
`;
