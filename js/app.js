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

// Descarga de imagen
document.querySelector('.btn-download').addEventListener('click', function() {
    const formatSelect = document.querySelector('select');
    const format = formatSelect.value.toLowerCase(); // Obtener el formato seleccionado (jpg o png)
    const ancho = parseInt(document.querySelector('input[name="ancho"]').value); // Ancho especificado
    const alto = parseInt(document.querySelector('input[name="alto"]').value); // Alto especificado

    if (isNaN(ancho) || isNaN(alto) || ancho <= 0 || alto <= 0) {
        alert('Por favor, introduce un ancho y alto válidos.');
        return;
    }

    // Crear un canvas para redimensionar la imagen
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = ancho; // Usar el ancho especificado
    canvas.height = alto; // Usar el alto especificado

    // Dibujar la imagen redimensionada en el canvas
    ctx.drawImage(previewImage, 0, 0, canvas.width, canvas.height);

    // Crear el enlace de descarga
    const downloadLink = document.createElement('a');
    downloadLink.href = canvas.toDataURL(`image/${format}`); // Convertir a jpg o png
    downloadLink.download = `imagen.${format}`; // Nombre del archivo
    downloadLink.click(); // Iniciar la descarga
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
