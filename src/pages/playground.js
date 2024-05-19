import { deepCopy } from "@/utils";
import { useState } from "react";
import tw from "tailwind-styled-components";

// files
import PlusIcon from "@/assets/icons/plus.svg";

// components
import LayoutingRows from "@/components/LayoutingRows";
import RowsBottomSheet from "@/components/RowBottomSheet";
import { POSITIONS } from "@/constants";
import RowBottomSheetDelete from "@/components/RowBottomSheetDelete";

const rowsData = [
  // { id: 1, content: { title: "Green" } },
  // { id: 2, content: { title: "Yellow" } },
  // { id: 3, content: { title: "Purple" } },
  // { id: 4, content: { title: "Gray" } },
  // { id: 5, content: { title: "Red" } },
];

let id = 0;
export default function Playground() {
  const [rows, setRows] = useState(rowsData);
  const [isRowsBottomSheetOpen, setIsRowsBottomSheetOpen] = useState(false);
  const [addingPosition, setAddingPosition] = useState(null);
  const [addInPositionMode, setAddInPositionMode] = useState(false);
  const [isRowsBottomSheetDeleteOpen, setIsRowsBottomSheetDeleteOpen] =
    useState(false);
  const [deletingRowIndex, setDeletingRowIndex] = useState(null);

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

  const handleCloseRowsBottomSheet = () => {
    setIsRowsBottomSheetOpen(false);
    setTimeout(() => {
      setAddInPositionMode(false);
    }, 300);
  };

  const handleCloseRowBottomSheetDelete = () => {
    setIsRowsBottomSheetDeleteOpen(false);
  };

  const handleOpenAddRow = () => {
    setIsRowsBottomSheetOpen(true);
  };

  const handleAddRow = (row, rowPosition = null) => {
    setRows((preRows) => {
      const newRows = [...preRows];

      id++;

      const newRow = {
        id,
        content: row,
      };

      if (rowPosition === null) {
        newRows.push(newRow);

        return newRows;
      }

      if (addingPosition < 0 || addingPosition >= preRows.length) {
        console.error("Index out of bounds");
        return preRows;
      }

      const positionIndex = rowPosition === POSITIONS.above ? 0 : 1;

      newRows.splice(addingPosition + positionIndex, 0, newRow);

      setAddInPositionMode(false);
      setAddingPosition(null);

      return newRows;
    });

    setIsRowsBottomSheetOpen(false);
  };

  const handleAddOnPosition = (position) => {
    setIsRowsBottomSheetOpen(true);
    setAddInPositionMode(true);
    setAddingPosition(position);
  };

  const handleDelete = () => {
    setRows((preRows) => {
      const newRows = [...preRows];

      return newRows.filter((_, idx) => idx !== deletingRowIndex);
    });

    setIsRowsBottomSheetDeleteOpen(false);
  };

  const handleSelectDeletingRow = (index) => {
    setDeletingRowIndex(index);
    setIsRowsBottomSheetDeleteOpen(true);
  };

  return (
    <Wrapper>
      <Title>Layouts</Title>
      <LayoutingRows
        rows={rows}
        onMoveDown={handleMoveDown}
        onMoveUp={handleMoveUp}
        onAddOnPosition={handleAddOnPosition}
        onDelete={handleSelectDeletingRow}
      />
      <AddRowButton
        onClick={handleOpenAddRow}
        className={rows.length ? "mt-4" : "mt-16"}
      >
        <PlusIcon className="w-6 ml-2" />
        افزودن سطر
      </AddRowButton>
      <RowsBottomSheet
        onClose={handleCloseRowsBottomSheet}
        open={isRowsBottomSheetOpen}
        onAdd={handleAddRow}
        addInPositionMode={addInPositionMode}
      />
      <RowBottomSheetDelete
        onClose={handleCloseRowBottomSheetDelete}
        open={isRowsBottomSheetDeleteOpen}
        onDelete={handleDelete}
      />
    </Wrapper>
  );
}

const Wrapper = tw.div`
  bg-light
  min-h-screen
`;

const Title = tw.button`
  my-5
  text-xl
  text-center
  text-gray-700
  w-full
`;

const AddRowButton = tw.button`
  border-2
  border-gray-900
  px-5
  pr-3
  py-2
  rounded-lg
  flex
  mx-auto
`;
