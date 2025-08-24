import React from 'react';
import { Box, ButtonBase } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ArticleIcon from '@mui/icons-material/Article';

const SwitchModeButton = ({ mode, setMode }) => {
  const options = [
    { value: 'store', label: 'فروشگاه', icon: <StorefrontIcon fontSize="small" /> },
    { value: 'menu', label: 'صفحه', icon: <ArticleIcon fontSize="small" /> },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: '#f0f0f0',
        borderRadius: '999px',
        p: '4px',
        width: 'fit-content',
        gap: '4px',
        margin: '10px auto',
      }}
    >
      {options.map((opt) => {
        const isActive = mode === opt.value;
        return (
          <ButtonBase
            key={opt.value}
            onClick={() => setMode(opt.value)}
            sx={{
              borderRadius: '999px',
              px: 3,
              py: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              fontWeight: isActive ? 'bold' : 'normal',
              color: isActive ? '#fff' : '#444',
              backgroundColor: isActive ? '#D1AB48' : 'transparent',
              transform: isActive ? 'scale(1.05)' : 'scale(1)',
              transition: 'all 0.3s ease',
              boxShadow: isActive ? '0 2px 6px rgba(0,0,0,0.15)' : 'none',
              '&:hover': {
                backgroundColor: isActive ? '#C0993D' : '#e0e0e0',
              },
            }}
          >
            {opt.icon}
            {opt.label}
          </ButtonBase>
        );
      })}
    </Box>
  );
};

export default SwitchModeButton;
