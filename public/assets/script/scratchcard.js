function ScratchCard(tdname, element, options, ownerDocument) {

    // apply default arguments.
    var defaultOptions = {
        'color': 'gray',
        'radius': 15
    };
    if (options) {
        for (var key in defaultOptions) {
            if (!(key in options)) {
                options[key] = defaultOptions[key];
            }
        }
    } else {
        options = defaultOptions;
    }


    // canvas validate.
    var canvas = document.createElement('canvas');
    if (typeof canvas.getContext != 'function')
        return console.log('Canvas not supported.');
    var picDiv = $(tdname);
   
    canvas.width = picDiv.innerWidth();
    canvas.height = picDiv.innerHeight();
    // console.log(picDiv.outerWidth(), picDiv.outerHeight());
    // console.log(picDiv.offset().top, picDiv.offset().left);
    canvas.style.top = picDiv.offset().top + 'px';
    canvas.style.left = picDiv.offset().left + 'px';

    canvas.style.position = 'absolute';
    canvas.style.zIndex = +element.style.zIndex + 1;

    // fill the canvas
    var context = canvas.getContext('2d');
    context.fillStyle = options.color;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.globalCompositeOperation = "destination-out";
    context.strokeStyle = "rgba(0,0,0,1)";

    // add mouse events to canvas
    // TODO: supply touch events
    // TODO: scratch from the outside
    function scratchStart(event) {

        if (event.button != 0) // not left button
            return;

        var x = event.offsetX || event.layerX;
        var y = event.offsetY || event.layerY;

        context.beginPath();
        context.arc(x, y, options.radius, 0, Math.PI * 2);
        context.fill();

        canvas.addEventListener('mousemove', scratchMove);
        document.addEventListener('mouseup', scratchEnd);
    }

    function scratchMove(event) {
        var x = event.offsetX || event.layerX;
        var y = event.offsetY || event.layerY;

        context.beginPath();
        context.arc(x, y, options.radius, 0, Math.PI * 2);
        context.fill();
    }

    function scratchEnd(event) {
        canvas.removeEventListener('mousemove', scratchMove);
        document.removeEventListener('mouseup', scratchEnd);
    }

    canvas.addEventListener('mousedown', scratchStart);

    // disable element interaction
    ['MozUserSelect',
        'msUserSelect',
        'oUserSelect',
        'webkitUserSelect',
        'pointerEvents'
    ]
    .filter(function(cssProp) {
        return cssProp in element.style;
    }).forEach(function(cssProp) {
        element.style[cssProp] = 'none';
    });

    // append canvas to body.
    document.body.appendChild(canvas);
}
