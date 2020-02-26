/**
	chartMaker - All in one JS file for making echarts

	@author Rahmanta Nadhif Satriana
			rsnadhif@gmail.com
*/


//Colours for chart items and text, repeat of 12 colours
if (true) {
	
var theBlue = new echarts.graphic.LinearGradient(0, 0, 1, 0, [{offset: 0, color: '#6789B2'}, {offset: 1, color: '#275791'}]);
var theBlueSolo = '#275791';

var oneYearColour = {OilRec: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{offset: 0, color: '#9CF99C'}, {offset: 1, color: '#5AF55A'}]),
					OilProd: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{offset: 0, color: '#9CF99C'}, {offset: 1, color: '#5AF55A'}]),
					NFA: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{offset: 0, color: '#6789B2'}, {offset: 1, color: '#275791'}]),
					NewOil: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{offset: 0, color: '#F3D04C'}, {offset: 1, color: '#EFBD00'}]),
					PDO: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{offset: 0, color: '#AD666E'}, {offset: 1, color: '#8B2530'}]),
					Medco: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{offset: 0, color: '#A186B6'}, {offset: 1, color: '#633686'}]),
					OilPot: '#FFB7B7',
					Wells: '#B95C00',
					RF: '#0000FF',
					Deferment: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{offset: 0, color: '#B2B2B2'}, {offset: 1, color: '#808080'}]),
					DefRec: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{offset: 0, color: '#B2B2B2'}, {offset: 1, color: '#808080'}]),
					SDEF: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{offset: 0, color: '#F5D766'}, {offset: 1, color: '#EFBD00'}]),
					UDEF: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{offset: 0, color: '#ADA2C7'}, {offset: 1, color: '#7764A2'}]),
					Average1: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{offset: 0, color: '#66B2FF'}, {offset: 1, color: '#0080FF'}]),
					Average2: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{offset: 0, color: '#FF7F7F'}, {offset: 1, color: '#FF0000'}]),
					Outlook: '#0080FF',
					Target: '#FF0000',
					ANB: '#6495ED',
					APPR: '#FF178B',
					AQ: '#DB7093',
					ARD: '#FFD700',
					BAH: '#FFEC8B',
					BM: '#FF9A35',
					EXP: '#AAAAAA',
					GMR: '#CAFF70',
					GZ: '#BBFFFF',
					HJ: '#C1FFC1',
					HJNE: '#804000',
					HJSW: '#804000',
					ID: '#8E388E',
					ILH: '#388E8E',
					JDR: '#7D9EC0',
					JDRW: '#A8A800',
					KM: '#9F79EE',
					KMN: '#FFBBFF',
					NSM: '#E6E6FA',
					SL: '#FFF68F',
					"TANK-1": '#71C671',
					"TANK-2": '#C5C1AA',
					"TANK-3": '#8E8E38',
					"TANK-4": '#4EEE94',
					"RESERVES": '#C67171',
					SMALL: '#FF3333',
					WPH: '#FF66FF',
					AWPH: '#FF3333',
					UP: '#FFFF00'};
					
var oneYearColourSolo = {OilRec: '#5AF55A',
					NFA: '#275791',
					NewOil: '#EFBD00',
					PDO: '#8B2530',
					Medco: '#633686',
					OilPot: '#FFB7B7',
					Wells: '#B95C00',
					RF: '#0000FF',
					Deferment: '#808080',
					DefRec: '#808080',
					SDEF: '#EFBD00',
					UDEF: '#7764A2',
					Average1: '#0080FF',
					Average2: '#FF0000',
					Outlook: '#0080FF',
					Target: '#FF0000',
					ANB: '#6495ED',
					APPR: '#FF178B',
					AQ: '#DB7093',
					ARD: '#FFD700',
					BAH: '#FFEC8B',
					BM: '#FF9A35',
					EXP: '#AAAAAA',
					GMR: '#CAFF70',
					GZ: '#BBFFFF',
					HJ: '#C1FFC1',
					HJNE: '#804000',
					HJSW: '#804000',
					ID: '#8E388E',
					ILH: '#388E8E',
					JDR: '#7D9EC0',
					JDRW: '#A8A800',
					KM: '#9F79EE',
					KMN: '#FFBBFF',
					NSM: '#E6E6FA',
					SL: '#FFF68F',
					SSM: '#71C671',
					WEN: '#C5C1AA',
					WRD: '#8E8E38',
					YM: '#4EEE94',
					ZRA: '#C67171',
					SMALL: '#FF3333',
					WPH: '#FF66FF',
					AWPH: '#FF3333',
					UP: '#FFFF00'};
}

		
		
