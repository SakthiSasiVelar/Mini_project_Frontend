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
}

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
}

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
}

function openRejectDialogBox(){
    var modal = document.getElementById("approve-donation-modal");
    modal.style.display = "flex";
}

function closeRejectDialogBox(){
    var modal = document.getElementById("approve-donation-modal");
    modal.style.display = "none";
}