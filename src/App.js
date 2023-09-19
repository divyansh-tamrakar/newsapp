import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Route, NavLink, Routes} from 'react-router-dom'

// API_key for newsapi.org = 221654f1c2424239af9c0f379e3b6076

export default class App extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Router>
                    <Routes>
                        <Route exact path='/' element={<News pageSize={5} country='in' category='sports'/>} />
                    </Routes>
                </Router>
            </div>
        )
    }
}
