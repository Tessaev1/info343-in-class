"use strict";

var boxOne = document.getElementById('one'),
	boxTwo = document.getElementById('two'),
	boxThree = document.getElementById('three'),
	boxFour = document.getElementById('four'),
	boxFive = document.getElementById('five'),
	boxSix = document.getElementById('six');


boxOne.addEventListener("click", function() {
	boxOne.classList.add("fade-to-black");
	boxOne.classList.add("black");
});

boxTwo.addEventListener("click", function() {
	boxTwo.classList.add("fall");
});

boxThree.addEventListener("mouseover", function() {
	boxThree.classList.add("fade-to-white");
	boxThree.classList.add("white");
});

boxThree.addEventListener("mouseout", function() {
	boxThree.classList.add("fade-to-bg-color");
	boxThree.classList.remove("white");
	boxThree.classList.add("grey");
});

boxFour.addEventListener("click", function() {
	boxFour.classList.add("fall");
	boxFour.addEventListener("click", function() {
		boxFour.classList.remove("fall");
		boxFour.classList.add("float");
	})
});

boxFive.addEventListener(setInterval(function() {
	boxFive.style.height = 300;
	boxFive.style.width = 300;
}, 3000));
