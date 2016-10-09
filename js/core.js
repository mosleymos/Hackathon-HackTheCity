var interface = {};

interface.wildcard = 0;

interface.elements = {};

interface.info = {};
interface.info.currentPage = "home";

interface.info.processStorage = {};

interface.process = function(data)
{
	var processHtml = "";
		processHtml += "<div id=\"process-recall\">";
			processHtml += "<img id=\"process-miniature\" src=\"" + data.img + "\" />";
			processHtml += "<div id=\"process-recall-method\">";
				processHtml += "You have choosen this method to own your products : " + data.method + "";
			processHtml += "</div>";
			processHtml += "<div id=\"process-recall-total-price\">";
				processHtml += "You are about to pay " + interface.info.processStorage.totalEstimated.toFixed(2) + "€";
			processHtml += "</div>";
		processHtml += "</div>";
		processHtml += "<div id=\"process-confirm\">";
			processHtml += "Accept Transaction and go to the online paiement system (you accept the terms and conditions)";
		processHtml += "</div>";
		processHtml += "<div id=\"process-cart\">";
			processHtml += "<div id=\"process-cart-title\">Products in your cart</div>";
		for (var i = 0; interface.info.processStorage.productsToShop[i]; i++)
		{
			processHtml += "<div class=\"process-cart-line\">#" + i + "<div class=\"process-cart-line-name\">" + interface.info.processStorage.productsToShop[i].HYP_UB_DESC + "</div><div class=\"process-cart-line-price\">" + interface.info.processStorage.productsToShop[i].SAL_AMT_WTAX.toFixed(2) + "€</div></div>";
		}
		processHtml += "</div>";
		processHtml += "<div id=\"process-greetings\">";
			processHtml += "Thank you to choose Carrefour";
		processHtml += "</div>";
	document.getElementById('mainView').innerHTML = processHtml;
}

interface.shortcuts = function(data)
{
	var shortcuts = "";
	shortcuts += "<div id=\"shortcuts\">";
		if (typeof data !== "undefined" && data.totalEstimated !== "undefined")
		{
			interface.info.processStorage = data;
			shortcuts += "<div class=\"shortcut-total-estimated\">";
				if (data.totalEstimated <= interface.data.profile.costLimitList)
				{
					var estimatedAcceptable = "shortcuts-acceptable";
					shortcuts += "<div class=\"shortcuts-acceptable-estimation\">Le montant estimé de cette liste d'achats ne dépasse pas la limite que vous avez fixé</div>";
				}
				else
				{
					var estimatedAcceptable = "shortcuts-unacceptable";
					shortcuts += "<div class=\"shortcuts-unacceptable-estimation\">Le montant estimé de cette liste d'achats dépasse la limite que vous avez fixé</div>";
				}
				shortcuts += "<div class=\"shortcut-total-estimated-text\">Cout Total Estimé</div><div class=\"shortcut-total-estimated-price\"><div class=\"" + estimatedAcceptable + "\">" + data.totalEstimated.toFixed(2) + "€</div></div>";
			shortcuts += "</div>";
		}
		shortcuts += "<img onclick=\"interface.process({method:'My Local Carrefour Store', img:'img/icon1.png'})\" class=\"shortcut\" src=\"img/icon1.png\" />";
		shortcuts += "<img onclick=\"interface.process({method:'The Carrefour Drive', img:'img/icon2.png'})\" class=\"shortcut\" src=\"img/icon2.png\" />";
		shortcuts += "<img onclick=\"interface.process({method:'The Carrefour Ooshop Delivery', img:'img/icon3.png'})\" class=\"shortcut\" src=\"img/icon3.png\" />";
	shortcuts += "</div>";
	return shortcuts;
}

interface.navigate = function(data)
{
	if (interface.info.menuOpened == 1)
		interface.menu();
	interface.info.currentPage = data.page;
	interface.render();
}

interface.pageTitle = function(data)
{
	var pageTitle = "";
	if (interface.customozationData.autorizedColors == 1)
	{
		pageTitle += "<div id=\"page-title\">";
			pageTitle += "<div id=\"page-title-name\"> > " + data.title + "</div>";
			pageTitle += "<div id=\"page-title-user\"></div>";
		pageTitle += "</div>";
		
	}
	pageTitle += "<div id=\"displayMessage\"></div>";
	return pageTitle;
}

interface.info.menuOpened = 0;
interface.info.menuOperating = 0;

interface.menu = function()
{
	if (interface.info.menuOpened == 0 && interface.info.menuOperating == 0)
	{
		interface.info.menuOperating = 1;
		document.getElementById('menu').style.display = "block";
		document.getElementById('menu').className = "animateFromRight";
		document.getElementById('mainView').className = "blurred";
		document.getElementById('footer').className = "blurred";
		interface.info.menuOpened = 1;
		setTimeout(function(){interface.info.menuOperating = 0;}, 700);
	}
	else if (interface.info.menuOpened == 1 && interface.info.menuOperating == 0)
	{
		interface.info.menuOperating = 1;
		document.getElementById('menu').className = "animateFromLeft";
		document.getElementById('mainView').className = "";
		document.getElementById('footer').className = "";
		interface.info.menuOpened = 0;
		setTimeout(function(){document.getElementById('menu').style.display = "none"; interface.info.menuOperating = 0;}, 700);
	}
}

interface.productsDisplayCheckDouble = function(product, productList)
{
	var double = 0;
	for (var e = 0; productList[e]; e++)
	{
		if (productList[e].HYP_UB_DESC == product.HYP_UB_DESC)
		{
			double = 1;
			break;
		}
	}
	return double;
}

function TextAbstract(text, length)
{
    if (text == null) {
        return "";
    }
    if (text.length <= length) {
        return text;
    }
    text = text.substring(0, length);
    last = text.lastIndexOf(" ");
    text = text.substring(0, last);
    return text + "...";
}


interface.productsDisplay = function(data)
{
	var productsList = [];


	

