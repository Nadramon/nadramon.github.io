function loadVariation1() {
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


    const svg = d3.select('svg')
        .call(d3.zoom()
            .on("zoom", function () {
                if(d3.event.transform.k < 24){
                    svg.attr("transform", d3.event.transform);
                    updateIcons();
                }
    }));



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
        .range(["#90EE90", "red"]);

    var maxDead = 0;

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
                    .attr("class","fa")
                    .attr('text-anchor', 'middle')
                    .attr("x", function(d) {
                        boroughKillFreq[d.ladnm] = boroughKillFreq[d.ladnm] + 1;
                        if (boroughKillFreq[d.ladnm] > maxDead) maxDead = boroughKillFreq[d.ladnm];
                        return projection([d.longitude, d.latitude])[0];
                    })
                    .attr("y", function(d) {return projection([d.longitude, d.latitude])[1];})
                    .attr("font-size","12")
                    .style("stroke", "#000000")
                    .style("fill", function(d) {return weaponsColour[d.weapon];})
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

function updateIcons(transform){
    const svg = d3.select('svg');
    console.log(d3.event.transform);
    svg.selectAll("g").select("text")
            .attr("font-size", (1/d3.event.transform.k) * 12)
            .attr("stroke-width", (1/d3.event.transform.k));
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNlbGVjdCwganNvbiwgZ2VvUGF0aCwgZ2VvTmF0dXJhbEVhcnRoMSB9IGZyb20gJ2QzJztcbmltcG9ydCB7IGZlYXR1cmUgfSBmcm9tICd0b3BvanNvbic7XG5cbmNvbnN0IHN2ZyA9IHNlbGVjdCgnc3ZnJyk7XG5cbmNvbnN0IHByb2plY3Rpb24gPSBnZW9OYXR1cmFsRWFydGgxKCk7XG5jb25zdCBwYXRoR2VuZXJhdG9yID0gZ2VvUGF0aCgpLnByb2plY3Rpb24ocHJvamVjdGlvbik7XG5cbnN2Zy5hcHBlbmQoJ3BhdGgnKVxuICAgIC5hdHRyKCdjbGFzcycsICdzcGhlcmUnKVxuICAgIC5hdHRyKCdkJywgcGF0aEdlbmVyYXRvcih7dHlwZTogJ1NwaGVyZSd9KSk7XG5cbmpzb24oJ2h0dHBzOi8vdW5wa2cuY29tL3dvcmxkLWF0bGFzQDEuMS40L3dvcmxkLzExMG0uanNvbicpXG4gIC50aGVuKGRhdGEgPT4ge1xuICAgIGNvbnN0IGNvdW50cmllcyA9IGZlYXR1cmUoZGF0YSwgZGF0YS5vYmplY3RzLmNvdW50cmllcyk7XG4gICAgc3ZnLnNlbGVjdEFsbCgncGF0aCcpLmRhdGEoY291bnRyaWVzLmZlYXR1cmVzKVxuICAgICAgLmVudGVyKCkuYXBwZW5kKCdwYXRoJylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NvdW50cnknKVxuICAgICAgICAuYXR0cignZCcsIHBhdGhHZW5lcmF0b3IpO1xuICB9KTsiXSwibmFtZXMiOlsic2VsZWN0IiwiZ2VvTmF0dXJhbEVhcnRoMSIsImdlb1BhdGgiLCJqc29uIiwiZmVhdHVyZSJdLCJtYXBwaW5ncyI6Ijs7O0VBR0EsTUFBTSxHQUFHLEdBQUdBLFNBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzs7RUFFMUIsTUFBTSxVQUFVLEdBQUdDLG1CQUFnQixFQUFFLENBQUM7RUFDdEMsTUFBTSxhQUFhLEdBQUdDLFVBQU8sRUFBRSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQzs7RUFFdkQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7RUFDbEIsS0FBSyxJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQztFQUM1QixLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFaERDLFNBQUksQ0FBQyxxREFBcUQsQ0FBQztFQUMzRCxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUk7RUFDaEIsSUFBSSxNQUFNLFNBQVMsR0FBR0MsZ0JBQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztFQUM1RCxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7RUFDbEQsT0FBTyxLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO0VBQzdCLFNBQVMsSUFBSSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUM7RUFDakMsU0FBUyxJQUFJLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0VBQ2xDLEdBQUcsQ0FBQzs7OzsifQ==