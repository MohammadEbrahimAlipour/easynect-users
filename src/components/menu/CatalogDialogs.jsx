// components/dialog/CatalogDialogs.js
import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import CatalogDialog from '../dialog/CustomDialog';
import FileUploader from '../fileUploader/FileUploader';
import CustomCheckBox from '../CustomCheckBox';

export default function CatalogDialogs({
  item_id,
  catalog_id, category_id,
  pageDataDontExist,
  handleClose,
  handleCreateCategoryOrItem,
  catalogCreated,
  setCatalogCreated,
  tabValue,
  title,
  setTitle,
  content,
  setContent,
  handleFileChange,
  error,
  isModalOpen,
  mode,
  closeModal,
  handleConfirm,
}) {
  return (
    <>
      {/* Dialog: Create First Catalog */}
      {/* <CatalogDialog
        header="اولین کاتالوگ"
        open={pageDataDontExist}
        onClose={handleClose}
        onConfirm={handleCreateCataloge}
      >
        <TextField
          label="Title"
          name="title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </CatalogDialog> */}

      {/* Dialog: Create New Category or Item */}
      <CatalogDialog
        header={'آیتم جدید'}
        open={catalogCreated}
        onClose={() => setCatalogCreated(false)}
        onConfirm={handleCreateCategoryOrItem}
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            placeholder="نام"
            name="title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            placeholder="محتوا"
            variant="outlined"
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

      {/* Dialog: Edit Category or Item */}
      <CatalogDialog
        header={'ویرایش آیتم'}
        open={isModalOpen && mode === 'edit'}
        onClose={closeModal}
        onConfirm={handleConfirm}
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            placeholder="نام"
            name="title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            placeholder="محتوا"
            variant="outlined"
            multiline
            rows={3}
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <FileUploader onFileSelect={handleFileChange} />
          <CustomCheckBox item_id={item_id} catalog_id={catalog_id} category_id={category_id}/>

          {error && <Typography color="error">{error}</Typography>}
        </Box>
      </CatalogDialog>

      {/* Dialog: Delete Confirmation */}
      <CatalogDialog
        header="حذف کاتالوگ"
        open={isModalOpen && mode === 'delete'}
        onClose={closeModal}
        onConfirm={handleConfirm}
      >
        <Typography variant="body1" component="p">
          آیا از حذف این کاتالوگ اطمینان دارید؟
        </Typography>
      </CatalogDialog>
    </>
  );
}
