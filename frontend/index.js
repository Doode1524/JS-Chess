document.addEventListener("DOMContentLoaded", () => {
  createUser();
  fetchUsers();
});

const BASE_URL = "http://127.0.0.1:3000";

function fetchUsers() {
  fetch(`${BASE_URL}/users`)
    .then((resp) => resp.json())
    .then((users) => {
      for (const user of users) {
        let u = new User(user.id, user.first_name, user.last_name);
        u.renderUser();
      }
    });
}

function createUser() {
  let newUserForm = document.getElementById("create_user");

  newUserForm.innerHTML += `
    <form>
        First Name: <input type="text" id= "first_name"><br>
        Last Name: <input type="text" id= "last_name"><br>
        <input type="submit" value="Create User">
    </form>
    `;
  newUserForm.addEventListener("submit", userSubmit);
}

function userSubmit() {
  event.preventDefault();
  let first_name = document.getElementById("first_name").value;
  let last_name = document.getElementById("last_name").value;

  let user = {
    first_name: first_name,
    last_name: last_name,
  };

  fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify(user),
  })
    .then((resp) => resp.json())
    .then((user) => {
      let u = new User(user.id, user.first_name, user.last_name);
      u.renderUser();
    });
}

function deleteUser() {
  let userId = parseInt(event.target.dataset.id);

  fetch(`${BASE_URL}/users/${userId}`, {
    method: "DELETE",
  });

  this.location.reload();
}
