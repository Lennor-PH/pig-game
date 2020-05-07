/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, prevDice;

init();

document.querySelector('.btn-roll').addEventListener('click',function(){
    if(gamePlaying){
        //1. Random Number
        var dice1  = Math.floor(Math.random()*6) + 1;
        var dice2 = Math.floor(Math.random()*6) + 1;
        
        //2. Display Result        
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
                        
        //check if 6 in a row
        if(prevDice === 6 && dice1 === 6){
            scores[activePlayer] = 0
            document.querySelector('#score-' + activePlayer).textContent = 0;
            nextPlayer();
        }
                
        //3. Update the round score IF the rolled number was not 1.
        if(dice1 !== 1 && dice2 !== 1){
            //add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;        
        }else{
            nextPlayer();
        }
        
        //prev dice add
        prevDice = dice1;

    }
    
});

document.querySelector('.btn-hold').addEventListener('click',function(){
    if(gamePlaying){
        //Add current score to global score
        scores[activePlayer] += roundScore;
        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        //get textvalue
        var winngScore;
        var input = document.querySelector('.final-score').value;
        
        if(input){
            winningScore = input;
        }else{
            winningScore = 100;
        }
        //Check if player won the game
        if(scores[activePlayer] >= winningScore){
            //Change UI for winner
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!.';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';

            var playerPanelDOM = document.querySelector('.player-' + activePlayer + '-panel');
            playerPanelDOM.classList.add('winner');
            playerPanelDOM.classList.remove('active');

            //Disable roll and hold button
            gamePlaying = false;
        }else{
            //next player
            nextPlayer();
        }
    }

});

document.querySelector('.btn-new').addEventListener('click',init);

function nextPlayer(){
    //Next player
    //condition ? expression_1 : expression_2;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        
    prevDice = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
        
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
        
    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');
    
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

}

function init(){
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    prevDice = 0;
    
    //dice display none
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent= 0;

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}


/*
YOUR CHALLENGES 3.
Change the game to follow these rules:

1. A Player looses his ENTIRE score when he rolls two 6 in a row. After that, It's the next player's 
turn. (Hint: Always save the previous dice roll in a separate variable)

2. Add an input field to the HTML where player can set the winning score, so that they can change the 
predefined score of 100. (Hint: you can read the value with the .value property in JavaScript. This is a
good opportunity to use the google to figure this out :)

3. Add another dice to the game, so that there are two dices now. The player looses his current score 
when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS 
code for the first one :)

*/