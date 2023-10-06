/* Defining a custom function which returns a random number 
between min and max, including min and max */
function generateRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

//GA tracking function
function variationTrack(variationName){
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({    
event: "experiment_assignment",
experiment_variation_name: variationName,
experimentation_Id: "123456"
});}

// Set a Cookie
function setCookie(cName, cValue, expDays) {
        var date = new Date();
        date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}


function experiment(experiment_id, ControlCode,variationCode){
function controlExecution(){ControlCode();};
function variation1Execution(){variationCode();};
// Only edit this block of code for each experiment
var experiment_id = experiment_id
var control = "0"
var variant1 = "1"
var assignedVariation;

//If this experiment cookie is not set do dice roll and set cookie
if (document.cookie.indexOf(experiment_id) == -1){
	// Generate a random number between 1 and 10 (including 1 and 10)
var randomNum = generateRandomNumber(0, 1);
	if (randomNum == 0){
		assignedVariation = experiment_id + "-" + control;
	}
	else if (randomNum == 1) {
		assignedVariation = experiment_id + "-" + variant1;
	}
	setCookie(experiment_id, assignedVariation, 30);
}


//Execution code/tag
if (document.cookie.indexOf(experiment_id + "-" + control) > 0){
	variationTrack(assignedVariation);
	controlExecution();
}
else if (document.cookie.indexOf(experiment_id + "-" + variant1) > 0){
	variationTrack(assignedVariation);
	variation1Execution();
}
}


//Example Execution code for an experiment named "EXP002"
experiment("EXP002",
	function controlCode(){console.log("control ran")},
	function variationCode(){console.log("variation ran")}
	)