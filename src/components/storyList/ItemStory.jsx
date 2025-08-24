import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Modal,
  Box,
  Button,
  Skeleton,
} from '@mui/material';
import axiosInstance from '@/services/axiosInterceptors';
import { useAccessToken } from '../../../context/AccessTokenContext';
import { API_ROUTES } from '@/services/api';

// Swiper (استفاده از پکیج موجود)
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProfileCardWithModal = ({ data, parentId }) => {
  const [open, setOpen] = useState(false);
  const [detailData, setDetailData] = useState(null);

  const accessToken = useAccessToken();

  const handleOpen = async () => {
    setOpen(true);
    await fetchFromApi(data.id);
  };

  const handleClose = () => {
    setOpen(false);
    setDetailData(null);
  };

  const fetchFromApi = async (id) => {
    try {
      const apiUrl = API_ROUTES.ITEMS_GET(parentId, id);
      const response = await axiosInstance.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,
        },
      });
      setDetailData(response.data);
    } catch (error) {
      console.error('API fetch error:', error);
    }
  };

  const isHighlighted = data.is_highlighted;

  return (
    <>
      <Card
        onClick={handleOpen}
        sx={{
          maxWidth: 345,
          margin: '16px auto',
          borderRadius: 2,
          border: isHighlighted ? '2px solid #c6ac85' : '1px solid #ddd',
          boxShadow: isHighlighted ? '0 0 15px #c6ac85' : 3,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          backgroundColor: '#fff',
        }}
      >
        <CardMedia
          component="img"
          image={data.banner}
          alt={data.title}
          sx={{
            height: 200,
            width: '100%',
            objectFit: 'cover',
            borderRadius: '12px 12px 0 0',
            transition: '0.3s',
            '&:hover': {
              transform: 'scale(1.02)',
            },
            marginBottom: 2,
          }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            color={isHighlighted ? '#c6ac85' : '#000'}
            fontWeight={600}
          >
            {data.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.description}
          </Typography>
        </CardContent>
      </Card>

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: 450,
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 2,
            p: 3,
            outline: 'none',
          }}
        >
          {!detailData ? (
            // ⏳ Loading Skeletons
            <>
              <Skeleton variant="rectangular" height={160} sx={{ mb: 2, borderRadius: 2 }} />
              <Skeleton variant="text" height={32} sx={{ mb: 1 }} />
              <Skeleton variant="text" height={24} sx={{ mb: 2 }} />
              <Skeleton variant="rectangular" height={200} sx={{ mb: 4, borderRadius: 2 }} />
              <Skeleton variant="text" height={20} sx={{ mb: 2 }} />
              <Skeleton variant="rounded" height={36} width={150} sx={{ mx: 'auto' }} />
            </>
          ) : (
            // ✅ Actual Content
            <>
              {/* Banner Image */}
              {detailData.banner && (
                <Box sx={{ height: 160, overflow: 'hidden' }}>
                  <img
                    src={detailData.banner}
                    alt="Banner"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      border: '2px solid #c6ac85',
                      borderRadius: 8,
                    }}
                  />
                </Box>
              )}

              <Typography variant="h6" fontWeight={700} mb={1}>
                {detailData.title || data.title}
              </Typography>

              <Typography variant="body2" color="text.secondary" mb={2}>
                {detailData.description || data.description}
              </Typography>

              {/* Gallery with Swiper */}
              {detailData.gallery?.length > 0 && (
                <Box mt={2} mb={5}>
                  <Swiper spaceBetween={10} slidesPerView={1} navigation={true} pagination={{
                    type: 'progressbar',
                  }} modules={[Navigation]}
                  >
                    {detailData.gallery.map((item) => (
                      <SwiperSlide key={item.id}>
                        <img
                          src={item.pic_url}
                          alt="gallery"
                          style={{
                            width: '100%',
                            height: '200px',
                            objectFit: 'contain',
                            borderRadius: 8,
                          }}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  
                </Box>
              )}

              {/* Content */}
              {detailData.content && typeof detailData.content === 'string' && (
                <Typography variant="body1" mt={2}>
                  {detailData.content}
                </Typography>
              )}

              {/* Submit Code Button */}
              <Box mt={4} textAlign="center">
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: '#c6ac85',
                    color: '#c6ac85',

                    '&:hover': {
                      backgroundColor: '#c6ac85',
                      color: '#fff',
                    },
                  }}
                >
                  ثبت کد سفارش
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: '#c6ac85',
                    color: '#c6ac85',
                    marginRight: 2,
                    '&:hover': {
                      backgroundColor: '#c6ac85',
                      color: '#fff',
                    },
                  }}
                >
                  لینک ارجاع
                </Button>
              </Box>

            </>
          )}
        </Box>
      </Modal>
   
    </>
  );
};

export default ProfileCardWithModal;
