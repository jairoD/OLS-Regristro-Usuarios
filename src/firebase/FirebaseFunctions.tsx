import firebase from "firebase";


export function firebaseSignIn(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
}

export function firebaseSignUp(email: string, password: string){
    return firebase.auth().createUserWithEmailAndPassword(email,password);
};

export function firebaseSignOut(){
    return firebase.auth().signOut();
}

export function firebaseGetCurrentUser() {
    return firebase.auth().currentUser;
}


export function firebaseUserStatus() {
    return firebase.auth().onAuthStateChanged((user)=>{
        if (user) {
            return true;
        } else {
            return false;
        }
    });
}


export function firebaseGetUsers(){
    return firebase.firestore().collection('users');
}



export function firebaseCreateUserTable(user: UserTableInfo){
    return firebase.firestore().collection('users').add(user);
}