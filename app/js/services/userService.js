app.service("userService", function(){ 

    this.getUser = () => {
        let user = (sessionStorage.getItem("user") == null) ? {name: "Convidado", turns: 0} : JSON.parse(sessionStorage.getItem("user"));
        return user;
    };

    this.addUser = (user) => {
        sessionStorage.setItem("user", JSON.stringify(user));
    };
});
