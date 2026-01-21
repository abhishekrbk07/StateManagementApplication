/* tools/generate-announcements.cjs */
const fs = require("fs");
const path = require("path");

const titles = [
  "Security Patch Window",
  "Office Holiday Update",
  "New HR Policy: Attendance",
  "Payroll Processing Notice",
  "VPN Maintenance",
  "Quarterly Townhall",
  "System Downtime Alert",
  "Benefits Enrollment Reminder",
  "New Joiners Orientation",
  "Parking Access Changes",
];

const messages = [
  "Please plan your work accordingly. Some services may be temporarily unavailable during the maintenance window.",
  "This is a friendly reminder to review the updated policy and reach out to HR for any clarifications.",
  "We are rolling out improvements to internal tools for faster performance and better stability.",
  "If you face any issues, contact IT support with your employee ID and a brief description.",
  "Thanks for your cooperation. We’ll share the completion update once the work is finished.",
];

const authors = ["HR Team", "IT Ops", "Security", "Admin", "Finance", "Management"];
const priorities = ["Info", "Important", "Critical"];

const count = 60;
const announcements = [];

const now = Date.now();
const dayMs = 24 * 60 * 60 * 1000;

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (let i = 1; i <= count; i++) {
  const title = pick(titles);
  const message = pick(messages);

  // last 45 days
  const postedAt = new Date(now - randInt(0, 45) * dayMs - randInt(0, 12) * 60 * 60 * 1000).toISOString();

  // make some unread
  const read = Math.random() > 0.35;

  // weighted priority: mostly Info
  const r = Math.random();
  const priority = r < 0.7 ? "Info" : r < 0.93 ? "Important" : "Critical";

  announcements.push({
    id: String(i),
    title,
    message,
    author: pick(authors),
    postedAt,
    priority,
    read,
  });
}

// newest first
announcements.sort((a, b) => (b.postedAt || "").localeCompare(a.postedAt || ""));

const out = path.join(process.cwd(), "src/assets/announcements.json");
fs.writeFileSync(out, JSON.stringify(announcements, null, 2));
console.log("✅ Generated", out, "with", announcements.length, "announcements");
