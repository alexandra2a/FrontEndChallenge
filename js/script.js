const canvas = document.getElementById('canvas');
let elementsList = [];
let curentElement = null;
let mouse = {
    x: 0,
    y: 0
};

//click
canvas.onmousedown = function (e) {
    curentElement = createDiv("Div" + elementsList.length, mouse.x, mouse.y)
    canvas.appendChild(curentElement)
}

//drag
canvas.onmousemove = function (e) {
    setMousePosition(e);
    if (curentElement !== null) {
        curentElement.style.width = Math.abs(mouse.x - curentElement.startX) + 'px';
        curentElement.style.height = Math.abs(mouse.y - curentElement.startY) + 'px';
        curentElement.style.left = (mouse.x - curentElement.startX < 0) ? mouse.x + 'px' : curentElement.startX + 'px';
        curentElement.style.top = (mouse.y - curentElement.startY < 0) ? mouse.y + 'px' : curentElement.startY + 'px';
    }
}

//drop
canvas.onmouseup = function (e) {
    elementsList.push(curentElement);
    curentElement = null;
}

function setMousePosition(ev) {
    mouse.x = ev.pageX + window.pageXOffset;
    mouse.y = ev.pageY + window.pageYOffset;
};

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function isAllRotationDone() {
    const rectDivList = document.querySelectorAll(".rectangle")
    for (let i = 0; i < rectDivList.length - 1; i++) {
        if (rectDivList[i].rotationInProgress) {
            return false;
        }
    }

    return true;
}

function removeAllRotationDone() {
    var el = document.querySelectorAll(".rectangle")
    for (var i = 0, ilen = el.length - 1; i < ilen; i++) {
        if (el[i].rotationDone) {
            canvas.removeChild(el[i])
        }
    }
}

// create rectangle div with dblclick event
function createDiv(id, left, top, width = 0, height = 0) {
    const rotationDurationInSeconds = 3;
    let element = {};
    element = document.createElement('div');
    element.setAttribute("id", id);
    element.className = 'rectangle';
    element.style.background = "rgb(" + randomIntFromInterval(0, 255) + ", " + randomIntFromInterval(0, 255) + ", " + randomIntFromInterval(0, 255) + ")";
    element.style.left = left + 'px';
    element.style.top = top + 'px';
    element.rotationInProgress = false;
    element.rotationDone = false;
    element.startX = left;
    element.startY = top;

    // dblclick event must rotate and remove the div
    element.ondblclick = function (e) {
        // because the click event had create a div, we delete it
        elementsList.pop();

        // rotation
        this.style.WebkitTransitionDuration = rotationDurationInSeconds + 's';
        this.style.webkitTransform = 'rotate(360deg)'; // not obsolete in the W3C Recommendation.
        this.rotationInProgress = true;

        // remove, at the end of rotation
        setTimeout(() => {
            this.rotationInProgress = false;
            this.rotationDone = true;
            if (isAllRotationDone()) {
                removeAllRotationDone();
            }
        }, rotationDurationInSeconds * 1000);
    }

    return element;
};