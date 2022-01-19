const $ = document.querySelector.bind(document);
const login_switch = $(".login_switch"),
    signup_switch = $(".signup_switch"),
    form_login = $(".form-login"),
    form_signup = $(".form-signup"),
    loginBtn = form_login.querySelector("button[type=submit]"),
    signupBtn = form_signup.querySelector("button[type=submit]");

form_login.onsubmit = () => false;
form_signup.onsubmit = () => false;

const SERVER_URL = "https://vinhchann-login-signup.herokuapp.com";

function handleSwichForm(formShowElement, formHideElement) {
    formShowElement.classList.toggle("form-hide");
    formHideElement.classList.toggle("form-hide");
}
signup_switch.addEventListener("click", () => {
    handleSwichForm(form_signup, form_login);
});
login_switch.addEventListener("click", () => {
    handleSwichForm(form_login, form_signup);
});

Validator({
    formSelector: ".form-login",
    formGroups: [
        {
            inputSelector: "input[name=username]",
            fieldName: "Tên đăng nhập",
            minLength: 4,
        },
        {
            inputSelector: "input[name=password]",
            fieldName: "Mật khẩu",
            minLength: 6,
        },
    ],
});

Validator({
    formSelector: ".form-signup",
    formGroups: [
        {
            inputSelector: "input[name=fullname]",
            fieldName: "Họ và tên",
            minLength: 4,
        },
        {
            inputSelector: "input[name=email]",
            isEmail: true,
        },
        {
            inputSelector: "input[name=username]",
            fieldName: "Tên đăng nhập",
            minLength: 4,
        },
        {
            inputSelector: "input[name=password]",
            fieldName: "Mật khẩu",
            minLength: 6,
            isConfirmPass: true,
            comparePassSelector: ".confirmPass",
        },
        {
            inputSelector: ".confirmPass",
            fieldName: "Mật khẩu nhập lại",
            minLength: 6,
            isConfirmPass: true,
            comparePassSelector: "input[name=password]",
        },
    ],
});

function ShowSwal({ success, message }) {
    Swal.fire({
        title: success ? "Thành công" : "Lỗi",
        text: message,
        icon: success ? "success" : "error",
        confirmButtonText: "OK",
    });
}

loginBtn.addEventListener("click", () => {
    console.log("hello");
    const api_url = `${SERVER_URL}/api/auth/login`;
    const payload = Object.fromEntries(new FormData(form_login).entries());
    axios.post(api_url, payload).then(({ data }) => {
        console.log(data);
        ShowSwal(data);
    });
});

signupBtn.addEventListener("click", () => {
    const api_url = `${SERVER_URL}/api/auth/signup`;
    const payload = Object.fromEntries(new FormData(form_signup).entries());
    axios.post(api_url, payload).then(({ data }) => {
        ShowSwal(data);
    });
});
