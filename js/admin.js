import { activeAccount, addCenterDetails, approveRequest, getAllNotActivatedAccounts, getAllPendingRequest, getUser, rejectRequest } from "./api.js";
import { makeErrorContainerDisplayNone, makeInputBoxBlackColor, makeInputBoxRedColor, showErrorMessage } from "./Error.js";

import {showErrorToast , showSuccessToast} from "./Toast.js"


let notActivatedAccountLength = -1;
let approveRequestListLength = -1;
let currentRequestId = -1;


function closeSideBar(){
    const sidebarContainer = document.getElementsByClassName("sidebar-container-2"); 
    const navLinks = document.getElementsByClassName('menu-container-hamburger');
    var hamburger = document.getElementById('hamburger');
    navLinks[0].classList.remove('show');
    hamburger.innerHTML = '&#9776;'; 
    sidebarContainer[0].style.display = 'none';
}

function showSideBar(){
    const sidebarContainer = document.getElementsByClassName("sidebar-container-2"); 
    const navLinks = document.getElementsByClassName('menu-container-hamburger');
    var hamburger = document.getElementById('hamburger');
    if (navLinks[0].classList.contains('show')) {
        navLinks[0].classList.remove('show');
        hamburger.innerHTML = '&#9776;'; // hamburger icon
        sidebarContainer[0].style.display = 'none';
    } else {
            navLinks[0].classList.add('show');
            hamburger.innerHTML = '&times;'; // X icon
            sidebarContainer[0].style.display = 'flex';
    }
}


function makeAllSideBarItemsColorLightWhite(){
    const profileSideBarContainer1 = document.getElementById('profile-sidebar-container-1');
    profileSideBarContainer1.style.color = 'rgba(248, 246, 246, 0.548)';
    const profileSideBarContainer2 = document.getElementById('profile-sidebar-container-2');
    profileSideBarContainer2.style.color = 'rgba(248, 246, 246, 0.548)';
    const activateAdminContainer1 = document.getElementById('activate-admin-sidebar-container-1');
    activateAdminContainer1.style.color = 'rgba(248, 246, 246, 0.548)';
    const activateAdminContainer2 = document.getElementById('activate-admin-sidebar-container-2');
    activateAdminContainer2.style.color = 'rgba(248, 246, 246, 0.548)';
    const addCenterSideBarContainer1 = document.getElementById('add-center-sidebar-container-1');
    addCenterSideBarContainer1.style.color = 'rgba(248, 246, 246, 0.548)';
    const addCenterSideBarContainer2 = document.getElementById('add-center-sidebar-container-2');
    addCenterSideBarContainer2.style.color = 'rgba(248, 246, 246, 0.548)';
    const approveRequestSidebarContainer1 = document.getElementById('approve-request-sidebar-container-1');
    approveRequestSidebarContainer1.style.color = 'rgba(248, 246, 246, 0.548)';
    const approveRequestSidebarContainer2 = document.getElementById('approve-request-sidebar-container-2');
    approveRequestSidebarContainer2.style.color = 'rgba(248, 246, 246, 0.548)';
}

function makeAllContentContainerToDisplayNone(){
    const profileContainer = document.getElementById('profile-container');
    profileContainer.style.display = 'none';
    const activateAdminContainer = document.getElementById('activate-admin-container');
    activateAdminContainer.style.display = 'none';
    const addCenterContainer = document.getElementById('add-center-container');
    addCenterContainer.style.display = 'none';
    const approveRequestContainer = document.getElementById('approve-request-container');
    approveRequestContainer.style.display = 'none';
}

function showProfilePage(){
    makeAllSideBarItemsColorLightWhite();
    const profileSideBarContainer1 = document.getElementById('profile-sidebar-container-1');
    profileSideBarContainer1.style.color = 'white';
    const profileSideBarContainer2 = document.getElementById('profile-sidebar-container-2');
    profileSideBarContainer2.style.color = 'white';
    makeAllContentContainerToDisplayNone();
    const profileContainer = document.getElementById('profile-container');
    profileContainer.style.display = 'block';
    closeSideBar();
}

