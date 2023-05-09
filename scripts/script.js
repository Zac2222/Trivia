let inject = document.getElementById('inject');
let ggQuestions = [];
let score = 0
let value = 0
let easyScore = 0;
let mediumScore = 0
let hardScore = 0;
let body = document.querySelector('body'); //getting the body so we can change the background

function loadHTML(url)
{
    fetch(url)
        .then(data => data.text())
            .then(response => {
                if(url == '../site/menu.html')
                {
                    loadMenu(response);
                }
                else if(url == '../site/difficulty.html')
                {
                    loadDifficulty(response);
                }
                else if(url == '../site/stage.html')
                {
                    loadStage(response, body);
                }
                else if(url == '../site/start.html')
                {
                    loadStart(response, ggQuestions)
                }
                else if(url == '../site/end.html')
                {
                    loadEnd(response, score, value);
                }
            });
}

function loadMenu(html)
{
    inject.innerHTML = html;
    //setting all audio in the menu so that i have access to them, and then pausing all of them so music stops when exiting back to menu
    //maybe i could have done this better by making a seperate music function or something but i was struggling to get that to work so this is what i came up with
    let django = document.getElementById('django');
    let audio1 = document.getElementById('heavyDay');
    let audio2 = document.getElementById('aloneInfection');
    let audio3 = document.getElementById('kissOfDeath');
    let audio4 = document.getElementById('birthdayTrain');
    let audio5 = document.getElementById('smellOfTheGame');
    let audio6 = document.getElementById('slash');
    audio1.pause();
    audio2.pause();
    audio3.pause();
    audio4.pause();
    audio5.pause();
    audio6.pause();
    //the music wont start when the page loads for some reason, i tried so many different things and nothing seems to work, making a music function, calling it in other places, autoplay, in the html itself, nothing
    //it will play when the menu is loaded from anywhere else though, going into stage select then going back, or playing a game and returning to menu will play the music
    //for the sake of my sanity lets call it a feature, you unlock menu music after playing the game for the first time :O
    django.play();
    django.volume = 0.1;
    let startBtn = document.getElementById('startBtn');
    let stageSelect = document.getElementById('stageSelect');
    let quitBtn = document.getElementById('quitBtn');
    startBtn.addEventListener('click',function(e){
        loadHTML('../site/difficulty.html');
    });
    stageSelect.addEventListener('click',function(e){
        loadHTML('../site/stage.html')
    });
    quitBtn.addEventListener('click',function(e){
        window.location.href = "https://youtu.be/KmGUgG4vFPM"
    });
}

function loadDifficulty(html)
{
    inject.innerHTML = html;
    let easyBtn = document.getElementById('easyBtn')
    let mediumBtn = document.getElementById('mediumBtn')
    let hardBtn = document.getElementById('hardBtn')
    ggQuestions = []; //resets the array because the questions where just adding onto eachother instead of having just the new set
    value = 0;
    
    easyBtn.addEventListener('click',function(e){
        value = 1;
        let audio = document.getElementById('heavyDay');
        audio.play();
        audio.volume = 0.1;
        loadQuestions('../data/data.json', value);
    });
    mediumBtn.addEventListener('click',function(e){
        value = 2;
        let audio = document.getElementById('aloneInfection');
        audio.play();
        audio.volume = 0.1;
        loadQuestions('../data/data.json', value);
    });
    hardBtn.addEventListener('click',function(e){
        value = 3;
        let audio = document.getElementById('kissOfDeath');
        audio.play();
        audio.volume = 0.1;
        loadQuestions('../data/data.json', value);
    });
    
}

function loadQuestions(url, difficulty)
{
    fetch(url)
    .then(data => data.json())
    .then(response => {
        if(difficulty === 1)
        {
            for(let i = 0; i < response.easy.length; i++)
            {
                ggQuestions.push(response.easy[i]);
            }
            loadHTML('../site/start.html')
        }
        else if(difficulty === 2)
        {
            for(let i = 0; i < response.medium.length; i++)
            {
                ggQuestions.push(response.medium[i]);
            }
            loadHTML('../site/start.html')
        }
        else if(difficulty === 3)
        {
            for(let i = 0; i < response.hard.length; i++)
            {
                ggQuestions.push(response.hard[i]);
            }
            loadHTML('../site/start.html')
        }
        
        
    });
}

