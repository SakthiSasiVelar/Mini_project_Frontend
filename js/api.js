import { API_URL } from "./config.js";

import { apiErrorMessage, apiSuccessMessage } from "./Error.js";

export async function fetchCenterNameAndId(){
    try{
        const response = await fetch(API_URL + 'donationCenter/getAllDonationCenterNameAndId');
        const result = await response.json();

        if(result.status === "success"){
            return apiSuccessMessage(200 , 'center name and id fetched successfully' , result.data);
        }
        
        else if(result.status === 'error'){
            const errorCode = result.statusCode;
            console.log(result.message);
            switch(errorCode) {
                case 500 : 
                  return apiErrorMessage(500 ,'error in fetching centers name and Id');
                default:
                   return apiErrorMessage(errorCode ,result.message);
            }
            
        }   
    }
    catch(error) {

        return error;
    };
}


export async function addUserDetails(userDetails){
   try{
        const response = await fetch(API_URL + 'user/Register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetails)
        });
        const result = await response.json();
        if(result.status === "success"){
            return apiSuccessMessage(201 , 'User registered successfully' ,result.data);
        }
        else if(result.status === 'error'){
            const errorCode = result.statusCode;
            console.log(result.message);
            switch(errorCode) {
                case 400 : 
                   return apiErrorMessage(400 ,'Please check the input and try again');
                case 404 :
                   return apiErrorMessage(404 , 'Chosen Donation Center is not available');
                case 409:
                   return apiErrorMessage(409 ,'Email id is already in use');
                case 500 :
                    return apiErrorMessage(500 ,'Registeration failed.Please try again');
                default:
                   return apiErrorMessage(errorCode ,result.message); 
            }
        }
    } 
    catch(error){
        return error;
    };  

}

export async function loginUser(loginDetails){
   try{
      const response = await fetch(API_URL +'user/login' , {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(loginDetails)
      });

      if(!response.ok){
        const errorCode = response.status;
         switch(errorCode){
            case 401:
               return apiErrorMessage(401 , 'Invalid Email or Password');
            case 403:
               return apiErrorMessage(403 , 'Account is not active'); 
         }
      }
      const result = await response.json();
      
      if(result.status === 'success'){
         return apiSuccessMessage(200 , 'Logged in successfully' , result.data);
      }
      else if(result.status === 'error'){
        const errorCode = result.statusCode;
        switch(errorCode){
            case 400:
                return apiErrorMessage(400 ,'Please check the input and try again');                  
            case 500:
                return apiErrorMessage(500 , 'Login failed.Please try again');
            default:
                return apiErrorMessage(errorCode ,result.message);
        }
      }
    }
   catch(error){
      return error;
   }
}

export async function getUser(id){
    try{
        const response = await fetch(API_URL + `user/getUser/${id}`);
        const result = await response.json();

        if(result.status === 'success'){
            return apiSuccessMessage(200 , 'User details fetched successfully' ,result.data);
        }
        else if(result.status === 'error'){
            const errorCode = result.statusCode;
            console.log(result.message);
            switch(errorCode){
                case 400:
                   return apiErrorMessage(400 ,'Please check the user id');
                case 404:
                    return apiErrorMessage(404 , 'User not found');
                case 500:
                     return apiErrorMessage(500 ,'Error in getting profile details');
                default:
                    return apiErrorMessage(errorCode ,result.message);
            }
        }
    
    }
    catch(error){
        return error;
    }
}

export async function addRequest(requestDetails){
    try{
        const token = sessionStorage.getItem('token');
        
        const response = await fetch(API_URL + `request/addRequest` , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + token
            },
            body: JSON.stringify(requestDetails)
        });

        if(!response.ok){
            const errorCode = response.status;
            switch(errorCode){
                case 401:
                    return apiErrorMessage(401 , 'Unauthorized')
                case 403:
                    return apiErrorMessage(403 , 'Forbidden') 
            }

        }

        const result = await response.json();
        console.log(result);
        
        if(result.status === 'success'){
            return apiSuccessMessage(201 , 'Request added successfully' ,result.data);
        }
        else if(result.status === 'error'){
            const errorCode = result.statusCode;
            console.log(result.message);
            switch(errorCode){
                case 400:
                    return apiErrorMessage(400 , 'Check the input')
                case 500:
                    return apiErrorMessage(500, 'Error in adding request')
                default:
                    return apiErrorMessage(errorCode, result.message);
            }
        }
    }
    catch(error) {
        return error;
    }
}

