var theBlue=new echarts.graphic.LinearGradient(0,0,1,0,[{offset:0,color:"#6789B2"},{offset:1,color:"#275791"}]),theBlueSolo="#275791",oneYearColour={OilRec:new echarts.graphic.LinearGradient(0,0,1,0,[{offset:0,color:"#9CF99C"},{offset:1,color:"#5AF55A"}]),OilProd:new echarts.graphic.LinearGradient(0,0,1,0,[{offset:0,color:"#9CF99C"},{offset:1,color:"#5AF55A"}]),NFA:new echarts.graphic.LinearGradient(0,0,1,0,[{offset:0,color:"#6789B2"},{offset:1,color:"#275791"}]),NewOil:new echarts.graphic.LinearGradient(0,0,1,0,[{offset:0,color:"#F3D04C"},{offset:1,color:"#EFBD00"}]),PDO:new echarts.graphic.LinearGradient(0,0,1,0,[{offset:0,color:"#AD666E"},{offset:1,color:"#8B2530"}]),Medco:new echarts.graphic.LinearGradient(0,0,1,0,[{offset:0,color:"#A186B6"},{offset:1,color:"#633686"}]),OilPot:"#FFB7B7",Wells:"#B95C00",RF:"#0000FF",Deferment:new echarts.graphic.LinearGradient(0,0,1,0,[{offset:0,color:"#B2B2B2"},{offset:1,color:"#808080"}]),DefRec:new echarts.graphic.LinearGradient(0,0,1,0,[{offset:0,color:"#B2B2B2"},{offset:1,color:"#808080"}]),SDEF:new echarts.graphic.LinearGradient(0,0,1,0,[{offset:0,color:"#F5D766"},{offset:1,color:"#EFBD00"}]),UDEF:new echarts.graphic.LinearGradient(0,0,1,0,[{offset:0,color:"#ADA2C7"},{offset:1,color:"#7764A2"}]),Average1:new echarts.graphic.LinearGradient(0,0,1,0,[{offset:0,color:"#66B2FF"},{offset:1,color:"#0080FF"}]),Average2:new echarts.graphic.LinearGradient(0,0,1,0,[{offset:0,color:"#FF7F7F"},{offset:1,color:"#FF0000"}]),Outlook:"#0080FF",Target:"#FF0000",ANB:"#6495ED",APPR:"#FF178B",AQ:"#DB7093",ARD:"#FFD700",BAH:"#FFEC8B",BM:"#FF9A35",EXP:"#AAAAAA",GMR:"#CAFF70",GZ:"#BBFFFF",HJ:"#C1FFC1",HJNE:"#804000",HJSW:"#804000",ID:"#8E388E",ILH:"#388E8E",JDR:"#7D9EC0",JDRW:"#A8A800",KM:"#9F79EE",KMN:"#FFBBFF",NSM:"#E6E6FA",SL:"#FFF68F","TANK-1":"#71C671","TANK-2":"#C5C1AA","TANK-3":"#8E8E38","TANK-4":"#4EEE94",RESERVES:"#C67171",SMALL:"#FF3333",WPH:"#FF66FF",AWPH:"#FF3333",UP:"#FFFF00"},oneYearColourSolo={OilRec:"#5AF55A",NFA:"#275791",NewOil:"#EFBD00",PDO:"#8B2530",Medco:"#633686",OilPot:"#FFB7B7",Wells:"#B95C00",RF:"#0000FF",Deferment:"#808080",DefRec:"#808080",SDEF:"#EFBD00",UDEF:"#7764A2",Average1:"#0080FF",Average2:"#FF0000",Outlook:"#0080FF",Target:"#FF0000",ANB:"#6495ED",APPR:"#FF178B",AQ:"#DB7093",ARD:"#FFD700",BAH:"#FFEC8B",BM:"#FF9A35",EXP:"#AAAAAA",GMR:"#CAFF70",GZ:"#BBFFFF",HJ:"#C1FFC1",HJNE:"#804000",HJSW:"#804000",ID:"#8E388E",ILH:"#388E8E",JDR:"#7D9EC0",JDRW:"#A8A800",KM:"#9F79EE",KMN:"#FFBBFF",NSM:"#E6E6FA",SL:"#FFF68F",SSM:"#71C671",WEN:"#C5C1AA",WRD:"#8E8E38",YM:"#4EEE94",ZRA:"#C67171",SMALL:"#FF3333",WPH:"#FF66FF",AWPH:"#FF3333",UP:"#FFFF00"};function createChart(e,t,a,o,r=[[0,0,0]],l=!0,s=!0,i=[],n=["m3/d"]){var d,h,f,u,c="",p="",F="",m=[],g=l;if("dashboard"!=i&&"dashboard"!=n||(g=!1,t=""),document.getElementById(a).style.width="100%",p=(c=formatData(e,o))[0],u=c[1],0==o)u[0],m=(c=comboChart(p,l,u,0,r,s,F))[3],0!=c[3].length&&(F=c[4]);else if(2==o)c=waterfallChart(p,u,i);else if(3==o)c=scatterChart(p,u);else if(5==o)c=barOfPieChart(p,u,m);else if(5.5==o)c=formatData(n[0],o),data2=c[0],innerKeys2=c[1],c=dashboardFieldChart(p,u,m,data2,innerKeys2);else if(o>=10)if(c=pieChart(p,u),11==o)c[2]=donutChart(c[2],l);else if(12==o)c[2]=rosePieChart(c[2]);else if(13==o){c=pieOfPieChart(p=[c,i=pieChart(i=(i=formatData(i,5))[0],Object.keys(i[Object.keys(i)[0]]))])}else if(14==o){c=nestedPieChart(p=[c,i=pieChart(i=(i=formatData(i,5))[0],Object.keys(i[Object.keys(i)[0]]))])}d=c[0],h=c[1],f=c[2];var b=echarts.init(document.getElementById(a)),v={title:{text:t,left:"center"},tooltip:{show:l,textStyle:{fontSize:10},axisPointer:{type:"cross",show:l,label:{fontSize:10},crossStyle:{color:"#999"}}},graphic:{elements:[{type:"image",invisible:!g,right:"0px",bottom:"30px",style:{image:"images/medco_energi_logo.png",width:35}}]},toolbox:{orient:"vertical",emphasis:{iconStyle:{textPosition:"left",textAlign:"right"}},feature:{show:l,saveAsImage:{show:!0,title:"Save as Image"},restore:{show:!0,title:"Restore"},dataView:{show:!0,readOnly:!1,title:"Table View",lang:["Table View","Close","Update"]}},show:g},legend:{data:d,show:l,itemWidth:20,itemHeight:11,left:"center",bottom:"0",textStyle:{fontSize:10}},series:f};if(0!=m.length&&(v.color=m),l||0!=o||(v.color=["#769EF4"]),o>=10?(v.tooltip.trigger="item",v.tooltip.formatter="{a} <br/>{b}: {c} ({d}%)"):2==o?(v.tooltip.trigger="axis",v.tooltip.axisPointer={type:"shadow"},v.tooltip.formatter=function(e){var t;return(t="-"!=e[1].value?e[1]:e[2]).name.length>5?t.name+"<br/>"+t.value+" m<sup>3</sup>/d":t.name+"<br/>"+t.value+" m<sup>3</sup>/d "+t.seriesName}):5==o?(v.tooltip.trigger="item",v.tooltip.formatter="{a} <br/>{b}: {c} ({d}%)"):5.5==o?(v.tooltip.trigger="axis",v.tooltip.formatter="{b} <br/>{a}: {c} m<sup>3</sup>/d","dashboard"==i&&(c=formatData(n[1],o),data3=c[0],innerKeys3=c[1],v.tooltip.formatter=function(e){var t=e[0].name+"<br>- "+e[0].seriesName+": "+e[0].value+" m<sup>3</sup>/d<br>";for(x=1;x<innerKeys3.length;x++)t+="- "+innerKeys3[x]+": "+data3[e[0].dataIndex][innerKeys3[x]].toFixed(2)+" m<sup>3</sup>/d<br>";return t})):0==o&&""!=F?v.tooltip.formatter=function(e){var t=e.name+"<br>";for(x=0;x<f.length;x++)"NaN"!=f[x].data[e.dataIndex]&&(t+="<span style='height: 10px; width: 10px; background-color: "+F[x]+"; border-radius: 50%; display: inline-block;'></span> "+u[x+1]+": "+f[x].data[e.dataIndex]+" m<sup>3</sup>/d<br>");return t}:v.tooltip.trigger="axis",0==o?v.toolbox.feature.magicType={show:!0,title:{stack:"Stacked",bar:"Bar"},type:["stack","bar"]}:2==o&&(v.toolbox.feature.dataView={show:!1},v.toolbox.feature.restore={show:!1}),3==o)v.xAxis={};else if(o<10){var S=3;h.length<=15?S=0:h.length>30&&(S=11),v.xAxis={data:h,show:l,axisLabel:{interval:S,fontSize:10}}}if(2==o)v.yAxis={show:!1};else if(3==o)v.yAxis={};else if(o<10)if(l)if("dashboard"==i)v.yAxis={show:!1};else{v.yAxis=[];var A=!0,C=0,E=0;for(x=0;x<r.length;x++){lab="dashboard"==i?"m3/d":n[x],v.yAxis.push({show:l,axisLabel:{fontSize:10},offset:C,name:lab}),A?(v.yAxis[x].position="left",A=!1):(v.yAxis[x].position="right",A=!0);D=-1,B=9e4;for(y=0;y<r[x].length;y++)for(z=0;z<r[x][y];z++)for(E++,w=0;w<p.length;w++)p[w][u[E]]<B&&(B=p[w][u[E]]),p[w][u[E]]>D&&(D=p[w][u[E]]);D<2&&D>0?(D+=.01,B-=.01,v.yAxis[x].min=B.toFixed(2),v.yAxis[x].max=D.toFixed(2)):"Wells"==n[x]&&D<50?(D+=1,B=0,v.yAxis[x].min=B,v.yAxis[x].max=D):"Wells"==n[x]&&(D+=O=D-B,B-=O,v.yAxis[x].min=B,v.yAxis[x].max=D),x%2!=0&&(C+=50)}}else{v.yAxis={show:l};var B=1e8,D=-1;for(x=0;x<p.length;x++)p[x][u[1]]<B&&(B=p[x][u[1]]),p[x][u[1]]>D&&(D=p[x][u[1]]);var O=D-B;"RF"==u[1]?(D+=.01,B-=.01):15==p.length&&"OilPot"==u[1]?(B-=100,D+=1):15==p.length?(B-=1,D+=1):"NewOil"==u[1]?(D+=D+O/2,B=0):"NFA"==u[1]?(D+=1)==B+1?B=0:B-=2*O:(D+=1,B=0),v.yAxis.min=B,v.yAxis.max=D}l||11!=o||(v.graphic.elements[1]={type:"text",top:"5px",style:{text:"Total Def.: "+parseFloat(i).toFixed(2)+" m3/d",fill:"#FFFFFF"}}),5==o||5.5==o?v.grid=[{top:"10%",width:"50%",bottom:"15%",left:0,containLabel:!0}]:"dashboard"==i&&0==o?v.grid={top:"0%",bottom:"15%",left:"0%",right:"0%"}:"dashboard"==n&&2==o?v.grid={top:"0%",bottom:"10%",left:"2%",right:"2%"}:0==o&&r.length>1?v.grid={right:"15%",left:"15%"}:l||(v.grid={top:"0%",width:"100%",bottom:"0%",left:0}),5==o?barOfPieSetConnection(b,p,u):5.5==o?(temp0=formatData(n[0],o),data2=temp0[0],dashboardFieldConnection(b,p,data2,u)):13==o&&pieOfPieSetConnection(b),b.setOption(v)}function comboChart(e,t,a,o,r,l,s,i){var n=[],d=[],h=[],f=[],u=[];for(x=1;x<a.length;x++)"Average1"==a[x]||"Average2"==a[x]||n.push(a[x]);var c=0;for(x=0;x<r.length;x++)for(y=0;y<r[0].length;y++)for(z=0;z<r[x][y];z++){for(d[c]={},d[c].name=a[c+1],d[c].yAxisIndex=x,d[c].data=[],null!=oneYearColour[a[c+1]]&&f.push(oneYearColour[a[c+1]]),null!=oneYearColour[a[c+1]]&&u.push(oneYearColourSolo[a[c+1]]),0==y?(d[c].type="line",d[c].areaStyle={},d[c].stack="areaStack",d[c].symbol="none"):1==y?(d[c].type="bar",d[c].itemStyle={shadowColow:"#000000",shadowBlur:4},l&&(d[c].stack="barStack")):2==y&&(d[c].type="line",d[c].lineStyle={width:4},t||(d[c].symbol="none",15==e.length&&(d[c].smooth=!0)),"Outlook"==a[c+1]&&(d[c].lineStyle={type:"dashed"})),w=0;w<e.length;w++)"RF"==a[c+1]?d[c].data.push(e[w][a[c+1]].toFixed(4)):d[c].data.push(e[w][a[c+1]].toFixed(2));c++}len=d.length;for(var p=!0;p;){for(p=!1,x=1;x<len-1;x++){var F=d[x-1].type,m=d[x].type;if(Object.keys(d[x-1]).length>5&&(F="area"),Object.keys(d[x]).length>5&&(m="area"),F>m){var g=d[x-1];if(d[x-1]=d[x],d[x]=g,0!=f.length){var b=f[x-1];f[x-1]=f[x],f[x]=b}p=!0}}x-=1}for(x=0;x<e.length;x++)h[x]=e[x][a[o]];return[n,h,d,f,u]}function waterfallChart(e,t,a,o){var r=[],l=[],s=[],i=[],n=[],d=[],h=0,f=0,u=0,c=[];for(x=0;x<t.length;x++)f+=e[0][t[x]],u+=e[1][t[x]];for(temp0={},temp0[a[0]]=u,temp1={},temp1[a[0]]=0,temp0=Object.assign({},temp0,e[0]),temp1=Object.assign({},temp1,e[1]),temp0[a[1]]=f,temp1[a[1]]=0,c.push(temp0),c.push(temp1),e=c,t=Object.keys(e[0]),x=0;x<t.length;x++)s.push(parseFloat(e[0][t[x]])-parseFloat(e[1][t[x]])),r.push(t[x]);for(x=0;x<s.length;x++)s[x]>=0?(n.push({value:parseInt(s[x].toFixed(0))}),d.push("-")):(n.push({value:"-"}),d.push(parseInt(Math.abs(s[x]).toFixed(0))));for(x=0;x<t.length-1;x++)i.push(h),"-"!=n[x].value?"-"==d[x+1]?h+=n[x].value:(h+=n[x].value,h-=d[x+1]):"-"==n[x+1].value&&(h-=d[x+1]);return i.push(0),l[0]={name:"gaps",type:"bar",stack:"stack",itemStyle:{normal:{barBorderColor:"rgba(0,0,0,0)",fontSize:10,color:"rgba(0,0,0,0)"},emphasis:{barBorderColor:"rgba(0,0,0,0)",fontSize:10,color:"rgba(0,0,0,0)"}},data:i},l[1]={name:"above",type:"bar",stack:"stack",label:{normal:{show:!0,fontSize:10,position:"top"}},itemStyle:{shadowColow:"#000000",shadowBlur:4,color:new echarts.graphic.LinearGradient(0,0,1,0,[{offset:0,color:"#7CFC00"},{offset:1,color:"#228B22"}])},data:n},l[2]={name:"below",type:"bar",stack:"stack",label:{normal:{show:!0,fontSize:10,position:"bottom"}},itemStyle:{shadowColow:"#000000",shadowBlur:4,color:new echarts.graphic.LinearGradient(0,0,1,0,[{offset:0,color:"#FF7F7F"},{offset:1,color:"#B23000"}])},data:d},l[1].data[0].itemStyle={color:theBlue},l[1].data[t.length-1].itemStyle={color:theBlue},[[],r,l]}function scatterChart(e,t){var a=[];for(a[0]={},a[0].type="scatter",a[0].symbolSize="10",a[0].data=[],x=0;x<e.length;x++)a[0].data.push([e[x][t[0]],e[x][t[1]]]);return[[],[],a]}function barOfPieChart(e,t,a){var o=[],r=[],l=[],s=[];for(x=0;x<e.length;x++){for(o.push(e[x][t[0]]),s.push({name:e[x][t[0]],value:0,itemStyle:{fontSize:10,color:oneYearColour[e[x][t[0]]]},label:{color:oneYearColour[e[x][t[0]]]}}),y=1;y<t.length;y++)s[x].value+=e[x][t[y]];s[x].value=(s[x].value/(t.length-1)).toFixed(2)}for(y=1;y<t.length;y++){for(o.push(t[y]),r.push(t[y]),l.push({value:0,itemStyle:{fontSize:10,color:theBlue},label:{color:theBlueSolo}}),x=0;x<e.length;x++)l[y-1].value+=e[x][t[y]];l[y-1].value=l[y-1].value.toFixed(2)}return[o,r,[{name:"Date",type:"bar",itemStyle:{shadowColow:"#000000",shadowBlur:4},label:{show:!0,position:"top",fontSize:"10",formatter:"{c} m³"},data:l},{name:t[0],type:"pie",radius:["20%","55%"],center:["75%","50%"],itemStyle:{shadowColow:"#000000",shadowOffsetX:-5,shadowBlur:10},label:{show:!0,formatter:"{b}: {c} m³"},data:s}]]}function pieChart(e,t){var a=[],o=[];for(o[0]={},o[0].type="pie",o[0].radius=["0%","70%"],o[0].name=t[0],o[0].data=[],o[0].itemStyle={shadowColow:"#000000",shadowOffsetX:-5,shadowBlur:10},x=0;x<e.length;x++)a.push(e[x][t[0]]),o[0].data[x]={},o[0].data[x].name=e[x][t[0]],o[0].data[x].value=e[x][t[1]].toFixed(2),o[0].data[x].itemStyle={color:oneYearColour[e[x][t[0]]]},o[0].data[x].label={color:oneYearColour[e[x][t[0]]]};return[a,[],o,[]]}function donutChart(e,t){var a={},o={},r={},l={};if(e[0].radius=["50%","70%"],t)o.show=!0,o.position="outside",o.formatter="{b}\n{c} m3/d";else{for(o.show=!1,l.fontSize="10",x=0;x<e[0].data.length;x++)e[0].data[x].label.formatter=e[0].data[x].name+"\n"+parseFloat(e[0].data[x].value).toFixed(0),e[0].data[x].label.position="center";r.show=!0,r.textStyle=l,r.position="center",r.color="#FFFFFF",e[0].itemStyle={shadowColow:"#000000",shadowOffsetX:0,shadowBlur:10},e[0].radius=["40%","54%"],e[0].center=["50%","65%"],e[0].selectedMode="multiple",e[0].selectedOffset=2,e[0].avoidLabelOverlap=!1}return a.normal=o,a.emphasis=r,e[0].label=a,e}function rosePieChart(e){return e[0].roseType="area",e[0].radius=["20%","70%"],e}function pieOfPieChart(e){var t=[],a=[],o=e[1];for(t=(e=e[0])[0],x=0;x<o[0].length;x++)t.push(o[0][x]);return(a=e[2]).push(o[2][0]),a[0].startAngle=-20,a[0].selectedMode="single",a[0].radius=["0%","60%"],a[0].center=["30%","45%"],a[0].selectedOffset=30,a[0].data[a[0].data.length-1].selected=!0,a[0].data[a[0].data.length-1].itemStyle={borderColor:"#FFFFFF",borderWidth:5,borderType:"dashed"},a[1].radius=["0%","45%"],a[1].center=["70%","45%"],[t,[],a]}function nestedPieChart(e){var t=[],a=[],o=e[1];for(t=(e=e[0])[0],x=0;x<o[0].length;x++)t.push(o[0][x]);return(a=e[2]).push(o[2][0]),a[0].radius=["40%","55%"],a[1].radius=["0%","30%"],a[1].label={show:!1},[t,[],a]}function dashboardFieldChart(e,t,a,o,r){var l=[],s=[],i=[],n=[],d=[];for(x=0;x<e.length;x++){for(l.push(e[x][t[0]]),n.push({name:e[x][t[0]],value:0,itemStyle:{fontSize:10,color:oneYearColour[e[x][t[0]]]}}),0,y=1;y<t.length;y++)n[x].value+=e[x][t[y]];n[x].value=(n[x].value/(t.length-1)).toFixed(2)}for(x=0;x<o.length;x++){for(l.push(o[x][r[0]]),d.push({name:o[x][r[0]],value:0,itemStyle:{fontSize:10,color:oneYearColour[o[x][r[0]]]}}),0,y=1;y<r.length;y++)d[x].value+=o[x][r[y]];d[x].value=(d[x].value/(r.length-1)).toFixed(2)}for(y=1;y<t.length;y++)for(s.push(t[y]),i.push({value:0,itemStyle:{fontSize:10,color:theBlue},label:{color:theBlueSolo}}),x=0;x<e.length;x++)i[y-1].value+=e[x][t[y]];for(y=1;y<r.length;y++){for(x=0;x<o.length;x++)i[y-1].value+=o[x][r[y]];i[y-1].value=i[y-1].value.toFixed(2)}return[l,s,[{name:"Oil",type:"bar",itemStyle:{shadowColow:"#000000",shadowBlur:4},label:{show:!0,position:"top",fontSize:"10",formatter:"{c}\nm3/d"},data:i},{name:t[0],type:"pie",radius:["40%","55%"],center:["75%","50%"],itemStyle:{shadowColow:"#000000",shadowOffsetX:-5,shadowBlur:10},label:{show:!0,formatter:"{b}: {c} m3/d"},data:n,tooltip:{formatter:"{a} <br/>{b}: {c} m<sup>3</sup>/d",trigger:"item"}},{name:r[0],type:"pie",radius:["0%","30%"],center:["75%","50%"],itemStyle:{shadowColow:"#000000",shadowOffsetX:-5,shadowBlur:10},label:{show:!1},data:d,tooltip:{formatter:"{a} <br/>{b}: {c} m<sup>3</sup>/d",trigger:"item"}}]]}function formatData(e,t,a,o,r){var l=Object.keys(e),s=Object.keys(e[l[0]]),n=[];for(i=0;i<l.length;i++)n[i]=e[l[i]];var x=1;return 2!=t&&3!=t||(x=0),n.forEach(function(e){for(i=x;i<s.length;i++)e[s[i]]=parseFloat(e[s[i]])}),[n,s]}function pieOfPieSetConnection(e){e.on("legendselectchanged",function(t){var a=e.getOption();mainData=a.series[0].data,subData=a.series[1].data,legends=a.legend[0].selected;var o=0;if(0==t.selected[t.name]?t.selected[t.name]=!0:t.selected[t.name]=!1,"RESERVES"==t.name&&1==t.selected.RESERVES){for(x=0;x<subData.length;x++)legends[subData[x].name]=!1;legends.RESERVES=!1}else if("RESERVES"==t.name&&0==t.selected.RESERVES){for(x=0;x<subData.length;x++)legends[subData[x].name]=!0,o+=parseFloat(subData[x].value);mainData[4].value=o,legends.RESERVES=!0}var r=!0;for(x=0;x<subData.length;x++)if(1==t.selected[subData[x].name]){if(1!=t.selected[subData[x].name]||t.name!=subData[x].name){r=!1;break}r=!0}for(x=0;x<subData.length;x++){if(t.name==subData[x].name&&1==t.selected[t.name]){mainData[4].value-=parseFloat(subData[x].value),legends[subData[x].name]=!1,r&&(mainData[4].value=0,legends.RESERVES=!1);break}if(t.name==subData[x].name&&0==t.selected[t.name]){mainData[4].value+=parseFloat(subData[x].value),legends[subData[x].name]=!0,r&&(mainData[4].value=parseFloat(subData[x].value),legends.RESERVES=!0);break}}e.setOption(a)})}function barOfPieSetConnection(e,t,a){e.on("mouseover","series",function(o){var r=e.getOption();if("pie"==o.seriesType)for(x=0;x<r.series[0].data.length;x++)r.series[0].data[x].itemStyle.color=r.series[o.seriesIndex].data[o.dataIndex].itemStyle.color,r.series[0].data[x].label.color=r.series[o.seriesIndex].data[o.dataIndex].label.color,r.series[0].data[x].value=t[o.dataIndex][a[x+1]].toFixed(2);else for(x=0;x<r.series[1].data.length;x++)r.series[1].data[x].value=t[x][a[o.dataIndex+1]].toFixed(2);e.setOption(r)}),e.on("legendselectchanged",function(o){var r=e.getOption();for(0==o.selected[o.name]?o.selected[o.name]=!0:o.selected[o.name]=!1,x=0;x<t.length;x++){if(o.name==t[x][a[0]]&&1==o.selected[o.name]){for(y=0;y<r.series[0].data.length;y++)r.series[0].data[y].value-=t[x][a[y+1]],r.series[0].data[y].value=r.series[0].data[y].value.toFixed(2),r.series[0].data[y].value<=.05&&(r.series[0].data[y].value=0);break}if(o.name==t[x][a[0]]&&0==o.selected[o.name]){for(y=0;y<r.series[0].data.length;y++)r.series[0].data[y].value=parseFloat(r.series[0].data[y].value),r.series[0].data[y].value+=t[x][a[y+1]],r.series[0].data[y].value=r.series[0].data[y].value.toFixed(2);break}}e.setOption(r)}),e.on("mouseout",function(o){var r=e.getOption();for(barValues=[],y=1;y<a.length;y++)for(barValues.push(0),x=0;x<t.length;x++)0!=r.legend[0].selected[t[x][a[0]]]&&(barValues[y-1]+=t[x][a[y]]);for(pieValues=[],x=0;x<t.length;x++)for(pieValues.push(0),y=1;y<a.length;y++)pieValues[x]+=t[x][a[y]];if("pie"==o.seriesType)for(x=0;x<r.series[0].data.length;x++)r.series[0].data[x].itemStyle.color=theBlue,r.series[0].data[x].label.color=theBlueSolo,r.series[0].data[x].value=barValues[x].toFixed(2);else for(x=0;x<r.series[1].data.length;x++)r.series[1].data[x].value=(pieValues[x]/(a.length-1)).toFixed(2);e.setOption(r)})}function dashboardFieldConnection(e,t,a,o){e.on("mouseover","series",function(r){var l=e.getOption();if(1==r.componentIndex)for(x=0;x<l.series[0].data.length;x++)l.series[0].data[x].itemStyle.color=l.series[r.seriesIndex].data[r.dataIndex].itemStyle.color,l.series[0].data[x].value=t[r.dataIndex][o[x+1]].toFixed(2);else if(2==r.componentIndex)for(x=0;x<l.series[0].data.length;x++)l.series[0].data[x].itemStyle.color=l.series[r.seriesIndex].data[r.dataIndex].itemStyle.color,l.series[0].data[x].value=a[r.dataIndex][o[x+1]].toFixed(2);else{for(x=0;x<l.series[1].data.length;x++)l.series[1].data[x].value=t[x][o[r.dataIndex+1]].toFixed(2);for(x=0;x<l.series[2].data.length;x++)l.series[2].data[x].value=a[x][o[r.dataIndex+1]].toFixed(2)}e.setOption(l)}),e.on("legendselectchanged",function(r){var l=e.getOption();for(r.selected[r.name]=!0,y=1;y<o.length;y++){for(x=0;x<t.length;x++)l.legend[0].selected[t[x][o[0]]]=!0;for(x=0;x<a.length;x++)l.legend[0].selected[a[x][o[0]]]=!0}e.setOption(l)}),e.on("mouseout",function(r){var l=e.getOption();for(barValues=[],y=1;y<o.length;y++){for(barValues.push(0),x=0;x<t.length;x++)barValues[y-1]+=t[x][o[y]];for(x=0;x<a.length;x++)barValues[y-1]+=a[x][o[y]]}for(pieValues=[],x=0;x<t.length;x++)for(pieValues.push(0),y=1;y<o.length;y++)pieValues[x]+=t[x][o[y]];for(innerPieValues=[],x=0;x<a.length;x++)for(innerPieValues.push(0),y=1;y<o.length;y++)innerPieValues[x]+=a[x][o[y]];if("pie"==r.seriesType)for(x=0;x<l.series[0].data.length;x++)l.series[0].data[x].itemStyle.color=theBlue,l.series[0].data[x].value=barValues[x].toFixed(2);else{for(x=0;x<l.series[1].data.length;x++)l.series[1].data[x].value=(pieValues[x]/(o.length-1)).toFixed(2);for(x=0;x<l.series[2].data.length;x++)l.series[2].data[x].value=(innerPieValues[x]/(o.length-1)).toFixed(2)}e.setOption(l)})}