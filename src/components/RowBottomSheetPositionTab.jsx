import { POSITIONS, WIDGET_TYPE } from "@/constants";
import { Option, Radio, RadioInput, RadioLabel } from "./RowBottomSheet";

export default function RowBottomSheetPositionTab({
  selectedPosition,
  onSelectPosition,
}) {
  return (
    <>
      <Option htmlFor="position-above" className="pb-2">
        <Radio>
          <RadioInput
            name="position"
            value={POSITIONS.above}
            id="position-above"
            type="radio"
            checked={selectedPosition === POSITIONS.above}
            onChange={() => onSelectPosition(POSITIONS.above)}
          />
          <RadioLabel htmlFor="position-above">بالای سطر فعلی</RadioLabel>
        </Radio>
      </Option>
      <Option htmlFor="position-below">
        <Radio>
          <RadioInput
            value={POSITIONS.below}
            checked={selectedPosition === POSITIONS.below}
            onChange={() => onSelectPosition(POSITIONS.below)}
            name="position"
            id="position-below"
            type="radio"
          />
          <RadioLabel htmlFor="position-below">پایین سطر فعلی</RadioLabel>
        </Radio>
      </Option>
    </>
  );
}
