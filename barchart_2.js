function barchart_2(data) {
    var percentFormat = d3.format('.0%') // rounded percentage

    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 70, left: 40},
        width = 960 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    // set the ranges
    var x = d3.scaleBand()
        .range([0, width])
        .padding(0.1);
    var y = d3.scaleLinear()
        .range([height, 0]);

    var tooltip = d3.select("body").append("div")
        .attr("id", "tooltip_heatmap")
        .attr('class', 'tooltip')
        .style("opacity", 0);

    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("#bar-chart-2").select("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    // if (error) throw error;

    // format the data
    data.forEach(function (d) {
        d.Size = +d.Size;
    });

    // Scale the range of the data in the domains
    x.domain(data.map(function (d) {
        return d.Class;
    }));
    y.domain([0, d3.max(data, function (d) {
        return d.Size;
    })]);


    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
            return x(d.Class);
        })
        .attr("width", x.bandwidth())
        .attr("y", function (d) {
            return y(d.Size);
        })
        .attr("height", function (d) {
            return height - y(d.Size);
        })
        .on("mouseover", function (d) {
            $("#tooltip_heatmap").html("Cell class: " + d.Class + "<br/>Size: " + d.Size );
            var xpos = d3.event.pageX + 10;
            var ypos = d3.event.pageY + 20;
            $("#tooltip_heatmap").css("left", xpos + "px").css("top", ypos + "px").animate().css("opacity", 1);
        }).on("mouseout", function () {
        $("#tooltip_heatmap").animate({
            duration: 500
        }).css("opacity", 0);
    })


    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-60)")


    // add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y));


}