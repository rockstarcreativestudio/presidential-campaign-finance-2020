import React, { Component } from 'react'

class Nav extends Component {
    render() {
        return (
            <div>
                <nav className="nav bg-dark">
                    <div className="row w-100 py-4">
                        <div className="container text-center">
                            <h2 className="text-white">
                                Presdential Candidates 2020
                            </h2>
                            <h3 className="text-warning">Finances in Truth</h3>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Nav
