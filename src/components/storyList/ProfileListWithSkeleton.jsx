import React, { useEffect, useRef } from 'react';
import { Box, Grid, Skeleton, Typography } from '@mui/material';
import ProfileCardWithModal from './ItemStory';

const ProfileListWithSkeleton = ({ theme, userList, loading, parentId, orderInfo, onScrollEnd }) => {
  const itemsPerPage = 2;
 const hasTriggeredRef = useRef(false); // ✅ Add this

  useEffect(() => {
    // ✅ Reset trigger when new content loads
    hasTriggeredRef.current = false;
  }, [userList]);
 
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.scrollHeight;

      // ✅ Check if NOT already triggered
      if (scrollTop + windowHeight >= fullHeight - 100 && !hasTriggeredRef.current) {
        hasTriggeredRef.current = true; // ✅ Mark as triggered
        onScrollEnd?.();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onScrollEnd]);

  return (
    <Box sx={{ p: 2, backgroundColor: theme?.background || '#fff' }}>
      <Grid container spacing={2}>
        {loading
          ? Array.from({ length: itemsPerPage }).map((_, idx) => (
              <Grid item xs={12} key={idx}>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={260}
                  sx={{ bgcolor: theme?.cardBackground || '#f5f5f5' }}
                />
              </Grid>
            ))
          : userList.length === 0
          ? (
            <Typography color={theme?.cardText || '#333'}>
              آیتمی تعریف نشده است
            </Typography>
          )
          : userList.map((user) => (
              <Grid item xs={12} key={user.id}>
                <ProfileCardWithModal
                  data={user}
                  parentId={parentId}
                  orderInfo={orderInfo}
                  theme={theme}
                />
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};

export default ProfileListWithSkeleton;
