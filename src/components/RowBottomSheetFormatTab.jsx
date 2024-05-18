import {
  MockWidget,
  MockWidgetImage,
  Option,
  Radio,
  RadioInput,
  RadioLabel,
  Row,
} from "./RowBottomSheet";
import { Skeleton } from "@mui/material";
import { ROW_FORMAT } from "@/constants/layouting";

export default function RowBottomSheetFormatTab({
  selectedFormat,
  onSelectFormat,
}) {
  return (
    <>
      <Option htmlFor="twins-format">
        <Row>
          <MockWidget>
            <MockWidgetImage variant="circular" animation={false} />
            <Skeleton variant="text" animation={false} />
          </MockWidget>
          <MockWidget>
            <MockWidgetImage variant="circular" animation={false} />
            <Skeleton variant="text" animation={false} />
          </MockWidget>
        </Row>
        <Radio>
          <RadioInput
            name="format"
            value={ROW_FORMAT.twins}
            id="twins-format"
            type="radio"
            checked={selectedFormat === ROW_FORMAT.twins}
            onChange={onSelectFormat}
          />
          <RadioLabel htmlFor="twins-format">قالب دوتایی</RadioLabel>
        </Radio>
      </Option>
      <Option htmlFor="single-format">
        <Row>
          <MockWidget className="flex h-20 w-72">
            <MockWidgetImage
              className="w-8 h-8"
              variant="circular"
              animation={false}
            />
            <div className="flex-1 mr-4">
              <Skeleton animation={false} />
              <Skeleton variant="text" animation={false} />
            </div>
          </MockWidget>
        </Row>
        <Radio>
          <RadioInput
            value={ROW_FORMAT.single}
            checked={selectedFormat === ROW_FORMAT.single}
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
