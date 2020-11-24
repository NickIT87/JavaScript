var scene, camera, renderer;


// test example function
function lines() {
    var line_geometry = new THREE.Geometry();   // производная фигура
    line_geometry.vertices.push(new THREE.Vector3(0,0,0));  // x, y, z - создаем вектор
    line_geometry.vertices.push(new THREE.Vector3(100,0,0));
    line_geometry.vertices.push(new THREE.Vector3(100,100,0));
    line_geometry.vertices.push(new THREE.Vector3(0,100,0));
    line_geometry.vertices.push(new THREE.Vector3(0,0,0));


    var material_line = new THREE.LineBasicMaterial({color: 0x5BC2D5, linewidth: 1, opacity: 1});

    var line = new THREE.Line(line_geometry, material_line); // реальный объект

    console.log("lines");

    return line;
}


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

    // light helper
    var light = new THREE.DirectionalLight( 0xFFFFFF );
    var helper = new THREE.DirectionalLightHelper( light, 155 );
    scene.add( helper );
    

    // main logic  
    //scene.add(lines());      // test function
    scene.add(custom_triangle());


    // start app
    renderer.render(scene, camera);
}


function custom_triangle() {

    var line_geometry = new THREE.Geometry();   // производная фигура
    line_geometry.vertices.push(new THREE.Vector3(100,100,0));  // x, y, z - создаем вектор
    line_geometry.vertices.push(new THREE.Vector3(0,100,0));
    line_geometry.vertices.push(new THREE.Vector3(100,0,0));
    line_geometry.vertices.push(new THREE.Vector3(0,0,0));
    line_geometry.vertices.push(new THREE.Vector3(-1000,0,0));


    var material_line = new THREE.LineBasicMaterial({color: 0x00FF00, linewidth: 1, opacity: 1});

    var line = new THREE.Line(line_geometry, material_line); // реальный объект

    console.log("custom triangle");
    
    return line;
}

