/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */



// Shuffle function from http://stackoverflow.com/a/2450976
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

// Global variables
const deck = document.querySelector('.deck');
let moves = 0;
let toggledCards =[];
let clockOff = true;
let time = 0;
let clockId;

function addMove() {
    moves++;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;
}

// shuffle the deck
function shuffleDeck() {
    const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));       // stores elements to be shuffled as a nodeList
    const shuffledCards = shuffle(cardsToShuffle);        // pass cardsToShuffle as an argument to shuffle and store as shuf
    for (card of shuffledCards) {   // for each card in the shuffledCards array, append this card to the deck element
        deck.appendChild(card);
    }

}
shuffleDeck();

// push the clickTarget , if it passes our conditionals, into the toggledCards array. last, I’m going to call our new function addToggleCard after the toggleCard invocation.
// only push into our array if less than two cards are in that array.
deck.addEventListener('click', event => {
    const clickTarget = event.target;
    if (isClickedValid(clickTarget
        )) {
        if (clockOff) {
            startClock();
            clockOff = false;
        }
        toggleCard(clickTarget);
        addToggleCard(clickTarget);
        if (toggledCards.length === 2) { // every time user toggles two cards, check for match
            checkForMatch(clickTarget);
            addMove();
            checkScore(); // call checkScore after every move
        }
    }
});

function isClickedValid(clickTarget) {
    return (
        clickTarget.classList.contains('card') &&      // is it a card
        !clickTarget.classList.contains('match') &&   //  does the target NOT contain the class match?
        toggledCards.length < 2 &&                    // is array's length less than 2?
        !toggledCards.includes(clickTarget)          // does toggledCards array NOT include clickTarget?
        );
}




function toggleCard(card) {      // toggle the cards
    card.classList.toggle('open');
    card.classList.toggle('show');
}

function addToggleCard(clickTarget) { // push the clickTarget into the toggledCards array
    toggledCards.push(clickTarget);
    console.log(toggledCards);
}

// if the list already has another card, check to see if the two cards match. Compare the two cards in the array using their index and className
function checkForMatch() {
    if (
        toggledCards[0].firstElementChild.className ===
        toggledCards[1].firstElementChild.className // check each element in the array against each other's child element's className property. this compares the two icons against each other.
    ) {
        toggledCards[0].classList.toggle('match'); //toggle match class on both elements
        toggledCards[1].classList.toggle('match');
        toggledCards = []; // reset the array
    } else {
        setTimeout(() => {
            toggleCard(toggledCards[0]);
            toggleCard(toggledCards[1]);
            toggledCards = [];
        }, 1000);

    }
}


function checkScore() {
    if (moves === 16 || moves === 24
        ) { hideStar();
    }
}

function hideStar() {
    const starList = document.querySelectorAll('.stars li');
    for (star of starList) {
        if (star.style.display != 'none') { // if the li already has a display set to none, skip it
            star.style.display = 'none';
            break;
        }

    }
}
hideStar();
hideStar();

// time and clock
function displayTime() {
    const clock = document.querySelector('.clock'); // store span.clock in clock
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    if (seconds < 10) {                                // pad seconds with a 0 if less than 10 seconds
        clock.innerHTML = `${minutes}:0${seconds}`;
    } else {
        clock.innerHTML = `${minutes}:${seconds};`
    }
}


function startClock() {
    clockId = setInterval(() => {
        time++;
        displayTime();
    }, 1000);
}

function stopClock() {
    clearInterval(clockId);
}







