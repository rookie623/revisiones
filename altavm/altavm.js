let vms = [];
let discos = [];

//renderizar localStorage
 if (localStorage.getItem('vms')) {
  vms = JSON.parse(localStorage.getItem('vms'));
  renderizarTabla();
}

function renderizarTabla() {
  const tablaVMs = document.getElementById("tablaVMs");
  tablaVMs.innerHTML = "";

  vms.forEach((vm) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${vm.nombre}</td>
      <td>${vm.ipAcceso}</td>
      <td>${vm.sistemaOperativo}</td>
      <td>${vm.discos.length}</td>
      <td>${vm.datacenter}</td>
      <td>${vm.cluster}</td>
      <td>${vm.host}</td>
      <td>${vm.estado}</td>
      <td>${vm.comentarios}</td>
      <td>
      <div class="row align-items-start">
      <button type="button" class="col btn btn-warning btn-sm" onclick="editarVM(${vm.id})">Editar</button>
      <button type="button" class="col btn btn-danger btn-sm" onclick="eliminarVM(${vm.id})">Eliminar</button>
      <div>
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
    ...vmData,
  };
  vms.push(nuevaVM);
  guardarEnLocalStorage(vms, "vms");
  renderizarTabla();
}

function agregarDisco(discData) {
  const disco = {
    id: discos.length + 1,
    ...discData,
  };
  discos.push(disco);
}

function eliminarVM(id) {
  vms = vms.filter((vm) => vm.id !== id);
  guardarEnLocalStorage(vms, "vms");
  renderizarTabla();
}

function editarVM(id) {
  const vm = vms.find((vm) => vm.id === id);
  if (vm) {
    document.getElementById("nombreVM").value = vm.nombre;
    document.getElementById("ipAcceso").value = vm.ipAcceso;
    document.getElementById("datacenter").value = vm.datacenter;
    document.getElementById("cluster").value = vm.cluster;
    document.getElementById("host").value = vm.host;
    document.getElementById("estado").value = vm.estado;
    vm.discos.forEach(disco => {
      listaDiscos.innerHTML += `<li class="list-group-item">${disco.letra}:\\ ${disco.capacidad}GB - ${disco.ocupado}GB disponible: ${disco.capacidad - disco.ocupado}GB <button type="button" class="col btn btn-danger btn-sm" onclick="eliminarVM()">Eliminar</button></li>`;
    });
    document.getElementById("comentarios").value = vm.comentarios;
  }
}

document
  .getElementById("crudForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const vmData = {
      nombre: document.getElementById("nombreVM").value,
      ipAcceso: document.getElementById("ipAcceso").value,
      sistemaOperativo: document.getElementById("os").value,
      datacenter: document.getElementById("datacenter").value,
      cluster: document.getElementById("cluster").value,
      host: document.getElementById("host").value,
      estado: document.getElementById("estado").value,
      discos: discos,
      comentarios: document.getElementById("comentarios").value,
    };
    agregarVM(vmData);
    document.getElementById("crudForm").reset();
    listaDiscos.innerHTML = ''
    discos = []
  });

const listaDiscos = document.getElementById("listaDiscos");

document.getElementById("agregarDisco").addEventListener("click", () => {
  let capacidad = document.getElementById("capacidad").value;
  let ocupado = document.getElementById("ocupado").value;
  let letra = document.getElementById("letra").value;
  const discData = {
    capacidad: capacidad,
    ocupado: ocupado,
    letra: letra,
    disponible: capacidad - ocupado,
  };
  agregarDisco(discData)
  listaDiscos.innerHTML += `<li class="list-group-item">${letra}:\\ ${capacidad}GB - ${ocupado}GB disponible: ${capacidad - ocupado}GB <button type="button" class="col btn btn-danger btn-sm" onclick="eliminarVM()">Eliminar</button></li>`;
});

renderizarTabla();
