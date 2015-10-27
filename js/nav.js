var nav = $('#navigation');
var navItm = nav.children('a');
var link;

navItm.on('click', function(e){
    e.preventDefault();

    link = $(this).attr('href');

    if (link != navItm.eq(0).attr('href')) {
        $('body, html').animate({
            scrollTop: $(link).offset().top - 100
        }, 500);
    }else{
        $('body, html').animate({
            scrollTop: 0
        }, 500);
    }
});