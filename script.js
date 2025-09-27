const form = document.getElementById("loginForm");
const welcomeMsg = document.getElementById("welcomeMsg");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popupText");
const closePopup = document.getElementById("closePopup");
const container = document.getElementById("loginContainer");

form.addEventListener("submit", e => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if(username && password){
    // Dim the login box
    container.classList.add("dimmed");

    // Show popup welcome
    popupText.textContent = `👋 Hi ${username}, welcome! Redirecting to W3Schools...`;
    popup.style.display = "flex";

    setTimeout(()=>{
      window.location.href = "https://www.w3schools.com";
    }, 2000);
  } else {
    welcomeMsg.textContent = "⚠ Please enter both username and password!";
    welcomeMsg.classList.remove("hidden");
  }
});

closePopup.addEventListener("click", ()=>{
  popup.style.display = "none";
  container.classList.remove("dimmed");
});
