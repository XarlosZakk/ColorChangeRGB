//! comienzo de la manipulacion del DOM
//capturamos los elementos del DOM
//* primero los del Input
const redSlider = document.getElementById("redSlider");
const greenSlider = document.getElementById("greenSlider");
const blueSlider = document.getElementById("blueSlider")
//* luego los que evaluan (value)
const redValue = document.getElementById("redValue")
const greenValue = document.getElementById("greenValue")
const blueValue = document.getElementById("blueValue")
//* por ultimo capturamos los visualizadores
const colorPreview = document.getElementById("colorPreview")
const rgbValue = document.getElementById("rgbValue")
const hexValue = document.getElementById("hexValue")
const copyButton = document.getElementById("copyButton")

//! esta funcion transformara el RGB al Hexadecimal

function rgbAhex(r, g, b) {
    const aHex = (n) => {
        const hex = parseInt(n).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };
    return "#" + aHex(r) + aHex(g) + aHex(b);
}

//! funcion para actualizar el color 
function actualizarColor() {
    const r = parseInt(redSlider.value);
    const g = parseInt(greenSlider.value);
    const b = parseInt(blueSlider.value);

    //actualizamos los valores mostrados
    redValue.textContent = r;
    greenValue.textContent = g;
    blueValue.textContent = b;

    // creamos los valores de los colores
    const rgbColor = `rgb(${r}, ${g}, ${b})`;
    const hexColor = rgbAhex(r, g, b).toUpperCase();

    //actualizamos la vista previa del color
    colorPreview.style.backgroundColor = rgbColor;

    //actualizamos los valores mostrados
    rgbValue.textContent = `RGB(${r}, ${g}, ${b})`;
    hexValue.textContent = hexColor;

    //actualizamos los gradientes de los sliders para una mejora visual
    updateSliderGradients(r, g, b);
}

//! funcion para actualizar los gradientes de los sliders
function updateSliderGradients(r, g, b) {
    //? para el slider rojo
    redSlider.style.backgroundColor = `linear-gradient(to right, rgb(0, ${g}, ${b}) 0%, rgb(255, ${g}, ${b}) 100%)`;
    //? para el slider verde
    greenSlider.style.background = `linear-gradient(to right, rgb(${r}, 0, ${b}) 0%, rgb(${r}, 255, ${b}) 100%)`;
    //? para el slider azul
    blueSlider.style.background = `linear-gradient(to right, rgb(${r}, ${g}, 0) 0%, rgb(${r}, ${g}, 255) 100%)`;
}

//espacio de la funcion copiar codigo hexadecimal

function copiarColorHexadecimal() {
    const hex = hexValue.textContent;
    navigator.clipboard
        .writeText(hex)
        .then(() => {
            const originalText = copyButton.textContent;
            copyButton.textContent = " ✅ !Copiado";
            copyButton.style.background = "linear-gradient (45deg, #667eea, #764ba2";

            setTimeout(() => {
                copyButton.textContent = originalText;
                copyButton.style.background = 
                    "linear-gradient(45deg, #667eea, #764ba2)";
            }, 1500);
        })
        .catch(() =>{
            const textArea = document.createElement("textarea")
            textArea.value = hex;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);

            const originalText = copyButton.textContent;
            copyButton.textContent =  "✅ ¡Copiado!";
            setTimeout (() => {
                copyButton.textContent = originalText;
            }, 1500);
        });
}
// -------------- fin -------------------

// Event listeners para los slider
redSlider.addEventListener("input", actualizarColor);
greenSlider.addEventListener("input", actualizarColor);
blueSlider.addEventListener("input", actualizarColor);

//event listener para el boton copiar

copyButton.addEventListener("click", copiarColorHexadecimal);

// inicializar el color
actualizarColor();
//
// agregacion de efectos de hover y animaciones adicionales

const sliders = [redSlider, greenSlider, blueSlider];
sliders.forEach((slider) => {
    slider.addEventListener("mouseenter", function (){
        this.style.transform = "scaleY(1.2)";
    })

    slider.addEventListener("mouseleave", function () {
        this.style.transform = "scaleY(1)";
    })
})