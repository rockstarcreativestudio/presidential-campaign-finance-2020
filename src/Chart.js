import React, { Component } from 'react'
import * as d3config from './d3config'
import * as d3 from 'd3'
// import buildChart from './d3file'
import CanSelect from './CanSelect'
import axios from 'axios'

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
            url: `https://api.open.fec.gov/v1/committee/${prez}/schedules/schedule_a/by_size/?per_page=20&cycle=2020&page=1&sort_hide_null=false&sort=-cycle&api_key=${api}&sort_null_only=false&sort_nulls_last=false
                        `,
        })
            .then(resp => {
                let finances = resp.data.results
                let totals = finances
                    .map(({ size, total }) => ({
                        size,
                        total,
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
        const g = d3
            .select('#chart')
            .append('g')
            .attr(
                'transform',
                'translate(' +
                    d3config.maxChartWidth / 2 +
                    ',' +
                    d3config.svgHeight / 2 +
                    ')'
            )

        console.log(this.state.data)

        const color = d3
            .scaleOrdinal()
            .range(['#ed5565', '#f8ac59', '#23c6c8', '#1ab394', '#1c84c6'])
            .domain(data, d => d.size)

        let radius = Math.min(d3config.maxChartWidth, d3config.svgHeight) / 2
        let iRadisu = radius * 0.3
        let scaleORadius = d3
            .scaleLinear()
            .range([0, d3.max(d => d.total)])
            .domain([0, d3.max(data)])

        let pie = d3
            .pie()
            .value(d => d.total)
            .sort(null)

        let outlineArc = d3
            .arc()
            .innerRadius(iRadisu)
            .outerRadius(radius)

        let arc = d3
            .arc()
            .innerRadius(iRadisu)
            .outerRadius(d => scaleORadius(d.total))

        let path = g
            .selectAll('path')
            .data(pie(data))
            .enter()
            .append('path')
            .attr('fill', (d, i) => color[i])
            .attr('class', '.arc')
            .attr('stroke', '#5a5a5a')
            .attr('d', arc)

        let outerPath = g
            .selectAll('.oArc')
            .data(pie(data))
            .enter()
            .append('path')
            .attr('fill', (d, i) => color(i))
            .attr('stroke', '#5a5a5a')
            .attr('class', '.oArc')
            .attr('d', outlineArc)

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

        let size = 15
        let space = 10

        let legend = g
            .selectAll('.legend')
            .data(lColor.domain())
            .enter()
            .append('g')
            .attr('id', 'legend')
            .attr('class', 'legend')
            .attr('transform', function(d, i) {
                let height = size + space + 5
                let offset = height + lColor.domain().length / 2
                let horz = 12 * height
                let vert = i * height + offset
                return 'translate(' + horz + ',' + vert + ')'
            })

        legend
            .append('circle')
            .attr('cx', size)
            .attr('cy', size)
            .attr('r', 7)
            .style('fill', d => lColor(d))
            .style('stroke', d => lColor(d))
            .style('alignment-baseline', 'bottom')

        legend
            .append('text')
            .attr('x', size + space)
            .attr('y', size + space)
            .text(d => d)
            .style('line-height', '1.5em')
            .attr('text-anchor', 'left')
            .style('alignment-baseline', 'top')
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
                    <svg
                        id="chart"
                        className="chart"
                        width="100%"
                        height={d3config.svgHeight}
                    />
                )}
            </div>
        )
    }
}

export default Chart
