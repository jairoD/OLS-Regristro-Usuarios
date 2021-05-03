import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Backdrop, Button, CircularProgress, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { firebaseSignIn } from '../../firebase/FirebaseFunctions';
import Swal from 'sweetalert2';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minHeight: '100vh',
            backgroundColor: 'grey',
            backgroundImage: 'url(https://cdn.colombia.com/sdi/2014/01/08/barichara-875841.jpg)',
            backgroundSize: 'cover'
        },
        paper: {
            backgroundColor: 'white',
            textAlign: 'center',
            padding: 12,
            borderRadius: 30,
            maxWidth: 450,
        },
        formGrid: {
            justifyContent: 'center',
            display: 'flex',
            alignItems: 'center',
        },
        inputs: {
            width: '70%'
        },
        button: {
            width: '70%',
            backgroundColor: '#2f51e0',
            color: 'white',
            height: 50
        },
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },

    }),
);

export default function LoginPage() {
    const classes = useStyles();
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)

    const login = async () => {
        handleToggle();
        firebaseSignIn(user, password).then((res) => {
            handleClose();
        }).catch((err) => {
            handleClose()
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Usuario o contraseña incorrecto'
            })

        });
    }

    const handleClose = () => {
        setLoading(false);
    };
    const handleToggle = () => {
        setLoading(!loading);
    };
    return (

        <Grid container className={classes.root}>
            <Grid item xs={12} className={classes.formGrid}>
                <Paper className={classes.paper}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} style={{ paddingTop: 50 }}>
                            <Typography variant="h4">Inicio de sesión</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField value={user} onChange={(e) => { setUser(e.target.value) }} id="outlined-basic" label="Usuario" variant="outlined" className={classes.inputs} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="outlined-basic" type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} label="Contraseña" variant="outlined" className={classes.inputs} />
                        </Grid>
                        <Grid item xs={12} style={{ paddingBottom: 50 }}>
                            <Button variant="contained" color="primary" onClick={login} className={classes.button}>Iniciar sesión</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Backdrop className={classes.backdrop} open={loading} onClick={handleClose}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Grid>

    );
}