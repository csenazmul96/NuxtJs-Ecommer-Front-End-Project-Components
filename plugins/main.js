$(document).ready(function() {
  $('#sort ul li').click(function () {
    $('*[data-target="#sort"]').click();
  });

  $(document).on('click', '.checkout_mobile_collapse_ic', function(e) {
    $('.checkout_mobile_collapse_content').slideToggle();
  });
  var numRows = $('.hl_order_show table').find('tr').length;


  var w = $(window).width();


  if (w > 767) {
    $(window).on('scroll', function() {

      var windowScroll = $(window).scrollTop();

      var sidelength = $(".hl_checkout_right").length;
      if (sidelength == true) {
        offsetleftSize = $('.hl_checkout_right').offset().top;
        offsetFitSize = $('.hl_checkout_footer').offset().top;
        headerHeight = $('.header_area').outerHeight();
        checkoutStepHeadHeight = $('.checkout_step_head').outerHeight();
        checkout_right_Height = $('.hl_checkout_right').outerHeight();
        transformHeight = offsetFitSize - ( headerHeight + checkout_right_Height + checkoutStepHeadHeight) ;
        if (windowScroll > offsetleftSize) {
          $('.hl_checkout_right').addClass('isFixed');
        }
        if (windowScroll > offsetFitSize - (headerHeight + checkout_right_Height + checkoutStepHeadHeight +  100)) {
          $('.hl_checkout_right').removeClass('isFixed');
          $('.hl_checkout_right').css({
            'position': 'relative',
            'z-index': 3,
            '-webkit-transform': `translate3d(0px, ${transformHeight - 100}px, 0px)`,
            '-moz-transform': `translate3d(0px, ${transformHeight - 100}px, 0px)`,
            '-ms-transform': `translate3d(0px, ${transformHeight - 100}px, 0px)`,
            '-o-transform': `translate3d(0px, ${transformHeight - 100}px, 0px)`,
            'transform': `translate3d(0px, ${transformHeight - 100}px, 0px)`
          });
        } else {
          $('.hl_checkout_right').css({
            'position': 'fixed',
            '-webkit-transform': 'translate3d(0px, 0px, 0px)',
            '-moz-transform': 'translate3d(0px, 0px, 0px)',
            '-ms-transform': 'translate3d(0px, 0px, 0px)',
            '-o-transform': 'translate3d(0px, 0px, 0px)',
            'transform': 'translate3d(0px, 0px, 0px)'
          });
        }
      }

    });

  } else {

    var windowScroll = $(window).scrollTop();

    var sidelength = $(".hl_checkout_right").length;
    if (sidelength == true) {
      offsetleftSize = $('.hl_checkout_right').offset().top;
      offsetFitSize = $('.hl_checkout_footer').offset().top;
      headerHeight = $('.header_area').outerHeight();
      checkout_right_Height = $('.hl_checkout_right').outerHeight();
      transformHeight = offsetFitSize - (headerHeight + checkout_right_Height);
      if (windowScroll > offsetFitSize - (headerHeight + checkout_right_Height + 0)) {
        $('.hl_checkout_right').removeClass('isFixed');
        $('.hl_checkout_right').css({
          'position': 'relative',
          '-webkit-transform': 'translate3d(0px, 0px, 0px)',
          '-moz-transform': 'translate3d(0px, 0px, 0px)',
          '-ms-transform': 'translate3d(0px, 0px, 0px)',
          '-o-transform': 'translate3d(0px, 0px, 0px)',
          'transform': 'translate3d(0px, 0px, 0px)'
        });
      } else {
        $('.hl_checkout_right').css({
          'position': 'relative',
          '-webkit-transform': 'translate3d(0px, 0px, 0px)',
          '-moz-transform': 'translate3d(0px, 0px, 0px)',
          '-ms-transform': 'translate3d(0px, 0px, 0px)',
          '-o-transform': 'translate3d(0px, 0px, 0px)',
          'transform': 'translate3d(0px, 0px, 0px)'
        });
      }
    }

    $(window).on('scroll', function() {

      var windowScroll = $(window).scrollTop();

      var sidelength = $(".hl_checkout_right").length;
      if (sidelength == true) {
        offsetleftSize = $('.hl_checkout_right').offset().top;
        offsetFitSize = $('.hl_checkout_footer').offset().top;
        headerHeight = $('.header_area').outerHeight();
        checkout_right_Height = $('.hl_checkout_right').outerHeight();
        transformHeight = offsetFitSize - (headerHeight + checkout_right_Height);
        if (windowScroll > offsetFitSize - (headerHeight + checkout_right_Height + 0)) {
          $('.hl_checkout_right').css({
            'position': 'relative',
            'z-index': 3,
            '-webkit-transform': `translate3d(0px, ${transformHeight - 0}px, 0px)`,
            '-moz-transform': `translate3d(0px, ${transformHeight - 0}px, 0px)`,
            '-ms-transform': `translate3d(0px, ${transformHeight - 0}px, 0px)`,
            '-o-transform': `translate3d(0px, ${transformHeight - 0}px, 0px)`,
            'transform': `translate3d(0px, ${transformHeight - 0}px, 0px)`
          });
        } else {
          $('.hl_checkout_right').css({
            'position': 'fixed',
            '-webkit-transform': 'translate3d(0px, 0px, 0px)',
            '-moz-transform': 'translate3d(0px, 0px, 0px)',
            '-ms-transform': 'translate3d(0px, 0px, 0px)',
            '-o-transform': 'translate3d(0px, 0px, 0px)',
            'transform': 'translate3d(0px, 0px, 0px)'
          });
        }
      }

    });

  }




  function preloader() {
    $(".preloader_wrap").fadeOut("slow");
  }
  preloader();
  $(window).on('scroll', function() {
    if ($(window).scrollTop() > 10) {
      $(".home_header").addClass("scrolled");
    } else {
      $(".home_header").removeClass("scrolled");
    }
  });
  // headerComponent();

  // for right nav menu
  $('.menu').click(function() {
    $(this).toggleClass('open');
  });

  $('.product_filter > ul > li').click(function() {
    var val = $(this).attr("data-target");
  });
  /*
  ===============================================
      HEADER DROPDOWN
  ===============================================
  */

  $(document).on('click', '[data-toggle="collapse_slide"]', function(e) {
    e.preventDefault();
    $('[data-toggle="collapse_slide"]').removeClass('active');
    $(this).addClass('active');
    list = $(this);
    var id = $(this).data('target');
    var hideCount = 0;
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      var elementId = $(element).data('target');
      if (id === elementId) {
        if ($(id).is(":visible")) {
          $(this).removeClass('open');
          $(this).removeClass('active');
          $(id).slideUp();
          hideCount++;
        } else {
          $(id).slideDown();
          if($(".header_area").hasClass('home_header'))
            $(".header_area").addClass('has_scroll')
        }
      } else {
        $(this).removeClass('open');
        $(elementId).slideUp();
        hideCount++;
      }
    }

  });

  $(document).on('click', '[data-toggle="collapse_l_r"]', function(e) {
    $('.mobile_overlay').addClass('open')
    list = $('[data-toggle="collapse_l_r"]');
    var selected = $(this);
    var selectedId = $(this).data('target');
    var hideCount = 0;
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      var elementId = $(element).data('target');
      if (selectedId === elementId) {
        if ($(selectedId).hasClass("open_h_menu")) {
          $(selectedId).removeClass('open_h_menu');
          $(selected).removeClass('active');
          hideCount++;
        } else {
          $(selectedId).addClass('open_h_menu');
          $(selected).addClass('active');
        }
        if (selectedId != '#menu') {
          $('.menu').removeClass('open');
        }
      } else {
        $(elementId).removeClass('open_h_menu');
        $(element).removeClass('active');
        hideCount++;
      }
    }
    if (list.hasClass('active')) {
      $('body').addClass('overflow_hidden');
    } else {
      $('body').removeClass('overflow_hidden');
    }
  });

  var activeId = '';
  $(document).on('click', '[data-toggle="collapse_noslide"]', function(e) {
    e.preventDefault();
    if($(".header_area").hasClass('home_header')){
      $(".header_area").addClass('has_scroll')
    }
    list = $('[data-toggle="collapse_noslide"]');
    var id = $(this).data('target');
    var hideCount = 0;
    for (let index = 0; index < list.length; index++) {
      const element = list[index];

      var elementId = $(element).data('target');
      if (id === elementId) {
        if (activeId != '' && elementId == activeId) {
          activeId = '';
          $(id).hide();
          $(id).removeClass("opened_slide");
          $(".header_area").removeClass('has_scroll')
          hideCount++;
        } else {
          activeId = id;
          $(id).show();
          $(id).addClass("opened_slide");
        }
      } else {
        $(elementId).hide();
        $(elementId).removeClass("opened_slide");
        hideCount++;
      }
    }
  });


  $(document).on('click', '[data-toggle="collapse_m_nav"]', function(e) {
    var mNavId = $(this).data('target');
    $(mNavId).addClass('open_h_menu');
  });

  $('.back').click(function() {
    $(this).closest('.show_from_left').removeClass('open_h_menu');
  });


  $(document).mouseup(function(e) {
    $('[data-toggle="collapse_slide"]').removeClass('active');
    let menuHideCount = 0;
    let totalMenuModal = $('.submenu , .f_bottom').length
    $('.submenu , .f_bottom').each(function() {
      var dropdown = $(this);
      if (!dropdown.is(e.target) && dropdown.has(e.target).length === 0) {
        dropdown.slideUp();
        menuHideCount++;
      }
    });

    let hideCount = 0;
    let countableModal = $('.h_o_dropdown').length
    if (!$(e.target).is('[data-toggle="collapse_noslide"]')) {
      $('.h_o_dropdown').each(function() {
        var dropdown4 = $(this);
        if (!dropdown4.is(e.target) && dropdown4.has(e.target).length === 0) {
          dropdown4.hide();
          hideCount ++ ;
        }
      });
    }

    if((menuHideCount == totalMenuModal) && (hideCount == countableModal)){
      if($(e.target).is('.default') || $(e.target).is('.on_scoll')) {
        let item = $(e.target).closest('[data-toggle="collapse_noslide"]');
        var selectedId = $(item).data('target');
        if(selectedId == activeId) {
          setTimeout(() => {
            activeId = ''
            $(".header_area").removeClass('has_scroll')
          }, 50);
        }
      } else {
        activeId = ''
        $(".header_area").removeClass('has_scroll')
      }
    }
  });

  // HEADER SEARCH
  $('.header_search_form_inner span').click(function() {
    $('.header_search').hide();
  });


  $('.p_filter_close').click(function() {
    $('.p_filter_content').slideUp();
  });
  $('.p_d_mobile ul li').click(function() {
    $(this).toggleClass('active');
    $(this).siblings().removeClass('active');
  });


  /*
  =====================================
    PRODUCT SINGLE PAGE
  =====================================
  */

  $('.p_like').click(function() {
    $(this).toggleClass('p_like_toggler');
  });

  /*
  =========================================================================================
      SHOW RIGHT REVIEW MENU
  =========================================================================================

  */
  $('.write_review button').click(function() {
    $('.review_rating_right_menu').addClass('review_rating_right_menu_open');
    $('.full_screen_overlay').addClass('overlay_open');
    return false;
  });


  $('.review_area .full_screen_overlay').click(function() {
    $('.review_rating_right_menu').removeClass('review_rating_right_menu_open');
    $('.full_screen_overlay').removeClass('overlay_open');
  });
  $('.review_area .close_ic').click(function() {
    $('.review_rating_right_menu').removeClass('review_rating_right_menu_open');
    $('.full_screen_overlay').removeClass('overlay_open');
  });

  $('.review_share > span').click(function() {
    $(this).parent().toggleClass('active');
  });


  $(".progress_cont").each(function() {
    var base = $(this);
    var windowHeight = $(window).height();
    var itemPos = base.offset().top;
    var scrollpos = $(window).scrollTop() + windowHeight - 100;
    if (itemPos <= scrollpos) {
      var auptcoun = base.find(".progress-bar").attr("aria-valuenow");
      base.find(".progress-bar").css({
        "width": auptcoun + "%"
      });
      var str = base.find(".skill>span").text();
      var res = str.replace("%", "");
      if (res == 0) {
        $({
          countNumber: 0
        }).animate({
          countNumber: auptcoun
        }, {
          duration: 4000,
          easing: 'linear',
          step: function() {
            base.find(".skill>span").text(Math.ceil(this.countNumber) + "%");
          }
        });
      }
    }
  });

  /*
  =====================================
    CART PAGE
  =====================================
  */
  $('.cart_table .close').click(function() {
    $(this).closest("tr").remove();
  });
  /*
  =====================================
    CHECKOUT PAGE
  =====================================
  */
  $(document).on('click', '[data-toggle="c_slide"]', function(e) {
    e.preventDefault();
    // $(this).toggleClass('open');
    list = $(this);
    var id = $(this).data('target');
    var hideCount = 0;
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      var elementId = $(element).data('target');
      if (id === elementId) {
        if ($(id).is(":visible")) {
          // $(this).removeClass('open');
          $(id).slideUp();
          hideCount++;
        } else {
          $(id).slideDown();
        }
      } else {
        // $(this).removeClass('open');
        $(elementId).slideUp();
        hideCount++;
      }
    }
  });

  /*
  ================================
    MY ACCOUNT PAGE
  ================================
  */
  var wishlistLength = $('.wishlist_item .product_content_inner').length;
  $('.wishlist_area > h2 > span').html('(' + wishlistLength + ')');
  $('.remove_wishlist span:first-child').click(function() {
    $(this).closest(".product_content_inner").remove();
    var wishlistLength = $('.wishlist_item .product_content_inner').length;
    $('.wishlist_area > h2 > span').html('(' + wishlistLength + ')');
  });

  /*
  ===============================================
      MODAL
  ===============================================
  */
  // OPEN
  $('[data-modal-open]').on('click', function(e) {
    $('body').addClass('model_open');
    var targeted_modal_class = jQuery(this).attr('data-modal-open');
    $('[data-modal="' + targeted_modal_class + '"]').addClass('open_modal');
    // e.preventDefault();
  });
  // CLOSE
  $('[data-modal-close] , .modal_overlay').on('click', function(e) {
    $('.header_area').css('margin-right', '0px');
    $('body').removeClass('model_open');
    var targeted_modal_class = jQuery(this).attr('data-modal-close');
    $('[data-modal="' + targeted_modal_class + '"]').removeClass('open_modal');
  });
});