	//for (var i = 0; interface.data.profile.lists[i]; i++)
	//{
		/*
		for (var z = 0; interface.json.productDescription[z]; z++)
		{
			if (interface.productsDisplayCheckDouble(interface.json.productDescription[z], productsList) == 0)
			{
				var probabilityRGBATransparency = interface.json.productDescription[z].QANTITY_x / 100;
				interface.json.productDescription[z].probabilityRGBA = "rgba(" + interface.data.profile.probabilityColor.r + "," + interface.data.profile.probabilityColor.g + "," + interface.data.profile.probabilityColor.b + "," + probabilityRGBATransparency + ")";
				productsList.push(interface.json.productDescription[z]);
			}
		}
		

		interface.json.productDescription = productsList;

console.log(productsList);
		
	//}
	productsList.sort(function (a, b){
	    if (a.QANTITY_x < b.QANTITY_x)
	      return 1;
	    if (a.QANTITY_x > b.QANTITY_x)
	      return -1;
	    return 0;
	});

	var productsListHtml = "";
	var checkShortcuts = 0;
	var total = 0;
	var productsListSaved = [];
	var overloadedAmountTotal = 0;

	if (interface.customozationData.autorizedCostLimit == 0)
		productsListHtml += "<div class=\"home-titre\">Je les veux...</div>";

	for (var j = 0; productsList[j]; j++)
	{
		if (interface.data.profile.costLimitList <= total && overloadedAmountTotal == 0)
		{
			productsListHtml += "<div class=\"red-line-out-of-money\"></div>";
			overloadedAmountTotal = 1;
		}
		if (productsList[j].QANTITY_x >= interface.data.profile.probabilityLimit && overloadedAmountTotal == 0)
		{
			total = total + productsList[j].SAL_AMT_WTAX;
			var inputCheckBox = "<input type=\"checkbox\" name=\"product\" value=\"" + productsList[j].HYP_UB_DESC + "\" checked>";
			productsListSaved.push(productsList[j]);
		}
		else
		{
			if (checkShortcuts == 0)
			{
				if (interface.customozationData.autorizedCostLimit == 1)
					productsListHtml += interface.shortcuts({productsToShop:productsListSaved, totalEstimated:total});
				else
				{
					productsListHtml += "<div class=\"home-middle\"><img src=\"img/plus.png\"><img src=\"img/technology.png\"></div>";
					productsListHtml += "<div class=\"home-titre\">Besoin d'inspiration ?</div>";
				}
			}
			checkShortcuts = checkShortcuts + 1;
			var inputCheckBox = "<input type=\"checkbox\" name=\"product\" value=\"" + productsList[j].HYP_UB_DESC + "\">";
		}
		if (interface.customozationData.autorizedCostLimit == 1)
			var price = "<div class=\"product-price\">" + productsList[j].SAL_AMT_WTAX + "€</div>";
		else
			var price = "";
		if (interface.customozationData.autorizedColors == 1)
			productsListHtml += "<div class=\"product-line\" style=\"background:" + productsList[j].probabilityRGBA + "\"><div class=\"product-checkbox\">" + inputCheckBox + "</div><div class=\"product-name\">" + TextAbstract(productsList[j].HYP_UB_DESC, 22) + "</div>" + price + "</div>";
		else
			productsListHtml += "<div class=\"product-line\"><div class=\"product-checkbox\">" + inputCheckBox + "</div><div class=\"product-name\">" + TextAbstract(productsList[j].HYP_UB_DESC, 22) + "</div>" + price + "</div>";
	}
	if (checkShortcuts == 0)
		productsListHtml += interface.shortcuts();
	if (productsList.length == 0)
		productsListHtml += "No data to analyze yet, add a product !";
	if (interface.customozationData.autorizedCostLimit == 0)
		productsListHtml += "<br><br><br><div class=\"home-go\" onclick=\"interface.navigate({'page':'page-demo'})\">Go get it !</div>";
	return productsListHtml;
*/
}

interface.customozationData = {
	autorizedColors:0,
	autorizedCostLimit:0,
	autorizedProbabilityLimit:1
};

interface.customizeData = function(data)
{
	if (data.option == "autorizedColors")
	{
		interface.customozationData.autorizedColors = (interface.customozationData.autorizedColors == 1) ? 0 : 1;
		interface.navigate({'page':'settings'});
	}
	else if (data.option == "autorizedCostLimit")
	{
		interface.customozationData.autorizedCostLimit = (interface.customozationData.autorizedCostLimit == 1) ? 0 : 1;
		interface.navigate({'page':'settings'});
	}
	else if (data.option == "autorizedProbabilityLimit")
	{
		interface.customozationData.autorizedProbabilityLimit = (interface.customozationData.autorizedProbabilityLimit == 1) ? 0 : 1;
		interface.navigate({'page':'settings'});
	}
	else if (data.option == "probabilityLimit")
	{
		interface.data.profile.probabilityLimit = data.value;
		document.getElementById('option-result-probabilityLimit').innerHTML = interface.data.profile.probabilityLimit;
	}
	else if (data.option == "costLimitList")
	{
		interface.data.profile.costLimitList = data.value;
		document.getElementById('option-result-costLimitList').innerHTML = interface.data.profile.costLimitList;
	}
	else if (data.option == "wildcard")
	{
		interface.wildcard = 1;
		interface.customozationData = {
			autorizedColors:1,
			autorizedCostLimit:1,
			autorizedProbabilityLimit:1
		};
		interface.navigate({'page':'home'});
	}
}

