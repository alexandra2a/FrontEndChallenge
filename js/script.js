const canvas = document.getElementById('canvas');
var mouse = {
    x: 0,
    y: 0,
    startX: 0,
    startY: 0
};

function setMousePosition(ev) {
    mouse.x = ev.pageX + window.pageXOffset;
    mouse.y = ev.pageY + window.pageYOffset;
    document.getElementById('mouse').innerText = mouse.x + ' ' + mouse.y;
};


var element = null;

canvas.onmousemove = function (e) {
    setMousePosition(e);
    if (element !== null) {
        element.style.width = Math.abs(mouse.x - mouse.startX) + 'px';
        element.style.height = Math.abs(mouse.y - mouse.startY) + 'px';
        element.style.left = (mouse.x - mouse.startX < 0) ? mouse.x + 'px' : mouse.startX + 'px';
        element.style.top = (mouse.y - mouse.startY < 0) ? mouse.y + 'px' : mouse.startY + 'px';
    }
}

canvas.onclick = function (e) {
    if (element !== null) {
        element = null;
        canvas.style.cursor = "default";
        console.log("finsihed.");
    } else {
        console.log("begun.");
        mouse.startX = mouse.x;
        mouse.startY = mouse.y;
        element = document.createElement('div');
        element.setAttribute("id", "div0");
        element.className = 'rectangle'
        element.style.left = mouse.x + 'px';
        element.style.top = mouse.y + 'px';
        canvas.appendChild(element)
        canvas.style.cursor = "crosshair";
    }
}

document.getElementById('rotate').onclick = function (e) {
    setInterval(function () {
        document.getElementById('div0').style.WebkitTransitionDuration = '1s';
        document.getElementById('div0').style.webkitTransform = 'rotate(360deg)'; // not obsolete in the W3C Recommendation.
    }, 100);
}