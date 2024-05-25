import { deepCopy } from "@/utils";
import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import { toast } from "react-toastify";

// files
import PlusIcon from "@/assets/icons/plus.svg";

// components
import LayoutingRows from "@/components/LayoutingRows";
import RowsBottomSheet from "@/components/RowBottomSheet";
import { POSITIONS, WIDGET_TYPE } from "@/constants";
import RowBottomSheetDelete from "@/components/RowBottomSheetDelete";
import { generateApiUrl } from "@/components/ApiUr";
import axios from "axios";
import { useAccessToken } from "../../context/AccessTokenContext";

const FAKE_PAGE_ID = "652170d9-e010-49eb-ae34-5d2d37c2481f";

let id = 0;
export default function Playground() {
  const [rows, setRows] = useState([]);
  const [isRowsBottomSheetOpen, setIsRowsBottomSheetOpen] = useState(false);
  const [addingPosition, setAddingPosition] = useState(null);
  const [addInPositionMode, setAddInPositionMode] = useState(false);
  const [isRowsBottomSheetDeleteOpen, setIsRowsBottomSheetDeleteOpen] =
    useState(false);
  const [deletingRowIndex, setDeletingRowIndex] = useState(null);
  const [editingRow, setEditingRow] = useState(null);
  const [contents, setContents] = useState([]);
  const accessToken = useAccessToken();

  useEffect(() => {
    getPageData();
    getContent();
  }, []);

  const getPageData = () => {
    const apiUrl = generateApiUrl(`/api/v1/page_view/preview/${FAKE_PAGE_ID}`);

    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,
          "Accept-Language": "fa",
        },
      })
      .then((response) => {
        console.log("response.data", response.data);
        // setExtractedData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        if (error.response && error.response.status === 404) {
          setNoCard(true); // Set to true if a 404 error occurs
        }
      });
  };

  const getContent = () => {
    const apiUrl = generateApiUrl(`/api/v1/contents/page/${FAKE_PAGE_ID}`);

    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,
          "Accept-Language": "fa",
        },
      })
      .then(({ data }) => {
        setContents(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

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

  const handleAddUpdateRow = (rowContent, rowPosition = null) => {
    setRows((preRows) => {
      const newRows = [...preRows];

      id++;

      const newRow = {
        id,
        content: rowContent,
      };

      if (editingRow !== null) {
        setEditingRow(null);

        return preRows.map((row) => {
          const { id } = row;
          if (id === editingRow.id) {
            return newRow;
          }

          return row;
        });
      }

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

  const handleEditRow = (index) => {
    const row = rows.filter((_, idx) => {
      return idx === index;
    });

    setEditingRow(row?.[0]);
    setIsRowsBottomSheetOpen(true);
  };

  const convertRowsToBody = () => {
    const body = [];

    let mainOrder = 0;

    rows.forEach((row) => {
      mainOrder++;

      const { content } = row;

      if (content.length === 1) {
        body.push({
          content_id: content[0].content_id,
          main_order: mainOrder,
          sub_order: 1,
          display_box_type: WIDGET_TYPE.rectangle,
        });
        return;
      }

      let subOrder = 0;
      content.forEach((item) => {
        subOrder++;

        body.push({
          content_id: item.content_id,
          main_order: mainOrder,
          sub_order: subOrder,
          display_box_type: WIDGET_TYPE.square,
        });
      });
    });

    return body;
  };

  const handleSubmit = () => {
    const body = convertRowsToBody();

    const apiUrl = generateApiUrl(
      `/api/v1/page_view/contents/order/${FAKE_PAGE_ID}`
    );
    axios
      .patch(apiUrl, body, {
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,
          "Accept-Language": "fa",
        },
      })
      .then((response) => {
        console.log("User data updated successfully.");
        toast.success("updated successfully");
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.detail
        ) {
          const errorMessage = error.response.data.detail;
          toast.error(errorMessage);
        } else {
          toast.error("Error: An error occurred.");
        }
      });
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
        onEdit={handleEditRow}
      />
      <ButtonWrapper>
        {rows.length ? (
          <Button
            onClick={handleSubmit}
            className={rows.length ? "mt-4" : "mt-16"}
          >
            ذخیره تغییرات
          </Button>
        ) : null}
        <AddRowButton
          onClick={handleOpenAddRow}
          className={rows.length ? "mt-4" : "mt-16"}
        >
          <PlusIcon className="w-6 ml-2" />
          افزودن سطر
        </AddRowButton>
      </ButtonWrapper>
      <RowsBottomSheet
        onClose={handleCloseRowsBottomSheet}
        open={isRowsBottomSheetOpen}
        onAdd={handleAddUpdateRow}
        addInPositionMode={addInPositionMode}
        editingRow={editingRow && editingRow.content}
        contents={contents}
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

const Button = tw.button`
  border-2
  bg-gray-900
  border-gray-900
  text-white
  px-5
  py-2
  rounded-lg
  flex
`;

const AddRowButton = tw(Button)`
  pr-3
  bg-transparent
  text-gray-900
`;

const ButtonWrapper = tw.div`
  flex
  justify-center
  gap-3
`;
