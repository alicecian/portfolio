// one day, I will update all of this code...
let colors = ['olivedrab', 'orangered', 'cornflowerblue', 'purple', 'orange'];
let backgroundColors = ['lavender', 'palegoldenrod', 'mistyrose', 'lemonchiffon', 'lightgreen', 'thistle', 'powderblue'];

const sectionEls = [...document.querySelectorAll('.section')];
const gifs = [...document.querySelectorAll('.gif-y')];
const highlights = [...document.querySelectorAll('.highlights')];
// const nytLis = [...document.querySelectorAll('.list-wrapper li')];
const nythovers = [...document.querySelectorAll('.hovered-nyt .hovered')];
const cmuhovers = [...document.querySelectorAll('.hovered-cmu .hovered')];
const endhovers = [...document.querySelectorAll('.hovered-end .hovered')];


// very inefficiently written jquery :-)
$("a").mouseenter(function() {
    $(this).css('background-color', backgroundColors[Math.floor(Math.random() * backgroundColors.length)]);   
    $(this).css('color', colors[Math.floor(Math.random() * colors.length)]);   
})

$("a").mouseout(function() {
    $(this).css('background-color', 'inherit');   
})


// nyt work section
$(".list-wrapper li").mouseover(function() {
    let id = $(this).attr("id");
    $(this).css('color', colors[Math.floor(Math.random() * colors.length)]);
    $(this).children().css('color', colors[Math.floor(Math.random() * colors.length)]);   

    // associated project img
    $('.hovered-nyt .hovered').each(function() {
        let dataId = $(this).attr("data-id");

        if (dataId == id) {
            $(this).addClass('active');

            // check category img
            $('.default .gif-y').each(function() {
                // console.log($(this))
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                }
            })

            $('.hovered-cmu .hovered').each(function() {
                // console.log($(this))
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                }
            })
            $('.hovered-end .hovered').each(function() {
                // console.log($(this))
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                }
            })

        } else {
            $(this).removeClass('active');
        }
    })
})

$(".list-wrapper li").mouseout(function() {
    $(this).css('color', 'inherit');
    $(this).children('.list-item').css('color', 'inherit');   
})

// cmu work section
$(".projects a").mouseover(function() {
    let id = $(this).attr("id");
    $(this).css('color', colors[Math.floor(Math.random() * colors.length)]);
    // $(this).children().css('color', colors[Math.floor(Math.random() * colors.length)])   

    // associated project img
    $('.hovered-cmu .hovered').each(function() {
        let dataId = $(this).attr("data-id");
        if (dataId == id) {
            $(this).addClass('active');

            // check category img
            $('.default .gif-y').each(function() {
                // console.log($(this))
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                }
            })
            $('.hovered-nyt .hovered').each(function() {
                // console.log($(this))
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                }
            })
            $('.hovered-end .hovered').each(function() {
                // console.log($(this))
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                }
            })

        } else {
            $(this).removeClass('active');
        }
    })
})

// other work section
$("#footnotes .projects a").mouseover(function() {
    let id = $(this).attr("id");
    $(this).css('color', colors[Math.floor(Math.random() * colors.length)]);
    // $(this).children().css('color', colors[Math.floor(Math.random() * colors.length)])   

    // associated project img
    $('.hovered-end .hovered').each(function() {
        let dataId = $(this).attr("data-id");
        if (dataId == id) {
            $(this).addClass('active');
            // console.log($(this))

            // check category img
            $('.default .gif-y').each(function() {
                // console.log($(this))
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                }
            })
            $('.hovered-nyt .hovered').each(function() {
                // console.log($(this))
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                }
            })
            $('.hovered-cmu .hovered').each(function() {
                // console.log($(this))
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                }
            })

        } else {
            $(this).removeClass('active');
        }
    })
})

// secret bug
$("#secret-bug").mouseover(function() {
    $(this).css('color', colors[Math.floor(Math.random() * colors.length)]);
})

$("#secret-bug").mouseenter(function() {
    $('.hovered-extra img.hovered.bug').addClass('active');
})

$("#secret-bug").mouseout(function() {
    $('.hovered-extra img.hovered.bug').removeClass('active');
    $(this).css('color', 'inherit');
})


// secret dog
$("#peaches").mouseover(function() {
    $(this).css('color', colors[Math.floor(Math.random() * colors.length)]);
})

$("#peaches").mouseenter(function() {
    $('.hovered-extra img.hovered.dog').addClass('active');
})

$("#peaches").mouseout(function() {
    $('.hovered-extra img.hovered.dog').removeClass('active');
    $(this).css('color', 'inherit');
})


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

// TO DO: write a hover match function that runs when section is active (see IO below)
// this doesn't work yet
// function hoverMatch(activeSection) {
//     // console.log(activeSection);
//     const children = activeSection.children;
//     for (c of children) { 

//     // only need the child that is ul.projects
//         if (c.classList.contains('projects')) {
//     //     console.log(c);

//             const lis = c.children;
//             // li in ul
//             for (li of lis) {

//                 const el = li.children;
//                 // span, a, etc in li
//                 for (a of el) {

//                     // only pull <a> 
//                     if (a.nodeName == "A") {
//                         // console.log(a)

//                         a.addEventListener(
//                             "mouseenter",
//                             (event) => {
//                                 // console.log("hovered over", a);
//                             // highlight the mouseenter target
//                             //   event.target.style.color = "purple";
//                             },
//                             false
//                         );
//                     }
//                 }
//             }
//         }
//     }
// }

let callback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // console.log('intersecting', entry.target);
            entry.target.classList.add("active");
            Highlight(entry.target);
            Match(entry.target, gifs);
            clear(nythovers);

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