import React, { useRef } from 'react';
import { Box, Avatar, Typography, IconButton, Tooltip } from '@mui/material';
import { useDrag, useDrop } from 'react-dnd';
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ItemType = 'CATEGORY_CARD';

export default function FieldCard({ field, index, moveCard, onEdit, onDelete }) {
    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: ItemType,
        hover(draggedItem) {
            if (draggedItem.index === index) return;
            moveCard(draggedItem.index, index);
            draggedItem.index = index;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: ItemType,
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    return (
        <Box
            ref={ref}
            style={{ opacity: isDragging ? 0.5 : 1 }}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
            mb={2}
            mt={2}
            flexWrap="wrap"
        >
            {/* آواتار */}
            {/* {field.s3_icon_url && (
                <Avatar
                    src={field.s3_icon_url}
                    alt={field.title}
                    variant="rounded"
                    sx={{
                        width: 45,
                        height: 45,
                        border: '1px #D1AB48 solid',
                        borderRadius: '100%',
                    }}
                />
            )} */}

            {/* اطلاعات فیلد */}
            <Box sx={{ flexGrow: 1, minWidth: 100 }}>
                <Typography variant="caption" color="text.secondary">
                    نوع: {field.type}
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                    {field.title}
                </Typography>
            </Box>

            {/* آیکون‌ها */}
            <Box display="flex" alignItems="center" gap={1}>
                <Tooltip title="ویرایش">
                    <IconButton size="small" onClick={() => onEdit?.(field, index)}>
                        <EditIcon fontSize="small" />
                    </IconButton>
                </Tooltip>

                <Tooltip title="حذف">
                    <IconButton size="small" onClick={() => onDelete?.(field, index)}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Tooltip>

                <Tooltip title="جابجایی">
                    <IconButton size="small">
                        <DragIndicatorIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
}
