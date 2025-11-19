import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Button,
    DialogActions,
    TextField,
} from '@mui/material';
import DndContextProvider from '@/components/dnd/DndContext';
import FieldCard from './FieldCard';
import CatalogDialog from '@/components/dialog/CustomDialog';

export default function CardFormLead({ data, handleDeleteModal, handleEditModal }) {
    const { fields = [], note } = data || {};
    const [items, setItems] = useState([]);
    const [fieldId, setFieldId] = useState(null);
    const [title, setTitle] = useState('');
    const [editModal, setEditModal] = useState();

    const moveCard = (fromIndex, toIndex) => {
        const updated = [...items];
        const [moved] = updated.splice(fromIndex, 1);
        updated.splice(toIndex, 0, moved);
        setItems(updated);
    };

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const handleCancelDelete = () => {
        setDeleteDialogOpen(false);
    }
    const handleOpenModal = (id) => {
        setDeleteDialogOpen(true);
        setFieldId(id.id || id);
    }
    const handleOpenModalEdit = (id) => {
        setEditModal(true);
        setFieldId(id.id || id);
    }
    const handleConfirmDelete = () => {
        handleDeleteModal(fieldId);
        setDeleteDialogOpen(false);
    }
  useEffect(() => {
  if (Array.isArray(fields) && fields.length > 0) {
    setItems(fields);
  }
}, [fields]);
console.log(items, 'items')
    return (
        <><Card
            variant="outlined"
            elevation={2}
            sx={{
                borderRadius: 3,
                marginY: 2,
                p: 2,
                transition: '0.3s',
                '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-2px)',
                },
            }}
        >
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    فیلدهای فرم
                </Typography>

                <Divider sx={{ my: 2 }} />
                <DndContextProvider>
                    {items.map((field, index) => (
                        <React.Fragment key={field.id || index}>
                            <FieldCard
                                onEdit={(field) => handleOpenModalEdit(field)}
                                onDelete={(field) => handleOpenModal(field)}
                                field={field}
                                index={index}
                                moveCard={moveCard} />
                            <Divider />
                        </React.Fragment>
                    ))}
                </DndContextProvider>

                {note && (
                    <>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="body2" color="text.secondary">
                            یادداشت: {note}
                        </Typography>
                    </>
                )}
            </CardContent>
        </Card>
            <Dialog open={deleteDialogOpen} onClose={handleCancelDelete}>
                <DialogTitle>تایید حذف</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        آیا مطمئن هستید که می‌خواهید  را حذف کنید؟
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete} sx={{color: '#000'}}>انصراف</Button>
                    <Button onClick={handleConfirmDelete} color="error" variant="contained">
                        حذف
                    </Button>
                </DialogActions>
            </Dialog>
            <CatalogDialog
                header={`ویرایش فرم`}
                open={editModal}
                onClose={() => setEditModal(false)}
                onConfirm={() => {
                    console.log(fieldId, title, 'field_id, title before test')
                    handleEditModal(fieldId, title)
                }}
            >
                <TextField
                    placeholder="نام"
                    name="title"
                    fullWidth
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </CatalogDialog>
        </>
    );
}