export async function getAllApprovedRequest(){
    try{
        const token = sessionStorage.getItem('token');
        const userId = sessionStorage.getItem('userId');
        const response = await fetch(API_URL +`request/approvedRequest/${userId}` , {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ token
            }
        });

        if(!response.ok){
            const errorCode = response.status;
            switch(errorCode){
                case 401:
                    return apiErrorMessage(401 , 'Unauthorized')
                case 403:
                    return apiErrorMessage(403 , 'Forbidden') 
            }
        }

        const result = await response.json();
        if(result.status ==='success'){
            return apiSuccessMessage(200, 'Approved requests fetched successfully', result.data);
        }
        else if(result.status === 'error'){
            const errorCode = result.statusCode;
            console.log(result.message);
            switch(errorCode){
                case 400:
                    return apiErrorMessage(400, 'check the input');
                case 500:
                    return apiErrorMessage(500, 'Error in fetching approved request');
                default:
                    return apiErrorMessage(errorCode, result.message);
            }
        }
    }
    catch(error){
        return error;
    }
}

export async function addDonationToRequest(donateDetails){
    try{
        const token = sessionStorage.getItem('token');
        const requestId = donateDetails.requestId;
        const response = await fetch(API_URL +`donate/donateBlood/request/${requestId}` , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ token
            },
            body: JSON.stringify(donateDetails)
        });

        if(!response.ok){
            const errorCode = response.status;
            switch(errorCode){
                case 401:
                    return apiErrorMessage(401 , 'Unauthorized')
                case 403:
                    return apiErrorMessage(403 , 'Forbidden') 
            }
        }

        const result = await response.json();

        if(result.status === 'success'){
            return apiSuccessMessage(201, 'Donated successfully', result.data);
        }
        else if(result.status === 'error'){
            const errorCode = result.statusCode;
            console.log(result.message);
            switch(errorCode){
                case 400:
                    return apiErrorMessage(400, 'Check the input');
                case 500:
                    return apiErrorMessage(500, 'Error in donating blood');
                default:
                    return apiErrorMessage(errorCode, result.message);
            }
        }
    }
    catch(error){
        return error;
    }
}

export async function getAllDonateCenters(){
    try{
       const token = sessionStorage.getItem('token');
       const response = await fetch(API_URL +`donationCenter/getAllDonationCenter` , {
           method: 'GET',
           headers: {
               'Content-Type': 'application/json',
               'Authorization' : 'Bearer '+ token
           }
       });

       if(!response.ok){
        const errorCode = response.status;
        switch(errorCode){
            case 401:
                return apiErrorMessage(401 , 'Unauthorized')
            case 403:
                return apiErrorMessage(403 , 'Forbidden') 
        }
       }

       const result = await response.json();
       if(result.status ==='success'){
           return apiSuccessMessage(200, 'Donation centers fetched successfully', result.data);
       }
       else if(result.status === 'error'){
           const errorCode = result.statusCode;
           console.log(result.message);
           switch(errorCode){
               case 400:
                   return apiErrorMessage(400, 'Check the input');
               case 500:
                   return apiErrorMessage(500, 'Error in fetching donation centers');
               default:
                   return apiErrorMessage(errorCode, result.message);
           }
       }
    }
    catch(error){
        return error;
    }
}

