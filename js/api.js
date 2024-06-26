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
      const result = await response.json();
      
      if(result.status === 'success'){
         return apiSuccessMessage(200 , 'Logged in successfully' , result.data);
      }
      else if(result.status === 'error'){
        const errorCode = result.statusCode;
        switch(errorCode){
            case 400:
                return apiErrorMessage(400 ,'Please check the input and try again');
            case 401:
                return apiErrorMessage(401 , 'Invalid Email or Password');
            case 403:
                return apiErrorMessage(403 , 'Account is not active');            
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
        const response = await fetch(API_URL + 'request/addRequest' , {
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
        const response = await fetch(API_URL +'request/approvedRequest' , {
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

