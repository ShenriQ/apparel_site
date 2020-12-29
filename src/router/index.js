import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from '../pages/Home';
import ApparelPage from '../pages/Apparel';
import ProfilePage from '../pages/Profile';
import NewApparelPage from '../pages/NewApparel';
import AboutUsPage from '../pages/AboutUs';

export default class Routes extends React.Component {
    render() {
    return(
        <Router>
            <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/home" >
                <HomePage />
            </Route>
            <Route exact path="/apparel" component={ApparelPage} />
            <Route exact path="/profile" component={ProfilePage} />
            <Route exact path="/add_apparel" component={NewApparelPage} />
            <Route exact path="/about-us" component={AboutUsPage} />
            </Switch>
        </Router>
    )
    }
}
 