
// toggle nav

var navState = false;

function togNav() {
	

	var overlay = document.getElementById("nav-overlay");
	var nav = document.getElementById("nav");
	
	if ( !navState ) {
	    
	  overlay.style.display = "block";
	  nav.style.display = "block";
	  
	  navState = true;
	  
	} else {
	    
	  overlay.style.display = "none";
	  nav.style.display = "none";
	  
	  navState = false;
	   
	}

}


// animation on scroll 

const scrollElements = document.querySelectorAll(".js-scroll");


const elementInView = (el, dividend = 1) => {

const elementTop = el.getBoundingClientRect().top;

  return (  elementTop <=  (window.innerHeight || document.documentElement.clientHeight) / dividend );

};

const elementOutofView = (el) => {

    const elementTop = el.getBoundingClientRect().top;

  return ( elementTop > (window.innerHeight || document.documentElement.clientHeight) );
  
};

const displayScrollElement = (element) => { element.classList.add("scrolled"); };

const hideScrollElement = (element) => { element.classList.remove("scrolled"); };


const handleScrollAnimation = () => {

  scrollElements.forEach((el) => {

    if (elementInView(el, 1.25)) {
      displayScrollElement(el);

    } else if (elementOutofView(el)) {
      hideScrollElement(el);
    }

  });

};

window.addEventListener("scroll", () => { handleScrollAnimation(); });
