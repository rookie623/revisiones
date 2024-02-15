let vms = [];


// Obtener datos del almacenamiento local cuando se carga la página
if (localStorage.getItem('vms')) {
  vms = JSON.parse(localStorage.getItem('vms'));
  renderizarTabla();
}

function renderizarTabla() {
  const tablaVMs = document.getElementById('tablaVMs');
  tablaVMs.innerHTML = '';

  vms.forEach(vm => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${vm.nombre}</td>
      <td>${vm.ipAcceso}</td>
      <td>${vm.sistemaOperativo}</td>
      <td>${vm.datacenter}</td>
      <td>${vm.cluster}</td>
      <td>${vm.host}</td>
      <td>${vm.estado}</td>
      <td>${vm.espacioDisco} GB</td>
      <td>${vm.windowsUpdate}</td>
      <td>${vm.logAplicaciones}</td>
      <td>${vm.fechaChequeo}</td>
      <td>${vm.comentarios}</td>
      <td>
        <button type="button" class="btn btn-warning btn-sm" onclick="editarVM(${vm.id})">Editar</button>
        <button type="button" class="btn btn-danger btn-sm" onclick="eliminarVM(${vm.id})">Eliminar</button>
      </td>
    `;
    tablaVMs.appendChild(tr);
  });
}

function guardarEnLocalStorage(data, item) {
  localStorage.setItem(item, JSON.stringify(data));
}

function agregarVM(vmData) {
  const nuevaVM = {
    id: vms.length + 1,
    ...vmData
  };
  vms.push(nuevaVM);
  guardarEnLocalStorage(vms, 'vms');
  renderizarTabla();
}

function eliminarVM(id) {
  vms = vms.filter(vm => vm.id !== id);
  guardarEnLocalStorage(vms, 'vms');
  renderizarTabla();
}

function editarVM(id) {
  const vm = vms.find(vm => vm.id === id);
  if (vm) {
    document.getElementById('nombreVM').value = vm.nombre;
    document.getElementById('ipAcceso').value = vm.ipAcceso;
    document.getElementById('sistemaOperativo').value = vm.sistemaOperativo;
    document.getElementById('datacenter').value = vm.datacenter;
    document.getElementById('cluster').value = vm.cluster;
    document.getElementById('host').value = vm.host;
    document.getElementById('estado').value = vm.estado;
    //document.getElementById('espacioDisco').value = vm.espacioDisco;
    document.getElementById('windowsUpdate').value = vm.windowsUpdate;
    document.getElementById('logAplicaciones').value = vm.logAplicaciones;
    document.getElementById('fechaChequeo').value = vm.fechaChequeo;
    document.getElementById('comentarios').value = vm.comentarios;
  }
}


document.getElementById('crudForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const vmData = {
    nombre: document.getElementById('nombreVM').value,
    ipAcceso: document.getElementById('ipAcceso').value,
    sistemaOperativo: document.getElementById('sistemaOperativo').value,
    datacenter: document.getElementById('datacenter').value,
    cluster: document.getElementById('cluster').value,
    host: document.getElementById('host').value,
    estado: document.getElementById('estado').value,
    espacioDisco: document.getElementById('espacioDisco').value,
    windowsUpdate: document.getElementById('windowsUpdate').value,
    logAplicaciones: document.getElementById('logAplicaciones').value,
    fechaChequeo: document.getElementById('fechaChequeo').value,
    comentarios: document.getElementById('comentarios').value
  };
  agregarVM(vmData);
  document.getElementById('crudForm').reset();
});

document.getElementById('crudForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const fileInput = document.getElementById('imagen');
    const file = fileInput.files[0];
  
    // Verificar si se ha seleccionado un archivo
    if (file) {
      // Crear un objeto FileReader
      const reader = new FileReader();
  
      // Cuando el archivo se haya cargado
      reader.onload = function(event) {
        const imagenBase64 = event.target.result;
  
        // Aquí puedes hacer lo que quieras con la imagen, como mostrarla en la página o subirla al servidor
        console.log('Imagen cargada:', imagenBase64);
      };
  
      // Leer el archivo como una URL de datos (base64)
      reader.readAsDataURL(file);
    }
  });

  const listaDiscos = document.getElementById('listaDiscos')

  document.getElementById('agregarDisco').addEventListener('click', ()=>{
    let capacidad = document.getElementById('capacidad').value
    let ocupado = document.getElementById('ocupado').value
    let letra = document.getElementById('letra').value
    listaDiscos.innerHTML += `<li class="list-group-item">${letra}:\\ ${capacidad}GB - ${ocupado}GB disponible: ${capacidad - ocupado}GB</li>`
  })



renderizarTabla();
