class User {
    color;

    static all = [];

    constructor(id, first_name, last_name) {
        this.id = id
        this.first_name = first_name
        this.last_name = last_name

        User.all.push(this)
    }


    renderUser() {
        let usersDiv = document.getElementById("all_users")
        usersDiv.innerHTML +=
            `
        <ul>
        <li>${this.first_name} ${this.last_name} <button class="delete-btn" data-id=${this.id} onclick="deleteUser()">Delete</button> <button id="select-btn" data-id=${this.id}">Select</button> </li>
        </ul>
        
        `
    }


}