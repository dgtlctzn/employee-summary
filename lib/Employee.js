// base Employee class for properties inherent to all employees
class Employee {
  constructor(name, id, email) {
    if (typeof name !== "string") {
      throw new Error(`Please enter a string for the name argument not a(n) ${typeof name}`)
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
