import {Component, OnInit} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private data = [
    {Framework: 'Vue', Stars: '0.5', Released: '3'},
    {Framework: 'React', Stars: '0.5', Released: '7'},
    {Framework: 'Angular', Stars: '2.5', Released: '7'},
    {Framework: 'Backbone', Stars: '3.5', Released: '16'},
    {Framework: 'Ember', Stars: '1.5', Released: '21'},
  ];
  private svg;
  private defs;
  private margin = 50;
  private width = 1253 - (this.margin * 2);
  private height = 297 - (this.margin * 2);

  ngOnInit(): void {
    this.createSvg();
    this.drawPlot();
  }

  private createSvg(): void {
    this.svg = d3.select('figure#scatter')
      .append('svg')
      .attr('width', this.width + (this.margin * 2))
      .attr('height', this.height + (this.margin * 2))
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');

    this.defs = this.svg.append('svg:defs');
    this.defs.append('svg:pattern')
      .attr('id', 'tile-ww')
      .attr('patternUnits', 'userSpaceOnUse')
      .attr('width', '1153')
      .attr('height', '197')
      .append('svg:image')
      .attr('xlink:href', '../assets/1153.png')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 1153)
      .attr('height', 197);

    // this.svg.append('g')
    //   .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');

    this.svg.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 1153)
      .attr('height', 197)
      .attr('fill', 'url(#tile-ww)');

  }

  private drawPlot(): void {
    // Add X axis
    const x = d3.scaleLinear()
      .domain([0, 24])
      .range([0, this.width]);
    this.svg.append('g')
      // .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisTop(x).tickFormat(d3.format('h')));

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, 4])
      .range([this.height, 0]);
    this.svg.append('g')
      .call(d3.axisLeft(y));

    // Add dots
    const dots = this.svg.append('g');
    dots.selectAll('dot')
      .data(this.data)
      .enter()
      .append('circle')
      .attr('cx', d => x(d.Released))
      .attr('cy', d => y(d.Stars))
      .attr('r', 7)
      .style('opacity', .5)
      .style('fill', '#69b3a2');

    // Add labels
    dots.selectAll('text')
      .data(this.data)
      .enter()
      .append('text')
      .text(d => d.Framework)
      .attr('x', d => x(d.Released))
      .attr('y', d => y(d.Stars));
  }

}
