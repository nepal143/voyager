function addMessageToChat(message, incoming) {
    const chatbox = document.querySelector(".chatbox");
    const chat = document.createElement("li");
    chat.classList.add("chat", incoming ? "incoming" : "outgoing");
    chat.innerHTML = `<p>${message}</p>`;
    chatbox.appendChild(chat);
}
const chatbox = document.querySelector(".chatbox");

async function handleUserInput() {
    const userInput = document.getElementById("userInput").value;
    addMessageToChat(userInput, false);
    document.getElementById("userInput").value = "";

    const response = await fetch("/api", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput }),
    });

    if (response.ok) {
        const data = await response.json();
        addMessageToChat(data.conversation, true); // Add the response to the incoming chat
    } else {
        console.error("Error:", response.status);
    }
    chatbox.scrollTo(0, chatbox.scrollHeight);
}

document.getElementById("userInput").addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        handleUserInput();
    }
});


document.querySelector(".chat-input span").addEventListener("click", () => {
    handleUserInput();
});





// kunal aager code kerna hai to yaha se ker is ke uper nehi karega tu verna.....
let slideIndex = 0;
showSlides();
function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }2
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 4000); // Change image every 2 seconds
  }




  const chatbotToggler = document.querySelector(".toggler");
const closeBtn = document.querySelector(".close-btn");

closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));