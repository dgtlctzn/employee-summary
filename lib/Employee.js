// base Employee class for properties inherent to all employees
class Employee {
  constructor(name, id, email) {
    const re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    // if (typeof name !== "string") {
    //   throw new Error(`Please enter a string for the name argument not a(n) ${typeof name}`)
    // }
    if (!email.match(re)) {
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
