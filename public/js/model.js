
function createItemSelect(objs, element, rect) {
    for (var i in objs) {
        var item = objs[i];
        var g = element.append("g").attr("class", "select " + objs[i]["name"]);
        g.append("rect")
            .attr("class", item["scuderia"])
            .attr("x", rect.x)
            .attr("y", rect.y+5)
            .attr("width", rect.width)
            .attr("height", rect.height);

        g.append("text")
            .attr("x", rect.x + rect.width/3)
            .attr("y", rect.y + rect.height/1.8)
            .text(item["name"]);
        
        rect.y += rect.height;
    }
}

class itemSelect {
    constructor(objs, g, rect) {
        this.g = g.append("g")
    }
}

class Selector {
    /*
     * desc : Constructor of Selector class
     * param svg : from d3.select give an svg element
     * param objs : the objects to select from
     * param chart : the graph/chart that the selector should update
     * param width : the width of the svg element
     * param height : the.height of the svg element
     */
    constructor(objs, chart, svg, width, height) {
        this.objs = objs;
        this.selected = [{"i" : 0, "lvl" : 1},{"i" : 1, "lvl" : 1}];
        this.chart = chart;
        this.g = svg.select("#selection");

        var rect = {"x" : 0, "y" : 0, "width" : width/8, "height" : height/10};

        this.add_button = this.g.append("g")
            .attr("id", "addButton");
        this.add_button.append("rect")
            .attr("class", "addButton")
            .attr("x", rect.x)
            .attr("y", rect.y)
            .attr("width", rect.width)
            .attr("height", rect.height)
            // .on("mouseover", d => console.log(d3.select(this).text("HEY YO")))
            // .on("mouseleave", d => d3.select(this).style("opacity", 0.6))
            .on("click", function (d) { d3.select("#select").style("visibility", "visible"); });
        this.add_button.append("text")
            .attr("class", "add")
            .attr("x", rect.x + rect.width/3)
            .attr("y", rect.y + rect.height/1.80)
            .text("ADD ITEM +");

        for (var i in this.selected) {
            var index = this.selected[i];
            var item = this.objs[index.i];

            var g = this.g.append("g")
                .attr("transform", "translate(0, " + rect.height*1.5 + ')')
                .attr("id", item[name]);
            g.append("rect")
                .attr("class", item["name"] + " " + item["scuderia"])
                .attr("x", rect.x)
                .attr("y", rect.y)
                .attr("width", rect.width)
                .attr("height", rect.height);

            g.append("text") // Text for driver name
                .attr("class", item["name"])
                .attr("x", rect.x + rect.width/20)
                .attr("y", rect.y + rect.height/5)
                .text(item["name"]);
            g.append("text") // Text for driver series
                .attr("class", item["name"])
                .attr("x", rect.x + rect.width/1.15)
                .attr("y", rect.y + rect.height/5)
                .text(item["series"]);

            // Change level input
            
            // Remove button
            g.append("svg:img")
                .attr("class", "removeDriver")
                .attr("xlink:href", "assets/remove_icon.png")
                .attr("x", rect.x + rect.width/1.15)
                .attr("y", rect.y + rect.height/5 + 10)
                .attr("width", "25px")
                .attr("height", "25px")
                .on("click", function() {
                    this.style.opacity = 1;
                    removeDriver(this.id);
                });

            rect.y += rect.height;
        }

        rect.y = 0;
        var element = svg.append("g")
            .attr("id", "select")
            .attr("transform", "translate(" + (rect.width + 25) + ',' + (rect.height/2) + ')')
            .on("sroll", function(e) {
                console.log(e, this);
            });
        this.createItemSelect(this.objs, element, rect);
    }

    createItemSelect(objs, element, rect) {
        for (var i in objs) {
            var item = objs[i];
            var g = element.append("g").attr("class", "select " + objs[i]["name"]);
            g.append("rect")
                .attr("class", item["scuderia"])
                .attr("x", rect.x)
                .attr("y", rect.y+5)
                .attr("width", rect.width)
                .attr("height", rect.height);
    
            g.append("text")
                .attr("x", rect.x + rect.width/3)
                .attr("y", rect.y + rect.height/1.8)
                .text(item["name"]);
            
            rect.y += rect.height;
        }
    }

    removeDriver(id) {
        console.log(id);
    }

    addDriver(id) {
        console.log(id);
    }

    updateChart() {
        
    }
}

class Chart {
    constructor(items) {
    }
}