import { useMemo } from "react";
import tw from "tailwind-styled-components";

// components
import Box from "@/components/Box";

// constants
import { BOX_TYPES } from "@/constants";

export default function Widget({ data, handleCountingItemClicks }) {
  const boxContainers = useMemo(
    () => Array(data.display_box_type === BOX_TYPES.square ? 2 : 1).fill(),
    [data]
  );

  const { data: boxes, display_box_type } = data;

  return (
    <Wrapper>
      {boxContainers.map((_, index) => (
        <Box
          key={index}
          data={boxes[index]}
          handleCountingItemClicks={handleCountingItemClicks}
          containerDisplayType={display_box_type}
        />
      ))}
    </Wrapper>
  );
}

const Wrapper = tw.div`
  mb-5
  flex
  gap-5
`;
