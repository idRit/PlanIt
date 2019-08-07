function validate() {
    let email = document.getElementById('email').value;
    let name = document.getElementById('name').value;

    if (!/^([A-Z][a-z]+){1,}?(\s*[A-Z][a-z]+)*$/g.test(name)) {
        alert('Name is invalid!');
        return;
    }

    if (!/^[a-zA-Z0-9\.]+@[a-z]+([\.][a-z]*){1,2}$/.test(email)) {
        alert('Email is invalid');
        return;
    }

    localStorage.name = document.getElementById('name').value;
    localStorage.email = document.getElementById('email').value;
    window.location.pathname = '/app.html';
}