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
import { useTranslation } from "next-i18next";
import FormOrder from './FormOrder';
import { useCartStore } from '@/store/useCartStore';

const ProfileCardWithModal = ({ data, parentId, orderInfo, theme }) => {
  const [open, setOpen] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);

  const accessToken = useAccessToken();
  const { t } = useTranslation();

  const isHighlighted = data.is_highlighted;

  /* 🎨 theme safe values */
  const bg = theme?.cardBackground || '#fff';
  const textColor = theme?.cardText || '#000';
  const secondaryText = theme?.cardTextSecondary || '#666';
  const primary = theme?.primary || '#c6ac85';
  const hoverColor = theme?.primaryHover || '#a89060';
  const borderColor = isHighlighted ? primary : theme?.borderColor || '#ddd';

  const cardBg = isHighlighted
    ? `linear-gradient(180deg, ${bg}, ${theme?.highlightBackground || "#fff8e1"})`
    : bg;

  /* 📡 handlers */
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
      await axiosInstance.post(
        API_ROUTES.ANALYSTICS_POST_ITEMS(id),
        {},
        { headers: { Authorization: `Bearer ${accessToken.accessToken}` } }
      );

      const response = await axiosInstance.get(
        API_ROUTES.ITEMS_GET(parentId, id),
        { headers: { Authorization: `Bearer ${accessToken.accessToken}` } }
      );

      setDetailData(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFormSubmit = async (values) => { 
    try {
      await axiosInstance.post(
        API_ROUTES.RECORD_FORM_ORDER(parentId, orderInfo.id),
        values,
        { headers: { Authorization: `Bearer ${accessToken.accessToken}` } }
      );
      toast.success('سفارش با موفقیت ثبت شد!');
    } catch {
      toast.error('خطا در ثبت سفارش');
    }
  };

  return (
    <>
      {/* 🟨 CARD */}
      <Card
        onClick={handleOpen}
        sx={{
          position: 'relative',

          /* 🔥 تفاوت اندازه واقعی */
          width: isHighlighted ? 360 : 320,
          transform: isHighlighted ? 'scale(1.02)' : 'scale(0.92)',

          margin: isHighlighted ? '24px auto' : '12px auto',
          borderRadius: 3,

          border: `2px solid ${borderColor}`,
          background: cardBg,
          cursor: 'pointer',

          transition: 'all 0.35s ease',

          boxShadow: isHighlighted
            ? '0 20px 45px rgba(198,172,133,0.45)'
            : '0 6px 14px rgba(0,0,0,0.12)',

          opacity: isHighlighted ? 1 : 0.85,

          '&:hover': {
            transform: isHighlighted ? 'scale(1.06)' : 'scale(0.96)',
            boxShadow: isHighlighted
              ? '0 28px 55px rgba(198,172,133,0.6)'
              : '0 10px 22px rgba(0,0,0,0.18)',
            opacity: 1
          }
        }}
      >
        {/* ⭐ BADGE */}
        {isHighlighted && (
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              background: `linear-gradient(135deg, ${primary}, ${hoverColor})`,
              color: '#fff',
              px: 1.5,
              py: 0.5,
              borderRadius: '14px',
              fontSize: 12,
              fontWeight: 700,
              zIndex: 2
            }}
          >
            ⭐ ویژه
          </Box>
        )}

        <CardMedia
          component="img"
          image={data.banner}
          alt={data.title}
          sx={{
            height: 200,
            objectFit: 'cover',
            filter: isHighlighted ? 'brightness(1.05) saturate(1.1)' : 'none',
            transition: '0.3s'
          }}
        />

        <CardContent>
          <Typography variant="h6" fontWeight={700} color={textColor}>
            {data.title}
          </Typography>

          <Typography variant="body2" color={secondaryText}>
            {data.description}
          </Typography>
        </CardContent>
      </Card>

      {/* 🟦 MODAL */}
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
            borderRadius: 3,
            p: 3,
            outline: 'none'
          }}
        >
          {!detailData ? (
            <>
              <Skeleton variant="rectangular" height={180} sx={{ mb: 2 }} />
              <Skeleton height={30} />
              <Skeleton height={22} />
            </>
          ) : showForm ? (
            <FormOrder
              fields={orderInfo?.fields || []}
              theme={theme}
              onSubmit={(v) => {
                // handleFormSubmit(v); //* this part relates i should add shopping card
                addToCart({
                  id: detailData.id,
                  title: detailData.title,
                  price: detailData.price, // if exists
                  quantity: 1,
                  banner: detailData.banner,
                  parentId: parentId
                });

                toast.success("Added to cart 🛒");
                setShowForm(false);
              }}
            />
          ) : (
            <>
              {(detailData.banner || detailData.gallery?.length > 0) && (
                <Swiper navigation modules={[Navigation]}>
                  {detailData.banner && (
                    <SwiperSlide>
                      <img
                        src={detailData.banner}
                        style={{
                          width: '100%',
                          height: 230,
                          objectFit: 'contain',
                          borderRadius: 8
                        }}
                      />
                    </SwiperSlide>
                  )}
                  {detailData.gallery?.map((g) => (
                    <SwiperSlide key={g.id}>
                      <img
                        src={g.pic_url}
                        style={{
                          width: '100%',
                          height: 230,
                          objectFit: 'contain',
                          borderRadius: 8
                        }}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}

              <Typography variant="h6" fontWeight={700} mt={2}>
                {detailData.title}
              </Typography>

              <Typography variant="body2" mt={1}>
                {detailData.description}
              </Typography>

              <Box mt={4} textAlign="center">
                <Button
                  variant={isHighlighted ? 'contained' : 'outlined'}
                  onClick={() => setShowForm(true)}
                  sx={{
                    backgroundColor: isHighlighted ? primary : 'transparent',
                    color: isHighlighted ? '#fff' : primary,
                    borderColor: primary,
                    '&:hover': {
                      backgroundColor: hoverColor,
                      color: '#fff'
                    },
                    ml: 1
                  }}
                >
                  {t('save-order')}
                </Button>

                {detailData.ref_link && (
                  <Tooltip title="لینک ارجاع">
                    <Button
                      variant="outlined"
                      onClick={() => window.open(detailData.ref_link, '_blank')}
                      sx={{
                        borderColor: primary,
                        color: primary,
                        '&:hover': {
                          backgroundColor: hoverColor,
                          color: '#fff'
                        }
                      }}
                    >
                      <LinkIcon />
                    </Button>
                  </Tooltip>
                )}
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default ProfileCardWithModal;
