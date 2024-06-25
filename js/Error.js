export function makeInputBoxRedColor(idName){
   const inputBox = document.getElementById(idName);
   inputBox.style.borderColor = 'red';
}

export function makeInputBoxBlackColor(idName){
   const inputBox = document.getElementById(idName);
   inputBox.style.borderColor = 'black';
}

export function showErrorMessage(errorMessage , idName){
    const errorContainer = document.getElementById(idName);
    errorContainer.innerHTML = errorMessage;
}

export function makeErrorContainerDisplayNone(idName){
    const errorContainer = document.getElementById(idName);
    errorContainer.style.display = 'none';
}