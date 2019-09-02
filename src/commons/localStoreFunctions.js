export function addUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

export function addUserName(userName) {
    localStorage.setItem('username', userName);
}

export function clearUser() {
    localStorage.removeItem('user')
}

export function clearUserName() {
    localStorage.removeItem('username')
}

// export function getUserId() {
//     let user = JSON.parse(localStorage.getItem('user'));
//     return user.id;
// }