

/*
 * Create a list that holds all of your cards
 */
 const cards = [
   'fa-diamond', 'fa-diamond',
   'fa-paper-plane-o', 'fa-paper-plane-o',
   'fa-anchor', 'fa-anchor',
   'fa-bolt', 'fa-bolt',
   'fa-cube', 'fa-cube',
   'fa-leaf', 'fa-leaf',
   'fa-bicycle', 'fa-bicycle',
   'fa-bomb', 'fa-bomb'
 ]

 let counter = 0;
 let openCards = [];
 let matchedCards = [];
 let cardcounter = 0;
 let startTime = 0;
 let moveCounter = 0;
 let matches = 0;
 let matchInc;
 let clickCounter = 0;
 let timeDiff;
 let timeInc;
 let minutes;
 let seconds;



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


function arrangeCards() {

    let shuffledCards = shuffle(cards);
    const fragment = document.createDocumentFragment();
    for(let card of shuffledCards) {
        let li = document.createElement("li");
        li.setAttribute("class","card");
        li.setAttribute("data-card",`${card}`)
        cardcounter++;
        li.setAttribute("index",`${cardcounter}`);
        let i = document.createElement("i");
        i.setAttribute("class",`fa ${card}` );
        li.appendChild(i);
        fragment.appendChild(li);
    }
    cardcounter = 0;

    const deck = document.querySelector('.deck');
    deck.remove();
    const containerDiv = document.querySelector('.container');
    let ul = document.createElement("ul");
    ul.setAttribute("class","deck");
    containerDiv.insertAdjacentElement('beforeend',ul);
    const newDeck = document.querySelector('.deck');
    newDeck.appendChild(fragment);
}


function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
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

function startGame() {

    let closedCards = document.querySelectorAll('.card');

    for(let card of closedCards) {
        card.addEventListener("click",function() {

            if(!card.classList.contains("open") && !card.classList.contains("show")) {
                card.classList.add("open", "show");

                if(openCards.length==0) {
                    openCards.push(card);
                    console.log();
                    clickCounter++;
                    if(clickCounter==1) {
                        startTimer();
                    }


                }

                else {
                    for(let openCard of openCards) {
                        if(openCard.getAttribute("index")!=card.getAttribute("index")) {
                            console.log("Inside if ");
                            openCards.push(card);
                            console.log(openCards);

                        }
                    }
                }
                incrementMoves();
                openCards = matchCards(openCards);
                console.log(openCards);


            }



        });

    }

}

function matchCards(openCards) {
    if(openCards.length==2) {
        if((openCards[0].getAttribute("data-card")==openCards[1].getAttribute("data-card"))
                    &&(openCards[0].getAttribute("index")!==openCards[1].getAttribute("index"))) {
                    openCards[0].classList.add("match");
                    openCards[1].classList.add("match");
                    openCards[0].classList.remove("open");
                    openCards[1].classList.remove("open");
                    console.log("Open card array length = "+openCards.length);
                    openCards.splice(0,2);
                    matches++;
                    // openCards.pop();
                    // console.log(openCards);
                    // openCards.pop();
                    // console.log(openCards);

                }
        else {

            console.log("Inside Else , length = "+openCards.length);
        //     setTimeout(function() {
        //     openCards[0].classList.remove("open", "show");
        //     openCards[1].classList.remove("open", "show");
        //     openCards.splice(0,2);
        //     console.log("inside timeout function");
        // }, 200);
        closeCards();

            console.log("After splice in else block");

        }
        // openCards.splice(0,2);


        }


    else if(openCards.length>1){
        console.log("Inside Else if , lenght = "+openCards.length);
        closeCards();
    }
    return openCards;
}

function closeCards() {
    setTimeout(function() {
        openCards.forEach(function(card) {
        card.classList.remove('open', 'show');
    });
    openCards.splice(0,2);
}, 450);
}

function startTimer() {
        startTime = Math.floor(Date.now()/1000);
        console.log(startTime);
        timeInc = setInterval(countTime, 1000);
}

function checkTime(i) {
    if(i<10) {i = "0"+i;}
    return i;
}

function stopTimer() {
    clearInterval(timeInc);
}

function countTime() {
    let now = Math.floor(Date.now()/1000);
    timeDiff = now - startTime;
    minutes = Math.floor(timeDiff/60);
    seconds = Math.floor(timeDiff%60);
    minutes = checkTime(minutes);
    seconds = checkTime(seconds);
    document.querySelector(".time-counter").innerHTML = ` ${minutes}:${seconds}`;
}

function incrementMoves () {
    moveCounter++
    document.querySelector(".moves").innerHTML = ` ${moveCounter}`;
}

function endGame() {
    matchInc = setInterval(checkMatches,1000);
    console.log(matchInc);

}

function checkMatches() {
    if(matches==8) {
        console.log("Game Ended");
        clearInterval(matchInc);
        stopTimer();
    }
}







arrangeCards();
startGame();
// startTimer();
// startTimer();
endGame();