function showActivateAdminPage(){
    makeAllSideBarItemsColorLightWhite();
    const activateAdminSideBarContainer1 = document.getElementById('activate-admin-sidebar-container-1');
    activateAdminSideBarContainer1.style.color = 'white';
    const activateAdminSideBarContainer2 = document.getElementById('activate-admin-sidebar-container-2');
    activateAdminSideBarContainer2.style.color = 'white';
    makeAllContentContainerToDisplayNone();
    const activateAdminContainer = document.getElementById('activate-admin-container');
    activateAdminContainer.style.display = 'block';
    closeSideBar();
    getAllAccountDetailsFromBackend()
}

async function getAllAccountDetailsFromBackend(){
    try{
      const result = await getAllNotActivatedAccounts();
      console.log(result);
      if(result.status == 'success'){
        notActivatedAccountLength = result.data.length;
        if(result.data.length == 0){
            showNoNotActivatedAccountsMessageinDOM();
        }
        else{
            showNotActivatedAccountsInDOM();
            addNotActivatedAccountsToTableDOM(result.data);
            addNotActivatedAccountsToCardDOM(result.data);
        }
      }
      else if(result.status == 'error'){
        if(result.errorCode == 401 || result.errorCode == 403){
            loginAgain();   
        }
        else{
            showErrorToast('Error occured . Refresh the page');
        }
      }
    }
    catch(error)
    {
         showErrorToast('Error occured . Refresh the page');
        console.log(error);
    }
}
function addNotActivatedAccountsToTableDOM(accountList){
   const tableBody = document.getElementById('activate-admin-table-body');
   accountList.forEach(item => {
        const row = document.createElement('tr');
        row.setAttribute('data-account-id', item.accountId);
        row.innerHTML = `
            <td>${item.name}</td>
            <td colspan="2">${item.email}</td>
            <td>${item.gender}</td>
            <td>${item.age}</td>
            <td colspan="2">${item.contactNumber}</td>
            <td>${item.state}</td>
            <td>${item.city}</td>
            <td>${item.address}</td>
            <td>${item.postalCode}</td>
            <td colspan="2">${item.role}</td>
            <td>
                <button class="activate-admin-button-1" data-account-id="${item.accountId}">Activate</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
    document.querySelectorAll('.activate-admin-button-1').forEach(button => {
        button.addEventListener('click',  function() {
            const accountId = this.getAttribute('data-account-id');
            activateAccount(accountId);
        })
    })
}

function loginAgain(){
    showErrorToast('Please login again');
    window.sessionStorage.clear();
    window.location.replace ('login.html');
}

function addNotActivatedAccountsToCardDOM(accountList){
   const cardContainer = document.querySelector('.activate-admin-card-container');
   
   accountList.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('activate-admin-card');
        card.setAttribute('data-account-id', item.accountId);

        card.innerHTML = `
            <div class="activate-admin-item-container">
                <div>Name :</div>
                <div>${item.name}</div>
            </div>
            <div class="activate-admin-item-container">
                <div>Email :</div>
                <div>${item.email}</div>
            </div>
            <div class="activate-admin-item-container">
                <div>Gender :</div>
                <div>${item.gender}</div>
            </div>
            <div class="activate-admin-item-container">
                <div>Age :</div>
                <div>${item.age}</div>
            </div>
            <div class="activate-admin-item-container">
                <div>Contact-number :</div>
                <div>${item.contactNumber}</div>
            </div>
            <div class="activate-admin-item-container">
                <div>State :</div>
                <div>${item.state}</div>
            </div>
            <div class="activate-admin-item-container">
                <div>City :</div>
                <div>${item.city}</div>
            </div>
            <div class="activate-admin-item-container">
                <div>Address :</div>
                <div>${item.address}</div>
            </div>
            <div class="activate-admin-item-container">
                <div>Postal Code :</div>
                <div>${item.postalCode}</div>
            </div>
            <div class="activate-admin-item-container">
                <div>Role :</div>
                <div>${item.role}</div>
            </div>
            <div class="activate-btn-container">
                <button class="activate-admin-button-2" data-account-id="${item.accountId}">Activate</button>
            </div>
        `;
        cardContainer.appendChild(card);
    });
    document.querySelectorAll('.activate-admin-button-2').forEach(button => {
        button.addEventListener('click',  function() {
            const accountId = this.getAttribute('data-account-id');
            activateAccount(accountId);
        })
    })
}

async function activateAccount(accountId){
    try{
        const result = await activeAccount(accountId)
        if(result.status =='success'){
            showSuccessToast('Account activated successfully');
            removeRespectiveRowAndCard(accountId);
            if(notActivatedAccountLength == 0){
                showNoNotActivatedAccountsMessageinDOM();
            }
            
        }
        else if(result.status == 'error'){
            if(result.errorCode == 401 || result.errorCode == 403){
                loginAgain();   
            }
            else{
                showErrorToast('Error in activating account .please try again');
            }
        }
    }
    catch(error){
        showErrorToast('Error in activating account . please try again');
        console.log(error);
    }
}

function removeRespectiveRowAndCard(accountId){
    document.querySelector(`.activate-admin-card[data-account-id="${accountId}"]`).remove();
    document.querySelector(`tr[data-account-id = "${accountId}"]`).remove();
    notActivatedAccountLength--;
}

function showNoNotActivatedAccountsMessageinDOM(){
    const tableContainer = document.getElementById("active-admin-table");
    tableContainer.style.display = 'none';
    const cardContainer = document.querySelector('.activate-admin-card-container');
    cardContainer.style.display = 'none';
    const noNotActivatedAccountsMessage = document.getElementById('active-admin-message');
    noNotActivatedAccountsMessage.style.display = 'block';
}

function showNotActivatedAccountsInDOM(){
    const tableContainer = document.getElementById("active-admin-table");
    tableContainer.style.display = 'block';
    const noNotActivatedAccountsMessage = document.getElementById('active-admin-message');
    noNotActivatedAccountsMessage.style.display = 'none';
}

document.getElementById('add-center-sidebar-container-1').addEventListener('click' , showAddCenterPage);
document.getElementById('add-center-sidebar-container-2').addEventListener('click' , showAddCenterPage);


function showAddCenterPage(){
    makeAllSideBarItemsColorLightWhite();
    const addCenterSideBarContainer1 = document.getElementById('add-center-sidebar-container-1');
    addCenterSideBarContainer1.style.color = 'white';
    const addCenterSideBarContainer2 = document.getElementById('add-center-sidebar-container-2');
    addCenterSideBarContainer2.style.color = 'white';
    makeAllContentContainerToDisplayNone();
    const addCenterContainer = document.getElementById('add-center-container');
    addCenterContainer.style.display = 'block';
    closeSideBar();
}

document.getElementById('add-center-submit-btn').addEventListener('click' , addCenter)

async function addCenter(){
    let centerDetails = await getCenterDetails();
    if(await validateCenterDetails(centerDetails)){
        console.log(centerDetails);
        try{
           const result = await addCenterDetails(centerDetails);
            if(result.status =='success'){
                console.log(result.data);
               showSuccessToast('Donation Center added successfully');
               clearAddCenterForm();
            }
            else if(result.status == 'error'){
                if(result.errorCode == 401 || result.errorCode == 403){
                    loginAgain();   
                }
                else{
                    showErrorToast('Failed to add center . please try again');
                    clearAddCenterForm();
                }
            }
        }
        catch(error){
            showErrorToast('Failed to add center . please try again');
            console.log(error);
        }
    }

}

function clearAddCenterForm(){
    document.getElementById('add-center-name').value = '';
    document.getElementById('add-center-state').value = '';
    document.getElementById('add-center-city').value = '';
    document.getElementById('add-center-address').value = '';
    document.getElementById('add-center-postal-code').value = '';
    document.getElementById('add-center-contact-number').value = '';
    document.getElementById('add-center-operating-hours').value = '';
    makeInputBoxBlackColor('add-center-name');
    makeInputBoxBlackColor('add-center-state');
    makeInputBoxBlackColor('add-center-city');
    makeInputBoxBlackColor('add-center-address');
    makeInputBoxBlackColor('add-center-postal-code');
    makeInputBoxBlackColor('add-center-contact-number');
    makeInputBoxBlackColor('add-center-operating-hours');
    makeErrorContainerDisplayNone('add-center-name-error');
    makeErrorContainerDisplayNone('add-center-state-error');
    makeErrorContainerDisplayNone('add-center-city-error');
    makeErrorContainerDisplayNone('add-center-address-error');
    makeErrorContainerDisplayNone('add-center-postal-code-error');
    makeErrorContainerDisplayNone('add-center-contact-number-error');
    makeErrorContainerDisplayNone('add-center-operating-hours-error');

}

async function getCenterDetails(){
    let centerDetails ={
        name: document.getElementById('add-center-name').value,
        state: document.getElementById('add-center-state').value,
        city: document.getElementById('add-center-city').value,
        address: document.getElementById('add-center-address').value,
        postalCode: document.getElementById('add-center-postal-code').value,
        contactNumber: document.getElementById('add-center-contact-number').value,
        operatingHours: document.getElementById('add-center-operating-hours').value
    }
    return centerDetails;
}

async function validateCenterDetails(centerDetails){
    const isValidName = validateCenterName(centerDetails.name);
    const isValidState = validateState(centerDetails.state);
    const isValidCity = validateCity(centerDetails.city);
    const isValidAddress = validateAddress(centerDetails.address);
    const isValidPostalCode = validatePostalCode(centerDetails.postalCode);
    const isValidContactNumber = validateContactNumber(centerDetails.contactNumber);
    const isValidOperatingHours = validateOperatingHours(centerDetails.operatingHours);
    
    return isValidName && isValidState && isValidCity && isValidAddress && isValidPostalCode && isValidContactNumber && isValidOperatingHours;

}

function validateCenterName(name){
    if(name === undefined || name.length === 0){
        makeInputBoxRedColor('add-center-name');
        showErrorMessage('Please enter the name' , 'add-center-name-error');
        return false;
    }
    else{
        makeInputBoxBlackColor('add-center-name');
        makeErrorContainerDisplayNone('add-center-name-error');
        return true;
    }
}

function validateState(state){
    if(state === undefined || state.length === 0){
        makeInputBoxRedColor('add-center-state');
        showErrorMessage('Please select the state' , 'add-center-state-error');
        return false;
    }
    else{
        makeInputBoxBlackColor('add-center-state');
        makeErrorContainerDisplayNone('add-center-state-error');
        return true;
    }
}

function validateCity(city){
    if(city === undefined || city.length === 0){
        makeInputBoxRedColor('add-center-city');
        showErrorMessage('Please enter the city' , 'add-center-city-error');
        return false;
    }
    else{
        makeInputBoxBlackColor('add-center-city');
        makeErrorContainerDisplayNone('add-center-city-error');
        return true;
    }
}

function validateAddress(address){
    if(address === undefined || address.length === 0){
        makeInputBoxRedColor('add-center-address');
        showErrorMessage('Please enter the address' , 'add-center-address-error');
        return false;
    }
    else{
        makeInputBoxBlackColor('add-center-address');
        makeErrorContainerDisplayNone('add-center-address-error');
        return true;
    }
}

function validatePostalCode(postalCode){
    if(postalCode === undefined || postalCode.length === 0){
        makeInputBoxRedColor('add-center-postal-code');
        showErrorMessage('Please enter the postal code' , 'add-center-postal-code-error');
        return false;
    }
    else if(postalCode.length !== 6){
        makeInputBoxRedColor('add-center-postal-code');
        showErrorMessage('Invalid postal code' , 'add-center-postal-code-error');
        return false;
    }
    else{
        makeInputBoxBlackColor('add-center-postal-code');
        makeErrorContainerDisplayNone('add-center-postal-code-error');
        return true;
    }
}

function validateContactNumber(contactNumber){
    if(contactNumber === undefined || contactNumber.length === 0){
        makeInputBoxRedColor('add-center-contact-number');
        showErrorMessage('Please enter the contact number' , 'add-center-contact-number-error');
        return false;
    }
    else if(contactNumber.length != 10){
        makeInputBoxRedColor('add-center-contact-number');
        showErrorMessage('Invalid contact number' , 'add-center-contact-number-error');
        return false;
    }
    else{
        makeInputBoxBlackColor('add-center-contact-number');
        makeErrorContainerDisplayNone('add-center-contact-number-error');
        return true;
    }
}

function validateOperatingHours(operatingHours){
    if(operatingHours === undefined || operatingHours.length === 0){
        makeInputBoxRedColor('add-center-operating-hours');
        showErrorMessage('Please enter the operating hours' , 'add-center-operating-hours-error');
        return false;
    }
    else{
        makeInputBoxBlackColor('add-center-operating-hours');
        makeErrorContainerDisplayNone('add-center-operating-hours-error');
        return true;
    }
}


document.getElementById('approve-request-sidebar-container-1').addEventListener('click' , showApproveRequestPage);
document.getElementById('approve-request-sidebar-container-2').addEventListener('click' , showApproveRequestPage);
function showApproveRequestPage(){
    makeAllSideBarItemsColorLightWhite();
    const approveRequestSideBarContainer1 = document.getElementById('approve-request-sidebar-container-1');
    approveRequestSideBarContainer1.style.color = 'white';
    const approveRequestSideBarContainer2 = document.getElementById('approve-request-sidebar-container-2');
    approveRequestSideBarContainer2.style.color = 'white';
    makeAllContentContainerToDisplayNone();
    const approveRequestContainer = document.getElementById('approve-request-container');
    approveRequestContainer.style.display = 'block';
    closeSideBar();
    getAllRequestFromBackend();
}

async function getAllRequestFromBackend(){
    try{
        const result = await getAllPendingRequest();
        if(result.status == 'success'){
            approveRequestListLength = result.data.length;
            if(result.data.length == 0){
                showApproveRequestMessageInDOM();
            }
            else{
                showApproveMessageDisplayNoneInDOM();
                addRequestToTableDOM(result.data);
                addRequestToCardDOM(result.data);
            }
        }
        else if(result.status == 'error'){
            if(result.errorCode == 401 || result.errorCode == 403){
                loginAgain();
            }
            else{
                showErrorToast('Error occured , Please refresh the page');
            }
        }
    }
    catch(error){
        console.log(error);
        showErrorToast('Error occured , Please refresh the page');
    }
}

function showApproveRequestMessageInDOM(){
    const cardContainer =  document.querySelector('.approve-request-card-container');
    cardContainer.style.display = 'none';
    const tableContainer = document.getElementById('approve-request-table');
    tableContainer.style.display = 'none';
    const messageContainer = document.getElementById('approve-request-message-container');
    messageContainer.style.display = 'block';
}

function showApproveMessageDisplayNoneInDOM(){
    const tableContainer = document.getElementById('approve-request-table');
    tableContainer.style.display = 'block';
    const messageContainer = document.getElementById('approve-request-message-container');
    messageContainer.style.display = 'none';
}

function addRequestToTableDOM(requestList){
    const tableBody = document.getElementById('approve-request-table-body');
    tableBody.innerHTML = '';
    requestList.forEach(item => {
        const row = document.createElement('tr');
        row.setAttribute('data-request-id', item.requestId);
        row.innerHTML = `
            <td>${item.patientName}</td>
            <td>${item.bloodType}</td>
            <td>${item.rhFactor}</td>
            <td>${item.unitsNeeded}</td>
            <td>${item.requestedContactNumber}</td>
            <td>${item.description}</td>
            <td>${item.hospitalName}</td>
            <td>${item.doctorName}</td>
            <td>${item.doctorContactNumber}</td>
            <td colspan="2">
                <div class="approve-request-btn-container">
                    <button class="approve-request-button-1" data-request-id="${item.requestId}">Approve</button>
                    <button class="reject-request-button-1" data-request-id="${item.requestId}">Reject</button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });

    document.querySelectorAll('.approve-request-button-1').forEach(button => {
        button.addEventListener('click', function() {
            const requestId = this.getAttribute('data-request-id');
            console.log('called-1');
            approveRequestById(requestId);
        });
    });

    document.querySelectorAll('.reject-request-button-1').forEach(button => {
        button.addEventListener('click', function() {
            const requestId = this.getAttribute('data-request-id');
            currentRequestId = requestId;
            openRejectDialogBox();
        });
    });
}

