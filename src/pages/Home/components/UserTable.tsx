import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import firebase from 'firebase';
import { firebaseGetCurrentUser, firebaseGetUsers } from '../../../firebase/FirebaseFunctions';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function UserTable() {
    const classes = useStyles();
    const [usersTable, setUsersTable] = useState<UserTableInfo[]>([]);
    useEffect(()=>{
        firebaseGetUsers().onSnapshot((res)=>{
            setUsersTable([]);
            res.forEach((doc)=>{
                let aux = doc.data() as UserTableInfo;
                setUsersTable(usersTable => [...usersTable, aux]);
            })
        })
    },[]);
    return (
        <TableContainer>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Nombres</TableCell>
                        <TableCell align="center">Apellidos</TableCell>
                        <TableCell align="center">Identficación(C.C)</TableCell>
                        <TableCell align="center">Rol asociado</TableCell>
                        <TableCell align="center">Estado</TableCell>
                        <TableCell align="center">Teléfono</TableCell>
                        <TableCell align="center">Correo electrónico</TableCell>
                        <TableCell align="center">Acción</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {usersTable.map((row: UserTableInfo) => (
                        <TableRow key={row.name}>
                            <TableCell >{row.name}</TableCell>
                            <TableCell align="center">{row.lastName}</TableCell>
                            <TableCell align="center">{row.cc}</TableCell>
                            <TableCell align="center">{row.rol}</TableCell>
                            <TableCell align="center">{row.state}</TableCell>
                            <TableCell align="center">{row.phoneNumber}</TableCell>
                            <TableCell align="center">{row.email}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}