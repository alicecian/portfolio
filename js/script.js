$(document).ready(function(){
 
    // $("list-wrapper.nyt-button").click(function() {
    //     console.log('click')
    //     if ($(".work-nyt").hasClass("open")) {
    //         $(".work-nyt").removeClass("open");
    //     } else {
    //         $(".work-nyt").addClass("open");
    //     }
    // })

    $(".list-wrapper li").hover(function() {
        console.log('hover')
        if ($(".work-nyt").hasClass("open")) {
            $(".work-nyt").removeClass("open");
        } else {
            $(".work-nyt").addClass("open");
        }
    })
});