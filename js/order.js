$(document).ready(function() {
    if (answer) {
        answer.hide(); // hidden result block
    }
    upTimer();
});


// -------------------------
// Global config
// -------------------------
var x = Math.floor((Math.random() * 2)); // 0, 1
var container = $('body');

// <body data-config='{ "form": ".js-order", "topQuantity": 3, "product": 2003 }'>
if (!(container.data('href'))) {
    var form = container.data('config').form;
    var topQuantity = container.data('config').topQuantity;
    var product = container.data('config').product;
    var btnSubmit = $('[data-orderSubmit]');
    var answer = $('[data-answer]');

    // product config
    var price = container.data('product').price;
    var price2 = container.data('product').price2;
    var shipping = container.data('product').shipping;
    var region = container.data('product').region;
    var cost = price;
    var quantity = $('[data-orderQuantity]').find('option:selected').val();
} else {
    function landingUrl() { // url to landing
        var url = container.data('href')[x];
        if (url === undefined) {
            url = container.data('href')[0];
        }
        return url;
    };
}

// referal code
var referalName = 'referal';
var referalCode = GetURLParameter(referalName);
if (referalCode !== undefined) {
    referalCode = referalCode;
} else {
    referalCode = 'unknown';
}




// -------------------------
// Update Invocie, <body data-product='{ "price": 99, "shipping": 20, "region": 1001 }'>
// -------------------------
(function updateInvoice() {
    "use strict";

    var input = $('[data-orderQuantity]');
    $(input).bind('change', function() {
        var value = $(this).val();

        switch (value) {
            case '1':
                totalPrice(price);
                break;
            case '2':
                totalPrice(price2);
                break;
            case '3':
                totalPrice(price3);
                break;
        }
    })
    $('.click1').on('click', function() {
        $("[data-orderQuantity]").val(1);
        totalPrice(price);
    });
    $('.click2').on('click', function() {
        $("[data-orderQuantity]").val(2);
        totalPrice(price2);
    });
    $('.click3').on('click', function() {
        $("[data-orderQuantity]").val(3);
        totalPrice(price3);
    });

    $('[data-package]').click(function() {
        var quant = $(this).data('package');
        changeQuantity(quant);
    })

    function totalPrice(summ) {
        $('[data-invoicePrice]').text(summ);
        $('[data-oldPrice]').text((summ+1)*2);
        $('[data-invoiceTotal]').text(shipping + summ);
        cost = summ;
        quantity = $('[data-orderQuantity]').find('option:selected').val();
    }

    $('[data-invoiceShipping]').text(shipping);
    totalPrice(price);
})();



function valueForm(target) {
    "use strict";

    var value = $(this).closest(form).find(target).val();

    if (!value) {
        value = $(this).closest(form).find(target).text();
        return value;
    } else {
        return value;
    }
};



