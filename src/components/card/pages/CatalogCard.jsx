import { Card, CardActionArea } from '@mui/material'
import React from 'react'

export default function CatalogCard({handleClick, id , card_title}) {
    return (
        <Card variant="outlined" id={id}>
            <CardActionArea onClick={handleClick}>
                <div className='p-5 rounded-md text-center'>
                    <h1 >
                        {card_title}
                    </h1>
                </div>
            </CardActionArea>
        </Card >

    )
}