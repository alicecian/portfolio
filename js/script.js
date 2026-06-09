let colors = ['olivedrab', 'orangered', 'cornflowerblue', 'purple', 'orange'];
let backgroundColors = ['lavender', 'palegoldenrod', 'mistyrose', 'lemonchiffon', 'lightgreen', 'thistle', 'powderblue'];

const sectionEls = [...document.querySelectorAll('.section')];
const highlights = [...document.querySelectorAll('.highlights')];
const gifs = [...document.querySelectorAll('.gif-y')];
const endhovers = [...document.querySelectorAll('.hovered-end .hovered')];

function randomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function randomBackgroundColor() {
    return backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
}

document.querySelectorAll('a').forEach((link) => {
    link.addEventListener('mouseenter', function () {
        this.style.backgroundColor = randomBackgroundColor();
        this.style.color = randomColor();
    });
    link.addEventListener('mouseout', function () {
        this.style.backgroundColor = 'inherit';
    });
});

document.querySelectorAll('.list-wrapper li').forEach((item) => {
    item.addEventListener('mouseout', function () {
        this.style.color = 'inherit';
        const listItem = this.querySelector(':scope > .list-item');
        if (listItem) listItem.style.color = 'inherit';
    });
});

const defaultGifs = document.querySelectorAll('.default .gif-y');

document.querySelectorAll('#footnotes .projects a').forEach((link) => {
    link.addEventListener('mouseover', function () {
        const id = this.id;
        this.style.color = randomColor();

        endhovers.forEach((el) => {
            const dataId = el.getAttribute('data-id');
            if (dataId === id) {
                el.classList.add('active');
                defaultGifs.forEach((gif) => {
                    if (gif.classList.contains('active')) {
                        gif.classList.remove('active');
                    }
                });
            } else {
                el.classList.remove('active');
            }
        });
    });
});

function bindSecretHover(triggerId, imageSelector) {
    const trigger = document.getElementById(triggerId);
    const images = document.querySelectorAll(imageSelector);
    if (!trigger) return;

    trigger.addEventListener('mouseover', function () {
        this.style.color = randomColor();
    });
    trigger.addEventListener('mouseenter', function () {
        images.forEach((img) => img.classList.add('active'));
    });
    trigger.addEventListener('mouseout', function () {
        images.forEach((img) => img.classList.remove('active'));
        this.style.color = 'inherit';
    });
}

bindSecretHover('secret-bug', '.hovered-extra img.hovered.bug');
bindSecretHover('peaches', '.hovered-extra img.hovered.dog');

// match highlight to section
function Highlight(section) {
    let index;
    let id = section.id
    let active = null

    for (var i = 0; i < highlights.length; i++) {
        let match = highlights[i].getAttribute('data-id')

        if (id === match) {
            active = highlights[i]
            index = i;
            // console.log("match!")
        }
        highlights[i].classList.remove('active')
        // console.log("remove active")
    }

    if (active) {
        active.classList.add('active')
        //randomize highlight color :-)
        active.style.backgroundColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
    }
}

// not responsive.. TODO fix
const isMobile = window.matchMedia("only screen and (max-width: 450px)").matches;
const mainBody = document.querySelector('body');

if (isMobile) {
    mainBody.classList.remove('desktop');
} else {
    mainBody.classList.add('desktop');
}


// match gifs to section
function Match(section, array) {
    let index;
    let id = section.id
    let active = null

    for (var i = 0; i < array.length; i++) {
        let match = array[i].getAttribute('data-id')
        if (id === match) {
            active = array[i]
            index = i;
        }
        array[i].classList.remove('active')
    }

    if (active) {
        active.classList.add('active')
    }
}
function clear(array) {
    for (var i = 0; i < array.length; i++) {
        array[i].classList.remove('active')
    }
}
let callback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log('intersecting', entry.target);
            entry.target.classList.add("active");
            Highlight(entry.target);
            Match(entry.target, gifs);
            // clear(nythovers);

        } else {
            entry.target.classList.remove("active");

            let id = entry.target.id;
            if (id !== 'work-nyt') {
                // if entry == nyt remove active class from pic .hovered
                Array.prototype.forEach.call(cmuhovers, (el) => {
                    el.classList.remove('active')
                })
                Array.prototype.forEach.call(endhovers, (el) => {
                    el.classList.remove('active')
                })
            } 
        }
    })
}

//need to tweak
const options = {
    root: null,
    rootMargin: '-55% 0px -30% 0px'
    // threshold: 0.9
};

const observer = new IntersectionObserver(callback, options);

Array.prototype.forEach.call(sectionEls, (el) => {
    observer.observe(el);
});