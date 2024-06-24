
document.addEventListener('DOMContentLoaded', (event) => {
    const dateInput = document.getElementById('dob');
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const maxDate = `${year}-${month}-${day}`;
    dateInput.setAttribute('max', maxDate);
});

function signUp(){
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
    console.log(userDetails);
    validateInputFields(userDetails);
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
    checkNameField(userDetails.name);
    checkEmailField(userDetails.email);
    checkGenderField(userDetails.gender);
    checkDateOfBirthField(userDetails.dob);
    checkContactNumberField(userDetails.contactNumber);
    checkStateField(userDetails.state);
    checkCityField(userDetails.city);
    checkAddressField(userDetails.address);
    checkPostalCodeField(userDetails.postalCode);
    checkRoleField(userDetails.role);
    checkCenterIdField(userDetails.centerId);
    checkCreatePasswordField(userDetails.createPassword);
    checkConfirmPasswordField(userDetails.createPassword, userDetails.confirmPassword);
}

function checkNameField(name) {
   if(name === undefined || name.length === 0) {
      makeInputBoxRedColor('name');
      let errorMessage = "Please enter your name"
      showErrorMessage(errorMessage , 'name-error');
   }
   else{
     makeInputBoxBlackColor('name');
     makeErrorContainerDisplayNone('name-error');
   }
}

function checkEmailField(email) {
    if(email === undefined || email.length === 0){
        makeInputBoxRedColor('email');
        let errorMessage = "Please enter your email"
        showErrorMessage(errorMessage, 'email-error');
    }
    else if(!isValidEmail(email)){
        makeInputBoxRedColor('email');
        let errorMessage = "Please enter a valid email"
        showErrorMessage(errorMessage, 'email-error');
    }
    else{
        makeInputBoxBlackColor('email');
        makeErrorContainerDisplayNone('email-error');
    }
}

function checkGenderField(gender) {
    if(gender === undefined){
        let errorMessage = "Please select your gender"
        showErrorMessage(errorMessage, 'gender-error');
    }
    else{
        makeErrorContainerDisplayNone('gender-error');
    }
}

function checkDateOfBirthField(dob) {
    if(dob === undefined || dob.length === 0){
        makeInputBoxRedColor('dob');
        let errorMessage = "Please enter your date of birth"
        showErrorMessage(errorMessage, 'dob-error');
    }
    else{
        makeInputBoxBlackColor('dob');
        makeErrorContainerDisplayNone('dob-error');
    }
}

function checkContactNumberField(contactNumber) {
    if(contactNumber === undefined || contactNumber.length === 0){
        makeInputBoxRedColor('contact-number');
        let errorMessage = "Please enter your contact number"
        showErrorMessage(errorMessage, 'contact-number-error');
    }
    else if(contactNumber.length !== 10){
        makeInputBoxRedColor('contact-number');
        let errorMessage = "Please enter a valid contact number"
        showErrorMessage(errorMessage, 'contact-number-error');
    }
    else{
        makeInputBoxBlackColor('contact-number');
        makeErrorContainerDisplayNone('contact-number-error');
    }
}

function checkStateField(state) {
    if(state === undefined || state.length === 0){
        makeInputBoxRedColor('state');
        let errorMessage = "Please select your state"
        showErrorMessage(errorMessage,'state-error');
    }
    else{
        makeErrorContainerDisplayNone('state-error');
        makeInputBoxBlackColor('state');
    }
}

function checkCityField(city) {
  if(city === undefined || city.length === 0){
      makeInputBoxRedColor('city');
      let errorMessage = "Please enter your city"
      showErrorMessage(errorMessage, 'city-error');
  }
  else{
      makeInputBoxBlackColor('city');
      makeErrorContainerDisplayNone('city-error');
  }
}

function checkAddressField(address) {
    if(address === undefined || address.length === 0){
        makeInputBoxRedColor('address');
        let errorMessage = "Please enter your address"
        showErrorMessage(errorMessage, 'address-error');
    }
    else{
        makeInputBoxBlackColor('address');
        makeErrorContainerDisplayNone('address-error');
    }
}