export async function addDonationToCenter(donateDetails){
    try{
        const token = sessionStorage.getItem('token');
        const donationCenterId = donateDetails.centerId;
        const response = await fetch(API_URL +`donate/donateBlood/center/${donationCenterId}` , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ token
            },
            body: JSON.stringify(donateDetails)
        });

        if(!response.ok){
            const errorCode = response.status;
            switch(errorCode){
                case 401:
                    return apiErrorMessage(401 , 'Unauthorized')
                case 403:
                    return apiErrorMessage(403 , 'Forbidden') 
            }
        }

        const result = await response.json();
        if(result.status === 'success'){
            return apiSuccessMessage(201, 'Donated successfully', result.data);
        }
        else if(result.status === 'error'){
            const errorCode = result.statusCode;
            console.log(result.message);
            switch(errorCode){
                case 400:
                    return apiErrorMessage(400, 'Check the input');
                case 500:
                    return apiErrorMessage(500, 'Error in donating blood');
                default:
                    return apiErrorMessage(errorCode, result.message);
            }
        }
    }
    catch(error){
        return error;
    }

}

export async function getDonationHistory(){
    try{
        const token = sessionStorage.getItem('token');
        const userId = sessionStorage.getItem('userId');
        const response = await fetch(API_URL +`donate/getDonationHistory/${userId}` , {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ token
            }
        });

        if(!response.ok){
            const errorCode = response.status;
            switch(errorCode){
                case 401:
                    return apiErrorMessage(401 , 'Unauthorized')
                case 403:
                    return apiErrorMessage(403 , 'Forbidden') 
            }
        }

        const result = await response.json();
        if(result.status ==='success'){
            return apiSuccessMessage(200, 'Donation history fetched successfully', result.data);
        }
        else if(result.status === 'error'){
            const errorCode = result.statusCode;
            console.log(result.message);
            switch(errorCode){
                case 400:
                    return apiErrorMessage(400, 'Check the input');
                case 404:
                    return apiErrorMessage(404, 'User not found');
                case 500:
                    return apiErrorMessage(500, 'Error in fetching  donation history');
                default:
                    return apiErrorMessage(errorCode, result.message);
            }
        }
    }
    catch(error){
        return error;
    }
    
}

export async function getRequestHistory(){
    try{
        const token = sessionStorage.getItem('token');
        const userId = sessionStorage.getItem('userId');
        const response = await fetch(API_URL +`request/getRequestHistory/${userId}` , {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ token
            }
        });
        
        if(!response.ok){
            const errorCode = response.status;
            switch(errorCode){
                case 401:
                    return apiErrorMessage(401 , 'Unauthorized')
                case 403:
                    return apiErrorMessage(403 , 'Forbidden') 
            }
        }
        const result = await response.json();
        if(result.status ==='success'){
            return apiSuccessMessage(200, 'Request history fetched successfully', result.data);
        }
        else if(result.status === 'error'){
            const errorCode = result.statusCode;
            console.log(result.message);
            switch(errorCode){
                case 400:
                    return apiErrorMessage(400, 'Check the input');
                case 404:
                    return apiErrorMessage(404, 'User not found');
                case 500:
                    return apiErrorMessage(500, 'Error in fetching request history');
                default:
                    return apiErrorMessage(errorCode, result.message);
            }
        }
    }
    catch(error){
        return error;
    }
}


export async function getPendingDonationsForAllRequestOfUser(){
    try{
        const token = sessionStorage.getItem('token');
        const userId = sessionStorage.getItem('userId');
        const response = await fetch(API_URL +`donate/getDonationListForRequest/${userId}` , {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ token
            }
        });

        if(!response.ok){
            const errorCode = response.status;
            switch(errorCode){
                case 401:
                    return apiErrorMessage(401 , 'Unauthorized')
                case 403:
                    return apiErrorMessage(403 , 'Forbidden') 
            }
        }

        const result = await response.json();
        if(result.status ==='success'){
            return apiSuccessMessage(200, 'Pending donations fetched successfully', result.data);
        }
        else if(result.status === 'error'){
            const errorCode = result.statusCode;
            console.log(result.message);
            switch(errorCode){
                case 400:
                    return apiErrorMessage(400, 'Check the input');
                case 404:
                    return apiErrorMessage(404, 'User not found');
                case 500:
                    return apiErrorMessage(500, 'Error in fetching pending donations');
                default:
                    return apiErrorMessage(errorCode, result.message);
            }
        }
    }
    catch(error){
        return error;
    }
} 

