import React from 'react';
import { Box, Grid, Skeleton } from '@mui/material';
import ProfileCardWithModal from './ItemStory';

const ProfileListWithSkeleton = ({ userList, loading, parentId }) => {
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        {loading
          ? Array.from({ length: 4 }).map((_, idx) => (
              <Grid item xs={12} sm={12} md={12} lg={12} key={idx}>
                <Skeleton variant="rectangular" width="100%" height={260} />
              </Grid>
            ))
          : userList.length == 0 ? 
            <p> آیتمی تعریف نشده است </p>
          : userList.map((user) => (
              <Grid item xs={12} sm={12} md={12} lg={12} key={user.id}>
                <ProfileCardWithModal data={user} parentId={parentId}/>
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};

export default ProfileListWithSkeleton;
