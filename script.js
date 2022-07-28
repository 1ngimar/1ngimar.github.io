var i = 0;
window.onload = function() {
    // try {
    //     document.getElementById("autoplayer").play();
    // } catch (error) {
    //     console.log(error);
    // }
    // var body = document.getElementById('body');
    // var videoplayer = document.getElementById('videoplayer');
    // if (i == 0) {
    //     body.addEventListener('mouseenter', e => videoplayer.play());
    // } else {
    //     body.removeEventListener('mouseenter');
    // }
    const svg = document.getElementById('advania-logo-1');
    svg.onclick = (e) => {
        const colors = ['red', 'green', 'blue', 'orange', 'pink', 'purple'];
        const rando = () => colors[Math.floor(Math.random() * colors.length)];
        document.documentElement.style.cssText = `
            --dark-color: ${rando()};
            --light-color: ${rando()};
        `
    }
}

