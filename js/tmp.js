
/*
  Initialize variables
*/
const deck = $('.deck').children();
const restart = $('.restart');
let cards = $('.card').children();
let hr = 0;
let min = 0;
let sec = 0;
let msec = 0;
let cnt = 0;
let moves = 0;
var Interval;


let cardNames = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", 
        "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", 
        "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];

let cardSelected = [];
let max_allowed = 2;


// ------------------------------- Start -------------------------------//

restart.on('click',reset);
play();



function gameSetup() {
cardNames = shuffle(cardNames);
cards.removeClass().each(function(index, element) {
  $(this).addClass(cardNames[index]);
 });
}


function click() {
  deck.on('click');
}

function notMatch(array) {
    setTimeout(function() {
      $.each(array, function(item,value){
        array[item].removeClass('open show');
      });
    },1000);
}


function play() {
deck.on('click',function(){
  timer();
  $(this).addClass('open show');
  cardSelected.push($(this).off('click'));
  if(cardSelected.length === 2){
    if(matchCheck(cardSelected)){
      deck.removeClass('open show');
      cardSelected = [];
    }
    else {
      console.log('in else');
      setTimeout(notMatch(cardSelected), 1000);
      cardSelected = [];
    }
  }
  cnt++;
  if(cnt%2==0){
    moves++;
  }
  document.querySelector('.moves').textContent = moves;
});
}



function matchCheck(array){
  return false;
}


function reset() {
  deck.removeClass('open show match');
    cnt = 0;
    moves = 0;
    document.querySelector('.moves').textContent = moves; 
    resetTimer(); 
    gameSetup();
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
    if(min==-60){
      hr++;
      min=00;
    }     
    document.getElementById("chronotime").innerHTML = (hr ? (hours > 9 ? hours : "0" + hours) : "00") 
                              + ":" + (min ? (min > 9 ? min : "0" + min) : "00") 
                              + ":" + (sec > 9 ? sec : "0" + sec);
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

  
 



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */




 function showTimer() {
 let currTimer = ('00'+hr).substr(-2) + ':'+ ('00'+min).substr(-2) + ':' + ('00'+sec).substr(-2);
  document.getElementById("chronotime").innerHTML = currTimer;
}

function stopTimer() {
  if ( gameTimer ) {
  clearInterval( gameTimer );
  }
}

function clearTimer() {
 stopTimer();
 hr = 0;
 min = 0;
 sec = 0;
 msec = 0;
 showTimer();
}

function startTimer() {
 if ( !gameTimer ) {
  setInterval( changeGameTimer, 1000 );
 }
}

function changeGameTimer() {
  msec++;
    if(!(sec=++sec%60)){  
      if(!(min=++min%60)){
        hr=++hr%24; 
      }
    }
  showTimer();
}

function resetTimer() {
  stopTimer();
  clearTimer();
}


