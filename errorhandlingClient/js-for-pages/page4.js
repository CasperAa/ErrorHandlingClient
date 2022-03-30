import { SERVER } from "../configuration/settings.js"
import { handleHttpErrors, makeOptions } from "../configuration/fetchUtils.js"

const SERVER_URL = SERVER + "/api/quotes"

export function page4Handlers() {
  document.getElementById("btn-find").onclick = findQuote
  document.getElementById("btn-edit").onclick = editQuote
  document.getElementById("btn-delete").onclick = deleteQuote
}


// @ts-ignore
async function findQuote() {
  const id = getIdFromInputField()
  try{
  const foundQuote = await fetch(`${SERVER_URL}/${id}`)
    .then(res => handleHttpErrors(res))

      // @ts-ignore 
      document.getElementById("quote").value = foundQuote.quote
      // @ts-ignore
      document.getElementById("author").value = foundQuote.ref

  } catch (err){
    document.getElementById("error").innerText = err.message
  }
}

// @ts-ignore
async function editQuote() {
    const id = getIdFromInputField()
    const editedQuote = {
      id: id
    }
    // @ts-ignore
    editedQuote.quote = document.getElementById("quote").value
    // @ts-ignore
    editedQuote.ref = document.getElementById("author").value

    try{
    const options = makeOptions("PUT", editedQuote)
    const updateQuote = await fetch(SERVER_URL + "/" + id, options)
      .then(res => handleHttpErrors(res))
        document.getElementById("editedQuote").innerText = 
          JSON.stringify(updateQuote)
        clearFields()
    } catch (err){
    document.getElementById("error").innerText = err.message
    }

}
// @ts-ignore
async function deleteQuote() {
  document.getElementById("deleteStatus").innerText = ""
  const id = getIdFromInputField()
  const deletedQuote = await fetch(SERVER_URL + "/" + id, {
    method: "DELETE"
  }).then(res => handleHttpErrors(res))
  clearFields()
  document.getElementById("deleteStatus").innerText = JSON.stringify(deleteQuote) + " Deleted"



}

function clearFields() {
  // @ts-ignore
  document.getElementById("quote-id").value = ""
  // @ts-ignore
  document.getElementById("quote").value = ""
  // @ts-ignore
  document.getElementById("author").value = ""
}

function getIdFromInputField() {
  // @ts-ignore
  const id = document.getElementById("quote-id").value
  if (id === "") {
    throw new Error("No ID Provided")
  }
  return id
}
