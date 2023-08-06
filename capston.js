
  function geoFindMe() {
    const status = document.querySelector("#status");
    const mapLink = document.querySelector("#map-link");
    
     mapLink.href = "";
     mapLink.textContent = "";
    
    function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    
       status.textContent = "";
       mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
       mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    }
    
    function error() {
       status.textContent = "Unable to retrieve your location";
    }
    
    if (!navigator.geolocation) {
        status.textContent = "Geolocation is not supported by your browser";
    } else {
       status.textContent = "Locating…";
       navigator.geolocation.getCurrentPosition(success, error);
    }
      navigator.geolocation.getCurrentPosition(console.log)
    }
    
    document.querySelector("#find-me").addEventListener("click", geoFindMe);


function payWithPaystack() {

    var handler = PaystackPop.setup({ 
        key: 'pk_test_e38503777899dcde92d833a2f6f0de93f00e8e16', //put your public key here
        email: 'customer@email.com', //put your customer's email here
        amount: 370000, //amount the customer is supposed to pay
        metadata: {
            custom_fields: [
                {
                    display_name: "Mobile Number",
                    variable_name: "mobile_number",
                    value: "+2348012345678" //customer's mobile number
                }
            ]
        },
        callback: function (response) {
            //after the transaction have been completed
            //make post call  to the server with to verify payment 
            //using transaction reference as post data
            $.post("verify.php", {reference:response.reference}, function(status){
                if(status == "success")
                    //successful transaction
                    alert('Transaction was successful');
                else
                    //transaction failed
                    alert(response);
            });
        },
        onClose: function () {
            //when the user close the payment modal
            alert('Transaction cancelled');
        }
    });
    handler.openIframe(); //open the paystack's payment modal
}
