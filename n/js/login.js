document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');
    const userProfile = document.getElementById('userProfile');

//     1.	Người dùng ấn vào nút sign in trên giao diện trạng chủ
// 2.	Hệ thống sẽ đưa người dùng đến trang đăng nhập và đăng ký.,
    signUpButton.addEventListener('click', () => {
        container.classList.add('right-panel-active');
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove('right-panel-active');
    });
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const users = JSON.parse(localStorage.getItem('users')) || {};

            if (users[email]) {
                registerMessage.innerText = 'User already exists!';
            } else {
                users[email] = { name, password };
                localStorage.setItem('users', JSON.stringify(users));
                registerMessage.innerText = 'User registered successfully!';
                setTimeout(() => {
                    container.classList.remove('right-panel-active');
                    registerMessage.innerText = '';
                }, 2000);
            }
        });
    }
// 3.	Sau khi nhập đủ thông tin và nhấn nút “Sign in” thì sau 2 giây hệ thống sẽ chuyển sang giao diện đăng nhập.
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const users = JSON.parse(localStorage.getItem('users')) || {};
// 4.	Người dùng nhập thông tin đăng nhập và ấn nút “ Login” , hệ thống sẽ chuyển sang trạng chủ với thông tin là tên của người dùng trên giao diện.
            if (users[email] && users[email].password === password) {
                localStorage.setItem('loggedInUser', email);
                window.location.href = 'index.html';
            } else {
                loginMessage.innerText = 'Invalid email or password!';
            }
        });
    }
  
});
