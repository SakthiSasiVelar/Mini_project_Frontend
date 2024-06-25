import { addUserDetails, fetchCenterNameAndId } from "./api.js";
import { showSuccessToast , showErrorToast } from "./Toast.js";
import { makeErrorContainerDisplayNone , makeInputBoxBlackColor , makeInputBoxRedColor , showErrorMessage } from "./Error.js";


document.addEventListener('DOMContentLoaded', (event) => {
    const dateInput = document.getElementById('dob');
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const maxDate = `${year}-${month}-${day}`;
    dateInput.setAttribute('max', maxDate);
});

document.getElementById('submit-btn').addEventListener('click', signUp);

async function signUp(){
    let userDetails = getUserDetails();
    if(validateInputFields(userDetails)){
        let newUserDetails = getNewUserDetailsForCenterAdmin(userDetails);
       try {
            const result = await addUserDetails(newUserDetails);
            if (result.status === 'success') {
                showSuccessToast("user added successfully")
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000); 
            } else if (result.status === 'error') {
                showErrorToast(result.message);
            }
        } catch (error) {
            console.log(error.message);
        }
    }
}

function getNewUserDetailsForCenterAdmin(userDetails){
    let newUserDetails = {
       name : userDetails.name,
       email : userDetails.email,
       gender : userDetails.gender,
       dateOfBirth : userDetails.dob,
       contactNumber : userDetails.contactNumber,
       state : userDetails.state,
       city : userDetails.city,
       address : userDetails.address,
       postalCode : userDetails.postalCode,
       role : userDetails.role,
       password : userDetails.confirmPassword
    }
    if(userDetails.role === 'CenterAdmin'){
        newUserDetails.centerId = userDetails.centerId;
    }
    return newUserDetails;
}

function getUserDetails(){
   let  userDetails = {
        name : document.getElementById('name').value,
        email : document.getElementById('email').value,
        gender : getGenderValue(),
        dob : document.getElementById('dob').value,
        contactNumber : document.getElementById('contact-number').value,
        state : getStateFullName(document.getElementById('state').value),
        city : document.getElementById('city').value,
        address : document.getElementById('address').value,
        postalCode : document.getElementById('postal-code').value,
        role : document.getElementById('role').value,
        centerId : document.getElementById('center-id').value,
        createPassword : document.getElementById('create-password').value,
        confirmPassword : document.getElementById('confirm-password').value
    }
    return userDetails;
}

function getStateFullName(abbreviation) {
    const stateMap = {
        "AP": "Andhra Pradesh",
        "AR": "Arunachal Pradesh",
        "AS": "Assam",
        "BR": "Bihar",
        "CT": "Chhattisgarh",
        "GA": "Goa",
        "GJ": "Gujarat",
        "HR": "Haryana",
        "HP": "Himachal Pradesh",
        "JK": "Jammu and Kashmir",
        "JH": "Jharkhand",
        "KA": "Karnataka",
        "KL": "Kerala",
        "MP": "Madhya Pradesh",
        "MH": "Maharashtra",
        "MN": "Manipur",
        "ML": "Meghalaya",
        "MZ": "Mizoram",
        "NL": "Nagaland",
        "OR": "Odisha",
        "PB": "Punjab",
        "RJ": "Rajasthan",
        "SK": "Sikkim",
        "TN": "Tamil Nadu",
        "TG": "Telangana",
        "TR": "Tripura",
        "UP": "Uttar Pradesh",
        "UT": "Uttarakhand",
        "WB": "West Bengal",
        "AN": "Andaman and Nicobar Islands",
        "CH": "Chandigarh",
        "DH": "Dadra and Nagar Haveli and Daman and Diu",
        "LD": "Lakshadweep",
        "DL": "Delhi",
        "PY": "Puducherry",
        "LA": "Ladakh"
    };

    return stateMap[abbreviation] || "";
}

 function getGenderValue() {
    const genderOptions = document.getElementsByName('gender');
    let selectedGender;
    for (const option of genderOptions) {
        if (option.checked) {
            selectedGender = option.value;
            break;
        }
    }
    return selectedGender;
}

