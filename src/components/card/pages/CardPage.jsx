import Box from '@/components/Box';
import { Card, Divider, CardActionArea } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

export default function CardPage({ id, job_title, card_title }) {
    const router = useRouter();
    return (
        <Card variant="outlined" sx={{marginY: 2}} >
            <CardActionArea onClick = {()=> {router.push(`/app/menu/${id}`)}}>
            <div className='p-5 rounded-md'>
                <h1 >
                    {card_title}
                </h1>
                <Divider />
                <p className='py-2'>
                    {job_title}
                </p>
            </div>
        </CardActionArea>
    </Card >

    )
}
