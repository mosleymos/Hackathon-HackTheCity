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
	if (interface.customozationData.autorizedColors == 1)
	{
		var pageTitle = "";
		pageTitle += "<div id=\"page-title\">";
			pageTitle += "<div id=\"page-title-name\"> > " + data.title + "</div>";
			pageTitle += "<div id=\"page-title-user\"></div>";
		pageTitle += "</div>";
		return pageTitle;
	}
	else
		return "";
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
}

interface.customozationData = {
	autorizedColors:0,
	autorizedCostLimit:0,
	autorizedProbabilityLimit:0
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
			elementHtml += "<div id=\"logo\" onclick=\"interface.navigate({'page':'home'})\"></div>";
		elementHtml += "</div>";
		elementHtml += "<div class=\"right\">";
			elementHtml += "<div id=\"menu-caller\" onclick=\"interface.menu()\"></div>";
		elementHtml += "</div>";
	}
	else if (data.element == "mainView")
	{
		if (interface.info.currentPage == "home")
		{
			elementHtml += interface.pageTitle({title:'Home'});
			elementHtml += "<div id=\"main-content\">";
				elementHtml += interface.productsDisplay({option:'probability'});
			elementHtml += "</div>";
		}
		if (interface.info.currentPage == "add")
		{
			elementHtml += interface.pageTitle({title:'Add a reference'});
			elementHtml += "<div id=\"main-content\">";
				elementHtml += "Add a Product";
					// ajouter un produit.
				elementHtml += "Add a Category";
					// ajouter une catégorie.
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
					name:"KAYONGA Earvin",
					phone:"06 41 89 20 12",
					email:"earvin@earvinkayonga.com",
					linkedin:"https://fr.linkedin.com/in/earvinkayonga",
					skill:"Web Dev Full Stack"
				},
				{
					name:"OUSMANE BAWA GAOH Moustapha",
					phone:"07 55 00 31 40",
					email:"gaohmoustapha@gmail.com",
					linkedin:"https://fr.linkedin.com/in/gaohmoustapha ",
					skill:"DataScientist"
				},
				{
					name:"HAIDARA PIERRE",
					phone:"0615536978",
					email:"pehaidara@gmail.com",
					linkedin:"https://fr.linkedin.com/in/pierre-elias-haidara-72379564",
					skill:"Data Scientist"
				},
				{
					name:"BOURSIER Bertrand",
					phone:"06 13 17 34 52",
					email:"bertrand.boursier@gmail.com",
					linkedin:"https://www.linkedin.com/in/bertrand-boursier-2107922",
					skill:"Ruby-on-Rails"
				},
				{
					name:"Cédric Faucheux",
					phone:"06.14.44.62.16",
					email:"cedric.faucheux@untienots.com",
					linkedin:"https://www.linkedin.com/in/",
					skill:"Data Scientist"
				},
				{
					name:"Zyed JAMOUSSI",
					phone:"0609861069",
					email:"zyed@untienots.com",
					linkedin:"https://www.linkedin.com/in/zyedjamoussi?trk=nav_responsive_tab_profile_pic",
					skill:"Project Submissioner"
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
		elementHtml += "<div style=\"display:inline-block\">Hackathon Carrefour by BeMyApp 2016 &copy; </div><div style=\"display:inline-block\" onclick=\"interface.customizeData({option:'wildcard'})\"> From Scratch @48hours !</div>";
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

interface.construct = function()
{
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
}



interface.data = {
	"statistiques":{},
	"category":[],
	"products":[{
		"id": "044016223",
		"name": "Haricots Verts",
		"price": 0.98,
		"img": "haricots.jpg",
		"probability": 88,
		"promo": 1,
		"category":""
	}, {
		"id": "049849681",
		"name": "Shampoing l'Oréal",
		"price": 2.48,
		"img": "shampoing.jpg",
		"probability": 69,
		"promo": 1,
		"category":""
	}, {
		"id": "098465665",
		"name": "Café Décaféiné",
		"price": 2.31,
		"img": "cafe.jpg",
		"probability": 48,
		"promo": 1,
		"category":""
	}, {
		"id": "09846566578",
		"name": "Café Caféiné",
		"price": 2.31,
		"img": "cafe.jpg",
		"probability": 18,
		"promo": 1,
		"category":""
	}, {
		"id": "09846566755",
		"name": "Snickers",
		"price": 12.31,
		"img": "cafe.jpg",
		"probability": 98,
		"promo": 1,
		"category":""
	}, {
		"id": "09846565865",
		"name": "Brochettes de volaille",
		"price": 5.87,
		"img": "cafe.jpg",
		"probability": 28,
		"promo": 1,
		"category":""
	}],
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
		},
		"costLimitList":20,
		"lists": [{
			"dateCreation": "23-09-2016",
			"shared": "0",
			"price": 4.77,
			"products": [{
				"id": "044016223",
				"name": "Haricots Verts",
				"price": 0.98,
				"img": "haricots.jpg",
				"probability": 88,
				"promo": 1,
				"category":""
			}, {
				"id": "049849681",
				"name": "Shampoing l'Oréal",
				"price": 2.48,
				"img": "shampoing.jpg",
				"probability": 69,
				"promo": 1,
				"category":""
			}, {
				"id": "098465665",
				"name": "Café Décaféiné",
				"price": 2.31,
				"img": "cafe.jpg",
				"probability": 48,
				"promo": 1,
				"category":""
			}, {
				"id": "09846566578",
				"name": "Café Caféiné",
				"price": 2.31,
				"img": "cafe.jpg",
				"probability": 18,
				"promo": 1,
				"category":""
			}, {
				"id": "09846566755",
				"name": "Snickers",
				"price": 12.31,
				"img": "cafe.jpg",
				"probability": 98,
				"promo": 1,
				"category":""
			}, {
				"id": "09846565865",
				"name": "Brochettes de volaille",
				"price": 5.87,
				"img": "cafe.jpg",
				"probability": 28,
				"promo": 1,
				"category":""
			}]
		}]
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