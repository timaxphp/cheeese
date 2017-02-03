$(function(){

    // LANDING CAROUSEL
    if($('.carouselOne').length){
        $('.carouselOne').slick({
            slidesToShow: 1,
            arrows: true,
            dots: false,
            fade: true,
            prevArrow: $('.carouselOne__arrow-left'),
            nextArrow: $('.carouselOne__arrow-right'),
        });
    }

    // LANDING MOBILE MENU
    $('.header__iconmenu').on('click', function(){
        $(this).toggleClass('header__iconmenu-active');
        $('.header__mobmenu').toggleClass('header__mobmenu-active');
        return false;
    });

    $(window).on('scroll resize', function(){
        $('.header__iconmenu').removeClass('header__iconmenu-active');
        $('.header__mobmenu').removeClass('header__mobmenu-active');
        $('.header').removeClass('header-dark');
    });

    // LANDING SEARCH
    $('.header__link__search').on('click', function(){
        $('.header__nav').addClass('header__nav-searchActive');
        $('.header__link__search__input').focus();
    });

    $('.header__link__search__input').on('blur', function(){
        $('.header__nav').removeClass('header__nav-searchActive');
    })

    // SCROLL MENU
    function fixedNav(){
        var scrollToTop = $(window).scrollTop();
        var headerNav = $('.header__nav');

        if( scrollToTop > 1){
            headerNav.addClass('header__nav-black');
        }else{
            headerNav.removeClass('header__nav-black');
        }
    }

    fixedNav();

    $(window).on('scroll resize load', function(){
        fixedNav();
    });

    // LANDIND SEARCH
    $('.header__search__loc .header__search__inp').on('focus', function(){
        $('.header__res').show();
    });
    $('.header__search__loc .header__search__inp').on('blur', function(){
        $('.header__res').hide();
    });


    // LANDING DATEPICKER
    if($('#datetimepicker').length){
        $('#datetimepicker').datetimepicker({
            widgetPositioning:{
                horizontal: 'left',
                vertical: 'bottom'
            },
            format: 'DD/MM/YYYY',
            ignoreReadonly: true,
            focusOnShow: false
        });
    }

    // LANDING GALLERY GRID
    $(window).on('load', function(){
        if($('.pictures__row').length){
            $('.pictures__row').isotope({
                itemSelector: '.pictures__item',
            });
        }
    });

    // LANDING CATEGORY FILTER
    $('.pictures__category__item').on('click', function(){
        var item = $(this);
        var category = item.data('filter');

        item.siblings().removeClass('pictures__category__item-active').end().addClass('pictures__category__item-active');

        $('.pictures__row').isotope({ filter: category });

        return false;
    });

    $('.pictures__category-mob').on('change', function(){
        var category = $(this).val();

        $('.pictures__row').isotope({ filter: category });
    });

    // LOGIN FORM
    $('.loginlink').on('click', function(){
        $('.loginForm').addClass('loginForm-active');
        return false;
    });
    $('.loginForm__body').on('click', function(){
        event.preventDefault();
        event.stopPropagation();
    });
    $('.loginForm').on('click', function(){
        $('.loginForm').removeClass('loginForm-active');
    });
    $('.loginForm__close').on('click', function(){
        $('.loginForm').removeClass('loginForm-active');
        return false;
    })

    // PROFILE SIDEBAR
    $(window).on('load scroll resize', function(){
        // FIX STATE
        var offset = $(window).scrollTop();
        var offsetWithWindow = offset + $(window).height();
        var bodyH = $(document).height() - $('.footer').outerHeight();

        if( offsetWithWindow  > bodyH){
            $('.profile__sidebar').css('top', (bodyH - offsetWithWindow) + 'px');
        }else{
            $('.profile__sidebar').css('top', '');
        }

        // NAV ITEM ACTIVE STATE
        var sections = $('.profile__section');
        var nav = $('.profile__nav');

        var subsections = $('.profile__subsection');

        sections.each(function(){
            var top = $(this).offset().top - 130;
            var bottom = top + $(this).outerHeight() + 40;
            var itemNum = $(this).attr('id');

            if (offset >= top && offset <= bottom){
                $('.profile__nav__item').removeClass('profile__nav__item-active');
                $('.profile__nav__subLink').removeClass('profile__nav__subLink-active');
                $('#profilelink' + itemNum.substring(7, 8)).addClass('profile__nav__item-active');
            }
        });

        subsections.each(function(){
            var top = $(this).offset().top - 130;
            var bottom = top + $(this).outerHeight() + 30;
            var itemNum = $(this).attr('id');

            if (offset >= top && offset <= bottom){
                $('.profile__nav__subLink').removeClass('profile__nav__subLink-active');
                $('#profilesublink' + itemNum.substring(10, 11)).addClass('profile__nav__subLink-active');
            }
        });
    });

    // PROFILE SIDEBAR SCROLLTO
    $('.profile__nav__item').on('click', function(){
        var num = $(this).attr('id');
        var body = $("html, body");
        var offset;

        num = num.substring(11, 12);
        offset = $('#profile'+num).offset().top - 130;

        $('.profile__nav__subLink').addClass('profile__nav__subLink-scrollNoDot');
        body.stop().animate({scrollTop: offset}, 500, function(){
            $('.profile__nav__subLink').removeClass('profile__nav__subLink-scrollNoDot');
            $('.profile__nav__subLink').removeClass('profile__nav__subLink-activeImp');
        });

        return false;
    });

    $('.profile__nav__subLink').on('click', function(){
        var num = $(this).attr('id');
        var body = $("html, body");
        var offset;

        num = num.substring(14, 15);
        offset = $('#profilesub'+num).offset().top - 130;

        $('.profile__nav__subLink').removeClass('profile__nav__subLink-activeImp');
        $('.profile__nav__subLink').addClass('profile__nav__subLink-scrollNoDot');
        $(this).addClass('profile__nav__subLink-activeImp');
        body.stop().animate({scrollTop: offset}, 500, function(){
            $('.profile__nav__subLink').removeClass('profile__nav__subLink-scrollNoDot');
            $('.profile__nav__subLink').removeClass('profile__nav__subLink-activeImp');
        });

        return false;
    });

    // PROFILE TEL
    if($('#tel').length){
        $('#tel').intlTelInput();
        $('#tel').mask("(999) 999-9999");
    }

    // PROFILE MENU
    $('.header__link-profile').on('click', function(){
        $('.profile__menu').toggleClass('profile__menu-active');
    });

    // PHOTOGRAPHER PROFILE PICTURES GRID
    var grid;

    $(window).on('load', function(){
        if($('.picturesPhot').length){
           var min_height = $('.picturesPhot__item').first().height();
            $('.picturesPhot__item').each(function() {
                var height = $(this).height();
                if (min_height > height) min_height = height;
            });
             grid = $('.picturesPhot').packery({
                 gutter: 20,
                columnWidth: '.picturesPhot__item',
                rowHeight: min_height
             });
            grid.find('.picturesPhot__item').each( function( i, gridItem ) {
                var draggie = new Draggabilly( gridItem );
                grid.packery( 'bindDraggabillyEvents', draggie );
            });
        }
    });

    // PHOTOGRAPHER PROFILE SIDEBAR
    $(window).on('load scroll resize', function(){
        if($(window).width()< 1024){
            $('.photProfile__about').css('height', 'auto');
            return false;
        }

        var height = $('.photProfile__content').height() - ($('.photProfile__info').height() / 1.2);
        $('.photProfile__about').css('height', height + 'px');
    });

    // PHOTOGRAPHER PROFILE SETTING VIEW
    $('.photProfile__edit').on('click', function(){
        $('.photProfile__content').addClass('photProfile-editOn');
    });
    $('.picturesPhot__check label').on('mouseup', function(){
        var selItems = selectedItems();
        if($(this).parent().find('.picturesPhot__check__input').is(':checked')){
            selItems--;
        }else{
            selItems++;
        }

        if(selItems>0){
            $('.photProfile__content').addClass('photProfile-selectedItems');
        }else{
            $('.photProfile__content').removeClass('photProfile-selectedItems');
        }

        $('.photProfile__selectedItems span').html(selItems);
    });

    $('.photProfile__selectAll').on('click', function(){
        $('.picturesPhot__check__input').each(function(){
            $(this).attr('checked', 'checked').prop('checked', true);
        });

        var selItems = selectedItems();
        $('.photProfile__content').addClass('photProfile-selectedItems photProfile-selectedAllItems');
        $('.photProfile__selectedItems span').html(selItems);
    });

    $('.photProfile__diselectAll').on('click', function(){
        $('.picturesPhot__check__input').each(function(){
            $(this).prop('checked', false);
        });

        var selItems = selectedItems();
        $('.photProfile__content').removeClass('photProfile-selectedItems photProfile-selectedAllItems');
        $('.photProfile__selectedItems span').html(selItems);
    });

    $('.photProfile__exit').on('click', function(){
        $('.photProfile__content').removeClass('photProfile-editOn photProfile-selectedItems photProfile-selectedAllItems');
        $('.picturesPhot__check__input').each(function(){
            $(this).prop('checked', false);
        });
    });

    // SETTINGS REMOVE POPUP
    $('.photProfile__delete').on('click', function(){
        $('.photProfile__removePopup').addClass('photProfile__removePopup-active');
    });

    $('.photProfile__removePopup').on('click', function(){
        $(this).removeClass('photProfile__removePopup-active');
    });

    $('.photProfile__upload').on('click', function(){
        $('.dropzone').click();
        return false;
    })

    // SETTINGS UPLOAD POPUP
    if( $("#dropzoneOne").length ){
        Dropzone.options.dropzoneOne = {
            thumbnailWidth: 99999,
            thumbnailHeight: 9999,
            acceptedFiles: '.jpg, .jpeg, .png',
            init: function() {
                this.on("addedfile", function(file) {
                    $('.photProfile__uploadPopup').removeClass('photProfile__uploadPopup-active');
                    return false;
                });
                this.on('complete',function(file){
                    // remove el from dropzone
                    this.removeFile(file);
                });
                this.on("thumbnail", function(file, dataUri){
                    // get jq object image element and change it
                    var countEl = $('.picturesPhot__item').length;
                    var lastEl = countEl - 1;
                    var nextEl = countEl + 1;
                    var newItem = $('.picturesPhot__item').eq(lastEl).clone();

                    newItem.addClass('picturesPhot__item-new');
                    newItem.find('.picturesPhot__item__img').attr('src', dataUri);
                    newItem.find('.picturesPhot__check__input').attr('id', 'pic' + nextEl);
                    newItem.find('label').attr('for', 'pic' + nextEl);

                    // append image to grid
                    grid.prepend( newItem ).packery( 'prepended', newItem );

                    setTimeout(function(){
                        grid.packery('shiftLayout');
                    }, 600);

                    // add draggable to item
                    grid.find('.picturesPhot__item-new').each( function( i, gridItem ) {
                        var draggie = new Draggabilly( gridItem );
                        grid.packery( 'bindDraggabillyEvents', draggie );
                        $(this).removeClass('picturesPhot__item-new');
                    });
                })
            }
        }
    }

    // IMAGE DRAG
    $(document).on('dragover', function(){
        $('.photProfile__uploadPopup').addClass('photProfile__uploadPopup-active');
    });
    $(window).on("dragover",function(e){
        e = e || event;
        e.preventDefault();
    });
    $(window).on("drop",function(e){
        e = e || event;
        e.preventDefault();
    });

    $('.photProfile__uploadPopup').on('click', function(){
        $(this).removeClass('photProfile__uploadPopup-active');
    });

    $('.photProfile__uploadPopup__body').on('click', function(){
        event.preventDefault();
        event.stopPropagation();
    })

    function selectedItems(){
        var checkedItems = 0;
        $('.picturesPhot__item').each(function(){
            if($(this).find('.picturesPhot__check__input').is(':checked')){
                checkedItems++;
            }
        });
        return checkedItems;
    }
    function allItems(){
        var countImages = $('.picturesPhot__item').length;
        return countImages;
    }

    $('.photProfile__more').on('click', function(){
        var link = $(this);
        var num = link.data('more');

        link.toggleClass('photProfile__more-active');
        $('#more'+num).toggleClass('photProfile__moreinfo-active');
        return false;
    })
});
