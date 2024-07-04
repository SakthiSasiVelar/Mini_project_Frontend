import { getUser ,addRequest, getAllApprovedRequest, addDonationToRequest ,rejectDonation,getAllDonateCenters , addDonationToCenter, getDonationHistory ,getRequestHistory,getPendingDonationsForAllRequestOfUser,approveDonation} from "./api.js";
import {showErrorToast ,showSuccessToast } from "./Toast.js";
import { makeInputBoxRedColor , makeInputBoxBlackColor , makeErrorContainerDisplayNone,showErrorMessage } from "./Error.js";

document.addEventListener('DOMContentLoaded', fetchProfileDetails);

let approvedRequestListLength = 0;
let currentDonationCenterId = -1;
let donationHistory = {};
let requestHistory = {};    
let donationListForRequestLength = 0;
let currentRequestId = -1;
let currentDonationId = -1;

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

document.getElementById('profile-container-1').addEventListener('click',showProfilePage);
document.getElementById('profile-container-2').addEventListener('click',showProfilePage);
function showProfilePage(){
    makeAllSideBarItemsColorLightWhite();
    const profileContainer1 = document.getElementById("profile-container-1");
    profileContainer1.style.color = "white";
    const profileContainer2 = document.getElementById("profile-container-2");
    profileContainer2.style.color = "white";
    makeAllContentContainerToDisplayNone();
    const profileContentContainer = document.getElementById("profile-container");
    profileContentContainer.style.display = "block";
    closeSideBar();
}

document.getElementById("donate-container-request-1").addEventListener('click',showDonateToRequestPage);
document.getElementById("donate-container-request-2").addEventListener('click',showDonateToRequestPage);
function showDonateToRequestPage(){
    makeAllSideBarItemsColorLightWhite();
     const donateContainer1 = document.getElementById("donate-container-request-1");
    donateContainer1.style.color = "white";
    const donateContainer2 = document.getElementById("donate-container-request-2");
    donateContainer2.style.color = "white";
    makeAllContentContainerToDisplayNone();
    const donateContentContainer = document.getElementById("donate-container-request");
    donateContentContainer.style.display = "block";
    closeSideBar();
    getApprovedRequests();
}

async function getApprovedRequests(){
    try{
        const result = await getAllApprovedRequest();
        if(result.status ==='success'){
            approvedRequestListLength = result.data.length;
            if(result.data.length === 0){
               showNoRequestMessageInDOM();
            }
            else{
                showRequestInDOM();
                addRequestToTableDOM(result.data);
                addRequestToCardDOM(result.data);
            }
        }
        else if(result.status === 'error'){
           if(result.errorCode === 401 || result.errorCode === 403){
               loginAgain();
           }
           else{
              showErrorToast('Error occured . Refresh the page');
           }
        }
    }
    catch(error){
        showErrorToast('Error occured . Refresh the page');
        console.log(error);
    }
}

function showRequestInDOM(){
    const noRequestMessageContainer = document.getElementById('no-request-message');
    noRequestMessageContainer.style.display = 'none';
    const donateRequestTable = document.getElementById('donateRequest-table');
    donateRequestTable.style.display = 'block';
}

function showNoRequestMessageInDOM(){
    const donateRequestTable = document.getElementById('donateRequest-table');
    donateRequestTable.style.display = 'none';
    const noRequestMessageContainer = document.getElementById('no-request-message');
    noRequestMessageContainer.style.display = 'block';
}

function addRequestToTableDOM(requestList){
    const tableBody = document.getElementById('request-table-body');
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
            <td>${item.hospitalName}</td>
            <td>${item.hospitalAddress}</td>
            <td>${item.description}</td>
            <td><div class="donate-btn">Donate</div></td>
        `;
        row.querySelector('.donate-btn').addEventListener('click' , ()=> {
            let donateDetails = {
                requestId : item.requestId,
                bloodType : item.bloodType,
                rhFactor : item.rhFactor
            }
            handleDonate(donateDetails);
        })
        tableBody.appendChild(row);
    });
}

function addRequestToCardDOM(requestList){
    const cardContainer = document.getElementsByClassName('donateRequest-card-container')[0];
    cardContainer.innerHTML = ''; 
    requestList.forEach(item => {
        const card = document.createElement('div');
        card.className = 'donateRequest-card';
        card.setAttribute('data-request-id', item.requestId);
        card.innerHTML = `
            <div class="donateRequest-card-item-container">
                <div>Patient Name :</div>
                <div>${item.patientName}</div>
            </div>
            <div class="donateRequest-card-item-container">
                <div>Blood Type :</div>
                <div>${item.bloodType}</div>
            </div>
            <div class="donateRequest-card-item-container">
                <div>Rh Factor:</div>
                <div>${item.rhFactor}</div>
            </div>
            <div class="donateRequest-card-item-container">
                <div>Units Needed :</div>
                <div>${item.unitsNeeded}</div>
            </div>
            <div class="donateRequest-card-item-container">
                <div>Contact Number:</div>
                <div>${item.requestedContactNumber}</div>
            </div>
            <div class="donateRequest-card-item-container">
                <div>Hospital Name :</div>
                <div>${item.hospitalName}</div>
            </div>
            <div class="donateRequest-card-item-container">
                <div>Hospital Address :</div>
                <div>${item.hospitalAddress}</div>
            </div>
            <div class="donateRequest-card-item-container">
                <div>Description :</div>
                <div>${item.description}</div>
            </div>
            <div class="donate-btn-container">
                <div class="donate-btn">Donate</div>
            </div>
        `;
        card.querySelector('.donate-btn').addEventListener('click' , ()=> {
            let donateDetails = {
                requestId : item.requestId,
                bloodType : item.bloodType,
                rhFactor : item.rhFactor
            }
            handleDonate(donateDetails);
        })
        cardContainer.appendChild(card);
    });
}


async function handleDonate(donateDetails){
   let newDonateDetails = getNewDonateDetails(donateDetails);
   try{
        const result = await addDonationToRequest(newDonateDetails);
        if(result.status ==='success'){
            showSuccessToast('Donation added successfully');
            document.querySelector(`.donateRequest-card[data-request-id="${donateDetails.requestId}"]`).remove();
            document.querySelector(`tr[data-request-id="${donateDetails.requestId}"]`).remove();
             approvedRequestListLength--;
             if(approvedRequestListLength === 0){
                showNoRequestMessageInDOM();
             }
        }
        else if(result.status === 'error'){
            if(result.errorCode === 401 || result.errorCode === 403){
                loginAgain();
            }
            else{
                showErrorToast('Error in adding donation.Please try again');
            }
        }
    }
   catch(error){
       showErrorToast('Error in adding donation.Please try again');
       console.log(error);
   }
}

function getNewDonateDetails(donateDetails){
    let newDonateDetails = {
        userId : sessionStorage.getItem('userId'),
        requestId : donateDetails.requestId,
        bloodType : donateDetails.bloodType,
        rhFactor : donateDetails.rhFactor,
        unitsDonated : "1",
        donateDateTime : new Date()
    }
    return newDonateDetails;
}

document.getElementById("donate-container-center-1").addEventListener('click',showDonateToCenterPage);
document.getElementById("donate-container-center-2").addEventListener('click',showDonateToCenterPage);

function showDonateToCenterPage(){
    makeAllSideBarItemsColorLightWhite();
    const donateContainer1 = document.getElementById("donate-container-center-1");
    donateContainer1.style.color = "white";
    const donateContainer2 = document.getElementById("donate-container-center-2");
    donateContainer2.style.color = "white";
    makeAllContentContainerToDisplayNone();
    const donateContentContainer = document.getElementById("donate-container-center");
    donateContentContainer.style.display = "block";
    closeSideBar();
    getDonateCenters();
}

async function getDonateCenters(){
    try{
        const result = await getAllDonateCenters();
        if(result.status ==='success'){
            if(result.data.length === 0){
                showNoDonationCenterMessageInDOM();
            }
            else{
                showDonationCenterInDOM();
                addDonationCenterToTableDOM(result.data);
                addDonationCenterToCardDOM(result.data);
            }
        }
        else if(result.status === 'error'){
            if(result.errorCode === 401 || result.errorCode === 403){
                loginAgain();
            }
            else{
                showErrorToast('Error in getting donate centers.Please try again');
            }
        }
    }
    catch(error){
        showErrorToast('Error in getting donate centers.Please try again');
        console.log(error);
    }
}
function addDonationCenterToCardDOM(donateCenterList){
    const cardContainer = document.getElementsByClassName('donateCenter-card-container')[0];
    cardContainer.innerHTML = '';
    donateCenterList.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('donateCenter-card');
        card.setAttribute('data-center-id', item.donationCenterId);

        card.innerHTML = `
            <div class="donateCenter-card-item-container">
                <div>Center Name :</div>
                <div>${item.name}</div>
            </div>
            <div class="donateCenter-card-item-container">
                <div>State :</div>
                <div>${item.state}</div>
            </div>
            <div class="donateCenter-card-item-container">
                <div>City :</div>
                <div>${item.city}</div>
            </div>
            <div class="donateCenter-card-item-container">
                <div>Address :</div>
                <div>${item.address}</div>
            </div>
            <div class="donateCenter-card-item-container">
                <div>Postal Code :</div>
                <div>${item.postalCode}</div>
            </div>
            <div class="donateCenter-card-item-container">
                <div>Contact Number :</div>
                <div>${item.contactNumber}</div>
            </div>
            <div class="donateCenter-card-item-container">
                <div>Operating hours:</div>
                <div>${item.operatingHours}</div>
            </div>
            <div class="donate-btn-container">
                <div class="donate-btn" data-center-id="${item.donationCenterId}">Donate</div>
            </div>
        `;

        card.querySelector('.donate-btn').addEventListener('click', function() {
            openDonateToCenterDialogForm(); 
            currentDonationCenterId = item.donationCenterId;
        });

        cardContainer.appendChild(card);
    });
}

function addDonationCenterToTableDOM(donateCenterList){
    const tableBody = document.getElementById('center-table-body');
    tableBody.innerHTML = '';
    donateCenterList.forEach(item => {
        const row = document.createElement('tr');
        row.setAttribute('data-center-id', item.donationCenterId);
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.state}</td>
            <td>${item.city}</td>
            <td>${item.postalCode}</td>
            <td>${item.address}</td>
            <td>${item.contactNumber}</td>
            <td>${item.operatingHours}</td>
            <td>
                <div class="donate-btn">Donate</div>
            </td>
        `;
        row.querySelector('.donate-btn').addEventListener('click', function() {
            openDonateToCenterDialogForm(); 
            currentDonationCenterId = item.donationCenterId;
        });
        tableBody.appendChild(row);
    });
}

