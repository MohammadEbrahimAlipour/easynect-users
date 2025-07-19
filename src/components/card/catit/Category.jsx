import React from "react";
import { Card, CardActionArea, CardContent, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useRouter } from "next/router";
import Image from "next/image";
export default function CategoryCard({ order, id, isHighlight, title, onEdit, onClose, onDragStart, image, onClick }) {
    const router = useRouter();

    return (
        <Card sx={{ marginY: 2 }}>
            <Box
                sx={{ display: 'flex' }}
            >
                <Box sx={{ flex: 8, justifyContent: 'start' }}>
                    <IconButton size="small" onClick={onClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Box>
                <IconButton size="small" onClick={onEdit}>
                    <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onTouchStart={onDragStart} onMouseDown={onDragStart}>
                    <DragIndicatorIcon fontSize="small" />
                </IconButton>
            </Box>

            <CardActionArea onClick={onClick}>
                <CardContent sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                    {image && (
                        <div className="w-8 h-8 relative rounded-full overflow-hidden">
                            <Image
                                src={image}
                                alt="Card image"
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                    {title}
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
