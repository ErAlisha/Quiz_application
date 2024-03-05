const questions = [
      {
            question: "Which of the following is NOT a common technique for visualizing multivariate data?",
            answers: [
                  {text : "Scatter plot",correct:true},
                  {text : "Bar chart",correct:false},
                  {text : "Heatmap",correct:false},
                  {text : "Parallel coordinates",correct:false},
            ]
      },
      {
            question: "Scatter plots are effective for visualizing relationships between:",
            answers: [
                  {text : "Two categorical variables",correct:false},
                  {text : "Two continuous variables",correct:true},
                  {text : "One categorical variable and one continuous variable",correct:false},
                  {text : "More than three variables",correct:false},
            ]
      },

      {
            question: "Heatmaps are best suited for displaying:",
            answers: [
                  {text : "Hierarchical data",correct:false},
                  {text : "TCategorical data with two or more levels",correct:false},
                  {text : "Relationships between a small number of continuous variables",correct:true},
                  {text : "Time series data",correct:false},
            ]
      },

      {
            question: "Parallel coordinates plots are useful for:",
            answers: [
                  {text : "Identifying clusters in high-dimensional data",correct:true},
                  {text : "Showing trends over time",correct:false},
                  {text : "Comparing distributions of two variables",correct:false},
                  {text : "Visualizing relationships between two categorical variables",correct:false},
            ]
      },

      {
            question: "Which of the following software tools is commonly used for creating multivariate data visualizations?",
            answers: [
                  {text : "Microsoft Excel",correct:false},
                  {text : "R",correct:true},
                  {text : "Tableau",correct:false},
                  {text : "All of the above",correct:false},
            ]
      },

      {
            question: "Which of the following visualizations can effectively display relationships between three continuous variables?",
            answers: [
                  {text : "Pie Chart",correct:false},
                  {text : " Scatter Plot (3D)",correct:true},
                  {text : "Bar Chart",correct:false},
                  {text : "Box Plot",correct:false},
            ]
      },

      {
            question: "Scatter plots show trends between two:",
            answers: [
                  {text : "Categories",correct:false},
                  {text : "Numbers",correct:true},
                  {text : "Colors",correct:false},
                  {text : "Texts",correct:false},
            ]
      },

      {
            question: "Brushing technique allows focusing on specific data points in:",
            answers: [
                  {text : "Linked visualizations",correct:true},
                  {text : "Separate charts",correct:false},
                  {text : "Pie charts",correct:false},
                  {text : "Bar graphs",correct:false},
            ]
      }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
      currentQuestionIndex=0;
      score=0;
      nextButton.innerHTML = "Next";
      showQuestion();
}

function showQuestion(){
      resetState();
      let currentQuestion = questions[currentQuestionIndex];
      let questionNo = currentQuestionIndex + 1;
      questionElement.innerHTML = questionNo + ". "+ currentQuestion.question;

      currentQuestion.answers.forEach(answer=>{
            const button = document.createElement("button");
            button.innerHTML = answer.text;
            button.classList.add("btn");
            answerButtons.appendChild(button);
            //it will see from above questions that which option is correct
            if(answer.correct){
                  button.dataset.correct=answer.correct;
            }
            button.addEventListener("click",selectAnswer);
      });
}
//this function will remove all the previous answers
function resetState(){
 nextButton.style.display="none";
 while(answerButtons.firstChild){
      answerButtons.removeChild(answerButtons.firstChild);
 }
}

//function to tell whether selected answer is right or wrong
function selectAnswer(e){
      const selectedBtn=e.target;
      const isCorrect=selectedBtn.dataset.correct==="true";
      if(isCorrect){
            selectedBtn.classList.add("correct");
            score++;
      }
      else{
            selectedBtn.classList.add("incorrect");
      }

      //on once selecting the wrong answer,correct answer will be highlighted and buttons will be disabled so that we can't chose any other button 
      Array.from(answerButtons.children).forEach(button=>{
            if(button.dataset.correct==="true"){
                  button.classList.add("correct");
            }
            button.disabled=true;
      });
      nextButton.style.display="block";
}

//function to show the score
function showScore(){
      resetState();
      questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
      nextButton.innerHTML="Play Again";
      nextButton.style.display="block";
}
//function for next button
function handleNextButton(){
      currentQuestionIndex++;
      if(currentQuestionIndex<questions.length){
            showQuestion();
      }else{
            showScore();
      }
}

nextButton.addEventListener("click",()=>{
      if(currentQuestionIndex<questions.length){
            handleNextButton();  //basically abhi questions bache hain
      }
      else{
            startQuiz();
      }
});
startQuiz();
