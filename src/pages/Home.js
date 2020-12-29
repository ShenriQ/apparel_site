import React, {useEffect, useState} from 'react';
import Header from '../components/header';
import Carousel from '../components/home/carousel';
import Info from '../components/home/info';
import Demo1 from '../components/home/demo1';
import Demo2 from '../components/home/demo2';
import Footer from '../components/footer';

 const Home = () => {
    const [demo_id, setDemoId] = useState(1)
    const [data, setData] = useState({})
    const showDemo=(index, data)=>{
        setDemoId(index)
        setData(data)
    }
    return (
        <React.Fragment>
            <Header/>
            <Carousel />
            <Info />
            {
                demo_id == 1 ? <Demo1 showDemo={showDemo}/> : <Demo2 showDemo={showDemo} data = {data} />
            }
            <Footer />
        </React.Fragment>
    )
}

export default Home