async function approveRequestById(requestId){
    try{
        const result = await approveRequest(requestId)
        if(result.status =='success'){
            showSuccessToast('Request approved successfully');
            removeApproveRequestTableAndCard(requestId);
            if(approveRequestListLength == 0){
                showApproveRequestMessageInDOM();
            }
            
        }
        else if(result.status == 'error'){
            if(result.errorCode == 401 || result.errorCode == 403){
                loginAgain();
            }
            else{
                showErrorToast('Failed in approving the request.Please try again');
            }
        }
    }
    catch(error){
        showErrorToast('Failed in approving the request.Please try again');
        console.log(error);
    }
}

function removeApproveRequestTableAndCard(requestId){
   document.querySelector(`.approve-request-card[data-request-id = "${requestId}"]`).remove();
   document.querySelector(`tr[data-request-id = "${requestId}"]`).remove();
   approveRequestListLength--;
}

function addRequestToCardDOM(requestList){
    const cardContainer = document.getElementsByClassName('approve-request-card-container')[0];
    cardContainer.innerHTML = '';
    requestList.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('approve-request-card');
        card.setAttribute('data-request-id', item.requestId);

        card.innerHTML = `
            <div class="approve-request-item-container">
                <div>Patient Name :</div>
                <div>${item.patientName}</div>
            </div>
            <div class="approve-request-item-container">
                <div>Blood Type :</div>
                <div>${item.bloodType}</div>
            </div>
            <div class="approve-request-item-container">
                <div>Rh Factor :</div>
                <div>${item.rhFactor}</div>
            </div>
            <div class="approve-request-item-container">
                <div>Units Needed :</div>
                <div>${item.unitsNeeded}</div>
            </div>
            <div class="approve-request-item-container">
                <div>Contact-number :</div>
                <div>${item.requestedContactNumber}</div>
            </div>
            <div class="approve-request-item-container">
                <div>Description :</div>
                <div>${item.description}</div>
            </div>
            <div class="approve-request-item-container">
                <div>Hospital Name :</div>
                <div>${item.hospitalName}</div>
            </div>
            <div class="approve-request-item-container">
                <div>Doctor Name :</div>
                <div>${item.doctorName}</div>
            </div>
            <div class="approve-request-item-container">
                <div>Doctor Contact Number :</div>
                <div>${item.doctorContactNumber}</div>
            </div>
            <div class="approve-request-btn-container">
                <button class="approve-request-button-2" data-request-id="${item.requestId}">Approve</button>
                <button class="reject-request-button-2" data-request-id="${item.requestId}">Reject</button>
            </div>
        `;
        cardContainer.appendChild(card);
    });

    document.querySelectorAll('.approve-request-button-2').forEach(button => {
        button.addEventListener('click', function() {
            const requestId = this.getAttribute('data-request-id');
            console.log('called-2');
            approveRequestById(requestId);
        });
    });

    document.querySelectorAll('.reject-request-button').forEach(button => {
        button.addEventListener('click', function() {
            const requestId = this.getAttribute('data-request-id');
            currentRequestId = requestId;
            openRejectDialogBox();
        });
    });
}

