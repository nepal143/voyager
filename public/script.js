function addMessageToChat(message, incoming) {
    const chatbox = document.querySelector(".chatbox");
    const chat = document.createElement("li");
    chat.classList.add("chat", incoming ? "incoming" : "outgoing");
    chat.innerHTML = `<p>${message}</p>`;
    chatbox.appendChild(chat);
}

const chatbox = document.querySelector(".chatbox");
let firstTime = true; // A flag to track if it's the first time the function is called
const chat_box = document.getElementById("chatbox");
const answers = []; // An array to store the answers
const questions = [
    "What hobbies or activities do you enjoy in your free time?",
    "Are you interested in technology, arts, science, or business?",
    "What are your strongest technical skills?",
    "Are you more analytical or creative in problem-solving?" ,
    "Do you enjoy working with people or prefer tasks that require little interaction?",
    "Are you proficient in any foreign languages?",
    "What are your long-term career goals?",
    "What work values are most important to you (e.g., stability, innovation, helping others)?"
    // Add more questions here
];


async function handleUserInput() {
    const userInput = document.getElementById("userInput").value;
    addMessageToChat(userInput, false);
    document.getElementById("userInput").value = "";
    
    addMessageToChat("thinking...", true);
    chatbox.scrollTo(0, chatbox.scrollHeight);
    if (firstTime) {
        
        // Only on the first call, send the questions, answers, and user input in the request body
        const combinedData = questions.join("\n") + answers.join("\n") + "These are the questions that we have asked the user to get their area of interest and we have also added the answer that we got from the user so based on your analysis suggest possible successful career paths for the user and must remember that do not answer question unrelated  to career guidance.";

        const response = await fetch("/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userInput: combinedData }),
        });
        chatbox.removeChild(chatbox.lastChild);
        if (response.ok) {
            const data = await response.json();
            addMessageToChat(data.conversation, true); // Add the response to the incoming chat
        } else {
            console.error("Error:", response.status);
        }

        firstTime = false; // Set the flag to false after the first call
    } else {
        // For subsequent calls, send only the user input
        const response = await fetch("/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userInput }),
        });
        chatbox.removeChild(chatbox.lastChild);
        if (response.ok) {
            const data = await response.json();
            addMessageToChat(data.conversation, true); 
        } else {
            console.error("Error:", response.status);
        }

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


//   const chatbotToggler = document.querySelector(".toggler");
// const closeBtn = document.querySelector(".close-btn");

// closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
// chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));


let currentQuestionIndex = 0;

function displayCurrentQuestion() {
    if (currentQuestionIndex < questions.length) {
        const questionText = questions[currentQuestionIndex];
        document.getElementById("questionText").textContent = questionText;
    } else {
        document.getElementById("questionText").textContent = "All questions answered!";
        chat_box.style.display = "flex";
        let question_box = document.getElementsByClassName("aptitude_test")[0];
        window.scrollTo(0 , window.innerHeight)
        question_box.style.display = "none" ; 
        console.log(question_box)
    }
}

function handleUserInput1() {
    const userInput = document.getElementById("aptitudeInput").value;

    // Store the answer in the 'answers' array
    answers.push(userInput);
    // if(answers.length===questions.length){
    //     handleUserInput();
    // }
    document.getElementById("aptitudeInput").value = "";

    currentQuestionIndex++;
    displayCurrentQuestion();
}


document.getElementById("aptitudeForm").addEventListener("submit", (event) => {
    event.preventDefault();
    handleUserInput1();
    console.log(answers);
});


displayCurrentQuestion();

