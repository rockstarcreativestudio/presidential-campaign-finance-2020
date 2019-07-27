import * as d3 from 'd3'
import * as d3config from './d3config'

const color = d3.schemeSet2

let xScale = d3.scaleOrdinal().range([0, d3config.maxChartWidth])

let yScale = d3.scaleLinear().range([d3config.svgHeight, 0])

const buildBar = data => {
    const g = d3.select('chart').append('g')

    g.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('fill', (d, i) => color[i])
        .attr('width', (d, i) => (d3config.maxChartWidth / i) * 0.9)
        .attr('height', d => d.total)
        .attr('x', (d, i) => i * 45 + 10)
        .attr('y', d => d3config.svgHeight - d * 20)

    g.append('g')
        .attr('transform', 'translate(0,' + d3config.svgHeight + ')')
        .call(d3.axisBottom(xScale))

    g.append('g').call(d3.axisLeft(yScale))
}

const buildChart = data => {
    buildBar(data)
}

export default buildChart