function showDonationCenterInDOM(){
    const noDonationCenterMessageContainer = document.getElementById('no-donation-center-message');
    noDonationCenterMessageContainer.style.display = 'none';
    const donateCenterTable = document.getElementById('donateCenter-table');
    donateCenterTable.style.display = 'block';
}

function showNoDonationCenterMessageInDOM(){
    const donateCenterTable = document.getElementById('donateCenter-table');
    donateCenterTable.style.display = 'none';
    const noDonationCenterMessageContainer = document.getElementById('no-donation-center-message');
    noDonationCenterMessageContainer.style.display = 'block';
}

document.getElementById("request-container-1").addEventListener('click',showRequestPage);
document.getElementById("request-container-2").addEventListener('click',showRequestPage);

function showRequestPage(){
    makeAllSideBarItemsColorLightWhite();
    const requestContainer1 = document.getElementById("request-container-1");
    requestContainer1.style.color = "white";
    const requestContainer2 = document.getElementById("request-container-2");
    requestContainer2.style.color = "white";
    makeAllContentContainerToDisplayNone();
    const requestContentContainer = document.getElementById("request-container");
    requestContentContainer.style.display = "block";
    closeSideBar();
    getRequestHistoryFromBackend();
}

async function getRequestHistoryFromBackend(){
    try{
        const result = await getRequestHistory();
        if(result.status === "success"){
            requestHistory = result.data;
            addValuesToRespectiveRequestHistory();
            getScheduleRequestHistory();
        }
        else if(result.status === "error"){
            if(result.errorCode === 401 || result.errorCode === 403 || result.errorCode === 404){
                loginAgain();
            }
            else{
                showErrorMessage('Please refresh the page');
                console.log(result.data);
            }
        }
    }
    catch(error){
        showErrorMessage('Please refresh the page');
        console.log(error);
    }
}

function addValuesToRespectiveRequestHistory(){
    const scheduleRequestHistoryValue = document.getElementById('schedule-request-history-card-value');
    scheduleRequestHistoryValue.textContent = requestHistory.scheduledRequestHistoryList.length ;
    const approvedRequestHistoryValue = document.getElementById('approved-request-history-card-value');
    approvedRequestHistoryValue.textContent = requestHistory.approvedRequestHistoryList.length;
    const rejectedRequestHistoryValue = document.getElementById('rejected-request-history-card-value');
    rejectedRequestHistoryValue.textContent = requestHistory.rejectedRequestHistoryList.length;
}




document.getElementById('donate-history-sidebar-1').addEventListener('click', showDonateHistoryPage);
document.getElementById('donate-history-sidebar-2').addEventListener('click', showDonateHistoryPage);

function showDonateHistoryPage(){
    makeAllSideBarItemsColorLightWhite();
    const donateHistoryContainer1 = document.getElementById("donate-history-sidebar-1");
    donateHistoryContainer1.style.color = "white";
    const donateHistoryContainer2 = document.getElementById("donate-history-sidebar-2");
    donateHistoryContainer2.style.color = "white";
    makeAllContentContainerToDisplayNone();
    const donateHistoryContentContainer = document.getElementById("donate-history-container");
    donateHistoryContentContainer.style.display = "block";
    closeSideBar();
    getDonationHistoryFromBackend();
    
}

async function getDonationHistoryFromBackend(){
    try{
        const result = await getDonationHistory();
        if(result.status === "success"){
           donationHistory = result.data;
           addValuesToRespectiveDonationHistory(donationHistory);
           getScheduleDonationHistory();
        }
        else if(result.status === "error"){
            if(result.errorCode === 401 || result.errorCode === 403 || result.errorCode === 404){
                loginAgain();
            }
            else{
                showErrorMessage('Please refresh the page');
                console.log(result.data);
            }
        }
   }
    catch(error){
        showErrorMessage('Please refresh the page');
        console.log(error);
    }
}

function addValuesToRespectiveDonationHistory(donationHistory){
    const scheduledDonationHistoryValue = document.getElementById('schedule-donation-history-card-value');
    scheduledDonationHistoryValue.textContent = donationHistory.scheduledDonationHistory.length;
    const approvedDonationHistoryValue = document.getElementById('approved-donation-history-card-value');
    approvedDonationHistoryValue.textContent = donationHistory.approvedDonationHistory.length;
    const rejectedDonationHistoryValue = document.getElementById('rejected-donation-history-card-value');
    rejectedDonationHistoryValue.textContent = donationHistory.rejectedDonationHistory.length;
}

document.getElementById("request-history-sidebar-1").addEventListener('click',showRequestHistoryPage);
document.getElementById("request-history-sidebar-2").addEventListener('click',showRequestHistoryPage);

function showRequestHistoryPage(){
    makeAllSideBarItemsColorLightWhite();
    const requestHistoryContainer1 = document.getElementById("request-history-sidebar-1");
    requestHistoryContainer1.style.color = "white";
    const requestHistoryContainer2 = document.getElementById("request-history-sidebar-2");
    requestHistoryContainer2.style.color = "white";
    makeAllContentContainerToDisplayNone();
    const requestHistoryContentContainer = document.getElementById("request-history-container");
    requestHistoryContentContainer.style.display = "block";
    closeSideBar();
    getRequestHistoryFromBackend();
}

document.getElementById("approve-donation-sidebar-1").addEventListener('click',showApproveDonationPage);
document.getElementById("approve-donation-sidebar-2").addEventListener('click',showApproveDonationPage);

function showApproveDonationPage(){
    makeAllSideBarItemsColorLightWhite();
    const approveDonationContainer = document.getElementById("approve-donation-sidebar-1");
    approveDonationContainer.style.color = "white";
    const approveDonationContainer2 = document.getElementById("approve-donation-sidebar-2");
    approveDonationContainer2.style.color = "white";
    makeAllContentContainerToDisplayNone();
    const approveDonationContentContainer = document.getElementById("approve-donation-container");
    approveDonationContentContainer.style.display = "block";
    closeSideBar();
    getDonationListFromBackend();
}

async function getDonationListFromBackend(){
    try{
        const result = await getPendingDonationsForAllRequestOfUser();
        if(result.status === "success"){
            donationListForRequestLength = result.data.length;
            if(result.data.length == 0){
                showNoDonationListForRequestMessage();
            }
            else{
                addDonationListForRequestToTableDOM(result.data)
                addDonationListForRequestToCardDOM(result.data)
            }
            
        }
        else if(result.status === "error"){
            if(result.errorCode === 401 || result.errorCode === 403 || result.errorCode === 404){
                loginAgain();
            }
            else{
                showErrorToast('Please refresh the page');
                console.log(result.data);
            }
        }
    }
    catch(error){
        showErrorToast('Please refresh the page');
        console.log(error);
    }
}

function showNoDonationListForRequestMessage(){
    const tableContainer = document.getElementById('approve-donation-table');
    tableContainer.style.display = 'none';
    const cardContainer = document.getElementsByClassName('approve-donation-card-container')[0];
    cardContainer.style.display = 'none';
    const noDonationMessage = document.getElementById('approve-donation-error-container');
    noDonationMessage.style.display = 'block';
}

