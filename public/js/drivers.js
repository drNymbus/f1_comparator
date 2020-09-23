// require(["d3"], function (d3) {
//
//     d3.json("../assets/drivers.json", function (data) {
//         console.log(data);
//     });
//
// });

d3.json("drivers.json").then(function (data) {
    var sel = new Selector(data);
    sel.createCheckboxes();

    console.log(data);
    console.log("done.");
});

// d3.json("/public/assets/drivers.json", function (data) {
//     console.log(data);
// });

// var json = $.getJSON("../assets/drivers.json", function (data) {
//     console.log(data);
// });
