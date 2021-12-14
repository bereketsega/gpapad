let coursesContainer;
let courseCounter = 1;

function createCourseRows() {
  const mainContainer = document.getElementById("main-container");

  coursesContainer = document.createElement("div");
  coursesContainer.id = "course" + courseCounter;
  coursesContainer.className = "courses";

  const courseName = document.createElement("input");
  courseName.type = "text";
  courseName.id = "courseName";
  courseName.placeholder = "course";

  const creditAmount = document.createElement("input");
  creditAmount.type = "number";
  creditAmount.id = "creditAmount";
  creditAmount.placeholder = "credit";

  const courseGrade = document.createElement("select");
  courseGrade.id = "courseGrade";

  const gpaScaleGrade = [
    "0",
    "4",
    "3.7",
    "3.3",
    "3",
    "2.7",
    "2.3",
    "2",
    "1.7",
    "1.3",
    "1",
    "0",
  ];
  const letterGrades = [
    "",
    "A",
    "A-",
    "B+",
    "B",
    "B-",
    "C+",
    "C",
    "C-",
    "D+",
    "D",
    "F",
  ];

  for (let i = 0; i < 12; i++) {
    const gradeOption = document.createElement("option");
    gradeOption.setAttribute("value", gpaScaleGrade[i]);
    gradeOption.innerHTML = letterGrades[i];
    courseGrade.appendChild(gradeOption);
  }

  coursesContainer.appendChild(courseName);
  coursesContainer.appendChild(creditAmount);
  coursesContainer.appendChild(courseGrade);

  mainContainer.appendChild(coursesContainer);

  courseCounter++;
}

for (let i = 0; i < 4; i++) {
  createCourseRows();
}

function addCourse() {
  removeCourseBtn = document.createElement("input");
  removeCourseBtn.type = "button";
  removeCourseBtn.value = "Delete";
  removeCourseBtn.setAttribute("id", courseCounter);
  removeCourseBtn.setAttribute("class", "delete-btn");

  createCourseRows();

  coursesContainer.appendChild(removeCourseBtn);

  coursesContainer.style.padding = "0px 0px 0px 60px";

  removeCourseBtn.onclick = function () {
    deleteCourse(this.id);
  };
}

function deleteCourse(removeCourseBtnId) {
  let removeCourse = document.getElementById("course" + removeCourseBtnId);
  removeCourse.remove();
}

let gpa = 0;

function calculateGpa() {
  const courses = document.getElementsByClassName("courses");

  let points = 0;
  let credits = 0;

  for (let i = 0; i < courses.length; i++) {
    const credit = parseFloat(courses.item(i).childNodes[1].value);
    const grade = parseFloat(courses.item(i).childNodes[2].value);

    if (!(credit <= 0 || isNaN(credit))) {
      points += credit * grade;
      credits += credit;
    }
  }
  gpa = Math.round((points / credits) * 100) / 100;

  if (!isNaN(gpa)) {
    displayGpa(gpa);
  }
}

function displayGpa(gpa) {
  const gpaContainer = document.getElementById("gpaContainer");

  if (gpa == 0 || gpa == 1 || gpa == 2 || gpa == 3 || gpa == 4) {
    gpa = gpa + ".0";
  }

  gpaContainer.innerHTML = gpa;
  switch (true) {
    case 3.7 <= gpa && gpa <= 4:
      gpaContainer.style.backgroundColor = "#2ce574";
      break;
    case 2.7 <= gpa && gpa < 3.69:
      gpaContainer.style.backgroundColor = "#cdf03a";
      break;
    case 1.7 <= gpa && gpa < 2.69:
      gpaContainer.style.backgroundColor = "#ffe500";
      break;
    case 0.7 <= gpa && gpa < 1.69:
      gpaContainer.style.backgroundColor = "#ff9600";
      break;
    case gpa <= 0.69:
      gpaContainer.style.backgroundColor = "#ff3925";
      break;
    default:
      gpaContainer.style.backgroundColor = "none";
      break;
  }
}
