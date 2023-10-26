const chatbotToggler = document.querySelector(".toggler");
const closeBtn = document.querySelector(".close-btn");

closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));