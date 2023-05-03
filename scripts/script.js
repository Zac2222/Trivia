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
                else if(url == '../site/start.html')
                {
                    loadStart(response, ggQuestions)
                }
                
            });
}

function loadMenu(html)
{
    inject.innerHTML = html;
    let startBtn = document.getElementById('startBtn')
    startBtn.addEventListener('click',function(e){
        loadHTML('../site/start.html');
    });
}

function loadQuestions(url)
{
    fetch(url)
    .then(data => data.json())
    .then(response => {
        for(let i = 0; i < response.easy.length; i++)
        {
            ggQuestions.push(response.easy[i]);
        }
    })
}

function loadStart(html, questions)
{
    inject.innerHTML = html
    let questionCount = 0;
    let score = 0;
   
    console.log(questions);
    let q = document.getElementById('q');
    let a1 = document.getElementById('a1');
    let a2 = document.getElementById('a2');
    let a3 = document.getElementById('a3');
    let a4 = document.getElementById('a4');
    let c = document.getElementById('c');
    let correct = questions[questionCount].c
    let scoreText = document.getElementById('scoreText');
    let backBtn = document.getElementById('backBtn');
    
    q.innerText = questions[questionCount].q;
    a1.innerText = questions[questionCount].a1;
    a2.innerText = questions[questionCount].a2;
    a3.innerText = questions[questionCount].a3;
    a4.innerText = questions[questionCount].a4;
   
    score.innerText = `Score: ${score}`;

    backBtn.addEventListener('click',function(e){
        loadHTML('../site/menu.html');
    })

    a1.addEventListener('click',function(e){
        if(a1.innerText == correct)
        {
            score++;
            scoreText.innerText = `Score: ${score}`;
        }
        questionCount++;
        q.innerText = questions[questionCount].q;
        a1.innerText = questions[questionCount].a1;
        a2.innerText = questions[questionCount].a2;
        a3.innerText = questions[questionCount].a3;
        a4.innerText = questions[questionCount].a4;
        correct = questions[questionCount].c
    });
    a2.addEventListener('click',function(e){
        if(a2.innerText == correct)
        {
            score++;
            scoreText.innerText = `Score: ${score}`;
        }
        questionCount++;
        q.innerText = questions[questionCount].q;
        a1.innerText = questions[questionCount].a1;
        a2.innerText = questions[questionCount].a2;
        a3.innerText = questions[questionCount].a3;
        a4.innerText = questions[questionCount].a4;
        correct = questions[questionCount].c
    });
    a3.addEventListener('click',function(e){
        if(a3.innerText == correct)
        {
            score++;
            scoreText.innerText = `Score: ${score}`;
        }
        questionCount++;
        q.innerText = questions[questionCount].q;
        a1.innerText = questions[questionCount].a1;
        a2.innerText = questions[questionCount].a2;
        a3.innerText = questions[questionCount].a3;
        a4.innerText = questions[questionCount].a4;
        correct = questions[questionCount].c
    });
    a4.addEventListener('click',function(e){
        if(a4.innerText == correct)
        {
            score++;
            scoreText.innerText = `Score: ${score}`;
        }
        questionCount++;
        q.innerText = questions[questionCount].q;
        a1.innerText = questions[questionCount].a1;
        a2.innerText = questions[questionCount].a2;
        a3.innerText = questions[questionCount].a3;
        a4.innerText = questions[questionCount].a4;
        correct = questions[questionCount].c
    });
}

loadHTML('../site/menu.html');
loadQuestions('../data/data.json')