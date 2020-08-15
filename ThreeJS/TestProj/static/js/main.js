var scene, camera, renderer;

function init() {
    var container = document.createElement('div');
    container.className = "app";
    document.body.appendChild(container)
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.y = 150;
    camera.position.z = 600;
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    
    // main logic  
    scene.add(lines());
    // light helper
    var light = new THREE.DirectionalLight( 0xFFFFFF );
    var helper = new THREE.DirectionalLightHelper( light, 155 );
    scene.add( helper );
    // myplane not visible
    scene.add(myplane());
    

    // start app
    renderer.render(scene, camera);
}


function myplane() {

    var geometry = new THREE.PlaneGeometry(Window.innerWidth / Window.innerHeight);
    geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI/2));
    var material = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
    var plane = new THREE.Mesh(geometry, material);

    console.log("my plane")
    return plane;

}


function lines() {
    var line_geometry = new THREE.Geometry();   // производная фигура
    line_geometry.vertices.push(new THREE.Vector3(0,0,0));  // x, y, z - создаем вектор
    line_geometry.vertices.push(new THREE.Vector3(100,0,0));
    line_geometry.vertices.push(new THREE.Vector3(100,100,0));
    line_geometry.vertices.push(new THREE.Vector3(0,100,0));
    line_geometry.vertices.push(new THREE.Vector3(0,0,0));


    var material_line = new THREE.LineBasicMaterial({color: 0x5BC2D5, linewidth: 1, opacity: 1});

    var line = new THREE.Line(line_geometry, material_line); // реальный объект


    return line;
}