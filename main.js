function main() {
  const canvas = document.querySelector('.screen');
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialiasing: true
  });
  //renderer.shadowMap.enabled = true;

  let fov = 100;
  const aspect = 2;
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;
  camera.position.y = 0.3;

  const scene = new THREE.Scene();

  let lightX = 5;
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

  //фон

  {
    const loader = new THREE.TextureLoader();
    const texture = loader.load(
      'https://threejsfundamentals.org/threejs/resources/images/equirectangularmaps/tears_of_steel_bridge_2k.jpg',
      () => {
        const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
        rt.fromEquirectangularTexture(renderer, texture);
        scene.background = rt.texture;
      });
  }

  const controls = new THREE.OrbitControls(camera, canvas);
  controls.target.set(0, 0, 0);
  controls.update();

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

  const widthSB = 0.2;
  const heightSB = 1;
  const shortBoxGeometry = new THREE.BoxGeometry(widthSB, heightSB, depthB);
  const box2 = new THREE.Mesh(shortBoxGeometry, material1);
  box2.position.x = box1.position.x + 0.42;
  box2.position.y = 0.38;
  box2.rotateZ(Math.PI / 4);

  const box3 = new THREE.Mesh(shortBoxGeometry, material1);
  box3.position.x = box2.position.x + 0.57;
  box3.position.y = box2.position.y;
  box3.rotateZ(-Math.PI / 4);

  const box4 = new THREE.Mesh(longBoxGeometry, material1);
  box4.position.x = box1.position.x + 1.42;

  const groupM1 = new THREE.Group();
  groupM1.add(box1);
  groupM1.add(box2);
  groupM1.add(box3);
  groupM1.add(box4);

  const boxObjM1 = new THREE.Object3D();
  boxObjM1.add(groupM1);

  const boxM1 = new THREE.Box3().setFromObject(boxObjM1);
  boxM1.getCenter(boxObjM1.position);
  boxObjM1.position.multiplyScalar(- 1);

  const pivotM1 = new THREE.Group();
  pivotM1.position.x = -1.6;
  scene.add(pivotM1);
  pivotM1.add(boxObjM1);


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

  const heightSC = 1;
  const shortCylinderGeometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, heightSC, radialSegments);
  const cylinder2 = new THREE.Mesh(shortCylinderGeometry, material2);
  cylinder2.position.x = cylinder1.position.x + 0.5;
  cylinder2.position.y = heightLC / 2 - radiusTop;
  cylinder2.rotateZ(Math.PI / 2);

  const cylinder3 = new THREE.Mesh(shortCylinderGeometry, material2);
  cylinder3.position.x = cylinder1.position.x + 0.5;
  cylinder3.rotateZ(Math.PI / 2);

  const cylinder4 = new THREE.Mesh(shortCylinderGeometry, material2);
  cylinder4.position.x = cylinder1.position.x + 0.5;
  cylinder4.position.y = -heightLC / 2 + radiusTop;
  cylinder4.rotateZ(Math.PI / 2);

  const groupE = new THREE.Group();
  groupE.add(cylinder1);
  groupE.add(cylinder2);
  groupE.add(cylinder3);
  groupE.add(cylinder4);

  const boxObjE = new THREE.Object3D();
  boxObjE.add(groupE);

  const boxE = new THREE.Box3().setFromObject(boxObjE);
  boxE.getCenter(boxObjE.position);
  boxObjE.position.multiplyScalar(- 1);

  const pivotE = new THREE.Group();
  pivotE.position.x = 0.1;
  scene.add(pivotE);
  pivotE.add(boxObjE);

  //M2

  const material3 = new THREE.MeshStandardMaterial({
    color: 0xFFFFAA,
    roughness: 0.3,
    metalness: 0.2,
    side: THREE.DoubleSide
  });

  const widthLP = 0.3;
  const heightLP = height;
  const longPlaneGeometry = new THREE.PlaneGeometry(widthLP, heightLP);
  const plane1 = new THREE.Mesh(longPlaneGeometry, material3);
  plane1.position.x = 1;

  const widthSP = 0.3;
  const heightSP = 1;
  const shortPlaneGeometry = new THREE.PlaneGeometry(widthSP, heightSP);
  const plane2 = new THREE.Mesh(shortPlaneGeometry, material3);
  plane2.position.x = plane1.position.x + 0.4;
  plane2.position.y = 0.35;
  plane2.rotateZ(Math.PI / 4);

  const plane3 = new THREE.Mesh(shortPlaneGeometry, material3);
  plane3.position.x = plane2.position.x + 0.5;
  plane3.position.y = plane2.position.y;
  plane3.rotateZ(-Math.PI / 4);

  const plane4 = new THREE.Mesh(longPlaneGeometry, material3);
  plane4.position.x = plane1.position.x + 1.3;

  const groupM2 = new THREE.Group();
  groupM2.add(plane1);
  groupM2.add(plane2);
  groupM2.add(plane3);
  groupM2.add(plane4);

  const boxObjM2 = new THREE.Object3D();
  boxObjM2.add(groupM2);

  const boxM2 = new THREE.Box3().setFromObject(boxObjM2);
  boxM2.getCenter(boxObjM2.position);
  boxObjM2.position.multiplyScalar(- 1);

  const pivotM2 = new THREE.Group();
  pivotM2.position.x = 1.8;
  scene.add(pivotM2);
  pivotM2.add(boxObjM2);


  //клавиши 1, 2, 3

  let needRotateM1 = false;
  let needRotateE = false;
  let needRotateM2 = false;

  document.addEventListener('keyup', event => {
    (event.code == 'Digit1') ? needRotateM1 = true :
      (event.code == 'Digit2') ? needRotateE = true :
        (event.code == 'Digit3') ? needRotateM2 = true : () => {
          needRotateM1 = false;
          needRotateE = false;
          needRotateM2 = false;
        };
  });

  const step = Math.PI / 100;
  let angleM1 = 0;
  let angleE = 0;
  let angleM2 = 0;

  function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    if (needRotateM1) {
      if (angleM1 < 2 * Math.PI) {
        angleM1 += step;
        pivotM1.rotation.set(0, angleM1, 0);
      } else {
        angleM1 = 0;
        needRotateM1 = false;
      }
    }

    if (needRotateE) {
      if (angleE < 2 * Math.PI) {
        angleE += step;
        pivotE.rotation.set(0, angleE, 0);
      } else {
        angleE = 0;
        needRotateE = false;
      }
    }

    if (needRotateM2) {
      if (angleM2 < 2 * Math.PI) {
        angleM2 += step;
        pivotM2.rotation.set(0, angleM2, 0);
      } else {
        angleM2 = 0;
        needRotateM2 = false;
      }
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

window.onload = () => main();