if (document.readyState !== "loading") {
    initializeCodeLogin();
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      initializeCodeLogin();
    });
  }
  
  function initializeCodeLogin() {
   
    document.getElementById("delete-task").addEventListener("submit", onSubmit)
}

//Adding functionality to button. reguest deleting a todo from database
function onSubmit(event){

  let data = {
      username: document.getElementById('input-name').value,
      todos : document.getElementById('task-text').value,

  }
  
  fetch("/todos/deletetodo/", {
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