document.getElementById('btnUpload').addEventListener('click', function() {
    document.getElementById('archivo').click();
});

document.getElementById('archivo').addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imgURL = e.target.result;
            const previewImage = document.getElementById('preview');
            previewImage.src = imgURL;

            previewImage.onload = function() {
                const imageWidth = previewImage.naturalWidth;
                const imageHeight = previewImage.naturalHeight;

                document.querySelector('input[name="ancho"]').value = imageWidth;
                document.querySelector('input[name="alto"]').value = imageHeight;

                previewImage.classList.add('image-loaded');
            };
        };
        reader.onerror = function() {
            alert('Error al cargar la imagen. Por favor, intenta de nuevo.');
        };
        reader.readAsDataURL(file);
    }
});

let scale = 1;
const previewImage = document.getElementById('preview');
document.getElementById('imageContainer').addEventListener('wheel', function(event) {
    event.preventDefault();

    if (event.deltaY < 0) {
        scale += 0.1;
    } else {
        scale -= 0.1;
    }
    previewImage.style.transform = `scale(${scale})`;
});

document.querySelector('.btn-delete').addEventListener('click', function() {
    document.getElementById('preview').src = '';
    document.getElementById('archivo').value = '';
    scale = 1;
    previewImage.style.transform = `scale(${scale})`;

    previewImage.style.width = 'auto'; 
    previewImage.style.height = 'auto';

    document.querySelector('input[name="ancho"]').value = '0';
    document.querySelector('input[name="alto"]').value = '0';

    previewImage.classList.remove('image-loaded');
});




document.querySelector('.btn-download').addEventListener('click', function() {
    const formatSelect = document.querySelector('select');
    const format = formatSelect.value.toLowerCase(); 
    const ancho = parseInt(document.querySelector('input[name="ancho"]').value);
    const alto = parseInt(document.querySelector('input[name="alto"]').value);

    if (isNaN(ancho) || isNaN(alto) || ancho <= 0 || alto <= 0) {
        alert('Por favor, introduce un ancho y alto válidos.');
        return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = ancho; 
    canvas.height = alto;

    ctx.drawImage(previewImage, 0, 0, canvas.width, canvas.height);


    const downloadLink = document.createElement('a');
    downloadLink.href = canvas.toDataURL(`image/${format}`); 
    downloadLink.download = `imagen.${format}`;
    downloadLink.click();
});

const anchoInput = document.querySelector('input[name="ancho"]');
const altoInput = document.querySelector('input[name="alto"]');
const mantenerRelacionCheckbox = document.getElementById('checkboxMantener');

anchoInput.addEventListener('input', function() {
    if (mantenerRelacionCheckbox.checked) {
        const aspectRatio = previewImage.naturalWidth / previewImage.naturalHeight;
        altoInput.value = Math.round(anchoInput.value / aspectRatio);
    }
    if (anchoInput.value > 0) {
        previewImage.style.width = `${anchoInput.value}px`;
    }
    if (altoInput.value > 0) {
        previewImage.style.height = `${altoInput.value}px`;
    }
});

altoInput.addEventListener('input', function() {
    if (mantenerRelacionCheckbox.checked) {
        const aspectRatio = previewImage.naturalWidth / previewImage.naturalHeight;
        anchoInput.value = Math.round(altoInput.value * aspectRatio);
    }
    if (anchoInput.value > 0) {
        previewImage.style.width = `${anchoInput.value}px`;
    }
    if (altoInput.value > 0) {
        previewImage.style.height = `${altoInput.value}px`;
    }
});



