import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import ApparelContent from '../components/apparel';

export default class Shop extends React.Component {
    render () {
        return (
            <React.Fragment>
                <Header/>
                <ApparelContent />
                <Footer />
            </React.Fragment>
        )
    }
}