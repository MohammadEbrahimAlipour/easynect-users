import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Collapse,
  IconButton,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

const FaqUser = ({ data, theme }) => {
  const [expandedId, setExpandedId] = useState(null);

  const handleToggle = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Box sx={{ backgroundColor: theme.background, p: 4 }}>
      <Typography
        variant="h4"
        sx={{
          color: theme.headerText,
          textAlign: "center",
          mb: 4,
          fontWeight: "bold",
          fontSize: 16,
        }}
      >
        سوالات متداول کاربران
      </Typography>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr" } }}>
        {data?.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <Card
              key={item.id}
              sx={{
                backgroundColor: theme.cardBackground,
                border: `2px solid ${theme.borderColor}`,
                borderRadius: 3,
                transition: "all 0.3s ease",
                width: "100%",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                },
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  p: 2,
                }}
                onClick={() => handleToggle(item.id)}
              >
                <IconButton
                  sx={{
                    transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s",
                  }}
                  size="small"
                >
                  <ExpandMore />
                </IconButton>
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.cardText,
                    fontWeight: "bold",
                    ml: 1,
                  }}
                >
                  {item.title}
                </Typography>
              </CardContent>

              <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <Divider sx={{ borderColor: theme.borderColor }} />
                <CardContent sx={{ pt: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.cardText, opacity: 0.9 }}
                  >
                    {item.description}
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default FaqUser;
