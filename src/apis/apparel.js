import {db, auth, storage} from '../utils/firebase';


export const getUserAllApparels = (user_id) => {
    return db.collection('users').doc(user_id).collection('apparels').get().then(response => { return response; })
}

export const getDemoApparels = (params) => {
    if (params.apparel_type == 'All')
    {
        return db.collection('users').doc('demo-user').collection('apparels')
        .where('category', '==', params.category).get().then(response => { return response; })
    }
    else {
        return db.collection('users').doc('demo-user').collection('apparels')
        .where('category', '==', params.category).where('apparel_type', '==', params.apparel_type).get().then(response => { return response; })
    }
}

export const addApparel = (user, apparel) => {
    return db.collection('users').doc(user.id).collection('apparels').add(apparel).then(response => {return response})
}

export const deleteApparel = (user, apparel_id) => {
    return db.collection('users').doc(user.id).collection('apparels').doc(apparel_id).delete().then(response => {return response})
}

export const addFeedback = (feedback) => {
    return db.collection('feedbacks').doc(feedback.id).set(feedback).then(response => {return response})
}