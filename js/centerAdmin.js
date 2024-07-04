import { addDonationToCenter, addInventoryByCenterId, approveDonationForCenter, getAllBloodUnits, getAllDonationByCenterId, getCenterDetails, getCenterId, getUser, rejectDonationForCenter } from "./api.js";
import { makeErrorContainerDisplayNone, makeInputBoxBlackColor, makeInputBoxRedColor, showErrorMessage } from "./Error.js";

import { showErrorToast , showSuccessToast} from "./Toast.js";

document.addEventListener('DOMContentLoaded', fetchProfileDetails);

let approveDonationListLength = -1;
let currentDonationId = -1;

async function fetchProfileDetails(){
    const userId = sessionStorage.getItem('userId');
    try{
        const result = await getUser(userId);
        if(result.status === 'success'){
            addProfileDetailstoDOM(result.data);
            await getCenterIdForUser();
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

async function getCenterIdForUser(){
    try{
      const result = await getCenterId();
      if(result.status === 'success'){
        sessionStorage.setItem('centerId', result.data.centerId);
      }
      else if(result.status === 'error'){
        if(result.errorCode == 401 || result.errorCode == 403){
            loginAgain();
        }
        else{
            showErrorToast("Error occured, Please Refresh the page");
        }
      }
    }
    catch(error){
        console.log(error);
        showErrorToast("Error occured, Please Refresh the page");
    }
}

function loginAgain(){
    showErrorToast('Please login again');
    window.sessionStorage.clear();
    window.location.replace ('login.html');
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
    const centerInformationsSideBarContainer1 = document.getElementById('center-informations-sidebar-container-1');
    centerInformationsSideBarContainer1.style.color = 'rgba(248, 246, 246, 0.548)';
    const centerInformationsSideBarContainer2 = document.getElementById('center-informations-sidebar-container-2');
    centerInformationsSideBarContainer2.style.color = 'rgba(248, 246, 246, 0.548)';
    const approveDonationSideBarContainer1 = document.getElementById('approve-donation-sidebar-container-1');
    approveDonationSideBarContainer1.style.color = 'rgba(248, 246, 246, 0.548)';
    const approveDonationSideBarContainer2 = document.getElementById('approve-donation-sidebar-container-2');
    approveDonationSideBarContainer2.style.color = 'rgba(248, 246, 246, 0.548)';
    const addInventorySideBarContainer1 = document.getElementById('add-inventory-sidebar-container-1');
    addInventorySideBarContainer1.style.color = 'rgba(248, 246, 246, 0.548)';
    const addInventorySideBarContainer2 = document.getElementById('add-inventory-sidebar-container-2');
    addInventorySideBarContainer2.style.color = 'rgba(248, 246, 246, 0.548)';
    const centerBloodUnitDetailsSideBarContainer1 = document.getElementById('center-bloodUnit-details-sidebar-container-1');
    centerBloodUnitDetailsSideBarContainer1.style.color = 'rgba(248, 246, 246, 0.548)';
    const centerBloodUnitDetailsSideBarContainer2 = document.getElementById('center-bloodUnit-details-sidebar-container-2');
    centerBloodUnitDetailsSideBarContainer2.style.color = 'rgba(248, 246, 246, 0.548)';
}

function makeAllContentContainerToDisplayNone(){
    const profileContainer = document.getElementById('profile-container');
    profileContainer.style.display = 'none';
    const centerInformationsContainer = document.getElementById('center-informations-container');
    centerInformationsContainer.style.display = 'none';
    const approveDonationContainer = document.getElementById('approve-donation-container');
    approveDonationContainer.style.display = 'none';
    const addInventoryContainer = document.getElementById('add-inventory-container');
    addInventoryContainer.style.display = 'none';
    const centerBloodUnitDetailsContainer = document.getElementById('center-bloodUnit-details-container');
    centerBloodUnitDetailsContainer.style.display = 'none';
}

document.getElementById('profile-sidebar-container-1').addEventListener('click' , showProfilePage);

document.getElementById('profile-sidebar-container-2').addEventListener('click' , showProfilePage);

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

document.getElementById('center-informations-sidebar-container-1').addEventListener('click' , showCenterInformationsPage);

document.getElementById('center-informations-sidebar-container-2').addEventListener('click' , showCenterInformationsPage);

function showCenterInformationsPage(){
    makeAllSideBarItemsColorLightWhite();
    const centerInformationsSideBarContainer1 = document.getElementById('center-informations-sidebar-container-1');
    centerInformationsSideBarContainer1.style.color = 'white';
    const centerInformationsSideBarContainer2 = document.getElementById('center-informations-sidebar-container-2');
    centerInformationsSideBarContainer2.style.color = 'white';
    makeAllContentContainerToDisplayNone();
    const centerInformationsContainer = document.getElementById('center-informations-container');
    centerInformationsContainer.style.display = 'block';
    closeSideBar();
    fetchCenterInformationDetails();
}

async function fetchCenterInformationDetails(){
   try{
      const result = await getCenterDetails();
      if(result.status == 'success'){
          const centerInfo = getCenterInfo(result.data);
          addCenterDetailsToDOM(centerInfo);
      }
      else if(result.status == 'error'){
        if(result.errorCode == 401 || result.errorCode == 403){
            loginAgain();
        }
        else{
            showErrorToast('Failed to display center information.please refresh the page');
        }
      }
   }
   catch(error){
     showErrorToast('Failed to fetch center information. please refresh the page');
     console.log(error);
   }
}

function getCenterInfo(centerDetails){
    let newCenterDetails = {
        name: centerDetails.name,
        state : centerDetails.state,
        city: centerDetails.city,
        address: centerDetails.address,
        postalCode: centerDetails.postalCode,
        contactNumber: centerDetails.contactNumber,
        operatingHours : centerDetails.operatingHours
    }

    return newCenterDetails;
}

function addCenterDetailsToDOM(centerInfo){
    const container = document.querySelector('.center-information-content-container');
    container.innerHTML = ''; 

    for (const [key, value] of Object.entries(centerInfo)) {
        const itemContainer = document.createElement('div');
        itemContainer.className = 'center-information-item-container';

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

document.getElementById('approve-donation-sidebar-container-1').addEventListener('click' , showApproveDonationPage);

document.getElementById('approve-donation-sidebar-container-2').addEventListener('click' , showApproveDonationPage);

function showApproveDonationPage(){
    makeAllSideBarItemsColorLightWhite();
    const approveDonationSideBarContainer1 = document.getElementById('approve-donation-sidebar-container-1');
    approveDonationSideBarContainer1.style.color = 'white';
    const approveDonationSideBarContainer2 = document.getElementById('approve-donation-sidebar-container-2');
    approveDonationSideBarContainer2.style.color = 'white';
    makeAllContentContainerToDisplayNone();
    const approveDonationContainer = document.getElementById('approve-donation-container');
    approveDonationContainer.style.display = 'block';
    closeSideBar();
    getAllDonationFromBackend();
}

async function getAllDonationFromBackend(){
    try{
        const result = await getAllDonationByCenterId()
        if(result.status =='success'){
            approveDonationListLength = result.data.length;
            if(approveDonationListLength == 0){
                showApproveDonationListMessage();
            }
            else{
                showApproveDonationListNoMessage();
                addDonationListToTable(result.data);
                addDonationListToCard(result.data);
            }
        }
        else if(result.status == 'error'){
            if(result.errorCode == 401 || result.errorCode == 403){
                loginAgain();
            }
            else{
                showErrorToast('Failed to display donations. please refresh the page');
            }
        }
    }
    catch(error){
        showErrorToast('Failed to fetch donations. please refresh the page');
        console.log(error);
    }
}

function showApproveDonationListMessage(){
    const messageContainer = document.getElementById('show-approve-donation-message');
    messageContainer.style.display = 'block';
    const tableContainer =document.getElementById('approve-donation-table');
    tableContainer.style.display = 'none';
    const cardContainer = document.getElementsByClassName('approve-donation-card-container')[0];
    cardContainer.style.display = 'none';
}

function showApproveDonationListNoMessage(){
    const messageContainer = document.getElementById('show-approve-donation-message');
    messageContainer.style.display = 'none';
    const tableContainer =document.getElementById('approve-donation-table');
    tableContainer.style.display = 'block';
}
function addDonationListToCard(donationList){
    const cardContainer = document.querySelector('.approve-donation-card-container');
    cardContainer.innerHTML = ''; 

    donationList.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('approve-donation-card');
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
            <div class="approveDonation-card-item-container">
                <div>Rh Factor :</div>
                <div>${item.rhFactor}</div>
            </div>
            <div class="approveDonation-card-item-container">
                <div>Units Donated :</div>
                <div>${item.unitsDonated}</div>
            </div>
            <div class="approveDonation-card-item-container">
                <div>Donate DateTime :</div>
                <div>${item.donateDateTime}</div>
            </div>
            <div class="approve-donation-btn-container">
                <button class="approve-donation-button-2" data-donation-id="${item.donationId}">Accept</button>
                <button class="reject-donation-button-2" data-donation-id="${item.donationId}" >Reject</button>
            </div>
        `;

        cardContainer.appendChild(card);
    });

    document.querySelectorAll('.approve-donation-button-2').forEach(button => {
        button.addEventListener('click', function() {
            const donationId = this.getAttribute('data-donation-id');
            approveDonation(donationId);
        });
    });

    document.querySelectorAll('.reject-donation-button-2').forEach(button => {
        button.addEventListener('click', function() {
            const donationId = this.getAttribute('data-donation-id');
            currentDonationId = donationId;
            openRejectDialogBox();
        });
    });
}

async function approveDonation(donationId){
    try{
        const result = await approveDonationForCenter(donationId)
        if(result.status =='success'){
            showSuccessToast('Donation approved successfully');
            removeCardAndTableRow(donationId);
            if(approveDonationListLength == 0){
                showApproveDonationListMessage();
            }
            
        }
        else if(result.status == 'error'){
            if(result.errorCode == 401 || result.errorCode == 403){
                loginAgain();
            }
            else{
                showErrorToast('Failed to approve donation. please refresh the page');
            }
        }
    }
    catch(error){
        showErrorToast('Failed to approve donation. please refresh the page');
        console.log(error);
    }
}

function removeCardAndTableRow(donationId){
   document.querySelector(`.approve-donation-card[data-donation-id = "${donationId}"`).remove();
   document.querySelector(`tr[data-donation-id = "${donationId}"]`).remove();
   approveDonationListLength--;
}

function addDonationListToTable(donationList){
      const tableBody = document.getElementById('approve-donation-table-body');
    tableBody.innerHTML = ''; 

    donationList.forEach(item => {
        const row = document.createElement('tr');
        row.setAttribute('data-donation-id', item.donationId);

        row.innerHTML = `
            <td>${item.donorName}</td>
            <td>${item.bloodType}</td>
            <td>${item.rhFactor}</td>
            <td>${item.unitsDonated}</td>
            <td>${item.donateDateTime}</td>
            <td>
                <div>
                    <button class="approve-donation-button-1" data-donation-id="${item.donationId}">Approve</button>
                    <button class="reject-donation-button-1" data-donation-id="${item.donationId}">Reject</button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });

    document.querySelectorAll('.approve-donation-button-1').forEach(button => {
        button.addEventListener('click', function() {
            const donationId = this.getAttribute('data-donation-id');
            approveDonation(donationId);
        });
    });

    document.querySelectorAll('.reject-donation-button-1').forEach(button => {
        button.addEventListener('click', function() {
            const donationId = this.getAttribute('data-donation-id');
            currentDonationId = donationId;
            openRejectDialogBox();
        });
    });
}

async function rejectDonation(){  
    let rejectReasonDetails = {
        rejectReason : document.getElementById('reject-reason-input-1').value
    }
    if(validateRejectReason(rejectReasonDetails.rejectReason)){
        try{
            
            const result = await rejectDonationForCenter(currentDonationId , rejectReasonDetails);
            if(result.status =='success'){
                showSuccessToast('Donation rejected successfully');
                closeRejectDialogBox()
                removeCardAndTableRow(currentDonationId);
                if(approveDonationListLength == 0){
                    showApproveDonationListMessage();
                }
            }
            else if(result.status == 'error'){
                if(result.errorCode == 401 || result.errorCode == 403){
                    loginAgain();
                }
                else{
                    showErrorToast('Failed to reject donation. please refresh the page');
                }
            }
        }
        catch(error){
            showErrorToast('Failed to reject donation. please refresh the page');
            console.log(error);
        }
    }
}

function validateRejectReason(rejectReason){
    if(rejectReason == undefined || rejectReason.length == 0){
        makeInputBoxRedColor('reject-reason-input-1');
        showErrorMessage('Please enter the reason' , 'reject-reason-input-error');
        return false;
    }
    else{
        makeInputBoxBlackColor('reject-reason-input-1');
        makeErrorContainerDisplayNone('reject-reason-input-error');
        return true;
    }
}

document.getElementById('add-inventory-sidebar-container-1').addEventListener('click' , showAddInventoryPage);

document.getElementById('add-inventory-sidebar-container-2').addEventListener('click' , showAddInventoryPage);

function showAddInventoryPage(){
    makeAllSideBarItemsColorLightWhite();
    const addInventorySideBarContainer1 = document.getElementById('add-inventory-sidebar-container-1');
    addInventorySideBarContainer1.style.color = 'white';
    const addInventorySideBarContainer2 = document.getElementById('add-inventory-sidebar-container-2');
    addInventorySideBarContainer2.style.color = 'white';
    makeAllContentContainerToDisplayNone();
    const addInventoryContainer = document.getElementById('add-inventory-container');
    addInventoryContainer.style.display = 'block';
    closeSideBar();
}

document.getElementById('center-bloodUnit-details-sidebar-container-1').addEventListener('click' , showCenterBloodUnitDetailsPage);

document.getElementById('center-bloodUnit-details-sidebar-container-2').addEventListener('click' , showCenterBloodUnitDetailsPage);


document.getElementById('add-inventory-btn').addEventListener('click' , addInventory);

async function addInventory(){
    let inventoryDetails = getInventoryDetails();
    inventoryDetails.collectedDateTime = new Date(inventoryDetails.collectedDateTime);
    inventoryDetails.expirationDateTime = new Date(inventoryDetails.expirationDateTime);
    if(validateInventoryDetails(inventoryDetails)){
        try{
            const result = await addInventoryByCenterId(inventoryDetails);
            if(result.status =='success'){
                showSuccessToast('Blood unit added successfully');
                clearAddInventoryForm();
            }
            else if(result.status == 'error'){
                if(result.errorCode == 401 || result.errorCode == 403){
                    loginAgain();
                }
                else{
                    showErrorToast('Failed to add inventory. please refresh the page');
                }
            }
        }
        catch(error){
            showErrorToast('Failed to add inventory. please refresh the page');
            console.log(error);
        }
    }
}

function clearAddInventoryForm(){
    document.getElementById('blood-type').value = '';
    document.getElementById('rh-factor').value = '';
    document.getElementById('units').value = '';
    document.getElementById('storing-dateTime').value = '';
    document.getElementById('expiration-dateTime').value = '';
    document.getElementById('storage-location').value = '';
}
function getInventoryDetails(){
    let inventoryDetails = {
        centerId : sessionStorage.getItem('centerId'),
        donorId:1,
        bloodType : document.getElementById('blood-type').value,
        rhFactor : document.getElementById('rh-factor').value,
        units : document.getElementById('units').value,
        collectedDateTime : document.getElementById('storing-dateTime').value,
        expirationDateTime :document.getElementById('expiration-dateTime').value,
        storageLocation : document.getElementById('storage-location').value
    }
    console.log(inventoryDetails)
    return inventoryDetails;
}

function validateInventoryDetails(inventoryDetails){
   const isValidBloodType = validateBloodType(inventoryDetails.bloodType);
   const isValidRhFactor = validateRhFactor(inventoryDetails.rhFactor);
   const isValidUnits = validateUnits(inventoryDetails.units);
   const isValidCollectedDateTime = validateCollectedDateTime(inventoryDetails.collectedDateTime);
   const isValidExpirationDateTime = validateExpirationDateTime(inventoryDetails.expirationDateTime , inventoryDetails.collectedDateTime);
   const isValidStorageLocation = validateStorageLocation(inventoryDetails.storageLocation);

   return isValidBloodType && isValidRhFactor && isValidCollectedDateTime && isValidUnits && isValidExpirationDateTime && isValidStorageLocation
}

function validateBloodType(bloodType){
    if(bloodType == undefined || bloodType.length == 0){
        makeInputBoxRedColor('blood-type');
        showErrorMessage('Please select the blood type' , 'blood-type-error');
        return false;
    }
    else{
        makeInputBoxBlackColor('blood-type');
        makeErrorContainerDisplayNone('blood-type-error');
        return true;
    }
}

function validateRhFactor(rhFactor){
    if(rhFactor == undefined || rhFactor.length == 0){
        makeInputBoxRedColor('rh-factor');
        showErrorMessage('Please select the Rh factor' , 'rh-factor-error');
        return false;
    }
    else{
        makeInputBoxBlackColor('rh-factor');
        makeErrorContainerDisplayNone('rh-factor-error');
        return true;
    }
}

function validateUnits(units){
    if(units == undefined || units.length == 0){
        makeInputBoxRedColor('units');
        showErrorMessage('Please enter the units' , 'units-error');
        return false;
    }
    else{
        makeInputBoxBlackColor('units');
        makeErrorContainerDisplayNone('units-error');
        return true;
    }
}

function validateCollectedDateTime(collectedDateTime){
    if(collectedDateTime == undefined || collectedDateTime.length == 0){
        makeInputBoxRedColor('storing-dateTime');
        showErrorMessage('Please select the collected date and time' ,'storing-dateTime-error');
        return false;
    }
    else{
        makeInputBoxBlackColor('storing-dateTime');
        makeErrorContainerDisplayNone('storing-dateTime-error');
        return true;
    }
}

function validateExpirationDateTime(expirationDateTime , collectedDateTime){
    if(expirationDateTime == undefined || expirationDateTime.length == 0){
        makeInputBoxRedColor('expiration-dateTime');
        showErrorMessage('Please select the expiration date and time' , 'expiration-dateTime-error');
        return false;
    }
    else if(collectedDateTime && collectedDateTime >= expirationDateTime){
        makeInputBoxRedColor('expiration-dateTime');
        showErrorMessage('Expiration date and time should be greater' , 'expiration-dateTime-error');
        return false;
    }
    else{
        makeInputBoxBlackColor('expiration-dateTime');
        makeErrorContainerDisplayNone('expiration-dateTime-error');
        return true;
    }
}

function validateStorageLocation(storageLocation){
    if(storageLocation == undefined || storageLocation.length == 0){
        makeInputBoxRedColor('storage-location');
        showErrorMessage('Please enter the storage location' ,'storage-location-error');
        return false;
    }
    else{
        makeInputBoxBlackColor('storage-location');
        makeErrorContainerDisplayNone('storage-location-error');
        return true;
    }
}

function disablePastDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
    const dateTimeInput = document.getElementById('storing-dateTime');
    dateTimeInput.setAttribute('min', formattedDateTime);
}

 document.getElementById('storing-dateTime').addEventListener('focus', disablePastDateTime);

 document.getElementById('expiration-dateTime').addEventListener('focus' , disablePastDateTime);
function showCenterBloodUnitDetailsPage(){
    makeAllSideBarItemsColorLightWhite();
    const centerBloodUnitDetailsSideBarContainer1 = document.getElementById('center-bloodUnit-details-sidebar-container-1');
    centerBloodUnitDetailsSideBarContainer1.style.color = 'white';
    const centerBloodUnitDetailsSideBarContainer2 = document.getElementById('center-bloodUnit-details-sidebar-container-2');
    centerBloodUnitDetailsSideBarContainer2.style.color = 'white';
    makeAllContentContainerToDisplayNone();
    const centerBloodUnitDetailsContainer = document.getElementById('center-bloodUnit-details-container');
    centerBloodUnitDetailsContainer.style.display = 'block';
    closeSideBar();
    getBloodUnitsFromBackend()
}

async function getBloodUnitsFromBackend(){
    try{
        const result = await getAllBloodUnits()
        if(result.status =='success'){
            console.log(result.data);
            displayBloodUnits(result.data);
        }
        else if(result.status == 'error'){
            if(result.errorCode == 401 || result.errorCode == 403){
                loginAgain();
            }
            else{
                showErrorToast('Failed to load blood units. please refresh the page');
            }
        }
    }
    catch(error){
        showErrorToast('Failed to load blood units. please refresh the page');
        console.log(error);
    }
}

function displayBloodUnits(bloodUnits){
   document.getElementById('a-positive').textContent = bloodUnits.aPositive;
   document.getElementById('a-negative').textContent = bloodUnits.aNegative;
   document.getElementById('b-positive').textContent = bloodUnits.bPositive;
   document.getElementById('b-negative').textContent = bloodUnits.bNegative;
   document.getElementById('ab-positive').textContent = bloodUnits.abPositive;
   document.getElementById('ab-negative').textContent = bloodUnits.abNegative;
   document.getElementById('o-positive').textContent = bloodUnits.oPositive;
   document.getElementById('o-negative').textContent = bloodUnits.oNegative;
}

function openRejectDialogBox(){
    var modal = document.getElementById("approve-donation-modal");
    modal.style.display = "flex";
}

function closeRejectDialogBox(){
    document.getElementById('reject-reason-input-1').value = '';
    var modal = document.getElementById("approve-donation-modal");
    modal.style.display = "none";
}

document.getElementById('hamburger').addEventListener('click' , showSideBar);

document.getElementById('approve-donation-reject-form-close-btn').addEventListener('click' , closeRejectDialogBox);

document.getElementById('approve-donation-dialog-submit-btn').addEventListener('click', rejectDonation)

