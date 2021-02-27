class Message {
    constructor(id, content) {
        this.id = id
        this.content = content
    }

    renderMessage() {
        let messagesDiv = document.getElementById("all_messages")
        messagesDiv.innerHTML +=
            `
        <ul>
        <li>${this.content}<button class="delete-btn" data-id=${this.id} onclick="deleteMessage()">Delete</button </li>
        </ul>
        
        `
    }
}