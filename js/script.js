// Select all inputs by id
// SignUp Fields
var signupName = document.querySelector("#signupName");
var signupEmail = document.querySelector("#signupEmail");
var signupPassword = document.querySelector("#signupPassword");
var signupBtn = document.querySelector("#sign-up-btn");

// Login Fields
var loginEmail = document.querySelector("#signinEmail");
var loginPassword = document.querySelector("#signinPassword");
var loginBtn = document.querySelector("#login-btn");

// Retrieve accounts from localStorage 
var storedAccounts = localStorage.getItem('accounts');
var accountsContainer = storedAccounts ? JSON.parse(storedAccounts) : [];

// Ensure accountsContainer is an array
if (!Array.isArray(accountsContainer)) {
  accountsContainer = [];
}


// Switch Between Login & SignUp Forms
var loginDiv = document.querySelector("#loginDiv");
var signupDiv = document.querySelector("#signupDiv");
var registerBtn = document.querySelector("#registerBtn");
var signinBtn = document.querySelector("#signinBtn");

// SignUp Error Messages
var nameError = document.querySelector("#nameError");
var emailError = document.querySelector("#emailError");
var passwordError = document.querySelector("#passwordError");

// Success Signup Message
var successMessage = document.querySelector("#successMessage");

// Login Error Message
var loginError = document.querySelector("#loginError");

// Logout Button
var logoutBtn = document.querySelector("#logout-btn");

// Switch between Login and SignUp forms
registerBtn.addEventListener("click", function () {
  loginDiv.classList.replace("d-block", "d-none");
  signupDiv.classList.replace("d-none", "d-block");
});

signinBtn.addEventListener("click", function () {
  signupDiv.classList.replace("d-block", "d-none");
  loginDiv.classList.replace("d-none", "d-block");
});

// Save Accounts
function saveAccounts() {
  if (checkSignupFields()) {
    var account = {
      name: signupName.value,
      email: signupEmail.value,
      password: signupPassword.value,
    };

    accountsContainer.push(account);
    localStorage.setItem('accounts', JSON.stringify(accountsContainer));
    clearSignupFields();
    successMessage.innerHTML = "Account created successfully!";
  }
}

signupBtn.addEventListener("click", saveAccounts);

// Clear Signup Fields
function clearSignupFields() {
  signupName.value = "";
  signupEmail.value = "";
  signupPassword.value = "";
}

// Check Signup Fields
function checkSignupFields() {
  var hasError = false;

  if (signupName.value !== "") {
    nameError.innerHTML = "";
  }
  if (signupEmail.value !== "") {
    emailError.innerHTML = "";
  }
  if (signupPassword.value !== "") {
    passwordError.innerHTML = "";
  }

  if (signupName.value === "") {
    nameError.innerHTML = "Please fill all fields";
    hasError = true;
  }
  if (signupEmail.value === "") {
    emailError.innerHTML = "Please fill all fields";
    hasError = true;
  }
  if (signupPassword.value === "") {
    passwordError.innerHTML = "Please fill all fields";
    hasError = true;
  }

  if (!hasError && checkEmailExists(signupEmail.value)) {
    emailError.innerHTML = "This email already exists";
    hasError = true;
  }

  return !hasError;
}

// Check if the email already exists in the local storage using for loop
function checkEmailExists(email) {
  for (var i = 0; i < accountsContainer.length; i++) {
    if (accountsContainer[i].email === email) {
      return true;
    }
  }
  return false;
}

// Login Function
loginBtn.addEventListener("click", function () {
  var email = loginEmail.value;
  var password = loginPassword.value;
  var accountExists = false;

  for (var i = 0; i < accountsContainer.length; i++) {
    if (accountsContainer[i].email === email && accountsContainer[i].password === password) {
      accountExists = true;
      document.querySelector('#welcomeMessage').innerHTML =`Welcome ${accountsContainer[i].name}`
    }
  }

  if (accountExists) {
    showWelcomePage();
  } else {
    loginError.innerHTML = "Invalid email or password";
  }
});

// Show Welcome Page
function showWelcomePage() {
  document.querySelector("#welcomeDiv").classList.replace('d-none', 'd-block');
  document.querySelector('nav').classList.replace('d-none', 'd-block');
  loginDiv.classList.replace("d-block", "d-none");
}

// Logout Function
logoutBtn.addEventListener('click', function () {
  document.querySelector("#welcomeDiv").classList.replace('d-block', 'd-none');
  document.querySelector('nav').classList.replace('d-block', 'd-none');
  loginDiv.classList.replace("d-none", "d-block");
});