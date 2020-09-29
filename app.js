const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const asyncWrite = util.promisify(fs.writeFile);

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

const managerQuestion = {
  type: "input",
  message: "What is the office number of the team manager?",
  name: "office",
};

const roleQuestion = {
  type: "list",
  message: "What is the role of this employee?",
  choices: ["intern", "engineer"],
  name: "role",
};

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
    const employeeList = [];
    let goOn = true;
    const m = await inquirer.prompt([managerQuestion, ...employeeQuestions, continueQuestion]);
    const manager = new Manager(m.name, m.id, m.email, m.office);
    employeeList.push(manager);
    goOn = m.continue;
    if (!goOn) {
      return;
    }
    while (goOn) {
      const r = await inquirer.prompt([roleQuestion]);
      if (r.role === "intern") {
        const i = await inquirer.prompt([
          ...employeeQuestions,
          internQuestion,
          continueQuestion,
        ]);
        const intern = new Intern(i.name, i.id, i.email, i.school);
        employeeList.push(intern);
        goOn = i.continue;
      } else {
        const e = await inquirer.prompt([
          ...employeeQuestions,
          engineerQuestion,
          continueQuestion,
        ]);
        const engineer = new Engineer(e.name, e.id, e.email, e.github);
        employeeList.push(engineer);
        goOn = e.continue;
      }
    }
  const html = render(employeeList);
  await asyncWrite(outputPath, html);
  console.log("<==== html file written successfully ====>")
  } catch (error) {
    console.log(error);
  }
}

userQuestions();
