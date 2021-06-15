"use strict";
var _this = this;
var User = /** @class */ (function () {
    function User(id, first_name, last_name) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        User.all.push(this);
    }
    User.prototype.renderUser = function () {
        var usersDiv = document.getElementById("all_users");
        usersDiv.innerHTML += "\n          <ul>\n          <li>" + this.first_name + " " + this.last_name + " <button class=\"delete-btn\" data-id=" + this.id + " onclick=\"User.deleteUser()\">Delete</button> <button id=\"select-btn\" data-id=" + this.id + "\">Select</button> </li>\n          </ul>\n          ";
    };
    User.all = [];
    User.fetchUsers = function () {
        fetch(BASE_URL + "/users")
            .then(function (resp) { return resp.json(); })
            .then(function (users) {
            for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
                var user = users_1[_i];
                var u = new User(user.id, user.first_name, user.last_name);
                u.renderUser();
            }
        });
    };
    User.createUser = function () {
        var newUserForm = document.getElementById("create_user");
        newUserForm.innerHTML += "\n          <form>\n          First Name: <input type=\"text\" id= \"first_name\"><br>\n          Last Name: <input type=\"text\" id= \"last_name\"><br>\n          <input type=\"submit\" value=\"Create User\">\n          </form>\n          ";
        newUserForm.addEventListener("submit", _this.userSubmit);
    };
    User.userSubmit = function () {
        event.preventDefault();
        var first_name = document.getElementById("first_name").value;
        var last_name = document.getElementById("last_name").value;
        var user = {
            first_name: first_name,
            last_name: last_name,
        };
        fetch(BASE_URL + "/users", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then(function (resp) { return resp.json(); })
            .then(function (user) {
            var u = new User(user.id, user.first_name, user.last_name);
            u.renderUser();
            var first_name = (document.getElementById("first_name").value = "");
            var last_name = (document.getElementById("last_name").value = "");
        });
    };
    User.deleteUser = function () {
        var userId = parseInt(event.target.dataset.id);
        var allUsers = document.getElementById("all_users");
        fetch(BASE_URL + "/users/" + userId, {
            method: "DELETE",
        }).then(function (resp) {
            allUsers.innerText = "";
            User.fetchUsers();
        });
    };
    return User;
}());
