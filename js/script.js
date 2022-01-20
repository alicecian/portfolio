$(document).ready(function(){
    $(".list-wrapper li").hover(function() {
        console.log('hover')
    })

});


const sectionEls = [...document.querySelectorAll('.section')];
const gifs = [...document.querySelectorAll('.gif-y')];
const highlights = [...document.querySelectorAll('.highlights')];


console.log(highlights)

// match gifs to section
function Match(section) {
    let index;
    let id = section.id
    let active = null

    for (var i = 0; i < gifs.length; i++) {
        let match = gifs[i].getAttribute('data-id')
        if (id === match) {
            active = gifs[i]
            index = i;
        }
        gifs[i].classList.remove('active')
    }

    if (active) {
        active.classList.add('active')
    }
}

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
            console.log("match!")
        }
        highlights[i].classList.remove('active')
        console.log("remove active")
    }

    if (active) {
        active.classList.add('active')
        console.log("active!")
    }
}

let callback = (entries, observer) => {

    entries.forEach(entry => {
            
        if (entry.isIntersecting) {
            // console.log('in')

            entry.target.classList.add("active");
            // gifs.classList.contains(entry.target.id).add("active");
            Match(entry.target)
            Highlight(entry.target)


        } else {
            // console.log('out')
            entry.target.classList.remove("active");
        }
        
    })
}

//need to tweak
const options = {
    root: null,
    rootMargin: '-15% 0px 10% 0px',
    threshold: 0.85
};

const observer = new IntersectionObserver(callback, options);

Array.prototype.forEach.call(sectionEls, (el) => {
    observer.observe(el);
});


