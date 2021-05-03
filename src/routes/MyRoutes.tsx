import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { firebaseGetCurrentUser, firebaseUserStatus } from '../firebase/FirebaseFunctions';
import HomePage from '../pages/Home/HomePage';
import LoginPage from '../pages/Login/LoginPage';


export default function MyRoutes() {
    const [exist, setExist] = useState(false)
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                if (firebaseGetCurrentUser()?.email !== null) {
                    setExist(true);
                }
                else {
                    setExist(false);
                }

            } else {
                setExist(false);
            }
        });
    }, []);
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    {exist == false ? <LoginPage /> : <HomePage />}
                </Route>
                <Route exact path="*">
                    <h1>not found</h1>
                </Route>
            </Switch>
        </Router>
    );

}