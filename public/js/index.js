function inputFieldListener() {
	//Limit input to numeric characters
	var input = document.getElementById("co2-form").elements["amount"];
	var numericString = parseFloat(input.value);
	if (numericString) input.value = numericString;
	else input.value = "";
}

function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}

var unitConversion = {
	constants: {
		"kilograms": 1,
		"metric tonnes": 1e+3,
		"kilotonnes": 1e+6,
		"Megatonnes": 1e+9,
		"Gigatonnes": 1e+12,
		"pounds": 0.453592,
		"tons": 907.185
	},

	convertToKg: function(num, units) {
		if (!this.constants[units]) units = "kilograms";
		return (num * this.constants[units]);
	},

	reduceByMagnitude: function(num, magnitude) {
		num /= magnitude;
		num = num.toFixed(0);
		return num;
	},

	wordify: function(num) {
		if (num >= 1e20) {
			num = this.reduceByMagnitude(num, 1e20) + "gajillion";
		} else if (num >= 1e16) {
			num = this.reduceByMagnitude(num, 1e16) + "quadrillion";
		} else if (num >= 1e12) {
			num = this.reduceByMagnitude(num, 1e12) + " trillion";
		} else if (num >= 1e9) {
			num = this.reduceByMagnitude(num, 1e9) + " billion";
		} else if (num >= 1e6) {
			num = this.reduceByMagnitude(num, 1e6) + " million";
		} else if (num >= 1e3) {
			num = this.reduceByMagnitude(num, 1e3) + " thousand";
		} else {
			num = this.reduceByMagnitude(num, 1);
		}

		return num;
	}
}

var carbonlife = {
	equivTable: {
		"Foods": {
			"oranges": .09
			, "bunches of asparagus": .125
			, "eggs": .3
			, "liters of orange juice": .85
			, "kg of fresh cod": 3.2
			, "bottles of wine": 1
			, "4oz steaks": 2
		}, 

		"Transportation": {
				"miles in a car": .738
			, "miles in a Prius": .270
			, "plane trips from NY to Miami": 193
			, "plane trips from NY to LA": 438
			, "plane trips from NY to London": 610
			, "plane trips from London to Tokyo": 1056
			, "space shuttle flights": 4600e+3
			, "days of air travel for all of Europe": 560000e+3
		},

		"Technology": {
			"hours on a high performance desktop": .150
			, "laptops made": 200
			, "years of Facebook operation (2011)": 285e+6
			, "years of Google (2011)": 1.68e+9
			, "years of World of Warcraft operation": 2.7e+9
			, "years of Xbox Live operation": 2.7e+9
		},

		"Domestic": {
			"loads of line-dried laundry": .700
			, "rolls of toilet paper": .730
			, "years worth of disposable diapers": 228
			, "years worth of trash": 230
			, "years worth of laundry": 440
		},
		
		"Events": {
			"small weddings": 5e+3
			, "large weddings": 85e+3
			, "soccer matches": 820e+3
			, "music festivals": 168e+3
			, "years of operation for a large university": 72e+6
			, "World Cups": 2.8e+9
		},

		"World Citizens": {
			"Chinese's annual footprint (2011)": 7.2e+3
			, "Europeans' annual footprint (2011)": 7.5e+3 
			, "UK Citizens' annual footprint": 15e+3
			, "US Citizens' annual footprint": 17.3e+3
			, "Australians' annual footprint": 30e+3
		},

		"Nature": {
			"Mt. St. Helens eruptions": 1e+7
			, "days of Eyjafjallajkull": 150e+6
			, "years of every volcano on Earth": 2e+8
		},

		"Global Emissions": {
			"% of India's 2010 emissions": 2.07e+12/100
			, "% of USA's 2010 emissions": 5.492e+12/100
			, "% of China's 2010 emissions": 8.241e+12/100
			, "% of World 2010 emissions": 33.509e+12/100
		}
	},

	start: function() {
		//Event listeners
		document.getElementById("co2-input").addEventListener("input", inputFieldListener);
		$("#co2-input").keyup(function(event) {
			if (event.keyCode == 13) {
				submit();
			}
		});

		//If we have a parameter, load that parameter
		var params = parseFloat(getURLParameter("amount"));
		if (params) {
			$("#co2-input").val(params);
			this.submit();
		}
	},

	submit: function() {
		$("#results").removeClass("hidden");

		//convert to kilograms
		var params = parseFloat(getURLParameter("amount"));
		var units = $("#co2-select").val();
		var kg = unitConversion.convertToKg(params, units);
		this.generateResults(kg);
	},

	generateResults: function(input) {
		var listStart = "<ul class='results'>";
		var listEnd = "</ul>";
		var lineStart = "<li class='results'>";
		var lineEnd = "</li>";

		for (var category in this.equivTable) {
			$("#results").append("<h3>" + category + "</h3>");
			$("#results").append(listStart);
			for (var itemKey in this.equivTable[category]) {
				var num = input/this.equivTable[category][itemKey];
				if (num > 0.1) {
					num = unitConversion.wordify(num);
					var printout = lineStart + "<strong>" + num + "</strong> " +
					itemKey + lineEnd;

					$("#results").append(printout);
				}
			}

			$("#results").append(listEnd);
		}
	}
}

$(document).ready(function() {
	carbonlife.start();
	var input = document.getElementById("co2-form").elements["amount"];
});
