let localName = localStorage.getItem( "name" );

let localWrongs = localStorage.getItem( "wrong" );

let localTimeMinutes = localStorage.getItem( "timeMinutes" );

let localTimeSeconds = localStorage.getItem( "timeSeconds" );

let duration = 1000;

let minutes = 1;

let triesNumber = 10;

let tries = document.querySelector( ".tries span" );

let decreased;

let gameContainer = document.querySelector( ".game-container" );

let gameBlocks = Array.from( gameContainer.children );

let orderRange = [...Array( gameBlocks.length ).keys()];

document.querySelector( ".controls span" ).onclick = () => {

    let theName = prompt( "What is your name ?" );

    if ( theName === null || theName === "" )
    {

        document.querySelector( ".game-info .name span" ).innerHTML = "Unknown";

        localStorage.setItem( "name", "Unknown" );

    } else
    {

        document.querySelector( ".game-info .name span" ).innerHTML = theName;

        localStorage.setItem( "name", theName );

    };

    document.querySelector( ".controls" ).remove();

    let hints = document.createElement( "div" );

    hints.classList.add( "hints" );

    let hintsContainer = document.createElement( "div" );

    hintsContainer.classList.add( "hints-Container" );

    let head = document.createElement( "h3" );

    head.appendChild( document.createTextNode( "Remember:" ) );

    let timeDiv = document.createElement( "div" );

    timeDiv.classList.add( "time-div" );

    timeDiv.prepend( document.createTextNode( `You have ${minutes} minutes!` ) );

    let triesDiv = document.createElement( "div" );

    triesDiv.classList.add( "tries-div" );

    triesDiv.prepend( document.createTextNode( `You have ${triesNumber} wrong tries!` ) );

    let playSpan = document.createElement( "span" );

    playSpan.classList.add( "play" );

    playSpan.appendChild( document.createTextNode( "Play game" ) );

    hintsContainer.appendChild( head );

    hintsContainer.appendChild( timeDiv );

    hintsContainer.appendChild( triesDiv );

    hintsContainer.appendChild( playSpan );

    hints.appendChild( hintsContainer );

    document.body.appendChild( hints );

    playSpan.addEventListener( "click", () => {

        let timeContainer = document.createElement( "div" );

        timeContainer.classList.add( "time-container" );

        timeContainer.appendChild( document.createTextNode( "Time:" ) );

        let minutesSpan = document.createElement( "span" );

        minutesSpan.classList.add( "minutes" );

        minutesSpan.appendChild( document.createTextNode( `${minutes}` ) );

        let secondsSpan = document.createElement( "span" );

        secondsSpan.classList.add( "seconds" );

        secondsSpan.appendChild( document.createTextNode( "0" ) );

        timeContainer.appendChild( minutesSpan );

        timeContainer.appendChild( secondsSpan );

        document.querySelector( ".game-info" ).appendChild( timeContainer );

        hints.remove();

        setTimeout( () => {

            document.querySelector( "#start" ).play();

            gameBlocks.forEach( block => {

                block.classList.add( "flipped" );

            } );

        }, 500);

        setTimeout( () => {

            gameBlocks.forEach( block => {

                block.classList.remove( "flipped" );

            } );

            let decreaseMinute = setTimeout( () => {

                Decreasing(minutesSpan);

                secondsSpan.innerHTML = "59";

                let decreaseSecond = setInterval( () => {

                    secondsSpan.innerHTML = parseInt( secondsSpan.innerHTML ) - 1;

                    decreased = true;

                    if ( secondsSpan.innerHTML === "0" && decreased === true)
                    {

                        let setBoth = setTimeout( () => {

                            Decreasing( minutesSpan );

                            secondsSpan.innerHTML = "59";

                        }, duration );

                        if ( minutesSpan.innerHTML === "0" && secondsSpan.innerHTML === "1" )
                        {

                            setTimeout( () => {

                                secondsSpan.innerHTML = "0";

                            }, duration );
                        };

                        if ( parseInt( minutesSpan.innerHTML ) === 0 && parseInt( secondsSpan.innerHTML ) === 0 ) {

                            clearInterval( setBoth );

                        }
                    };

                    if ( parseInt(minutesSpan.innerHTML) === 0 && parseInt(secondsSpan.innerHTML) === 0 ) {

                        clearInterval( decreaseSecond );

                        clearTimeout( decreaseMinute );

                        document.getElementById( "losing" ).play();

                        creating( "Your time run out, Would you try again?" );

                    };

                    if ( parseInt(tries.innerHTML) === triesNumber ) {

                        clearInterval( decreaseSecond );

                        clearTimeout( decreaseMinute );

                        document.getElementById( "losing" ).play();

                        creating( `You have tried ${ triesNumber } wrong try, would you try again?` );

                    }

                    if ( gameBlocks.every( block => block.classList.contains( "matched" ) ) )
                    {

                        clearInterval( decreaseSecond );

                        clearTimeout( decreaseMinute );

                        localStorage.setItem( "wrong", tries.innerHTML );

                        localStorage.setItem( "timeMinutes", minutesSpan.innerHTML );

                        localStorage.setItem( "timeSeconds", secondsSpan.innerHTML );

                    };

                }, duration );

            }, duration );

        }, duration + 1500 );

        if (localName !== null && localWrongs !== null && localTimeMinutes !== null && localTimeSeconds !== null) {

            let infoConatiner = document.createElement( "div" );
    
            infoConatiner.classList.add( "game-info" );
    
            let nameDiv = document.createElement( "div" );
    
            nameDiv.classList.add( "name" );
    
            nameDiv.appendChild( document.createTextNode( "Hello: " ) );
    
            let spanName = document.createElement( "span" );
    
            spanName.appendChild( document.createTextNode( localName ) );
    
            let triesDiv = document.createElement( "div" );
    
            triesDiv.classList.add( "tries" );
    
            triesDiv.appendChild( document.createTextNode( "Wrong tries: " ) );
    
            let spanTries = document.createElement( "span" );
    
            spanTries.appendChild( document.createTextNode( localWrongs ) );
    
            let timeDiv = document.createElement( "div" );
    
            timeDiv.classList.add( "time-div" );

            timeDiv.appendChild(document.createTextNode("Time: "))

            let timeSpanMinutes = document.createElement( "span" );

            timeSpanMinutes.classList.add( "minutes" );

            timeSpanMinutes.appendChild( document.createTextNode( `${ localTimeMinutes }` ) );

            let timeSpanSeconds = document.createElement( "span" );

            timeSpanSeconds.classList.add( "seconds" );

            timeSpanSeconds.appendChild( document.createTextNode( `${ localTimeSeconds }` ) );

            timeDiv.appendChild( timeSpanMinutes );

            timeDiv.appendChild( timeSpanSeconds );

            nameDiv.appendChild( spanName );
    
            infoConatiner.appendChild( nameDiv );

            triesDiv.appendChild( spanTries );
    
            infoConatiner.appendChild( triesDiv );
    
            infoConatiner.appendChild( timeDiv );
    
            document.body.appendChild( infoConatiner );
    
        };
    

    } );
};

