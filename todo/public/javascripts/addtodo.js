if (document.readyState !== "loading") {
    initializeCodeLogin();
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      initializeCodeLogin();
    });
  }
  
  function initializeCodeLogin() {
   
    document.getElementById("add-task").addEventListener("submit", onSubmit)
}

//Adding functionality to button. reguest to add a todo to database

function onSubmit(event){

  let data = {
      username: document.getElementById('input-name').value,
      todos : document.getElementById('task-text').value,
  }
  
  fetch("/todos/addtodo/", {
          method: "post",
          headers: {"content-type": "application/json"},
          body: JSON.stringify(data)
          })
          .then(response => response.json())
          .then(data => {
              console.log(data) 
              
          })

  console.log("button pressed")
  
  event.preventDefault()
}