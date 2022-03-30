import { SERVER } from "../configuration/settings.js"

const API_URL = SERVER + "/api/quotes"

export function setUpAddButtonHandler() {
  document.getElementById("btn-add").onclick = addNewQuote;
}

async function addNewQuote() {
  const newQuote = {};
  newQuote.quote = document.getElementById("quote").value
  newQuote.ref = document.getElementById("author").value
  fetch(API_URL, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-type": "application/json"
    },
    body: JSON.stringify(newQuote)
  })
    .then(res => {
      if (!res.ok) {
        throw new Error("Error: " + res.status)
      }
      return res.json()
    })
    .then(addedQuote => document.getElementById("addedQuote").innerText = JSON.stringify(addedQuote))
    .catch(e => alert(e.message + " (NEVER use alerts for real)" ))

}