//Main function
/* Parameter Definitions
raw - the primary data for the chart
title - title of chart
placement - div id to place the chart on pageX
chartType - type of chart
comboDefs - For combo chart, defines type (area, bar, line) and also multiple axisLabel
notWidget - boolean for widget chart or a normal chart
stacked - For combo chart, defines whether bar is stacked or side by side
extra0 - any extra data required
extra1 - any extra data required, also used for yAxis labels
*/
function createChart(raw, title, placement, chartType, comboDefs = [[0, 0, 0]], notWidget = true, stacked = true, extra0 = [], extra1 = ['m3/d']) {
	
	//variable initiation
	var legends = [], categories = [], information = [], temp = '', data = "", innerKeys = "", categoryIndex = 0, categoryKey = "",
		theColourSolo = '', theColour = [], tlbxShow = notWidget;
	
	
	if (extra0=="dashboard" || extra1=="dashboard") {tlbxShow = false; title = "";}
	
	document.getElementById(placement).style.width = '100%';




	//Format the data (get keys and change to float)
	temp = formatData(raw, chartType);
	data = temp[0];
	innerKeys = temp[1];
	
	
	//Get the main values for chart, aka the data, legends and labels
	if(chartType == 0) {
		categoryKey = innerKeys[categoryIndex];
		temp = comboChart(data, notWidget, innerKeys, categoryIndex, comboDefs, stacked, theColourSolo);
		theColour = temp[3];
		if (temp[3].length != 0) theColourSolo = temp[4];
	}
	else if (chartType == 2){
		temp = waterfallChart(data, innerKeys, extra0);
	}
	else if (chartType == 3){
		temp = scatterChart(data, innerKeys);
	}
	else if(chartType == 5) {
		temp = barOfPieChart(data, innerKeys, theColour);
	}	
	else if(chartType == 5.5) { //special dashboard one
		temp = formatData(extra1[0], chartType);
		data2 = temp[0];
		innerKeys2 = temp[1];
		temp = dashboardFieldChart(data, innerKeys, theColour, data2, innerKeys2);
	}	
	else if(chartType >= 10) {
		temp = pieChart(data, innerKeys);
		if(chartType == 11) {
			temp[2] = donutChart(temp[2], notWidget);
			
		}
		else if(chartType == 12) {
			temp[2] = rosePieChart(temp[2]);
		}
		else if(chartType == 13) {
			extra0 = formatData(extra0, 5);
			extra0 = extra0[0];
			var innerKeysextra0 = Object.keys(extra0[Object.keys(extra0)[0]]);
			extra0 = pieChart(extra0, innerKeysextra0);
			data = [temp, extra0];
			temp = pieOfPieChart(data);
		}
		
		else if(chartType == 14) {
			extra0 = formatData(extra0, 5);
			extra0 = extra0[0];
			var innerKeysextra0 = Object.keys(extra0[Object.keys(extra0)[0]]);
			extra0 = pieChart(extra0, innerKeysextra0);
			data = [temp, extra0];
			temp = nestedPieChart(data);
		}
	}

	
	
	legends = temp[0];
	categories = temp[1];
	information = temp[2];
	
	
	//Start making the Chart Options
	var chart = echarts.init(document.getElementById(placement));
	var option = {
		title: {
			text: title,
			left: 'center'
		},
		tooltip :  {
			show: notWidget,
			textStyle: {fontSize: 10},
			axisPointer: {
				type: 'cross',
				show: notWidget,
				label: {fontSize: 10},
				crossStyle: {
					color: '#999'
				}
			}
		},
		graphic: {elements: [{
			type: 'image',
			invisible: !tlbxShow,
			right: '0px',
			bottom: '30px',
			style: {
				image: 'images/medco_energi_logo.png',
				width: 35
			}
		}]
		},
		toolbox: {
			orient: 'vertical',
			emphasis: {iconStyle: {textPosition: 'left', textAlign: 'right'}},
			feature: {
				show: notWidget,
				saveAsImage: {show: true, title: "Save as Image"},
				restore: {show: true, title: "Restore"},
				dataView: {show: true, readOnly: false, title: "Table View", lang: ['Table View', 'Close', 'Update']}	
			},
			show: tlbxShow
		},	 
		legend: {
			data: legends,
			show: notWidget,
			itemWidth: 20,
			itemHeight: 11,
			left: 'center',
			bottom: '0',
			textStyle: {fontSize: 10}
		},
		series: information
	};
	
	
	//Colors
	if (true) {
	if (theColour.length != 0) {
		option['color'] = theColour;
	}
	if (!notWidget && chartType == 0) option['color'] = ["#769EF4"];
	}
	
	//Tooltips
	if (true) {
	if (chartType >= 10) {	
		option['tooltip']['trigger'] =  'item';
		option['tooltip']['formatter'] = "{a} <br/>{b}: {c} ({d}%)";
	}
	else if(chartType == 2) {
		option['tooltip']['trigger'] =  'axis';
		//option['tooltip']['textStyle'] = {fontSize: 10};
		option['tooltip']['axisPointer'] = {type: 'shadow'};
		option['tooltip']['formatter'] = function (params) {
											var tar;
											if (params[1].value != '-') {
												tar = params[1];
											}
											else {
												tar = params[2];
											}

											if (tar.name.length > 5) {
												return tar.name + '<br/>' + tar.value + ' m<sup>3</sup>/d';
											}
											else{
												return tar.name + '<br/>' + tar.value + ' m<sup>3</sup>/d ' + tar.seriesName;
											}
										};
	}
	else if(chartType == 5) {
		option['tooltip']['trigger'] =  'item';
		option['tooltip']['formatter'] = "{a} <br/>{b}: {c} ({d}%)";
	}
	else if(chartType == 5.5){
		option['tooltip']['trigger'] =  'axis';
		option['tooltip']['formatter'] = "{b} <br/>{a}: {c} m<sup>3</sup>/d";
		if (extra0 == "dashboard") {
		temp = formatData(extra1[1], chartType);
		data3 = temp[0];
		innerKeys3 = temp[1];
		option['tooltip']['formatter'] = function (params) {
									var tooltipText = params[0].name + "<br>- " + params[0].seriesName + ": " + params[0].value +  " m<sup>3</sup>/d<br>";
									for (x = 1; x < innerKeys3.length; x++) {
										tooltipText += "- " + innerKeys3[x] + ": " + data3[params[0].dataIndex][innerKeys3[x]].toFixed(2) +  " m<sup>3</sup>/d<br>";
									}
									return tooltipText;
								};
		}
	}
	else if(chartType == 0 && theColourSolo != "") {
		option['tooltip']['formatter'] = function (params) {				
									var tooltipText = params.name + "<br>";
									for (x = 0; x < information.length; x++) {
										if (information[x]['data'][params.dataIndex] != "NaN") {
											tooltipText += "<span style='height: 10px; width: 10px; background-color: " + theColourSolo[x] + "; border-radius: 50%; display: inline-block;'></span> " + innerKeys[x+1] + ": " + information[x]['data'][params.dataIndex] +  " m<sup>3</sup>/d<br>";
										}
									}
									return tooltipText;
								};
	}
	else {
		option['tooltip']['trigger'] =  'axis';
	}
	}
	
	//Toolbox
	if (true) {
	if (chartType == 0) {
		option['toolbox']['feature']['magicType'] = {show: true, title: {stack: 'Stacked', bar: 'Bar'}, type: ['stack', 'bar']}
	}
	else if (chartType == 2) {
		option['toolbox']['feature']['dataView'] = {show: false};
		option['toolbox']['feature']['restore'] = {show: false};
	}
	}
	
	//xAxis
	if (true) {
	if (chartType == 3) {
		option['xAxis'] = {};
	}
	else if (chartType < 10) {
		var jumps = 3;
		if (categories.length <= 15) {
			jumps = 0;
		}
		else if (categories.length > 30) {
			jumps = 11;
		}
		option['xAxis'] = {
			data: categories,
			show: notWidget,
			axisLabel: {interval: jumps,
						fontSize: 10}
		};
	}
	}
	
	
	//yAxis
	if (true) {
	if (chartType == 2) {
		option['yAxis'] = {show: false};
	}
	else if (chartType == 3) {
		option['yAxis'] = {};
	}
	else if (chartType < 10) {
		
		if (!notWidget) { //for widgets
			option['yAxis'] = {show: notWidget};
			var minimum = 100000000;
			var maximum = -1;
			
			for (x = 0; x < data.length; x++) {
				if (data[x][innerKeys[1]] < minimum) {
					minimum = data[x][innerKeys[1]];
				}
				if (data[x][innerKeys[1]] > maximum) {
					maximum = data[x][innerKeys[1]];
				}
			}

			var range = maximum - minimum;
			if (innerKeys[1] == 'RF') {
					maximum += 0.01;
					minimum -= 0.01;
			}
			else if (data.length == 15 && innerKeys[1] == 'OilPot'){
				minimum -= 100;
				maximum += 1;
			}
			else if (data.length == 15){
				minimum -= 1;
				maximum += 1;
			}
			else if (innerKeys[1] == 'NewOil') {
				maximum += maximum + (range/2);
				minimum = 0;
			}
			else if (innerKeys[1] == 'NFA') {
				maximum += 1;
				if (maximum == (minimum + 1)) minimum = 0;
				else minimum = minimum - (range*2);
			}
			else {
				maximum += 1;
				minimum = 0;
			}
			option['yAxis']['min'] = minimum;
			option['yAxis']['max'] = maximum;
		}
		
		else if (extra0 == "dashboard") {
			option['yAxis'] = {show: false};
		}
		else {
			
			option['yAxis'] = [];
			
			
			var toggle = true;
			var offset = 0;
			var totalData = 0;
			
			for (x = 0; x < comboDefs.length; x++) {
				
				if (extra0=="dashboard") lab  = 'm3/d';
				else lab = extra1[x];
				option['yAxis'].push({show: notWidget, axisLabel: {fontSize:10}, offset: offset, name: lab});
				
				
				if (toggle) {
					option['yAxis'][x]['position'] = 'left';
					toggle = false;
				}
					
				else {
					option['yAxis'][x]['position'] = 'right';
					toggle = true;
				}
				
/*				if (comboDefs.length > 1 && theColourSolo != "") {
					option['yAxis'][x]['axisLine'] = {lineStyle: {color: theColourSolo[totalData]}};
				}
*/
				
				var maximum = -1, minimum = 90000;
				
				for (y = 0; y < comboDefs[x].length; y++) {
					
					
						
					for (z = 0; z < comboDefs[x][y]; z++) {
						
						
						
						totalData++;
						for (w = 0; w < data.length; w++) {
							if (data[w][innerKeys[totalData]] < minimum) {
								minimum = data[w][innerKeys[totalData]];
							}
							if (data[w][innerKeys[totalData]] > maximum) {
								maximum = data[w][innerKeys[totalData]];
							}
						}
					}
				}
				
				if (maximum < 2 && maximum > 0) {
					maximum += 0.01;
					minimum -= 0.01;
					option['yAxis'][x]['min'] = minimum.toFixed(2);
					option['yAxis'][x]['max'] = maximum.toFixed(2);
				}
				else if (extra1[x] == 'Wells' && maximum < 50) {
					maximum += 1;
					minimum  = 0;
					option['yAxis'][x]['min'] = minimum;
					option['yAxis'][x]['max'] = maximum;
				}
				else if (extra1[x] == 'Wells') {
					range = maximum - minimum;
					maximum += range;
					minimum -= range;
					option['yAxis'][x]['min'] = minimum;
					option['yAxis'][x]['max'] = maximum;
				}

				
				if (x % 2 != 0) {
					offset += 50;
					
				}
					
			}
		}

	}
	}
	
	//Graphic
	if (true) {
	if (!notWidget && chartType == 11) {		
		option['graphic']['elements'][1] = {type: 'text',
											top: '5px',
											style: {text: ('Total Def.: ' + (parseFloat(extra0).toFixed(2)) + ' m3/d'), fill: "#FFFFFF"}};
		
		
	}
	}

	
	//Grid
	if (true) {
	if (chartType == 5 || chartType == 5.5) {
		option['grid'] = [{
		top: '10%',
        width: '50%',
        bottom: '15%',
        left: 0,
        containLabel: true
		}]
	}
	else if (extra0 == "dashboard" && chartType == 0) {
		option['grid'] = {
		top: '0%',
        bottom: '15%',
        left: '0%',
        right: '0%' 
		}
	}
	else if (extra1 == "dashboard" && chartType == 2) {
		option['grid'] = {
		top: '0%',
        bottom: '10%',
        left: '2%',
        right: '2%' 
		}
	}
	else if (chartType == 0 && comboDefs.length > 1) {
		option['grid'] = {right: '15%',
					left: '15%'};
	}
	else if (!notWidget) {
		option['grid'] = {
		top: '0%',
        width: '100%',
        bottom: '0%',
        left: 0
		}
	}
	}

	//Special Interactions
	if (true) {
	if (chartType == 5) {		
		barOfPieSetConnection(chart, data, innerKeys);
	}	
	else if (chartType == 5.5) {	
		temp0 = formatData(extra1[0], chartType);
		data2 = temp0[0];
		dashboardFieldConnection(chart, data, data2, innerKeys);
	}	
	else if(chartType == 13) {
		pieOfPieSetConnection(chart);
	}
	}
	
	
	chart.setOption(option);
}


