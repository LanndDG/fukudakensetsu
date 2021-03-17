// function scrollToTop() {
//   $(".pagetop img").click(function () {
//     $("html, body").animate(
//       {
//         scrollTop: 0,
//       },
//       500
//     );
//   });
// }
// scroll to top



/*==============================*/
/* rimg */
/*==============================*/
function rimg() {
  var w = window.innerWidth;
  var bp = 768;
  var flg_sp = false;
  if (w < bp) {
      $('img').each(function() {
          if ($(this).hasClass('rimg')) {
              $(this).attr('src', $(this).attr('src').replace('_pc', '_sp'));
          }

      });
  } else if (w >= bp) {
      $('img').each(function() {
          if ($(this).hasClass('rimg')) {
              $(this).attr('src', $(this).attr('src').replace('_sp', '_pc'));
          }
      });
  }
}

/*==============================*/
/* calculate Margin of Footer */
/*==============================*/
function calculateMarginFooter() {
  var footerContactHeight = $(".footer_contact").innerHeight();
  var isToppage = $('#index');
  if (isToppage.length > 0 && window.innerWidth < 768) {
      $("#footer").css("margin-bottom", `${footerContactHeight}px`)
  } else {
      $("#footer").css("margin-bottom", 0);
  }

}

function scrollToTop() {
  var isToppage = $('#index');
  var windowHeight = window.innerHeight;
  var bodyHeight = $('body').height();

  $(window).scroll(function() {
      var scrollHeight = $(this).scrollTop();
      if (isToppage.length > 0) {
          if (windowHeight <= scrollHeight - 100) {
              $('.page_top').show();
          } else {
              $('.page_top').hide();
          }
      } else {
          if (bodyHeight >= windowHeight && scrollHeight >= 5) {
              $('.page_top').show();
          } else {
              $('.page_top').hide();
          }
      }
  });

  $(".page_top").click(function() {
      $("html, body").animate({
          scrollTop: 0
      }, 500);
  });
}

function calculateTopPagePostion() {
  var windowWidth = window.innerWidth;
  var containerWidth = 1120;
  var conditionalWidth = containerWidth + 100;

  if (windowWidth >= conditionalWidth) {
      var right = (windowWidth - conditionalWidth) / 2 - 28;
      $('.page_top').css('right', right);
  } else {
      $('.page_top').css('right', 20);
  }
}

function toggleMenu() {
    $(".btn_toggle").on("click", function() {
        $(this).toggleClass("open");
        $(".btn_toggle .toggle").toggleClass("open");
        updateCssBody();
    });
}
function updateCssBody() {
    if($('.open').length) {
        $('body').css('overflow','hidden');
    } else {
        $('body').css('overflow','unset');
    }
}

function removeMemuOnSp() {
    var windowSize = window.innerWidth;
    if ($(".btn_toggle .open").length > 0 && windowSize > 768) {
        $(".btn_toggle").removeClass("open");
        $(".btn_toggle .toggle").removeClass("open");
    }
}
//menu

