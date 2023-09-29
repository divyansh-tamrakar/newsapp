import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Route, NavLink, Routes} from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'

// API_key for newsapi.org = 221654f1c2424239af9c0f379e3b6076

export default class App extends Component {
    pageSize = 5
    apiKey = process.env.REACT_APP_NEWS_API
    
    state = {
        progess: 0
    }

    setProgress = (progess) =>{
        this.setState({progess: progess})
    }
    render() {
        return (
            <div>
                
                <Router>
                <Navbar />
                <LoadingBar
                    color='#f11946'
                    progress={this.state.progess}
                    height={3}
                    // onLoaderFinished={() => setProgress(0)}
                /> 
                    <Routes>
                        <Route exact path='/' element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key='general' pageSize={this.pageSize} country='in' category='general'/>} />
                        <Route exact path='/general' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='general' pageSize={this.pageSize} country='in' category='general'/>} />
                        <Route exact path='/entertainment' element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key='entertainment' pageSize={this.pageSize} country='in' category='entertainment'/>} />
                        <Route exact path='/business' element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key='business' pageSize={this.pageSize} country='in' category='business'/>} />
                        <Route exact path='/health' element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key='health' pageSize={this.pageSize} country='in' category='health'/>} />
                        <Route exact path='/science' element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key='science' pageSize={this.pageSize} country='in' category='science'/>} />
                        <Route exact path='/sports' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='sports' pageSize={this.pageSize} country='in' category='sports'/>} />
                        <Route exact path='/technology' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='technology' pageSize={this.pageSize} country='in' category='technology'/>} />
    
                    </Routes>
                </Router>
            </div>
        )
    }
}
