let form = document.querySelector("form");

form.addEventListener("submit", Register);

async function Register(e) {
  e.preventDefault();

  let API_KEY = "AIzaSyC9mXSBpROLxrScOmwpAgXLRd8EPfsp1nA";
  let email = document.querySelector(".email").value;
  let password = document.querySelector(".pas").value;

  let user = {
    email,
    password,
    returnSecureToken: true,
  };

  try {
    let response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let result = await response.json()
    console.log(result);
    if(result.idToken){
      location.replace('../../startbootstrap-sb-admin-gh-pages/startbootstrap-sb-admin-gh-pages/index.html')
    }
  } catch (error) {
    console.log(error);
  }
}
