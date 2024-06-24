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
}

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
}

function openRejectDialogBox(){
    var modal = document.getElementById("approve-request-reject-modal");
    modal.style.display = "flex";
}

function closeRejectDialogBox(){
    var modal = document.getElementById("approve-request-reject-modal");
    modal.style.display = "none";
}
