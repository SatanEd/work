    var navItmsLen = $('header nav').children('a').length;

//select #comanda
$('#select').on('click', function(e){
    e.preventDefault();
    $(this).attr('disabled', 'disabled');
    $('#select-dropdown').css({
        display: 'block'
    });
});

$('#select-dropdown li').on('click', function(){
    $('#select').attr('value', $(this).text());
    $(this).parent().css('display', 'none');
    $('#select').removeAttr('disabled');
    $('#hidden-sel').val($(this).attr('id').split('-')[1]).change();
    $('#price-warn').children('li').css('display', 'none');
    $('#pw-' + $(this).attr('id').split('-')[1]).css('display', 'block');
});

//nav menu
$('#menu-dropdown-btn').on('click', function(){
    if (window.innerHeight > window.innerWidth) {
        $('header nav').toggleClass('active-nav').css({
        height : (window.innerHeight - 100) + 'px'
    });
        $('header nav a').not('#comanda-btn').animate({
            height: ($('header nav').height() / navItmsLen) + 'px',
            lineHeight: ($('header nav').height() / navItmsLen) + 'px',
            opacity: 1
        }, {
            duration: 200
        });
    }else{
        $('header nav').toggleClass('active-nav').css({
            height : ($('header nav').children('a').length * 80)  + 'px'
        });
    }

    $('#comanda-btn').animate({
        marginTop : ((($('header nav').height() / navItmsLen) - $('#comanda-btn').height()) / 2) + 'px',
        marginRight : ((($('header nav').height() / navItmsLen) - $('#comanda-btn').height()) / 2) + 'px',
        opacity: 1
    }, {
        duration : 200
    });
});

    window.onresize = function () {
        $('header nav').css('height', (window.innerHeight - 100) + 'px');
        $('header nav a').not('#comanda-btn').css({
            height : ($('header nav').height() / navItmsLen) + 'px',
            lineHeight : ($('header nav').height() / navItmsLen) + 'px'
        });
        $('#comanda-btn').css({
            marginTop : ((($('header nav').height() / navItmsLen) - $('#comanda-btn').height()) / 2) + 'px',
            marginRight : ((($('header nav').height() / navItmsLen) - $('#comanda-btn').height()) / 2) + 'px'
        });
    };

$('header nav a').on('click', function(){
    if ($('header nav').hasClass('active-nav')) {
        $('header nav').toggleClass('active-nav');
    }
});

$('#header-btn, #comanda-btn').on('click', function (e) {
    e.preventDefault();
    $('body, html').animate({
        scrollTop : $('#comanda').offset().top
    });
});
