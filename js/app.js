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

    // Ajustar el zoom
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

    document.querySelector('input[name="ancho"]').value = '0';
    document.querySelector('input[name="alto"]').value = '0';

    previewImage.classList.remove('image-loaded');
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