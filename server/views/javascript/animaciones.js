let sunAnim = document.getElementById('sunAnim');
let moonAnim = document.getElementById('moonAnim');
let plantAnim = document.getElementById('plantAnim');
let regar = document.querySelector('.regar');
let backg = document.querySelector('.backg');

fetch("https://plantica.onrender.com/api/state/num")
    .then(response => response.json())
    .then(data => {
        let luz = ''
        luz = `${data[0].LUZ}`;
        if (luz > 30) {
            sunAnim.style.display = 'block';
        } else {
            moonAnim.style.display = 'block';
        }
    })

var animation = bodymovin.loadAnimation({
    container: sunAnim, // Required
    path: 'https://assets9.lottiefiles.com/private_files/lf30_Um0Z9o.json', // Required
    renderer: 'svg', // Required
    loop: true, // Optional
    autoplay: true, // Optional
    name: "sun", // Name for future reference. Optional.
})

var animation = bodymovin.loadAnimation({
    container: moonAnim, // Required
    path: 'https://assets7.lottiefiles.com/packages/lf20_6y2od13d.json', // Required
    renderer: 'svg', // Required
    loop: true, // Optional
    autoplay: true, // Optional
    name: "moonAnim", // Name for future reference. Optional.
})

var animation = bodymovin.loadAnimation({
    container: plantAnim, // Required
    path: 'https://assets1.lottiefiles.com/packages/lf20_xd9ypluc.json', // Required
    renderer: 'svg', // Required
    loop: false, // Optional
    autoplay: true, // Optional
    name: "plant", // Name for future reference. Optional.
})

var animation = bodymovin.loadAnimation({
    container: backg, // Required
    path: 'https://assets10.lottiefiles.com/packages/lf20_k6ckuttb.json', // Required
    renderer: 'svg', // Required
    loop: false, // Optional
    autoplay: true, // Optional
    name: "backg", // Name for future reference. Optional.
})

var animation = bodymovin.loadAnimation({
    container: regar, // Required
    path: 'https://assets9.lottiefiles.com/packages/lf20_fhxk8c44.json', // Required
    renderer: 'svg', // Required
    loop: true, // Optional
    autoplay: true, // Optional
    name: "regar", // Name for future reference. Optional.
})