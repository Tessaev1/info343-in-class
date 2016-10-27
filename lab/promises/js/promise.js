  /*
  In this challenge, you'll learn how to use promises to make independent requests as well as how to make dependendent requests

  Part 1: Return what the current weather is based on a user's location (you can't use the location API though)

  - When you click the Weather button, the current weather should be shown in the #weather-results section
  - Use the fetch() api to help with your calls. https://davidwalsh.name/fetch
  - Use https://freegeoip.net/json/ to get a user's location. This uses your IP address to get an estimate of your location
  - With the result of that request, make another request to determine the current weather
    - Use http://openweathermap.org/current
      - You will need to sign up for an API key. Follow the instructions on how to do that here: http://openweathermap.org/appid
    - After you have your API key, pick an API call to use. When you are using it, make sure you remember to append your API key on to the end of the url.

  */

// apiKey: ddbd5ff7e4e133ea6061ce83cd60270b
var req1 = function() {
  return fetch("https://freegeoip.net/json/");
}
req1().then(function() {
  console.log("asdf");
});
var req2 = function() {
  return fetch("api.openweathermap.org/data/2.5/weather?q=Seattle&APPID=ddbd5ff7e4e133ea6061ce83cd60270b");
}

var weatherResults = document.getElementById("fetch-weather");
weatherResults.addEventListener("click", function() { 
  // console.log("clicked");
  req1().then(req2).then(function() {
    console.log("everything is done");
  })
  .catch(function() {
    console.log("error");
  });
});

 /*
  Part 2: Show the difference between parallel and serial promises

  - Below I've implemented a couple of promises that just use timeouts, and return numbers
  - When the user clicks the serial button: each of the promises will execute one by one, and you will return the result in #slow-result
  - When the user clicks the parallel button: each of the promises will execute at the same time, and you will return the result in #fast-result
  - This is to show the immense importance of network optimization!
*/

//part 2 code
 

// This is for parts 2. 
// Creates a promise that will take delay ms before resolving with the given value
// Don't worry about how this works, but if you want you're curious feel free to ask
function promiseFactory(delay, value) {
	return function () {
		return new Promise(function (resolve, reject) {
			setTimeout(function () {
				resolve(value);
			}, delay);
		});
	}
}

var quick = promiseFactory(500, 5);
var medium = promiseFactory(1000, 2);
var slow = promiseFactory(2000, 30)