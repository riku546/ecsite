import * as React from 'react'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'

export default function ReadStars() {
    return (
        <Box sx={{ '& > legend': { mt: 2 } }}>
            <Typography component="legend">10個の評価</Typography>
            <Rating name="read-only" value={3} readOnly />
        </Box>
    )
}
