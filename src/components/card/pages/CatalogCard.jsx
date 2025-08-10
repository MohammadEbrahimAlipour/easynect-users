import { Card, CardActionArea, IconButton, Tooltip } from '@mui/material'
import { useRouter } from 'next/router';
import React from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function CatalogCard({ handleClick, id, card_title, invoice_form_id }) {

    const router = useRouter();

    const handleCreateOrder = (e) => {
        e.stopPropagation(); 
        router.push(`/app/lead/order?id=${id}&form_id=${invoice_form_id}`);
    };

    return (
        <Card variant="outlined" id={id} elevation={2}
            sx={{
                borderRadius: 3,
                transition: '0.3s',
                '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-2px)',
                },
            }}>
            <CardActionArea onClick={handleClick}>
                <div className='p-5 rounded-md text-center flex justify-between items-center'>
                    <h1 >
                        {card_title}
                    </h1>
                    <Tooltip title="فرم سفارش" arrow>
                            <IconButton
                                aria-label="ساخت فرم سفارش"
                                onClick={handleCreateOrder}
                                size="small"
                                sx={{ color: '#CEA16A', zIndex: 10 }}
                            >
                                <AddCircleIcon />
                            </IconButton>
                        </Tooltip>
                </div>
            </CardActionArea>
        </Card >

    )
}