export async function approveDonation(donationId){
    try{
        const token = sessionStorage.getItem('token');
        const response = await fetch(API_URL +`donate/request/approveDonation/${donationId}` , {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ token
            }
        });
        
        if(!response.ok){
            const errorCode = response.status;
            switch(errorCode){
                case 401:
                    return apiErrorMessage(401 , 'Unauthorized')
                case 403:
                    return apiErrorMessage(403 , 'Forbidden') 
            }
        }
        const result = await response.json();
        if(result.status ==='success'){
            return apiSuccessMessage(200, 'Donation approved successfully', result.data);
        }
        else if(result.status === 'error'){
            const errorCode = result.statusCode;
            console.log(result.message);
            switch(errorCode){
                case 400:
                    return apiErrorMessage(400, 'Check the input');
                case 404:
                    return apiErrorMessage(404, 'Donation Id not found');
                case 500:
                    return apiErrorMessage(500, 'Error in approving donation');
                default:
                    return apiErrorMessage(errorCode, result.message);
            }
        }
    
    }
    catch(error){
        return error;
    }
}

export async function rejectDonation(rejectDonationDetails){
    try{
        const token = sessionStorage.getItem('token');
        const requestId = rejectDonationDetails.requestId;
        const donationId = rejectDonationDetails.donationId;
        console.log(requestId , donationId);
        let rejectReason = {
            rejectReason : rejectDonationDetails.rejectReason
        }
        const response = await fetch(API_URL +`request/${requestId}/donate/rejectDonation/${donationId}` , {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ token
            },
            body: JSON.stringify(rejectReason)
        });

        if(!response.ok){
            const errorCode = response.status;
            switch(errorCode){
                case 401:
                    return apiErrorMessage(401 , 'Unauthorized')
                case 403:
                    return apiErrorMessage(403 , 'Forbidden') 
            }
        }
        const result = await response.json();
        if(result.status ==='success'){
            return apiSuccessMessage(200, 'Donation rejected successfully', result.data);
        }
        else if(result.status === 'error'){
            const errorCode = result.statusCode;
            console.log(result.message);
            switch(errorCode){
                case 400:
                    return apiErrorMessage(400, 'Check the input');
                case 404:
                    return apiErrorMessage(404, 'Request Id or Donation Id not found');
                case 500:
                    return apiErrorMessage(500, 'Error in rejecting the donation');
                default:
                    return apiErrorMessage(errorCode, result.message);
            }
        }
    }
    catch(error){
        return error;
    }   
}

export async function getAllNotActivatedAccounts(){
  try{
      const token = sessionStorage.getItem('token');
      const response = await fetch(API_URL +`user/getAllNotActiveAccounts`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer '+ token
        }
      });
      
      if(!response.ok){
        const errorCode = response.status;
        switch(errorCode){
          case 401:
            return apiErrorMessage(401, 'Unauthorized');
          case 403:
            return apiErrorMessage(403, 'Forbidden');
        }
      }
      
      const result = await response.json();
      if(result.status ==='success'){
        return apiSuccessMessage(200, 'Not activated accounts fetched successfully', result.data);
      }
      else if(result.status === 'error'){
        const errorCode = result.statusCode;
        console.log(result.message);
        switch(errorCode){
            case 400:
              return apiErrorMessage(400, 'Check the input');
            case 404:
              return apiErrorMessage(404, 'User not found');
            case 500:
              return apiErrorMessage(500, 'Error in fetching not activated accounts');
            default:
              return apiErrorMessage(errorCode, result.message);
        }
      }
    }
    catch(error){
      return error;
    }
}

