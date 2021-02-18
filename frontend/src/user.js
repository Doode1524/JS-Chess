class User {
    constructor(id, first_name, last_name){
        this.id = id
        this.first_name = first_name
        this.last_name = last_name
    }

    renderUser(){
        let usersDiv = document.getElementById("all_users")
        usersDiv.innerHTML +=
        `
        <ul>
        <li>${this.first_name} ${this.last_name} <button class="delete-btn" data-id=${this.id} onclick="deleteUser()">Delete</button </li>
        </ul>
        
        `
    }

    
}