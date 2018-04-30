
//References from the HTML
var $placeholders = document.getElementById('placeholders');
var $guessedletters = document.getElementById('guessed-letters');
var $guessesleft = document.getElementById('guesses-left');
var $wins = document.getElementById('wins');
var $losses = document.getElementById('losses');
// var $message = document.getElementById('message');
// var $msgtitle = document.getElementById('msgtitle');
// var $msgtext = document.getElementById('msgtext');
// var $image = document.getElementById('image');



//Created local variables to do JAvascript Functionality
var wordlist= ['apple','bananas','grapes','peach','pineapple','strawberry', 'blackberry', 'blueberry','plump'];



var wins = 0;
var losses = 0;
var guessesleft = 15;
var pickedword = '';
var pickedwordarray = [];
var guessedletterslist = [];
var incorrectletterlist = [];


function newgame()
{
    guessesleft = 15;
    guessedletterslist = [];
    incorrectletterlist = [];
    pickedwordarray = [];

    pickedword = wordlist[Math.floor(Math.random() * wordlist.length)];

    for(var i = 0; i < pickedword.length; i++)
    {
        if(pickedword[i] === ' ')
            {
                pickedwordarray.push(' ');
            }
            else
            {
                pickedwordarray.push(' _');
                
            }
    }

    $guessesleft.textContent = guessesleft;
    $placeholders.textContent = pickedwordarray.join('');
    $guessedletters.textContent = incorrectletterlist;
}



function letterGuess(letter)
{
    if(guessedletterslist.indexOf(letter) === -1){
        guessedletterslist.push(letter);

        for(var i = 0; i < pickedword.length; i++)
        {
            if(pickedword[i].toLowerCase() === letter.toLowerCase())
            {
                pickedwordarray[i] = pickedword[i];
              
            }
        }

        $placeholders.textContent = pickedwordarray.join('');
            checkIncorrect(letter);
    }
    else
    {
        alert("You already guessed this letter");
    }
}


function checkIncorrect(letter)
{
    if(pickedwordarray.indexOf(letter.toLowerCase()) === -1 &&
                pickedwordarray.indexOf(letter.toUpperCase()) === -1)
            {  
                guessesleft--;             
                incorrectletterlist.push(letter);
                $guessedletters.textContent = incorrectletterlist.join(',');
                $guessesleft.textContent = guessesleft;
            }
          checkLose(); 
}

function checkLose()
{
  
    if(guessesleft == 0)
        {   
            losses++;          
            $losses.textContent = losses;
            newgame();
            alert("Oops you lose. The word was: " + pickedword + ". Let's try another word.");
            
        }           
        checkWin();           
}

function checkWin()
{
    if(pickedword.toLowerCase() === pickedwordarray.join('').toLowerCase())
    {
        wins++;  
        $wins.textContent = wins; 
        newgame();   
        alert("Awesome, you win. Now try next word!")
    }
}

document.onkeyup = function(event)
{
    if(event.keyCode >= 65 && event.keyCode <= 90)
        {
        letterGuess(event.key);  
        } 
};

document.onkeypress = function(event)
{
    if(event.keyCode >= 48 && event.keyCode <= 57)
    {
        newgame();
    }
}


//Pseudocode for image displaying

//for displaying image matching to the word we can user key, value pair in the array and can loop through when we need to 
//display text according to user guesses or image of matching word as value of key name 
// we can make array as like follows
// var wordlist =[
//     {name: 'apple', image: 'assets/images/apple.jpg'},
//     {name: 'bananas', image: 'assets/images/bananas.jpg'},
//     {name: 'grapes', image: 'assets/images/grapes.jpg'},
//     {name: 'orange', image: 'assets/images/orange.jpg'},
//     {name: 'peach', image: 'assets/images/peach.jpg'},
//     {name: 'plump', image: 'assets/images/plump.jpg'},
//     {name: 'raspberry', image: 'assets/images/raspberry.jpg'},
//     {name: 'strawberry', image: 'assets/images/strawberry.jpg'},
//     {name: 'blackberry', image: 'assets/images/blackberries.jpg'},   
// ]