function addDonationListForRequestToTableDOM(donationListForRequestList){
    const tableBody = document.getElementById('approve-donation-table-body');
    tableBody.innerHTML = ''; 
    donationListForRequestList.forEach(item => {
        const row = document.createElement('tr');
        row.setAttribute('data-request-id', item.requestId);
        row.setAttribute('data-donation-id', item.donationId);
        row.innerHTML = `
            <td>${item.donorName}</td>
            <td>${item.bloodType}</td>
            <td>${item.rhFactor}</td>
            <td>${item.unitsDonated}</td>
            <td>${new Date(item.donateDateTime).toLocaleString()}</td>
            <td>
                <div>
                    <button class="approve-donation-button"  data-request-id = "${item.requestId}" data-donation-id="${item.donationId}">Approve</button>
                    <button class="reject-donation-button"  data-request-id = "${item.requestId}"  data-donation-id="${item.donationId}">Reject</button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
    document.querySelectorAll('.approve-donation-button').forEach(button => {
        button.addEventListener('click', approveDonationToBackend);
    });

    document.querySelectorAll('.reject-donation-button').forEach(button => {
        button.addEventListener('click', (event)=>{
           currentRequestId = event.target.getAttribute('data-request-id')
           currentDonationId =  event.target.getAttribute('data-donation-id');
           openRejectDialogBox();
        })
        
    });

}

function  addDonationListForRequestToCardDOM(donationList){
    const cardContainer = document.getElementsByClassName('approve-donation-card-container')[0];
    cardContainer.innerHTML = ''; 
    donationList.forEach(item => {
        console.log(item); 
        const card = document.createElement('div');
        card.classList.add('donateRequest-card');
        card.setAttribute('data-request-id', item.requestId);
        card.setAttribute('data-donation-id', item.donationId);
        card.innerHTML = `
            <div class="approveDonation-card-item-container">
                <div>Donor Name :</div>
                <div>${item.donorName}</div>
            </div>
            <div class="approveDonation-card-item-container">
                <div>Blood Type :</div>
                <div>${item.bloodType}</div>
            </div>
            <div class="donateRequest-card-item-container">
                <div>Rh Factor:</div>
                <div>${item.rhFactor}</div>
            </div>
            <div class="donateRequest-card-item-container">
                <div>Units Donated :</div>
                <div>${item.unitsDonated}</div>
            </div>
            <div class="donateRequest-card-item-container">
                <div>Donate DateTime :</div>
                <div>${new Date(item.donateDateTime).toLocaleString()}</div>
            </div>
            <div class="approve-donation-btn-container">
                <button class="approve-donation-button" data-request-id = "${item.requestId}"    data-donation-id="${item.donationId}">Accept</button>
                <button class="reject-donation-button"  data-request-id = "${item.requestId}" data-donation-id="${item.donationId}">Reject</button>
            </div>
        `;
        cardContainer.appendChild(card);
    });
    document.querySelectorAll('.approve-donation-button').forEach(button => {
        button.addEventListener('click', approveDonationToBackend);
    });
    document.querySelectorAll('.reject-donation-button').forEach(button => {
        button.addEventListener('click', (event)=>{
           currentRequestId = event.target.getAttribute('data-request-id')
           currentDonationId =  event.target.getAttribute('data-donation-id');
           console.log(currentDonationId , currentRequestId);
           openRejectDialogBox();
        })
    });
}

async function approveDonationToBackend(event){
    const donationId = event.target.getAttribute('data-donation-id');
    try{
       const result = await approveDonation(donationId);
       if(result.status === "success"){
            showSuccessToast('Donation approved successfully');
             const card = document.querySelector(`.donateRequest-card[data-donation-id="${donationId}"]`);
             card.remove();
             const row = document.querySelector(`tr[data-donation-id="${donationId}"]`);
             row.remove();
             donationListForRequestLength--;
            if(donationListForRequestLength === 0){
                showNoDonationListForRequestMessage();
             }
       }
       else if(result.status === "error"){
            if(result.errorCode === 401 || result.errorCode === 403){
                loginAgain();
            }
            else{
                showErrorToast('Error in approving the donation');
                console.log(result.data);
            }
       }
    }
    catch(error){
        showErrorToast('Error in approving the donation');
        console.log(error);
    }
}

function closeSideBar(){
    const sidebarContainer = document.getElementsByClassName("sidebar-container-2"); 
    const navLinks = document.getElementsByClassName('menu-container-hamburger');
    var hamburger = document.getElementById('hamburger');
    navLinks[0].classList.remove('show');
    hamburger.innerHTML = '&#9776;'; 
    sidebarContainer[0].style.display = 'none';
}

document.getElementById('hamburger').addEventListener('click',showSideBar);

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

document.getElementById('request-submit-btn').addEventListener('click', makeRequest);

async function makeRequest(){
    const requestDetails = getRequestDetails();
    if(validRequestDetails(requestDetails)){
        const newRequestDetails = getNewRequestDetails(requestDetails);
        try{
            const result = await addRequest(newRequestDetails);
            if(result.status === 'success'){
                showSuccessToast('Request added successfully');
                resetRequestForm();
            }
            else if(result.status === 'error'){
                if(result.errorCode === 401 || result.errorCode === 403){
                   loginAgain();
                }
                else{
                    showErrorToast('Request Failed. Please try again');
                    resetRequestForm();
                }
            }
            
        }
        catch(error){
           showErrorToast('Request Failed. Please try again')
            console.log(error);
        }
    }
}

function loginAgain(){
    showErrorToast('Please login again');
    window.sessionStorage.clear();
    window.location.replace ('login.html');
}

function resetRequestForm(){
    document.getElementById('request-form-patientName').value = '';
    document.getElementById('request-form-bloodType').value = '';
    document.getElementById('request-form-rhFactor').value = '';
    document.getElementById('request-form-unitsNeeded').value = '';
    document.getElementById('request-form-urgency').value = '';
    document.getElementById('request-form-contactNumber').value = '';
    document.getElementById('request-form-description').value = '';
    document.getElementById('request-form-hospitalName').value = '';
    document.getElementById('request-form-hospitalAddress').value = '';
    document.getElementById('request-form-doctorName').value = '';
    document.getElementById('request-form-doctorNumber').value = '';
    makeInputBoxBlackColor('request-form-patientName');
    makeInputBoxBlackColor('request-form-bloodType');
    makeInputBoxBlackColor('request-form-rhFactor');
    makeInputBoxBlackColor('request-form-unitsNeeded');
    makeInputBoxBlackColor('request-form-urgency');
    makeInputBoxBlackColor('request-form-contactNumber');
    makeInputBoxBlackColor('request-form-description');
    makeInputBoxBlackColor('request-form-hospitalName');
    makeInputBoxBlackColor('request-form-hospitalAddress');
    makeInputBoxBlackColor('request-form-doctorName');
    makeInputBoxBlackColor('request-form-doctorNumber');
    makeErrorContainerDisplayNone('patientName-error');
    makeErrorContainerDisplayNone('bloodType-error');
    makeErrorContainerDisplayNone('rhFactor-error');
    makeErrorContainerDisplayNone('unitsNeeded-error');
    makeErrorContainerDisplayNone('urgency-error');
    makeErrorContainerDisplayNone('contactNumber-error');
    makeErrorContainerDisplayNone('description-error');
    makeErrorContainerDisplayNone('hospitalName-error');
    makeErrorContainerDisplayNone('hospitalAddress-error');
    makeErrorContainerDisplayNone('doctorName-error');
    makeErrorContainerDisplayNone('doctorNumber-error');

}

function getNewRequestDetails(requestDetails){
    const currentDateTime = new Date();
    let newRequestDetails = {
        UserId  :  sessionStorage.getItem('userId'),
        PatientName : requestDetails.patientName,
        BloodType : requestDetails.bloodType,
        RhFactor : requestDetails.rhFactor,
        UnitsNeeded : requestDetails.unitsNeeded,
        Urgency : requestDetails.urgency,
        RequestedContactNumber : requestDetails.contactNumber,
        RequestedDateTime : currentDateTime,
        Description : requestDetails.description,
        HospitalName : requestDetails.hospitalName,
        HospitalAddress : requestDetails.hospitalAddress,
        DoctorName : requestDetails.doctorName,
        DoctorContactNumber : requestDetails.doctorNumber
    }
    return newRequestDetails;
}

function getRequestDetails(){
    let requestDetails = {
        patientName : document.getElementById('request-form-patientName').value,
        bloodType : document.getElementById('request-form-bloodType').value,
        rhFactor: document.getElementById('request-form-rhFactor').value,
        unitsNeeded: document.getElementById('request-form-unitsNeeded').value,
        urgency: document.getElementById('request-form-urgency').value,
        contactNumber:document.getElementById('request-form-contactNumber').value,
        description : document.getElementById('request-form-description').value,
        hospitalName : document.getElementById('request-form-hospitalName').value,
        hospitalAddress : document.getElementById('request-form-hospitalAddress').value,
        doctorName : document.getElementById('request-form-doctorName').value,
        doctorNumber : document.getElementById('request-form-doctorNumber').value
    }
    return requestDetails;
}


function validRequestDetails(requestDetails){
   const isValidPatientName = validatePatientName(requestDetails.patientName);
   const isValidBloodType = validateBloodType(requestDetails.bloodType);
   const isValidRhFactor = validateRhFactor(requestDetails.rhFactor);
   const isValidUnitsNeeded = validateUnitsNeeded(requestDetails.unitsNeeded);
   const isValidUrgency = validateUrgency(requestDetails.urgency);
   const isValidContactNumber = validateContactNumber(requestDetails.contactNumber);
   const isValidDescription = validateDescription(requestDetails.description);
   const isValidHospitalName = validateHospitalName(requestDetails.hospitalName);
   const isValidHospitalAddress = validateHospitalAddress(requestDetails.hospitalAddress);
   const isValidDoctorName = validateDoctorName(requestDetails.doctorName);
   const isValidDoctorNumber = validateDoctorNumber(requestDetails.doctorNumber);

   return (isValidPatientName && isValidBloodType && isValidHospitalAddress && isValidRhFactor && isValidContactNumber &&
    isValidDescription && isValidHospitalName && isValidHospitalAddress && isValidDoctorName && isValidDoctorNumber &&
    isValidUnitsNeeded && isValidUrgency);
}

function validatePatientName(patientName){
    if(patientName === undefined || patientName.length === 0){
        makeInputBoxRedColor('request-form-patientName');
        showErrorMessage('Please enter the patient name' , 'patientName-error');
        return false;
    }
    else{
        makeInputBoxBlackColor('request-form-patientName'); 
        makeErrorContainerDisplayNone('patientName-error');
        return true;
    }
}

function validateBloodType(bloodType){
    if(bloodType === undefined || bloodType.length === 0){
        makeInputBoxRedColor('request-form-bloodType');
        showErrorMessage('Please select the blood type' , 'bloodType-error');
        return false;
    }
    else{
        makeInputBoxBlackColor('request-form-bloodType'); 
        makeErrorContainerDisplayNone('bloodType-error');
        return true;
    }
}

function validateRhFactor(rhFactor){
    if(rhFactor === undefined || rhFactor.length === 0){
        makeInputBoxRedColor('request-form-rhFactor');
        showErrorMessage('Please select the rh factor' , 'rhFactor-error');
        return false;
    }
    else{
        makeInputBoxBlackColor('request-form-rhFactor'); 
        makeErrorContainerDisplayNone('rhFactor-error');
        return true;
    }
}

function validateUnitsNeeded(unitsNeeded) {
    if(unitsNeeded === undefined || unitsNeeded.length === 0){
        makeInputBoxRedColor('request-form-unitsNeeded');
        showErrorMessage('Please enter the units needed' , 'unitsNeeded-error');
        return false;
    }
    else{
        makeInputBoxBlackColor('request-form-unitsNeeded'); 
        makeErrorContainerDisplayNone('unitsNeeded-error');
        return true;
    }
}

function validateUrgency(urgency){
    if(urgency === undefined || urgency.length === 0){
        makeInputBoxRedColor('request-form-urgency');
        showErrorMessage('Please select the urgency' , 'urgency-error');
        return false;
    }
    else{
        makeInputBoxBlackColor('request-form-urgency'); 
        makeErrorContainerDisplayNone('urgency-error');
        return true;
    }
}

function validateContactNumber(contactNumber){
    if(contactNumber === undefined || contactNumber.length === 0){
        makeInputBoxRedColor('request-form-contactNumber');
        showErrorMessage('Please enter the contact number' , 'contactNumber-error');
        return false;
    }
    else if(contactNumber.length !== 10){
        makeInputBoxRedColor('request-form-contactNumber');
        showErrorMessage('Please enter a valid contact number' , 'contactNumber-error');
        return false;
    }
    else{
        makeInputBoxBlackColor('request-form-contactNumber'); 
        makeErrorContainerDisplayNone('contactNumber-error');
        return true;
    }
}

function validateDescription(description){
    if(description === undefined || description.length === 0){
        makeInputBoxRedColor('request-form-description');
        showErrorMessage('Please enter the description' , 'description-error');
        return false;
    }
    else{
        makeInputBoxBlackColor('request-form-description'); 
        makeErrorContainerDisplayNone('description-error');
        return true;
    }
}

function validateHospitalName(hospitalName){
    if(hospitalName === undefined || hospitalName.length === 0){
        makeInputBoxRedColor('request-form-hospitalName');
        showErrorMessage('Please enter the hospital name' , 'hospitalName-error');
        return false;
    }
    else{
        makeInputBoxBlackColor('request-form-hospitalName'); 
        makeErrorContainerDisplayNone('hospitalName-error');
        return true;
    }
}

function validateHospitalAddress(hospitalAddress){
    if(hospitalAddress === undefined || hospitalAddress.length === 0){
        makeInputBoxRedColor('request-form-hospitalAddress');
        showErrorMessage('Please enter the hospital address' , 'hospitalAddress-error');
        return false;
    }
    else{
        makeInputBoxBlackColor('request-form-hospitalAddress'); 
        makeErrorContainerDisplayNone('hospitalAddress-error');
        return true;
    }
}

function validateDoctorName(doctorName){
    if(doctorName === undefined || doctorName.length === 0){
        makeInputBoxRedColor('request-form-doctorName');
        showErrorMessage('Please enter the doctor name' , 'doctorName-error');
        return false;
    }
    else{
        makeInputBoxBlackColor('request-form-doctorName'); 
        makeErrorContainerDisplayNone('doctorName-error');
        return true;
    }
}

function validateDoctorNumber(doctorNumber){
    if(doctorNumber === undefined || doctorNumber.length === 0){
        makeInputBoxRedColor('request-form-doctorNumber');
        showErrorMessage('Please enter the doctor number' , 'doctorNumber-error');
        return false;
    }
    else if(doctorNumber.length !== 10){
        makeInputBoxRedColor('request-form-doctorNumber');
        showErrorMessage('Please enter a valid contact number' , 'doctorNumber-error');
        return false;
    }
    else{
        makeInputBoxBlackColor('request-form-doctorNumber'); 
        makeErrorContainerDisplayNone('doctorNumber-error');
        return true;
    }
}

document.getElementById('dialogForm-donate-btn').addEventListener('click', donateCenter);

async function donateCenter(){
    let donateDetails = getDonationDetails();
    if(validDonateDetails(donateDetails)){
        closeDonateToCenterDialogForm();
        let newDonateDetails = getNewDonateToCenterDetails(donateDetails);
        try{
            const result = await addDonationToCenter(newDonateDetails);
            if(result.status === 'success'){
                showSuccessToast("Donation added successfully")
            }
            else if(result.status === 'error'){
                if(result.errorCode === 401 || result.errorCode === 403){
                   loginAgain();
                }
                else{
                    showErrorToast('Donation Failed. Please try again');
                }
            }

        }
        catch(error){
            showErrorToast('Donation Failed.Please try again');
        }
    }
}

function getNewDonateToCenterDetails(donateDetails){
    let newDonateDetails = {
        userId : sessionStorage.getItem('userId'),
        centerId : currentDonationCenterId,
        bloodType : donateDetails.bloodType,
        rhFactor : donateDetails.rhFactor,
        unitsDonated : donateDetails.unitsToDonate.toString(),
        donateDateTime : donateDetails.dateTime,
    }
    return newDonateDetails;
}

function getDonationDetails(){
    let donationDetails = {
        bloodType : document.getElementById('donate-bloodType').value,
        rhFactor : document.getElementById('donate-rhFactor').value,
        unitsToDonate : document.getElementById('donate-unitsToDonate').value,
        dateTime : document.getElementById('donate-dateTime').value,
    }
    return donationDetails;
}

function validDonateDetails(donateDetails){
    const isValidBloodType = validateDonateToCenterBloodType(donateDetails.bloodType);
    const isValidRhFactor = validateDonateToCenterRhFactor(donateDetails.rhFactor);
    const isValidUnitsToDonate = validateDonateToCenterUnitsToDonate(donateDetails.unitsToDonate);
    const isValidDateTime = validateDonateToCenterDateTime(donateDetails.dateTime);

    return (isValidBloodType && isValidRhFactor && isValidUnitsToDonate && isValidDateTime);
}

function validateDonateToCenterBloodType(bloodType){
    if(bloodType === undefined || bloodType.length === 0){
        makeInputBoxRedColor('donate-bloodType');
        showErrorMessage('Please select the blood type' , 'donate-bloodType-error');
        return false;
    }
    else{
        makeInputBoxBlackColor('donate-bloodType'); 
        makeErrorContainerDisplayNone('donate-bloodType-error');
        return true;
    }
}

function validateDonateToCenterRhFactor(rhFactor){
    if(rhFactor === undefined || rhFactor.length === 0){
        makeInputBoxRedColor('donate-rhFactor');
        showErrorMessage('Please select the rh factor' , 'donate-rhFactor-error');
        return false;
    }
    else{
        makeInputBoxBlackColor('donate-rhFactor'); 
        makeErrorContainerDisplayNone('donate-rhFactor-error');
        return true;
    }
}


function validateDonateToCenterUnitsToDonate(unitsToDonate){
    if(unitsToDonate === undefined || unitsToDonate.length === 0){
        makeInputBoxRedColor('donate-unitsToDonate');
        showErrorMessage('Please enter the units' , 'donate-unitsToDonate-error');
        return false;
    }
    else{
        makeInputBoxBlackColor('donate-unitsToDonate'); 
        makeErrorContainerDisplayNone('donate-unitsToDonate-error');
        return true;
    }
}

function validateDonateToCenterDateTime(dateTime){
    if(dateTime === undefined || dateTime.length === 0){
        makeInputBoxRedColor('donate-dateTime');
        showErrorMessage('Please enter the date and time' , 'donate-dateTime-error');
        return false;
    }
    else{
        makeInputBoxBlackColor('donate-dateTime'); 
        makeErrorContainerDisplayNone('donate-dateTime-error');
        return true;
    }
}
    


document.getElementById("close-dialog-btn").addEventListener("click", closeDonateToCenterDialogForm);


function closeDonateToCenterDialogForm(){
    resetDonateToCenterForm();
    var modal = document.getElementById("donate-modal");
    modal.style.display = "none";
}

function resetDonateToCenterForm(){
    document.getElementById('donate-bloodType').value = '';
    document.getElementById('donate-rhFactor').value = '';
    document.getElementById('donate-unitsToDonate').value = '';
    document.getElementById('donate-dateTime').value = '';
    makeInputBoxBlackColor('donate-bloodType');
    makeInputBoxBlackColor('donate-rhFactor');
    makeInputBoxBlackColor('donate-unitsToDonate');
    makeInputBoxBlackColor('donate-dateTime');
    makeErrorContainerDisplayNone('donate-bloodType-error');
    makeErrorContainerDisplayNone('donate-rhFactor-error');
    makeErrorContainerDisplayNone('donate-unitsToDonate-error');
    makeErrorContainerDisplayNone('donate-dateTime-error');
}

function openDonateToCenterDialogForm(){
    var modal = document.getElementById("donate-modal");
    modal.style.display = "flex";
    setDateTimePicker();
}

function setDateTimePicker(){
    const dateTimeInput = document.getElementById('donate-dateTime');
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const minDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
    dateTimeInput.min = minDateTime;
}

function openRejectDialogBox(){
    var modal = document.getElementById("approve-donation-modal");
    modal.style.display = "flex";
}

document.getElementById('approvalDialogForm-close-btn').addEventListener('click' , closeRejectDialogBox);

function closeRejectDialogBox(){
    document.getElementById('donation-reject-reason').value = "";
    var modal = document.getElementById("approve-donation-modal");
    modal.style.display = "none";
}


function makeAllDonateHistoryCardBackGroundWhite(){
    const scheduleCard = document.getElementById("schedule-donation-history-card");
    scheduleCard.style.backgroundColor = "white";
    const approvedCard = document.getElementById("approved-donation-history-card");
    approvedCard.style.backgroundColor = "white";
    const rejectedCard = document.getElementById("rejected-donation-history-card");
    rejectedCard.style.backgroundColor = "white";
}

function makeAllRequestHistoryCardBackGroundWhite(){
    const scheduleCard = document.getElementById("schedule-request-history-card");
    scheduleCard.style.backgroundColor = "white";
    const approvedCard = document.getElementById("approved-request-history-card");
    approvedCard.style.backgroundColor = "white";
    const rejectedCard = document.getElementById("rejected-request-history-card");
    rejectedCard.style.backgroundColor = "white";
}

function makeAllDonationHistoryTableCardToDisplayNone(){
    const scheduleTable = document.getElementById("donation-history-schedule-table");
    scheduleTable.style.display = "none";
    const approvedTable = document.getElementById("donation-history-approved-table");
    approvedTable.style.display = "none";
    const rejectedTable = document.getElementById("donation-history-rejected-table");
    rejectedTable.style.display = "none";
    const scheduleCard = document.getElementById("donation-history-schedule-card-container");
    scheduleCard.style.display = "none";
    const approvedCard = document.getElementById("donation-history-approved-card-container");
    approvedCard.style.display = "none";
    const rejectedCard = document.getElementById("donation-history-rejected-card-container");
    rejectedCard.style.display = "none";
}

function makeAllRequestHistoryTableCardToDisplayNone(){
    const scheduleTable = document.getElementById("request-history-schedule-table");
    scheduleTable.style.display = "none";
    const approvedTable = document.getElementById("request-history-approved-table");
    approvedTable.style.display = "none";
    const rejectedTable = document.getElementById("request-history-rejected-table");
    rejectedTable.style.display = "none";
    const scheduleCard = document.getElementById("request-history-schedule-card-container");
    scheduleCard.style.display = "none";
    const approvedCard = document.getElementById("request-history-approved-card-container");
    approvedCard.style.display = "none";
    const rejectedCard = document.getElementById("request-history-rejected-card-container");
    rejectedCard.style.display = "none";
}
function getScheduleDonationHistory(){
    makeAllDonateHistoryCardBackGroundWhite();
    const scheduleCard = document.getElementById("schedule-donation-history-card");
    scheduleCard.style.backgroundColor = 'rgba(0, 122, 204)';
    makeAllDonationHistoryTableCardToDisplayNone();
    const scheduleTable = document.getElementById("donation-history-schedule-table");
    scheduleTable.style.display = 'block'
    const scheduleCardContainer = document.getElementById("donation-history-schedule-card-container");
    scheduleCardContainer.style.display = 'flex';
    getScheduledDonationHistoryData();
}

async function getScheduledDonationHistoryData(){
    if(!donationHistory.scheduledDonationHistory){
        showErrorToast("Please Refresh the page");
        return;
    }
    if(donationHistory.scheduledDonationHistory.length == 0){
        showMessageForNoScheduledDonationHistory();
    }
    else{
        let scheduledDonationHistoryList = donationHistory.scheduledDonationHistory;
        makeMessageForNoScheduledDonationHistoryToDisplayNone();
        addScheduledDonationHistoryToTableDOM(scheduledDonationHistoryList);
        addScheduledDonationHistoryToCardDOM(scheduledDonationHistoryList);
    }
}

function makeMessageForNoScheduledDonationHistoryToDisplayNone(){
   const messageContainer = document.getElementById('no-schedule-donation-history-message');
    messageContainer.style.display = 'none';
    const cardContainer = document.getElementById('donation-history-schedule-card-container');
    cardContainer.style.display = 'flex';
    const tableContainer = document.getElementById('donation-history-schedule-table');
    tableContainer.style.display = 'block';
    const scheduleddonationHistoryContainer = document.getElementById('no-approved-donation-history-message');
    scheduleddonationHistoryContainer.style.display = 'none';
    const rejecteddonationHistoryContainer = document.getElementById('no-rejected-donation-history-message');
    rejecteddonationHistoryContainer.style.display = 'none';

}

function showMessageForNoScheduledDonationHistory(){
    const cardContainer = document.getElementById('donation-history-schedule-card-container');
    cardContainer.style.display = 'none';
    const tableContainer = document.getElementById('donation-history-schedule-table');
    tableContainer.style.display = 'none';
    const scheduledmessageContainer = document.getElementById('no-schedule-donation-history-message');
    scheduledmessageContainer.style.display = 'block';
    const scheduleddonationHistoryContainer = document.getElementById('no-approved-donation-history-message');
    scheduleddonationHistoryContainer.style.display = 'none';
    const rejecteddonationHistoryContainer = document.getElementById('no-rejected-donation-history-message');
    rejecteddonationHistoryContainer.style.display = 'none';
}

function addScheduledDonationHistoryToTableDOM(scheduledDonationHistoryList){
    const tableBody = document.getElementById('schedule-donation-history-table-body');
    tableBody.innerHTML = ''; 
    scheduledDonationHistoryList.forEach(item => {
        const row = document.createElement('tr');
        row.setAttribute('data-donation-id', item.donationId);
        row.innerHTML = `
            <td>${item.bloodType}</td>
            <td>${item.rhFactor}</td>
            <td>${item.donateUnits}</td>
            <td>${item.donationType}</td>
            <td>${new Date(item.donationDateTime).toLocaleString()}</td>
        `;
        tableBody.appendChild(row);
    });

}

function addScheduledDonationHistoryToCardDOM(scheduledDonationHistoryList){
    const cardContainer = document.getElementById('donation-history-schedule-card-container');
    cardContainer.innerHTML = ''; 
    scheduledDonationHistoryList.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('donate-history-card');
        card.setAttribute('data-donation-id', item.donationId);
        card.innerHTML = `
            <div class="donateHistory-card-item-container">
                <div>Blood Type :</div>
                <div>${item.bloodType}</div>
            </div>
            <div class="donateHistory-card-item-container">
                <div>Rh Factor :</div>
                <div>${item.rhFactor}</div>
            </div>
            <div class="donateHistory-card-item-container">
                <div>Donated Units :</div>
                <div>${item.donateUnits}</div>
            </div>
            <div class="donateHistory-card-item-container">
                <div>Donation Type :</div>
                <div>${item.donationType}</div>
            </div>
            <div class="donateHistory-card-item-container">
                <div>Donation DateTime :</div>
                <div>${new Date(item.donationDateTime).toLocaleString()}</div>
            </div>
        `;
        cardContainer.appendChild(card);
    });
}

function getScheduleRequestHistory(){
    makeAllRequestHistoryCardBackGroundWhite();
    const scheduleCard = document.getElementById("schedule-request-history-card");
    scheduleCard.style.backgroundColor = 'rgba(0, 122, 204)';
    makeAllRequestHistoryTableCardToDisplayNone();
    const scheduleTable = document.getElementById("request-history-schedule-table");
    scheduleTable.style.display = 'block'
    const scheduleCardContainer = document.getElementById("request-history-schedule-card-container");
    scheduleCardContainer.style.display = 'flex'
    getScheduleRequestHistoryData();
}

function getScheduleRequestHistoryData(){
    if(!requestHistory.scheduledRequestHistoryList){
        showErrorToast("Please Refresh the page");
        return;
    }
    if(requestHistory.scheduledRequestHistoryList.length == 0){
        showMessageForNoScheduleRequestHistory();
    }
    else{
        let scheduleRequestHistoryList = requestHistory.scheduledRequestHistoryList;
       makeMessageForNoScheduleRequestHistoryToDisplayNone();
        addScheduleRequestHistoryToTableDOM(scheduleRequestHistoryList);
        addScheduleRequestHistoryToCardDOM(scheduleRequestHistoryList);
    }
}

function showMessageForNoScheduleRequestHistory(){
    const cardContainer = document.getElementById('request-history-schedule-card-container');
    cardContainer.style.display = 'none';
    const tableContainer = document.getElementById('request-history-schedule-table');
    tableContainer.style.display = 'none';
    const schedulemessageContainer = document.getElementById('no-schedule-request-history-message');
    schedulemessageContainer.style.display = 'block';
    const scheduleddonationHistoryContainer = document.getElementById('no-approved-request-history-message');
    scheduleddonationHistoryContainer.style.display = 'none';
    const rejecteddonationHistoryContainer = document.getElementById('no-rejected-request-history-message');
    rejecteddonationHistoryContainer.style.display = 'none';
}

function makeMessageForNoScheduleRequestHistoryToDisplayNone(){
    const messageContainer = document.getElementById('no-schedule-request-history-message');
    messageContainer.style.display = 'none';
    const cardContainer = document.getElementById('request-history-schedule-card-container');
    cardContainer.style.display = 'flex';
    const tableContainer = document.getElementById('request-history-schedule-table');
    tableContainer.style.display = 'block';
    const scheduleddonationHistoryContainer = document.getElementById('no-approved-request-history-message');
    scheduleddonationHistoryContainer.style.display = 'none';
    const rejecteddonationHistoryContainer = document.getElementById('no-rejected-request-history-message');
    rejecteddonationHistoryContainer.style.display = 'none';
}

function addScheduleRequestHistoryToTableDOM(scheduleRequestHistoryList){
    const tableBody = document.getElementById('schedule-request-history-table-body');
    tableBody.innerHTML = ''; 
    scheduleRequestHistoryList.forEach(item => {
        const row = document.createElement('tr');
        row.setAttribute('data-request-id', item.requestId);
        row.innerHTML = `
            <td>${item.patientName}</td>
            <td>${item.bloodType}</td>
            <td>${item.rhFactor}</td>
            <td>${item.unitsNeeded}</td>
            <td>${item.contactNumber}</td>
            <td>${item.hospitalName}</td>
            <td>${item.hospitalAddress}</td>
            <td>${item.doctorName}</td>
            <td>${item.doctorContactNumber}</td>
            <td>${new Date(item.requestDateTime).toLocaleString()}</td>
        `;
        tableBody.appendChild(row);
    });
}

function addScheduleRequestHistoryToCardDOM(scheduleRequestHistoryList){
    const cardContainer = document.getElementById('request-history-schedule-card-container');
    cardContainer.innerHTML = ''; 
    scheduleRequestHistoryList.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('donate-history-card');
        card.setAttribute('data-request-id', item.requestId);
        card.innerHTML = `
            <div class="donateHistory-card-item-container">
                <div>Patient Name :</div>
                <div>${item.patientName}</div>
            </div>
            <div class="donateHistory-card-item-container">
                <div>Blood Type :</div>
                <div>${item.bloodType}</div>
            </div>
            <div class="donateHistory-card-item-container">
                <div>Rh Factor :</div>
                <div>${item.rhFactor}</div>
            </div>
            <div class="donateHistory-card-item-container">
                 <div>Units Needed :</div>
                <div>${item.unitsNeeded}</div>
            </div>
            <div class="donateHistory-card-item-container">
                <div>Contact Number :</div>
                <div>${item.contactNumber}</div>
             </div>
            <div class="donateHistory-card-item-container">
                <div>Hospital Name :</div>
                <div>${item.hospitalName}</div>
             </div>
            <div class="donateHistory-card-item-container">
                <div>Hospital Address :</div>
                <div>${item.hospitalAddress}</div>
             </div>
            <div class="donateHistory-card-item-container">
                <div>Doctor Name :</div>
                <div>${item.doctorName}</div>
            </div>
            <div class="donateHistory-card-item-container">
                 <div>Doctor Contact Number :</div>
                <div>${item.doctorContactNumber}</div>
            </div>
            <div class="donateHistory-card-item-container">
                <div>Request DateTime :</div>
                <div>${new Date(item.requestDateTime).toLocaleString()}</div>
            </div>
            `
        cardContainer.appendChild(card);
    });
}
function getApprovedDonationHistory(){
    makeAllDonateHistoryCardBackGroundWhite();
    const approvedCard = document.getElementById("approved-donation-history-card");
    approvedCard.style.backgroundColor = 'rgba(0, 128, 0)';
    makeAllDonationHistoryTableCardToDisplayNone();
    const approvedTable = document.getElementById("donation-history-approved-table");
    approvedTable.style.display = 'block'
    const approvedCardContainer = document.getElementById("donation-history-approved-card-container");
    approvedCardContainer.style.display = 'flex'
    getApprovedDonationHistoryData();
}

function getApprovedDonationHistoryData(){
    if(!donationHistory.approvedDonationHistory){
        showErrorToast("Please Refresh the page");
        return;
    }
    if(donationHistory.approvedDonationHistory.length == 0){
        showMessageForNoApprovedDonationHistory();
    }
    else{
        let approvedDonationHistoryList = donationHistory.approvedDonationHistory;
        makeMessageForNoApprovedDonationHistoryToDisplayNone();
        addApprovedDonationHistoryToTableDOM(approvedDonationHistoryList);
        addApprovedDonationHistoryToCardDOM(approvedDonationHistoryList);
    }
}

function  showMessageForNoApprovedDonationHistory(){
    const cardContainer = document.getElementById('donation-history-approved-card-container');
    cardContainer.style.display = 'none';
    const tableContainer = document.getElementById('donation-history-approved-table');
    tableContainer.style.display = 'none';
    const scheduledmessageContainer = document.getElementById('no-schedule-donation-history-message');
    scheduledmessageContainer.style.display = 'none';
    const scheduleddonationHistoryContainer = document.getElementById('no-approved-donation-history-message');
    scheduleddonationHistoryContainer.style.display = 'block';
    const rejecteddonationHistoryContainer = document.getElementById('no-rejected-donation-history-message');
    rejecteddonationHistoryContainer.style.display = 'none';
}

function  makeMessageForNoApprovedDonationHistoryToDisplayNone(){
    const messageContainer = document.getElementById('no-approved-donation-history-message');
    messageContainer.style.display = 'none';
    const cardContainer = document.getElementById('donation-history-approved-card-container');
    cardContainer.style.display = 'flex';
    const tableContainer = document.getElementById('donation-history-approved-table');
    tableContainer.style.display = 'block';
    const scheduleddonationHistoryContainer = document.getElementById('no-schedule-donation-history-message');
    scheduleddonationHistoryContainer.style.display = 'none';
    const rejecteddonationHistoryContainer = document.getElementById('no-rejected-donation-history-message');
    rejecteddonationHistoryContainer.style.display = 'none';
}

function  addApprovedDonationHistoryToTableDOM(approvedDonationHistoryList){
    const tableBody = document.getElementById('approved-donation-history-table-body');
    tableBody.innerHTML = ''; 
    approvedDonationHistoryList.forEach(item => {
        const row = document.createElement('tr');
        row.setAttribute('data-donation-id', item.donationId);
        row.innerHTML = `
            <td>${item.bloodType}</td>
            <td>${item.rhFactor}</td>
            <td>${item.donatedUnits}</td>
            <td>${item.donationType}</td>
            <td>${new Date(item.donatedDateTime).toLocaleString()}</td>
        `;
        tableBody.appendChild(row);
    });
}

function  addApprovedDonationHistoryToCardDOM(approvedDonationHistoryList){
    const cardContainer = document.getElementById('donation-history-approved-card-container');
    cardContainer.innerHTML = ''; 
    approvedDonationHistoryList.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('donate-history-card');
        card.setAttribute('data-donation-id', item.donationId);
        card.innerHTML = `
            <div class="donateHistory-card-item-container">
                <div>Blood Type :</div>
                <div>${item.bloodType}</div>
            </div>
            <div class="donateHistory-card-item-container">
                <div>Rh Factor :</div>
                <div>${item.rhFactor}</div>
            </div>
            <div class="donateHistory-card-item-container">
                <div>Donated Units :</div>
                <div>${item.donatedUnits}</div>
            </div>
            <div class="donateHistory-card-item-container">
                <div>Donation Type :</div>
                <div>${item.donationType}</div>
            </div>
            <div class="donateHistory-card-item-container">
                <div>Donation DateTime :</div>
                <div>${new Date(item.donatedDateTime).toLocaleString()}</div>
            </div>
        `;
        cardContainer.appendChild(card);
    });
}


function getApprovedRequestHistory(){
    makeAllRequestHistoryCardBackGroundWhite();
    const approvedCard = document.getElementById("approved-request-history-card");
    approvedCard.style.backgroundColor = 'rgba(0, 128, 0)';
    makeAllRequestHistoryTableCardToDisplayNone();
    const approvedTable = document.getElementById("request-history-approved-table");
    approvedTable.style.display = 'block'
    const approvedCardContainer = document.getElementById("request-history-approved-card-container");
    approvedCardContainer.style.display = 'flex'
    getApprovedRequestHistoryData();
}

function getApprovedRequestHistoryData(){
     if(!requestHistory.approvedRequestHistoryList){
        showErrorToast("Please Refresh the page");
        return;
    }
    if(requestHistory.approvedRequestHistoryList.length == 0){
        showMessageForNoApprovedRequestHistory();
    }
    else{
        let approvedRequestHistoryList = requestHistory.approvedRequestHistoryList;
        makeMessageForNoApprovedRequestHistoryToDisplayNone();
        addApprovedRequestHistoryToTableDOM(approvedRequestHistoryList);
        addApprovedRequestHistoryToCardDOM(approvedRequestHistoryList);
    }
}

function showMessageForNoApprovedRequestHistory(){
    const cardContainer = document.getElementById('request-history-approved-card-container');
    cardContainer.style.display = 'none';
    const tableContainer = document.getElementById('request-history-approved-table');
    tableContainer.style.display = 'none';
    const scheduledmessageContainer = document.getElementById('no-schedule-request-history-message');
    scheduledmessageContainer.style.display = 'none';
    const scheduleddonationHistoryContainer = document.getElementById('no-approved-request-history-message');
    scheduleddonationHistoryContainer.style.display = 'block';
    const rejectedrequestHistoryContainer = document.getElementById('no-rejected-request-history-message');
    rejectedrequestHistoryContainer.style.display = 'none';
}

function makeMessageForNoApprovedRequestHistoryToDisplayNone(){
    const messageContainer = document.getElementById('no-approved-request-history-message');
    messageContainer.style.display = 'none';
    const cardContainer = document.getElementById('request-history-approved-card-container');
    cardContainer.style.display = 'flex';
    const tableContainer = document.getElementById('request-history-approved-table');
    tableContainer.style.display = 'block';
    const scheduleddonationHistoryContainer = document.getElementById('no-schedule-request-history-message');
    scheduleddonationHistoryContainer.style.display = 'none';
    const rejectedrequestHistoryContainer = document.getElementById('no-rejected-request-history-message');
    rejectedrequestHistoryContainer.style.display = 'none';
}

function  addApprovedRequestHistoryToTableDOM(approvedRequestHistoryList){
    const tableBody = document.getElementById('approved-request-history-table-body');
    tableBody.innerHTML = ''; 
    approvedRequestHistoryList.forEach(item => {
        const row = document.createElement('tr');
        row.setAttribute('data-request-id', item.requestId);
        row.innerHTML = `
            <td>${item.patientName}</td>
            <td>${item.bloodType}</td>
            <td>${item.rhFactor}</td>
            <td>${item.unitsNeeded}</td>
            <td>${item.unitsCollected}</td>
            <td>${item.contactNumber}</td>
            <td>${item.hospitalName}</td>
            <td>${item.hospitalAddress}</td>
            <td>${item.doctorName}</td>
            <td>${new Date(item.requestDateTime).toLocaleString()}</td>
        `;
        tableBody.appendChild(row);
    });
}

function addApprovedRequestHistoryToCardDOM(approvedRequestHistoryList){
    const cardContainer = document.getElementById('request-history-approved-card-container');
    cardContainer.innerHTML = ''; 
    approvedRequestHistoryList.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('request-history-card');
        card.setAttribute('data-request-id', item.requestId);
        card.innerHTML = `
           <div class="donateHistory-card-item-container">
                <div>Patient Name :</div>
                <div>${item.patientName}</div>
            </div>
            <div class="donateHistory-card-item-container">
                <div>Blood Type :</div>
                <div>${item.bloodType}</div>
            </div>
            <div class="donateHistory-card-item-container">
                <div>Rh Factor :</div>
                <div>${item.rhFactor}</div>
            </div>
            <div class="donateHistory-card-item-container">
                 <div>Units Needed :</div>
                <div>${item.unitsNeeded}</div>
            </div>
            <div class="donateHistory-card-item-container">
                 <div>Units Collected :</div>
                 <div>${item.unitsCollected}</div>
             </div>               
            <div class="donateHistory-card-item-container">
                <div>Contact Number :</div>
                <div>${item.contactNumber}</div>
             </div>
            <div class="donateHistory-card-item-container">
                <div>Hospital Name :</div>
                <div>${item.hospitalName}</div>
             </div>
            <div class="donateHistory-card-item-container">
                <div>Hospital Address :</div>
                <div>${item.hospitalAddress}</div>
             </div>
            <div class="donateHistory-card-item-container">
                <div>Doctor Name :</div>
                <div>${item.doctorName}</div>
            </div>
            <div class="donateHistory-card-item-container">
                <div>Request DateTime :</div>
                <div>${new Date(item.requestDateTime).toLocaleString()}</div>
            </div>
            `
            cardContainer.appendChild(card);
    });
}

function getRejectedDonationHistory(){
    makeAllDonateHistoryCardBackGroundWhite();
    const rejectedCard = document.getElementById("rejected-donation-history-card");
    rejectedCard.style.backgroundColor = 'rgba(255, 0, 0)';
    makeAllDonationHistoryTableCardToDisplayNone();
    const rejectedTable = document.getElementById("donation-history-rejected-table");
    rejectedTable.style.display = 'block'
    const rejectedCardContainer = document.getElementById("donation-history-rejected-card-container");
    rejectedCardContainer.style.display = 'flex'
    getRejectedDonationHistoryData();
}

function getRejectedDonationHistoryData(){
    if(!donationHistory.rejectedDonationHistory){
        showErrorToast("Please Refresh the page");
        return;
    }
    if(donationHistory.rejectedDonationHistory.length == 0){
        showMessageForNoRejectedDonationHistory();
    }
    else{
        let rejectedDonationHistoryList = donationHistory.rejectedDonationHistory;
        makeMessageForNoRejectedDonationHistoryToDisplayNone();
        addRejectedDonationHistoryToTableDOM(rejectedDonationHistoryList);
        addRejectedDonationHistoryToCardDOM(rejectedDonationHistoryList);
    }
}

function  showMessageForNoRejectedDonationHistory(){
    const cardContainer = document.getElementById('donation-history-rejected-card-container');
    cardContainer.style.display = 'none';
    const tableContainer = document.getElementById('donation-history-rejected-table');
    tableContainer.style.display = 'none';
    const scheduledmessageContainer = document.getElementById('no-schedule-donation-history-message');
    scheduledmessageContainer.style.display = 'none';
    const scheduleddonationHistoryContainer = document.getElementById('no-approved-donation-history-message');
    scheduleddonationHistoryContainer.style.display = 'none';
    const approveddonationHistoryContainer = document.getElementById('no-rejected-donation-history-message');
    approveddonationHistoryContainer.style.display = 'block';
}

function  makeMessageForNoRejectedDonationHistoryToDisplayNone(){
    const messageContainer = document.getElementById('no-rejected-donation-history-message');
    messageContainer.style.display = 'none';
    const cardContainer = document.getElementById('donation-history-rejected-card-container');
    cardContainer.style.display = 'flex';
    const tableContainer = document.getElementById('donation-history-rejected-table');
    tableContainer.style.display = 'block';
    const scheduleddonationHistoryContainer = document.getElementById('no-schedule-donation-history-message');
    scheduleddonationHistoryContainer.style.display = 'none';
    const approveddonationHistoryContainer = document.getElementById('no-approved-donation-history-message');
    approveddonationHistoryContainer.style.display = 'none';
}

function   addRejectedDonationHistoryToTableDOM(rejectedDonationHistoryList){
    const tableBody = document.getElementById('rejected-donation-history-table-body');
    tableBody.innerHTML = ''; 
    rejectedDonationHistoryList.forEach(item => {
        const row = document.createElement('tr');
        row.setAttribute('data-donation-id', item.donationId);
        row.innerHTML = `
            <td>${item.bloodType}</td>
            <td>${item.rhFactor}</td>
            <td>${item.donateUnits}</td>
            <td>${item.donationType}</td>
            <td>${new Date(item.donateDateTime).toLocaleString()}</td>
            <td>${item.rejectReason}</td>
        `;
        tableBody.appendChild(row);
    }); 
}

function addRejectedDonationHistoryToCardDOM(rejectedDonationHistoryList){
    const cardContainer = document.getElementById('request-history-rejected-card-container');
    cardContainer.innerHTML = ''; 
    rejectedDonationHistoryList.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('donate-history-card');
        card.setAttribute('data-donation-id', item.donationId);
        card.innerHTML = `
            <div class="donateHistory-card-item-container">
                <div>Blood Type :</div>
                <div>${item.bloodType}</div>
            </div>
            <div class="donateHistory-card-item-container">
                <div>Rh Factor :</div>
                <div>${item.rhFactor}</div>
            </div>
            <div class="donateHistory-card-item-container">
                <div>Donated Units :</div>
                <div>${item.donateUnits}</div>
            </div>
            <div class="donateHistory-card-item-container">
                <div>Donation Type :</div>
                <div>${item.donationType}</div>
            </div>
            <div class="donateHistory-card-item-container">
                <div>Donation DateTime :</div>
                <div>${new Date(item.donateDateTime).toLocaleString()}</div>
            </div>
            <div class="donateHistory-card-item-container">
                <div>Reject Reason :</div>
                <div>${item.rejectReason}</div>
            </div>
        `;
        cardContainer.appendChild(card);
    });
}

function getRejectedRequestHistory(){
    makeAllRequestHistoryCardBackGroundWhite();
    const rejectedCard = document.getElementById("rejected-request-history-card");
    rejectedCard.style.backgroundColor = 'rgba(255, 0, 0)';
    makeAllRequestHistoryTableCardToDisplayNone();
    const rejectedTable = document.getElementById("request-history-rejected-table");
    rejectedTable.style.display = 'block'
    const rejectedCardContainer = document.getElementById("request-history-rejected-card-container");
    rejectedCardContainer.style.display = 'flex'
    getRejectedRequestHistoryData();
}

function getRejectedRequestHistoryData(){
    if(!requestHistory.rejectedRequestHistoryList){
        showErrorToast("Please Refresh the page");
        return;
    }
    if(requestHistory.rejectedRequestHistoryList.length == 0){
        showMessageForNoRejectedRequestHistory();
    }
    else{
        let rejectedRequestHistoryList = requestHistory.rejectedRequestHistoryList;
        makeMessageForNoRejectedRequestHistoryToDisplayNone();
        addRejectedRequestHistoryToTableDOM(rejectedRequestHistoryList);
        addRejectedRequestHistoryToCardDOM(rejectedRequestHistoryList);
    }
}

function  addRejectedRequestHistoryToTableDOM(rejectedRequestHistoryList){
    const tableBody = document.getElementById('rejected-request-history-table-body');
    tableBody.innerHTML = ''; 
    rejectedRequestHistoryList.forEach(item => {
        const row = document.createElement('tr');
        row.setAttribute('data-request-id', item.requestId);
        row.innerHTML = `
            <td>${item.patientName}</td>
            <td>${item.bloodType}</td>
            <td>${item.rhFactor}</td>
            <td>${item.unitsNeeded}</td>
            <td>${item.contactNumber}</td>
            <td>${item.hospitalName}</td>
            <td>${item.hospitalAddress}</td>
            <td>${item.doctorName}</td>
            <td>${item.doctorContactNumber}</td>
            <td>${new Date(item.requestDateTime).toLocaleString()}</td>
            <td>${item.rejectReason}</td>
        `;
        tableBody.appendChild(row);
    });
}

function  addRejectedRequestHistoryToCardDOM(rejectedRequestHistoryList){
    const cardContainer = document.getElementById('request-history-rejected-card-container');
    cardContainer.innerHTML = ''; 
    rejectedRequestHistoryList.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('request-history-card');
        card.setAttribute('data-request-id', item.requestId);
        card.innerHTML = `
         <div class="donateHistory-card-item-container">
                <div>Patient Name :</div>
                <div>${item.patientName}</div>
            </div>
            <div class="donateHistory-card-item-container">
                <div>Blood Type :</div>
                <div>${item.bloodType}</div>
            </div>
            <div class="donateHistory-card-item-container">
                <div>Rh Factor :</div>
                <div>${item.rhFactor}</div>
            </div>
            <div class="donateHistory-card-item-container">
                 <div>Units Needed :</div>
                <div>${item.unitsNeeded}</div>
            </div>
            <div class="donateHistory-card-item-container">
                <div>Contact Number :</div>
                <div>${item.contactNumber}</div>
             </div>
            <div class="donateHistory-card-item-container">
                <div>Hospital Name :</div>
                <div>${item.hospitalName}</div>
             </div>
            <div class="donateHistory-card-item-container">
                <div>Hospital Address :</div>
                <div>${item.hospitalAddress}</div>
             </div>
            <div class="donateHistory-card-item-container">
                <div>Doctor Name :</div>
                <div>${item.doctorName}</div>
            </div>
            <div class="donateHistory-card-item-container">
                 <div>Doctor Contact Number :</div>
                <div>${item.doctorContactNumber}</div>
            </div>
            <div class="donateHistory-card-item-container">
                <div>Request DateTime :</div>
                <div>${new Date(item.requestDateTime).toLocaleString()}</div>
            </div>
            <div class="donateHistory-card-item-container">
                <div>Reject Reason :</div>
                <div>${item.rejectReason}</div>
            </div>
            `;
        cardContainer.appendChild(card);
    });
           
}

function  showMessageForNoRejectedRequestHistory(){
    const cardContainer = document.getElementById('request-history-rejected-card-container');
    cardContainer.style.display = 'none';
    const tableContainer = document.getElementById('request-history-rejected-table');
    tableContainer.style.display = 'none';
    const scheduledmessageContainer = document.getElementById('no-schedule-request-history-message');
    scheduledmessageContainer.style.display = 'none';
    const scheduleddonationHistoryContainer = document.getElementById('no-approved-request-history-message');
    scheduleddonationHistoryContainer.style.display = 'none';
    const approveddonationHistoryContainer = document.getElementById('no-rejected-request-history-message');
    approveddonationHistoryContainer.style.display = 'block';
}

function makeMessageForNoRejectedRequestHistoryToDisplayNone(){
    const messageContainer = document.getElementById('no-rejected-request-history-message');
    messageContainer.style.display = 'none';
    const cardContainer = document.getElementById('request-history-rejected-card-container');
    cardContainer.style.display = 'flex';
    const tableContainer = document.getElementById('request-history-rejected-table');
    tableContainer.style.display = 'block';
    const scheduleddonationHistoryContainer = document.getElementById('no-schedule-request-history-message');
    scheduleddonationHistoryContainer.style.display = 'none';
    const approveddonationHistoryContainer = document.getElementById('no-approved-request-history-message');
    approveddonationHistoryContainer.style.display = 'none';
}

function makeAllSideBarItemsColorLightWhite(){
   const profileContainer1 = document.getElementById("profile-container-1");
    profileContainer1.style.color = 'rgba(248, 246, 246, 0.548)';
    const profileContainer2 = document.getElementById("profile-container-2");
    profileContainer2.style.color = 'rgba(248, 246, 246, 0.548)';
    const donateContainerRequest1 = document.getElementById("donate-container-request-1");
    donateContainerRequest1.style.color = 'rgba(248, 246, 246, 0.548)';
    const donateContainerRequest2 = document.getElementById("donate-container-request-2");
    donateContainerRequest2.style.color = 'rgba(248, 246, 246, 0.548)';
    const donateContainerCenter1 = document.getElementById("donate-container-center-1");
    donateContainerCenter1.style.color = 'rgba(248, 246, 246, 0.548)';
    const donateContainerCenter2 = document.getElementById("donate-container-center-2");
    donateContainerCenter2.style.color = 'rgba(248, 246, 246, 0.548)';
    const requestContainer1 = document.getElementById("request-container-1");
    requestContainer1.style.color = 'rgba(248, 246, 246, 0.548)';
    const requestContainer2 = document.getElementById("request-container-2");
    requestContainer2.style.color = 'rgba(248, 246, 246, 0.548)';
    const donateHistoryContainer = document.getElementById("donate-history-sidebar-1");
    donateHistoryContainer.style.color = 'rgba(248, 246, 246, 0.548)';
    const donateHistoryContainer2 = document.getElementById("donate-history-sidebar-2");
    donateHistoryContainer2.style.color = 'rgba(248, 246, 246, 0.548)';
    const requestHistoryContainer = document.getElementById("request-history-sidebar-1");
    requestHistoryContainer.style.color = 'rgba(248, 246, 246, 0.548)';
    const requestHistoryContainer2 = document.getElementById("request-history-sidebar-2");
    requestHistoryContainer2.style.color = 'rgba(248, 246, 246, 0.548)';
    const approveDonationContainer = document.getElementById("approve-donation-sidebar-1");
    approveDonationContainer.style.color = 'rgba(248, 246, 246, 0.548)';
    const approveDonationContainer2 = document.getElementById("approve-donation-sidebar-2");
    approveDonationContainer2.style.color = 'rgba(248, 246, 246, 0.548)';
}

function makeAllContentContainerToDisplayNone(){
    const donateContentContainerRequest = document.getElementById("donate-container-request");
    donateContentContainerRequest.style.display = "none";
    const profileContentContainer = document.getElementById("profile-container");
    profileContentContainer.style.display = "none";
    const donateContentContainerCenter = document.getElementById("donate-container-center");
    donateContentContainerCenter.style.display = "none";
    const requestContainer = document.getElementById("request-container");
    requestContainer.style.display = "none";
    const donateHistoryContainer = document.getElementById("donate-history-container");
    donateHistoryContainer.style.display = "none";
    const requestHistoryContainer = document.getElementById("request-history-container");
    requestHistoryContainer.style.display = "none";
    const approveDonationContainer = document.getElementById("approve-donation-container");
    approveDonationContainer.style.display = "none";
}

async function rejectReason(){
    const rejectReasonInput = document.getElementById('donation-reject-reason');
    const rejectReason = rejectReasonInput.value;
    
    if(validateRejectReason(rejectReason)){
       let rejectDetails = {
        donationId : currentDonationId,
        requestId : currentRequestId,
        rejectReason : rejectReason
       }
       try{
            const result = await rejectDonation(rejectDetails);
            if(result.status == 'success'){
                showSuccessToast("Donation rejected successfully");
                const card = document.querySelector(`.donateRequest-card[data-donation-id="${rejectDetails.donationId}"]`);
                card.remove();
                const row = document.querySelector(`tr[data-donation-id="${rejectDetails.donationId}"]`);
                row.remove();
                donationListForRequestLength--;
                closeRejectDialogBox();
                if(donationListForRequestLength == 0){
                    showMessageForNoScheduleRequestHistory();
                }
            }
            else if(result.status == 'error'){
                if(result.errorCode == 401 || result.errorCode == 403){
                    loginAgain();
                }
                else{
                    showErrorToast("Failed to reject donation.please try again");
                    closeRejectDialogBox();
                }
            }
        }
        catch(error){
            showErrorToast("Failed to reject donation. please try again");
            closeRejectDialogBox();
        }
    }
}

function validateRejectReason(rejectReason){
    if(rejectReason == undefined || rejectReason.length == 0){
        makeInputBoxRedColor('donation-reject-reason');
        showErrorMessage('Please enter the reason','donation-reject-reason-error');
        return false;
    }else{
        makeInputBoxBlackColor('donation-reject-reason');
        makeErrorContainerDisplayNone('donation-reject-reason-error');
        return true;
    }
    
}

document.getElementById("schedule-donation-history-card").addEventListener("click", getScheduleDonationHistory);
document.getElementById("approved-donation-history-card").addEventListener("click", getApprovedDonationHistory);
document.getElementById("rejected-donation-history-card").addEventListener("click", getRejectedDonationHistory);


document.getElementById('schedule-request-history-card').addEventListener('click',getScheduleRequestHistory);
document.getElementById('approved-request-history-card').addEventListener('click',getApprovedRequestHistory);
document.getElementById('rejected-request-history-card').addEventListener('click',getRejectedRequestHistory);

document.getElementById('donation-reject-reason-btn').addEventListener('click', rejectReason);

document.getElementById('logout-btn-1').addEventListener('click' ,()=>{
    document.getElementById('logout-dialog').style.display = 'flex';
})

document.getElementById('logout-btn-2').addEventListener('click' ,()=>{
    document.getElementById('logout-dialog').style.display = 'flex';
})

document.getElementById('yes-button').addEventListener('click', function() {
    sessionStorage.clear();
    window.location.href = 'login.html';
});

document.getElementById('no-button').addEventListener('click', function() {
    document.getElementById('logout-dialog').style.display = 'none';
});

document.querySelector('.close-button').addEventListener('click', function() {
    document.getElementById('logout-dialog').style.display = 'none';
});