function validateInputFields(userDetails) {
    let isValidNameField = checkNameField(userDetails.name);
    let isValidEmailField = checkEmailField(userDetails.email);
    let isValidGenderField = checkGenderField(userDetails.gender);
    let  isValidDobField = checkDateOfBirthField(userDetails.dob);
    let isValidContactNumberField = checkContactNumberField(userDetails.contactNumber);
    let isValidStateField = checkStateField(userDetails.state);
    let isValidCityField = checkCityField(userDetails.city);
    let  isValidAddressField = checkAddressField(userDetails.address);
    let  isValidPostalCodeField = checkPostalCodeField(userDetails.postalCode);
    let isValidRoleField  = checkRoleField(userDetails.role);
    let  isValidCreatePasswordField = checkCreatePasswordField(userDetails.createPassword);
    let isValidConfirmPasswordField =  checkConfirmPasswordField(userDetails.createPassword, userDetails.confirmPassword);

    if(isValidNameField && isValidEmailField && isValidGenderField && isValidDobField && isValidContactNumberField && isValidStateField && isValidCityField && isValidAddressField && isValidPostalCodeField && isValidRoleField && isValidCreatePasswordField && isValidConfirmPasswordField){
        if(userDetails.role === 'CenterAdmin'){
           return checkCenterIdField(userDetails.centerId);
        }
        return true;
    }

    return false;
   
}

function checkNameField(name) {
   if(name === undefined || name.length === 0) {
      makeInputBoxRedColor('name');
      let errorMessage = "Please enter your name"
      showErrorMessage(errorMessage , 'name-error');
      return false;
   }
   else{
     makeInputBoxBlackColor('name');
     makeErrorContainerDisplayNone('name-error');
     return true;
   }
}

