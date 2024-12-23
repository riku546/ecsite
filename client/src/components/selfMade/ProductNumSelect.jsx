'use client'
/* 商品の個数のselect */
import React from 'react'
import { useState } from 'react'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { FormControl } from '@mui/material'
const ProductNumSelect = ({ buyQuantity, setBuyQuantity }) => {
    //lengthで指定した数のMenuItemが作られる。
    const MenuItems = Array.from({ length: 5 }, (_, index) => (
        <MenuItem value={index + 1}>{index + 1}</MenuItem>
    ))

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
                value={buyQuantity}
                onChange={e => setBuyQuantity(e.target.value)}
                displayEmpty>
                {MenuItems}
            </Select>
        </FormControl>
    )
}

export default ProductNumSelect