jQuery.validator.addMethod("emailRule", function(value, element) {
  return value.match(/^[\.!#%&\-_0-9a-zA-Z\?\/\+]+\@[!#%&\-_0-9a-zA-Z]+\.[!#%&\-_0-9a-zA-Z]+/);
}, '入力に誤りがあります。');

$("#form").validate({
  invalidHandler: function(form, validator) {
      var errors = validator.numberOfInvalids();
      var offsetSize = $("header").innerHeight();
      if (errors) {
          var firstInvalidElement = $(validator.errorList[0].element);
          $('html,body').animate({
              scrollTop: firstInvalidElement.offset().top - offsetSize
          }, 500);
      }
  },
  normalizer: function(value) {
      // Trim the value of every element
      return $.trim(value);
  },
rules: {
    'お名前': {
        required: true
    },
    'メールアドレス': {
        required: true,
        email: true,
        emailRule: true
    },
    'お問い合せ内容': {
        required: true,
    }
},
messages: {
    'お名前': {
        required: "未入力です。",
    },
    'メールアドレス': {
        required: "未入力です。",
        email: "入力に誤りがあります。"
    },
    'お問い合せ内容': {
        required: "未入力です。",
    }
},

  // エラーメッセージ出力箇所
  errorPlacement: function(error, element) {
      var name = element.attr("name");
      if (element.attr("name") === name) {
          error.appendTo($(".is_error_" + name));
      }
      if ($(".table-contact input").find(".is-error")) {
          $(".table-contact tbody tr:nth-child(2) td").css("padding-top", "12px");
          $(".table-contact tbody tr:nth-child(2) td").css("padding-bottom", "12px");
          $(".table-contact tbody tr:nth-child(3) td").css("padding-top", "12px");
          $(".table-contact tbody tr:nth-child(3) td").css("padding-bottom", "12px")
      }
  },

  errorElement: "span",
  errorClass: "is-error",
});
//form

scrollToTop();
calculateTopPagePostion();
toggleMenu();
rimg();
calculateMarginFooter();
$(window).resize(function() {
  calculateTopPagePostion();
  removeMemuOnSp();
  rimg();
  calculateMarginFooter();
  updateCssBody();
});
var $window = $(window);
var $body = $("body");
var $html = $("html");
var $bodyHtml = $("body,html");
var winwidth = window.innerWidth;
window.addEventListener("scroll", _handleScroll, false);

function _handleScroll() {
  $("#header").css({
      left: -window.scrollX + "px",
  });
}

function updateHeader() {
  var isToppage = $('#index');
  if (isToppage.length > 0) {
      $(window).scroll(function() {
          if ($(this).scrollTop() >= 0) {
              $("#header").addClass('activer');
          } else {
              $("#header").removeClass('activer');
          }
      });
  } else {
      $("#header").addClass('activer');
  }
}
updateHeader();
// Anchor link smooth
$(document).on('click', 'a[href^="#"]', function(event) {
  event.preventDefault();
  var offsetSize = $("header").innerHeight() + 50;
  $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top -offsetSize
  }, 900);
});


(function QAAccordion() {
  const triggers = document.querySelectorAll('[data-toggle="collapse"]');
  let activeToggle;

  triggers &&
      triggers.forEach(trigger => {
          trigger.collapseTarget = document.querySelector(
              trigger.hash || trigger.dataset.target);


          trigger.collapseTarget.dataset.parent &&
              trigger.collapseTarget.classList.contains("is-active") && (
                  activeToggle = trigger);

          trigger.addEventListener("click", event => {
              event.preventDefault();
              event.stopPropagation();
              toggle(trigger);
          });

          // Remove height when end open transition
          trigger.collapseTarget.addEventListener("transitionend", ({ target }) => {
              if (!target.classList.contains("is-active")) return;

              target.style.height = null;
          });
      });

  function toggle(trigger) {
      if (trigger.collapseTarget.classList.contains("is-active")) {
          close(trigger);
          activeToggle = null;
      } else {
          // open comment if only collapse 1 item
          // activeToggle &&
          // activeToggle.collapseTarget.dataset.parent &&
          // close(activeToggle);

          trigger.collapseTarget.dataset.parent && (activeToggle = trigger);

          open(trigger);
      }
  }

  function close(trigger) {
      setHeight(trigger.collapseTarget);

      trigger.parentElement.classList.remove("is-active");
      trigger.classList.remove("is-active");
      trigger.collapseTarget.classList.remove("is-active");

      setTimeout(() => {
          trigger.collapseTarget.style.height = null;
      }, 0);
  }

  function open(trigger) {
      trigger.classList.add("is-active");
      trigger.parentElement.classList.add("is-active");

      setTimeout(() => {
          setHeight(trigger.collapseTarget);
          trigger.collapseTarget.classList.add("is-active");
      }, 0);
  }

  function setHeight(target) {
      target.style.height = target.scrollHeight + "px";
  }
})();
(function() {
    if(window.ScrollHint) {
        new ScrollHint('.js-scrollable', {
            scrollHintIconAppendClass: 'custom-scroll-hint-icon', // add class custom default scroll hint icon
            suggestiveShadow: false,
            applyToParents: true,
            i18n: {
                scrollable: 'スクロールできます'
            }
        });
    }
})();
  