function loadVariation4() {
	document.getElementById("board").innerHTML = "";
    'use strict';
    var mapScale = 80000;
    var mapTranslateX = 750;
    var mapTranslateY = mapScale * 0.99388888888888;


    const weaponsColour = {Arson: "#FF0000",
        "Blunt Object": "#00FF00",
        Gun: "#0000FF",
        Knife: "#FFFFFF",
        Ligature: "#FF00FF",
        None: "#00FFFF",
        Other: "#000000",
        Poison: "#FFFF00",
        Strangulation: "#F32AD1",
        Vehicle: "#0FF022"};

    const sexOfVicSus = {MM: "#FFFFFF",
        MF: "#FFFF00",
        FM: "#FF00FF",
        FF: "#0000FF",
        F: "#000000",
        M: "#F32AD1"};

    const weaponsIcon = {Arson: "\uf7e4",
        "Blunt Object": "\uf6e3",
        Gun: "\uf05b",
        Knife: "\uf506",
        Ligature: "\uf5b7",
        None: "\uf057",
        Other: "\uf059",
        Poison: "\uf714",
        Strangulation: "\uf6de",
        Vehicle: "\uf5e1"};


    const svg = d3.select('svg');
    const width = svg.attr("width");
    const height = svg.attr("height");
    console.log(width);
    console.log(height);

    const projection = d3.geoPatterson()
        .scale(mapScale)
        .translate([mapTranslateX, mapTranslateY]);

    const pathGenerator = d3.geoPath().projection(projection);

    var boroughKillFreq = {};

    svg.append('path')
        .attr('class', 'sphere')
        .attr('d', pathGenerator({type: 'Sphere'}));

    const color = d3.scaleLinear()
        .domain([0, 10])
        .range(["#90EE90", "red"]);

    let maxDead = 0;

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
                    var strLen = d.date.length;
                    var year = d.date.slice(strLen-4,strLen);
                    return (year == '2012');
                }))
                    .enter()
                    .append("g");
                g.append("text")
                    .attr("class","fa")
                    .attr('text-anchor', 'middle')
                    .attr("x", function(d) {
                        boroughKillFreq[d.ladnm] = boroughKillFreq[d.ladnm] + 1;
                        if (boroughKillFreq[d.ladnm] > maxDead) maxDead = boroughKillFreq[d.ladnm];
                        return projection([d.longitude, d.latitude])[0];
                    })
                    .attr("y", function(d) {return projection([d.longitude, d.latitude])[1];})
                    .attr("font-size", function(d) {
                        if (d.vicage < 20) return "12px";
                        else if (d.vicage < 40) return "15px";
                        else if (d.vicage < 60) return "18px";
                        else if (d.vicage < 80) return "21px";
                        else return "24px";
                    })//"20px")
                    .style("stroke", "#000000")
                    .style("fill", function(d) {
                        let sexCode = d.vicsex + d.sussex;
                        return sexOfVicSus[sexCode];
                    })
                    .text(function(d) {return weaponsIcon[d.weapon];})
                    .on("mouseover", function(d){
                        d3.select(this).transition()
                            .duration('50')
                            .attr('opacity', '.85');
                    })
                    .on("mouseout", function(d){
                        d3.select(this).transition()
                            .duration('50')
                            .attr('opacity', '1');
                    });
                    // .on('mouseover', function (d, i) {
                    //     console.log("Borough[data]: " + d.ladnm); console.log("Borough[data]: " + d.latitude);});

                //1200, 50
                let legendX = 1105;
                let legendY = 390;
                g.append("rect")
                    .attr("x", legendX)
                    .attr("y", legendY)
                    .style("position", "absolute")
                    .style("width", "150px")
                    .style("height", "400px")
                    .style("fill", "lightgrey")
                    .style("stroke", "black");

                g.append("text")
                    .attr("x", legendX+5)
                    .attr("y", legendY+18)
                    .style("font-size", "20px")
                    .text("Legend:");

                g.append("text")
                    .attr("x", legendX+5)
                    .attr("y", legendY+38)
                    .style("font-size", "16px")
                    .text("Murder Weapon");

                let offset = 0;

                for (var x = 0; x < Object.keys(weaponsIcon).length; x++) {
                    g.append("text")
                        .attr("class","fa")
                        .attr("x", legendX+5)
                        .attr("y", legendY+58)
                        .attr("dy", offset+"em")
                        .style("font-size", "14px")
                        .text(function(d) {return weaponsIcon[Object.keys(weaponsIcon)[x]] + " - " + Object.keys(weaponsIcon)[x];});
                    offset++;
                }

                g.append("text")
                    .attr("x", legendX+5)
                    .attr("y", legendY+210)
                    .style("font-size", "16px")
                    .text("Sex of Victim/Suspect");


                g.append("text")
                    .attr("x", legendX+25)
                    .attr("y", legendY+233)
                    .style("font-size", "14px")
                    .text("M/M");

                g.append("text")
                    .attr("x", legendX+25)
                    .attr("y", legendY+253)
                    .style("font-size", "14px")
                    .text("M/F");

                g.append("text")
                    .attr("x", legendX+25)
                    .attr("y", legendY+273)
                    .style("font-size", "14px")
                    .text("F/M");

                g.append("text")
                    .attr("x", legendX+25)
                    .attr("y", legendY+293)
                    .style("font-size", "14px")
                    .text("F/F");

                g.append("text")
                    .attr("x", legendX+25)
                    .attr("y", legendY+313)
                    .style("font-size", "14px")
                    .text("F/?");

                g.append("text")
                    .attr("x", legendX+25)
                    .attr("y", legendY+333)
                    .style("font-size", "14px")
                    .text("M/?");

                g.append("rect")
                    .attr("x", legendX+5)
                    .attr("y", legendY+220)
                    .style("position", "absolute")
                    .style("width", "15px")
                    .style("height", "15px")
                    .style("fill", sexOfVicSus["MM"]);

                g.append("rect")
                    .attr("x", legendX+5)
                    .attr("y", legendY+240)
                    .style("position", "absolute")
                    .style("width", "15px")
                    .style("height", "15px")
                    .style("fill", sexOfVicSus["MF"]) ;

                g.append("rect")
                    .attr("x", legendX+5)
                    .attr("y", legendY+260)
                    .style("position", "absolute")
                    .style("width", "15px")
                    .style("height", "15px")
                    .style("fill", sexOfVicSus["FM"]);

                g.append("rect")
                    .attr("x", legendX+5)
                    .attr("y", legendY+280)
                    .style("position", "absolute")
                    .style("width", "15px")
                    .style("height", "15px")
                    .style("fill", sexOfVicSus["FF"]);

                g.append("rect")
                    .attr("x", legendX+5)
                    .attr("y", legendY+300)
                    .style("position", "absolute")
                    .style("width", "15px")
                    .style("height", "15px")
                    .style("fill", sexOfVicSus["F"]) ;

                g.append("rect")
                    .attr("x", legendX+5)
                    .attr("y", legendY+320)
                    .style("position", "absolute")
                    .style("width", "15px")
                    .style("height", "15px")
                    .style("fill", sexOfVicSus["M"]);



                g.append("text")
                    .attr("x", legendX+5)
                    .attr("y", legendY+358)
                    .style("font-size", "16px")
                    .text("Freq. of Murders");

                g.append("text")
                    .attr("x", legendX+1)
                    .attr("y", legendY+373)
                    .style("font-size", "14px")
                    .text("0");

                g.append("text")
                    .attr("x", legendX+130)
                    .attr("y", legendY+373)
                    .style("font-size", "14px")
                    .text(maxDead);


                let xR = 4;
                for (let x = 0; x < 10; x++) {
                    g.append("rect")
                        .attr("x", legendX+xR)
                        .attr("y", legendY+375)
                        .style("position", "absolute")
                        .style("width", "15px")
                        .style("height", "15px")
                        .style("fill", color(x));
                    xR += 14;
                }

        });

    //.attr('fill',function(d,i) { return color(i); });
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
                        .on("mouseover", function(d){
                            d3.select(this).transition()
                                .duration('50')
                                .attr('opacity', '.85');
                            return tooltip.style("visibility", "visible").text(d.id + "\n\n" + boroughKillFreq[d.id] + " deaths");
                        })
                        .on("mousemove", function(d){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
                        .on("mouseout", function(d){
                            d3.select(this).transition()
                                .duration('50')
                                .attr('opacity', '1');
                            return tooltip.style("visibility", "hidden");
                        });



                });
        }, 500);
    }, 500);



}