function checkPostalCodeField(postalCode) {
    if(postalCode === undefined || postalCode.length === 0){
        makeInputBoxRedColor('postal-code');
        let errorMessage = "Please enter your postal code"
        showErrorMessage(errorMessage, 'postal-code-error');
    }
    else if(postalCode.length!== 6){
        makeInputBoxRedColor('postal-code');
        let errorMessage = "Please enter a valid postal code"
        showErrorMessage(errorMessage, 'postal-code-error');
    }
    else{
        makeInputBoxBlackColor('postal-code');
        makeErrorContainerDisplayNone('postal-code-error');
    }
}

function checkRoleField(role) {
    if(role === undefined || role.length === 0){
        let errorMessage = "Please select your role"
        showErrorMessage(errorMessage, 'role-error');
    }
    else{
        makeErrorContainerDisplayNone('role-error');
    }
}

function checkCenterIdField(centerId) {
    if(centerId === undefined || centerId.length === 0){
        makeInputBoxRedColor('center-id');
        let errorMessage = "Please enter your center name"
        showErrorMessage(errorMessage, 'center-id-error');
    }
    else{
        makeErrorContainerDisplayNone('center-id-error');
        makeInputBoxBlackColor('center-id');
    }
}

function checkCreatePasswordField(createPassword) {
    if(createPassword === undefined || createPassword.length === 0){
        makeInputBoxRedColor('create-password');
        let errorMessage = "Please enter your password"
        showErrorMessage(errorMessage, 'create-password-error');
    }
    else if(createPassword.length < 6){
        makeInputBoxRedColor('create-password');
        let errorMessage = "Password should be greater than 5 characters"
        showErrorMessage(errorMessage, 'create-password-error');
    }
    else{
        makeInputBoxBlackColor('create-password');
        makeErrorContainerDisplayNone('create-password-error');
    }
}

function checkConfirmPasswordField(createPassword,confirmPassword) {
    if(confirmPassword === undefined || confirmPassword.length === 0){
        makeInputBoxRedColor('confirm-password');
        let errorMessage = "Please enter your password"
        showErrorMessage(errorMessage, 'confirm-password-error');
    }
    else if(confirmPassword.length < 6){
        makeInputBoxRedColor('confirm-password');
        let errorMessage = "Password should be greater than 5 characters"
        showErrorMessage(errorMessage, 'confirm-password-error');
    }
    else if(createPassword.length > 0 && confirmPassword !== createPassword){
        makeInputBoxRedColor('confirm-password');
        let errorMessage = "Password do not match"
        showErrorMessage(errorMessage, 'confirm-password-error');
    }
    else{
        makeInputBoxBlackColor('confirm-password');
        makeErrorContainerDisplayNone('confirm-password-error');
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function makeInputBoxRedColor(idName){
   const inputBox = document.getElementById(idName);
   inputBox.style.borderColor = 'red';
}

function makeInputBoxBlackColor(idName){
   const inputBox = document.getElementById(idName);
   inputBox.style.borderColor = 'black';
}

function showErrorMessage(errorMessage , idName){
    const errorContainer = document.getElementById(idName);
    errorContainer.innerHTML = errorMessage;
}

function makeErrorContainerDisplayNone(idName){
    const errorContainer = document.getElementById(idName);
    errorContainer.style.display = 'none';
}

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
        await fetchCenterName();
    }
    else{
        document.getElementById('center-id-container').style.display = 'none';
    }
});

async function fetchCenterName(){
    try{
        const response = await fetch('http://localhost:3000/centers');
        const centers = await response.json();
        const centerNames = centers.map(center => center.centerName);
        document.getElementById('center-id').innerHTML = '<option value="" disabled selected>Select your center name</option>';
        centerNames.forEach(centerName => {
            const option = document.createElement('option');
            option.value = centerName;
            option.innerText = centerName;
            document.getElementById('center-id').appendChild(option);
        });
    }
    catch(error) {
        console.log(error);
    };
}