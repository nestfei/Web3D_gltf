const width=document.querySelector('#myCanvas').offsetWidth;
const height=document.querySelector('#myCanvas').offsetHeight;
	
// シーンの設定
const scene = new THREE.Scene();

//背景モデルを読み込む
const loader = new THREE.GLTFLoader();
/*loader.load( './model/sample.gltf', function ( gltf ) {
	scene.add( gltf.scene );
	//位置
	gltf.scene.position.set(0, 0, 0);
}, undefined, function ( error ) {
	console.error( error );
} );*/

//const texture = new THREE.TextureLoader().load( './model/ayame/tex_ayame_of_0.0' );

//人物gltfモデルを読み込む
//gltf-2/ayame-2
//matilda/scene
loader.load( './model/uni-change.gltf', function ( gltf ) {
	scene.add( gltf.scene );
	//位置
	gltf.scene.position.set(0, 0, 0);
	//回転 Math.PI=π=180°
	gltf.scene.rotateY(Math.PI);
	renderer.outputEncoding = THREE.sRGBEncoding;
	//texture.encoding = THREE.sRGBEncoding;
	//texture.flipY = false;
}, undefined, function ( error ) {
	console.error( error );
} );

// レンダラーの設定
const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('#myCanvas'),
	antialias: true,
	alpha: true,
});
renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// カメラの設定
const camera = new THREE.PerspectiveCamera(
 35,
 width / height,
 0.1,
 1000,
);
camera.position.set(0, 1.5, 3);

// カメラコントーロールの設定
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0.9, 0);
//controls.autoRotate = true;
//controls.autoRotateSpeed = 3;
//controls.enableZoom = false;
controls.enableKeys = false;
controls.maxPolarAngle = Math.PI/1.5;
//慣性
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.update();

// ライトの設定
const light = new THREE.DirectionalLight(0xffffff);
light.intensity = 0.85;
light.position.set(1, 1, 1).normalize();
scene.add(light);

// グリッドを表示（一時的）
const gridHelper = new THREE.GridHelper(30, 30);
scene.add(gridHelper);
gridHelper.visible = true;

// 座標軸を表示（一時的）
const axesHelper = new THREE.AxesHelper(1);
scene.add(axesHelper);

function tick() {
  // レンダリング
	renderer.render(scene, camera);
	requestAnimationFrame(tick);
	controls.update();
}
tick();