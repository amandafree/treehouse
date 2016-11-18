//Create Questions
var questions = [
  new Question("Who was the first president of the United States?", ["George Washington", "Thomas Jefferson"], "George Washington"),
  new Question("What is the answer to the ultimate question of life, the universe, and everything?", ["Pi", "42"], "42")
];

//Create Quiz
var quiz = new Quiz(questions);

//Display Quiz
QuizUI.displayNext();
