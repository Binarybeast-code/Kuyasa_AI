
var sections = [
    document.getElementById('home-section'),
    document.getElementById('help-section'),
]

document.getElementById('home-button').addEventListener('click', () => {
    selectSection(0);
})
document.getElementById('help-button').addEventListener('click', () => {
    selectSection(1)
})

document.getElementById('logout-button').addEventListener('click', () => {
    window.location.href = '/household/sign-in.html';
})

function selectSection(section) {
    for (i = 0; i < sections.length; i++) {
        sections[i].style.display = 'none';
    }
    sections[section].style.display = 'flex';
}
