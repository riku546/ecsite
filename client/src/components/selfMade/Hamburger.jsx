'use client'

import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { ListItemText } from '@mui/material'

export default function Hamburger() {
    const [open, setOpen] = useState(false)

    const toggleDrawer = newOpen => () => {
        setOpen(newOpen)
    }

    const DrawerList = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}>
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map(text => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    )

    return (
        <div>
            <Button onClick={toggleDrawer(true)}>
                <MenuIcon sx={{ fontSize: 40 }} />
            </Button>
            <Drawer anchor={'right'} open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    )
}
