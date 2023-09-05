import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { v4 as uuidv4 } from 'uuid';

export interface UserData {
    email: string;
    number: string;
}


interface TableDataUserProps {
    userData: UserData[];
}

export const TableDataUser: React.FC<TableDataUserProps> = ({ userData }) => {
    return (
        <TableContainer component={Paper}>
            <Table
                sx={{ minWidth: 650 }}
                aria-label='simple table'
            >
                <TableHead>
                    <TableRow>
                        <TableCell>Email</TableCell>
                        <TableCell align='right'>Number</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userData.map((user) => (
                        <TableRow key={uuidv4()}>
                            <TableCell
                                component='th'
                                scope='row'
                            >
                                {user.email}
                            </TableCell>
                            <TableCell align='right'>{user.number}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableDataUser;
