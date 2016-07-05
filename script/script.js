'use strict'

var filterBtn = document.getElementById('filter-btn');
var filterImage = document.getElementById('landscape-image');
var colorR = document.getElementById('r');
var colorG = document.getElementById('g');
var colorB = document.getElementById('b');
var paintFill = document.querySelector('.paint-fill');

filterBtn.addEventListener('click', function(e) {
	//filterImage.style.backgroundBlendMode = "hard-light";
	//console.log(e);
	var hexcolor = getHexValue(parseInt(colorR.value))
					+ getHexValue(parseInt(colorG.value))
					+ getHexValue(parseInt(colorB.value));

	paintFill.style.fill = "#" + hexcolor;
})

var getHexValue = function(value) {
	var hex = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
	var firstVal = Math.floor(value / 16);
	var secondVal = value % 16;

	///console.log(secondVal);
	var hexValue = hex[firstVal] + hex[secondVal];

	return hexValue;
}


var sliderObj01 = new SliderObj("sliderContainer01", 255);
var sliderObj02 = new SliderObj("sliderContainer02", 255);
var sliderObj03 = new SliderObj("sliderContainer03", 255);

document.addEventListener('sliderup', function(e) {
	var hexcolor = getHexValue(sliderObj01.value) + 
				getHexValue(sliderObj02.value) + 
				getHexValue(sliderObj03.value);

	document.rgbForm.red.value = parseInt(sliderObj01.value);
	document.rgbForm.green.value = parseInt(sliderObj02.value);
	document.rgbForm.blue.value = parseInt(sliderObj03.value);

	paintFill.style.fill = "#" + hexcolor;

	document.rgbForm.hex.value = hexcolor;

});