export async function activeAccount(userId){
    try{
        const token = sessionStorage.getItem('token');
        const response = await fetch(API_URL +`admin/activateAdmin/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ token
            }
        });

        if(!response.ok){
            const errorCode = response.status;
            switch(errorCode){
                case 401:
                    return apiErrorMessage(401, 'Unauthorized');
                case 403:
                    return apiErrorMessage(403, 'Forbidden');
            }
        }
        
        const result = await response.json();
        if(result.status ==='success'){
            return apiSuccessMessage(200, 'Account activated successfully', result.data);
        }
        else if(result.status === 'error'){
            const errorCode = result.statusCode;
            console.log(result.message);
            switch(errorCode){
                case 400:
                    return apiErrorMessage(400, 'Check the input');
                case 404:
                    return apiErrorMessage(404, 'User not found');
                case 500:
                    return apiErrorMessage(500, 'Error in activating account');
                default:
                    return apiErrorMessage(errorCode, result.message);
            }
        }
    
    }
    catch(error){
        return error;
    }
}

export async function addCenterDetails(centerDetails){
    try{
       const token = sessionStorage.getItem('token');
       const response = await fetch(API_URL +`donationCenter/addCenter`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer '+ token
        },
        body: JSON.stringify(centerDetails)
       });

       if(!response.ok){
        const errorCode = response.status;
        switch(errorCode){
            case 401:
                return apiErrorMessage(401, 'Unauthorized');
            case 403:
                return apiErrorMessage(403, 'Forbidden');
        }
       }

       const result = await response.json();
       if(result.status ==='success'){
           return apiSuccessMessage(201, 'Donation Center added successfully', result.data);
       }
       else if(result.status === 'error'){
        const errorCode = result.statusCode;
        console.log(result.message);
        switch(errorCode){
            case 400:
                return apiErrorMessage(400, 'Check the input');
            case 404:
                return apiErrorMessage(404, 'User not found');
            case 500:
                return apiErrorMessage(500, 'Error in adding center');
            default:
                return apiErrorMessage(errorCode, result.message);
        }
       }
    }
    catch(error){
        return error;
    }
   
}

export async function getAllPendingRequest(){
    try{
        const token = sessionStorage.getItem('token');
        const response = await fetch(API_URL +`request/pendingRequest`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ token
            }
        });
        
        if(!response.ok){
            const errorCode = response.status;
            switch(errorCode){
                case 401:
                    return apiErrorMessage(401, 'Unauthorized');
                case 403:
                    return apiErrorMessage(403, 'Forbidden');
            }
        }
        
        const result = await response.json();
        if(result.status ==='success'){
            return apiSuccessMessage(200, 'Pending requests fetched successfully', result.data);
        }
        else if(result.status === 'error'){
            const errorCode = result.statusCode;
            console.log(result.message);
            switch(errorCode){
                case 400:
                    return apiErrorMessage(400, 'Check the input');
                case 404:
                    return apiErrorMessage(404, 'No pending requests found');
                case 500:
                    return apiErrorMessage(500, 'Error in fetching pending requests');
                default:
                    return apiErrorMessage(errorCode, result.message);
            }
        }
    }
    catch(error){
        return error;
    }
}

export async function approveRequest(requestId){
   try{
        const token = sessionStorage.getItem('token');
        const response = await fetch(API_URL +`request/approveRequest/${requestId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ token
            }
        });

        if(!response.ok){
            const errorCode = response.status;
            switch(errorCode){
                case 401:
                    return apiErrorMessage(401, 'Unauthorized');
                case 403:
                    return apiErrorMessage(403, 'Forbidden');
            }
        }
        
        const result = await response.json();
        if(result.status ==='success'){
            return apiSuccessMessage(200, 'Request approved successfully', result.data);
        }
        else if(result.status === 'error'){
            const errorCode = result.statusCode;
            console.log(result.message);
            switch(errorCode){
                case 400:
                    return apiErrorMessage(400, 'Check the input');
                case 404:
                    return apiErrorMessage(404, 'Request not found');
                case 500:
                    return apiErrorMessage(500, 'Error in approving the request');
            }
        }
    }
    catch(error){
        return error;
    }
}

