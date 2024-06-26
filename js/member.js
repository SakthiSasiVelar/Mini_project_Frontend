import { getUser ,addRequest, getAllApprovedRequest, addDonationToRequest } from "./api.js";
import {showErrorToast ,showSuccessToast } from "./Toast.js";
import { makeInputBoxRedColor , makeInputBoxBlackColor , makeErrorContainerDisplayNone,showErrorMessage } from "./Error.js";

document.addEventListener('DOMContentLoaded', fetchProfileDetails);

let approvedRequestListLength = 0;

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
            console.log(result);
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
                console.log(result);
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
    getScheduleDonationHistory();
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
    getScheduleRequestHistory();
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
            console.log(newRequestDetails);
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



function closeDonateToCenterDialogForm(){
    var modal = document.getElementById("donate-modal");
 modal.style.display = "none";
}

function openDonateToCenterDialogForm(){
    var modal = document.getElementById("donate-modal");
    modal.style.display = "flex";
}

function openRejectDialogBox(){
    var modal = document.getElementById("approve-donation-modal");
    modal.style.display = "flex";
}

function closeRejectDialogBox(){
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
    scheduleCardContainer.style.display = 'flex'
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
