import './App.css';

// API_key for newsapi.org = 221654f1c2424239af9c0f379e3b6076

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <News />
            </div>
        )
  }
}
