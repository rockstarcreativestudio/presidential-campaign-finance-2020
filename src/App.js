import React, { Component } from 'react'
import './index.css'
import Nav from './Nav'
import ChartContain from './ChartContain'
import Footer from './Footer'
import dotenv from 'dotenv'

dotenv.config()

class App extends Component {
    render() {
        return (
            <div>
                <Nav />
                <ChartContain />
                <Footer />
            </div>
        )
    }
}

export default App
