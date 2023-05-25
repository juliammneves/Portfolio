/* //Dark mode
const body = document.querySelector('body');
const modeToggle = document.querySelector('.mode');

modeToggle.addEventListener('click', () => {
    body.classList.toggle('dark')
}) */

//typed js
const typed = new Typed('.multiple-text', {
    strings: ['Web Developer', 'Web Designer', 'Software Engineer', 'Data Scientist'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

//show scroll up
const scrollUp = () =>{
    const scrollUp = document.getElementById('scroll-up')
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                        : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)
//muda o texto
function changeText(selectedInput) {
    const selectedOption = selectedInput.id;
    const textElement = document.getElementById('selected-option');

    switch (selectedOption) {
        case 'option1':
            textElement.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Futura engenheira de Software apaixonada por tecnologia e em constante busca por desafios e oportunidades para criar soluções inovadoras.';
            break;
        case 'option4':
            textElement.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sou uma entusiasta da Engenharia de Software. Com um foco especial em front-end, estou sempre buscando aprimorar minhas habilidades em HTML, CSS e JavaScript para criar experiências web incríveis. Além disso, tenho um interesse crescente em back-end e data science, explorando linguagens como Python e aprendizado de máquina. Sou uma profissional comprometida, criativa e apaixonada por resolver problemas complexos. Com uma abordagem colaborativa, estou pronta para contribuir em projetos desafiadores e alcançar resultados excepcionais. Vamos juntos criar soluções impactantes e inovadoras!';
            break;
        case 'option6':
            textElement.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sou uma estudante de engenharia de software na FIAP, apaixonada por tecnologia e inovação. Com apenas 18 anos, estou em constante aprendizado e buscando aprimorar minhas habilidades em diversas linguagens de programação. Atualmente, tenho me dedicado mais ao front-end, onde encontro uma grande satisfação em criar interfaces interativas e atraentes para os usuários. <br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Além do front-end, tenho um forte interesse em outras áreas da tecnologia, como o back-end e Data Science. Entendo que a combinação desses conhecimentos pode resultar em soluções mais completas e eficientes. Estou sempre em busca de desafios que me permitam expandir minha capacidade e aprofundar meu conhecimento nessas áreas. Com um perfil versátil e uma vontade incansável de aprender, estou pronta para enfrentar os desafios do mundo da tecnologia e contribuir para o desenvolvimento de soluções inovadoras.';
            break;
        default:
            textElement.textContent = 'Selecione uma opção.';
            break;
    }
}



//desenho
(function (window) {
    var ctx,
        hue,
        logo,
        form,
        buffer,
        target = {},
        tendrils = [],
        settings = {};

    settings.debug = true;
    settings.friction = 0.5;
    settings.trails = 20;
    settings.size = 50;
    settings.dampening = 0.25;
    settings.tension = 0.98;

    Math.TWO_PI = Math.PI * 2;

    // ========================================================================================
    // Oscillator 何问起
    // ----------------------------------------------------------------------------------------

    function Oscillator(options) {
        this.init(options || {});
    }

    Oscillator.prototype = (function () {

        var value = 0;

        return {

            init: function (options) {
                this.phase = options.phase || 0;
                this.offset = options.offset || 0;
                this.frequency = options.frequency || 0.001;
                this.amplitude = options.amplitude || 1;
            },

            update: function () {
                this.phase += this.frequency;
                value = this.offset + Math.sin(this.phase) * this.amplitude;
                return value;
            },

            value: function () {
                return value;
            }
        };

    })();

    // ========================================================================================
    // Tendril hovertree.com
    // ----------------------------------------------------------------------------------------

    function Tendril(options) {
        this.init(options || {});
    }

    Tendril.prototype = (function () {

        function Node() {
            this.x = 0;
            this.y = 0;
            this.vy = 0;
            this.vx = 0;
        }

        return {

            init: function (options) {

                this.spring = options.spring + (Math.random() * 0.1) - 0.05;
                this.friction = settings.friction + (Math.random() * 0.01) - 0.005;
                this.nodes = [];

                for (var i = 0, node; i < settings.size; i++) {

                    node = new Node();
                    node.x = target.x;
                    node.y = target.y;

                    this.nodes.push(node);
                }
            },

            update: function () {

                var spring = this.spring,
                    node = this.nodes[0];

                node.vx += (target.x - node.x) * spring;
                node.vy += (target.y - node.y) * spring;

                for (var prev, i = 0, n = this.nodes.length; i < n; i++) {

                    node = this.nodes[i];

                    if (i > 0) {

                        prev = this.nodes[i - 1];

                        node.vx += (prev.x - node.x) * spring;
                        node.vy += (prev.y - node.y) * spring;
                        node.vx += prev.vx * settings.dampening;
                        node.vy += prev.vy * settings.dampening;
                    }

                    node.vx *= this.friction;
                    node.vy *= this.friction;
                    node.x += node.vx;
                    node.y += node.vy;

                    spring *= settings.tension;
                }
            },

            draw: function () {

                var x = this.nodes[0].x,
                    y = this.nodes[0].y,
                    a, b;

                ctx.beginPath();
                ctx.moveTo(x, y);

                for (var i = 1, n = this.nodes.length - 2; i < n; i++) {

                    a = this.nodes[i];
                    b = this.nodes[i + 1];
                    x = (a.x + b.x) * 0.5;
                    y = (a.y + b.y) * 0.5;

                    ctx.quadraticCurveTo(a.x, a.y, x, y);
                }

                a = this.nodes[i];
                b = this.nodes[i + 1];

                ctx.quadraticCurveTo(a.x, a.y, b.x, b.y);
                ctx.stroke();
                ctx.closePath();
            }
        };

    })();

    // ----------------------------------------------------------------------------------------

    function init(event) {

        document.removeEventListener('mousemove', init);
        document.removeEventListener('touchstart', init);

        document.addEventListener('mousemove', mousemove);
        document.addEventListener('touchmove', mousemove);
        document.addEventListener('touchstart', touchstart);

        mousemove(event);
        reset();
        loop();
    }

    function reset() {

        tendrils = [];

        for (var i = 0; i < settings.trails; i++) {

            tendrils.push(new Tendril({
                spring: 0.45 + 0.025 * (i / settings.trails)
            }));
        }
    }

    function loop() {

        if (!ctx.running) return;

        ctx.globalCompositeOperation = 'source-over';

        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.globalCompositeOperation = 'darker';
        ctx.strokeStyle = '#72a065';
        ctx.lineWidth = 1;

        if (ctx.frame % 60 == 0) {
            console.log(hue.update(), Math.round(hue.update()), hue.phase, hue.offset, hue.frequency, hue.amplitude);
        }

        for (var i = 0, tendril; i < settings.trails; i++) {
            tendril = tendrils[i];
            tendril.update();
            tendril.draw();
        }

        ctx.frame++;
        ctx.stats.update();
        requestAnimFrame(loop);
    }

    function resize() {
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
    }

    function start() {
        if (!ctx.running) {
            ctx.running = true;
            loop();
        }
    }

    function stop() {
        ctx.running = false;
    }

    function mousemove(event) {
        if (event.touches) {
            target.x = event.touches[0].pageX;
            target.y = event.touches[0].pageY;
        } else {
            target.x = event.clientX
            target.y = event.clientY;
        }
        event.preventDefault();
    }

    function touchstart(event) {
        if (event.touches.length == 1) {
            target.x = event.touches[0].pageX;
            target.y = event.touches[0].pageY;
        }
    }

    function keyup(event) {

        switch (event.keyCode) {
            case 32:
                save();
                break;
            default:
                // console.log(event.keyCode); hovertree.com
        }
    }


    function save() {

        if (!buffer) {

            buffer = document.createElement('canvas');
            buffer.width = screen.availWidth;
            buffer.height = screen.availHeight;
            buffer.ctx = buffer.getContext('2d');

            form = document.createElement('form');
            form.method = 'post';
            form.input = document.createElement('input');
            form.input.type = 'hidden';
            form.input.name = 'data';
            form.appendChild(form.input);

            document.body.appendChild(form);
        }

        buffer.ctx.fillStyle = 'rgba(8,5,16)';
        buffer.ctx.fillRect(0, 0, buffer.width, buffer.height);

        buffer.ctx.drawImage(canvas,
            Math.round(buffer.width / 2 - canvas.width / 2),
            Math.round(buffer.height / 2 - canvas.height / 2)
        );

        buffer.ctx.drawImage(logo,
            Math.round(buffer.width / 2 - logo.width / 4),
            Math.round(buffer.height / 2 - logo.height / 4),
            logo.width / 2,
            logo.height / 2
        );

        window.open(buffer.toDataURL(), 'wallpaper', 'top=0,left=0,width=' + buffer.width + ',height=' + buffer.height);

        // form.input.value = buffer.toDataURL().substr(22);
        // form.submit(); hovertree.com
    }

    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (fn) { window.setTimeout(fn, 1000 / 60) };
    })();

    window.onload = function () {

        ctx = document.getElementById('canvas').getContext('2d');
        ctx.stats = new Stats();
        ctx.running = true;
        ctx.frame = 1;

        logo = new Image();
        logo.src = 'ht' + 'tp://ho' + 'vertree.c' + 'om/themes/hvtimages/hvtlogo.p' + 'ng';

        hue = new Oscillator({
            phase: Math.random() * Math.TWO_PI,
            amplitude: 85,
            frequency: 0.0015,
            offset: 285
        });

        document.addEventListener('mousemove', init);
        document.addEventListener('touchstart', init);
        document.body.addEventListener('orientationchange', resize);
        window.addEventListener('resize', resize);
        window.addEventListener('keyup', keyup);
        window.addEventListener('focus', start);
        window.addEventListener('blur', stop);

        resize();

        if (window.DEBUG) {

            var gui = new dat.GUI();

            // gui.add(settings, 'debug');
            settings.gui.add(settings, 'trails', 1, 30).onChange(reset);
            settings.gui.add(settings, 'size', 25, 75).onFinishChange(reset);
            settings.gui.add(settings, 'friction', 0.45, 0.55).onFinishChange(reset);
            settings.gui.add(settings, 'dampening', 0.01, 0.4).onFinishChange(reset);
            settings.gui.add(settings, 'tension', 0.95, 0.999).onFinishChange(reset);

            document.body.appendChild(ctx.stats.domElement);
        }
    };

})(window);