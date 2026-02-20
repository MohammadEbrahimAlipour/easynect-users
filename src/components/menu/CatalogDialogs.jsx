import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  CircularProgress,
  Divider
} from '@mui/material';
import CatalogDialog from '../dialog/CustomDialog';
import FileUploader from '../fileUploader/FileUploader';
import CustomCheckBox from '../CustomCheckBox';
import ExistingItemCard from '../items/ExistingItemCard';

export default function CatalogDialogs({
  item_id,
  catalog_id,
  category_id,

  catalogCreated,
  setCatalogCreated,
  handleCreateCategoryOrItem,
  modalItemExisting,
  setModalItemExisting,
  isModalOpen,
  mode,
  closeModal,
  handleConfirm,

  title,
  setTitle,
  content,
  setContent,
  handleFileChange,
  error,

  existingItems,
  loadingExisting,
  search,
  setSearch,
  items,
  handleAddExistingItem,
}) {

  const filteredExisting = existingItems
    ?.filter(ex =>
      ex.title?.toLowerCase().includes(search.toLowerCase())
    )
    .filter(ex =>
      !items.some(catItem => catItem.id === ex.id)
    );
  const [selectedIds, setSelectedIds] = useState([]);

  const handleToggle = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id]
    );
  };

  return (
    <>
      {/* انتخاب نوع افزودن */}
      <CatalogDialog
        header="افزودن آیتم"
        open={isModalOpen && mode === 'selectAddType'}
        onClose={closeModal}
        hideConfirm
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <Button
            variant="outlined"
            sx={{
              color: '#D1AB48',
              borderColor: '#D1AB48',
              border: '1px solid'
            }}
            onClick={() => {
              closeModal();
              setCatalogCreated(true);
            }}
          >
            ایجاد آیتم جدید
          </Button>

          <Button
            variant="outlined"
            sx={{
              color: '#D1AB48',
              borderColor: '#D1AB48',
              border: '1px solid'
            }}
            onClick={() => {
              closeModal();
              setModalItemExisting(true);
            }}
          >
            افزودن از آیتم‌های موجود
          </Button>
        </Box>
      </CatalogDialog>

      {/* ایجاد آیتم */}
      <CatalogDialog
        header="آیتم جدید"
        open={catalogCreated}
        onClose={() => setCatalogCreated(false)}
        onConfirm={handleCreateCategoryOrItem}
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            placeholder="نام"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            placeholder="محتوا"
            multiline
            rows={3}
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <FileUploader onFileSelect={handleFileChange} />

          {error && <Typography color="error">{error}</Typography>}
        </Box>
      </CatalogDialog>

      {/* انتخاب از موجود */}
      <CatalogDialog
        header="انتخاب از آیتم‌های موجود"
        open={modalItemExisting}
        onClose={() => setModalItemExisting(false)}
        hideConfirm
      >
        <Box display="flex" flexDirection="column" gap={2}>
          {existingItems?.map((item) => (
            <ExistingItemCard
              key={item.id}
              item={item}
              selected={selectedIds.includes(item.id)}
              onToggle={handleToggle}
            />
          ))}
        </Box>
      </CatalogDialog>


      {/* ویرایش */}
      <CatalogDialog
        header="ویرایش آیتم"
        open={isModalOpen && mode === 'edit'}
        onClose={closeModal}
        onConfirm={handleConfirm}
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            placeholder="نام"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            placeholder="محتوا"
            multiline
            rows={3}
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <FileUploader onFileSelect={handleFileChange} />

          <CustomCheckBox
            item_id={item_id}
            catalog_id={catalog_id}
            category_id={category_id}
          />

          {error && <Typography color="error">{error}</Typography>}
        </Box>
      </CatalogDialog>

      {/* حذف */}
      <CatalogDialog
        header="حذف آیتم"
        open={isModalOpen && mode === 'delete'}
        onClose={closeModal}
        onConfirm={handleConfirm}
      >
        <Typography>
          آیا از حذف این آیتم اطمینان دارید؟
        </Typography>
      </CatalogDialog>
    </>
  );
}
