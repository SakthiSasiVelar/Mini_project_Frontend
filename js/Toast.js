
const customToastStyles = {
  success: `
   @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
    .toastify.on-toastify-custom-success {
        background-color: transparent !important;
        box-shadow: none !important;
        padding: 0 !important;
      }
      .toastify {
         padding: 0px !important;
         color: none !important;
         box-shadow: none !important;
         background-color: none !important;
         position:fixed !important;
         border-radius: 0px !important;
         font-family:'Poppins' !important;
         max-width: none !important;
       }
      .toast-custom-success {
        width: 100% !important;
        display: flex;
        align-items: center;
        background-color: white; 
         border-radius:5px;
        border-left: 5px solid #4CAF50; 
        color: #4CAF50; 
        padding: 10px 15px; 
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
        margin: 10px; 
      }
      .toast-custom-success .icon {
        width: 24px;
        height: 24px;
        background-color: #4CAF50;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
      }
      .toast-custom-success .icon::before {
        content: '✔';
        color: white;
        font-size: 14px;
      }
      .toast-custom-success span {
        font-size: 16px;
      }
  `,
  error: `
   @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

    .toastify.on-toastify-custom-success {
        background-color: transparent !important;
        box-shadow: none !important;
        padding: 0 !important;
      }
      .toastify {
         padding: 0px !important;
         color: none !important;
         box-shadow: none !important;
         background-color: none !important;
         position:fixed !important;
         border-radius: 0px !important;
         max-width: none !important;
         font-family:'Poppins'!important;
       }
      .toast-custom-error {
        width: 100% !important;
        display: flex;
        align-items: center;
        background-color: white; 
         border-radius:5px;
        border-left: 5px solid rgba(255, 0, 0, 0.8); 
        color: #f44336; 
        padding: 10px 15px; 
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
        margin: 10px; 
      }
     .toast-custom-error .icon {
        width: 24px;
        height: 24px;
        background-color: #f44336;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
      }
      .toast-custom-error .icon::before {
        content: '✖';
        color: white;
        font-size: 14px;
      }
      .toast-custom-error span {
        font-size: 16px;
      }
  `
};


function createCustomToast(type, message) {
  const toast = document.createElement("div");
  toast.className = `toast-custom-${type}`;

  const icon = document.createElement("div");
  icon.className = "icon";

  const text = document.createElement("span");
  text.innerText = message;


  toast.appendChild(icon);
  toast.appendChild(text);

  return toast;
}


export function showSuccessToast(message) {
  Toastify({
    node: createCustomToast("success", message),
    duration: 3000,
    backgroundColor: "none",
    gravity: "top",
    position: "right",
    stopOnFocus: true
  }).showToast();
}


export function showErrorToast(message) {
  Toastify({
    node: createCustomToast("error", message),
    duration: 3000,
    backgroundColor: "none",
    gravity: "top",
    position: "right",
    stopOnFocus: true
  }).showToast();
}

Object.keys(customToastStyles).forEach(type => {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = customToastStyles[type];
  document.head.appendChild(styleSheet);
});
