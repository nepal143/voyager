import { load } from "https://deno.land/std@0.199.0/dotenv/mod.ts";
import { ChatGPTUnofficialProxyAPI } from "npm:chatgpt";
import { Input } from "https://deno.land/x/cliffy@v1.0.0-rc.3/prompt/mod.ts";

require("dotenv").config();

const API_KEY = process.env.API_KEY;

const AccessToken = API_KEY;

// const AccessToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiJha2hpbGVzaHBhdGlkYXI5ODkzNjhAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWV9LCJodHRwczovL2FwaS5vcGVuYWkuY29tL2F1dGgiOnsicG9pZCI6Im9yZy1LS1Nacm9jTjF2V3hndWNpUlNHTW1nSFkiLCJ1c2VyX2lkIjoidXNlci1iQ2taQm93SG92UG00aVF4Mk5BR0FuZGsifSwiaXNzIjoiaHR0cHM6Ly9hdXRoMC5vcGVuYWkuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTE3OTIyMzc5NzU5ODk4NzkxNzMxIiwiYXVkIjpbImh0dHBzOi8vYXBpLm9wZW5haS5jb20vdjEiLCJodHRwczovL29wZW5haS5vcGVuYWkuYXV0aDBhcHAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY5NzgyMzc4OCwiZXhwIjoxNjk4Njg3Nzg4LCJhenAiOiJUZEpJY2JlMTZXb1RIdE45NW55eXdoNUU0eU9vNkl0RyIsInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUgbW9kZWwucmVhZCBtb2RlbC5yZXF1ZXN0IG9yZ2FuaXphdGlvbi5yZWFkIG9yZ2FuaXphdGlvbi53cml0ZSBvZmZsaW5lX2FjY2VzcyJ9.hwRRfZpaqMngNGrufJuPb3o877qt-n7msvt4kTKhVDBffRhZRFkhuXaQoifFZSkN_N6TSijBXyIg9JJpj1dBojvqkMLeHXZcM3fgrMyFQ4UW7Os8HnhEWHVxhmJEUcQnuzCb6O5q1ZtYnsSzp8GxDMZWhUr49lnTgoLZcIUoNbL7s6yTHd-UHGpKBU6ZmTDoKZzwA9-FdCO9EumixN2HH9lLy5zfJQGhUPfEdULBhSZnWJA225o8BlOt5cnYzxk434q66QsRedyWlgUNDVwR8GpUF3_kvyBkIoC0jYcgBPLqdFcsqR6ZLQWkj3Fmzt-UULsjqoggTv5VyhQksvIo5A";

if (!AccessToken) throw new Error("No access token!");

const API = new ChatGPTUnofficialProxyAPI({
    id: "user-ig0ddrTCmNkP8x7Vj6xnEVc1",
    accessToken: AccessToken,
    apiReverseProxyUrl: "https://ai.fakeopen.com/api/conversation",
});

let conversation = [];
const introductoryMessage = `
We are using you as an AI to assist users in exploring their areas of interest and providing career guidance. Please remember to ask the user questions one by one, ensuring that these questions are psychometric in nature. After gathering enough information, provide concise career recommendations in a single sentence. Don't forget to prompt the user for additional questions. Let's guide users on their career paths step by step.
and do not give any other answer like code,article or any other irrelative stuff which is not related to the career of the user and do not get distracted if user is trying to ask you some irrelivant questions `;
conversation.push(introductoryMessage);

async function runConversation(userInput) {
    while (true) {
        // const userMessage = await Input.prompt("User: ");
        conversation.push(`User: ${userInput}`); // Push user message to the conversation
        
        const response = await API.sendMessage(
            "Previous conversation:\n" + conversation.join("\n") + "\n\nNow answer the prompt:"
        );

        conversation.push(`ChatGPT: ${response.text}`); // Push ChatGPT's response to the conversation
        
        // console.log("ChatGPT:", response.text);
        return response.text ;
    }
}





// Start the conversation loop
import { Application, Router, send, Context } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const router = new Router();
app.use(async (context, next) => {
    if (context.request.url.pathname.startsWith('/api')) {
      await next(); // Pass the request to the API handling middleware
    }else {
      // Serve the default index.html file
      await send(context, context.request.url.pathname, {
        root: `${Deno.cwd()}/public`,
        index: "index.html"
      });
    }
  });


// Add your POST route for /chat here
router.post("/api", async (context: Context) => {
  const body = context.request.body(); // Assuming JSON data is sent in the request body
  if (body.type === "json") {
    const userInput = (await body.value).userInput;
    console.log(userInput);

    try {
      // Execute the conversation and get the conversation history
      const conversationHistory = await runConversation(userInput);

      // Respond with the conversation history
      context.response.body = { conversation: conversationHistory };
    } catch (error) {
      // Handle errors and send an error response
      context.response.status = 500;
      context.response.body = { error: error.message };
    }
  }
});
let get_questions = "give me some psychometric questions to check the field of intrest of the user"
router.post("/api/attribute", async (context: Context) => {
  const body = context.request.body(); // Assuming JSON data is sent in the request body
  if (body.type === "json") {
    const userInput = (await body.value).userInput;
    console.log(userInput);

    try {
      // Execute the conversation and get the conversation history
      const conversationHistory = await runConversation(get_questions);

      // Respond with the conversation history
      context.response.body = { conversation: conversationHistory };
    } catch (error) {
      // Handle errors and send an error response
      context.response.status = 500;
      context.response.body = { error: error.message };
    }
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

const port = 3000;

console.log(`Server is running on http://localhost:${port}`);

await app.listen({ port: port });
