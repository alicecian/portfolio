var colors = ['red', 'blue', 'green', 'deeppink', 'royalblue', 'peru', 'cornflowerblue', 'rosybrown', 'seagreen', 'saddlebrown', 'sienna', 'steelblue', 'turquoise', 'teal', 'magenta', 'palevioletred', 'olive', 'salmon', 'orange', 'blueviolet', 'plum', 'crimson', 'coral', 'orangered', 'purple', 'rebeccapurple'];
var backgroundColors = ['aliceblue', 'blanchedalmond', 'cyan', 'gold', 'lavender', 'lavenderblush', 'lemonchiffon', 'lightblue', 'lightgreen', 'lightpink', 'mistyrose', 'peachpuff', 'pink', 'powderblue', 'plum', 'yellow', 'tomato', 'yellowgreen', 'seashell'];

const sectionEls = [...document.querySelectorAll('.section')];
const gifs = [...document.querySelectorAll('.gif-y')];
const highlights = [...document.querySelectorAll('.highlights')];
const nytLis = [...document.querySelectorAll('.list-wrapper li')];
const nythovers = [...document.querySelectorAll('.hovered-nyt .hovered')];


$("a").mouseenter(function() {
    $(this).css('background-color', backgroundColors[Math.floor(Math.random() * backgroundColors.length)])   
    $(this).css('color', colors[Math.floor(Math.random() * colors.length)])   
})

$("a").mouseout(function() {
    $(this).css('background-color', 'inherit')   
})

$(".list-wrapper li").mouseover(function() {
    let id = $(this).attr("id")
    $(this).css('color', colors[Math.floor(Math.random() * colors.length)])   
    $(this).children().css('color', colors[Math.floor(Math.random() * colors.length)])   

    // associated project img
    $('.hovered-nyt .hovered').each(function() {
        let dataId = $(this).attr("data-id");

        if (dataId == id) {
            $(this).addClass('active')

            // check category img
            $('.default .gif-y').each(function() {
                // console.log($(this))
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active')
                }
            })

        } else {
            $(this).removeClass('active')
        }
    })
  
})

$(".list-wrapper li").mouseout(function() {
    $(this).css('color', 'inherit')
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
        active.style.color = colors[Math.floor(Math.random() * colors.length)];
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
            entry.target.classList.add("active");
            Highlight(entry.target)
            Match(entry.target, gifs)
            clear(nythovers)

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


