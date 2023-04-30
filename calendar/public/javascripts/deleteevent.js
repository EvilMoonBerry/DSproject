if (document.readyState !== "loading") {
    initializeCodeLogin();
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      initializeCodeLogin();
    });
  }
  
  function initializeCodeLogin() {
   
    document.getElementById("delete-event").addEventListener("submit", onSubmit)
}

//Adding functionality to button. Send reguest to delete event from calendar database 
function onSubmit(event){
    
    let data = {
        username: document.getElementById('input-name').value,
        event : document.getElementById('event-text').value,
        date : document.getElementById('date-text').value,
        disc : document.getElementById('disc-text').value,

    }

    fetch("/events/deleteevent/", {
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