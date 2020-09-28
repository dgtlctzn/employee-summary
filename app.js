const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

const employeeQuestions = [
  {
    type: "input",
    message: "What is the name of this employee?",
    name: "name",
  },
  {
    type: "input",
    message: "What is the employee's id no.?",
    name: "id",
  },
  {
    type: "input",
    message: "What is the employee's email address?",
    name: "email",
  },
];

const continueQuestion = {
  name: "continue",
  type: "confirm",
  message: "Would you like to add another employee?",
};

const managerQuestions = [
  {
    type: "input",
    message: "What is the office number of the team manager?",
    name: "office",
  },
  ...employeeQuestions,
];

const roleQuestion = [
  {
    type: "list",
    message: "What is the role of this employee?",
    choices: ["intern", "engineer"],
    name: "role",
  },
];

const engineerQuestion = {
  type: "input",
  message: "What is the employee's Github username?",
  name: "github",
};

const internQuestion = {
  type: "input",
  message: "What school is the intern enrolled in?",
  name: "school",
};

async function userQuestions() {
  try {
    // let done = false;
    let goOn = true;
    while (goOn) {
      const m = await inquirer.prompt(managerQuestions);
      const manager = new Manager(m.name, m.id, m.email, m.office);
      const r = await inquirer.prompt(roleQuestion);
      if (r.role === "intern") {
        employeeQuestions.push(internQuestion);
        i = await inquirer.prompt(employeeQuestions);
        const intern = new Intern(i.name, i.id, i.email, i.school);
        const cont = await inquirer.prompt(continueQuestion);
        goOne = cont.continue;
      } else {
        employeeQuestions.push(engineerQuestion);
        e = await inquirer.prompt(employeeQuestions);
        const engineer = new Engineer(e.name, e.id, e.email, e.github);
        const cont = await inquirer.prompt(continueQuestion);
        goOn = cont.continue;
      }
    //   if (!m.continue || !cont.continue) {
        // done = true;
    //   }
    }
  } catch (error) {
    console.log(error);
  }
}

userQuestions();