function bredcrumbsPosition() {
  // PRODUCT BREDCRUMBS
  if ($(window).width() >= 1024) {
    var bredcrumbsWidth = $('.product_wrap .product_heading').outerWidth();
    $('.product_wrap .product_heading').css({
      'top': `${bredcrumbsWidth}px`
    });
    $('.product_area ').css({
      'min-height': `${bredcrumbsWidth + 60}px`
    });
  } else {
    var bredcrumbsWidth = $('.product_wrap .product_heading').outerWidth();
    $('.product_wrap .product_heading').css({
      'top': 'auto'
    });
    $('.product_area ').css({
      'min-height': 'auto'
    });
  }


}

function headerComponent() {
  var DHeaderHeight = $('.main_header').outerHeight();
  var mHeaderHeight = $('.main_header_mobile').outerHeight();
  
  var checkoutHeaderHeight = $('.checkout_header .main_header').outerHeight();
  var windowHeight = $(window).height();
  var topHeight = $('.header_top').outerHeight(); 
  var base_url = window.location.origin;

  $('.show_from_left , .show_from_right ').css({
    'top': `${(mHeaderHeight + topHeight)}px`,
    'height': `calc(100% - ${mHeaderHeight + topHeight}px)`,
  });

  $(window).on('scroll', function() {  
    var common_margin = $('.cm_header').outerHeight();
    var headerHeight = $('.header_area').outerHeight();
    var scrollTop = $(window).scrollTop();
    var topHeight = $('.header_top').outerHeight(); 
    $('.show_from_left , .show_from_right').css({
      'top': `${(mHeaderHeight + topHeight)}px`,
      'height': `calc(100% - ${mHeaderHeight + topHeight }px)`,
    });
    if (scrollTop > topHeight) { 
    //   $(".home_header").addClass("fixed-top");
      $(".main_header_mobile").addClass("fixed-top");
      $('.product_filter_mobile .p_filter_content').css({
        'top': `${mHeaderHeight}px`,
        'height': `calc(100% - ${mHeaderHeight}px)`,
      });
      $('.show_from_left , .show_from_right').css({
        'top': `${(mHeaderHeight)}px`,
        'height': `calc(100% - ${mHeaderHeight}px)`,
      });
    } else {  
    //   $(".home_header").removeClass("fixed-top");
      $(".main_header_mobile").removeClass("fixed-top");
      $('.product_filter_mobile .p_filter_content').css({
        'top': `${(mHeaderHeight + topHeight)}px`,
        'height': `calc(100% - ${mHeaderHeight + topHeight}px)`,
      });
      $('.show_from_left , .show_from_right').css({
        'top': `${(mHeaderHeight + topHeight)}px`,
        'height': `calc(100% - ${mHeaderHeight + topHeight }px)`,
      });
    }
  }); 

}

function modalComponenent() {
  $('body').addClass('model_open');
  var targeted_modal_class = jQuery(this).attr('data-modal-open');
  $('[data-modal="' + targeted_modal_class + '"]').addClass('open_modal');

}

$(window).on('load', function() {
  if ($('.wcmodel').hasClass('open_modal')) {
    modalComponenent()
  }
  headerComponent();
  bredcrumbsPosition();
});

$(document).ready(function() {
  headerComponent();
  bredcrumbsPosition();
});

$(window).resize(function() {
  headerComponent();
  bredcrumbsPosition();
});

