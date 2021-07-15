import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import App from './components/App';
import {store} from "./store-redux/store";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {PersonalCabinet} from "./components/PersonalCabinet";
import {PrivateRoute} from "./components/PrivateRoute";
import {SearchPage} from "./components/SearchPage";
import {FavoriteQueries} from "./components/FavoriteQueries";


ReactDOM.render(
    <Router>
        <Provider store={store}>
            <PrivateRoute exact path='/home/search' component={SearchPage}/>
            <PrivateRoute exact path='/home/favorite-queries' component={FavoriteQueries}/>
            <PrivateRoute exact path='/home' component={PersonalCabinet} />
            <Route exact path='/' component={App}/>
        </Provider>
    </Router>,
    document.getElementById('root')
);


