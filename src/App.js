import React, { Component } from 'react'
import './index.css'
import Nav from './Nav'
import ChartContain from './ChartContain'
import dotenv from 'dotenv'

dotenv.config()

class App extends Component {
    render() {
        return (
            <div>
                <Nav />
                <ChartContain />
            </div>
        )
    }
}

export default App
