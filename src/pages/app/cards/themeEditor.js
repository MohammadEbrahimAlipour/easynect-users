import React, { useEffect, useState } from 'react';
import { ChromePicker } from 'react-color';
import { useRouter } from 'next/router';
import axiosInstance from '@/services/axiosInterceptors';
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

// تم‌های آماده
const presetThemes = {
  Light: {
    background: '#ffffff',
    borderColor: '#dddddd',
    cardBackground: '#f5f5f5',
    cardText: '#333333',
    headerText: '#222222',
  },
  Dark: {
    background: '#1e1e1e',
    borderColor: '#444444',
    cardBackground: '#2a2a2a',
    cardText: '#f5f5f5',
    headerText: '#ffffff',
  },
  Gold: {
    background: '#fdf6e3',
    borderColor: '#d1ab48',
    cardBackground: '#fff8e1',
    cardText: '#333333',
    headerText: '#b58900',
  },
  Blue: {
    background: '#e6f0ff',
    borderColor: '#4a90e2',
    cardBackground: '#ffffff',
    cardText: '#1a1a1a',
    headerText: '#0d47a1',
  },
};

const FaKeys = {
  background: 'پس‌زمینه',
  borderColor: 'رنگ حاشیه',
  cardBackground: 'زمینه کارت',
  cardText: 'رنگ متن کارت',
  headerText: 'رنگ متن هدر',
};

const ThemeEditor = () => {
  const [theme, setTheme] = useState(defaultTheme);
  const [selectedPreset, setSelectedPreset] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const accessToken = useAccessToken();

  const handleColorChange = (key, color) => {
    setTheme((prev) => ({
      ...prev,
      [key]: color.hex,
    }));
    setSelectedPreset(null); // ویرایش دستی، حالت تم آماده رو لغو کنه
  };

  const handleSelectPreset = (presetName) => {
    if (presetThemes[presetName]) {
      setTheme(presetThemes[presetName]);
      setSelectedPreset(presetName);
    }
  };

  const handleSave = async () => {
    try {
      const apiUrl = API_ROUTES.CREATE_THEME(id);
      await axiosInstance.post(
        apiUrl,
        { theme },
        {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
          },
        }
      );
      toast.success('تم با موفقیت ذخیره شد!');
      router.back();
    } catch (error) {
      console.error('Error saving theme:', error);
      toast.error('خطا در ذخیره تم. لطفا دوباره تلاش کنید.');
    }
  };
  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const api = API_ROUTES.GET_THEME(id);
        const response = await axiosInstance.get(api, {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
          },
        });
        setTheme(response?.data?.theme);
        console.log(response, 'response');
      } catch (error) {
        console.error(error);
      }
    };

    fetchTheme();
  }, []);
  return (
    <main>
      <Header />

      {/* بخش بالا fixed */}
      <div className='flex justify-between items-center px-2'>
        <h1 className="text-xl font-bold">ویرایش تم</h1>
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

      {/* فاصله برای fixed header */}
      <Layout className="!px-4 ">

        {/* انتخاب تم آماده */}
        <div className="mb-6 flex gap-3 flex-wrap">
          {Object.keys(presetThemes).map((preset) => (
            <button
              key={preset}
              className={`px-4 py-2 rounded-lg border ${selectedPreset === preset
                  ? 'bg-dark text-white border-dark'
                  : 'bg-white text-gray-700 border-gray-300'
                }`}
              onClick={() => handleSelectPreset(preset)}
            >
              {preset}
            </button>
          ))}
        </div>

        {/* پیش‌نمایش زنده */}
        <div
          className="w-full p-6 rounded-lg mb-6"
          style={{
            backgroundColor: theme.background,
            border: `2px solid ${theme.borderColor}`,
            color: theme.cardText,
          }}
        >
          <h2 style={{ color: theme.headerText, marginBottom: 12 }}>پیش‌نمایش کارت</h2>
          <div
            style={{
              backgroundColor: theme.cardBackground,
              border: `1px solid ${theme.borderColor}`,
              borderRadius: 12,
              padding: 16,
            }}
          >
            <p style={{ color: theme.cardText }}>
              این یک متن نمونه است تا ببینید رنگ‌ها چگونه روی کارت اعمال می‌شوند.
            </p>
          </div>
        </div>

        {/* ویرایش تک رنگ‌ها */}
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
