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

export function apiErrorMessage(code , errorMessage){
    let errorModal = {
       status : 'error',
       errorCode : code,
       messsage : errorMessage
    }
    return errorModal;
}

export function apiSuccessMessage(code , successMessage , setData){
    let successModal = {
        status :'success',
        errorCode : code,
        messsage : successMessage,
        data : setData
    }
    return successModal;
}
