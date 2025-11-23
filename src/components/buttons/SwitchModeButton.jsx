import React from 'react';
import { Box, ButtonBase } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ArticleIcon from '@mui/icons-material/Article';

const SwitchModeButton = ({ mode, setMode, theme, lan }) => {
  const options = [
    { value: 'store', label: lan('shop'), icon: <StorefrontIcon fontSize="small" /> },
    { value: 'menu', label: lan('page'), icon: <ArticleIcon fontSize="small" /> },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: theme?.cardBackground || '#f0f0f0',
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
              color: isActive ? theme?.background || '#fff' : theme?.cardText || '#444',
              backgroundColor: isActive ? theme?.headerText || '#D1AB48' : 'transparent',
              transform: isActive ? 'scale(1.05)' : 'scale(1)',
              transition: 'all 0.3s ease',
              boxShadow: isActive ? '0 2px 6px rgba(0,0,0,0.15)' : 'none',
              '&:hover': {
                backgroundColor: isActive
                  ? theme?.borderColor || '#C0993D'
                  : theme?.cardBackground || '#e0e0e0',
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
