// var colors = ['cornflowerblue', 'forestgreen', 'orangered', 'rebeccapurple', 'violet'];
let colors = ['olivedrab', 'orangered', 'cornflowerblue', 'purple', 'orange'];
let backgroundColors = ['lavender', 'palegoldenrod', 'mistyrose', 'lightcyan', 'greenyellow'];

const sectionEls = [...document.querySelectorAll('.section')];
const gifs = [...document.querySelectorAll('.gif-y')];
const highlights = [...document.querySelectorAll('.highlights')];
const nytLis = [...document.querySelectorAll('.list-wrapper li')];
const nythovers = [...document.querySelectorAll('.hovered-nyt .hovered')];
const cmuhovers = [...document.querySelectorAll('.hovered-cmu .hovered')];


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

            $('.hovered-cmu .hovered').each(function() {
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
    $(this).children('.list-item').css('color', 'inherit')   

})


$(".projects a").mouseover(function() {
    let id = $(this).attr("id")
    $(this).css('color', colors[Math.floor(Math.random() * colors.length)])   
    // $(this).children().css('color', colors[Math.floor(Math.random() * colors.length)])   

    // associated project img
    $('.hovered-cmu .hovered').each(function() {
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
            $('.hovered-nyt .hovered').each(function() {
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



// not responsive.. TODO fix
const isMobile = window.matchMedia("only screen and (max-width: 450px)").matches;
const bodyyy = document.querySelector('body');

// let vwidth = window.innerWidth;
// console.log('vwidth =', vwidth)

if (isMobile) {
    bodyyy.classList.remove('desktop')
    // console.log('hi mobile', bodyyy);
} else {
    // console.log('hi desktop', bodyyy)
    bodyyy.classList.add('desktop')
}

// var width = $(window).width();
// $(window).resize(function () {
//     if (width <= 700) {
//         $(sideColumnR).removeClass('desktop');
//         console.log('yo mobile')
//     }
// });

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
        active.style.backgroundColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
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

            let id = entry.target.id
            if (id !== 'work-nyt') {
                // console.log('i am nyt')
                // if entry == nyt remove active class from pic .hovered
                Array.prototype.forEach.call(cmuhovers, (el) => {
                    el.classList.remove('active')
                })
            }
        }
        
    })
}

//need to tweak
const options = {
    root: null,
    rootMargin: '-10% 0px 10% 0px',
    threshold: 0.70
};

const observer = new IntersectionObserver(callback, options);

Array.prototype.forEach.call(sectionEls, (el) => {
    observer.observe(el);
});


