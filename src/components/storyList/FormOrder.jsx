import React, { useState } from "react";
import { Avatar, Box, TextField, Typography, Button } from "@mui/material";

const FormOrder = ({ fields, onSubmit, theme }) => {
  const [formValues, setFormValues] = useState({});

  const handleChange = (id, value) => {
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formValues);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        bgcolor: theme.background,
        p: 2,
        borderRadius: 2,
      }}
    >
      {fields
        .sort((a, b) => a.order - b.order)
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
                sx={{ color: theme.cardText, mb: 0.5 }}
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
                    "& fieldset": {
                      borderColor: theme.borderColor,
                    },
                    "&:hover fieldset": {
                      borderColor: theme.primary,
                    },
                  },
                }}
              />
            </Box>
          </Box>
        ))}

      <Button
        type="submit"
        variant="contained"
        sx={{
          mt: 2,
          bgcolor: theme.primary,
          "&:hover": { bgcolor: theme.primaryHover },
        }}
      >
        ثبت فرم
      </Button>
    </Box>
  );
};

export default FormOrder;