document.getElementById('reject-request-submit-btn').addEventListener('click' , rejectRequestById)

async function rejectRequestById(){
    const rejectReason = document.getElementById('reject-request-input').value;
    if(validRejectReason(rejectReason)){
        let requestDetails = {
            id : currentRequestId,
            rejectReason : rejectReason
        }
        try{
            const result = await rejectRequest(requestDetails)
            if(result.status =='success'){
                showSuccessToast('Request rejected successfully');
                closeRejectDialogBox();
                removeApproveRequestTableAndCard(currentRequestId);
                if(approveRequestListLength == 0){
                    showApproveRequestMessageInDOM();
                }
            }
            else if(result.status == 'error'){
                if(result.errorCode == 401 || result.errorCode == 403){
                    loginAgain();
                }
                else{
                    showErrorToast('Failed in rejecting the request. Please try again');
                }
            }
        }
        catch(error){
            showErrorToast('Failed in rejecting the request. Please try again');
            console.log(error);
        }
    }
}

function validRejectReason(rejectReason){
    if(rejectReason == undefined || rejectReason.length == 0){
        makeInputBoxRedColor('reject-request-input');
        showErrorMessage('Please enter the reason' , 'reject-request-input-error');
        return false;
    }
    else{
        makeInputBoxBlackColor('reject-request-input');
        makeErrorContainerDisplayNone('reject-request-input-error');
        return true;
    }
}
document.getElementById('reject-form-close-btn').addEventListener('click' , openRejectDialogBox);

