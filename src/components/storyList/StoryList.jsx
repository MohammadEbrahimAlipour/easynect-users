import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { useAccessToken } from '../../../context/AccessTokenContext';
import axiosInstance from '@/services/axiosInterceptors';
import ProfileListWithSkeleton from './ProfileListWithSkeleton';
import { useRouter } from 'next/router';

const StoryItem = ({ item, selected, onClick, theme, index }) => (
  <Box
    onClick={() => onClick(item.id, index)}
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
        border: `3px solid ${selected ? theme?.borderColor || '#D1AB48' : '#ddd'}`,
        borderRadius: '50%',
        padding: '3px',
        transition: 'all 0.3s ease',
      }}
    >
      <Avatar
        src={item.icon}
        alt={item.title}
        sx={{
          width: 60,
          height: 60,
          border: `2px solid ${theme?.background || '#fff'}`,
          backgroundColor: theme?.cardBackground || '#f5f5f5',
        }}
      />
    </Box>
    <Typography
      variant="caption"
      sx={{
        mt: 1,
        color: theme?.cardText || '#333',
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
  const [ind, setInd] = useState(0);
  const accessToken = useAccessToken();
  const router = useRouter();

  const fetchFromApi = async (id) => {
    if (!id) return;
    const apiUrl = Api(parentId, id);
    try {
      setLoading(true);
      const response = await axiosInstance.get(apiUrl, {
        headers: { Authorization: `Bearer ${accessToken.accessToken}` },
      });
      setItems(response.data);
    } catch (error) {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (id, index = 0) => {
    setInd(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedId(id);
    fetchFromApi(id);

    // وقتی آیتم جدید انتخاب شد، صفحه بره بالا
  };

  const handleNavigateNext = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const nextIndex = ind + 1;
    if (nextIndex < storyData.length) {
      console.log(nextIndex, 'nextIndex');
      handleClick(storyData[nextIndex].id, nextIndex);
    }
  };

  useEffect(() => {
    if (storyData.length > 0) {
      handleClick(storyData[0].id, 0);
    }
  }, [storyData]);

  return (
    <Box sx={{ bgcolor: theme?.background || '#fff', py: 2 }}>
      {/* لیست افقی استوری‌ها */}
      <Box
        sx={{
          display: 'flex',
          position: 'sticky',
          top: 0,
          zIndex: 999,
          background: theme?.background || '#fff',
          overflowX: 'auto',
          borderRadius: 8,
          py: 1,
          px: 1,
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          scrollSnapType: 'x mandatory',
          gap: 2,
        }}
      >
        {storyData.map((item, index) => (
          <StoryItem
            key={item.id}
            item={item}
            selected={item.id === selectedId}
            onClick={handleClick}
            theme={theme}
            index={index}
          />
        ))}
      </Box>

      {/* محتوای عمودی زیر استوری */}
      <Box sx={{ px: 2, pt: 1 }}>
        <ProfileListWithSkeleton
          theme={theme}
          userList={items}
          loading={loading}
          parentId={parentId}
          orderInfo={orderInfo?.invoice_form}
          onScrollEnd={handleNavigateNext}
        />
      </Box>
    </Box>
  );
};

export default StoryList;
