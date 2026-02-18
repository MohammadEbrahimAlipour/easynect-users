import Head from 'next/head';
import React from 'react';
import { useCartStore } from '@/store/useCartStore';
import axiosInstance from '@/services/axiosInterceptors';
import { API_ROUTES } from '@/services/api';
import { toast } from 'react-toastify';
import { useAccessToken } from '../../context/AccessTokenContext';

export default function ShopLyfter() {
  const cart = useCartStore((state) => state.cart);
  const { accessToken } = useAccessToken();

  const handleFormSubmit = async (values) => {
    try {
      // فرض کردم parentId و orderInfo.id از کارت میاد یا از جای دیگه دریافت می‌کنید
      const parentId = values.parentId || cart[0]?.parentId;
      const orderInfo = { id: values.orderInfoId || 'defaultOrderId' };

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

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('سبد خرید خالی است!');
      return;
    }

    const values = cart.map((item) => ({
      itemId: item.id,
      quantity: item.quantity,
      parentId: item.parentId,
    }));

    handleFormSubmit(values);
  };
  //TODO should change for multiple languages
  return (
    <>
      <Head>
        <title>سبد خرید</title>
      </Head>

      <div className="p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">سبد خرید شما</h1>

        {cart.length === 0 ? (
          <p className="text-gray-500">هیچ آیتمی در سبد خرید وجود ندارد.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center p-4 border rounded-lg shadow-sm"
              >
                <img
                  src={item.banner}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded mr-4"
                />
                <div className="flex-1">
                  <h2 className="font-semibold">{item.title}</h2>
                  <p>تعداد: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={handleCheckout}
          className="mt-6 w-full bg-[#D1AB48] text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          ثبت سفارش
        </button>
      </div>
    </>
  );
}
