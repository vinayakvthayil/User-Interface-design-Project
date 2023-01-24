const userName = document.querySelector('input[name="userName"]')
const userPassWord = document.querySelector('input[name="userPassword"]')
const loginForm = document.getElementById('form')
const bookingForm = document.getElementById('Bform')
const loginButton = document.querySelector('button[name="login"]')
const modal = document.querySelector('.container-msg-modal')
const modalContent = document.querySelectorAll('.container-modal-content')

class Auth {
    // setup the class and hide the body by default
    constructor() {
        const auth = localStorage.getItem("auth");
        this.validateAuth(auth);
    }
    // check to see if the localStorage item passed to the function is valid and set
    validateAuth(auth) {
        if (auth != 1) {
            loginButton.innerHTML = "Login";
            document.querySelector("body").style.display = "block";
        } else {
            loginButton.innerHTML = "Logout";
            loginButton.addEventListener("click", this.logOut);
            document.querySelector("body").style.display = "block";
        }
    }
    // will remove the localStorage item and redirect to login  screen
    logOut() {
        localStorage.removeItem("auth");
    }
}

const auth = new Auth();

// only using default value for now
const myLogin = {
    userName: 'user',
    password: 'password'
}

window.onload = init()

function init() {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault()
        userLogin()
    })

    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault()
        window.location.href= './payment.html'
        const formData = new FormData(e.target);
        console.log(formData)

    });
}

function userLogin() {
    const nameVal = userName.value,
        passwordVal = userPassWord.value
    
    const isLogin = false
    
    if(nameVal === myLogin.userName && passwordVal === myLogin.password) {
      loginCheck(!isLogin)
    } else {
      loginCheck(isLogin)
    }
}

function tempAlert(msg,duration)
{
    const el = document.createElement("div");
    el.setAttribute("style","position:fixed; top: 6rem; padding: 10px; border: 2px solid black; border-radius: 5px; right:20px; background-color:white;");
    el.innerHTML = msg;
    setTimeout(function(){
        el.parentNode.removeChild(el);
    },duration);
    document.body.appendChild(el);
}

function loginCheck(isLogin) {
  if(isLogin) {
      tempAlert('Login Successful', 3000);
      localStorage.setItem('auth', 1);
      setTimeout(function(){
          window.location.href = './index.html'
      }, 3000);
  } else {
      tempAlert('Login Failed! Username or Password is incorrect', 3000);
      localStorage.setItem('auth', 0);
  }
  
  setTimeout(function() {
    modal.classList.remove('enabled')
    loginForm.reset();
    modalContent.forEach(function(content) {
      content.classList.remove('enabled')
    });
  }, 3000)
}

function like(id){
    document.getElementById(id).classList.toggle('liked');
}

function paymentdone(){
    tempAlert('Payment Successful', 1000);
    setTimeout(function(){
        window.location.href = './index.html'
    }, 1500);
}

function bookRoom(event){
    event.preventDefault()

    console.log('booking')
    const name = document.querySelector('input[name="name"]')
    const email = document.querySelector('input[name="email"]')
    const phone = document.querySelector('input[name="phone"]')
    const checkin = document.querySelector('input[name="checkin"]')
    const checkout = document.querySelector('input[name="checkout"]')

    // const formData = new FormData(event.target);
    if(confirm("name: " + name.value + "\nemail: " + email.value + "\nphone: " + phone.value + "\ncheck in date: " + checkin.value + "\ncheckout date: " + checkout.value, "Confirm Booking")==true)
        window.location.href = './payment.html'
    else{
        alert("Booking Cancelled")
        window.location.href = './index.html'
    }
}