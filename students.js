var message = "";
var student;
var search;

function print(message) {
  var outputDiv = document.getElementById("output");
  outputDiv.innerHTML = message;
}

function getStudentReport(student) {
  var report = "<h2>Student: " + students.name + "</h2>";
  report = "<p>Track: " + students.track + "</p>";
  report = "<p>Achievements: " + students.achievements + "</p>";
  report = "<p>Points: " + students.points + "</p>";
}

var students = [
  {name: "Amanda",
  track: "iOS",
  achievements: 10,
  points: 2550},
  {name: "Jude",
  track: "Web Design",
  achievements: 12,
  points:2860},
  {name: "Emily",
  track: "Front End Development",
  achievements: 8,
  points: 2245},
  {name: "Peter",
  track: "iOS",
  achievements: 6,
  points: 1950},
  {name: "Teresa",
  track: "Web Design",
  achievements: 16,
  points: 3420},
];

while (true) {
  search = prompt("Please enter a student's name. To end, type quit.");
  if (search() === null || search.toLowerCase() === "quit") {
    break;
    }
  for (var i = 0; i < students.length; i += 1) {
    student = students[i];
    if (students.name === search) {
      message = getStudentReport(students);
      print(message);
    }
  }
}

function edit();
