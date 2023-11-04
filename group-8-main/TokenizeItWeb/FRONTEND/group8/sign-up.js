
var signupBtn = document.getElementById('sign-up-btn');
var backBtn = document.getElementById('back-btn');
var signInBtn = document.getElementById('to-signin-btn');

signupBtn.addEventListener('click', function() {
    changeWindow('dashboard.html');
})

backBtn.addEventListener('click', function() {
   changeWindow('/index.html');
})

signInBtn.addEventListener('click', function() {
    changeWindow('sign-in.html');
})

function changeWindow(to) {
    window.location.href = to;
}
