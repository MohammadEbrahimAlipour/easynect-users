import { WIDGET_TYPE } from "@/constants";
import {
  MockBox,
  MockBoxImage,
  Option,
  Radio,
  RadioInput,
  RadioLabel,
  Row,
} from "./RowBottomSheet";
import { Skeleton } from "@mui/material";

export default function RowBottomSheetFormatTab({
  selectedFormat,
  onSelectFormat,
}) {
  return (
    <>
      <Option htmlFor="twins-format">
        <Row>
          <MockBox>
            <MockBoxImage variant="circular" animation={false} />
            <Skeleton variant="text" animation={false} />
          </MockBox>
          <MockBox>
            <MockBoxImage variant="circular" animation={false} />
            <Skeleton variant="text" animation={false} />
          </MockBox>
        </Row>
        <Radio>
          <RadioInput
            name="format"
            value={WIDGET_TYPE.square}
            id="twins-format"
            type="radio"
            checked={selectedFormat === WIDGET_TYPE.square}
            onChange={onSelectFormat}
          />
          <RadioLabel htmlFor="twins-format">قالب دوتایی</RadioLabel>
        </Radio>
      </Option>
      <Option htmlFor="single-format">
        <Row>
          <MockBox $widgetType={WIDGET_TYPE.rectangle}>
            <MockBoxImage
              className="w-8 h-8 mb-0"
              variant="circular"
              animation={false}
            />
            <div className="flex-1 mr-4">
              <Skeleton animation={false} />
              <Skeleton variant="text" animation={false} />
            </div>
          </MockBox>
        </Row>
        <Radio>
          <RadioInput
            value={WIDGET_TYPE.rectangle}
            checked={selectedFormat === WIDGET_TYPE.rectangle}
            onChange={onSelectFormat}
            name="format"
            id="single-format"
            type="radio"
          />
          <RadioLabel htmlFor="single-format">قالب تکی</RadioLabel>
        </Radio>
      </Option>
    </>
  );
}
