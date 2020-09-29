// base Employee class for properties inherent to all employees
class Employee {
  constructor(name, id, email) {
    // regex to reject invalid arguments
    const emailRe = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const nameRe = /^[a-zA-Z]+$/;
    const idRe = /^[0-9]+$/;

    if (!name.match(nameRe)) {
      throw new Error("Please enter a valid name")
    }
    if (!id.match(idRe)) {
      throw new Error("Please enter a numerical number for the id")
    }
    if (!email.match(emailRe)) {
      throw new Error("please provide valid email address");
    }

    this.name = name;
    this.id = id;
    this.email = email;
  }

  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }

  getEmail() {
    return this.email;
  }

  getRole() {
    return "Employee";
  }
}

module.exports = Employee;
