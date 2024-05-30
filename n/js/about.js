// uncheck radio buttons (unfortunatley this can't be done with CSS alone)
document.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.addEventListener('click', (e) => {
        e.preventDefault();
        // setting a timeout enables this hack to work
        setTimeout(() => radio.checked = !radio.checked, 0);
    });
  });

  document.addEventListener('DOMContentLoaded', () => {

    const userProfile = document.getElementById('userProfile');
    const userNameDisplay = document.getElementById('userName');
    const userAvatar = document.getElementById('userAvatar');
    const logoutButton = document.getElementById('logoutButton');   
    const authButtons = document.getElementById('authButtons');


    function displayUserProfile(user) {
        userNameDisplay.innerText = `Hello, ${user.name}`;
        userAvatar.src = './img/imgpikachu/th.jpg'; // Cập nhật đường dẫn ảnh đại diện
        userProfile.style.display = 'flex';
        authButtons.style.display = 'none';
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('loggedInUser');
            window.location.href = 'login.html'; // Chuyển hướng về trang đăng nhập
        });
    }

    const loggedInUserEmail = localStorage.getItem('loggedInUser');
    if (loggedInUserEmail) {
        const users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[loggedInUserEmail]) {
            displayUserProfile(users[loggedInUserEmail]);
        }
    } 
});