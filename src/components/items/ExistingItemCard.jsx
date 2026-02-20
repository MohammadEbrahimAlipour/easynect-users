import React from "react";
import { Box, Typography, Checkbox } from "@mui/material";

export default function ExistingItemCard({ item, selected, onToggle }) {
  return (
    <Box
      onClick={() => onToggle(item.id)}
      sx={{
        display: "flex",
        gap: 2,
        p: 2,
        borderRadius: 2,
        border: selected ? "2px solid #1976d2" : "1px solid #ddd",
        cursor: "pointer",
        transition: "0.2s",
        "&:hover": { backgroundColor: "#f5f5f5" },
      }}
    >
      <img
        src={item.banner}
        alt={item.title}
        style={{
          width: 80,
          height: 80,
          objectFit: "cover",
          borderRadius: 8,
        }}
      />

      <Box flex={1}>
        <Typography fontWeight={600}>{item.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
      </Box>

      <Checkbox checked={selected} />
    </Box>
  );
}