//Chart Selections
function comboChart(data, notWidget, innerKeys, categoryIndex, sets, stacked, colours, coloursSolo) { //chartType = 0 Bar, Line and Area Charts, single or combo'd
	
	//data for echarts
	var legends = [];
	var information = [];
	var categories = [];
	var chosenColours = [];
	var chosenColoursSolo = [];
	//Get the legends (without category label)
	for (x = 1; x < innerKeys.length; x++) {
		if (innerKeys[x] == 'Average1' || innerKeys[x] == 'Average2') ;
		else legends.push(innerKeys[x]);
	}
	
	
	var totalItems = 0;
	
	for (x = 0; x < sets.length; x++) {
		for (y = 0; y < sets[0].length; y++) {
			for (z = 0; z < sets[x][y]; z++) {
				
				information[totalItems] = {};
				information[totalItems]['name'] = innerKeys[totalItems + 1];
				information[totalItems]['yAxisIndex'] = x;
				information[totalItems]['data'] = [];
				if (oneYearColour[innerKeys[totalItems + 1]] != null) chosenColours.push(oneYearColour[innerKeys[totalItems + 1]]);
				if (oneYearColour[innerKeys[totalItems + 1]] != null) chosenColoursSolo.push(oneYearColourSolo[innerKeys[totalItems + 1]]);
				
				if (y == 0) {
					//area
					information[totalItems]['type'] = 'line';
					information[totalItems]['areaStyle'] = {};
					information[totalItems]['stack'] =  'areaStack';
					information[totalItems]['symbol'] = 'none';
					
							
				}
				else if (y == 1) {
					//bar
					information[totalItems]['type'] = 'bar';
					information[totalItems]['itemStyle'] = {shadowColow: '#000000',
						shadowBlur: 4};
					if (stacked) {
						information[totalItems]['stack'] =  'barStack';
					}
					
					
				}
				else if (y == 2) {
					//line
					information[totalItems]['type'] = 'line';
					//information[totalItems]['clipOverflow'] = false;
					information[totalItems]['lineStyle'] = {width: 4};
					if (!notWidget) {
						information[totalItems]['symbol'] = 'none';
						if (data.length == 15) information[totalItems]['smooth'] = true;
					}
					if (innerKeys[totalItems+1] == 'Outlook') information[totalItems]['lineStyle'] = {type: 'dashed'};
				}
				
				
				for (w = 0; w < data.length; w++ ) {
					if (innerKeys[totalItems + 1] == "RF") information[totalItems]['data'].push((data[w][innerKeys[totalItems + 1]].toFixed(4)));
					else information[totalItems]['data'].push((data[w][innerKeys[totalItems + 1]].toFixed(2)));
				}
				totalItems++;
			}
		}
	}
			
	//make sure the order is kept, area then bar then line
	len = information.length;
	var swapped = true;
	while (swapped) {
		swapped = false;
		for (x = 1; x < len-1; x++) {
			
			var prev = information[x - 1]['type'];
			var current = information[x]['type'];			
			if (Object.keys(information[x - 1]).length > 5) prev = "area";
			if (Object.keys(information[x]).length > 5) current = "area";

			
			if (prev > current) {
				var temp = information[x - 1];
				information[x - 1] = information[x];
				information[x] = temp;
				if (chosenColours.length != 0) {
					var temp2 = chosenColours[x - 1];
					chosenColours[x - 1] = chosenColours[x];
					chosenColours[x] = temp2;
				}
				swapped = true;
			}
		}
		x = x - 1;
	}
	
	
	for (x = 0; x < data.length; x++) {
		categories[x] = data[x][innerKeys[categoryIndex]];			
	}

	return [legends, categories, information, chosenColours, chosenColoursSolo];
}
function waterfallChart(data, innerKeys, extra0, colours) { //chartType = 2
	//data for echarts
	var legends = [];
	var categories = [];
	var information = [];
	
	var diff = [];
	var starts = [];
	var positive = [];
	var negative = [];
	var prev = 0;
	
	var total = 0;
	var target = 0;
	var tempArr = [];
	
	for (x = 0; x < innerKeys.length; x++ ) {
		total += data[0][innerKeys[x]];
		target += data[1][innerKeys[x]];
	}

	//add the target and actual value
	temp0 = {};
	temp0[extra0[0]] = target;
	temp1 = {};
	temp1[extra0[0]] = 0;	
	temp0 = Object.assign({}, temp0, data[0]);
	temp1 = Object.assign({}, temp1, data[1]);
	temp0[extra0[1]] = total;
	temp1[extra0[1]] = 0;
	
	tempArr.push(temp0);
	tempArr.push(temp1);
	data = tempArr;
	
	innerKeys = Object.keys(data[0]);
	
	//calculate the differences
	for (x = 0; x < innerKeys.length; x++) {
		diff.push(parseFloat(data[0][innerKeys[x]]) - parseFloat(data[1][innerKeys[x]]));
		categories.push(innerKeys[x]);
	}

	
	for (x = 0; x < diff.length; x++) {
		if(diff[x] >= 0) {
			positive.push({value: parseInt(diff[x].toFixed(0))});
			negative.push('-');
		}
		else {
			positive.push({value: '-'});
			negative.push(parseInt(Math.abs(diff[x]).toFixed(0)));
		}
	}
	
	for (x = 0; x < innerKeys.length - 1; x++) {
		starts.push(prev);
		
		if (positive[x]['value'] != '-') {
			if(negative[x+1] == '-') {
				prev += positive[x]['value'];
			}
			else {
				prev += positive[x]['value'];
				prev -= negative[x+1];
			}
		}
		else {
			if(positive[x+1]['value'] == '-') {
				prev -= negative[x+1];
			}
		}
		
	}
	
	starts.push(0);
	information[0] = {name: 'gaps',
						type: 'bar',
						stack: 'stack',
						itemStyle: {
							normal: {
								barBorderColor: 'rgba(0,0,0,0)',
								fontSize: 10,
								color: 'rgba(0,0,0,0)'
							},
							emphasis: {
								barBorderColor: 'rgba(0,0,0,0)',
								fontSize: 10,
								color: 'rgba(0,0,0,0)'
							}
						},
						data: starts};
	information[1] = {
						name: 'above',
						type: 'bar',
						stack: 'stack',
						label: {
							normal: {
								show: true,
								fontSize: 10,
								position: 'top'
								
							}
						},
						itemStyle: {
							shadowColow: '#000000',
							shadowBlur: 4,
							color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
									offset: 0,
									color: '#7CFC00'
								}, {

									offset: 1,
									color: '#228B22'
								}])
						},
						data: positive
					};
	information[2] = {
						name: 'below',
						type: 'bar',
						stack: 'stack',
						label: {
							normal: {
								show: true,
								fontSize: 10,
								position: 'bottom'
							}
						},
						itemStyle: {
							shadowColow: '#000000',
							shadowBlur: 4,
							color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
									offset: 0,
									color: '#FF7F7F'
								}, {

									offset: 1,
									color: '#B23000'
								}])
						},
						data: negative
					};
					
	information[1]['data'][0]['itemStyle'] = {color: theBlue};
	information[1]['data'][innerKeys.length-1]['itemStyle'] = {color: theBlue};
					
	return [legends, categories, information];
}
function scatterChart(data, innerKeys) {
	var legends = [];
	var categories = [];
	var information = [];

	information[0] = {};
	information[0]['type'] = 'scatter';
	information[0]['symbolSize'] = '10';
	information[0]['data'] = [];
	for (x = 0; x < data.length; x++) {
		information[0]['data'].push([data[x][innerKeys[0]], data[x][innerKeys[1]]]);
	}
	return [legends, categories, information];
}
function barOfPieChart(data, innerKeys, pieColour) { //chartType = 5
	
	var legends = [];
	var categories = [];
	var information = [];
	
	var barValues = [];
	var pieValues = [];
	
	
	/*
	
	for (x = 1; x < innerKeys.length; x++) {
		legends.push(innerKeys[x]);
		pieValues.push({name: innerKeys[x], value: 0, itemStyle: {color: colours[x]}, label: {color: coloursSolo[x]}});
		for (y = 1; y < data.length; y++) {
			pieValues[x-1]['value'] += data[y][innerKeys[x]];
		}
		pieValues[x-1]['value'] = pieValues[x-1]['value'].toFixed(2);
	}
	
	for (x = 0; x < data.length; x++) {
		categories.push(data[x][innerKeys[0]]);
		barValues.push({value: 0, itemStyle: {color: colours[1] }, label: {color: coloursSolo[1]}});
		for (y = 1; y < innerKeys.length; y++) {
			barValues[x]['value'] += data[x][innerKeys[y]];
		}
		barValues[x]['value'] = barValues[x]['value'].toFixed(2);
	}*/

	
	for (x = 0; x < data.length; x++) {
		legends.push(data[x][innerKeys[0]]);
		pieValues.push({name: data[x][innerKeys[0]], value: 0, itemStyle: {fontSize: 10, color: oneYearColour[data[x][innerKeys[0]]]}, label: {color: oneYearColour[data[x][innerKeys[0]]]}});
		for (y = 1; y < innerKeys.length; y++) {
			pieValues[x]['value'] += data[x][innerKeys[y]];
		}
		pieValues[x]['value'] = (pieValues[x]['value']/(innerKeys.length-1)).toFixed(2);
	}
	
	for (y = 1; y < innerKeys.length; y++) {
		legends.push(innerKeys[y]);
		categories.push(innerKeys[y]);
		barValues.push({value: 0, itemStyle: {fontSize: 10, color: theBlue }, label: {color: theBlueSolo}});
		for (x = 0; x < data.length; x++) {
			barValues[y-1]['value'] += data[x][innerKeys[y]];
		}
		barValues[y-1]['value'] = barValues[y-1]['value'].toFixed(2);
	}


	information = [
        {
            name: 'Date',
            type:'bar',
			itemStyle: {
					shadowColow: '#000000',
					shadowBlur: 4},
			label: {show: true,
					position: 'top',
					fontSize: '10',
					formatter: '{c} m³'},
            data:barValues
        },
        {
            name: innerKeys[0],
            type:'pie',
            radius: ['20%', '55%'],
			center: ['75%', '50%'],
			itemStyle: {
					shadowColow: '#000000',
					shadowOffsetX: -5,
					shadowBlur: 10},
			label: {show: true,
					formatter: '{b}: {c} m³'},
            data:pieValues
        }
    ];

	
	
	return [legends, categories, information]; 
}
function pieChart(data, innerKeys) { //chartType = 10
	//data for echarts
	var legends = [];
	var categories = [];
	var information = [];
	var chosenColours = [];
	
	//Get the legends
	
	information[0] = {};
	information[0]['type'] = 'pie';
	information[0]['radius'] = ['0%', '70%'];
	
	information[0]['name'] = innerKeys[0];
	information[0]['data'] = [];
	information[0]['itemStyle'] =  {
							shadowColow: '#000000',
							shadowOffsetX: -5,
							shadowBlur: 10}
	
	for (x = 0; x < data.length; x++) {
		legends.push(data[x][innerKeys[0]]);
		//console.log(data[x][innerKeys[0]]);
		//console.log(oneYearColour[data[x][innerKeys[0]]]);
		
		information[0]['data'][x] = {};
		information[0]['data'][x]['name'] = data[x][innerKeys[0]];
		information[0]['data'][x]['value'] = data[x][innerKeys[1]].toFixed(2);
		information[0]['data'][x]['itemStyle'] = {color: oneYearColour[data[x][innerKeys[0]]]};
		information[0]['data'][x]['label'] = {color: oneYearColour[data[x][innerKeys[0]]]};
	}
	//console.log(chosenColours);
	

	
	return [legends, categories, information, chosenColours];
}
function donutChart(information, notWidget) { //chartType = 11
	
	var inLabel = {};
	var inNormal = {};
	var inEmphasis = {};
	var inTextStyle = {};
	
	information[0]['radius'] = ['50%', '70%'];
	
	
/*
	
	
	inTextStyle['fontSize'] = '20';
	inTextStyle['fontWeight'] = 'bold';
	
	inEmphasis['show'] = true;
	inEmphasis['textStyle'] = inTextStyle;
	*/
	if (!notWidget) {
		
		inNormal['show'] = false;
		
		inTextStyle['fontSize'] = '10';
		

		
		
		for (x = 0; x < information[0]['data'].length; x++) {
			information[0]['data'][x]['label']['formatter'] = information[0]['data'][x]['name'] + '\n' + parseFloat(information[0]['data'][x]['value']).toFixed(0);	
			information[0]['data'][x]['label']['position'] = 'center';
		}
		
		inEmphasis['show'] = true;
		inEmphasis['textStyle'] = inTextStyle;
		inEmphasis['position'] = 'center';
		inEmphasis['color'] =  '#FFFFFF';
		information[0]['itemStyle'] =  {
							shadowColow: '#000000',
							shadowOffsetX: 0,
							shadowBlur: 10}
		information[0]['radius'] = ['40%', '54%'];
		information[0]['center'] =  ['50%', '65%'];
		information[0]['selectedMode'] =  'multiple';
		information[0]['selectedOffset'] =  2;
		information[0]['avoidLabelOverlap'] = false;
		
		
		
	}
	else {
		inNormal['show'] = true;
		inNormal['position'] = 'outside';
		inNormal['formatter'] = '{b}\n{c} m3/d';
		
	}
	
	inLabel['normal'] = inNormal;
	inLabel['emphasis'] = inEmphasis;
	
	information[0]['label'] = inLabel;

	
	
	
	
	
	
	return information;
	
}
function rosePieChart(information) { //chartType = 12
	information[0]['roseType'] = 'area';
	information[0]['radius'] =  ['20%', '70%'];
	return information;
}
function pieOfPieChart(data) { //chartType = 13
	
	//data for echarts
	var legends = [];
	var categories = [];
	var information = [];
	
	var extra0 = data[1];
	data = data[0];
	
	legends = data[0];
	for (x = 0; x < extra0[0].length; x++) {
		legends.push(extra0[0][x]);
	}
	
	information = data[2];
	information.push(extra0[2][0]);
	
	information[0]['startAngle'] = -20;
	information[0]['selectedMode'] = 'single';
	information[0]['radius'] = ['0%', '60%'];
	information[0]['center'] =  ['30%', '45%'];
	information[0]['selectedOffset'] =  30;
	information[0]['data'][information[0]['data'].length - 1]['selected'] = true;
	information[0]['data'][information[0]['data'].length - 1]['itemStyle'] = {borderColor : '#FFFFFF',
																				borderWidth: 5,
																				borderType: 'dashed'};
	
	information[1]['radius'] = ['0%', '45%'];
	information[1]['center'] =  ['70%', '45%'];
	
	return [legends, categories, information];
}
function nestedPieChart(data) { //chartType = 14
	
	//data for echarts
	var legends = [];
	var categories = [];
	var information = [];
	
	var extra0 = data[1];
	data = data[0];
	
	legends = data[0];
	for (x = 0; x < extra0[0].length; x++) {
		legends.push(extra0[0][x]);
	}
	
	information = data[2];
	information.push(extra0[2][0]);
	
	

	information[0]['radius'] = ['40%', '55%'];
	information[1]['radius'] = ['0%', '30%'];
	information[1]['label'] = {show: false};
	
	return [legends, categories, information];
}

