import React, { Component } from 'react'
import * as d3 from 'd3'
import './index.css'
import CanSelect from './CanSelect'
import axios from 'axios'
import d3Tip from 'd3-tip'

const api = process.env.REACT_APP_GOV_API || process.env.GOV_API

export class Chart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            data: {},
        }
    }

    handleSelect = e => {
        let prez = e.currentTarget.value
        this.setState({
            isLoading: true,
        })
        axios({
            method: 'GET',
            url: `https://api.open.fec.gov/v1/committee/${prez}/schedules/schedule_a/by_size/?per_page=20&cycle=2020&page=1&sort_hide_null=false&sort=-cycle&api_key=${api}&sort_null_only=false&sort_nulls_last=true
                        `,
        })
            .then(resp => {
                let finances = resp.data.results
                let totals = finances
                    .map(({ size, total, count }) => ({
                        size,
                        total,
                        count,
                    }))
                    .sort((a, b) => (a.size > b.size ? 1 : -1))
                this.setState({
                    data: totals,
                    isLoading: false,
                })
            })
            .catch(err => {
                console.log('Danger, Will Robinson! ' + err)
                this.setState({
                    isLoading: false,
                })
            })
    }

    componentDidUpdate() {
        this.buildBar(this.state.data)
    }

    buildBar = data => {
        const width = 1000
        const height = 600

        const svg = d3
            .select('#holder')
            .append('svg')
            // .attr('width', width)
            // .attr('height', height)
            .attr('viewBox', '0 0 ' + width + ' ' + height)
            .attr('perserveAspectRatio', 'xMinYMid')
            .append('g')
            .attr(
                'transform',
                'translate(' + width / 1.75 + ', ' + height / 2 + ')'
            )

        console.log(this.state.data)

        const color = d3
            .scaleOrdinal()
            .range(['#ed5565', '#f8ac59', '#23c6c8', '#1ab394', '#1c84c6'])
            .domain((d, i) => this.state.data[i].count)

        let radius = Math.min(width, height) / 2
        let iRadius = radius * 0.3

        let tooltip = d3Tip()
            .attr('id', 'tooltip')
            .offset([100, 0])
            .attr('class', 'tooltip')
            .html(
                (d, i) =>
                    'Total Donations: $' +
                    this.state.data[i].total +
                    '<br />' +
                    '# of Donations in Category: ' +
                    (!this.state.data[i].count ? 0 : this.state.data[i].count) +
                    '<br />' +
                    this.state.data[i].size
            )

        svg.call(tooltip)

        let pie = d3
            .pie()
            .value(d => d.total)
            .sort(null)

        let outlineArc = d3
            .arc()
            .innerRadius(iRadius)
            .outerRadius(radius)

        let outerPath = svg
            .selectAll('.oArc')
            .data(pie(data))
            .enter()
            .append('path')
            .attr('fill', (d, i) => color(i))
            .attr('stroke', '#5a5a5a')
            .attr('class', 'oArc')
            .attr('d', outlineArc)
            .on('mouseover', tooltip.show)
            .on('mouseout', tooltip.hide)

        let cats = [
            '< $200',
            '$200.01 - $499.99',
            '$500 - $999.99',
            '$1000 - $1999.99',
            '> $2000',
        ]

        let lColor = d3
            .scaleOrdinal()
            .domain(cats)
            .range(['#ed5565', '#f8ac59', '#23c6c8', '#1ab394', '#1c84c6'])

        let cell = 10
        let w = 300
        let h = 75
        let numofCol = 5

        let legend = d3
            .select('#legend')
            .append('svg')
            .attr('viewBox', '0 0 ' + w + ' ' + h)
            .attr('perserveAspectRatio', 'xMinYMid')
        // .attr(
        //     'transform',
        //     'translate(' + w / 2.25 + ', ' + -height / 1.25 + ')'
        // )
    }

    render() {
        return (
            <div>
                <CanSelect handleSelect={this.handleSelect} />
                {this.state.isLoading ? (
                    <h3 className="text-primary text-center">
                        Data Loading . . .{' '}
                    </h3>
                ) : (
                    <div id="holder" />
                )}
            </div>
        )
    }
}

export default Chart
