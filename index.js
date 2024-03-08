let colorEl = document.getElementById("colorPicker");
let getColorBtn = document.getElementById("get-color-btn");
let getSchemeOptionEl = document.getElementById("select-option");
let colorsShowcasEl = document.getElementById("colors-showcase");
const colorAPI = "https://www.thecolorapi.com/scheme?hex=";
let colors = "";
let schemeOpt = "";
let color = "F584D2";

colorEl.addEventListener("change", function () {
  return (color = colorEl.value.slice(1));
});

getColorBtn.addEventListener("click", function () {
  apiCall();
});

getSchemeOptionEl.addEventListener("change", function (event) {
  return (schemeOpt = this.value);
});

function paintGridRow(colors) {
  let divColorsHtml = ""; // Inicializa la variable aquí para asegurarte de que empieza vacía cada vez que se llama a la función
  let divGridRowLabels = "";
  for (let i = 0; i < colors.length; i++) {
    divColorsHtml += `<div class="grid-item" style="background-color:${colors[i].value}"></div>`;
    divGridRowLabels += `<div class="grid-row-label" onclick="copyToClipboard(this)">${colors[i].value}</div>`;
  }
  document.getElementById("grid-row").innerHTML = divColorsHtml;
  document.getElementById("grid-row-labels").innerHTML = divGridRowLabels;
}

function copyToClipboard(hexadecimal) {
  // Accede al texto del elemento clickeado
  var codeToCopy = hexadecimal.textContent || hexadecimal.innerText;

  // Utiliza la API del Clipboard para copiar el texto
  navigator.clipboard
    .writeText(codeToCopy)
    .then(() => {
      // Alerta que muestra el texto copiado
      alert("Se ha copiado el código de color al portapapeles " + codeToCopy);
    })
    .catch((err) => {
      console.error("No fué posible copiar el código al portapapeles: ", err);
    });
}

function apiCall() {
  https: fetch(colorAPI + color + "&mode=" + schemeOpt + "&count=5", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      colors = data.colors.map((color) => color.hex);
      paintGridRow(colors);

      return colors;
    });
}
colorEl.value = "#ED40B7";
apiCall();
paintGridRow(colors);
