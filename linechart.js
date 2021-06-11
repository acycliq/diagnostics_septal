function linechart(data) {

    // var parseTime = d3.timeParse("%d-%b-%y");


    // format the data
    data.forEach(function (d) {
        d.iteration = +d.iteration;
        d.prob = +d.prob;
    });

    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 960 - margin.left - margin.right,
        height = 660 - margin.top - margin.bottom;


    // set the ranges
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // define the line
    var valueline = d3.line()
        .x(function (d) {
            return x(d.iteration);
        })
        .y(function (d) {
            return y(d.prob);
        });

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("#line-chart").select("svg")
        // d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


    // Scale the range of the data
    x.domain(d3.extent(data, function (d) {
        return d.iteration;
    }));
    y.domain([0, d3.max(data, function (d) {
        return d.prob;
    })]);

    // Add the valueline path.
    svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", valueline);

    // Add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append("g")
        .call(d3.axisLeft(y));

        // text label for the x axis
    var textGroup = svg.append('g')
        .attr('id', 'axesLabels')

    textGroup
        .append('g')
        .attr('id', 'xAxisLabel')
        .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom - 5) + ")")
        .attr('font-family', 'sans-serif')
        .attr('font-size', 12)
        .attr('text-anchor', 'middle')
        .append('g')
        .attr('id', 'xAxisLabelText')
        .append('text')
        .text("Iteration");

    // text label for the y axis
    textGroup
        .append('g')
        .attr('id', 'yAxisLabel')
        .attr('transform', "translate(" + (-0.7*margin.left) + " ," + (height/2) + ") rotate(-90)")
        .attr('font-family', 'sans-serif')
        .attr('font-size', 12)
        .attr('text-anchor', 'middle')
        .append('g')
        .attr('id', 'yAxisLabelText')
        .append('text')
        .text("Delta");

}