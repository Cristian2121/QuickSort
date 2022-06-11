var container = document.getElementById("array");
var entrada = prompt("Ingrese la cantidad de pivotes: ", 2);
var numPivotes = parseInt(entrada);
console.log(numPivotes)

// Función para generar la matriz de bloques
function generatearray() {
  for (var i = 0; i < numPivotes; i++) {
    // Devolver un valor de 1 a 100 (ambos inclusive)
    var value = Math.ceil(Math.random() * 100);
  
    // Creando elemento div
    var array_ele = document.createElement("div");
  
    // Agregar clase 'bloque' a div
    array_ele.classList.add("block");
  
    // Agregar estilo a div
    array_ele.style.height = `${value * 3}px`;
    array_ele.style.transform = `translate(${i * 30}px)`;
  
   // Creando elemento de etiqueta para mostrar
    // tamaño de un bloque en particular
    var array_ele_label = 
    document.createElement("label");
    array_ele_label.classList.add("block_id");
    array_ele_label.innerText = value;
  
    // Agregar elementos creados a index.html
    array_ele.appendChild(array_ele_label);
    container.appendChild(array_ele);
  }
}
  
// Función para generar índices
var count_container = 
document.getElementById("count");
function generate_idx() {
  for (var i = 0; i < numPivotes; i++) {
    // Creando elemento div
    var array_ele2 = document.createElement("div");
  
    // Agregar clase 'block2' a div
    array_ele2.classList.add("block2");
  
    // Agregar estilo a div
    array_ele2.style.height = `${numPivotes}px`;
    array_ele2.style.transform = `translate(${i * 30}px)`;
  
    // Agregar indixes
    var array_ele_label2 = 
    document.createElement("label");
    array_ele_label2.classList.add("block_id3");
    array_ele_label2.innerText = i;
  
    // Agregar elementos creados a index.html
    array_ele2.appendChild(array_ele_label2);
    count_container.appendChild(array_ele2);
  }
}
  
async function lometo_partition(l, r, delay = 700) {
  var blocks = document.querySelectorAll(".block");
  
  // almacenar el valor del elemento pivote
  var pivot = 
  Number(blocks[r].childNodes[0].innerHTML);
  var i = l - 1;
  blocks[r].style.backgroundColor = "red";
  document.
  getElementsByClassName("range")[0].innerText = `[${l},${r}]`;
  
  for (var j = l; j <= r - 1; j++) {
    // Para cambiar el color de fondo del
    // bloques a comparar
    blocks[j].style.backgroundColor = "yellow";
    // Esperar 700 milisegundos
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, delay)
    );
    var value = 
    Number(blocks[j].childNodes[0].innerHTML);
  
    // Para comparar el valor de dos bloques
    if (value < pivot) {
      i++;
      var temp1 = blocks[i].style.height;
      var temp2 = blocks[i].childNodes[0].innerText;
      blocks[i].style.height = blocks[j].style.height;
      blocks[j].style.height = temp1;
      blocks[i].childNodes[0].innerText =
      blocks[j].childNodes[0].innerText;
      blocks[j].childNodes[0].innerText = temp2;
      blocks[i].style.backgroundColor = "orange";
      if (i != j) blocks[j].style.backgroundColor = "pink";
      //Esperar 700 milisegundos
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, delay)
      );
    } else blocks[j].style.backgroundColor = "pink";
  }
  // Intercambiando el i-ésimo con el elemento pivote
  i++;
  var temp1 = blocks[i].style.height;
  var temp2 = blocks[i].childNodes[0].innerText;
  blocks[i].style.height = blocks[r].style.height;
  blocks[r].style.height = temp1;
  blocks[i].childNodes[0].innerText =
  blocks[r].childNodes[0].innerText;
  blocks[r].childNodes[0].innerText = temp2;
  blocks[r].style.backgroundColor = "pink";
  blocks[i].style.backgroundColor = "green";
  
  // Esperar 2100 milisegundos
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, delay * 3)
  );
  document.getElementsByClassName("range")[0].innerText = "";
  for (var k = 0; k < numPivotes; k++) 
  blocks[k].style.backgroundColor = "#6b5b95";
  return i;
}
  
// Función QuickSort asincrónica
async function QuickSort(l, r, delay = 100) {
  if (l < r) {
    // Almacenar el índice del elemento pivote después de la partición
    var pivot_idx = await lometo_partition(l, r);
    // Llamando recursivamente a la ordenación rápida para la partición izquierda
    await QuickSort(l, pivot_idx - 1);
    // Llamando recursivamente a la ordenación rápida para la partición derecha
    await QuickSort(pivot_idx + 1, r);
  }
}
  
// Llamando a la función generar matriz
generatearray();
  
// Llamando a la función generar_idx
generate_idx();
  
// Llamar a la función QuickSort
QuickSort(0, numPivotes - 1);