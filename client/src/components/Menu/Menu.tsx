import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import React from 'react';

export const Menu = () => {
    return (
        <AppBar position='static'>
            <Toolbar variant='dense'>
                <IconButton
                    edge='start'
                    color='inherit'
                    aria-label='menu'
                    sx={{ mr: 2 }}
                >
                    <PersonSearchIcon />
                </IconButton>
                <Typography
                    variant='h6'
                    color='inherit'
                    component='div'
                >
                    "Data search resource"
                </Typography>
            </Toolbar>
        </AppBar>
    );
};
