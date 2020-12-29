import {db, auth, storage} from '../utils/firebase';


export const getUserAllApparels = (user_id) => {
    return db.collection('users').doc(user_id).collection('apparels').get().then(response => { return response; })
}

export const addApparel = (user, apparel) => {
    return db.collection('users').doc(user.id).collection('apparels').add(apparel).then(response => {return response})
}

export const addFeedback = (feedback) => {
    return db.collection('feedbacks').doc(feedback.id).set(feedback).then(response => {return response})
}