//Named export - Has a name. Have as many as needed.
//Default export - Has no name. You can only have one.

const message = "Some message from mymodule.js";

const name = "Bilal";

const location = "Islamabad";

const getGreeting = (name) => {
  return `Welcome to the course ${name}`;
};

export { message, name, getGreeting, location as default };
