document.addEventListener('DOMContentLoaded', function() {
            const navItems = document.querySelectorAll('.nav-item');
            const toolSections = document.querySelectorAll('.tool-section');
            const dynamicBackground = document.getElementById('dynamic-background');

            // Initial setup for tool sections
            navItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    navItems.forEach(nav => nav.classList.remove('active'));
                    toolSections.forEach(section => section.classList.remove('active'));
                    
                    this.classList.add('active');
                    const targetTool = this.getAttribute('data-tool');
                    document.getElementById(targetTool).classList.add('active');
                });
            });

            // Dynamic background spheres
            const createSphere = (className, size, startX, startY) => {
                const sphere = document.createElement('div');
                sphere.classList.add('bg-sphere', className);
                sphere.style.width = `${size}px`;
                sphere.style.height = `${size}px`;
                sphere.style.left = `${startX}vw`;
                sphere.style.top = `${startY}vh`;
                dynamicBackground.appendChild(sphere);

                // Initial subtle movement
                sphere.style.transform = `translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px)`;

                return sphere;
            };

            const spheres = [
                createSphere('blue', 400, 10, 20),
                createSphere('dark-blue', 500, 80, 60),
                createSphere('blue', 300, 50, 10),
                createSphere('dark-blue', 350, 20, 90),
                createSphere('blue', 450, 90, 30)
            ];

            // Gentle continuous movement
            spheres.forEach(sphere => {
                let currentX = parseFloat(sphere.style.left);
                let currentY = parseFloat(sphere.style.top);
                let directionX = (Math.random() - 0.5) * 0.1; // Slower movement
                let directionY = (Math.random() - 0.5) * 0.1;

                setInterval(() => {
                    currentX += directionX;
                    currentY += directionY;

                    // Reverse direction if hitting boundaries (with some padding)
                    if (currentX < -10 || currentX > 110) directionX *= -1;
                    if (currentY < -10 || currentY > 110) directionY *= -1;

                    sphere.style.left = `${currentX}vw`;
                    sphere.style.top = `${currentY}vh`;
                }, 50); // Slower interval for smoother, less jittery movement
            });


            // Mouse interaction for background spheres
            document.addEventListener('mousemove', function(e) {
                const mouseX = e.clientX / window.innerWidth;
                const mouseY = e.clientY / window.innerHeight;

                spheres.forEach((sphere, index) => {
                    // Adjust spheres based on mouse position, with varied intensity
                    const moveX = (mouseX - 0.5) * (30 + index * 5); // More subtle movement
                    const moveY = (mouseY - 0.5) * (30 + index * 5);
                    sphere.style.transform = `translate(${moveX}px, ${moveY}px)`;
                });
            });
        });