const vendors = ['ms', 'moz', 'webkit', 'o'];
let lastTime = 0;
let _requestAnimationFrame = window.requestAnimationFrame;
let _cancelAnimationFrame = window.cancelAnimationFrame;

for(let x = 0; x < vendors.length && !_requestAnimationFrame; x++) {
  _requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
  _cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] ||
                         window[vendors[x]+'CancelRequestAnimationFrame'];
}

if (!_requestAnimationFrame) {
  _requestAnimationFrame = function (callback) {
      const currTime = (new Date()).getTime();
      const timeToCall = Math.max(0, 16 - (currTime - lastTime));
      const id = window.setTimeout(() => {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
  };
}

if (!_cancelAnimationFrame) {
  _cancelAnimationFrame = (id) => clearTimeout(id);
}

// Somehow "export requestAnimationFrame" didn't work with babel?
export {_requestAnimationFrame as requestAnimationFrame};
export {_cancelAnimationFrame as cancelAnimationFrame};
