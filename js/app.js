
/*
	Initialize variables
*/
const deck = $('.deck').children();
const restart = $('.restart');
const restartButton = $('.restartButton');
const max_allowed = 2;
const winPairs = 8;
var cards = $('.card').children();
var currTimer = 0;
var hr = 0;
var min = 0;
var sec = 0;
var msec = 0;
var cnt = 0;
var cardSelected = [];
var cardOpened = [];
var matchedPairs = 0;
var stars = $('.stars');
var openedTimer;
var Interval;
var moves = 0;
var cardNames = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", 
				"fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", 
				"fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];

// ------------------------------- Game Setup -------------------------------//

function gameSetup() {
	cardNames = shuffle(cardNames);
	cards.removeClass().each(function(index, element) {
 	$(this).addClass(cardNames[index]);
 });
 	gameReset();
}

function gameReset() {
	deck.removeClass('open show match');
  	cnt = 0;
  	moves = 0;
  	matchedPairs = 0;
  	document.querySelector('.moves').textContent = moves + " Moves";
 	resetTimer();
 	cardSelected = [];
 	cardOpened = [];
 	 $(".stars").each(function() {
        $(this).find("i").attr("class", "fa fa-star");
    });
 	}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function userRaiting()  {
	if (moves==9){
		$(".star3").children().first().addClass('fa-star-o').removeClass('fa-star');
	}
	if (moves==20) {
		$(".star2").children().first().addClass('fa-star-o').removeClass('fa-star');
	}
}

function gameWin() {
	stopTimer();
	document.querySelector('.win_moves').textContent = moves;
	document.querySelector('.win_time').textContent = currTimer;
	stars.find('li').clone(true).appendTo('.win_stars');
	$('.popup').fadeIn(350);			
	$('.popup-close').on('click', function()  {
		$('.popup').fadeOut(350);		
	});
	$('.restartButton').on('click', function()  {
		$('.popup').fadeOut(350);		
	});
}


// ------------------------------- Game Start -------------------------------//

restart.on('click',gameSetup);
restartButton.on('click',gameSetup);

play();

// Main function that check cards when  click for match.
function play() {
	gameSetup();
	deck.on('click',function(){
 		timer();
		userRaiting();
		if ( !$(this).hasClass('match') && !$(this).hasClass('show') ) {
	  closeOpened();
			$(this).addClass('open show');
	 	cardSelected.push($(this));
	 	if(cardSelected.length == max_allowed){
				moves++;
	 		if ( cardSelected[0].children().first()[0].className == cardSelected[1].children().first()[0].className ) {
	 			cardSelected[0].addClass('match').removeClass('open show');
	 			cardSelected[1].addClass('match').removeClass('open show');
	 			if (++matchedPairs==winPairs) {
	 				gameWin();
	 			}
	 		} else {
	 			cardOpened = cardSelected;
	 			openedTimer = setTimeout( closeOpened, 5000 );
	 		}
	 		cardSelected = [];
	 	}
			document.querySelector('.moves').textContent = moves + " Moves";
		}
	});
}


function closeOpened() {
	if (cardOpened.length>0) {
		cardOpened[0].removeClass('open show');
		cardOpened[1].removeClass('open show');
		cardOpened = [];
	}
	if (openedTimer) {
		clearTimeout(openedTimer);
	}
}

// ----------------Timer functions ------------------//

function timer () {
	 clearInterval(Interval);
     Interval = setInterval(startTimer, 10);
}

function startTimer () {
    msec++; 
    if(msec%100===0){
    	sec++;
    	msec=00;
    }
    if(sec===60){
    	min++;
    	sec=00;
    }
    if(min===60){
    	hr++;
    	min=00;
    }   	
  showTimer();
}

function stopTimer() {
	clearTimeout(Interval);
}

function resetTimer() {
  	stopTimer();
  	sec = 0;
  	min = 0;
  	hr = 0;
  	document.getElementById("chronotime").innerHTML = "00:00:00"
}

function showTimer() {
	currTimer = ('00'+hr).substr(-2) + ':'+ ('00'+min).substr(-2) + ':' + ('00'+sec).substr(-2);
	document.getElementById("chronotime").innerHTML = currTimer;
}

