import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DndContextProvider from '../dnd/DndContext';
import DraggableCategoryCard from '../dnd/DraggableCategoryCard';
import { useModalStore } from '@/store/modalStore';
import { useAccessToken } from '../../../context/AccessTokenContext';
import axiosInstance from '@/services/axiosInterceptors';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';

export default function TabsCards({ columnConfig, items, moveCard, setItems, handleAddModal, value, setValue }) {
  const accessToken = useAccessToken();
  const router = useRouter();

  const openModal = useModalStore((s) => s.openModal);
  const handleDataInfo = (id, API) => {
    const apiUrl = API(id);
    axiosInstance
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,
          "accept-language": "fa", // Include the access token in the headers
          suppress404Toast: true,
        },
      })
      .then((response) => {
        console.log(response.data, 'response lalalay lalay lay')
        setItems(response.data)
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const handleChange = (event, newValue) => {
    const data = columnConfig.find((item) => item.value === newValue);
    handleDataInfo(data.id, data.API)
    setValue(newValue);
  };
  console.log(items, 'items')
  return (
    <Box>
      <TabContext value={value} >
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" >
            {columnConfig.map((value, key) =>
            (
              <Tab label={value.label} key={key} value={value.value} />
            ))}
          </TabList>
        </Box>
        <DndContextProvider>
          {items.map((item, index) => (
            <DraggableCategoryCard
              onClick={() => router.push(`/app/menu/${columnConfig[0].id}/${item.id}`)}
              key={item.id}
              item={item}
              index={index}
              moveCard={moveCard}
              onEdit={(id) => openModal('edit', { category_id: item.id })}
              onClose={(id) => openModal('delete', { category_id: item.id })}
            />
          ))}
        </DndContextProvider>
        <IconButton color="primary" onClick={handleAddModal} aria-label="add" sx={{ width: '100%', background: 'white', borderRadius: 5 }}>
          <AddIcon />
        </IconButton>
      </TabContext>
    </Box>
  );
}
