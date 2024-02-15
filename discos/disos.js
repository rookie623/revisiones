function guardarEnLocalStorage(data, item) {
    localStorage.setItem(item, JSON.stringify(data));
  }

let discos = [];

document.addEventListener('DOMContentLoaded', function () {
    const letraUnidadSelect = document.getElementById('letraUnidad');
  
    // Generar las opciones del select con las letras del abecedario
    for (let letra = 65; letra <= 90; letra++) {
      const option = document.createElement('option');
      option.value = String.fromCharCode(letra);
      option.text = String.fromCharCode(letra);
      letraUnidadSelect.appendChild(option);
    }
    const discoForm = document.getElementById('discoForm');
    const tablaDiscos = document.getElementById('tablaDiscos');

    discoForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Obtener valores del formulario
        const capacidad = document.getElementById('capacidad').value;
        const espacioOcupado = document.getElementById('espacioOcupado').value;
        const espacioDisponible = capacidad - espacioOcupado;
        const nombre = document.getElementById('nombre').value;
        const letraUnidad = document.getElementById('letraUnidad').value;

        // Crear una nueva fila para la tabla
        const newRow = tablaDiscos.insertRow();

        // Insertar celdas en la fila
        newRow.innerHTML = `
            <td>${capacidad}</td>
            <td>${espacioOcupado}</td>
            <td>${espacioDisponible}</td>
            <td>${nombre}</td>
            <td>${letraUnidad}</td>
            <td><button class="btn btn-danger btn-sm delete-btn">Eliminar</button></td>
        `;

        // Limpiar el formulario después de agregar un disco
        discoForm.reset();
    });

    // Agregar evento de delegación para eliminar discos
    tablaDiscos.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-btn')) {
            event.target.closest('tr').remove();
        }
    });
});

document.getElementById('agregarDisco').addEventListener('click', function() {
    guardarEnLocalStorage(discos, "discos")
  });
    

  
