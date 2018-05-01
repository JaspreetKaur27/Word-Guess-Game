
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

    $guessesleft.textContent = guessesleft;
    $placeholders.textContent = pickedwordarray.join('');
    $guessedletters.textContent = incorrectletterlist;
    document.getElementById('imagedisplay').innerHTML = "";
}

function showimage(pickedword)
{
    var image = document.createElement("img");
    image.setAttribute("src","./assets/images/" + pickedword + ".jpg");
    document.getElementById("imagedisplay").append(image);

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
        showimage(pickedword);
        // newgame();   
        
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