export async function rejectRequest(rejectRequestDetails){
    try{
        const token = sessionStorage.getItem('token');
        const response = await fetch(API_URL +`request/rejectRequest/${rejectRequestDetails.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ token
            },
            body: JSON.stringify(rejectRequestDetails)
        });
        
        if(!response.ok){
            const errorCode = response.status;
            switch(errorCode){
                case 401:
                    return apiErrorMessage(401, 'Unauthorized');
                case 403:
                    return apiErrorMessage(403, 'Forbidden');
            }
        }
        
        const result = await response.json();
        if(result.status ==='success'){
            return apiSuccessMessage(200, 'Request rejected successfully', result.data);
        }
        else if(result.status === 'error'){
            const errorCode = result.statusCode;
            console.log(result.message);
            switch(errorCode){
                case 400:
                    return apiErrorMessage(400, 'Check the input');
                case 404:
                    return apiErrorMessage(404, 'Request not found');
                case 500:
                    return apiErrorMessage(500, 'Error in rejecting the request');
            }
        }
    }
    catch(error){
        return error;
    }
}

export async function getCenterId(){
    try{
        const token = sessionStorage.getItem('token');
        const userId = sessionStorage.getItem('userId');
        const response = await fetch(API_URL +`donationCenter/getCenterId/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ token
            }
        });
        
        if(!response.ok){
            const errorCode = response.status;
            switch(errorCode){
                case 401:
                    return apiErrorMessage(401, 'Unauthorized');
                case 403:
                    return apiErrorMessage(403, 'Forbidden');
            }
        }
        
        const result = await response.json();
        if(result.status ==='success'){
            return apiSuccessMessage(200, 'Center ID fetched successfully', result.data);
        }
        else if(result.status === 'error'){
            const errorCode = result.statusCode;
            console.log(result.message);
            switch(errorCode){
                case 400:
                    return apiErrorMessage(400, 'Check the input');
                case 404:
                    return apiErrorMessage(404, 'No center ID found');
                case 500:
                    return apiErrorMessage(500, 'Error in fetching center ID');
                default:
                    return apiErrorMessage(errorCode, result.message);
            }
        }
    }
    catch(error){
        return error;
    }
}

export async function getCenterDetails(){
    try{
        const token = sessionStorage.getItem('token');
        const centerId = sessionStorage.getItem('centerId');
        const response = await fetch(API_URL +`donationCenter/getDonationCenter/${centerId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ token
            }
        });
            
        if(!response.ok){
            const errorCode = response.status;
            switch(errorCode){
                case 401:
                    return apiErrorMessage(401, 'Unauthorized');
                case 403:
                    return apiErrorMessage(403, 'Forbidden');
            }
        }
            
        const result = await response.json();
        if(result.status ==='success'){
            return apiSuccessMessage(200, 'Center fetched successfully', result.data);
        }
        else if(result.status === 'error'){
            const errorCode = result.statusCode;
            console.log(result.message);
            switch(errorCode){
                case 400:
                    return apiErrorMessage(400, 'Check the input');
                case 404:
                    return apiErrorMessage(404, 'No center found');
                case 500:
                    return apiErrorMessage(500, 'Error in fetching center');
                default:
                    return apiErrorMessage(errorCode, result.message);
            }
        }
        
    }
    catch(error){
        return error;
    }
}

export async function getAllDonationByCenterId(){
    try{
      const token = sessionStorage.getItem('token');
      const centerId = sessionStorage.getItem('centerId')
      const response = await fetch(API_URL +`donate/getDonationListForCenter/${centerId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer '+ token
        }
      });
      
      if(!response.ok){
        const errorCode = response.status;
        switch(errorCode){
          case 401:
            return apiErrorMessage(401, 'Unauthorized');
          case 403:
            return apiErrorMessage(403, 'Forbidden');
        }
      }
      
      const result = await response.json();
      if(result.status ==='success'){
        return apiSuccessMessage(200, 'Donations fetched successfully', result.data);
      }
      else if(result.status === 'error'){
        const errorCode = result.statusCode;
        console.log(result.message);
        switch(errorCode){
            case 400:
                return apiErrorMessage(400, 'Check the input');
            case 404:
                return apiErrorMessage(404, 'No donations found');
            case 500:
                return apiErrorMessage(500, 'Error in fetching donations');
            default:
                return apiErrorMessage(errorCode, result.message);
        }
      }
    }
    catch(error){
        return error;
    }
}

