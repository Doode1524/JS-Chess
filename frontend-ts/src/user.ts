class User {
    
    id: number
    first_name: string
    last_name: string

    static all: User[] = [];
  
    constructor(id: number, first_name: string, last_name: string) {
      this.id = id;
      this.first_name = first_name;
      this.last_name = last_name;
  
      User.all.push(this);
    }
  
    renderUser() {
      let usersDiv = document.getElementById("all_users");
      (usersDiv as HTMLElement).innerHTML += `
          <ul>
          <li>${this.first_name} ${this.last_name} <button class="delete-btn" data-id=${this.id} onclick="User.deleteUser()">Delete</button> <button id="select-btn" data-id=${this.id}">Select</button> </li>
          </ul>
          `;
    }
  
    static fetchUsers = () => {
      fetch(`${BASE_URL}/users`)
        .then((resp) => resp.json())
        .then((users) => {
          for (const user of users) {
            let u = new User(user.id, user.first_name, user.last_name);
            u.renderUser();
          }
        });
    };
  
    static createUser = () => {
      let newUserForm = document.getElementById("create_user");
  
      (newUserForm as HTMLElement).innerHTML += `
          <form>
          First Name: <input type="text" id= "first_name"><br>
          Last Name: <input type="text" id= "last_name"><br>
          <input type="submit" value="Create User">
          </form>
          `;
      (newUserForm as HTMLElement).addEventListener("submit", this.userSubmit);
    };
  
    static userSubmit = (event: Event) => {
      event.preventDefault();
  
      let first_name = (document).getElementById("first_name").value;
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
  
          let first_name = (document.getElementById("first_name").value = "");
          let last_name = (document.getElementById("last_name").value = "");
        });
    };
  
    static deleteUser = (event: Event) => {
      let userId = parseInt((event.target as EventTarget | any).dataset.id);
      let allUsers = document.getElementById("all_users");
  
      fetch(`${BASE_URL}/users/${userId}`, {
        method: "DELETE",
      }).then(function (resp) {
        (allUsers as HTMLElement).innerText = "";
        User.fetchUsers();
      });
    };
  }
  