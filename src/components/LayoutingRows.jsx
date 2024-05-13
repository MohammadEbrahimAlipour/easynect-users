import tw from "tailwind-styled-components";

// files
import ArrowDownIcon from "@/assets/icons/arrow-down.svg";
import ArrowUpIcon from "@/assets/icons/arrow-up.svg";
import PencilIcon from "@/assets/icons/pencil.svg";
import TrashIcon from "@/assets/icons/trash.svg";
import PlusIcon from "@/assets/icons/plus.svg";

export default function LayoutingRows({ rows, onMoveUp, onMoveDown }) {
  return (
    <Rows>
      {rows.map((row, idx) => {
        const { id, content } = row;
        const { title } = content;

        const isFirstRow = idx === 0;
        const isLastRow = idx === rows.length - 1;

        return (
          <Row key={row.id}>
            <Controllers className="gap-8">
              <Button $disable={isFirstRow} onClick={() => onMoveUp(id, idx)}>
                <ArrowUpIcon className="w-4" />
              </Button>
              <Button $disable={isLastRow} onClick={() => onMoveDown(id, idx)}>
                <ArrowDownIcon className="w-4" />
              </Button>
            </Controllers>
            <ContentWrapper>{title}</ContentWrapper>
            <Controllers>
              <Button>
                <PencilIcon className="w-4" />
              </Button>
              <Button>
                <TrashIcon className="w-4" />
              </Button>
              <Button>
                <PlusIcon className="w-4" />
              </Button>
            </Controllers>
          </Row>
        );
      })}
    </Rows>
  );
}

const Rows = tw.div`
  px-4
  flex
  flex-col
`;

const Row = tw.div`
  flex
  items-center
  gap-4
  pb-4
  pt-4
  border-b

  last:border-b-0
`;

const Controllers = tw.div`
  flex
  flex-col
  gap-4
`;

const Button = tw.button`
  text-gray-400

  transition-all
  duration-150
  ease-out

  ${({ $disable }) =>
    !$disable &&
    `
    visit:text-gray-800
  `}

  ${({ $disable }) =>
    $disable &&
    `
    opacity-30
  `}
`;

const ContentWrapper = tw.div`
  flex-1
  h-20
  bg-white
  rounded-lg
  shadow-lg
  flex
  justify-center
  items-center
  text-gray-300
`;
