alert('کاربر عزیز توجه داشته باش که این صفحه دارای Username و Password است ، پس سعی کن که Username و Password رو درست وارد کنی وگرنه صفحه قفل میشه و 2 دقیقه باید صبر کنی تا دوباره بتونی امتحان کنی');
alert('کاربر گرامی عزیز Username و Password در کد قابل مشاهده است ، لطفا به کد های این پروژه برو و Username و Password رو پیدا کن و وارد کن');
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const uploadPage = document.getElementById('upload-page');
    const form = document.getElementById('form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');
    const timerMessage = document.getElementById('timer-message');
    const imageUpload = document.getElementById('image-upload');
    const uploadedImage = document.getElementById('uploaded-image');
    const fileSizeError = document.getElementById('file-size-error');
    let loginAttempts = 0;
    let timerInterval;
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (loginAttempts >= 3) {
            return;
        }
        const username = usernameInput.value;
        const password = passwordInput.value;
        if (username === 'admin' && password === 'admin') {
            loginForm.style.display = 'none';
            uploadPage.style.display = 'block';
            errorMessage.textContent = '';
            loginAttempts = 0;
        } else {
            loginAttempts++;
            errorMessage.textContent = "Username یا Password ، وارد نشده است یا اشتباه است";
            if (loginAttempts >= 3) {
                startTimer();
            }
        }
    });
    imageUpload.addEventListener('change', function () {
        const file = this.files[0];
        if (file.size > 100 * 1024) {
            fileSizeError.textContent = "حجم تصویر نباید بیشتر از 100 کیلوبایت باشد";
            uploadedImage.style.display = 'none';
            return;
        }
        fileSizeError.textContent = '';
        const reader = new FileReader();
        reader.onload = function (e) {
            uploadedImage.src = e.target.result;
            uploadedImage.style.display = 'block';
        }
        reader.readAsDataURL(file);
    });
    function startTimer() {
        let timeLeft = 120;
        errorMessage.textContent = `به دلیل تلاش های ناموفق زیاد به مدت 2 دقیقه اجازه ورود رو ندارید لطفا ${timeLeft} ثانیه صبر کنید تا دوباره بتونید امتحان کنید بعد از 0 شدن زمان دوباره امتحان کنید`;
        errorMessage.textContent = `به دلیل تلاش های ناموفق زیاد به مدت 2 دقیقه اجازه ورود رو ندارید لطفا ${timeLeft} ثانیه صبر کنید تا دوباره بتونید امتحان کنید بعد از 0 شدن زمان دوباره امتحان کنید`;
        timerInterval = setInterval(function () {
            timeLeft--;
            errorMessage.textContent = `به دلیل تلاش های ناموفق زیاد به مدت 2 دقیقه اجازه ورود رو ندارید لطفا ${timeLeft} ثانیه صبر کنید تا دوباره بتونید امتحان کنید بعد از 0 شدن زمان دوباره امتحان کنید`;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timerMessage.textContent = '';
                loginAttempts = 0;
            }
        }, 1000);
    }
    document.querySelectorAll('.toggle-password').forEach(toggle => {
        toggle.addEventListener('click', function () {
            const passwordInput = this.previousElementSibling;
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                this.classList.add('fa-eye');
                this.classList.remove('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                this.classList.add('fa-eye-slash');
                this.classList.remove('fa-eye');
            }
        });
    });
});