//i realize this all could have been split into multiple seperate functions, but like i didnt, and i should have i know
function loadStart(html, questions)
{
    inject.innerHTML = html
    let audio = document.getElementById('django'); //pausing menu audio from here for the same reasons as listen in the menu function
    let timeOut = document.getElementById('slash');
    django.pause();
    let questionCount = 0;
    let totalQuestions = questions.length;
    score = 0;
    console.log(questions);
    let q = document.getElementById('q');
    let a1 = document.getElementById('a1');
    let a2 = document.getElementById('a2');
    let a3 = document.getElementById('a3');
    let a4 = document.getElementById('a4');
    let next = document.getElementById('next')
    let c = document.getElementById('c');
    let timer = document.getElementById('timer');
    let correct = questions[questionCount].c
    let scoreText = document.getElementById('scoreText');
    let questionText = document.getElementById('questionText')
    let backBtn = document.getElementById('backBtn');

   
    
    q.innerText = questions[questionCount].q;
    a1.innerText = questions[questionCount].a1;
    a2.innerText = questions[questionCount].a2;
    a3.innerText = questions[questionCount].a3;
    a4.innerText = questions[questionCount].a4;
    next.disabled = true;
    function startTimer() //timer function that iterates to the next questions if time runs out
    {
        timer.style.color = 'azure'
        let countdown = 20;
        interval = setInterval(() => {
            countdown--;
            timer.innerText = countdown;
            if(countdown == 0)
            {
                if(questionCount == 19)
                {
                    loadHTML('../site/end.html');
                }
                else
                {
                    slash.currentTime = 3; //the audio is 5 seconds but the sound affects only plays toward the end so this plays just the sound where it starts (because i dont know how to edit audio files)
                    slash.play();
                    slash.volume = 0.5;
                    a1.disabled = true;
                    a2.disabled = true;
                    a3.disabled = true;
                    a4.disabled = true;
                    next.disabled = false;
                    clearInterval(interval);
                    timer.innerText = 'SLASH!'
                    timer.style.color = 'red'; //font color for the correct answer turns red instead of green since you ran out of time so didnt even choose an answer, just a style choice i think is cool
                    switch(correct)
                    {
                    case a1.innerText:
                    a1.style.color = 'red';
                    break;
                    case a2.innerText:
                    a2.style.color = 'red';
                    break;
                    case a3.innerText:
                    a3.style.color = 'red';
                    break;
                    case a4.innerText:
                    a4.style.color = 'red';
                    break;
                    }
                }
            }
        },1000);
    }
    startTimer();
   
    score.innerText = `Score: ${score}`;
    

    backBtn.addEventListener('click',function(e){
        loadHTML('../site/menu.html');
    })

    a1.addEventListener('click',function(e){
        if(a1.innerText == correct)
        {
            score++;
            scoreText.innerText = `Score: ${score}/20`;

        }
        a1.disabled = true;
        a2.disabled = true;
        a3.disabled = true;
        a4.disabled = true;
        next.disabled = false;
        clearInterval(interval);
        switch(correct) //finds the correct answer and sets it to green so you know which answer it was
        {
           case a1.innerText:
            a1.style.color = 'green';
            break;
           case a2.innerText:
            a2.style.color = 'green';
            break;
           case a3.innerText:
            a3.style.color = 'green';
            break;
           case a4.innerText:
            a4.style.color = 'green';
            break;
        }
    });
    a2.addEventListener('click',function(e){
        if(a2.innerText == correct)
        {
            score++;
            scoreText.innerText = `Score: ${score}/20`;
        }
        a1.disabled = true;
        a2.disabled = true;
        a3.disabled = true;
        a4.disabled = true;
        next.disabled = false;
        clearInterval(interval);
        switch(correct)
        {
           case a1.innerText:
            a1.style.color = 'green';
            break;
           case a2.innerText:
            a2.style.color = 'green';
            break;
           case a3.innerText:
            a3.style.color = 'green';
            break;
           case a4.innerText:
            a4.style.color = 'green';
            break;
        }
    });
    a3.addEventListener('click',function(e){
        if(a3.innerText == correct)
        {
            score++;
            scoreText.innerText = `Score: ${score}/20`;
        }
        a1.disabled = true;
        a2.disabled = true;
        a3.disabled = true;
        a4.disabled = true;
        next.disabled = false;
        clearInterval(interval);
        switch(correct)
        {
           case a1.innerText:
            a1.style.color = 'green';
            break;
           case a2.innerText:
            a2.style.color = 'green';
            break;
           case a3.innerText:
            a3.style.color = 'green';
            break;
           case a4.innerText:
            a4.style.color = 'green';
            break;
        }
    });
    a4.addEventListener('click',function(e){
        if(a4.innerText == correct)
        {
            score++;
            scoreText.innerText = `Score: ${score}/20`;
        }
        a1.disabled = true;
        a2.disabled = true;
        a3.disabled = true;
        a4.disabled = true;
        next.disabled = false;
        clearInterval(interval);
        switch(correct)
        {
           case a1.innerText:
            a1.style.color = 'green';
            break;
           case a2.innerText:
            a2.style.color = 'green';
            break;
           case a3.innerText:
            a3.style.color = 'green';
            break;
           case a4.innerText:
            a4.style.color = 'green';
            break;
        }
    });
    next.addEventListener('click',function(e){ //next button because i wanted to add a way to see the correct answer and also give some breathing room between questions
        if(questionCount == 19)
        {
            loadHTML('../site/end.html');
        }
        else
        {
            questionCount++;
            questionText.innerText = `Question: ${questionCount + 1}`;
            a1.disabled = false;
            a2.disabled = false;
            a3.disabled = false;
            a4.disabled = false;
            next.disabled = true;
            q.innerText = questions[questionCount].q;
            a1.innerText = questions[questionCount].a1;
            a2.innerText = questions[questionCount].a2;
            a3.innerText = questions[questionCount].a3;
            a4.innerText = questions[questionCount].a4;
            correct = questions[questionCount].c
            countdown = 20;
            timer.innerText = countdown;
            a1.style.color = 'azure';
            a2.style.color = 'azure';
            a3.style.color = 'azure';
            a4.style.color = 'azure';
            startTimer();
        }
        
    });
}

