import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import NewApparelContent from '../components/new_apparel';

export default class NewApparel extends React.Component {
    render () {
        return (
            <React.Fragment>
                <Header/>
                <NewApparelContent />
                <Footer />
            </React.Fragment>
        )
    }
}