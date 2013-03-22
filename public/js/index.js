function inputFieldListener() {
	//Limit input to numeric characters
	var input = document.getElementById("co2-form").elements["amount"];
	var numericString = parseFloat(input.value);
	if (numericString) input.value = numericString;
	else input.value = "";

	$("#test-field").text(numericString);
}

function submit() {
	$("#results").removeClass("hidden");

	var param = praseFloat($("#co2-form").val());

}

function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}

var carbonlife = {
	massConversion: {
		"kilograms": 1,
		"metric tonnes": .001,
		
	}

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
			, "years of Yellowstone": 44e+9
			, "years of every volcano on Earth": 2e+8
		},

		"Global Emissions": {
			"% of India's 2010 emissions": 2.07e+12
			, "% of USA's 2010 emissions": 5.492e+12
			, "% of China's 2010 emissions": 8.241e+12
			, "% of World 2010 emissions": 33.509e+12
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
		// var params = parseFloat($("#params").text());
		var params = parseFloat(getURLParameter("amount"));
		if (params) {
			$("#co2-input").val(params);
			submit();
		}
	},

	generateResults: function() {
	}
}

$(document).ready(function() {
	carbonlife.start();
	var input = document.getElementById("co2-form").elements["amount"];
	$("#test-field").text(input.value);
});
