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





function getTodayDate() {
	
	
	var now = new Date();
	var day = ("0" + now.getDate()).slice(-2);
	var month = ("0" + (now.getMonth() + 1)).slice(-2);
	var today = now.getFullYear() + "-" + (month) + "-" + (day);
	return today;
}



function loadStonks() {
	
	var data;
	var restartData = {};
	ref.on("value", function(snapshot) {
		data = snapshot.val();
		
		len = Object.keys(data).length;
		keys = Object.keys(data);
		
		for (x = 0; x < len; x++) {
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
		
		createChart(restartData, "Simp Stonks", "comboChart", 0, [[0,0,7]], true, true, [], ["simp/d"]);

	}, function (error) {
	   console.log("Error: " + error.code);
	});
		
}


function resetStonks() {
	document.getElementById('help').innerHTML = "<div style='width:100%; height:400px;' class='d-flex align-items-center justify-content-center' id='comboChart'></div>";
	
	loadStonks();
	
}


function changeStonks(name, val, id) {
	refName = getTodayDate();
	refName = refName + "/" + name + "/";
	var playersRef = firebase.database().ref(refName);
	var toChange;
	ref.on("value", function(snapshot) {
		data = snapshot.val();
		len = Object.keys(data).length;
		keys = Object.keys(data);
		keys2 = Object.keys(data[keys[len-1]]);
		toChange = data[keys[len-1]][keys2[id]];
		toChange = toChange + val;
		
	}, function (error) {
	   console.log("Error: " + error.code);
	});
	setTimeout(function(){
		playersRef.set(toChange);
	}, 500);
}

