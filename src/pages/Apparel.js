import React, {useEffect, useState} from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import ApparelContent from '../components/apparel';
import AdminContent from '../components/admin';
import {connect} from 'react-redux';

const Apparel =(props)=> {
    const [page, SetPageIndex] = useState(0)
    useEffect(()=>{
        if(props.user.email == "madhubobba2@gmail.com")
        {
            SetPageIndex(1)
        }
    }, [props.user])

    return (
        <React.Fragment>
            <Header/>
            {
                page == 0 ? <ApparelContent /> : <AdminContent />
            }
            <Footer />
        </React.Fragment>
    )
}

const mapstate_props=(state)=>{
    return {
        user : state.userReducer.user
    }
}

export default connect(mapstate_props)(Apparel)