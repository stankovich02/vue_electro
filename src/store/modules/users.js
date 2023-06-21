import users from "./users.json"
export default {
    state: {
      user: { username : "guest", password: "" ,role: "unauthorized" },
      usersData : users
    },
    mutations: {
        changeUsername(state, newUsername) {
            state.user.username = newUsername;
        },
        registerUser(state, newUser) {
            state.usersData.push(newUser);
        },
        loginUser(state, user) {
            state.user.username = user.username,
            state.user.password = user.password,
            state.user.role = user.role
        },
        logoutUser(state) {
            state.user.username = "guest";
            state.user.password = "";
            state.user.role = "unauthorized";
            localStorage.removeItem("user");
        }
    },
    getters: {
        username(state) {
            return state.user.username;
        },
        isAdmin(state) {
            return state.user.isAdmin;
        },
        role(state) {
            return state.user.role;
        },
        users(state) {
            return state.usersData;
        },
        user(state) {
            return state.user;
        }
    }
}