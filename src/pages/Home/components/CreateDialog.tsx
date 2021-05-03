import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Backdrop, CircularProgress, createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import { firebaseCreateUserTable, firebaseSignUp } from '../../../firebase/FirebaseFunctions';
import Swal from 'sweetalert2';


const useStyles = makeStyles((theme: Theme) => createStyles({
    inputs: { width: '100%' },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));
export default function CreateDialog(props: any) {
    const classes = useStyles();
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [cc, setCc] = useState<number>(0);
    const [rol, setRol] = useState("");
    const [state, setState] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState<number>(0);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false)

    const handleClose = () => {
        setLoading(false);
    };
    const handleToggle = () => {
        setLoading(!loading);
    };

    const create = () => {
        let user: UserTableInfo = {
            name: name,
            lastName: lastName,
            cc: cc,
            rol: rol,
            state: state,
            phoneNumber: phoneNumber,
            email: email
        };
        handleToggle();
        firebaseSignUp(email, password).then(async (res) => {
            await firebaseCreateUserTable(user)
            handleClose();
            props.handleClose();
        }).catch((err) => {
            handleClose();
            props.handleClose();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Usuario o contraseña incorrecto'
            })
        });

    }

    return (
        <div style={{ padding: 12 }}>
            <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title" maxWidth={'sm'} fullWidth>
                <DialogTitle id="form-dialog-title">Agregar nuevo usuario</DialogTitle>
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextField type="text" value={name} onChange={(e) => { setName(e.target.value) }} id="outlined-basic" label="Nombres" variant="outlined" className={classes.inputs} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField type="text" value={lastName} onChange={(e) => { setLastName(e.target.value) }} id="outlined-basic" label="Apellidos" variant="outlined" className={classes.inputs} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField type="number" value={cc} onChange={(e) => { setCc(parseInt(e.target.value)) }} id="outlined-basic" label="Identificación(C.C)" variant="outlined" className={classes.inputs} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField type="text" value={rol} onChange={(e) => { setRol(e.target.value) }} id="outlined-basic" label="Rol asociado" variant="outlined" className={classes.inputs} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField type="text" value={state} onChange={(e) => { setState(e.target.value) }} id="outlined-basic" label="Estado" variant="outlined" className={classes.inputs} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} id="outlined-basic" label="Contraseña" variant="outlined" className={classes.inputs} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField type="number" value={phoneNumber} onChange={(e) => { setPhoneNumber(parseInt(e.target.value)) }} id="outlined-basic" label="Teléfono" variant="outlined" className={classes.inputs} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} id="outlined-basic" label="Correo electrónico" variant="outlined" className={classes.inputs} />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={create} variant="contained" color="primary">
                        Aceptar
                    </Button>
                    <Button onClick={props.handleClose} variant="outlined" color="primary">
                        Cancelar
            </Button>
                </DialogActions>
                <Backdrop className={classes.backdrop} open={loading} onClick={handleClose}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Dialog>
        </div>
    );
}