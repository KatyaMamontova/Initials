function main() {
  const canvas = document.querySelector('.screen');
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialiasing: true
  });

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
  const loader = new THREE.TextureLoader();
  {

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

  //материалы

  const colorInput = document.getElementById('colorInput');
  colorInput.addEventListener('input', () => {
    materialColor.color.set(colorInput.value)
  })
  const materialColor = new THREE.MeshStandardMaterial({
    color: colorInput.value,
    roughness: 0.3,
    metalness: 0.2
  });


  const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(1024);
  const cubeCamera = new THREE.CubeCamera(1, 1000, cubeRenderTarget);
  const materialMirror = new THREE.MeshStandardMaterial({
    envMap: cubeRenderTarget.texture,
    roughness: 0.01,
    metalness: 1,
    side: THREE.DoubleSide,
  });


  const imgTexture = THREE.ImageUtils.loadTexture(
    "forest.jpg"
  );
  const materialImage = new THREE.MeshPhongMaterial({
    map: imgTexture,
    side: THREE.DoubleSide,
  });


  const materialTransparent = new THREE.MeshStandardMaterial({
    color: 0xFF1111,
    roughness: 0.3,
    metalness: 0.2,
    transparent: true,
    opacity: 0.5
  });


  uniforms2 = {
    "time": { value: 1.1 },
    resolution: { type: "v2", value: new THREE.Vector2 }
  };
  const materialShader = new THREE.ShaderMaterial({
    uniforms: uniforms2,
    vertexShader: document.getElementById('vs').textContent,
    fragmentShader: document.getElementById('fsBox').textContent,
    side: THREE.DoubleSide,
    transparent: true,
  });


  //M

  const widthLB = 0.3;
  const height = 1.6;
  const depthB = 0.2;
  const longBoxGeometry = new THREE.BoxGeometry(widthLB, height, depthB);
  const box1 = new THREE.Mesh(longBoxGeometry, materialMirror);

  const widthSB = 0.2;
  const heightSB = 1;
  const shortBoxGeometry = new THREE.BoxGeometry(widthSB, heightSB, depthB);
  const box2 = new THREE.Mesh(shortBoxGeometry, materialMirror);
  box2.position.x = box1.position.x + 0.42;
  box2.position.y = 0.38;
  box2.rotateZ(Math.PI / 4);

  const box3 = new THREE.Mesh(shortBoxGeometry, materialMirror);
  box3.position.x = box2.position.x + 0.57;
  box3.position.y = box2.position.y;
  box3.rotateZ(-Math.PI / 4);

  const box4 = new THREE.Mesh(longBoxGeometry, materialMirror);
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

  const radiusTop = 0.2;
  const radiusBottom = 0.2;
  const heightLC = height;
  const radialSegments = 12;
  const longCylinderGeometry = new THREE.CylinderGeometry(
    radiusTop, radiusBottom, heightLC, radialSegments);
  const cylinder1 = new THREE.Mesh(longCylinderGeometry, materialImage);

  const heightSC = 1;
  const shortCylinderGeometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, heightSC, radialSegments);
  const cylinder2 = new THREE.Mesh(shortCylinderGeometry, materialImage);
  cylinder2.position.x = cylinder1.position.x + 0.5;
  cylinder2.position.y = heightLC / 2 - radiusTop;
  cylinder2.rotateZ(Math.PI / 2);

  const cylinder3 = new THREE.Mesh(shortCylinderGeometry, materialImage);
  cylinder3.position.x = cylinder1.position.x + 0.5;
  cylinder3.rotateZ(Math.PI / 2);

  const cylinder4 = new THREE.Mesh(shortCylinderGeometry, materialImage);
  cylinder4.position.x = cylinder1.position.x + 0.5;
  cylinder4.position.y = -heightLC / 2 + radiusTop;
  cylinder4.rotateZ(Math.PI / 2);

  /* scene.add(cylinder1);
  scene.add(cylinder2);
  scene.add(cylinder3);
  scene.add(cylinder4); */

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

  const widthLP = 0.3;
  const heightLP = height;
  const longPlaneGeometry = new THREE.PlaneGeometry(widthLP, heightLP);
  const plane1 = new THREE.Mesh(longPlaneGeometry, materialShader);
  plane1.position.x = 1;

  const widthSP = 0.3;
  const heightSP = 1;
  const shortPlaneGeometry = new THREE.PlaneGeometry(widthSP, heightSP);
  const plane2 = new THREE.Mesh(shortPlaneGeometry, materialShader);
  plane2.position.x = plane1.position.x + 0.4;
  plane2.position.y = 0.35;
  plane2.rotateZ(Math.PI / 4);

  const plane3 = new THREE.Mesh(shortPlaneGeometry, materialShader);
  plane3.position.x = plane2.position.x + 0.5;
  plane3.position.y = plane2.position.y;
  plane3.rotateZ(-Math.PI / 4);

  const plane4 = new THREE.Mesh(longPlaneGeometry, materialShader);
  plane4.position.x = plane1.position.x + 1.3;

  /*  scene.add(plane1);
   scene.add(plane2);
   scene.add(plane3);
   scene.add(plane4); */

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


  //про материалы

  //выбор буквы кликом
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let currentMaterial = materialColor;
  let intersects;

  function onMouseClick(event) {

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    intersects = raycaster.intersectObjects(scene.children);

    for (let i = 0; i < intersects.length; i++) {
      intersects[i].object.material = currentMaterial;
    }
  }

  window.addEventListener('click', onMouseClick, false);
  //

  //выбор материала

  let materialInputs = document.querySelectorAll('input[name="material"]');

  materialInputs.forEach(input => {
    input.addEventListener('change', () => {
      currentMaterial =
        (input.value === 'mirror') ? materialMirror :
          (input.value === 'picture') ? materialImage :
            (input.value === 'transparency') ? materialTransparent :
              (input.value === 'shader') ? materialShader : materialColor
    });
  });


  function render(time) {
    time *= 0.001;
    uniforms2['time'].value = time;

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

    cubeCamera.update(renderer, scene);
    materialMirror.envMap = cubeRenderTarget.texture;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

window.onload = () => main();