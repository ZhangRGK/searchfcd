
$(function(){


    $(window).scroll(function(){
        var timeout = null;
        var backbtn = $('#topbtn');
        if(timeout){
            clearTimeout(timeout);
        }
        timeout = setTimeout(function(){
            var scrollTop = document.documentElement.scrollTop;
            scrollTop = scrollTop===0 ? document.body.scrollTop : scrollTop;
            if(scrollTop > 150){
                backbtn.css('visibility','visible');
            }else{
                backbtn.css('visibility', 'hidden');
            }
        }, 100);
    });
    
    $('#topbtn').click(function(){
        scrollTo();
    });
})

function scrollTo(obj){
    var top = obj && obj.offset().top || 0;
    $('html,body').animate({
            scrollTop: top
        },500);
}