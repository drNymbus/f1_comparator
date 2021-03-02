// extern import "model.js" done by "drivers.html"
// extern import "d3.js" done by "drivers.html"

fetch("drivers.json").then(response => response.json()).then(function (data) {
    // get window size
    var width = window.innerWidth, height = window.innerHeight;
    //create svg
    var svg = d3.select("#maincontent").append("svg")
        .attr("width", width)
        .attr("height", height);
    svg.append("g")
        .attr("id", "chart")
    svg.append("g")
        .attr("id", "selection");

    var chart = new Chart(data);
    // var comp = new Comparator(data);
    // comp.initSVG();

    var select = new Selector(data, chart, svg, width, height);
    // select.initCheckboxes(comp);
});
