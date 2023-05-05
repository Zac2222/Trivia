let inject = document.getElementById('inject');
let ggQuestions = [];

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
                else if(url == '../site/start.html')
                {
                    loadStart(response, ggQuestions)
                }
                else if(url == '../site/end.html')
                {
                    loadEnd(response, score);
                }
            });
}

function loadMenu(html)
{
    inject.innerHTML = html;
    let startBtn = document.getElementById('startBtn')
    startBtn.addEventListener('click',function(e){
        loadHTML('../site/difficulty.html');
    });
}

function loadDifficulty(html)
{
    inject.innerHTML = html;
    let easyBtn = document.getElementById('easyBtn')
    let mediumBtn = document.getElementById('mediumBtn')
    let hardBtn = document.getElementById('hardBtn')
    ggQuestions = []; //resets the array because the questions where just adding onto eachother instead of having just the new set
    let value = 0;
    
    easyBtn.addEventListener('click',function(e){
        value = 1;
        loadQuestions('../data/data.json', value);
    });
    mediumBtn.addEventListener('click',function(e){
        value = 2;
        loadQuestions('../data/data.json', value);
    });
    hardBtn.addEventListener('click',function(e){
        value = 3;
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

function loadStart(html, questions)
{
    inject.innerHTML = html
    let questionCount = 0;
    let score = 0;
    let totalQuestions = questions.length;
   
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
    let backBtn = document.getElementById('backBtn');

   
    
    q.innerText = questions[questionCount].q;
    a1.innerText = questions[questionCount].a1;
    a2.innerText = questions[questionCount].a2;
    a3.innerText = questions[questionCount].a3;
    a4.innerText = questions[questionCount].a4;

    function startTimer()
    {
        let countdown = 20;
        interval = setInterval(() => {
            countdown--;
            timer.innerText = countdown;
            if(countdown == 0)
            {
                questionCount++;
                q.innerText = questions[questionCount].q;
                a1.innerText = questions[questionCount].a1;
                a2.innerText = questions[questionCount].a2;
                a3.innerText = questions[questionCount].a3;
                a4.innerText = questions[questionCount].a4;
                correct = questions[questionCount].c
                countdown = 20;
                timer.innerText = countdown;
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
    next.addEventListener('click',function(e){
        questionCount++;
        a1.disabled = false;
        a2.disabled = false;
        a3.disabled = false;
        a4.disabled = false;
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
    });
}

function loadEnd(html, score)
{
    inject.innerHTML = html;
    let test = document.getElementById('test');
    test.innerText = score;
}

loadHTML('../site/menu.html');

