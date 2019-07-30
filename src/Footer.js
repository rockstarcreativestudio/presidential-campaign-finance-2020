import React, { Component } from 'react'

export class Footer extends Component {
    render() {
        return (
            <div>
                <div id="footer" className="row bg-dark w-100 text-center py-2">
                    <div className="col">
                        <div className="h6 text-white text-center">
                            &copy;
                            {new Date().getFullYear()} Megan Bailey || Data
                            provided by{' '}
                            <a
                                className="text-warning"
                                href="https://api.open.fec.gov/developers"
                            >
                                FEC API
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer
