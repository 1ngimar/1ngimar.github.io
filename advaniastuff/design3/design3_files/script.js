const SVG = 'advania-logo-1';
const RIGHTGROUP = 'rightGroup'
const LEFTGROUP = 'leftGroup'
const TOPGROUP = 'topGroup'


var i = 0;

window.onload = function() {
    const svg = document.getElementById(SVG);

    var mainGroups = [];
    mainGroups.push(document.getElementById(RIGHTGROUP));
    mainGroups.push(document.getElementById(LEFTGROUP));
    mainGroups.push(document.getElementById(TOPGROUP));
    

    // svg.onmouseover

    // svg.onclick = () => {
    //     const colors = ['red', 'green', 'blue', 'orange', 'pink', 'purple'];
    //     const rando = () => colors[Math.floor(Math.random() * colors.length)];
    //     document.documentElement.style.cssText = `
    //         --dark-color: ${rando()};
    //         --light-color: ${rando()};
    //     `
    // }
}