function dashboardFieldChart(data, innerKeys, pieColour, data2, innerKeys2) { //chartType = 5.5
	
	var legends = [];
	var categories = [];
	var information = [];
	
	var barValues = [];
	var pieValues = [];
	var innerPieValues = [];
	
	var forColour = 0;

	
	for (x = 0; x < data.length; x++) {
		legends.push(data[x][innerKeys[0]]);
		pieValues.push({name: data[x][innerKeys[0]], value: 0, itemStyle: {fontSize: 10, color: oneYearColour[data[x][innerKeys[0]]]}});
		forColour ++;
		for (y = 1; y < innerKeys.length; y++) {
			pieValues[x]['value'] += data[x][innerKeys[y]];
		}
		pieValues[x]['value'] = (pieValues[x]['value']/(innerKeys.length-1)).toFixed(2);
	}
	
	for (x = 0; x < data2.length; x++) {
		legends.push(data2[x][innerKeys2[0]]);
		innerPieValues.push({name: data2[x][innerKeys2[0]], value: 0, itemStyle: {fontSize: 10, color: oneYearColour[data2[x][innerKeys2[0]]]}});
		forColour ++;
		for (y = 1; y < innerKeys2.length; y++) {
			innerPieValues[x]['value'] += data2[x][innerKeys2[y]];
		}
		innerPieValues[x]['value'] = (innerPieValues[x]['value']/(innerKeys2.length-1)).toFixed(2);
	}
	
	for (y = 1; y < innerKeys.length; y++) {
		categories.push(innerKeys[y]);
		barValues.push({value: 0, itemStyle: {fontSize: 10, color: theBlue }, label: {color: theBlueSolo}});
		for (x = 0; x < data.length; x++) {
			barValues[y-1]['value'] += data[x][innerKeys[y]];
		}
	}
	
	for (y = 1; y < innerKeys2.length; y++) {
		for (x = 0; x < data2.length; x++) {
			barValues[y-1]['value'] += data2[x][innerKeys2[y]];
		}
		barValues[y-1]['value'] = barValues[y-1]['value'].toFixed(2);
	}


	information = [
        {
            name: 'Oil',
            type:'bar',
			itemStyle: {
					shadowColow: '#000000',
					shadowBlur: 4},
			label: {show: true,
					position: 'top',
					fontSize: '10',
					formatter: '{c}\nm3/d'},
            data:barValues
			
        },
        {
            name: innerKeys[0],
            type:'pie',
            radius: ['40%', '55%'],
			center: ['75%', '50%'],
			itemStyle: {
					shadowColow: '#000000',
					shadowOffsetX: -5,
					shadowBlur: 10},
			label: {show: true,
					formatter: '{b}: {c} m3/d'},
            data:pieValues,
			tooltip: {formatter: "{a} <br/>{b}: {c} m<sup>3</sup>/d", trigger: 'item'}
        },
		{
            name: innerKeys2[0],
            type:'pie', 
            radius: ['0%', '30%'],
			center: ['75%', '50%'],
			itemStyle: {
					shadowColow: '#000000',
					shadowOffsetX: -5,
					shadowBlur: 10},
			label: {show: false},
            data:innerPieValues,
			tooltip: {formatter: "{a} <br/>{b}: {c} m<sup>3</sup>/d", trigger: 'item'}
        }
    ];
	
	return [legends, categories, information]; 
}