function checkEmailField(email) {
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

function checkGenderField(gender) {
    if(gender === undefined){
        let errorMessage = "Please select your gender"
        showErrorMessage(errorMessage, 'gender-error');
        return false;
    }
    else{
        makeErrorContainerDisplayNone('gender-error');
        return true;
    }
}

function checkDateOfBirthField(dob) {
    if(dob === undefined || dob.length === 0){
        makeInputBoxRedColor('dob');
        let errorMessage = "Please enter your date of birth"
        showErrorMessage(errorMessage, 'dob-error');
        return false;
    }
    else{
        makeInputBoxBlackColor('dob');
        makeErrorContainerDisplayNone('dob-error');
        return true;
    }
}

function checkContactNumberField(contactNumber) {
    if(contactNumber === undefined || contactNumber.length === 0){
        makeInputBoxRedColor('contact-number');
        let errorMessage = "Please enter your contact number"
        showErrorMessage(errorMessage, 'contact-number-error');
        return false;
    }
    else if(contactNumber.length !== 10){
        makeInputBoxRedColor('contact-number');
        let errorMessage = "Please enter a valid contact number"
        showErrorMessage(errorMessage, 'contact-number-error');
        return false;
    }
    else{
        makeInputBoxBlackColor('contact-number');
        makeErrorContainerDisplayNone('contact-number-error');
        return true;
    }
}

function checkStateField(state) {
    if(state === undefined || state.length === 0){
        makeInputBoxRedColor('state');
        let errorMessage = "Please select your state"
        showErrorMessage(errorMessage,'state-error');
        return false;
    }
    else{
        makeErrorContainerDisplayNone('state-error');
        makeInputBoxBlackColor('state');
        return true;
    }
}

function checkCityField(city) {
  if(city === undefined || city.length === 0){
      makeInputBoxRedColor('city');
      let errorMessage = "Please enter your city"
      showErrorMessage(errorMessage, 'city-error');
      return false;
  }
  else{
      makeInputBoxBlackColor('city');
      makeErrorContainerDisplayNone('city-error');
      return true;
  }
}

function checkAddressField(address) {
    if(address === undefined || address.length === 0){
        makeInputBoxRedColor('address');
        let errorMessage = "Please enter your address"
        showErrorMessage(errorMessage, 'address-error');
        return false;
    }
    else{
        makeInputBoxBlackColor('address');
        makeErrorContainerDisplayNone('address-error');
        return true;
    }
}

function checkPostalCodeField(postalCode) {
    if(postalCode === undefined || postalCode.length === 0){
        makeInputBoxRedColor('postal-code');
        let errorMessage = "Please enter your postal code"
        showErrorMessage(errorMessage, 'postal-code-error');
        return false;
    }
    else if(postalCode.length!== 6){
        makeInputBoxRedColor('postal-code');
        let errorMessage = "Please enter a valid postal code"
        showErrorMessage(errorMessage, 'postal-code-error');
        return false;
    }
    else{
        makeInputBoxBlackColor('postal-code');
        makeErrorContainerDisplayNone('postal-code-error');
        return true;
    }
}

function checkRoleField(role) {
    if(role === undefined || role.length === 0){
        let errorMessage = "Please select your role"
        showErrorMessage(errorMessage, 'role-error');
        return false;
    }
    else{
        makeErrorContainerDisplayNone('role-error');
        return true;
    }
}

function checkCenterIdField(centerId) {
    if(centerId === undefined || centerId.length === 0){
        makeInputBoxRedColor('center-id');
        let errorMessage = "Please select your center "
        showErrorMessage(errorMessage, 'center-id-error');
        return false;
    }
    else{
        makeErrorContainerDisplayNone('center-id-error');
        makeInputBoxBlackColor('center-id');
        return true;
    }
}

function checkCreatePasswordField(createPassword) {
    if(createPassword === undefined || createPassword.length === 0){
        makeInputBoxRedColor('create-password');
        let errorMessage = "Please enter your password"
        showErrorMessage(errorMessage, 'create-password-error');
        return false;
    }
    else if(createPassword.length < 6){
        makeInputBoxRedColor('create-password');
        let errorMessage = "Password should be greater than 5 characters"
        showErrorMessage(errorMessage, 'create-password-error');
        return false;
    }
    else{
        makeInputBoxBlackColor('create-password');
        makeErrorContainerDisplayNone('create-password-error');
        return true;
    }
}

function checkConfirmPasswordField(createPassword,confirmPassword) {
    if(confirmPassword === undefined || confirmPassword.length === 0){
        makeInputBoxRedColor('confirm-password');
        let errorMessage = "Please enter your password"
        showErrorMessage(errorMessage, 'confirm-password-error');
        return false;
    }
    else if(confirmPassword.length < 6){
        makeInputBoxRedColor('confirm-password');
        let errorMessage = "Password should be greater than 5 characters"
        showErrorMessage(errorMessage, 'confirm-password-error');
        return false;
    }
    else if(createPassword.length > 0 && confirmPassword !== createPassword){
        makeInputBoxRedColor('confirm-password');
        let errorMessage = "Password do not match"
        showErrorMessage(errorMessage, 'confirm-password-error');
        return false;
    }
    else{
        makeInputBoxBlackColor('confirm-password');
        makeErrorContainerDisplayNone('confirm-password-error');
        return true;
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


document.getElementById('togglePassword').addEventListener('click', togglePassword);
function togglePassword(){
    const passwordField = document.getElementById('confirm-password');
    if(passwordField.type === 'password'){
        passwordField.type = 'text';
    }
    else{
        passwordField.type = 'password';
    }
}

document.getElementById('role').addEventListener('change',async ()=>{
    const role = document.getElementById('role').value;
    if(role === 'CenterAdmin'){
        document.getElementById('center-id-container').style.display = 'block';
        try{
            const result = await fetchCenterNameAndId();
            if(result.status === 'success'){
                const centers = result.data;
                document.getElementById('center-id').innerHTML = '<option value="" disabled selected>Select your center name</option>';
                centers.forEach(center => {
                    const option = document.createElement('option');
                    option.value = center.centerId;
                    option.innerText = center.centerName;
                    document.getElementById('center-id').appendChild(option);
                });
            }
            else if(result.status === 'error'){
                console.log(result.message);
            }
        }
        catch(error){
            console.log(error);
        }
        
    }
    else{
        document.getElementById('center-id-container').style.display = 'none';
    }
});
