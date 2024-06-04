import * as THREE from 'three';

export const initRender = () => {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setSize(window.innerWidth -48, window.innerHeight);

    const addStar = () => {
        const geometry = new THREE.SphereGeometry(0.2, 32, 16);
        const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
    }
    
    addStar()
    
    camera.position.z = 5;
    
    //light
    const pointLight = new THREE.PointLight(0xffffff)
    pointLight.position.set(5,5,5)

    const ambientLight = new THREE.AmbientLight(0xffffff)
    scene.add(pointLight,ambientLight)

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    
    animate();
} 