//Misc.
function formatData(raw, chartType, barcomboDefs, linecomboDefs, areacomboDefs) {
	var outerKeys = Object.keys(raw);
	var innerKeys = Object.keys(raw[outerKeys[0]]);
	var data = [];
	
	for (i = 0; i < outerKeys.length; i++) {
		data[i] = (raw[outerKeys[i]]);
	}
	
	// format the data
	var z = 1;
	if (chartType == 2 || chartType == 3) {
		z = 0;
	}
	data.forEach(function(d) {
		for (i = z; i < innerKeys.length; i++) {
			d[innerKeys[i]] = parseFloat(d[innerKeys[i]]);
		}
	});
	
	return [data, innerKeys];
}
function pieOfPieSetConnection(chart) {	
	chart.on('legendselectchanged', function (param) {
		

		var opt = chart.getOption();
		
		
		mainData = opt['series'][0]['data'];
		subData = opt['series'][1]['data'];
		legends = opt['legend'][0]['selected'];
		var temp = 0;
		

		if (param.selected[param.name] == false) {
			param.selected[param.name] = true; 
		}
		else {
			param.selected[param.name] = false; 
		}
		
		if (param.name == 'RESERVES' && param.selected.RESERVES == true) {
			for(x = 0; x < subData.length; x++) {
				legends[subData[x]['name']] = false;
			}
			legends['RESERVES'] = false;
		}
		
		else if (param.name == 'RESERVES' && param.selected.RESERVES == false) {
			for(x = 0; x < subData.length; x++) {
				legends[subData[x]['name']] = true;
				temp += parseFloat(subData[x]['value']);
			}
			mainData[4]['value'] = temp;
			legends['RESERVES'] = true;
		}
		
		var allFalse = true;
		for (x = 0; x < subData.length; x++) {
			if (param.selected[subData[x]['name']] == true) {
				if (param.selected[subData[x]['name']] == true && param.name == subData[x]['name']) {
					allFalse = true;
				}
				else {
					allFalse = false;
					break;
				}
			}
		}

		for (x = 0; x < subData.length; x++) {
		
			if (param.name == subData[x]['name'] && param.selected[param.name] == true) {
				mainData[4]['value'] -= parseFloat(subData[x]['value']);
				legends[subData[x]['name']] = false;
				if (allFalse) {
					mainData[4]['value'] = 0;
					legends['RESERVES'] = false;
				}
				break;
			}
			else if (param.name == subData[x]['name'] && param.selected[param.name] == false) {
				mainData[4]['value'] += parseFloat(subData[x]['value']);
				legends[subData[x]['name']] = true;
				if (allFalse) {
					mainData[4]['value'] = parseFloat(subData[x]['value']);
					legends['RESERVES'] = true;
				}
				break;
			}
			
			
		}
		chart.setOption(opt);
	});
}
function barOfPieSetConnection(chart, data, innerKeys) {
	
	chart.on('mouseover', 'series',  function (param) {
			var opt = chart.getOption();
			
			if (param.seriesType == 'pie') {
				for (x = 0; x < opt['series'][0]['data'].length; x++) {
					opt['series'][0]['data'][x]['itemStyle']['color'] = opt['series'][param.seriesIndex]['data'][param.dataIndex]['itemStyle']['color'];
					opt['series'][0]['data'][x]['label']['color'] = opt['series'][param.seriesIndex]['data'][param.dataIndex]['label']['color'];
					opt['series'][0]['data'][x]['value'] = data[param.dataIndex][innerKeys[x+1]].toFixed(2);
				}
			}
			else {
				for (x = 0; x < opt['series'][1]['data'].length; x++) {
					opt['series'][1]['data'][x]['value'] = data[x][innerKeys[param.dataIndex + 1]].toFixed(2);
				}
			}
			

			chart.setOption(opt);
		});
		
		chart.on('legendselectchanged', function (param) {
			var opt = chart.getOption();
			
			if (param.selected[param.name] == false) {
				param.selected[param.name] = true; 
			}
			else {
				param.selected[param.name] = false; 
			}
			
			for (x = 0; x < data.length; x++ ) {
				if (param.name == data[x][innerKeys[0]] && param.selected[param.name] == true) {
					for (y = 0; y < opt['series'][0]['data'].length; y++) {
						opt['series'][0]['data'][y]['value'] -= data[x][innerKeys[y+1]];
						opt['series'][0]['data'][y]['value'] = opt['series'][0]['data'][y]['value'].toFixed(2);
						if (opt['series'][0]['data'][y]['value'] <= 0.05) {
							opt['series'][0]['data'][y]['value'] = 0;
						}
					}
					break;
				}
				else if (param.name == data[x][innerKeys[0]] && param.selected[param.name] == false) {
					for (y = 0; y < opt['series'][0]['data'].length; y++) {
						opt['series'][0]['data'][y]['value'] = parseFloat(opt['series'][0]['data'][y]['value']);
						opt['series'][0]['data'][y]['value'] += data[x][innerKeys[y+1]];
						opt['series'][0]['data'][y]['value'] = opt['series'][0]['data'][y]['value'].toFixed(2);
						
					}
					break;
				}
			}
			
			chart.setOption(opt);
		});
		
		
		chart.on('mouseout', function (param) {
			
			var opt = chart.getOption();

			barValues = [];
			
			for (y = 1; y < innerKeys.length; y++) {
				barValues.push(0);
				for (x = 0; x < data.length; x++) {
					if (opt['legend'][0]['selected'][data[x][innerKeys[0]]] != false) {
						barValues[y-1] += data[x][innerKeys[y]];
					}
				}
			}
			
			pieValues = [];
			for (x = 0; x < data.length; x++) {
				pieValues.push(0);
				for (y = 1; y < innerKeys.length; y++) {
					pieValues[x] += data[x][innerKeys[y]];
				}
			}
				
			if (param.seriesType == 'pie') {		
				for (x = 0; x < opt['series'][0]['data'].length; x++) {
					opt['series'][0]['data'][x]['itemStyle']['color'] = theBlue;
					opt['series'][0]['data'][x]['label']['color'] =  theBlueSolo;
					opt['series'][0]['data'][x]['value'] = barValues[x].toFixed(2);
				}				
			}
			else {
				for (x = 0; x < opt['series'][1]['data'].length; x++) {
					opt['series'][1]['data'][x]['value'] = (pieValues[x]/(innerKeys.length-1)).toFixed(2);
				}
			}
			

			chart.setOption(opt);
			
		});
}

