var i = 0;
window.onload = function() {
    // try {
    //     document.getElementById("autoplayer").play();
    // } catch (error) {
    //     console.log(error);
    // }
    var body = document.getElementById('body');
    var videoplayer = document.getElementById('videoplayer');
    if (i == 0) {
        body.addEventListener('mouseenter', e => videoplayer.play());
    } else {
        body.removeEventListener('mouseenter');
    }
}

