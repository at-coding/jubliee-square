var moving = true;

var carouselElement;

var carouselArray = [];
var carouselArrayState = [];
var carouselArrayWidth = [];

var carouselSlidesArray = [];

var carouselSelect = 0;

function initCarousel() {
	
	loadCarousels();
	
	carouselElement = carouselArray[0].closest('section');	
	
	setSlidePositions();
	
	moveSlidesRight();
	
	window.addEventListener("resize", setSlidePositions);
	
	// Add buttons
	
	var leftNav = document.querySelectorAll(".nav-left");
	
	leftNav.forEach(function (el) {
	
		el.addEventListener("mousedown", moveRight);
		
	});
	
	var rightNav = document.querySelectorAll(".nav-right");
	
	rightNav.forEach(function (el) {
	
		el.addEventListener("mousedown", moveLeft);
		
	});
	
}

function loadCarousels() {
	
	carouselArray = document.querySelectorAll(".carousel");
	
	carouselArray.forEach(function (el, i) {
		
		carouselArrayState[i] = ( i ==  0 ) ? true : false;

		carouselSlidesArray[i] = el.querySelectorAll(".slide");
			
		switch_btn = el.closest('section').querySelectorAll(".link-btn");
						
		switch_btn[0].addEventListener("click", togPlan.bind(null, switch_btn[0].getAttribute('data-link'), i));
			
	});
		
}

function togPlan(link, section) {
	
	// Switch sections
	
	carouselElement = document.querySelector("#" + CSS.escape(link));
	
	carouselArray.forEach(function (el, i) {
		
		if ( el.closest('section').id == link ) {
			
			el.closest('section').style.display  = "block";
			carouselSelect = i;
			
		} else {
			
			el.closest('section').style.display  = "none";
		}
		
	});


	setSlidePositions()
	
	if ( carouselArrayState[section] ) {
		
		carouselArrayState[section] = false;
		
		moveSlidesRight();
			
	}
  
}

function getSlidesArray(){
	
	return carouselElement.querySelectorAll(".slide");
	
}

function getCarouselContent(){
	
	return carouselElement.querySelectorAll(".carousel-content")[0];
	
}

function setSlidePositions() {

	carouselArrayWidth[carouselSelect] = carouselArray[carouselSelect].clientWidth;
	
	// Set carousel height according to device width
	carouselArray[carouselSelect].style.height = carouselArray[carouselSelect].clientWidth * 1.4 + "px";

	var widthOfSlide = carouselArrayWidth[carouselSelect];
	var initialWidth = -carouselArrayWidth[carouselSelect];
		
	carouselArray[carouselSelect].querySelectorAll(".slide").forEach(function (el, i) {
		
		el.style.width = widthOfSlide  + "px";
		el.style.left = initialWidth + "px";
		initialWidth += widthOfSlide ;
		
	}); 	

}

function addClone() {
	
	var carouselContent = getCarouselContent();
	
	var lastSlide = carouselContent.lastElementChild.cloneNode(true);
	lastSlide.style.left = -carouselArrayWidth[carouselSelect]  + "px";
	
	carouselContent.insertBefore(lastSlide, carouselContent.firstChild);
	
}


function removeClone() {
	
	var firstSlide = getCarouselContent().firstElementChild;
	firstSlide.parentNode.removeChild(firstSlide);
  
}


function moveSlidesRight() {

	var slides = getSlidesArray();
	
	var width = 0;
	
	slides.forEach(function (el, i) {
	  
		el.style.left = width + "px";
		width += carouselArrayWidth[carouselSelect];
	
	});
	
	addClone()
	
	heading_text()
  
}


function moveSlidesLeft() {

	var slides = getSlidesArray();
	
	var slidesArray = Array.prototype.slice.call(slides);
	slidesArray = slidesArray.reverse();
	
	var maxWidth = (slidesArray.length - 1) * carouselArrayWidth[carouselSelect];
	
	slidesArray.forEach(function (el, i) {
		
		maxWidth -= carouselArrayWidth[carouselSelect];
		el.style.left = maxWidth + "px";
	
	});
	
	heading_text();
}

/*BUTTON ACTION*/

function moveLeft() {
	
	
	if (moving) {
	  
		moving = false
		
		removeClone()
		
		var firstSlide = getCarouselContent().firstElementChild;
		firstSlide.addEventListener("transitionend", replaceToEnd);
		
		moveSlidesLeft()
	
	}
  
}

function moveRight() {
	
	if (moving) {
	
		moving = false;
		
		var carouselContent = getCarouselContent()
		
		// Move last slide to first position
		
		var lastSlide = carouselContent.lastElementChild;
		lastSlide.parentNode.removeChild(lastSlide);
		
		carouselContent.insertBefore(lastSlide, carouselContent.firstChild);
		
		removeClone();
		
		// Transition event
		
		var firstSlide = carouselContent.firstElementChild;
		firstSlide.addEventListener("transitionend", activateAgain);

		// Start transition
		
		moveSlidesRight();
	
	}
  
}

function activateAgain() {

	var carouselContent = getCarouselContent();
		
	var firstSlide = carouselContent.firstElementChild;
	firstSlide.removeEventListener("transitionend", activateAgain);
	
	moving = true;
	
}

function replaceToEnd() {
	
	var carouselContent = getCarouselContent();
	
	var firstSlide = carouselContent.firstElementChild;
	firstSlide.parentNode.removeChild(firstSlide);
	carouselContent.appendChild(firstSlide);
	
	firstSlide.style.left = (carouselSlidesArray[carouselSelect].length - 1) * carouselArrayWidth[carouselSelect]  + "px";
	
	addClone();
	
	moving = true;
	
	firstSlide.removeEventListener("transitionend", replaceToEnd);
  
}

function heading_text() {
	
	var carouselContent = getCarouselContent();

	carouselContent.closest('section').querySelector(".floor-heading").innerHTML = carouselContent.children[1].querySelectorAll("img")[0].getAttribute("alt");
		
}

document.onreadystatechange = () => {
	
  if (document.readyState === 'complete')  initCarousel();
  
}