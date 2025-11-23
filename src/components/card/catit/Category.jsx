import React from "react";
import { Card, CardActionArea, CardContent, IconButton, Box, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useRouter } from "next/router";
import Image from "next/image";

export default function CategoryCard({
  order,
  id,
  isHighlight,
  title,
  onEdit,
  onClose,
  onDragStart,
  image,
  onClick,
  onToggleHighlight, // <--- اضافه شد
  disabled = false,
  showHighlight = false
}) {
  const router = useRouter();

  return (
    <Card
      sx={{
        marginY: 2,
        boxShadow: isHighlight ? "0 0 10px #f4c542" : "0 0 4px #ccc",
        border: isHighlight ? "2px solid #f4c542" : "1px solid #ddd",
        transition: "all 0.3s ease",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 1 }}>
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={onEdit}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {showHighlight && 
          <Tooltip title={isHighlight ? "لغو هایلایت" : "هایلایت کن"}>
            <IconButton size="small" onClick={onToggleHighlight}>
              {isHighlight ? (
                <StarIcon fontSize="small" sx={{ color: "#f4c542" }} />
              ) : (
                <StarBorderIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
          }
          <IconButton size="small" onMouseDown={onDragStart} onTouchStart={onDragStart}>
            <DragIndicatorIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <CardActionArea onClick={onClick} disabled={disabled}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            p: 2,
          }}
        >
          {image && (
            <div className="w-10 h-10 relative rounded-full overflow-hidden">
              <Image src={image} alt="Card image" fill className="object-cover" />
            </div>
          )}
          <span className="font-medium">{title}</span>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
