
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

function include_js(file,callback) {
    file = 'resource/'+file;
    var _doc = document.getElementsByTagName('head')[0];
    var js = document.createElement('script');
    var call = callback || function(){};
    js.setAttribute('type', 'text/javascript');
    js.setAttribute('src', file);
    _doc.appendChild(js);

    if (!/*@cc_on!@*/0) { //if not IE
        //Firefox2、Firefox3、Safari3.1+、Opera9.6+ support js.onload
        js.onload = function () {
            call();
        }
    } else {
        //IE6、IE7 support js.onreadystatechange
        js.onreadystatechange = function () {
            if (js.readyState == 'loaded' || js.readyState == 'complete') {
                call();
            }
        }
    }

    return false;
}

// Konami code
(function(){
    var on = 1;
    var k = [];
    var jsLoadFinish = 0;
    document.onkeydown =  function(e) {
        e = e || window.event;
        k.push(e.keyCode);
        if (k.toString().indexOf("38,38,40,40,37,39,37,39,66,65") >= 0) {
            if(on){
                if(!jsLoadFinish){
                    include_js('starfield.js',function(){
                        jsLoadFinish=1;
                        document.body.className='dark_theme';
                        start();
                        on = 0;
                    });
                }else{
                    document.body.className='dark_theme';
                    start();
                    on = 0;                    
                }
            }else{
                try{
                    window.clearTimeout(timeout);
                    document.body.className='';
                    (document.body).removeChild(document.getElementById('starfield'));
//                    document.getElementById('starfield').style.visibility = 'hidden';
                }catch (e){
                    
                }                
            }
            
            k = [];//激活后清空数组  
        }
    }
})();