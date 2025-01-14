import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardActionArea from '@mui/material/CardActionArea'
import styles from '@/styles/components/ProductCard.module.css'

export default function ProductCard({ key, name, productId }) {
    return (
        <Card className={styles.card} key={key}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={`/productImg/${productId}.jpg`}
                    alt="green iguana"
                    height={'200px'}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
