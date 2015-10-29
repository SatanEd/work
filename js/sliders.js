    var slider = function (el) {
        this.cntSlidesNum = 0;
        this.sliderParent = '';
        this.sliderEl = el;
        this.cntSlidesCnt = $($(el).children('ul')[0]).children('li').length;
        this.sliderW = 640;
    };

    slider.prototype.init = function () {
        var slider = $(this.sliderEl);
        var sliderInn = slider.children('ul')[0];
        var slide = $(sliderInn).children('li');
        var indicators = $($(slider.parent()).children('.slider-ind')[0]);
        var sliderCnt = slide.length;
        var sliderNavWidth = 29;
        var minSliderH = 0;

        $(slide).each(function (i, it) {
            if ($(it).height() > minSliderH) {
                minSliderH = $(it).height();
            }
        });

        $(sliderInn).css({
            width: sliderCnt * slider.width() + 'px',
            minHeight : minSliderH + 'px'
        });

        slide.each(function (i, it) {
            indicators.append('<li data-ind="' + i + '">' + (i+1) + '</li>');
        });

        $($(slider.parent()).children('.slider-ind').children('li')[this.cntSlidesNum]).addClass('activ-ind');
    };
    //slider.prototype.slideLeft = function (to, innMarg) {
    //    var slider = $(this.sliderEl);
    //    var sliderW = $(this.sliderEl).width();
    //    var sliderInn = slider.children('ul')[0];
    //    var slide = $(sliderInn).children('li');
    //    var sliderCnt = slide.length;
    //
    //    if (to == sliderCnt+1 ){
    //        to = sliderCnt;
    //    }
    //
    //    if (innMarg < 0) {
    //
    //        $(slider.parent()).children('.slider-ind').children('li').removeClass('activ-ind');
    //        $($(slider.parent()).children('.slider-ind').children('li')[to-1]).addClass('activ-ind');
    //
    //        if (typeof to == 'number' && to < slide.length+1) {
    //            $(slider.parent()).children('.slider-ind').children('li').removeClass('activ-ind');
    //            $($(slider.parent()).children('.slider-ind').children('li')[to-1]).addClass('activ-ind');
    //
    //            $(sliderInn).css({
    //                marginLeft: '-' + (( $(slide[0]).width() * (to - 1) ) + 'px')
    //            });
    //        }
    //    } else if (innMarg >= 0) {
    //        $(slider.parent()).children('.slider-ind').children('li').removeClass('activ-ind');
    //        $($(slider.parent()).children('.slider-ind').children('li')[0]).addClass('activ-ind');
    //
    //        $(sliderInn).css({
    //            marginLeft: 0
    //        });
    //    } else if (innMarg >= (sliderCnt-1) * sliderW) {
    //        $(slider.parent()).children('.slider-ind').children('li').removeClass('activ-ind');
    //        $($(slider.parent()).children('.slider-ind').children('li')[sliderCnt-1]).addClass('activ-ind');
    //
    //        $(sliderInn).css({
    //            marginLeft: (sliderCnt-1) * sliderW
    //        });
    //    }
    //};

    slider.prototype.slideLeft = function (slideMarg) {
        var slider = $(this.sliderEl);
        var sliderW = $(this.sliderEl).width();
        var sliderInn = slider.children('ul')[0];
        var slide = $(sliderInn).children('li');
        var sliderCnt = slide.length;

        if ((slideMarg%this.sliderW) == 0) {
            if (slideMarg > -((sliderCnt-2) * this.sliderW)) {
                $(sliderInn).css({
                    marginLeft: (slideMarg - this.sliderW) + "px"
                });

                var to = ((slideMarg - this.sliderW) / this.sliderW);

                $(slider.parent()).children('.slider-ind').children('li').removeClass('activ-ind');
                $($(slider.parent()).children('.slider-ind').children('li')[Math.abs(to)]).addClass('activ-ind');
            }else{
                $(sliderInn).css({
                    marginLeft: '-' + ((sliderCnt-1) * this.sliderW) + 'px'
                });

                to = (($(sliderInn).css('margin-left') - this.sliderW) / this.sliderW);

                $(slider.parent()).children('.slider-ind').children('li').removeClass('activ-ind');
                $($(slider.parent()).children('.slider-ind').children('li')[Math.abs(to)]).addClass('activ-ind');
            }
        }else{
            $(sliderInn).css({
                marginLeft: (slideMarg-(slideMarg%this.sliderW)-640) + 'px'
            });
        }
    };

    slider.prototype.slideRight = function (slideMarg) {
        var slider = $(this.sliderEl);
        var sliderW = $(this.sliderEl).width();
        var sliderInn = slider.children('ul')[0];
        var slide = $(sliderInn).children('li');
        var sliderCnt = slide.length;

        if ((slideMarg%this.sliderW) == 0) {
            if (slideMarg < 0 && (slideMarg % this.sliderW) == 0) {
                $(sliderInn).css({
                    marginLeft: (slideMarg + this.sliderW) + "px"
                });

                var to = ((slideMarg + this.sliderW) / this.sliderW);

                $(slider.parent()).children('.slider-ind').children('li').removeClass('activ-ind');
                $($(slider.parent()).children('.slider-ind').children('li')[Math.abs(to)]).addClass('activ-ind');
            } else {
                $(sliderInn).css({
                    marginLeft: 0
                });
            }
        }else{
            $(sliderInn).css({
                marginLeft: (slideMarg-(slideMarg%this.sliderW)) + 'px'
            });
        }
    };


