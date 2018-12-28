$(window).load(function () {
    initStars();

    function initStars() {
        var topper_dom = $('#topper');
        var camera = new THREE.PerspectiveCamera(80, window.innerWidth/window.innerHeight, 1, 4000 );
        camera.position.z = 1000;
        var scene = new THREE.Scene();
        scene.add(camera);
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize( parseInt(topper_dom.width()), parseInt(topper_dom.height()));
        topper_dom.append( renderer.domElement );


        var starsGeometry = new THREE.Geometry();
        // starsGeometry.verticesNeedUpdate  = true;

        for ( var zpos= -1000; zpos < 1000; zpos+=5 ) {

            var star = new THREE.Vector3();
            star.x = THREE.Math.randFloatSpread( 1000 );
            star.y = THREE.Math.randFloatSpread( 1000 );
            star.z = zpos;

            starsGeometry.vertices.push( star );

        }

        var spriteMap = new THREE.TextureLoader().load( './img/roundstar.png' );
        var starsMaterial = new THREE.PointsMaterial( { color: 0x81dbeb, map: spriteMap, size: 4 } );
        var starField = new THREE.Points( starsGeometry, starsMaterial );

        scene.add( starField );

        starsGeometry.verticesNeedUpdate = true;
        document.addEventListener( 'mousemove', onMouseMove, false );



        function animate() {
            updateParticles();
            requestAnimationFrame( animate );
            renderer.render( scene, camera );
        }

        animate();

        function updateParticles() {
            for(let i=0; i<starsGeometry.vertices.length; i++) {
                particle = starsGeometry.vertices[i];
                particle.z += .5;
                starsGeometry.verticesNeedUpdate = true;
                if(particle.z>1000) particle.z-=2000;
            }
        }

        function onMouseMove( event ) {
            // Do nothing, based on scroll
        }

    }
    $('#topper').height($(window).height());
    $(window).on('resize', function () {
        $('#topper').height($(window).height());
        // Force better DOM repainting hack. Helps on mobile
        $('html').addClass('force-gpu').removeClass('force-gpu');
    });
});