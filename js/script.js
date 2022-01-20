$(document).ready(function(){
    $(".list-wrapper li").hover(function() {
        console.log('hover')
    })

});


const sectionEls = [...document.querySelectorAll('.section')];
console.log(sectionEls)

let callback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // console.log('in')
            entry.target.classList.add("active");

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


