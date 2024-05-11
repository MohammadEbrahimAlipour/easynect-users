import { deepCopy } from "@/utils";
import { useState } from "react";
import tw from "tailwind-styled-components";

// files
import ArrowDownIcon from "@/assets/icons/arrow-down.svg";
import ArrowUpIcon from "@/assets/icons/arrow-up.svg";
import PencilIcon from "@/assets/icons/pencil.svg";
import TrashIcon from "@/assets/icons/trash.svg";
import PlusIcon from "@/assets/icons/plus.svg";

const rowsData = [
  { id: 1, content: { title: "Green" } },
  { id: 2, content: { title: "Yellow" } },
  { id: 3, content: { title: "Purple" } },
  { id: 4, content: { title: "Gray" } },
  { id: 5, content: { title: "Red" } },
];

export default function Playground() {
  const [rows, setRows] = useState(rowsData);

  const handleMoveDown = (rowID, rowIDX) => {
    if (rowIDX >= rows.length - 1) return;

    const newRows = deepCopy(rows);

    const currentRow = newRows[rowIDX];
    const replacedRow = newRows[rowIDX + 1];
    newRows[rowIDX + 1] = currentRow;
    newRows[rowIDX] = replacedRow;

    setRows(newRows);
  };

  const handleMoveUp = (rowID, rowIDX) => {
    if (rowIDX === 0) return;

    const newRows = deepCopy(rows);

    const currentRow = newRows[rowIDX];
    const replacedRow = newRows[rowIDX - 1];
    newRows[rowIDX - 1] = currentRow;
    newRows[rowIDX] = replacedRow;

    setRows(newRows);
  };

  return (
    <Wrapper>
      <Title>Layouts</Title>
      <Rows>
        {rows.map((row, idx) => {
          const { id, content } = row;
          const { title } = content;

          const isFirstRow = idx === 0;
          const isLastRow = idx === rows.length - 1;

          return (
            <Row key={row.id}>
              <Controllers className="gap-8">
                <Button
                  $disable={isFirstRow}
                  onClick={() => handleMoveUp(id, idx)}
                >
                  <ArrowUpIcon className="w-4" />
                </Button>
                <Button
                  $disable={isLastRow}
                  onClick={() => handleMoveDown(id, idx)}
                >
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
    </Wrapper>
  );
}

const Wrapper = tw.div`
  bg-light
  min-h-screen
`;

const Title = tw.button`
  my-5

`;

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
