import React, { useState } from 'react';
import { Box, Grid, Skeleton, Pagination, PaginationItem } from '@mui/material';
import ProfileCardWithModal from './ItemStory';

const ProfileListWithSkeleton = ({ theme, userList, loading, parentId, orderInfo }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 2;

  const handleChange = (event, value) => {
    setPage(value);
  };

  const paginatedUsers = userList.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Box sx={{ p: 2, backgroundColor: theme.background }}>
      <Grid container spacing={2}>
        {loading
          ? Array.from({ length: itemsPerPage }).map((_, idx) => (
              <Grid item xs={12} key={idx}>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={260}
                  sx={{ bgcolor: theme.cardBackground }}
                />
              </Grid>
            ))
          : userList.length === 0 ? (
              <p style={{ color: theme.cardText }}>آیتمی تعریف نشده است</p>
            ) : (
              paginatedUsers.map((user) => (
                <Grid item xs={12} key={user.id}>
                  <ProfileCardWithModal
                    data={user}
                    parentId={parentId}
                    theme={theme}
                    orderInfo={orderInfo}
                  />
                </Grid>
              ))
            )}
      </Grid>

      {!loading && userList.length > itemsPerPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={Math.ceil(userList.length / itemsPerPage)}
            page={page}
            onChange={handleChange}
            renderItem={(item) => (
              <PaginationItem
                {...item}
                sx={{
                  color: theme.headerText,
                  '&.Mui-selected': {
                    backgroundColor: theme.borderColor,
                    color: theme.background,
                  },
                  '&.Mui-selected:hover': {
                    backgroundColor: theme.headerText,
                    color: theme.background,
                  },
                  '&:hover': {
                    backgroundColor: theme.borderColor,
                    color: theme.background,
                  },
                }}
                // اعداد فارسی
                page={item.page ? item.page.toLocaleString('fa-IR') : null}
              />
            )}
          />
        </Box>
      )}
    </Box>
  );
};

export default ProfileListWithSkeleton;
