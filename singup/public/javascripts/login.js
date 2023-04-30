// How to use Jsonwebtoken/authorization learned from Advanced Web Applications course

if (document.readyState !== "loading") {
    initializeCodeLogin();
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      initializeCodeLogin();
    });
  }
  
  function initializeCodeLogin() {
    document.getElementById("login-form").addEventListener("submit", onSubmit);
}
//Adding functionality to login button
function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target); // Get the login token

    fetch("/users/login", {
        method: "POST",
        body: formData
    })
        .then((response) => response.json())
        .then((data) => {
            if(data.token) {
                storeToken(data.token); //store the token
                window.location.href="/";
            } else {
                if (data.message) { // if errors cathc them
                    document.getElementById("error").innerHTML = data.message;
                }  else {
                    document.getElementById("error").innerHTML = "Very strange error!";
                }
            }

        })

}

function storeToken(token) {
    localStorage.setItem("auth_token", token);
}
