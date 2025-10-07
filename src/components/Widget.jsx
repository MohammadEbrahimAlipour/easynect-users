import { useMemo } from "react";
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

  return (
    <Wrapper
      style={{
        background: theme?.background,
        borderColor: theme?.borderColor,
      }}
    >
      {boxContainers.map((_, index) => (
        <Box
          key={index}
          data={boxes[index]}
          handleCountingItemClicks={handleCountingItemClicks}
          containerDisplayType={display_box_type}
          theme={theme} // ← پاس دادن theme به Box
        />
      ))}
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
