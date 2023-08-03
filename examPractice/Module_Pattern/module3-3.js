const Person = require('./module_pattern3');
const personObj1 = new Person();
personObj1.getName();
personObj1.name = 'Emma Smith';
personObj1.getName();



const Person2 = require('./module_pattern3');
const personObj2 = new Person2();
personObj2.getName(); 