import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import Template from './components/Template';
import UserTable from './components/UserTable';
import PeopleIcon from '@material-ui/icons/People';
import CreateDialog from './components/CreateDialog';
const useStyles = makeStyles({
    paper: {
        padding: 30
    },
    itemAdd: {
        textAlign: 'end'
    },
    itemIcon: {
        textAlign: 'center'
    }
});

export default function HomePage() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Template>
            <Paper className={classes.paper}>
                <Grid container justify="center"
                    alignItems="center">
                    <Grid item xs={1} className={classes.itemIcon}>
                        <PeopleIcon color={'primary'} />
                    </Grid>
                    <Grid item xs={5}>
                        <Typography color="primary" variant="h4">Usuarios existentes</Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.itemAdd}>
                        <Button variant="contained" color="primary" onClick={handleClickOpen}>Crear</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <UserTable />
                    </Grid>
                </Grid>
            </Paper>
            <CreateDialog open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} />
        </Template>
    );
}