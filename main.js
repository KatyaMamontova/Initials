function main() {
  const canvas = document.querySelector('.screen');
  const renderer = new THREE.WebGLRenderer({ canvas, antialiasing: true });
  //renderer.shadowMap.enabled = true;

  let fov = 100;
  const aspect = 2;
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;
  camera.position.y = 0.3;

  const scene = new THREE.Scene();

  let lightX = -1;
  let lightY = 2;
  const lightZ = 3;


  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.PointLight(color, intensity);
  //light.castShadow = true;
  //light.shadow.mapSize.width = 512;
  //light.shadow.mapSize.height = 512;
  light.angle = 0.5;
  light.position.set(lightX, lightY, lightZ);
  scene.add(light);

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = canvas.clientWidth * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRatio | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  //M

  const material1 = new THREE.MeshStandardMaterial({
    color: 0xAAFFFF,
    roughness: 0.3,
    metalness: 0.2
  });

  const widthLB = 0.3;
  const height = 1.6;
  const depthB = 0.2;
  const longBoxGeometry = new THREE.BoxGeometry(widthLB, height, depthB);
  const box1 = new THREE.Mesh(longBoxGeometry, material1);
  box1.position.x = -2.7;
  scene.add(box1);

  const widthSB = 0.2;
  const heightSB = 1;
  const shortBoxGeometry = new THREE.BoxGeometry(widthSB, heightSB, depthB);
  const box2 = new THREE.Mesh(shortBoxGeometry, material1);
  box2.position.x = box1.position.x + 0.42;
  box2.position.y = 0.38;
  box2.rotateZ(Math.PI / 4);
  scene.add(box2);

  const box3 = new THREE.Mesh(shortBoxGeometry, material1);
  box3.position.x = box2.position.x + 0.57;
  box3.position.y = box2.position.y;
  box3.rotateZ(-Math.PI / 4);
  scene.add(box3);

  const box4 = new THREE.Mesh(longBoxGeometry, material1);
  box4.position.x = box1.position.x + 1.42;
  scene.add(box4);

	const groupM = new THREE.Group();
	const meshM1 = new THREE.Mesh(box1, material1);
	const meshM2 = new THREE.Mesh(box2, material1);
	const meshM3 = new THREE.Mesh(box3, material1);
	const meshM4 = new THREE.Mesh(box4, material1);
	groupM.add(meshM1);
	groupM.add(meshM2);
	groupM.add(meshM3);
	groupM.add(meshM4);
	groupM.color = new THREE.Color(0x7777ff);


  //E

  const material2 = new THREE.MeshStandardMaterial({
    color: 0xFFAAFF,
    roughness: 0.3,
    metalness: 0.2
  });

  const radiusTop = 0.2;
  const radiusBottom = 0.2;
  const heightLC = height;
  const radialSegments = 12;
  const longCylinderGeometry = new THREE.CylinderGeometry(
    radiusTop, radiusBottom, heightLC, radialSegments);
  const cylinder1 = new THREE.Mesh(longCylinderGeometry, material2);
  cylinder1.position.x = -0.6;
  scene.add(cylinder1);

  const heightSC = 1;
  const shortCylinderGeometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, heightSC, radialSegments);
  const cylinder2 = new THREE.Mesh(shortCylinderGeometry, material2);
  cylinder2.position.x = cylinder1.position.x + 0.5;
  cylinder2.position.y = heightLC / 2 - 0.15;
  cylinder2.rotateZ(Math.PI / 2);
  scene.add(cylinder2);

  const cylinder3 = new THREE.Mesh(shortCylinderGeometry, material2);
  cylinder3.position.x = cylinder1.position.x + 0.5;
  cylinder3.rotateZ(Math.PI / 2);
  scene.add(cylinder3);

  const cylinder4 = new THREE.Mesh(shortCylinderGeometry, material2);
  cylinder4.position.x = cylinder1.position.x + 0.5;
  cylinder4.position.y = - heightLC / 2 + 0.15;
  cylinder4.rotateZ(Math.PI / 2);
  scene.add(cylinder4);

  //M

  const material3 = new THREE.MeshStandardMaterial({
    color: 0xFFFFAA,
    roughness: 0.3,
    metalness: 0.2
  });
  
  const widthLP = 0.3;
  const heightLP = height;
  const longPlaneGeometry = new THREE.PlaneGeometry(widthLP, heightLP);
  const plane1 = new THREE.Mesh(longPlaneGeometry, material3);
  plane1.position.x = 1;
  scene.add(plane1);

  const widthSP = 0.3;
  const heightSP = 1;
  const shortPlaneGeometry = new THREE.PlaneGeometry(widthSP, heightSP);
  const plane2 = new THREE.Mesh(shortPlaneGeometry, material3);
  plane2.position.x = plane1.position.x + 0.4;
  plane2.position.y = 0.35;
  plane2.rotateZ(Math.PI/4);
  scene.add(plane2);

  const plane3 = new THREE.Mesh(shortPlaneGeometry, material3);
  plane3.position.x = plane2.position.x + 0.5;
  plane3.position.y = plane2.position.y;
  plane3.rotateZ(-Math.PI/4);
  scene.add(plane3);

  const plane4 = new THREE.Mesh(longPlaneGeometry, material3);
  plane4.position.x = plane1.position.x + 1.3;
  scene.add(plane4);

  /* 
  const box4 = new THREE.Mesh(longBoxGeometry, material1);
  box4.position.x = box1.position.x + 1.42;
  scene.add(box4); */


  function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

window.onload = () => main();