$(document).ready(function () {
    var directionX = false;
    var s, di, j, sliderDir = 2, touchMarg;
    var slAv = new slider('#avantajele-slider');
    var slRec = new slider('#recenzii-slider');
    var slDs = new slider('#dscr-slider');
    var htmlBody = /iPhone|iPad|iPod/i.test(navigator.userAgent) ? $('html') : $("body, html");

        slAv.init();
        slDs.init();
        slRec.init();

    document.getElementById('rec-slide-inner').addEventListener('touchstart', function(event) {
        $(this).removeClass('sliderTrans');
        s = event.touches[0].pageY;
        j = event.touches[0].pageX;
    }, false);

        document.getElementById('rec-slide-inner').addEventListener('touchmove', function(event) {
            var y = event.touches[0].pageY;
            var x = event.touches[0].pageX;

            sliderDir = j > x ? true : false;

            if (Math.abs(j - x) > 50) {
                event.preventDefault();

                directionX = true;
            }

            if (directionX) {
                this.style.marginLeft = (parseInt($(this).css('marginLeft')) - (parseInt(j) - parseInt(x))) + 'px';
                j = x;
            }
            s = y;
    }, false);

    document.getElementById('rec-slide-inner').addEventListener('touchend', function(event) {
        $(this).addClass('sliderTrans');

        directionX = false;
        if (xPoint = ( Math.abs( parseInt($(this).css('marginLeft')) / 640)).toFixed()) {
            slRec.slideLeft(parseInt(xPoint)+1, parseInt($(this).css('marginLeft')));
        }
    }, false);


    document.getElementById('dscr-slider-inner').addEventListener('touchstart', function(event) {
        touchMarg = parseInt($(this).css('marginLeft'));

        $(this).removeClass('sliderTrans');

        s = event.touches[0].pageY;
        j = event.touches[0].pageX;
    }, false);

        document.getElementById('dscr-slider-inner').addEventListener('touchmove', function(event) {
            var y = event.touches[0].pageY;
            var x = event.touches[0].pageX;

                if (Math.abs(j - x) > 30 && (Math.abs(j - x) + 30) > Math.abs(s - y)) {
                    sliderDir = j > x ? true : false;
                    event.preventDefault();

                    this.style.marginLeft = (parseInt($(this).css('marginLeft')) - (parseInt(j) - parseInt(x))) + 'px';
                    j = x;
                }
                s = y;
    }, false);

    document.getElementById('dscr-slider-inner').addEventListener('touchend', function(event) {
        $(this).addClass('sliderTrans');

        if (sliderDir != 2) {
            sliderDir ? slDs.slideLeft(touchMarg) : slDs.slideRight(touchMarg);
        }
        //
        //directionX = false;
        //if (xPoint = ( Math.abs( parseInt($(this).css('marginLeft')) / 640)).toFixed()) {
        //    slDs.slideLeft(parseInt(xPoint)+1, parseInt($(this).css('marginLeft')));
        //}
    }, false);

    document.getElementById('avantajele-lst').addEventListener('touchstart', function(event) {
        $(this).removeClass('sliderTrans');

        s = event.touches[0].pageY;
        j = event.touches[0].pageX;
    }, false);

        document.getElementById('avantajele-lst').addEventListener('touchmove', function(event) {
            var y = event.touches[0].pageY;
            var x = event.touches[0].pageX;

            sliderDir = j > x ? true : false;

            if (Math.abs(j - x) > 50) {
                event.preventDefault();

                directionX = true;
            }

            if (directionX) {
                this.style.marginLeft = (parseInt($(this).css('marginLeft')) - (parseInt(j) - parseInt(x))) + 'px';
                j = x;
            }
            s = y;
    }, false);

    document.getElementById('avantajele-lst').addEventListener('touchend', function(event) {
        $(this).addClass('sliderTrans');

        directionX = false;
        if (xPoint = ( Math.abs( parseInt($(this).css('marginLeft')) / 640)).toFixed()) {
            slAv.slideLeft(parseInt(xPoint)+1, parseInt($(this).css('marginLeft')));
        }
    }, false);
});
