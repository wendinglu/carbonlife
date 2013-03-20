function inputFieldListener() {
	debugger;
	var input = document.getElementById("co2-form").elements["amount"];
	var numericString = parseFloat(input.value);
	input.value = numericString;
	$("#test-field").text(numericString);
}

var carbonlife = {
	start: function() {
		document.getElementById("co2-input").addEventListener("input", inputFieldListener);
	}
}

$(document).ready(function() {
	carbonlife.start();
});
