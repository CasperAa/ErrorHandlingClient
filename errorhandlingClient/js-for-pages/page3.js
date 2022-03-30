import { SERVER } from "../configuration/settings.js"
import { handleHttpErrors, makeOptions } from "../configuration/fetchUtils.js";

const API_URL = SERVER + "/api/quotes"

export function setUpAddButtonHandler() {
  document.getElementById("btn-add").onclick = addNewQuote;
}

// @ts-ignore
async function addNewQuote() {
  document.getElementById("error").innerText = ""
  const newQuote = {};
  // @ts-ignore
  newQuote.quote = document.getElementById("quote").value
  // @ts-ignore
  newQuote.ref = document.getElementById("author").value

  try{
  const options = makeOptions("POST", newQuote)
  const addedQuote = await fetch(API_URL, options)
    .then(res => handleHttpErrors(res))

    document.getElementById("addedQuote").innerText = 
      JSON.stringify(addedQuote)

  } catch (err) {
  document.getElementById("error").innerText = err.message
  }
}