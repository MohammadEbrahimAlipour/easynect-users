import React from "react";
import { Card, CardContent, Typography, Box, Divider } from "@mui/material";

const FaqUser = ({ data, theme }) => {
    return (
        <Box
            sx={{
                backgroundColor: theme.background,
                p: 4,
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    color: theme.headerText,
                    textAlign: "center",
                    mb: 4,
                    fontWeight: "bold",
                    fontSize: 16
                }}
            >
                سوالات متداول کاربران
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gap: 3,
                    gridTemplateColumns: {
                        xs: "1fr",
                        // sm: "1fr 1fr",
                        // md: "1fr 1fr 1fr",
                    },
                }}
            >
                {data?.map((item) => (
                    <Card
                        key={item.id}
                        sx={{
                            backgroundColor: theme.cardBackground,
                            border: `2px solid ${theme.borderColor}`,
                            borderRadius: 3,
                            transition: "all 0.3s ease",
                            width: '100%',
                            "&:hover": {
                                transform: "translateY(-4px)",
                                boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                            },
                        }}
                    >
                        <CardContent>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: theme.cardText,
                                    fontWeight: "bold",
                                    mb: 1,
                                }}
                            >
                                {item.title}
                            </Typography>

                            <Divider sx={{ mb: 1, borderColor: theme.borderColor }} />

                            <Typography
                                variant="body2"
                                sx={{
                                    color: theme.cardText,
                                    opacity: 0.9,
                                }}
                            >
                                {item.description}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default FaqUser;