(function orderAction() {
    "use strict";

    $(btnSubmit).bind('click', function(event) {

        event.preventDefault();

        var name_valid_ru = "Введите свое имя правильно";
        var name_valid_ro = "Introduceți Numele și Prenumele corect";
        var phone_valid_ru = "введите номер телефона";
        var phone_valid_ro = "Introduceți numărul de telefon";

        // customer data
        var name = valueForm.apply(this, ["[data-orderName]"]);
        var phone = valueForm.apply(this, ["[data-orderPhone]"]);
        var address = valueForm.apply(this, ["[data-orderAddress]"]);

        if (name.length <= 2) {
            if (container.hasClass('lang-ro')) {
                alert(name_valid_ro);
            } else if (container.hasClass('lang-ru')) {
                alert(name_valid_ru);
            }
            return false;
        } else if (phone.length <= 6) {
            if (container.hasClass('lang-ro')) {
                alert(phone_valid_ro);
            } else if (container.hasClass('lang-ru')) {
                alert(phone_valid_ru);
            }
            return false;
        }

        if (!region) {
            region = valueForm.apply(this, ["[data-orderRegion]"]);
        }

        if (!quantity || quantity === 'unknown') {
            quantity = 1;
        }

        if (!cost) {
            cost = price;
        }

        
        $(btnSubmit).prop('disabled', true);
        _gaq.push(['_trackEvent', 'Order', 'Place', 'Submit', 0]);

        var valid = 1;

        if (name === '' || name === 'unknown') {
            valid = 0;
            _gaq.push(['_trackEvent', 'Order', 'Error field', 'name', 0]);
        }
        if (phone === '' || phone === 'unknown') {
            valid = 0;
            _gaq.push(['_trackEvent', 'Order', 'Error field', 'phone', 0]);
        }
        console.log('name ' + name, '/ phone ' + phone, '/ region ' + region, '/ address ' + address, '/ quantity ' + quantity, '/ cost ' + cost, '/ product ' + product, '/ referal ' + referalCode, '\n valid ' + valid  );

        if (valid == 1) {
            _gaq.push(['_trackEvent', 'Order', 'Place', 'Sending', 0]);

            var posting = $.post("http://188.226.197.69/?q=neworder/v3", {
                customer_name: name,
                customer_phone: phone,
                customer_region: region,
                customer_address: 'unknown',
                quantity: quantity,
                cost: cost,
                product: product,
                referral: referalCode
            }, null, "json");

            posting.done(function(data) {
                if (data.status == 'yes') {
                    hideSubmitForm(data.result);
                    _gaq.push(['_trackEvent', 'Order', 'Place', 'Successful', 0]);
                } else {
                    _gaq.push(['_trackEvent', 'Order', 'Place', 'Response False', 0]);
                }

                $(btnSubmit).prop('disabled', false);
            });

            posting.fail(function() {
                _gaq.push(['_trackEvent', 'Order', 'Place', 'Failed', 0]);
                $(btnSubmit).prop('disabled', false);
            });
        } else {
            _gaq.push(['_trackEvent', 'Order', 'Place', 'Show Errore', 0]);
            $(btnSubmit).prop('disabled', false);
        }
    });

})();

function hideSubmitForm(orderID) {
    $(form).hide();
    $(".price").hide();
     $(".promo").hide();
    answer.show().find('[data-orderNum]').text(orderID);
};




// -------------------------
// Get referal code from URL
// -------------------------
function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');

    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
};



// -------------------------
// change URL referal <a href="#">text</a>
// -------------------------
(function UpdateUrls(referalName, referalCode) {
    var el = $('a[href=#href]');

    el.each(function() {
        var _href = landingUrl();
        $(this).attr("href", _href + '?' + referalName + '=' + referalCode);
        $(this).attr("target", '_blank');
    });
})(referalName, referalCode);



// -------------------------
// Plugin ScrollTo, <button data-goto="#name">text</button>
// -------------------------
(function scrollTo() {
    $('[data-goto]').click(function(event) {
        event.preventDefault();
        $('html,body').animate({
            scrollTop: $($(this).data('goto')).offset().top
        }, 400);
    });
})();



// -------------------------
// Pgugin Cownt Down, <span data-timerHH>00</span>, <span data-timerMM>00</span>, <span data-timerSS>00</span>
// -------------------------
var now = new Date();

var hour_s = 24 - now.getHours();
var minutes_s = 60 - now.getMinutes();
var seconds_s = 60 - now.getSeconds();

function upTimer() {
    seconds_s--;
    if (seconds_s == -01) {
        seconds_s = 59;
        minutes_s = minutes_s - 1;
    } else {
        minutes_s = minutes_s
    };
    if (seconds_s <= 9) {
        seconds_s = "0" + seconds_s
    };
    if (minutes_s == '00' && seconds_s == '00') {
        minutes_s = 20;
        seconds_s = 00;
    }
    minutes_sh = minutes_s;
    if (minutes_s < 10) minutes_sh = '0' + minutes_s;

    if ($('[data-timer]')) {
        $('[data-timerHH]').text(hour_s);
        $('[data-timerMM]').text(minutes_sh);
        $('[data-timerSS]').text(seconds_s);
    }

    setTimeout('upTimer()', 1000);
};