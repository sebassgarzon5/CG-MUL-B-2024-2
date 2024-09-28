// Configurar la escena, cámara y renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Materiales para los objetos
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Cubo blanco
const pyramidMaterial = new THREE.MeshPhongMaterial({ color: 0xffa500 }); // Pirámide naranja

// Crear un cubo
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

// Crear bordes para el cubo
const cubeEdges = new THREE.EdgesGeometry(cubeGeometry);
const cubeLine = new THREE.LineSegments(cubeEdges, new THREE.LineBasicMaterial({ color: 0x000000 }));
cube.add(cubeLine);

// Cargar una textura para la esfera
const textureLoader = new THREE.TextureLoader();
const sphereTexture = textureLoader.load('https://threejsfundamentals.org/threejs/resources/images/wall.jpg');

// Crear una esfera
const sphereGeometry = new THREE.SphereGeometry(0.7, 32, 32);
const sphereMaterial = new THREE.MeshPhongMaterial({ map: sphereTexture }); // Esfera con textura
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.x = 3; // Mover la esfera a la derecha
scene.add(sphere);

// Crear una pirámide
const pyramidGeometry = new THREE.CylinderGeometry(0, 0.5, 1, 4); // Pirámide con base cuadrada
const pyramid = new THREE.Mesh(pyramidGeometry, pyramidMaterial);
pyramid.position.x = -3; // Mover la pirámide a la izquierda
scene.add(pyramid);

// Crear bordes para la pirámide
const pyramidEdges = new THREE.EdgesGeometry(pyramidGeometry);
const pyramidLine = new THREE.LineSegments(pyramidEdges, new THREE.LineBasicMaterial({ color: 0x000000 }));
pyramid.add(pyramidLine);

// Añadir luz
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// Posición inicial de la cámara
camera.position.z = 5;

// Velocidades aleatorias para los objetos
const cubeSpeed = { x: (Math.random() - 0.5) * 0.02, y: (Math.random() - 0.5) * 0.02, z: (Math.random() - 0.5) * 0.02 };
const sphereSpeed = { x: (Math.random() - 0.5) * 0.02, y: (Math.random() - 0.5) * 0.02, z: (Math.random() - 0.5) * 0.02 };
const pyramidSpeed = { x: (Math.random() - 0.5) * 0.02, y: (Math.random() - 0.5) * 0.02, z: (Math.random() - 0.5) * 0.02 };

// Velocidades de rotación
const cubeRotationSpeed = 0.02; // Velocidad de rotación del cubo
const sphereRotationSpeed = 0.03; // Velocidad de rotación de la esfera
const pyramidRotationSpeed = 0.04; // Velocidad de rotación de la pirámide

// Función de animación
function animate() {
    requestAnimationFrame(animate);

    // Actualizar posiciones de los objetos
    cube.position.x += cubeSpeed.x;
    cube.position.y += cubeSpeed.y;
    cube.position.z += cubeSpeed.z;

    sphere.position.x += sphereSpeed.x;
    sphere.position.y += sphereSpeed.y;
    sphere.position.z += sphereSpeed.z;

    pyramid.position.x += pyramidSpeed.x;
    pyramid.position.y += pyramidSpeed.y;
    pyramid.position.z += pyramidSpeed.z;

    // Limitar el movimiento para que no salgan de la vista
    const limit = 5; // Limitar a +/- 5 en cada eje
    [cube, sphere, pyramid].forEach(object => {
        object.position.x = Math.max(-limit, Math.min(limit, object.position.x));
        object.position.y = Math.max(-limit, Math.min(limit, object.position.y));
        object.position.z = Math.max(-limit, Math.min(limit, object.position.z));
    });

    // Rotación de los objetos
    cube.rotation.x += cubeRotationSpeed; 
    cube.rotation.y += cubeRotationSpeed;

    sphere.rotation.x += sphereRotationSpeed; 
    sphere.rotation.y += sphereRotationSpeed;

    pyramid.rotation.x += pyramidRotationSpeed; 
    pyramid.rotation.y += pyramidRotationSpeed;

    // Renderizar la escena
    renderer.render(scene, camera);
}

animate();

// Ajuste de la ventana cuando se cambia el tamaño
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
