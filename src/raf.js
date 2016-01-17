const vendors = ['ms', 'moz', 'webkit', 'o'];
let lastTime = 0;
let requestAnimationFrame = window.requestAnimationFrame;
let cancelAnimationFrame = window.cancelAnimationFrame;

for(let x = 0; x < vendors.length && !requestAnimationFrame; x++) {
  requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
  cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] ||
                         window[vendors[x]+'CancelRequestAnimationFrame'];
}

if (!requestAnimationFrame) {
  requestAnimationFrame = function (callback) {
    const currTime = (new Date()).getTime();
    const timeToCall = Math.max(0, 16 - (currTime - lastTime));
    const id = window.setTimeout(() => {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
}

if (!cancelAnimationFrame) {
  cancelAnimationFrame = (id) => clearTimeout(id);
}

// Somehow "export requestAnimationFrame" didn't work with babel?
export {
  requestAnimationFrame,
  cancelAnimationFrame
};
