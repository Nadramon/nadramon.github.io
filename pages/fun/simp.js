var firebaseConfig = {
    apiKey: "AIzaSyAVIfanMSguo8Daa9PLUQLqjUtZNiqeNN8",
    authDomain: "simp-stocks.firebaseapp.com",
    databaseURL: "https://simp-stocks.firebaseio.com",
    projectId: "simp-stocks",
    storageBucket: "simp-stocks.appspot.com",
    messagingSenderId: "30069387333",
    appId: "1:30069387333:web:dad0a8913eba47a91a332c",
    measurementId: "G-C4ZGKQB11C"
  };
  
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var ref = firebase.database().ref();
var rate = 0.005641;




function getTodayDate() {
	
	
	var now = new Date();
	var day = ("0" + now.getDate()).slice(-2);
	var month = ("0" + (now.getMonth() + 1)).slice(-2);
	var today = now.getFullYear() + "-" + (month) + "-" + (day);
	return today;
}


function getYesterdayDate() {
	
	var now = new Date();
	now.setDate(now.getDate()-1);
	var day = ("0" + now.getDate()).slice(-2);
	var month = ("0" + (now.getMonth() + 1)).slice(-2);
	var yest = now.getFullYear() + "-" + (month) + "-" + (day);
	return yest;
}

function newDay() {
	
	var today = getTodayDate();
	var refName = today + "/";
	var yesterday = getYesterdayDate();
	var refName2 = yesterday + "/";
	firebase.database().ref(refName).once('value').then(function(snapshot) {
		var val = snapshot.val();
		if (val == null) {			
			firebase.database().ref(refName2).once('value').then(function(snapshot) {
				var val2 = snapshot.val();
				var playersRef = firebase.database().ref(refName);
				playersRef.set({
				   Alfa: val2["Alfa"],
				   Nadhif: val2["Nadhif"],
				   Nanda: val2["Nanda"],
				   Nielson: val2["Nielson"],
				   Ronan: val2["Ronan"],
				   Wesley: val2["Wesley"],
				   Yushae: val2["Yushae"]
				});
			
			});
		}
	});

	
}


function loadStonks() {
	
	var data;
	var restartData = {};
	ref.on("value", function(snapshot) {
		data = snapshot.val();
		
		len = Object.keys(data).length;
		keys = Object.keys(data);
		
		for (x = 0; x < len-1; x++) {
			curr = {}
			curr["Date"] = keys[x];
			
			keys2 = Object.keys(data[keys[x]]);

			curr["Alfa"] = data[keys[x]][keys2[0]];
			curr["Nadhif"] = data[keys[x]][keys2[1]];
			curr["Nanda"] = data[keys[x]][keys2[2]];
			curr["Nielson"] = data[keys[x]][keys2[3]];
			curr["Ronan"] = data[keys[x]][keys2[4]];
			curr["Wesley"] = data[keys[x]][keys2[5]];
			curr["Yushae"] = data[keys[x]][keys2[6]];
			
			restartData[x] = curr;
		}
		
		document.getElementById('0').innerText = "Alfa - SIMP$ " + ((data[keys[len-2]][keys2[0]] + data[keys[len-3]][keys2[0]] + data[keys[len-4]][keys2[0]] + data[keys[len-5]][keys2[0]] + data[keys[len-6]][keys2[0]])/5 * rate).toFixed(2);
		document.getElementById('1').innerText = "Nadhif - SIMP$ " + ((data[keys[len-2]][keys2[1]] + data[keys[len-3]][keys2[1]] + data[keys[len-4]][keys2[1]] + data[keys[len-5]][keys2[1]] + data[keys[len-6]][keys2[1]])/5 * rate).toFixed(2);
		document.getElementById('2').innerText = "Nanda - SIMP$ " + ((data[keys[len-2]][keys2[2]] + data[keys[len-3]][keys2[2]] + data[keys[len-4]][keys2[2]] + data[keys[len-5]][keys2[2]] + data[keys[len-6]][keys2[2]])/5 * rate).toFixed(2);
		document.getElementById('3').innerText = "Nielson - SIMP$ " + ((data[keys[len-2]][keys2[3]] + data[keys[len-3]][keys2[3]] + data[keys[len-4]][keys2[3]] + data[keys[len-5]][keys2[3]] + data[keys[len-6]][keys2[3]])/5 * rate).toFixed(2);
		document.getElementById('4').innerText = "Ronan - SIMP$ " + ((data[keys[len-2]][keys2[4]] + data[keys[len-3]][keys2[4]] + data[keys[len-4]][keys2[4]] + data[keys[len-5]][keys2[4]] + data[keys[len-6]][keys2[4]])/5 * rate).toFixed(2);
		document.getElementById('5').innerText = "Wesley - SIMP$ " + ((data[keys[len-2]][keys2[5]] + data[keys[len-3]][keys2[5]] + data[keys[len-4]][keys2[5]] + data[keys[len-5]][keys2[5]] + data[keys[len-6]][keys2[5]])/5 * rate).toFixed(2);
		document.getElementById('6').innerText = "Yushae - SIMP$ " + ((data[keys[len-2]][keys2[6]] + data[keys[len-3]][keys2[6]] + data[keys[len-4]][keys2[6]] + data[keys[len-5]][keys2[6]] + data[keys[len-6]][keys2[6]])/5 * rate).toFixed(2);
		
		createChart(restartData, "Simp Stonks", "comboChart", 0, [[0,0,7]], true, true, [], ["simp/d"]);

	}, function (error) {
	   console.log("Error: " + error.code);
	});
		
}


function resetStonks() {
	document.getElementById('help').innerHTML = "<div style='width:100%; height:400px;' class='d-flex align-items-center justify-content-center' id='comboChart'></div>";
	
	loadStonks();
	
}


function updateConversion() {
	
	ref.on("value", function(snapshot) {
		data = snapshot.val();
		len = Object.keys(data).length;
		keys = Object.keys(data);
		keys2 = Object.keys(data[keys[len-2]]);

		
	}, function (error) {
	   console.log("Error: " + error.code);
	});
}


function changeStonks(name, cval, id) {
	refName = getTodayDate();
	refName = refName + "/" + name + "/";
	var playersRef = firebase.database().ref(refName);
	var toChange;
	
	/*
	firebase.database().ref("Log/").once('value').then(function(snapshot) {
		var logs = snapshot.val();
		console.log(logs);
		var logLen = Object.keys(logs).length;
		logRef = "Log/" + logLen + "/";
		$.getJSON('https://ipfind.co/me?auth=<your_api_key>', function(data) {
		  detail = JSON.stringify(data, null, 2);
		  playersRef.set(detail);
		});
		
		
	});
	*/
	
	
	
	ref.on("value", function(snapshot) {
		data = snapshot.val();
		len = Object.keys(data).length;
		keys = Object.keys(data);
		keys2 = Object.keys(data[keys[len-2]]);
		toChange = data[keys[len-2]][keys2[id]];
		toChange = toChange + cval;
		if (toChange < 0) toChange = 0;
		
	}, function (error) {
	   console.log("Error: " + error.code);
	});
	setTimeout(function(){
		playersRef.set(toChange);
	}, 500);
}

