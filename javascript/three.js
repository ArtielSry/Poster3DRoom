// Crear una escena Three.JS
const scene = new THREE.Scene();

// Crear una cámara
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

let posterModel; // Variable para el modelo del poster
let pivot; // Variable para el grupo que actuará como nuevo pivote
let modelVisible = false; // Estado inicial para visibilidad del modelo

// Obtener el contenedor del canvas
const container = document.getElementById("container3D");

// Función para aplicar el fondo con desenfoque
function applyBackground() {
  container.style.background =
    "radial-gradient(circle, rgba(255,21,21,0) 12%, rgba(0,0,0,0.6643032212885154) 100%)";
  container.style.backdropFilter = "blur(8px)"; // Aplica desenfoque al fondo
}

// Función para eliminar el fondo
function removeBackground() {
  container.style.background = "";
  container.style.backdropFilter = ""; // Elimina el desenfoque del fondo
}

// Instanciar un cargador para el archivo .gltf
const loader = new THREE.GLTFLoader();

// Instanciar un nuevo renderer y ajustar su tamaño
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Configurar la posición de la cámara
camera.position.z = 45;

// Añadir luces a la escena
const topLight = new THREE.DirectionalLight(0xffffff, 2);
topLight.position.set(500, 500, 500);
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, 5);
scene.add(ambientLight);

// Añadir controles a la cámara
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Renderizar la escena
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// Manejar el cambio de tamaño de la ventana
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Comenzar el renderizado 3D
animate();

// Función para cargar y mostrar el modelo
function loadModel(url) {
  loader.load(
    url,
    function (gltf) {
      if (pivot) {
        scene.remove(pivot); // Eliminar el modelo actual del grupo
      }

      posterModel = gltf.scene;

      // Crear un grupo que actuará como el nuevo pivote
      pivot = new THREE.Group();
      pivot.add(posterModel);
      scene.add(pivot);

      // Ajustar el modelo
      posterModel.rotation.x = Math.PI / -20; // -20 grados alrededor del eje X
      posterModel.rotation.y = Math.PI / -2; // -2 grados alrededor del eje Y
      posterModel.rotation.z = 0; // 0 grados alrededor del eje Z
      posterModel.scale.set(17, 17, 17);
      posterModel.position.set(0, -5, 0);

      // Alternar visibilidad del modelo
      modelVisible = true;
      pivot.visible = modelVisible;
      applyBackground();
      container.style.zIndex = "1000"; // Aplicar z-index alto
      document.getElementById("close-btn").style.display = "block"; // Mostrar botón de cierre
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    function (error) {
      console.error(error);
    }
  );
}

// Función para manejar el clic del botón
function handleButtonClick(event) {
  const buttonElement = event.currentTarget; // Obtener el botón que fue clicado
  const modelUrl = buttonElement.getAttribute("data-model");
  if (modelUrl) {
    loadModel(modelUrl);
  } else {
    console.error("No data-model attribute found on the button.");
  }
}

// Añadir el event listener para el botón de cierre
document.getElementById("close-btn").addEventListener("click", () => {
  modelVisible = false; // Ocultar el modelo
  if (pivot) {
    pivot.visible = modelVisible; // Actualizar visibilidad del grupo
  }
  removeBackground(); // Eliminar fondo
  container.style.zIndex = ""; // Restablecer z-index
  document.getElementById("close-btn").style.display = "none"; // Ocultar botón de cierre
});

// Añadir el event listener a todos los botones
document.querySelectorAll(".green-button").forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});
