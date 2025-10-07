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
  Tooltip
} from '@mui/material';
import axiosInstance from '@/services/axiosInterceptors';
import { useAccessToken } from '../../../context/AccessTokenContext';
import { API_ROUTES } from '@/services/api';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import LinkIcon from '@mui/icons-material/Link';
import { toast } from "react-toastify";

// فرم سفارش
import FormOrder from './FormOrder';

const ProfileCardWithModal = ({ data, parentId, orderInfo, theme }) => {
  const [open, setOpen] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const accessToken = useAccessToken();

  const handleOpen = async () => {
    setOpen(true);
    await fetchFromApi(data.id);
  };

  const handleClose = () => {
    setOpen(false);
    setDetailData(null);
    setShowForm(false);
  };

  const fetchFromApi = async (id) => {
    try {
      const postItem = API_ROUTES.ANALYSTICS_POST_ITEMS(id);
      await axiosInstance.post(postItem, {}, {
        headers: { Authorization: `Bearer ${accessToken.accessToken}` },
      });

      const apiUrl = API_ROUTES.ITEMS_GET(parentId, id);
      const response = await axiosInstance.get(apiUrl, {
        headers: { Authorization: `Bearer ${accessToken.accessToken}` },
      });
      setDetailData(response.data);
    } catch (error) {
      console.error('API fetch error:', error);
    }
  };

  const handleFormSubmit = async (values) => {
    console.log('Form submitted:', values);
    const apiUrl = API_ROUTES.RECORD_FORM_ORDER(parentId, orderInfo.id);
    try {
      const response = await axiosInstance.post(apiUrl, values, {
        headers: { Authorization: `Bearer ${accessToken.accessToken}` },
      });
      console.log(response, 'response form submission')
      toast.success('سفارش با موفقیت ثبت شد!');

    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('خطا در ثبت سفارش. لطفا دوباره تلاش کنید.');
      return;
    }
  };


  const isHighlighted = data.is_highlighted;
  const bg = theme?.cardBackground || '#fff';
  const borderColor = isHighlighted ? theme?.primary || '#c6ac85' : theme?.borderColor || '#ddd';
  const textColor = theme?.cardText || '#000';
  const hoverColor = theme?.primaryHover || '#a89060';

  return (
    <>
      <Card
        onClick={handleOpen}
        sx={{
          maxWidth: 345,
          margin: '16px auto',
          borderRadius: 2,
          border: `2px solid ${borderColor}`,
          boxShadow: isHighlighted ? `0 0 15px ${borderColor}` : 3,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          backgroundColor: bg,
          color: textColor,
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
            '&:hover': { transform: 'scale(1.02)' },
            marginBottom: 2,
          }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            color={textColor}
            fontWeight={600}
          >
            {data.title}
          </Typography>
          <Typography variant="body2" color={theme?.cardTextSecondary || 'text.secondary'}>
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
            bgcolor: theme?.background || '#fff',
            boxShadow: 24,
            borderRadius: 2,
            p: 3,
            outline: 'none',
          }}
        >
          {!detailData ? (
            <>
              <Skeleton variant="rectangular" height={160} sx={{ mb: 2, borderRadius: 2, bgcolor: theme?.cardBackground || '#eee', animation: 'pulse 1.5s infinite' }} />
              <Skeleton variant="text" height={32} sx={{ mb: 1, bgcolor: theme?.cardBackground || '#eee', animation: 'pulse 1.5s infinite' }} />
              <Skeleton variant="text" height={24} sx={{ mb: 2, bgcolor: theme?.cardBackground || '#eee', animation: 'pulse 1.5s infinite' }} />
              <Skeleton variant="rectangular" height={200} sx={{ mb: 4, borderRadius: 2, bgcolor: theme?.cardBackground || '#eee', animation: 'pulse 1.5s infinite' }} />
              <Skeleton variant="text" height={20} sx={{ mb: 2, bgcolor: theme?.cardBackground || '#eee', animation: 'pulse 1.5s infinite' }} />
              <Skeleton variant="rounded" height={36} width={150} sx={{ mx: 'auto', bgcolor: theme?.cardBackground || '#eee', animation: 'pulse 1.5s infinite' }} />
            </>
          ) : (
            <>
              {showForm ? (
                <FormOrder
                  fields={orderInfo?.fields || []}
                  theme={theme}
                  onSubmit={async (values) => {
                    console.log('Form submitted:', values);
                    handleFormSubmit(values);
                    setShowForm(false);
                  }}
                />
              ) : (
                <>
                  {detailData.banner && (
                    <Box sx={{ height: 160, overflow: 'hidden' }}>
                      <img
                        src={detailData.banner}
                        alt="Banner"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          border: `2px solid ${borderColor}`,
                          borderRadius: 8,
                        }}
                      />
                    </Box>
                  )}

                  <Typography variant="h6" fontWeight={700} mb={1} color={textColor}>
                    {detailData.title || data.title}
                  </Typography>

                  <Typography variant="body2" color={theme?.cardText || 'text.secondary'} mb={2}>
                    {detailData.description || data.description}
                  </Typography>

                  {detailData.gallery?.length > 0 && (
                    <Box mt={2} mb={5}>
                      <Swiper
                        spaceBetween={10}
                        slidesPerView={1}
                        navigation
                        pagination={{ type: 'progressbar' }}
                        modules={[Navigation]}
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
                                border: `1px solid ${theme?.borderColor || '#ddd'}`,
                              }}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </Box>
                  )}

                  {detailData.content && typeof detailData.content === 'string' && (
                    <Typography variant="body1" mt={2} color={textColor}>
                      {detailData.content}
                    </Typography>
                  )}

                  <Box mt={4} textAlign="center">
                    <Button
                      variant="outlined"
                      onClick={() => setShowForm(true)}
                      sx={{
                        borderColor: borderColor,
                        color: borderColor,
                        '&:hover': {
                          backgroundColor: hoverColor,
                          color: '#fff',
                        },
                        ml: 2,
                      }}
                    >
                      ثبت کد سفارش
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => window.open(detailData.ref_link, '_blank')}
                      sx={{
                        borderColor: borderColor,
                        color: borderColor,
                        '&:hover': {
                          backgroundColor: hoverColor,
                          color: '#fff',
                        },
                      }}
                    >
                      <Tooltip title="لینک ارجاع" arrow>
                        <LinkIcon />
                      </Tooltip>
                    </Button>
                  </Box>
                </>
              )}
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default ProfileCardWithModal;