function dashboardFieldConnection(chart, data, data2, innerKeys) {
	
	chart.on('mouseover', 'series',  function (param) {
			var opt = chart.getOption();
			
			
			if (param.componentIndex == 1) {
				for (x = 0; x < opt['series'][0]['data'].length; x++) {
					opt['series'][0]['data'][x]['itemStyle']['color'] = opt['series'][param.seriesIndex]['data'][param.dataIndex]['itemStyle']['color'];
					opt['series'][0]['data'][x]['value'] = data[param.dataIndex][innerKeys[x+1]].toFixed(2);
				}
			}
			else if (param.componentIndex == 2) {
				for (x = 0; x < opt['series'][0]['data'].length; x++) {
					opt['series'][0]['data'][x]['itemStyle']['color'] = opt['series'][param.seriesIndex]['data'][param.dataIndex]['itemStyle']['color'];
					opt['series'][0]['data'][x]['value'] = data2[param.dataIndex][innerKeys[x+1]].toFixed(2);
				}
			}
			else {
				for (x = 0; x < opt['series'][1]['data'].length; x++) {
					opt['series'][1]['data'][x]['value'] = data[x][innerKeys[param.dataIndex + 1]].toFixed(2);
				}
				
				for (x = 0; x < opt['series'][2]['data'].length; x++) {
					opt['series'][2]['data'][x]['value'] = data2[x][innerKeys[param.dataIndex + 1]].toFixed(2);
				}
			}
			

			chart.setOption(opt);
		});
	
	//keep it true
	chart.on('legendselectchanged', function (param) {
		var opt = chart.getOption();
		param.selected[param.name] = true; 	
		for (y = 1; y < innerKeys.length; y++) {
			for (x = 0; x < data.length; x++) {
				opt['legend'][0]['selected'][data[x][innerKeys[0]]] = true;
			}
			for (x = 0; x < data2.length; x++) {
				opt['legend'][0]['selected'][data2[x][innerKeys[0]]] = true;
			}
		}
		chart.setOption(opt);
	});
	
	chart.on('mouseout', function (param) {
		
		var opt = chart.getOption();

		//bar values to update 
		barValues = [];
		for (y = 1; y < innerKeys.length; y++) {
			barValues.push(0);
			for (x = 0; x < data.length; x++) {
					barValues[y-1] += data[x][innerKeys[y]];
			}
			for (x = 0; x < data2.length; x++) {
				barValues[y-1] += data2[x][innerKeys[y]];
			}
		}
		
		//outer pie values to update
		pieValues = [];
		for (x = 0; x < data.length; x++) {
			pieValues.push(0);
			for (y = 1; y < innerKeys.length; y++) {
				pieValues[x] += data[x][innerKeys[y]];
			}
		}
		
		//inner pie values to update
		innerPieValues = [];
		for (x = 0; x < data2.length; x++) {
			innerPieValues.push(0);
			for (y = 1; y < innerKeys.length; y++) {
				innerPieValues[x] += data2[x][innerKeys[y]];
			}
		}
		
		if (param.seriesType == 'pie') {		
			for (x = 0; x < opt['series'][0]['data'].length; x++) {
				opt['series'][0]['data'][x]['itemStyle']['color'] = theBlue;
				opt['series'][0]['data'][x]['value'] = barValues[x].toFixed(2);
			}				
		}
		else {
			for (x = 0; x < opt['series'][1]['data'].length; x++) {
				opt['series'][1]['data'][x]['value'] = (pieValues[x]/(innerKeys.length-1)).toFixed(2);
			}
			for (x = 0; x < opt['series'][2]['data'].length; x++) {
				opt['series'][2]['data'][x]['value'] = (innerPieValues[x]/(innerKeys.length-1)).toFixed(2);
			}
		}
		

		chart.setOption(opt);
		
	});

}















