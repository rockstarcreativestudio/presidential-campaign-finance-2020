import React, { Component } from 'react'
import Chart from './Chart'

class ChartContain extends Component {
    render() {
        return (
            <div>
                <section>
                    <div className="row bg-secondary chartrow">
                        <div
                            id="chartbox"
                            className="bg-white shadow-lg mx-auto"
                        >
                            <Chart />
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default ChartContain