function initMap()
{
	console.log(memory.selectedCalendar);

  var directionsDisplay = new google.maps.DirectionsRenderer;
  var directionsService = new google.maps.DirectionsService;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: {lat: memory.selectedCalendar.origin.gps.lat, lng: memory.selectedCalendar.origin.gps.lon}
  });
  directionsDisplay.setMap(map);

  calculateAndDisplayRoute(directionsService, directionsDisplay);
  document.getElementById('mode').addEventListener('change', function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  });
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  var selectedMode = document.getElementById('mode').value;
  directionsService.route({
    origin: {lat: memory.selectedCalendar.origin.gps.lat, lng: memory.selectedCalendar.origin.gps.lon},  // Haight.
    destination: {lat: memory.selectedCalendar.destination.gps.lat, lng: memory.selectedCalendar.destination.gps.lon},  // Ocean Beach.
    travelMode: google.maps.TravelMode[selectedMode]
  }, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

interface.message = function(data)
{
	if (typeof data.kind != "undefined" && data.kind == "error")
		document.getElementById('displayMessage').innerHTML = data.msg;
	else if (typeof data.kind != "undefined" && data.kind == "success")
		document.getElementById('displayMessage').innerHTML = data.msg;
	if (typeof data.kind == "clear")
		document.getElementById('displayMessage').innerHTML = "";
}

function randomString(limit)
{
	var List = new Array("a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9");
	var Chain ='';
	for(i = 0; i < List; i++)
	{
		Chain = Chain + List[Math.floor(Math.random()*List.length)];
	}
	return Chain;
}

interface.updateCalendar = function(data)
{
	result = {};
	result.title = document.getElementById("title").value;
	result.description = document.getElementById("description").value;
	result.origin = {gps:{}};
	result.origin.gps.lat = document.getElementById("origin-gps-lat").value;
	result.origin.gps.lon = document.getElementById("origin-gps-lon").value;
	result.origin.address = document.getElementById("origin-address").value;
	result.origin.time = document.getElementById("origin-time").value;
	result.destination = {gps:{}};
	result.destination.gps.lat = document.getElementById("destination-gps-lat").value;
	result.destination.gps.lon = document.getElementById("destination-gps-lon").value;
	result.destination.address = document.getElementById("destination-address").value;
	result.destination.time = document.getElementById("destination-time").value;
	if (data.option == "add")
	{
		var d = new Date();
		result.posix = d.getTime();
		result.id = randomString(15);
		memory.profile.calendar.push(result);
		memory.selectedCalendar = {id:result.id};
	}
	else if (data.option == "update")
	{
		result.id = data.id;
		result.posix = data.posix;
		for (var t = 0; memory.profile.calendar[t]; t++)
		{
			if (memory.profile.calendar[t].id == result.id)
				memory.profile.calendar[t] = result;
		}
	}
	var success = 0;
	for (var p = 0; memory.profile.calendar[p]; p++)
	{
		if (memory.profile.calendar[p].id == result.id)
		{
			success = 1;
			interface.navigate({'page':'viewRendezVous'});
			interface.message({msg:"Recorded", kind:"success"});
		}
	}
	if (success == 0)
		interface.message({msg:"The Rendez-Vous is not recorded, check your fields.", kind:"error"});
}

interface.geocodeData = {originAddress:"",originData:{},origin:0,destinationAddress:"",destinationData:{}, destination:0};

interface.askGeocodeOrigin = function(data)
{  
	$.ajax({
	  dataType: "json",
	  url: data.url,
	  success: function (data) {
	  	console.log(data);
        interface.geocode({option:'callback',pos:'origin', results:data.results});
    }
	});
}

interface.askGeocodeDestination = function(data)
{  
	$.ajax({
	  dataType: "json",
	  url: data.url,
	  success: function (data) {
	  	console.log(data);
        interface.geocode({option:'callback',pos:'destination', results:data.results});
    }
	});
}

interface.geocode = function(data)
{
	if (typeof data.option == "undefined" && data.pos == "origin")
	{
		var originAddress = document.getElementById("origin-address").value;
		if (originAddress != null && originAddress != "")
		{
			originAddress = originAddress.replace(' ','+');
			var request = "https://maps.googleapis.com/maps/api/geocode/json?address=" + originAddress + "&key=AIzaSyCNgeHXRn0G3KTrcF9UYwJrPuU0F4i3xC0";
			console.log(request);
			interface.askGeocodeOrigin({url:request});
		}
	}
	else if (typeof data.option == "undefined" && data.pos == "destination")
	{
		var destinationAddress = document.getElementById("destination-address").value;
		if (destinationAddress != null && destinationAddress != "")
		{
			destinationAddress = destinationAddress.replace(' ','+');
			var request = "https://maps.googleapis.com/maps/api/geocode/json?address=" + destinationAddress + "&key=AIzaSyCNgeHXRn0G3KTrcF9UYwJrPuU0F4i3xC0";
			console.log(request);
			interface.askGeocodeDestination({url:request});
		}
	}
	if (typeof data.option != "undefined" && data.option == "callback")
	{
		if (data.pos == "origin")
		{
			document.getElementById("origin-gps-lat").value = data.results[0].geometry.location.lat;
			document.getElementById("origin-gps-lon").value = data.results[0].geometry.location.lng;
		}
		else if (data.pos == "destination")
		{
			document.getElementById("destination-gps-lat").value = data.results[0].geometry.location.lat;
			document.getElementById("destination-gps-lon").value = data.results[0].geometry.location.lng;
		}
	}
}

interface.date = function(posix)
{
	var date = new Date(posix * 1000);
	return date;
}

interface.compose = function(data)
{
	var elementHtml = "";
	if (data.element == "menu")
	{
		elementHtml += "<div class=\"button\" onclick=\"interface.navigate({'page':'home'})\">Home</div>";
		if (interface.wildcard == 1)
			elementHtml += "<div class=\"button\" onclick=\"interface.navigate({'page':'list-history'})\">My Lists</div>";
		if (interface.wildcard == 1)
			elementHtml += "<div class=\"button\" onclick=\"interface.navigate({'page':'account'})\">Account</div>";
		elementHtml += "<div class=\"button\" onclick=\"interface.navigate({'page':'settings'})\">Settings</div>";
		elementHtml += "<div class=\"button\" onclick=\"interface.navigate({'page':'whoweare'})\">Who We Are</div>";
	}
	else if (data.element == "menu-bar")
	{
		elementHtml += "<div class=\"left\">";
			elementHtml += "<div id=\"logo\" onclick=\"interface.navigate({'page':'home'})\">SynchroCity</div>";
		elementHtml += "</div>";
		elementHtml += "<div class=\"right\">";
			elementHtml += "<div id=\"menu-caller\" onclick=\"interface.menu()\"></div>";
		elementHtml += "</div>";
	}
	else if (data.element == "mainView")
	{
		if (interface.info.currentPage == "home")
		{
			elementHtml += interface.pageTitle({title:'On Road'});
			elementHtml += "<div id=\"main-content\">";
				elementHtml += "<div id=\"welcome\">Welcome on Synchrocity</div>";
				elementHtml += "<div id=\"selectRendezVous\" class=\"travel-entry\"></div>";
				elementHtml += "<div class=\"select-container\">";
					elementHtml += "<select id=\"select-selectRendezVous\" onchange=\"interface.navigate({'page':'viewRendezVous'})\">";
					elementHtml += "<option value=\"\" selected disabled>Select a Rendez-Vous</option>";
					for (var k = 0; memory.profile.calendar[k]; k++)
					{
						elementHtml += "<option value=\"" + memory.profile.calendar[k].id + "\">#" + (k + 1) + " -> " + memory.profile.calendar[k].title + "</option>";
					}
					elementHtml += "</select>";
				elementHtml += "</div>";
			elementHtml += "</div>";
			elementHtml += "<div id=\"buttonCreateRendezVous\" class=\"travel-entry\" onclick=\"interface.navigate({'page':'createRendezVous'})\">Or create one</div>";
		}
		else if (interface.info.currentPage == "result")
		{
			elementHtml += interface.pageTitle({title:'Result'});
			elementHtml += "<div id=\"main-content\">";
				elementHtml += "<div class=\"result-announce\">SynchroCity has found this for you</div>";
				elementHtml += "<div class=\"result-announce\">This ride :</div>";
				elementHtml += "</div>";
			elementHtml += "</div>";
		}
		else if (interface.info.currentPage == "viewRendezVous")
		{
			var e = document.getElementById("select-selectRendezVous");
			if (e != null)
				var rdvChoice = e.options[e.selectedIndex].value;
			else
				var rdvChoice = memory.selectedCalendar.id;
			elementHtml += interface.pageTitle({title:'View a Rendez-Vous'});
			elementHtml += "<div id=\"main-content\">";
			var found = 0;
			for (var o = 0; memory.profile.calendar[o]; o++)
			{
				if (rdvChoice == memory.profile.calendar[o].id)
				{
					memory.selectedCalendar = memory.profile.calendar[o];
					found = 1;
					elementHtml += "<div class=\"presentDataLine\"><div class=\"presentDataLine-text\">Title</div><div id=\"title\" class=\"presentDataLine-data\">" + memory.profile.calendar[o].title + "</div></div>";
					elementHtml += "<div class=\"presentDataLine\"><div class=\"presentDataLine-text\">Description</div><div id=\"description\" class=\"presentDataLine-data\">" + memory.profile.calendar[o].description + "</div></div>";
					elementHtml += "<div class=\"presentDataLine\"><div class=\"presentDataLine-text\">Event added on</div><div id=\"posix\" class=\"presentDataLine-data\">" + interface.date(memory.profile.calendar[o].posix) + "</div></div>";
					elementHtml += "<div class=\"presentDataLine\"><div class=\"presentDataLine-text\">Start point lat</div><div id=\"origin-gps-lat\" class=\"presentDataLine-data\">" + memory.profile.calendar[o].origin.gps.lat + "</div></div>";
					elementHtml += "<div class=\"presentDataLine\"><div class=\"presentDataLine-text\">Start point lon</div><div id=\"origin-gps-lon\" class=\"presentDataLine-data\">" + memory.profile.calendar[o].origin.gps.lon + "</div></div>";
					elementHtml += "<div class=\"presentDataLine\"><div class=\"presentDataLine-text\">Address origin</div><div id=\"origin-address\" class=\"presentDataLine-data\">" + memory.profile.calendar[o].origin.address + "</div></div>";
					elementHtml += "<div class=\"presentDataLine\"><div class=\"presentDataLine-text\">Start time</div><div id=\"origin-time\" class=\"presentDataLine-data\">" + interface.date(memory.profile.calendar[o].origin.time) + "</div></div>";
					elementHtml += "<div class=\"presentDataLine\"><div class=\"presentDataLine-text\">End point lat</div><div id=\"destination-gps-lat\" class=\"presentDataLine-data\">" + memory.profile.calendar[o].destination.gps.lat + "</div></div>";
					elementHtml += "<div class=\"presentDataLine\"><div class=\"presentDataLine-text\">End point lon</div><div id=\"destination-gps-lon\" class=\"presentDataLine-data\">" + memory.profile.calendar[o].destination.gps.lon + "</div></div>";
					elementHtml += "<div class=\"presentDataLine\"><div class=\"presentDataLine-text\">Address destination</div><div id=\"destination-address\" class=\"presentDataLine-data\">" + memory.profile.calendar[o].destination.address + "</div></div>";
					elementHtml += "<div class=\"presentDataLine\"><div class=\"presentDataLine-text\">End time</div><div id=\"destination-time\" class=\"presentDataLine-data\">" + interface.date(memory.profile.calendar[o].destination.time) + "</div></div>";
					elementHtml += "<div class=\"presentDataLine\"><div class=\"buttonClassic\" onclick=\"interface.navigate({'page':'choosePreferedTravelMode'})\">Select Travel Mode for this Rendez-Vous</div></div>";
					elementHtml += "<div class=\"presentDataLine\"><div class=\"buttonClassic\" onclick=\"interface.navigate({'page':'modifyRendezVous'})\">Modify this Rendez-Vous</div></div>";
				}
			}
			if (found == 0)
				elementHtml += "Rendez-Vous has not been found !";
			elementHtml += "</div>";
		}
		else if (interface.info.currentPage == "createRendezVous")
		{
			elementHtml += interface.pageTitle({title:'Create a Rendez-Vous'});
			elementHtml += "<div id=\"main-content\">";
				elementHtml += "<div class=\"presentDataLine\"><div class=\"presentDataLine-text\">Title</div><div class=\"presentDataLine-data\"><input id=\"title\" class=\"inputClassic\" value=\"\" placeholder=\"Place Title\"/></div></div>";
				elementHtml += "<div class=\"presentDataLine\"><div class=\"presentDataLine-text\">Description</div><div class=\"presentDataLine-data\"><input id=\"description\" class=\"inputClassic\" value=\"\" placeholder=\"Place Description\"/></div></div>";
				//elementHtml += "<div class=\"presentDataLine\"><div class=\"presentDataLine-text\">Event added on</div><div class=\"presentDataLine-data\"><input class=\"inputClassic\" value=\"\" placeholder=\"Place Title\"/></div></div>";
				elementHtml += "<div class=\"presentDataLine\"><div class=\"presentDataLine-text\">Start point lat</div><div class=\"presentDataLine-data\"><input id=\"origin-gps-lat\" class=\"inputClassic\" value=\"\" placeholder=\"Place Origin Latitude\"/></div></div>";
				elementHtml += "<div class=\"presentDataLine\"><div class=\"presentDataLine-text\">Start point lon</div><div class=\"presentDataLine-data\"><input id=\"origin-gps-lon\" class=\"inputClassic\" value=\"\" placeholder=\"Place Origin Longitude\"/></div></div>";
				elementHtml += "<div class=\"presentDataLine\"><div class=\"presentDataLine-text\">Address origin</div><div class=\"presentDataLine-data\"><input id=\"origin-address\" class=\"inputClassic\" value=\"\" placeholder=\"Place Origin Adress\" onchange=\"interface.geocode({pos:'origin'})\"/></div></div>";
				elementHtml += "<div class=\"presentDataLine\"><div class=\"presentDataLine-text\">Start time</div><div class=\"presentDataLine-data\"><input id=\"origin-time\" class=\"inputClassic\" value=\"\" placeholder=\"Place Start Time\"/></div></div>";
				elementHtml += "<div class=\"presentDataLine\"><div class=\"presentDataLine-text\">End point lat</div><div class=\"presentDataLine-data\"><input id=\"destination-gps-lat\" class=\"inputClassic\" value=\"\" placeholder=\"Place Destination Latitude\"/></div></div>";
				elementHtml += "<div class=\"presentDataLine\"><div class=\"presentDataLine-text\">End point lon</div><div class=\"presentDataLine-data\"><input id=\"destination-gps-lon\" class=\"inputClassic\" value=\"\" placeholder=\"Place Destination Longitude\"/></div></div>";
				elementHtml += "<div class=\"presentDataLine\"><div class=\"presentDataLine-text\">Address destination</div><div class=\"presentDataLine-data\"><input id=\"destination-address\" class=\"inputClassic\" value=\"\" placeholder=\"Place Destination Address\" onchange=\"interface.geocode({pos:'destination'})\"/></div></div>";
				elementHtml += "<div class=\"presentDataLine\"><div class=\"presentDataLine-text\">End time</div><div class=\"presentDataLine-data\"><input id=\"destination-time\" class=\"inputClassic\" value=\"\" placeholder=\"Place Destination Arrival Time\"/></div></div>";
				elementHtml += "<div class=\"presentDataLine\"><div class=\"buttonClassic\" onclick=\"interface.updateCalendar({option:'add'})\">Create this Rendez-Vous</div></div>";
			elementHtml += "</div>";
		}
		else if (interface.info.currentPage == "modifyRendezVous")
		{
			elementHtml += interface.pageTitle({title:'Modify a Rendez-Vous'});
			elementHtml += "<div id=\"main-content\">";
			var found = 0;
			for (var o = 0; memory.profile.calendar[o]; o++)
			{
				if (memory.selectedCalendar.id == memory.profile.calendar[o].id)
				{
					found = 1;
					memory.selectedCalendar = memory.profile.calendar[o];
					elementHtml += "<div class=\"presentDataLine\"><div class=\"presentDataLine-text\">Title</div><div class=\"presentDataLine-data\"><input id=\"title\" class=\"inputClassic\" value=\"" + memory.profile.calendar[o].title + "\" placeholder=\"Place Title\"/></div></div>";
					elementHtml += "<div class=\"presentDataLine\"><div class=\"presentDataLine-text\">Description</div><div class=\"presentDataLine-data\"><input id=\"description\" class=\"inputClassic\" value=\"" + memory.profile.calendar[o].description + "\" placeholder=\"Place Description\"/></div></div>";
					//elementHtml += "<div class=\"presentDataLine\"><div class=\"presentDataLine-text\">Event added on</div><div class=\"presentDataLine-data\"><input id=\"\" class=\"inputClassic\" value=\"" + memory.profile.calendar[o].posix + "\" placeholder=\"Place Title\"/></div></div>";
					elementHtml += "<div class=\"presentDataLine\"><div class=\"presentDataLine-text\">Start point lat</div><div class=\"presentDataLine-data\"><input id=\"origin-gps-lat\" class=\"inputClassic\" value=\"" + memory.profile.calendar[o].origin.gps.lat + "\" placeholder=\"Place Origin Latitude\"/></div></div>";
					elementHtml += "<div class=\"presentDataLine\"><div class=\"presentDataLine-text\">Start point lon</div><div class=\"presentDataLine-data\"><input id=\"origin-gps-lon\" class=\"inputClassic\" value=\"" + memory.profile.calendar[o].origin.gps.lon + "\" placeholder=\"Place Origin Longitude\"/></div></div>";
					elementHtml += "<div class=\"presentDataLine\"><div class=\"presentDataLine-text\">Address origin</div><div class=\"presentDataLine-data\"><input id=\"origin-address\" class=\"inputClassic\" value=\"" + memory.profile.calendar[o].origin.address + "\" placeholder=\"Place Origin Adress\" onchange=\"interface.geocode({pos:'origin'})\"/></div></div>";
					elementHtml += "<div class=\"presentDataLine\"><div class=\"presentDataLine-text\">Start time</div><div class=\"presentDataLine-data\"><input id=\"origin-time\" class=\"inputClassic\" value=\"" + memory.profile.calendar[o].origin.time + "\" placeholder=\"Place Start Time\"/></div></div>";
					elementHtml += "<div class=\"presentDataLine\"><div class=\"presentDataLine-text\">End point lat</div><div class=\"presentDataLine-data\"><input id=\"destination-gps-lat\" class=\"inputClassic\" value=\"" + memory.profile.calendar[o].destination.gps.lat + "\" placeholder=\"Place Destination Latitude\"/></div></div>";
					elementHtml += "<div class=\"presentDataLine\"><div class=\"presentDataLine-text\">End point lon</div><div class=\"presentDataLine-data\"><input id=\"destination-gps-lon\" class=\"inputClassic\" value=\"" + memory.profile.calendar[o].destination.gps.lon + "\" placeholder=\"Place Destination Longitude\"/></div></div>";
					elementHtml += "<div class=\"presentDataLine\"><div class=\"presentDataLine-text\">Address destination</div><div class=\"presentDataLine-data\"><input id=\"destination-address\" class=\"inputClassic\" value=\"" + memory.profile.calendar[o].destination.address + "\" placeholder=\"Place Destination Arrival Time\" onchange=\"interface.geocode({pos:'destination'})\"/></div></div>";
					elementHtml += "<div class=\"presentDataLine\"><div class=\"presentDataLine-text\">End time</div><div class=\"presentDataLine-data\"><input id=\"destination-time\" class=\"inputClassic\" value=\"" + memory.profile.calendar[o].destination.time + "\"</div></div>";
					elementHtml += "<div class=\"presentDataLine\"><div class=\"buttonClassic\" onclick=\"interface.updateCalendar({option:'update',posix:"+memory.profile.calendar[o].posix+",id:'"+memory.profile.calendar[o].id+"'})\">Update this Rendez-Vous</div></div>";
				}
			}
			if (found == 0)
				elementHtml += "Rendez-Vous has not been found !";
			elementHtml += "</div>";
		}
		else if (interface.info.currentPage == "choosePreferedTravelMode")
		{
			// generate probability of best choice

			var bestChoices = {train:25,bus:25,car:25,bicycle:25} // Send on function to make probability.
			//define distance

			elementHtml += interface.pageTitle({title:'Choose Prefered Travel Mode'});
			elementHtml += "<div id=\"main-content\">";
				elementHtml += "<div class=\"presentDataLine\"><div class=\"presentDataLine-text\">Title</div><div class=\"presentDataLine-data\">" + memory.selectedCalendar.title + "</div></div>";
				
				elementHtml += "<div style=\"text-align:center;\">";
				elementHtml += "<div class=\"buttonMap\" onclick=\"interface.navigate({'page':'result'})\"><img src=\"img/icon-rail.png\" /></div>";
				elementHtml += "<div class=\"buttonMap\" onclick=\"interface.navigate({'page':'result'})\"><img src=\"img/icon-bus.png\" /></div>";
				elementHtml += "<div class=\"buttonMap\" onclick=\"interface.navigate({'page':'result'})\"><img src=\"img/icon-car.png\" /></div>";
				elementHtml += "<div class=\"buttonMap\" onclick=\"interface.navigate({'page':'result'})\"><img src=\"img/icon-bicycle.png\" /></div>";
				elementHtml += "</div>";
				elementHtml += "<div id=\"floating-panel\">";
			    	elementHtml += "<b>Mode of Travel: </b>";
				    elementHtml += "<select id=\"mode\">";
					    elementHtml += "<option value=\"DRIVING\">Driving</option>";
					    elementHtml += "<option value=\"WALKING\">Walking</option>";
					    elementHtml += "<option value=\"BICYCLING\">Bicycling</option>";
					    elementHtml += "<option value=\"TRANSIT\">Transit</option>";
				    elementHtml += "</select>";
			    elementHtml += "</div>";
			    elementHtml += "<div id=\"map\"></div>";
			    setTimeout(function(){initMap();}, 50)
				elementHtml += "</div>";
			elementHtml += "</div>";
		}
		else if (interface.info.currentPage == "settings")
		{
			elementHtml += interface.pageTitle({title:'Settings'});
			elementHtml += "<div id=\"main-content\">";
				elementHtml += "<div id=\"option-customization\">";
					elementHtml += "<div class=\"option-customization-line\">";
						elementHtml += "<div class=\"option-customization-line-text\">Printing color with probability list</div>";
						elementHtml += "<div class=\"option-customization-line-data\" onclick=\"interface.customizeData({option:'autorizedColors'})\">";
							elementHtml += (interface.customozationData.autorizedColors == 1) ? "Yes" : "No";
						elementHtml += " (Click to Change)</div>";
					elementHtml += "</div>";
					elementHtml += "<div class=\"option-customization-line\">";
						elementHtml += "<div class=\"option-customization-line-text\">Autorize cost limit per list</div>";
						elementHtml += "<div class=\"option-customization-line-data\" onclick=\"interface.customizeData({option:'autorizedCostLimit'})\">";
							elementHtml += (interface.customozationData.autorizedCostLimit == 1) ? "Yes" : "No";
						elementHtml += " (Click to Change)</div>";
					elementHtml += "</div>";
					elementHtml += "<div class=\"option-customization-line\">";
						elementHtml += "<div class=\"option-customization-line-text\">Autorize custom probablility recommandation on list</div>";
						elementHtml += "<div class=\"option-customization-line-data\" onclick=\"interface.customizeData({option:'autorizedProbabilityLimit'})\">";
							elementHtml += (interface.customozationData.autorizedProbabilityLimit == 1) ? "Yes" : "No";
						elementHtml += " (Click to Change)</div>";
					elementHtml += "</div>";
				elementHtml += "</div>";

				elementHtml += "<div class=\"option\">";
					elementHtml += "<div class=\"option-text\">Select value for the recommandation system based on probability limit</div>";
					elementHtml += "<input id=\"slider-probabilityLimit\" class=\"option-data\" style=\"width: 90%;\" value=\"" + interface.data.profile.probabilityLimit + "\" type=\"range\" min=\"0\" max=\"100\" step=\"1\" oninput=\"interface.customizeData({value:this.value, option:'probabilityLimit'})\" onchange=\"interface.customizeData({value:this.value, option:'probabilityLimit'})\" />";
					elementHtml += "<div class=\"option-result-text\">Actual setting :<div id=\"option-result-probabilityLimit\" class=\"option-result-data\">" + interface.data.profile.probabilityLimit + "</div>/100</div>";
				elementHtml += "</div>";
				elementHtml += "<div class=\"option\">";
					elementHtml += "<div class=\"option-text\">Select the value for the cost limit per list</div>";
					elementHtml += "<input id=\"slider-costLimitList\" class=\"option-data\" style=\"width: 90%;\" value=\"" + interface.data.profile.costLimitList + "\" type=\"range\" min=\"0\" max=\"250\" step=\"5\" oninput=\"interface.customizeData({value:this.value, option:'costLimitList'})\" onchange=\"interface.customizeData({value:this.value, option:'costLimitList'})\" />";
					elementHtml += "<div class=\"option-result-text\">Actual setting :<div id=\"option-result-costLimitList\" class=\"option-result-data\">" + interface.data.profile.costLimitList + "</div>/250</div>";
				elementHtml += "</div>";

				elementHtml += "<div class=\"option\">";
					elementHtml += "<div id=\"option-color\">";
                		elementHtml += "<div id=\"slide\"></div>";
                		elementHtml += "<div id=\"picker\"></div>";
                		elementHtml += "<div id=\"color-render\"></div>";
                	elementHtml += "</div>";
                	setTimeout(function(){ColorPicker(document.getElementById('slide'),
                    document.getElementById('picker'),
                    function(hex, hsv, rgb) {
                      document.getElementById('color-render').style.backgroundColor = hex;
                    interface.data.profile.probabilityColor.r = rgb.r;
					interface.data.profile.probabilityColor.g = rgb.g;
					interface.data.profile.probabilityColor.b = rgb.b;
                    });}, 50);
				elementHtml += "</div>";
			elementHtml += "</div>";
		}
		else if (interface.info.currentPage == "whoweare")
		{
			elementHtml += interface.pageTitle({title:'Who We Are !'});
			elementHtml += "<div id=\"main-content\">";
			var participants = [
				{
					name:"LE MIGNAN Thomas",
					phone:"06 79 63 87 32",
					email:"contact@biodeploy.com",
					linkedin:"https://fr.linkedin.com/in/thomas-le-mignan-29786a87",
					skill:"Web Developer Full Stack"
				},
				{
					name:"BERHABE Raphael",
					phone:"06 78 88 08 52",
					email:"rafael.dev2016@gmail.com",
					linkedin:"???",
					skill:"Porteur de Projet"
				},
				{
					name:"DESBROSSES Elisa",
					phone:"06 58 26 66 02",
					email:"elisadesbrosses@gmail.com",
					linkedin:"???",
					skill:"Graphiste"
				},
				{
					name:"John Miller",
					phone:"???",
					email:"paris.miller@gmail.com",
					linkedin:"???",
					skill:"???"
				}
			];
			for (var deusexmachina = 0; participants[deusexmachina]; deusexmachina++)
			{
				elementHtml += "<div class=\"participant\">";
					elementHtml += "<div class=\"participant-text\">Name</div><div class=\"participant-data name\">" + participants[deusexmachina].name + "</div>";
					elementHtml += "<div class=\"participant-text\">Phone</div><div class=\"participant-data\">" + participants[deusexmachina].phone + "</div>";
					elementHtml += "<div class=\"participant-text\">Email</div><div class=\"participant-data\">" + participants[deusexmachina].email + "</div>";
					elementHtml += "<div class=\"participant-text\">LinkedIn</div><div class=\"participant-data linkedin\"><a href=\"" + participants[deusexmachina].linkedin + "\">Click here !</a></div>";
					elementHtml += "<div class=\"participant-text\">Skill</div><div class=\"participant-data\">" + participants[deusexmachina].skill + "</div>";
				elementHtml += "</div>";
			}
			elementHtml += "</div>";
		}
		else if (interface.info.currentPage == "account")
		{
			elementHtml += interface.pageTitle({title:'User Account'});
			elementHtml += "<div id=\"main-content\">";
					elementHtml += "<div class=\"line\">";
						elementHtml += "<div class=\"line-title\">Lastname</div>";
						elementHtml += "<div class=\"line-data\">" + interface.data.profile.lastname + "</div>";
					elementHtml += "</div>";
					elementHtml += "<div class=\"line\">";
						elementHtml += "<div class=\"line-title\">Firstname</div>";
						elementHtml += "<div class=\"line-data\">" + interface.data.profile.firstname + "</div>";
					elementHtml += "</div>";
					elementHtml += "<div class=\"line\">";
						elementHtml += "<div class=\"line-title\">Birthdate</div>";
						elementHtml += "<div class=\"line-data\">" + interface.data.profile.birthdate + "</div>";
					elementHtml += "</div>";
					elementHtml += "<div class=\"line\">";
						elementHtml += "<div class=\"line-title\">Sexe</div>";
						elementHtml += "<div class=\"line-data\">" + interface.data.profile.sexe + "</div>";
					elementHtml += "</div>";
			elementHtml += "</div>";
		}
		else if (interface.info.currentPage == "list-history")
		{
			elementHtml += interface.pageTitle({title:'My Saved Lists'});
			elementHtml += "<div class=\"line\">";
				elementHtml += "<div class=\"line-title\">Lists Total</div>";
				elementHtml += "<div class=\"line-data\">" + interface.data.profile.lists.length + "</div>";
				elementHtml += "<div class=\"line-title\">Lists Total</div>";
				elementHtml += "<div class=\"line-data\">" + interface.data.profile.lists[0].dateCreation + "</div>";
				elementHtml += "<div class=\"line-title\">Total Share of this list</div>";
				elementHtml += "<div class=\"line-data\">" + interface.data.profile.lists[0].shared + "</div>";
			elementHtml += "</div>";
		}
		else if (interface.info.currentPage == "page-demo")
		{
			elementHtml += "<img class=\"page-demo\" src=\"img/icon1.png\" onclick=\"interface.navigate({'page':'page-abuse'})\" />";
			elementHtml += "<img class=\"page-demo\" src=\"img/icon2.png\" onclick=\"interface.navigate({'page':'page-abuse'})\" />";
			elementHtml += "<img class=\"page-demo\" src=\"img/icon3.png\" onclick=\"interface.navigate({'page':'page-abuse'})\" />";
			elementHtml += "<br><br><br><div class=\"home-go\" onclick=\"interface.navigate({'page':'page-demo'})\">Tu irais pour moi chéri(e) ?</div>";
		}
		else if (interface.info.currentPage == "page-abuse")
		{
			for (var z = 0; interface.json.productDescription[z]; z++)
			{
				elementHtml += "<div class=\"product-line\"><div class=\"product-checkbox\"><input type=\"checkbox\" name=\"product\" value=\"" + interface.json.productDescription[z].HYP_UB_DESC + "\"></div><div class=\"product-name\">" + TextAbstract(interface.json.productDescription[z].HYP_UB_DESC, 22) + "</div></div>";
			}
		}
	}
	else if (data.element == "footer")
	{
		elementHtml += "<div style=\"display:inline-block\">Hackathon HackTheCity by BeMyApp 2016 &copy; </div><div style=\"display:inline-block\"> From Scratch @48hours !</div>";
	}
	return elementHtml;
}

interface.render = function()
{
	interface.elements.menu = interface.compose({element:'menu'});
	interface.elements.menuBar = interface.compose({element:'menu-bar'});
	interface.elements.mainView = interface.compose({element:'mainView'});
	interface.elements.footer = interface.compose({element:'footer'});
	interface.update();
}

interface.update = function()
{
	document.getElementById('menu').innerHTML = interface.elements.menu;
	document.getElementById('menu-bar').innerHTML = interface.elements.menuBar;
	document.getElementById('mainView').innerHTML = interface.elements.mainView;
	document.getElementById('footer').innerHTML = interface.elements.footer;
}

interface.preconstruct = function()
{
	interface.ask();
}

var memory = {};
var transports = {};

interface.transports = {};
interface.transports.myGps = {lat:0,lon:0};

interface.transports.initPosition = function()
{
	if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(interface.transports.recordPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

interface.transports.recordPosition = function(position)
{
    interface.transports.myGps.lat = position.coords.latitude;
    interface.transports.myGps.lon = position.coords.longitude;
}

function toRad(Value) 
{
   return Value * Math.PI / 180;
}

interface.transports.distanceBetweenTwoPoints = function(pointOne,pointTwo)
{
	var R = 6371; // km
  	var dLat = toRad(pointTwo.lat - pointOne.lat);
  	var dLon = toRad(pointTwo.lon - pointOne.lon);
  	var lat1 = toRad(pointOne.lat);
  	var lat2 = toRad(pointTwo.lat);

  	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
  	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  	var d = R * c;
  	return d;
}

interface.transports.triage = function(list, order)
{
	console.log(list);

	list.sort(function (a, b){
	    if (a.lat < b.lat)
	      return 1;
	    if (a.lat > b.lat)
	      return -1;
	    return 0;
	});
	list.sort(function (a, b){
	    if (a.lon < b.lon)
	      return 1;
	    if (a.lon > b.lon)
	      return -1;
	    return 0;
	});
	return list;

	console.log('after',list);
}

interface.transports.nearestPointFromMe = function(limit)
{
	interface.transports.initPosition();
	var result = {autolib:[], velib:[], ratp:[]};
	var autolibPreProcessed = []
	for (var i = 0; transports.autolib[i]; i++)
	{
		var res = {lat:0,lon:0};
		res.lat = transports.autolib[i].lat - interface.transports.myGps.lat;
		res.lat = (res.lat < 0) ? (res.lat * -1): res.lat;
		res.lon = transports.autolib[i].lon - interface.transports.myGps.lon;
		res.lon = (res.lon < 0) ? (res.lon * -1): res.lon;
		res.id = transports.autolib[i].id;

		autolibPreProcessed.push(res);
	}
	autolibPreProcessed = interface.transports.triage(autolibPreProcessed);
	autolibIdList = [];

	for (var o = 0; autolibPreProcessed[o] && o < limit; o++)
	{
		autolibIdList.push(autolibPreProcessed[o].id);
	}
	for (var u = 0; autolibIdList[u]; u++)
	{
		for (var x = 0;transports.autolib[x]; x++)
		{
			if (autolibIdList[u] == transports.autolib[x].id)
			{
				transports.autolib[x].distance = interface.transports.distanceBetweenTwoPoints(transports.autolib[x], interface.transports.myGps);
				result.autolib.push(transports.autolib[x]);
				break;
			}
		}
	}
	/*****/
	var velibPreProcessed = []
	for (var i = 0; transports.velib[i]; i++)
	{
		var res = {lat:0,lon:0};
		res.lat = transports.velib[i].lat - interface.transports.myGps.lat;
		res.lat = (res.lat < 0) ? (res.lat * -1): res.lat;
		res.lon = transports.velib[i].lon - interface.transports.myGps.lon;
		res.lon = (res.lon < 0) ? (res.lon * -1): res.lon;
		res.id = transports.velib[i].id;

		velibPreProcessed.push(res);
	}
	velibPreProcessed = interface.transports.triage(velibPreProcessed);
	velibIdList = [];
	for (var o = 0; velibPreProcessed[o] && o < limit; o++)
	{
		velibIdList.push(velibPreProcessed[o].id);
	}
	for (var u = 0; velibIdList[u]; u++)
	{
		for (var x = 0;transports.velib[x]; x++)
		{
			if (velibIdList[u] == transports.velib[x].id)
			{
				transports.velib[x].distance = interface.transports.distanceBetweenTwoPoints(transports.velib[x], interface.transports.myGps);
				result.velib.push(transports.velib[x]);
				break;
			}
		}
	}
	/******/
	var ratpPreProcessed = []
	for (var i = 0; transports.ratp[i]; i++)
	{
		var res = {lat:0,lon:0};
		res.lat = transports.ratp[i].lat - interface.transports.myGps.lat;
		res.lat = (res.lat < 0) ? (res.lat * -1): res.lat;
		res.lon = transports.ratp[i].lon - interface.transports.myGps.lon;
		res.lon = (res.lon < 0) ? (res.lon * -1): res.lon;
		res.id = transports.ratp[i].id;

		ratpPreProcessed.push(res);
	}
	ratpPreProcessed = interface.transports.triage(ratpPreProcessed);
	ratpIdList = [];
	for (var o = 0; ratpPreProcessed[o] && o < limit; o++)
	{
		ratpIdList.push(ratpPreProcessed[o].id);
	}
	for (var u = 0; ratpIdList[u]; u++)
	{
		for (var x = 0;transports.ratp[x]; x++)
		{
			if (ratpIdList[u] == transports.ratp[x].id)
			{
				transports.ratp[x].distance = interface.transports.distanceBetweenTwoPoints(transports.ratp[x], interface.transports.myGps);
				result.ratp.push(transports.ratp[x]);
				break;
			}
		}
	}
	return result;
}

interface.construct = function()
{

	// loading data first

	$.getJSON("json/formatType.json", function(json){
    	memory = json;
    	console.log(memory);
	

		var menu = document.createElement("div");
		menu.id = "menu";
		menu.style.display = "none";
		document.body.appendChild(menu);
		var menuBar = document.createElement("div");
		menuBar.id = "menu-bar";
		document.body.appendChild(menuBar);
		var mainView = document.createElement("div");
		mainView.id = "mainView";
		document.body.appendChild(mainView);
		var footer = document.createElement("div");
		footer.id = "footer";
		document.body.appendChild(footer);
		interface.render();

		$.getJSON("json/velib.json", function(json){
	    	transports.velib = json;
	    });

	    $.getJSON("json/ratp.json", function(json){
	    	transports.ratp = json;
	    });

	   	$.getJSON("json/autolib.json", function(json){
	    	transports.autolib = json;
	    });

	});
}

interface.data = {
	"statistiques":{},
	"category":[],
	"profile": {
		"firstname": "Henri",
		"lastname": "Lumière",
		"birthdate": "20-10-1985",
		"sexe": "male",
		"avatar": "avatar.jpg",
		"probabilityLimit": 45,
		"probabilityColor": {
			"r": 100,
			"g": 100,
			"b": 0
		}
	}
};

interface.json = {};

interface.ask = function(data)
{
	var url = "https://mysmartlist.fr/index.php?json";
    
    $.ajax({
        type:'POST',
        url:url,
        dataType:'html',
        data:data
    }).done(function(html){
        console.log("response is : " + html);
        interface.json = JSON.parse(html);
 		console.log(interface.json);
 		interface.construct();
    });
}