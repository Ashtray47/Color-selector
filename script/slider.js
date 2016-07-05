'use strict'
var sliderUp = new Event('sliderup');

var SliderObj = function(containerID, maxValue) {
	this.container = document.getElementById(containerID);
	this.slider = this.container.querySelector(".slide");
	this.btnDown = false;
	this.value = 0;
	this.maxSliderValue = maxValue || 100;
	this.sliderGetPosX = null; //store horizontal position slider
	this.sliderWidth = null;
	this.sliderContainerLeft = null; // store horizonatal position of entire slider container
	this.sliderContainerWidth = null;
	this.sliderPos = null;
	this.sliderRelPos = null;
	this.currentMousePosX = null;
	this.sliderPercent = null;
	this.sliderValue = null;

	//this.checkSlider();
	this._initEventListeners();

}

var proto = SliderObj.prototype;

proto._initEventListeners = function() {
	this.slider.addEventListener("mousedown", this.down.bind(this));
	window.addEventListener("mouseup", this.up.bind(this));
	document.addEventListener("mousemove",this.moveSlider.bind(this));
}

proto.down = function(e) {
	//check for if left mouse button is clicked - left button is 0, right is 2
	if (e.button === 0) {
		this.btnDown = true;
		this.sliderGetPosX = this.slider.getBoundingClientRect().left;
		this.sliderWidth = this.slider.getBoundingClientRect().width;

		this.sliderContainerLeft = this.container.getBoundingClientRect().left;
		this.sliderContainerWidth = this.container.getBoundingClientRect().width;
	}
};

proto.up = function(e) {
	this.btnDown = false;
	return this.value;
};

proto.moveSlider = function (e) {
	if (this.btnDown === true) {
		//get position again at the pointer user clicks down
		this.sliderPos = this.slider.getBoundingClientRect().left;

		this.currentMousePosX = e.clientX - this.sliderPos;
		this.sliderRelPos = this.sliderPos - this.sliderContainerLeft;

		var nextMousePosX = e.clientX - this.sliderContainerLeft;
		var downMouseInnerPos = e.clientX - this.sliderPos;
		var half = this.sliderWidth / 2;
		var currentPos = nextMousePosX - half;

		this.slider.style.left = ( currentPos + "px" );

		if ((currentPos + this.sliderWidth) > this.sliderContainerWidth) {
			this.slider.style.left = (this.sliderContainerWidth - this.sliderWidth) + "px";
		}
		else if (currentPos < 0) {
			this.slider.style.left = 0 + "px";
		}

		// get slider position
		this.sliderPercent = (this.sliderPos - this.sliderContainerLeft) / (this.sliderContainerWidth - this.sliderWidth);
		this.sliderValue = (this.sliderPercent * this.maxSliderValue);

		if (this.sliderValue > this.maxSliderValue) {
			this.sliderValue = this.maxSliderValue;
		}
		else if (this.sliderValue < 0) {
			this.sliderValue = 0;
		}

		this.value = parseInt(this.sliderValue);
		// display index value
		this.slider.setAttribute("indexValue", parseInt(this.sliderValue));
		

		document.dispatchEvent(sliderUp);
		return parseInt(this.sliderValue);
	}
}

