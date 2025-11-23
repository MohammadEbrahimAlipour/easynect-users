"use client";
import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { API_ROUTES } from "@/services/api";
import { useAccessToken } from "../../context/AccessTokenContext";
import axiosInstance from "@/services/axiosInterceptors";

const CustomCheckBox = ({
    catalog_id,
    category_id,
    item_id,
    label = "هایلات",
    defaultChecked = false,
}) => {
    const [checked, setChecked] = useState(defaultChecked);
    const [loading, setLoading] = useState(false);
    const accessToken = useAccessToken();

    const handleChange = async (event) => {
        const newChecked = event.target.checked;
        setChecked(newChecked);
        setLoading(true);

        try {
            const url = API_ROUTES.ITEM_UPDATE_HIGHLIGHTED(catalog_id, category_id, item_id)
            const response = await axiosInstance.get(url, {
                headers: {
                    Authorization: `Bearer ${accessToken.accessToken}`,
                }
            });
            console.log("✅ API response:", response.data);
        } catch (error) {
            console.error("❌ API error:", error);
            // revert state if request fails
            setChecked(!newChecked);
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormControlLabel
            control={
                loading ? (
                    <CircularProgress size={20} />
                ) : (
                    <Checkbox
                        checked={checked}
                        onChange={handleChange}
                        color="primary"
                    />
                )
            }
            label={label}
        />
    );
};

export default CustomCheckBox;
