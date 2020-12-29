import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import ProfileContent from '../components/profile';

export default class Profile extends React.Component {
    render () {
        return (
            <React.Fragment>
                <Header/>
                <ProfileContent />
                <Footer />
            </React.Fragment>
        )
    }
}