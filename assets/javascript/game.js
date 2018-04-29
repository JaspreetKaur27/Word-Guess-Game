
//References from the HTML
var $placeholders = document.getElementById('placeholders');
var $guessedletters = document.getElementById('guessed-letters');
var $guessesleft = document.getElementById('guesses-left');
var $wins = document.getElementById('wins');
var $losses = document.getElementById('losses');
var $message = document.getElementById('message');
var $msgtitle = document.getElementById('msgtitle');
var $msgtext = document.getElementById('msgtext');
var $image = document.getElementById('image');


//Created local variables to do JAvascript Functionality
var wordlist= ['apple','bananas','grapes'];
var images = ['assets/images/apple.jpg','assets/images/bananas.jpg', 'assets/images/grapes.jpg']
var wins = 0;
var losses = 0;
var guessesleft = 9;
var pickedword = '';
var pickedwordarray = [];
var guessedletterslist = [];
var incorrectletterlist = [];


function newgame()
{
    guessesleft = 9;
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

    for(var i = 0; i < images.length; i++)
    {
        if(images[i] == pickedwordarray[i])
        {
            $image.innerHTML = '<img src="'+ images[i] +'">';
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
                alert("Oops you lose. The word was: " + pickedword);
            }           
            checkWin();           
}

function checkWin()
{
    if(pickedword.toLowerCase() === pickedwordarray.join('').toLowerCase())
    {
        wins++;  
        $wins.textContent = wins;    
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
