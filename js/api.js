import { API_URL } from "./config.js";
export async function fetchCenterNameAndId(){
    try{
        const response = await fetch(API_URL + 'donationCenter/getAllDonationCenterNameAndId');
        const result = await response.json();

        if(result.status === "success"){
            return {status: result.status , data: result.data};
        }
        
        else if(result.status === 'error'){
            const errorCode = result.statusCode;
            console.log(result.message);
            switch(errorCode) {
                case 500 : 
                  throw new Error('error in fetching centers name and Id');
                default:
                   console.log(`Unhandled error code: ${errorCode}`);   
                   throw new Error(error.message);  
            }
            
        }   
    }
    catch(error) {
        return {status : 'error' , message : error.message};
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
            return {status: result.status, data: result.data};
        }
        else if(result.status === 'error'){
            const errorCode = result.statusCode;
            console.log(result.message);
            switch(errorCode) {
                case 400 : 
                   throw new Error('Please check the input and try again');
                case 404 :
                   throw new Error('Chosen Donation Center is not available');
                case 409:
                   throw new Error('Email id is already in use');
                case 500 :
                    throw new Error('Registeration failed.Please try again');
                default:
                   console.log(`Unhandled error code: ${errorCode}`);
                   throw new Error(result.message);  
            }
        }
    } 
    catch(error){
        return {status : 'error' , message : error.message};
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
         return {status: result.status, data: result.data};
      }
      else if(result.status === 'error'){
        const errorCode = result.statusCode;
        switch(errorCode){
            case 400:
                throw new Error('Please check the input and try again');
            case 401:
                throw new Error('Invalid Email or Password');
            case 403:
                throw new Error('Account is not active');            
            case 500:
                throw new Error('Login failed.Please try again');
            default:
                console.log(`Unhandled error code: ${errorCode}`);
                throw new Error(result.message);
        }
      }
   }
   catch(error){
      return {status : 'error', message : error.message};
   }
}


