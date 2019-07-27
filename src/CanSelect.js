import React, { Component } from 'react'
import axios from 'axios'

const api = process.env.REACT_APP_GOV_API || process.env.GOV_API

class CanSelect extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        axios({
            method: 'GET',
            url: `https://api.open.fec.gov/v1/candidates/search/?office=P&election_year=2020&incumbent_challenge=I&incumbent_challenge=C&page=1&per_page=50&sort_nulls_last=false&has_raised_funds=true&sort=name&sort_hide_null=false&sort_null_only=false&is_active_candidate=true&api_key=${api}&candidate_status=C&year=2020`,
        })
            .then(resp => {
                let json = resp.data.results
                console.log(json)

                let names = json
                    .map(({ name, party }) => ({
                        name,
                        party,
                    }))
                    .sort((a, b) => (a.name > b.name ? 1 : -1))

                let select = document.getElementById('prez')
                select.options.length = 0
                names.forEach((d, i) => {
                    select.options[select.options.length] = new Option(
                        names[i],
                        json[i].principal_committees[0].committee_id
                    )
                })
            })

            .catch(err => console.log('Danger, Will Robinson! ' + err))
    }

    render() {
        let { handleSelect } = this.props
        return (
            <div>
                <div className="d-flex justify-content-center pt-4">
                    <div className="form-group row text-center align-middle">
                        <label
                            htmlFor="prez"
                            className="col-auto col-form-label col-form-label-sm"
                        >
                            <span className="h6 text-dark">
                                Select a Candidate
                            </span>
                        </label>

                        <div className="col-auto">
                            <select
                                className="form-control"
                                id="prez"
                                onChange={handleSelect}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CanSelect