function loadEnd(html, score, value)
{
    inject.innerHTML = html;
    let finalScore = document.getElementById('finalScore');
    let unlockText = document.getElementById('unlockText');
    let endMenuBtn = document.getElementById('endMenuBtn');
    let smellOfTheGame = document.getElementById('smellOfTheGame');
    let birthdayTrain = document.getElementById('birthdayTrain');
    let audio1 = document.getElementById('heavyDay');
    let audio2 = document.getElementById('aloneInfection');
    let audio3 = document.getElementById('kissOfDeath');
    let audio4 = document.getElementById('birthdayTrain');
    let audio5 = document.getElementById('django');
    audio1.pause();
    audio2.pause();
    audio3.pause();
    audio4.pause();
    audio5.pause();
    switch(value) //adds the score value to one of these three values so it can be stored seperatly for each difficulty and keeps it when returning to menu
    {
        case 1:
            easyScore = score;
            break;
        case 2:
            mediumScore = score;
            break;
        case 3:
            hardScore = score;
            break;
        default:
            console.log('what?');
            break;

    }

    finalScore.innerText = `${score}/20`
    if(score >= 10) //plays different music  depending on if the score is above or below 10
    {
        smellOfTheGame.play();
        smellOfTheGame.volume = 0.1;
        unlockText.innerText = 'You unlocked a new stage, it has been added to stage select!'
    }
    else if(score < 10)
    {
        birthdayTrain.play();
        birthdayTrain.volume = 0.1;
    }
    endMenuBtn.addEventListener('click',function(e){
        loadHTML('../site/menu.html' );
    });
}

function loadStage(html, background)
{
    inject.innerHTML = html;
    let family = document.getElementById('family')
    let canyon = document.getElementById('canyon')
    let nightmare = document.getElementById('nightmare')
    let council = document.getElementById('council')
    let done = document.getElementById('done')
    canyon.disabled = true;
    nightmare.disabled = true;
    council.disabled = true;

    if(easyScore >= 10) //the points stored in the loadEnd function will allow for unlockable backgrounds if you score 10 or more on a difficulty (this is my favorite addition i made and im really proud of it :>)
    {
        canyon.disabled = false;
    }
    
    if(mediumScore >= 10)
    {
        nightmare.disabled = false;
    }
    
    if(hardScore >= 10)
    {
        council.disabled = false;
    }


    family.addEventListener('click',function(e){
        background.style.backgroundImage = "url('/images/stage.png')";
    });
    canyon.addEventListener('click',function(e){
        background.style.backgroundImage = "url('/images/easy.png')";
    });
    nightmare.addEventListener('click',function(e){
        background.style.backgroundImage = "url('/images/medium.png')";
    });
    council.addEventListener('click',function(e){
        background.style.backgroundImage = "url('/images/hard.png')";
    });
    done.addEventListener('click',function(e){
        loadHTML('../site/menu.html' );
    });
}

loadHTML('../site/menu.html' );

