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

const employeeQuestions = [
  {
    type: "input",
    message: "What is the name of this employee?",
    name: "name",
    validate: async input => {
      const nameRe = /^[a-zA-Z _]+$/;
      if (!input.match(nameRe)) {
        return "please provide valid name";
      }
      return true;
    }
  },
  {
    type: "input",
    message: "What is the employee's id no.?",
    name: "id",
    validate: async input => {
      const idRe = /^[0-9]+$/;
      if (!input.match(idRe)) {
        return "please provide a numerical value for id";
      }
      return true;
    }
  },
  {
    type: "input",
    message: "What is the employee's email address?",
    name: "email",
    validate: async input => {
      const emailRe = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
      if (!input.match(emailRe)) {
        return "please provide valid email";
      }
      return true;
    }
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
  console.log("\x1b[36m", "<==== html file written successfully ====>")
  } catch (error) {
    console.log(error);
  }
}

userQuestions();
