document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const userInput = document.getElementById("userInput").value;

    // Make an API request to send user input and get a response
    const response = await fetch("/api", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput }),
    });

    if (response.ok) {
        const data = await response.json();
        document.getElementById("response").innerHTML = `<p>Response:</p><pre>${data.conversation}</pre>`;
        console.log("responce");
    } else {
        console.error("Error:", response.status);
    }
});






// kunal aager code kerna hai to yaha se ker is ke uper nehi karega tu verna.....