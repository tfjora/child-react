/* eslint-disable @typescript-eslint/no-unused-vars */
import * as d3 from 'd3';
import React, { createRef, useEffect } from 'react';

type Props = {
    data: any;
};

export default function CircleChart({ data }: Props) {
    const ref = createRef<HTMLDivElement>();
    useEffect(() => {
        const width = 700;
        const height = 800;

        const svg = d3
            .select(ref.current)
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        const g = svg
            .selectAll('g')
            .data(data)
            .enter()
            .append('g')
            .attr('transform', function (d, i) {
                return 'translate(0,0)';
            });

        g
            .append('circle')
            .attr('cx', function (d: any, i) {
                return d.x;
            })
            .attr('cy', function (d: any, i) {
                return d.y;
            })
            .attr('r', function (d: any, i) {
                return Math.random() * (100 - 50) + 50;
            })
            .attr('fill', function (d: any, i) {
                return d.background;
            })
            .join((enter) =>
                enter
                    .append('circle')
                    .call((enter: any) =>
                        enter
                            .transition()
                            .duration(1200)
                            .attr('cy', 10)
                            .attr('r', 6)
                            .style('opacity', 1)
                    )
            ),
            (update: any) => update.attr('fill', 'lightgrey'),
            (exit: any) =>
                exit
                    .attr('fill', 'tomato')
                    .call((exit: any) =>
                        exit.transition().duration(1200).attr('r', 0).style('opacity', 0).remove()
                    );
        g.append('text')
            .attr('x', function (d: any, i) {
                return d.x - 20;
            })
            .attr('y', function (d: any, i) {
                return d.y - 25;
            })
            .attr('stroke', 'teal')
            .attr('font-size', '12px')
            .attr('font-family', 'sans-serif')
            .text((d: any) => {
                return d.text;
            });
    }, [data]);

    return (
        <>
            <div ref={ref}></div>
        </>
    );
}