export async function approveDonationForCenter(donationId){
    try{
      const token = sessionStorage.getItem('token');
      const response = await fetch(API_URL +`donate/center/approveDonation/${donationId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer '+ token
        }
      });
      
      if(!response.ok){
        const errorCode = response.status;
        switch(errorCode){
          case 401:
            return apiErrorMessage(401, 'Unauthorized');
          case 403:
            return apiErrorMessage(403, 'Forbidden');
        }
      }
      
      const result = await response.json();
      if(result.status ==='success'){
        return apiSuccessMessage(200, 'Donation approved successfully', result.data);
      }
      else if(result.status === 'error'){
        const errorCode = result.statusCode;
        console.log(result.message);
        switch(errorCode){
            case 400:
                return apiErrorMessage(400, 'Check the input');
            case 404:
                return apiErrorMessage(404, 'No donation found');
            case 500:
                return apiErrorMessage(500, 'Error in approving donation');
            default:
                return apiErrorMessage(errorCode, result.message);
        }
      }
    }
    catch(error){
        return error;
    }
}

export async function rejectDonationForCenter(donationId , rejectReasonDetails){
    try{
        const token = sessionStorage.getItem('token');
        const centerId = sessionStorage.getItem('centerId')
        const response = await fetch(API_URL +`center/${centerId}/donate/rejectDonation/${donationId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ token
            },
            body:JSON.stringify(rejectReasonDetails)
        });
        
        if(!response.ok){
            const errorCode = response.status;
            switch(errorCode){
                case 401:
                    return apiErrorMessage(401, 'Unauthorized');
                case 403:
                    return apiErrorMessage(403, 'Forbidden');
            }
        }

        const result = await response.json();
        if(result.status ==='success'){
            return apiSuccessMessage(200, 'Donation rejected successfully', result.data);
        }
        else if(result.status === 'error'){
            const errorCode = result.statusCode;
            console.log(result.message);
            switch(errorCode){
                case 400:
                    return apiErrorMessage(400, 'Check the input');
                case 404:
                    return apiErrorMessage(404, 'No donation found');
                case 500:
                    return apiErrorMessage(500, 'Error in rejecting donation');
                default:
                    return apiErrorMessage(errorCode, result.message);
            }
        }

    }
    catch(error){
        return error;
    }
}


export async function addInventoryByCenterId(inventoryDetails){
    try{
        const token = sessionStorage.getItem('token');
        const response = await fetch(API_URL +`inventory/addInventory`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ token
            },
            body: JSON.stringify(inventoryDetails)
        });
        
        if(!response.ok){
            const errorCode = response.status;
            switch(errorCode){
                case 401:
                    return apiErrorMessage(401, 'Unauthorized');
                case 403:
                    return apiErrorMessage(403, 'Forbidden');
            }
        }
        
        const result = await response.json();
        if(result.status ==='success'){
            return apiSuccessMessage(201, 'Inventory added successfully', result.data);
        }
        else if(result.status === 'error'){
            const errorCode = result.statusCode;
            console.log(result.message);
            switch(errorCode){
                case 400:
                    return apiErrorMessage(400, 'Check the input');
                case 404:
                    return apiErrorMessage(404, 'No donation center found');
                case 500:
                    return apiErrorMessage(500, 'Error in adding inventory');
                default:
                    return apiErrorMessage(errorCode, result.message);
            }
        
        }
    }
    catch(error){
        return error;
    }
}

export async function getAllBloodUnits(){
    try{
        const token = sessionStorage.getItem('token');
        const centerId = sessionStorage.getItem('centerId');
        const response = await fetch(API_URL +`donationCenter/getAllBloodUnits/${centerId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ token
            }
        });
        
        if(!response.ok){
            const errorCode = response.status;
            switch(errorCode){
                case 401:
                    return apiErrorMessage(401, 'Unauthorized');
                case 403:
                    return apiErrorMessage(403, 'Forbidden');
            }
        }
        
        const result = await response.json();
        if(result.status ==='success'){
            return apiSuccessMessage(200, 'Blood units fetched successfully', result.data);
        }
        else if(result.status === 'error'){
            const errorCode = result.statusCode;
            console.log(result.message);
            switch(errorCode){
                case 400:
                    return apiErrorMessage(400, 'Check the input');
                case 404:
                    return apiErrorMessage(404, 'No blood units found');
                case 500:
                    return apiErrorMessage(500, 'Error in fetching blood units');
                default:
                    return apiErrorMessage(errorCode, result.message);
            }
        }
    }
    catch(error){
        return error;
    }
}