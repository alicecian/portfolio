var colors = ['red', 'blue', 'green', 'deeppink', 'royalblue', 'peru', 'cornflowerblue', 'rosybrown', 'seagreen', 'saddlebrown', 'sienna', 'steelblue', 'turquoise', 'teal', 'magenta', 'palevioletred', 'olive', 'salmon', 'orange', 'blueviolet', 'plum', 'crimson', 'coral', 'orangered', 'purple', 'rebeccapurple'];
var backgroundColors = ['aliceblue', 'blanchedalmond', 'cyan', 'gold', 'lavender', 'lavenderblush', 'lemonchiffon', 'lightblue', 'lightgreen', 'lightpink', 'mistyrose', 'peachpuff', 'pink', 'powderblue', 'plum', 'yellow', 'tomato', 'yellowgreen', 'seashell'];

const sectionEls = [...document.querySelectorAll('.section')];
const gifs = [...document.querySelectorAll('.gif-y')];
const highlights = [...document.querySelectorAll('.highlights')];
const nytLis = [...document.querySelectorAll('.list-wrapper li')];
const nythovers = [...document.querySelectorAll('.hovered-nyt .hovered')];


$("button").mouseenter(function() {
    $(this).css('color', colors[Math.floor(Math.random() * colors.length)])   
})

$("button").mouseout(function() {
    $(this).css('color', 'rgb(1, 40, 4)')
})

$("a").mouseenter(function() {
    $(this).css('background-color', backgroundColors[Math.floor(Math.random() * backgroundColors.length)])   
})

$("a").mouseout(function() {
    $(this).css('background-color', 'inherit')   
})


function MatchHover(li) {
    let index;
    let id = li.id
    let active = null;

    for (var i = 0; i < nythovers.length; i++) {
        let match = nythovers[i].getAttribute('data-id')
        if (id === match) {
            active = nythovers[i]
            index = i;
        }
        nythovers[i].classList.remove('active')
    }
    if (active) {
        active.classList.add('active')
    }
}

// Array.prototype.forEach.call(nytLis, (el) => {
//     el.addEventListener('mouseover', Match(el, nythovers))
// });
// element.addEventListener('mouseover',someFunction);

$(".list-wrapper li").mouseover(function() {
    $(this).css('background-color', 'aliceblue');

    // let id = $(this).attr("id")
    // console.log(id)
    // let li = $(this)
    // console.log(li)

    // Match(li, nythovers)
    // let img = $(".hovered-nyt .hovered")
    // console.log(img)


    // MatchHover($(this))
    // // let hoverImg = $(".hovered-nyt").find(".hovered").atrr("data-" + id)
    // // console.log(hoverImg)
})

$(".list-wrapper li").mouseout(function() {
    $(this).css('background-color', 'transparent');
})


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
        // show once scroll start
        active.style.color = colors[Math.floor(Math.random() * colors.length)];
        // console.log("active!")
    }
}

let callback = (entries, observer) => {

    entries.forEach(entry => {
            
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            Highlight(entry.target)
            Match(entry.target, gifs)

        } else {
            entry.target.classList.remove("active");
        }
        
    })
}

//need to tweak
const options = {
    root: null,
    rootMargin: '-10% 0px 10% 0px',
    threshold: 0.75
};

const observer = new IntersectionObserver(callback, options);

Array.prototype.forEach.call(sectionEls, (el) => {
    observer.observe(el);
});


