document.addEventListener("DOMContentLoaded", () =>{

    const questionContainer = document.getElementById("question-container");
    const questionText = document.getElementById("question-text");
    const choicesList = document.getElementById("choices-list");
    const resultContainer = document.getElementById("result-container");
    const scoreDisplay = document.getElementById("score");
    const nextBtn = document.getElementById("next-btn");
    const restartBtn = document.getElementById("restart-btn");
    const startBtn = document.getElementById("start-btn");

    let counter = 0; 
    let score = 0;
    let total = 0;


    const quizes = [
        { 
            question : "What is the capital of France?", 
            options : ["Paris", "Sydney", "New Delhi", "London"],
            answer : "Paris",
            score_on_correct : 10   
        },
        {
            question : "Which planet is known as Red Planet?", 
            options : ["Earth", "Saturn", "Jupiter", "Mars"],
            answer : "Mars",
            score_on_correct : 10
        },
        {
            question : "What is the official language of Germany?", 
            options : ["Hindi", "English", "French", "German"],
            answer : "German",
            score_on_correct : 10   
        },
        {
            question : "In which country would you find the Sydney Opera House?", 
            options : ["England", "Australia", "India", "Scotland"],
            answer : "Australia",
            score_on_correct : 10   
        },
        {
            question : "How many letters are in the English alphabet?", 
            options : ["20", "19", "26", "35"],
            answer : "26",
            score_on_correct : 10   
        },
        {
            question : "How many days are there in a year?", 
            options : ["300", "365", "289", "367"],
            answer : "365",
            score_on_correct : 10   
        },
        {
            question : "What is the name of a shape with 5 sides?", 
            options : ["Pentagon", "Hexagon", "Square", "Trapezium"],
            answer : "Pentagon",
            score_on_correct : 10   
        },
        {
            question : "How many colors of the rainbow are there?", 
            options : ["4", "9", "7", "6"],
            answer : "7",
            score_on_correct : 10   
        }
            
    ]

    startBtn.addEventListener("click", startQuiz)
    
    function startQuiz(){
        questionContainer.classList.remove("hidden")
        startBtn.classList.add("hidden")
        resultContainer.classList.add("hidden")
        showQuestion()
    }

    function showQuestion(){
        nextBtn.classList.add("hidden")
        questionText.textContent = quizes[counter].question
        const choices = quizes[counter].options;
        choicesList.innerHTML = ""
        choices.forEach((choice) => {
            const li = document.createElement("li")
            li.setAttribute("data-id", counter)
            li.textContent = choice
            choicesList.appendChild(li);
        })
        
}

choicesList.addEventListener("click", (e) => {
    if(e.target.tagName === "LI")
        selectAnswer(e)
});

function selectAnswer(event){
    
    const choiceVal = event.target.innerHTML
    const choiceIndex = parseInt(event.target.getAttribute("data-id"))
    if(quizes[choiceIndex].answer === choiceVal){
        score = score + quizes[choiceIndex].score_on_correct
        event.target.classList.add("correctGreen")
    }else{
        event.target.classList.add("wrongRed")
    }
    const chLists = choicesList.querySelectorAll("li")
    chLists.forEach((item) =>{// For disabling li after answer has been selected
        item.classList.add("disable")
        item.addEventListener("click", (e) =>{
        e.stopPropagation();
        e.preventDefault();
        })
    })
    total = total + quizes[choiceIndex].score_on_correct
    nextBtn.classList.remove("hidden")
} 

function displayScore(){
    counter++;
    if(counter < quizes.length){
        showQuestion();
    }else{
        nextBtn.classList.add("hidden")
        questionContainer.classList.add("hidden")
        restartBtn.classList.remove("hidden")
        resultContainer.classList.remove("hidden")
        scoreDisplay.textContent = `${score} out of ${total}`
    }
}

nextBtn.addEventListener("click", displayScore)

restartBtn.addEventListener("click", () =>{
    counter = 0
    score = 0
    total = 0
    resultContainer.classList.add("hidden")
    startQuiz()
})
   
})