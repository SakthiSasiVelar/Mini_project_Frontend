
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
}

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