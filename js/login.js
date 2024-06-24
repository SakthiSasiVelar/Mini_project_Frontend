


document.getElementById('togglePassword').addEventListener('click', function() {
    var passwordInput = document.getElementById('passwordInput');
    var type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    this.classList.toggle('fa-eye-slash');
});


function login(){
     const email = document.getElementById('Email').value ;
    const pass = document.getElementById('password').value;
            fetch('http://localhost:5010/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
                },
            body: JSON.stringify({
                "email": email,
                "password": pass
            })
        })
        .then(res => res.json())
        .then((data) => {
            localStorage.setItem('Token',data.data.token);
        });


    fetch('http://localhost:5010/api/request/approvedRequest' , {
        method : 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ localStorage.getItem('Token')
        }
    })
    .then(res => res.json())
    .then((data) => {
        console.log(data);
    });

    const userId = 19;

    fetch(`http://localhost:5010/api/user/updateProfile/${userId}` ,{
        method : 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ localStorage.getItem('Token')
        },
        body: JSON.stringify({
                "Id":userId,
                "name": "dhoni",
                "email": "dhoni2@gmail.com",
                "gender": "male",
                "state": "tamil nadu",
                "city": "coimbatore",
                "postalCode": "641668",
                "address": "authupalayam",
                "dateOfBirth": "2024-05-25T08:01:28.056Z",
                "contactNumber": "1234444444"
        })
    })

    .then(res => res.json())
    .then((data) => {
        console.log(data);
    });
}