function openRejectDialogBox(){
    var modal = document.getElementById("approve-request-reject-modal");
    modal.style.display = "flex";
}

document.getElementById('reject-form-close-btn').addEventListener('click' , closeRejectDialogBox);

function closeRejectDialogBox(){
    const rejectReasonInputContainer = document.getElementById('reject-request-input').value = '';
    var modal = document.getElementById("approve-request-reject-modal");
    modal.style.display = "none";
}

document.getElementById('hamburger').addEventListener('click' , showSideBar);
document.getElementById('profile-sidebar-container-1').addEventListener('click' , showProfilePage);
document.getElementById('profile-sidebar-container-2').addEventListener('click' , showProfilePage);

document.addEventListener('DOMContentLoaded' , fetchProfileDetails);

async function fetchProfileDetails(){
    const userId = sessionStorage.getItem('userId');
    try{
        const result = await getUser(userId);
        if(result.status === 'success'){
            addProfileDetailstoDOM(result.data);
        }
        else if(result.status === 'error'){
            showErrorToast("Profile Details Not found.Please Refresh");
        }
    }
    catch(err){
        console.log(err);
        showErrorToast("Profile Details Not found.Please Refresh");
    }
}

function addProfileDetailstoDOM(userDetails){
    const container = document.querySelector('.profile-content-container');

    for (const [key, value] of Object.entries(userDetails)) {
        const itemContainer = document.createElement('div');
        itemContainer.className = 'profile-item-container';

        const label = document.createElement('div');
        label.className = 'label';
        label.textContent = `${capitalizeFirstLetter(key.replace(/([A-Z])/g, ' $1'))} :`;

        const detail = document.createElement('div');
        detail.textContent = value;

        itemContainer.appendChild(label);
        itemContainer.appendChild(detail);

        container.appendChild(itemContainer);
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

document.getElementById('activate-admin-sidebar-container-1').addEventListener('click' , showActivateAdminPage);
document.getElementById('activate-admin-sidebar-container-2').addEventListener('click' , showActivateAdminPage);

