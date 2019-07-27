import React, { Component } from 'react'
import * as d3config from './d3config'
import * as d3 from 'd3'
import './index.css'
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
        const margin = { top: 10, right: 20, bottom: 30, left: 30 }

        const width = 1000
        const height = 700

        const svg = d3
            .select('#holder')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('viewBox', '0 0 ' + (width - 400) + ' ' + (height - 100))
            .attr('perserveAspectRatio', 'xMinYMid')
            .append('g')
            .attr('transform', 'translate(250, 100)')

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

        let tooltip = d3
            .select('body')
            .append('div')
            .attr('id', 'tooltip')
            .style('opacity', 0)
            .attr('class', 'tooltip')
            .style('position', 'absolute')

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

        let path = svg
            .selectAll('path')
            .data(pie(data))
            .enter()
            .append('path')
            .attr('fill', (d, i) => color[i])
            .attr('class', '.arc')
            .attr('stroke', '#5a5a5a')
            .attr('d', arc)
            .on('mouseover', d => {
                tooltip
                    .transition()
                    .duration(200)
                    .style('opacity', '1')
                    .style('pointer-events', 'none')
                tooltip
                    .html(
                        'Total Donations: $' +
                            d.total.replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
                            '</br>' +
                            'Number of Donations in Size Category: ' +
                            d.count
                    )
                    .style('left', d3.event.pageX + 100)
                    .style('top', d3.event.pageY + 25)
                    .on('mouseout', (d, i) => {
                        tooltip
                            .transition()
                            .duration(250)
                            .style('opacity', '0')
                    })
            })

        let outerPath = svg
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

        let legend = d3.select('#legend')

        let numOfRows = 1

        legend
            .selectAll('.legend')
            .data(lColor.domain())
            .enter()
            .append('circle')
            .attr('cx', (d, i) => (i % numOfRows) * 100)
            .attr('cy', (d, i) => parseInt(i / numOfRows) * 50)
            .attr('r', 7)
            .style('fill', d => lColor(d))
            .style('stroke', d => lColor(d))
            .style('alignment-baseline', 'bottom')

        legend
            .append('text')
            .attr('x', (d, i) => (i % numOfRows) * 100)
            .attr('y', (d, i) => parseInt(i / numOfRows) * 50 + 40)
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
                    <div id="holder" />
                )}
                {this.state.isLoading ? null : (
                    <div>
                        <svg id="legend" width="100%" height="100px" />
                    </div>
                )}
            </div>
        )
    }
}

export default Chart
