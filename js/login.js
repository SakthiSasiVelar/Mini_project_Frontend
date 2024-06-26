import { makeErrorContainerDisplayNone , showErrorMessage , makeInputBoxRedColor , makeInputBoxBlackColor } from "./Error.js";
import { loginUser } from "./api.js";
import { showSuccessToast , showErrorToast } from "./Toast.js";

document.getElementById('togglePassword').addEventListener('click', function() {
    var passwordInput = document.getElementById('password');
    var type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    this.classList.toggle('fa-eye-slash');
});

document.getElementById('login-btn').addEventListener('click', login);

async function login(){
   let loginDetails = getLoginDetails();
   if(validateLoginDetails(loginDetails)){
        try{
            const result = await loginUser(loginDetails);
            if(result.status ==='success'){
                showSuccessToast('Logged in successfully');
                addLoginDetailsToSessionStorage(result.data);
                setTimeout(() => {
                    openHomePage();
                }, 2000);    
            }
            else if(result.status === 'error'){
                showErrorToast(result.message);
            }
        }
        catch(error){
           console.log(error);
        }
    }          
}

function addLoginDetailsToSessionStorage(userDetails){
    sessionStorage.setItem('userId' ,  userDetails.userId);
    sessionStorage.setItem('token', userDetails.token);
    sessionStorage.setItem('role',userDetails.role);
}

function openHomePage(){
    if(sessionStorage.getItem('role') === 'CenterAdmin'){
        window.location.href = 'centerAdmin.html';
    }
    else if(sessionStorage.getItem('role') ==='Member'){
        window.location.href ='member.html';
    }
    else if(sessionStorage.getItem('role') ==='Admin'){
        window.location.href ='admin.html';
    }
}

function getLoginDetails(){
   let loginDetails = {
     email : document.getElementById('email').value ,
     password :document.getElementById('password').value
   }
   return loginDetails; 
}

function validateLoginDetails(loginDetails){
  const isValidEmailField = validateEmailField(loginDetails.email);
  const isValidPasswordField = validatePasswordField(loginDetails.password);

  return isValidEmailField && isValidPasswordField;
}

function validateEmailField(email){
    if(email === undefined || email.length === 0){
        makeInputBoxRedColor('email');
        let errorMessage = "Please enter your email"
        showErrorMessage(errorMessage, 'email-error');
        return false;
    }
    else if(!isValidEmail(email)){
        makeInputBoxRedColor('email');
        let errorMessage = "Please enter a valid email"
        showErrorMessage(errorMessage, 'email-error');
        return false;
    }
    else{
        makeInputBoxBlackColor('email');
        makeErrorContainerDisplayNone('email-error');
        return true;
    }
}

function validatePasswordField(password){
    if(password === undefined || password.length === 0){
        makeInputBoxRedColor('password');
        let errorMessage = "Please enter your password"
        showErrorMessage(errorMessage, 'password-error');
        return false;
    }
    else{
        makeInputBoxBlackColor('password');
        makeErrorContainerDisplayNone('password-error');
        return true;
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}