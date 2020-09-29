const Employee = require("./Employee")

// methods and properties specific to manager employees
class Manager extends Employee {

    constructor(name, id, email, officeNumber) {

        const officeRe = /^[0-9]+$/;
        if (!officeNumber.match(officeRe)) {
          throw new Error("Please enter a numerical digit for office number")
        }
        
        super(name, id, email);
        this.officeNumber = officeNumber;
    }

    getRole() {
        return 'Manager';
    }

    getOfficeNumber() {
        return this.officeNumber;
    }
}

module.exports = Manager;