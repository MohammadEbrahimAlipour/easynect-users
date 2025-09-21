import React, { useEffect, useState } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { useAccessToken } from '../../../context/AccessTokenContext';
import axiosInstance from '@/services/axiosInterceptors';
import ProfileListWithSkeleton from './ProfileListWithSkeleton';
import { useRouter } from 'next/router';

const StoryItem = ({ item, selected, onClick, theme, }) => (
  <Box
    onClick={() => onClick(item.id)}
    sx={{
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      mx: 1,
      scrollSnapAlign: 'start',
    }}
  >
    <Box
      sx={{
        border: `3px solid ${selected ? theme.borderColor : '#ddd'}`,
        borderRadius: '50%',
        padding: '3px',
      }}
    >
      <Avatar
        src={item.icon}
        alt={item.title}
        sx={{
          width: 60,
          height: 60,
          border: `2px solid ${theme.background}`,
        }}
      />
    </Box>
    <Typography
      variant="caption"
      sx={{
        mt: 1,
        color: theme.cardText,
        maxWidth: 70,
        textAlign: 'center',
        fontSize: 12,
      }}
    >
      {item.title}
    </Typography>
  </Box>
);

const StoryList = ({ theme, storyData = [], Api, parentId, orderInfo }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const accessToken = useAccessToken();
  const router = useRouter();

  const fetchFromApi = (id) => {
    if (!id) return;
    const apiUrl = Api(parentId, id);
    setLoading(true);
    axiosInstance
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,
        },
      })
      .then((response) => {
        setItems(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setItems([]);
      });
  };

  const handleClick = (id) => {
    setSelectedId(id);
    fetchFromApi(id);
  };

  useEffect(() => {
    if (storyData.length > 0) {
      handleClick(storyData[0].id);
    }
  }, [storyData]);

  return (
    <Box sx={{ bgcolor: theme.background }}>
      {/* Horizontally scrollable story list */}
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          py: 2,
          px: 1,
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          scrollSnapType: 'x mandatory',
          gap: 2,
        }}
      >
        {storyData.map((item) => (
          <StoryItem
            key={item.id}
            item={item}
            selected={item.id === selectedId}
            onClick={handleClick}
            theme={theme}
          />
        ))}
      </Box>

      {/* Vertically stacked items below */}
      <Box sx={{ px: 2, pt: 1 }}>
        <ProfileListWithSkeleton
          theme={theme}
          userList={items}
          loading={loading}
          parentId={parentId}
          orderInfo={orderInfo?.invoice_form}
        />
      </Box>
    </Box>
  );
};

export default StoryList;