randomingOrder( orderRange );

gameBlocks.forEach( ( block, i ) => {

    block.style.order = ( orderRange[i] );

    block.addEventListener( "click", () => {

        flippBlock( block );

        if ( gameBlocks.every( block => block.classList.contains( "matched" ) ) )
        {

            document.getElementById( "finish" ).play();

            finishDiv = document.createElement( "div" );

            finishDiv.classList.add( "finish-div" );

            finishContainer = document.createElement( "div" );

            finishContainer.classList.add( "finish-container" );

            finishText = document.createElement( "h1" );

            finishText.appendChild( document.createTextNode( "congratulations" ) );

            spanFinish = document.createElement( "span" );

            spanFinish.classList.add( "finish-close" );

            spanFinish.appendChild( document.createTextNode( "X" ) );

            let spanClose = document.createElement( "span" );

            spanClose.classList.add( "span-close" );

            spanClose.appendChild( document.createTextNode( "Play again" ) );

            finishContainer.appendChild( finishText );

            finishContainer.appendChild( spanFinish );

            finishContainer.appendChild( spanClose );

            finishDiv.appendChild( finishContainer );

            document.body.appendChild( finishDiv );

            spanFinish.addEventListener( "click", () => {

                finishDiv.remove();

            } );

            spanClose.onclick = () => {

                window.location.reload();

            }
        };
    } );
} );

function creating( text ) {

        div = document.createElement( "div" );

        div.classList.add( "fail-div" );

        divContainer = document.createElement( "div" );

        divContainer.classList.add( "fail-container" );

        textEle = document.createElement( "p" );

        textEle.appendChild( document.createTextNode( text ) );

        spanOne = document.createElement( "span" );

        spanOne.classList.add( "yes" );

        spanOne.appendChild( document.createTextNode( "Yes" ) );

        spanTwo = document.createElement( "span" );

        spanTwo.classList.add( "no" );

        spanTwo.appendChild( document.createTextNode( "no" ) );

        divContainer.appendChild( textEle );

        divContainer.appendChild( spanOne );

        divContainer.appendChild( spanTwo );

        div.appendChild( divContainer );

        document.body.appendChild( div );

        spanTwo.onclick = () => {

            div.remove();

            gameBlocks.forEach( block => {

                block.classList.add( "fail" );

            } );
        };

        spanOne.onclick = () => {

            window.location.reload();

        };
};

function Decreasing(selected) {

    selected.innerHTML = parseInt( selected.innerHTML ) - 1;

};


function flippBlock( selected ) {

    selected.classList.add( "flipped" );

    let Selected = gameBlocks.filter( flipped => flipped.classList.contains( "flipped" ) );

    if (Selected.length === 2) {

        stopClicking();

        checkFlippedBlocks( Selected[0], Selected[1] );

    };
};

function stopClicking() {

    gameContainer.classList.add( "no-clicking" );

    setTimeout(() => {

        gameContainer.classList.remove( "no-clicking" );

    }, duration);
};

function checkFlippedBlocks( firstBlock, secondBlock ) {

    if (firstBlock.dataset.tech === secondBlock.dataset.tech) {

    firstBlock.classList.remove( "flipped" );

    secondBlock.classList.remove( "flipped" );

    firstBlock.classList.add( "matched" );

    secondBlock.classList.add( "matched" );

        document.getElementById( "correct" ).play();

    } else {

        tries.innerHTML = parseInt( tries.innerHTML ) + 1;

        setTimeout( () => {

            firstBlock.classList.remove( "flipped" );

            secondBlock.classList.remove( "flipped" );

        }, duration );

        document.getElementById( "error" ).play();

    };
};

function randomingOrder(arr) {

    let current = arr.length, temp, random;

    while (current > 0) {

        random = Math.floor( Math.random() * current );

        current--;

        temp = arr[current];

        arr[current] = arr[random];

        arr[random] = temp;

    };

    return arr;
};




