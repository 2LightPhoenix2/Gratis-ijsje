let imgBox = document.getElementById("imgBox");
let qrImage = document.getElementById("qr-image");
let qrText = document.getElementById("qr-text");

function generateQR() {

    if(qrText.value.length > 0){

        qrImage.src =
        "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="
        + encodeURIComponent(qrText.value);

        imgBox.classList.add("show-img");
    }
    else{
        alert("Voer eerst tekst of een URL in!");
    }
}