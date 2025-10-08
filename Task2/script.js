// ====== TAB SWITCHING ======
const tabs = document.querySelectorAll('.tab-btn');
const sections = document.querySelectorAll('.tab-section');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.target;
    sections.forEach(sec => sec.classList.remove('active'));
    document.getElementById(target).classList.add('active');
  });
});

// Show Contact by default
document.getElementById('contact').classList.add('active');

// ====== CONTACT FORM ======
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const msg = document.getElementById("contactMsg");

  if (!name || !email || !message) {
    msg.textContent = "Please fill all fields.";
    msg.style.color = "red";
    return;
  }
  const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
  if (!emailRegex.test(email)) {
    msg.textContent = "Enter a valid email.";
    msg.style.color = "red";
    return;
  }
  msg.textContent = "Message sent successfully!";
  msg.style.color = "green";
  document.getElementById("contactForm").reset();
});

// Save Contact
document.getElementById("saveContact").addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  if (!name || !email || !message) { alert("Fill all fields before saving."); return; }

  const blob = new Blob([`Name: ${name}\nEmail: ${email}\nMessage: ${message}`], {type: "text/plain"});
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "contact.txt";
  link.click();
});

// ====== TO-DO LIST ======
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

document.getElementById("addTask").addEventListener("click", () => {
  const task = taskInput.value.trim();
  if (!task) return;
  const li = document.createElement("li");
  li.textContent = task;
  const btn = document.createElement("button");
  btn.textContent = "X";
  btn.onclick = () => li.remove();
  li.appendChild(btn);
  taskList.appendChild(li);
  taskInput.value = "";
});

// Save Tasks
document.getElementById("saveTasks").addEventListener("click", () => {
  const tasks = Array.from(taskList.children).map(li => li.firstChild.textContent).join("\n");
  const blob = new Blob([tasks], {type: "text/plain"});
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "tasks.txt";
  link.click();
});

// ====== QUERY RESPONDER ======
document.getElementById("sendQuery").addEventListener("click", () => {
  const input = document.getElementById("queryInput").value.trim();
  const response = document.getElementById("queryResponse");
  if (!input) { response.textContent = "Enter a query."; return; }

  let reply;
  if (input.toLowerCase().includes("contact")) reply = "Use the Contact Form to send messages.";
  else if (input.toLowerCase().includes("to-do")) reply = "Manage tasks using the To-Do section.";
  else if (input.toLowerCase().includes("project")) reply = "This project helps you practice HTML, CSS & JS.";
  else reply = "Thank you! We'll respond soon.";

  response.textContent = reply;
  document.getElementById("queryInput").value = "";
});
