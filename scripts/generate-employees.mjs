import fs from "fs";

const firstNames = ["Aarav","Isha","Riya","Kabir","Anaya","Vihaan","Nisha","Samar","Meera","Arjun"];
const lastNames  = ["Sharma","Verma","Gupta","Singh","Khan","Patel","Joshi","Yadav","Roy","Das"];
const departments = ["Engineering","Security","Finance","HR","Product","Design","Sales","Support"];
const roles = ["Developer","QA","Manager","Analyst","Architect","Engineer","Lead","Consultant"];
const locations = ["Bangalore","Pune","Hyderabad","Mumbai","Delhi","Chennai","Kolkata"];
const levels = ["Junior","Mid","Senior","Lead"];

const count = 1000;
const employees = [];

for (let i = 1; i <= count; i++) {
  const fn = firstNames[i % firstNames.length];
  const ln = lastNames[i % lastNames.length];
  const name = `${fn} ${ln}`;

  employees.push({
    id: String(i),
    name,
    email: `${fn.toLowerCase()}.${ln.toLowerCase()}${i}@example.com`,
    department: departments[i % departments.length],
    role: roles[i % roles.length],
    location: locations[i % locations.length],
    level: levels[i % levels.length],
  });
}

fs.writeFileSync("src/assets/employees.json", JSON.stringify(employees, null, 2));
console.log(" Generated src/assets/employees.json with", employees.length, "employees");
