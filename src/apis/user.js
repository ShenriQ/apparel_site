import {db, auth, storage} from '../utils/firebase';

export const firebaseLogin = (user) => {
    return auth.signInWithEmailAndPassword(user.email, user.password)
            .then(response => {return response})
}

export const firebaseRegister = (user) => {
    return auth.createUserWithEmailAndPassword(user.email, user.password)
            .then(response => {return response})
}

export const getUserData = (user_id) => {
    return db.collection('users').doc(user_id).get().then(response => {return response.data()})
}

export const setUserData = (user) => {
    return db.collection('users').doc(user.id).set(user).then(response => {return response})
}

export const updateUserData = (user) => {
    // auth.signInWithEmailAndPassword('you@domain.com', 'correcthorsebatterystaple')
    // .then(function(userCredential) {
    //     userCredential.user.updateEmail('newyou@domain.com')
    // })
    return db.collection('users').doc(user.id).update(user).then(response => {return response})
}
