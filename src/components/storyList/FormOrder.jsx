import React, { useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";

const FormOrder = ({ fields = [], orders = [], theme, onSubmit }) => {
  const [formValues, setFormValues] = useState({});
  const [note, setNote] = useState("");

  const handleChange = (id, value) => {
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedFields = fields.map((field) => ({
      title: field.title,
      value: formValues[field.id] || "",
      field_type: field.type,
      field_id: field.id,
    }));

    const payload = {
      note,
      orders: orders.map((order) => ({
        item_id: order.item_id,
        count: order.count,
      })),
      fields: formattedFields,
    };

    if (onSubmit) {
      onSubmit(payload);
    }
  };

  const borderColor = theme?.borderColor || "#ddd";
  const textColor = theme?.cardText || "#000";
  const hoverColor = theme?.primaryHover || "#a89060";

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        bgcolor: theme?.background,
        p: 3,
        borderRadius: 2,
        maxWidth: 600,
        mx: "auto",
      }}
    >
      {/* فیلدهای داینامیک */}
      {fields
        .sort((a, b) => (a.order || 0) - (b.order || 0))
        .map((field) => (
          <Box
            key={field.id}
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              gap: 1.5,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="subtitle2"
                sx={{ color: textColor, mb: 0.5 }}
              >
                {field.title}
                {field.is_required && (
                  <span style={{ color: "red", marginLeft: 4 }}>*</span>
                )}
              </Typography>
              <TextField
                fullWidth
                required={field.is_required}
                placeholder={field.placeholder}
                value={formValues[field.id] || ""}
                onChange={(e) => handleChange(field.id, e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: borderColor },
                    "&:hover fieldset": { borderColor: theme?.primary },
                  },
                }}
              />
            </Box>
          </Box>
        ))}

      {/* یادداشت (note) */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="subtitle2"
          sx={{ color: textColor, mb: 0.5 }}
        >
          یادداشت
        </Typography>
        <TextField
          multiline
          rows={3}
          fullWidth
          placeholder="یادداشت خود را وارد کنید..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: borderColor },
              "&:hover fieldset": { borderColor: theme?.primary },
            },
          }}
        />
      </Box>

      {/* دکمه ارسال */}
      <Button
        type="submit"
        variant="contained"
        sx={{
          background: theme?.background,
          border: `2px solid ${borderColor}`,
          color: borderColor,
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: hoverColor,
            color: "#fff",
          },
        }}
      >
        ثبت فرم
      </Button>
    </Box>
  );
};

export default FormOrder;
