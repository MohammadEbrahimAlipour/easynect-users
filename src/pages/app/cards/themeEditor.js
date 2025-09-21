import React, { useState, useEffect } from 'react';
import { ChromePicker } from 'react-color'; // npm install react-color
import { useRouter } from 'next/router';
import axiosInstance from '@/services/axiosInterceptors';
import { generateApiUrl } from '@/components/ApiUr';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Layout from '@/components/Layout';
import { API_ROUTES } from '@/services/api';
import { useAccessToken } from '../../../../context/AccessTokenContext';
import { toast } from "react-toastify";


const defaultTheme = {
  background: '#ffffff',
  borderColor: '#000000',
  cardBackground: '#f5f5f5',
  cardText: '#333333',
  headerText: '#222222',
};

const FaKeys = {
  background: ' پس‌زمینه',
  borderColor: 'رنگ حاشیه',
  cardBackground: 'زمینه کارت',
  cardText: 'رنگ متن کارت',
  headerText: 'رنگ متن هدر',
}


const ThemeEditor = () => {
  const [theme, setTheme] = useState(defaultTheme);
  const router = useRouter();
  const { id } = router.query;
  const accessToken = useAccessToken();

  const handleColorChange = (key, color) => {
    setTheme((prev) => ({
      ...prev,
      [key]: color.hex,
    }));
  };

  const handleSave = async () => {
    try {
      const apiUrl = API_ROUTES.CREATE_THEME(id);
      await axiosInstance.post(
        apiUrl,
        { "theme": theme },
        {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
          },
        }
      );

      toast.success('تم با موفقیت ذخیره شد!');
      router.back();

    }
    catch (error) {
      console.error('Error saving theme:', error);
      toast.error('خطا در ذخیره تم. لطفا دوباره تلاش کنید.');
    }
  };

  return (
    <main>
      <Header />
      <Layout className="!px-4 !pt-6">
        <div className='flex justify-between items-center mb-6'>
          <h1 className="text-xl font-bold mb-4">ویرایش تم</h1>
          <div className='flex gap-2 items-center'>
            <button
              className="text-gray-700 px-6 py-2 rounded-lg"
              onClick={() => router.back()}
            >
              انصراف
            </button>
            <button
              className="bg-dark text-white px-6 py-2 rounded-lg"
              onClick={handleSave}
            >
              ذخیره تم
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-6">
          {Object.entries(theme).map(([key, value]) => (
            <div key={key}>
              <label className="font-medium block mb-2">{FaKeys[key]}</label>
              <ChromePicker
                color={value}
                onChangeComplete={(color) => handleColorChange(key, color)}
              />
            </div>
          ))}
        </div>


      </Layout>
      <Footer />
    </main>
  );
};

export default ThemeEditor;
