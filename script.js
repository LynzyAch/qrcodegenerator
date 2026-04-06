const qrInput = document.getElementById("qr-input");
const generateBtn = document.getElementById("generate-btn");
const qrImage = document.getElementById("qrcode");
const downloadBtn = document.getElementById("download-btn")

let isGenerated = false;

const qrCode = new QRCode(qrImage, {
    text: "",
    width: 200,
    height: 200,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
});

generateBtn.addEventListener('click', () => {
    const value = qrInput.value.trim();
    if (value) {
        qrCode.clear();
        qrCode.makeCode(value);
        isGenerated = true;
    } else {
        isGenerated = false;
        qrCode.clear();
        Swal.fire({
            title: "Empty Field",
            text: "Empty Input Field, Try Again!",
            icon: "warning",
            confirmButtonColor: "hsl(120, 79%, 44%)",
            background: "#3d493c",
            color: "#ffffff"
        });
    }
})

downloadBtn.addEventListener('click', () => {
    const img = qrImage.querySelector('img');
    const canvas = qrImage.querySelector('canvas');

    if (isGenerated) {
        const d_link = document.createElement('a');
        d_link.href = canvas ? canvas.toDataURL("image/png") : img.src;
        d_link.download = "generatedQRCode.png";
        document.body.appendChild(d_link);
        d_link.click();
        document.body.removeChild(d_link);
    } else {
        Swal.fire({
            title: "No QR Code Found",
            text: "Please generate a QR code first before trying to download!",
            icon: "error",
            confirmButtonColor: "hsl(120, 79%, 44%)",
            background: "#3d493c",
            color: "#ffffff"
        });
    }
})