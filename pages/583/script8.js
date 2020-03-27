function loadVariation8() {
	document.getElementById("board").innerHTML = "";
    'use strict';
    var mapScale = 45000;
    var mapTranslateX = 540;
    var mapTranslateY = mapScale * 0.99388888888888;
    const weaponsColour = {
        Arson: "red",
        "Blunt Object": "#cc79a7",
        Gun: "#0072b2",
        Knife: "#f0e442",
        Ligature: "#D81B60",
        None: "#1E88E5",
        Other: "#000000",
        Poison: "lime",
        Strangulation: "#F32AD1",
        Vehicle: "grey"};

    const weaponsIcon = {
        Arson: "\uf7e4",
        "Blunt Object": "\uf6e3",
        Gun: "\uf05b",
        Knife: "\uf2e7",
        Ligature: "\uf5b7",
        None: "\uf057",
        Other: "\uf059",
        Poison: "\uf714",
        Strangulation: "\uf6de",
        Vehicle: "\uf5e1"};

    const svg = d3.select('svg');

    const projection = d3.geoPatterson()
        .scale(mapScale)
        .translate([mapTranslateX, mapTranslateY]);
    const pathGenerator = d3.geoPath().projection(projection);

    var boroughKillFreq = {};

    svg.append('path')
        .attr('class', 'sphere')
        .attr('d', pathGenerator({type: 'Sphere'}));

    var color = d3.scaleLinear()
        .domain([0, 10])
        .range(["white", "red"]);

    var maxDead = 0;

    d3.selection.prototype.moveToFront = function() {
        return this.each(function(){
            this.parentNode.appendChild(this);
        });
    };
    d3.selection.prototype.moveToBack = function() {
        return this.each(function() {
            var firstChild = this.parentNode.firstChild;
            if (firstChild) {
                this.parentNode.insertBefore(this, firstChild);
            }
        });
    };

    d3.json('london.json')
        .then(data => {
            const countries = topojson.feature(data, data.objects.london_geo);
            svg.selectAll('path').data(countries.features)
                .enter().append('path')
                .attr('id', 'boroughs')
                .attr('class', 'country')
                .attr('d', pathGenerator)

            for (let x = 0; x < countries.features.length; x++) {
                boroughKillFreq[countries.features[x]['id']] = 0;
            }
        });
    setTimeout(function(){
        d3.csv('homicideEdit.csv')
            .then(data => {
                var g = svg.selectAll('points').data(data.filter(function(d){
                    return (d.date > '2015-01-01');
                }))
                    .enter()
                    .append("g");
                g.append("text")
                    .attr("class", "fa")
                    .attr("id", d=> {return "homicide-"+d.date})
                    .attr('text-anchor', 'middle')
                    .attr("x", function(d) {
                        boroughKillFreq[d.ladnm] = boroughKillFreq[d.ladnm] + 1;
                        if (boroughKillFreq[d.ladnm] > maxDead) maxDead = boroughKillFreq[d.ladnm];
                        return projection([d.longitude, d.latitude])[0];
                    })
                    .attr("y", function(d) {return projection([d.longitude, d.latitude])[1];})
                    .attr("font-size","12px")
                    // .style("stroke", "#000000")
                    .style("fill", function(d) {return weaponsColour[d.weapon];})
                    .text(function(d) {return weaponsIcon[d.weapon];})
                    .on("mouseover", function(d){
                        d3.select(this)
                            // .moveToFront()
                            // .transition()
                            .style("fill", "orange")
                            .attr("font-size","24px")
                            .append("svg:title")
                            .text(d => { return d.date + "\nVictim Age: " + d.vicage +"\nVictim Sex: "
                                +d.vicsex + "\nVictim Ethinicity: "+d.vicethnic + "\nSuspect Sex: "+d.sussex
                                + "\nBorough: "+d.ladnm;})
                    })
                    .on("mouseout", function(d){
                        d3.select(this).transition()
                            .style("fill", function(d) {return weaponsColour[d.weapon];})
                            .attr("font-size","12px")
                        // .moveToBack()
                        d3.select(this)
                            .select("text").remove();
                    });

            });

        setTimeout(function(){
            d3.json('london.json')
                .then(data => {
                    const countries = topojson.feature(data, data.objects.london_geo);
                    const divider = maxDead/10;

                    var tooltip = d3.select("body")
                        .append("div")
                        .style("position", "absolute")
                        .style("z-index", "10")
                        .style("visibility", "hidden")
                        .style("text-align", "center")
                        .style("width", "80px")
                        .style("height", "40px")
                        .style("padding", "2px")
                        .style("font-size", "8px")
                        .style("background", "lightsteelblue")
                        .style("border", "0px")
                        .style("border-radius", "8px")
                        .text(function (d) {
                            //var txt = d.id + "\n" + boroughKillFreq[d.id] + " deaths";
                            return "banana";
                        });

                    var xz = svg.selectAll('path#boroughs').attr('class', 'borough')
                        .attr('fill', function(d) {
                            var num = Math.ceil(boroughKillFreq[d.id]/divider);
                            return color(num);

                            //if (boroughKillFreq[d.id] > 10) return'#FF0000';
                            //return '#90EE90';
                        })
                        .attr("opacity", ".85")
                        .style("stroke","grey")
                        .style("stroke-width", "0.5")
                        .on("mouseover", function(d){
                            d3.select(this).transition()
                                .duration('50')
                                .attr('opacity', '1')
                                .style("stroke-width", "1")
                            // .style("stroke", "black");
                            return tooltip.style("visibility", "visible").text(d.id + "\n\n" + boroughKillFreq[d.id] + " deaths");
                        })
                        .on("mousemove", function(d){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
                        .on("mouseout", function(d){
                            d3.select(this).transition()
                                .duration('50')
                                .attr('opacity', '.85')
                                .style("stroke", "grey")
                                .style("stroke-width", "0.5");

                            return tooltip.style("visibility", "hidden");
                        });

                });
        }, 500);
    }, 500);

    //weapon legend
    let weapons = ["Arson", "Blunt Object", "Gun", "Knife", "Ligature", "None", "Other", "Poison", "Strangulation", "Vehicle"];

    let weaponColors = ["red", "#cc79a7", "#0072b2","#f0e442", "#D81B60", "#1E88E5", "#000000", "lime", "#F32AD1", "grey"];

    let weaponIcons = ["\uf7e4","\uf6e3","\uf05b", "\uf2e7", "\uf5b7", "\uf057", "\uf059", "\uf714", "\uf6de", "\uf5e1"];

    d3.csv('homicideEdit.csv')
        .then(data=>{
            svg.selectAll("weapon-icons")
                .data(weaponIcons)
                .enter()
                .append("text")
                .attr("class", "fa")
                .attr("font-family", "FontAwesome")
                .attr("font-size", "12px")
                .attr("x", 860)
                .attr("y", function(d,i) { return 200 + i*25;})
                .style("fill", function(d,i) {return weaponColors[i];})
                .text(function(d) {return d;})
            svg.selectAll("weapon-label")
                .data(weapons)
                .enter()
                .append("text")
                .attr("x", 900)
                .attr("y", function(d,i) { return 200 + i*25;})
                .attr("text-anchor", "left")
                .text(function(d) { return d})
        });

    barsplot();

}

const margins = {top: 200, right: 300, bottom: 0, left: 300};

function barsplot() {

    var weapons = ["Arson", "Blunt Object", "Gun", "Knife", "Ligature",
        "None", "Other", "Poison", "Strangulation", "Vehicle"];

    var data = [3, 28, 64, 421, 7, 200, 40, 10, 2, 14];

    let weaponColors = ["red", "#cc79a7", "#0072b2","#f0e442", "#D81B60", "#1E88E5", "#000000", "lime", "#F32AD1", "grey"];

    let chart = d3.select("svg");
    // if (chart.select(".inner").empty()) makeInnerArea(chart);

    //scales
    let xscale = d3.scaleBand(weapons, [0, 800])
        .padding(100);
    let yscale = d3.scaleLinear([0, 450], [400, 0]);

    //axes
    let xaxis = d3.axisBottom(xscale);
    let yaxis = d3.axisLeft(yscale);
    let axes = [xaxis, yaxis];

    //bars
    let bars = chart.selectAll(".bar").data(data);

    bars.enter().append("rect").attr("class", "bar")
        .merge(bars)
        .attr("x", function(d,i) { return i*100 + 100;})
        .attr("y", (d,i) => (500))
        .attr("width", xscale.bandwidth() + 25 )
        .attr("height", function(d,i) { return data[i]+2;})
        .attr("fill", function(d,i) { return weaponColors[i] ;});
    bars.enter()
        .append("text")
        .attr("class", "label")
        .attr("x", function(d,i) { return i*100 + 100})
        .attr("y", 490)
        .text(function(d,i) { return weapons[i]; });

}