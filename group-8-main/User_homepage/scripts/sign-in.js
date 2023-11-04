
var signinBtn = document.getElementById('sign-in-btn');
var backBtn = document.getElementById('back-btn');
var signUpBtn = document.getElementById('to-signup-btn');

signinBtn.addEventListener('click', function() {
    changeWindow('dashboard.html');
})

backBtn.addEventListener('click', function() {
   changeWindow('/index.html');
})

signUpBtn.addEventListener('click', function() {
    changeWindow('sign-up.html');
})

function changeWindow(to) {
    window.location.href = to;
}
