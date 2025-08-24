import React, { useState, useEffect } from 'react';
import { ChromePicker } from 'react-color'; // npm install react-color
import { useRouter } from 'next/router';
import axiosInstance from '@/services/axiosInterceptors';
import { generateApiUrl } from '@/components/ApiUr';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Layout from '@/components/Layout';

const defaultTheme = {
  background: '#ffffff',
  borderColor: '#000000',
  cardBackground: '#f5f5f5',
  cardText: '#333333',
  headerText: '#222222',
};

const ThemeEditor = () => {
  const [theme, setTheme] = useState(defaultTheme);
  const router = useRouter();
  const { id } = router.query;

  const handleColorChange = (key, color) => {
    setTheme((prev) => ({
      ...prev,
      [key]: color.hex,
    }));
  };

  const handleSave = async () => {
    alert(JSON.stringify(theme));
    // const url = generateApiUrl(`/api/v1/pages/${id}/theme/`);
    // try {
    //   const response = await axiosInstance.patch(
    //     url,
    //     { theme: JSON.stringify(theme) },
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer YOUR_ACCESS_TOKEN`, // Replace with real token or context
    //       },
    //     }
    //   );
    //   alert('تم ذخیره شد');
    //   router.push(`/app/cards/profileCard?id=${id}`);
    // } catch (error) {
    //   console.error('Error saving theme:', error);
    //   alert('خطا در ذخیره تم');
    // }
  };

  return (
    <main>
      <Header />
      <Layout className="!px-4 !pt-6">
        <h1 className="text-xl font-bold mb-4">ویرایش تم</h1>

        <div className="flex flex-col items-center justify-center gap-6">
          {Object.entries(theme).map(([key, value]) => (
            <div key={key}>
              <label className="font-medium block mb-2">{key}</label>
              <ChromePicker
                color={value}
                onChangeComplete={(color) => handleColorChange(key, color)}
              />
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <button
            className="bg-dark text-white px-6 py-2 rounded-lg"
            onClick={handleSave}
          >
            ذخیره تم
          </button>
        </div>
      </Layout>
      <Footer />
    </main>
  );
};

export default ThemeEditor;
