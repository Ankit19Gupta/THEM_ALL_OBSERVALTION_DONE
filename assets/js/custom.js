var imgDescSwiper,
  filterCardSwiper,
  leaderListSwiper,
  testimonialListSwiper,
  teamListSwiper,
  newsListSwiper,
  galleryListSwiper,
  neoExpSwiper,
  neoBgSwiper,
  countNum,
  smoothScrollbar;

var tagGlowInterval, counterInterval;

var blogRss = {
  rss_url: "https://medium.com/feed/@DisrupThis",
};

var rssApi = "https://api.rss2json.com/v1/api.json";

var selTxt = "";

/* Greensock Variables */
var stepAnimTLMain;

/* Greensock Variables */
var stepAnimTLMain;

var stepAnimTL = [];

var cardTimeline;

CustomEase.create("barEase", ".77,0,.175,1");

CustomEase.create("textEase", ".165,.84,.44,1");

/* Generic Function: Header Scrolling */
function headerJs(obj) {
  if (device.mobile() === false && device.tablet() === false) {
    if (obj > 100) {
      if ($("body").hasClass("pg-dark")) {
        $(".bs-header").addClass("typ-white");
        $(".bs-header").addClass("scroll");
      } else {
        $(".bs-header").addClass("scroll");
      }
    } else {
      if ($("body").hasClass("pg-dark")) {
        $(".bs-header").removeClass("typ-white");
        $(".bs-header").removeClass("scroll");
      } else {
        $(".bs-header").removeClass("scroll");
      }
    }
  } else {
    $(window).scroll(function (e) {
      if ($(this).scrollTop() > 100) {
        if ($("body").hasClass("pg-dark")) {
          $(".bs-header").addClass("typ-white");
          $(".bs-header").addClass("scroll");
        } else {
          $(".bs-header").addClass("scroll");
        }
      } else {
        if ($("body").hasClass("pg-dark")) {
          $(".bs-header").removeClass("typ-white");
          $(".bs-header").removeClass("scroll");
        } else {
          $(".bs-header").removeClass("scroll");
        }
      }
    });
  }
}

/* Generic Function: Image to Bg Convert */
function setBg() {
  $(".js-set-bg").each(function () {
    var imgSrc = $(this).find(".js-fetch-src").attr("src");
    $(this).css("background-image", "url(" + imgSrc + ")");
  });
}

// Set Background image from image source
function setPicBg() {
  $(".js-set-pic-bg").each(function () {
    var currentImg = $(this).find(".js-fetch-pic-src")[0];
    var currentImgPath = currentImg.currentSrc;
    $(this).css("background-image", "url(" + currentImgPath + ")");
    // }
  });
}

/* Generic Function: Banner Grid Lines */
function drawGridLines(gridSize) {
  var lineEle = '<span class="line"></span>';
  var gridWidth = 100 / gridSize;
  $(".grid-lines").each(function () {
    var gridPos = 0;
    for (var i = 0; i < gridSize - 1; i++) {
      gridPos += gridWidth;
      $(this).append($(lineEle).css("left", gridPos + "%"));
    }
  });
}

/* Generic Function: Scroll to section */
function scrollToSec() {
  $(".js-scroll-to").on("click", function (e) {
    if ($(this).data("url") !== undefined) {
      if ($(this).data("url") === $(this).closest("body").data("pg")) {
        e.preventDefault();
        e.stopPropagation();
        var currTgt = $(this).data("id");
        var offsetPos = $("#" + currTgt).offset().top;
        var headrH = $(".bs-header").height();
        $(".js-scroll-to").removeClass("active");
        $(this).addClass("active");
        if (device.mobile() === false && device.tablet() === false) {
          smoothScrollbar.scrollIntoView(document.getElementById(currTgt), {
            offsetTop: headrH,
            offsetLeft: 0,
          });
        } else {
          $("html").animate(
            {
              scrollTop: offsetPos - headrH,
            },
            800,
          );
        }
      } else {
        localStorage.setItem("scrollto", $(this).data("id"));
      }
    } else {
      e.preventDefault();
      e.stopPropagation();
      var currTgt = $(this).data("id");
      var offsetPos = $("#" + currTgt).offset().top;
      var headrH = $(".bs-header").height();
      $(".js-scroll-to").removeClass("active");
      $(this).addClass("active");
      if (device.mobile() === false && device.tablet() === false) {
        smoothScrollbar.scrollIntoView(document.getElementById(currTgt), {
          offsetTop: headrH,
          offsetLeft: 0,
        });
      } else {
        $("html").animate(
          {
            scrollTop: offsetPos - headrH,
          },
          800,
        );
      }
    }
  });
}

/* Generic Function: Fetch Video source and insert */
function videoIns() {
  $(".js-video-fetch").each(function () {
    if (device.mobile() === true) {
      var vidSrc = $(this).data("mbsrc");
    } else {
      var vidSrc = $(this).data("src");
    }
    $(this).attr("src", vidSrc);
  });
}

// Footer tag glow function
function tagGlow() {
  var tagCount = $(".bs-tag .item").length;
  var currGlow = 0;
  tagGlowInterval = setInterval(function () {
    currGlow = Math.floor(Math.random() * tagCount);
    $(".bs-tag .item").find("a").removeClass("active");
    $(".bs-tag .item").eq(currGlow).find("a").addClass("active");
  }, 1e3);
}

// Generic Function: Mobile banner window height
function innerWindHt() {
  var windInnHt = $(window).innerHeight();
  $(".bs-banner").height(windInnHt);
}

// Generic Function: Header Menu active
function menuActive() {
  var pgActive = $("body").data("pg");
  $(".bs-header .nav-item").removeClass("active");
  $('.bs-header .nav-item[data-route="' + pgActive + '"]').addClass("active");
}

// Generic Function: Dropdown
function dropdownShow() {
  $(".js-dropdown").on("click", function (e) {
    e.stopPropagation();
    if (
      $(this).closest(".form-group").find(".dropdown-wrap").hasClass("show") ===
      true
    ) {
      $(this).closest(".form-group").find(".dropdown-wrap").removeClass("show");
      if (device.mobile() === false && device.tablet() === false) {
        Scrollbar.destroy(
          $(this).closest(".form-group").find(".dropdown-wrap")[0],
        );
      }
    } else {
      $(this).closest(".form-group").find(".dropdown-wrap").addClass("show");
      if (
        device.mobile() === false &&
        device.tablet() === false &&
        $(this)
          .closest(".form-group")
          .find(".dropdown-wrap")
          .hasClass("init-scroll") === true
      ) {
        var scrollbarDd = Scrollbar.init(
          $(this).closest(".form-group").find(".dropdown-wrap")[0],
          {
            speed: 0.75,
          },
        );
      }
    }
  });
  $(document).on("click", function () {
    if ($(".bs-form .dropdown-wrap").hasClass("show") === true) {
      $(".bs-form .dropdown-wrap").removeClass("show");
    }
  });
}

// Generic Function: Validator default
function validationDefault() {
  $.validator.setDefaults({
    ignore: [],
    errorClass: "error-text",
    success: "valid",
    highlight: function (element) {
      $(element).closest(".form-group").addClass("has-error");
      $(element).addClass("invalid");
    },
    unhighlight: function (element) {
      $(element).closest(".form-group").removeClass("has-error");
      $(element).removeClass("invalid");
    },
    errorPlacement: function (error, element) {
      error.appendTo(element.closest(".form-group"));
    },
  });
}

// Contact Form Validation and Submission
function contactForm() {
  var formSubmissionUrl =
    "https://script.google.com/macros/s/AKfycbx0pEKgVBDiLKsRqGonOr8qFkwlQLE5TYUtz1dY5qj-SDHqH80KsGxGWwoGKai6r53NpA/exec";
  // var formSubmissionUrl = "https://script.google.com/macros/s/AKfycbxn74HCFXXrzWB4bJM_-VzBarU4gsMaGkeRnLFxfXbv0OsbfbP7/exec";
  var dataObj = {};
  $(".contact-form").each(function () {
    $(this).validate({
      rules: {
        name: {
          required: true,
        },
        email: {
          email: true,
        },
        mobile: {
          required: true,
          minlength: 10,
          maxlength: 10,
        },
        message: {
          required: true,
        },
      },
      messages: {
        name: {
          required: "Please enter name",
        },
        email: {
          email: "Please enter a valid email",
        },
        mobile: {
          required: "Please enter a mobile number",
          minlength: "Please enter a valid mobile number",
          maxlength: "Please enter a valid mobile number",
        },
        message: {
          required: "Please enter a message",
        },
      },
    });
  });
  $(".js-submit").on("click", function (e) {
    var formObj = $(this).closest("form");
    $(this).attr("disabled", "disabled");
    $(this).html("Please Wait...");
    selTxt = "";
    if (formObj.valid() === true) {
      e.preventDefault();
      $.ajax({
        url: "https://script.google.com/macros/s/AKfycbx0pEKgVBDiLKsRqGonOr8qFkwlQLE5TYUtz1dY5qj-SDHqH80KsGxGWwoGKai6r53NpA/exec",
        // url: 'https://script.google.com/macros/s/AKfycbzIEd29Se1lrGpRagF0qCDGjGVOTclRvXxenMSA8JzHcmRn3KDmkFZlq0CUM9P69iwU_w/exec',
        method: "POST",
        dataType: "json",
        data: serializeObj(formObj),
      })
        .done(function (data) {
          if (data.result === "success") {
            $(formObj).find(".result-wrap").addClass("success");
            $(formObj).find(".result-wrap").addClass("active");
          } else {
            $(formObj).find(".result-wrap").addClass("fail");
            $(formObj).find(".result-wrap").addClass("active");
          }
          setTimeout(function () {
            $(formObj).closest(".bs-modal").removeClass("active");
            $(formObj).trigger("reset");
            $(formObj)
              .find(".result-wrap")
              .removeClass("active", "success", "fail");
            location.reload();
          }, 4e3);
        })
        .fail(function (error) {
          $(formObj).find(".result-wrap").addClass("fail");
          $(formObj).find(".result-wrap").addClass("active");
          setTimeout(function () {
            $(formObj).closest(".bs-modal").removeClass("active");
            $(formObj).trigger("reset");
            $(formObj)
              .find(".result-wrap")
              .removeClass("active", "success", "fail");
            location.reload();
          }, 4e3);
        });
    }
  });

  function serializeObj(obj) {
    var chkfield = "";
    dataObj["date"] = getCurrDate();
    $(obj)
      .find("input,textarea")
      .each(function () {
        if ($(this).is(":checkbox") === true && $(this).prop("checked")) {
          if (dataObj[$(this).attr("name")] === undefined) {
            dataObj[$(this).attr("name")] = "";
          }
          chkfield = $(this).attr("name");
          dataObj[$(this).attr("name")] += $(this).val() + ",";
        } else if ($(this).is(":checkbox") === false) {
          dataObj[$(this).attr("name")] = $(this).val();
        }
      });
    dataObj[chkfield] = dataObj[chkfield].slice(0, -1);
    return dataObj;
  }

  function getCurrDate() {
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output =
      (("" + day).length < 2 ? "0" : "") +
      day +
      "/" +
      (("" + month).length < 2 ? "0" : "") +
      month +
      "/" +
      d.getFullYear();
    return output;
  }
}
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1);
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}
var cookie = getCookie("userAlreadyRegistered");
//Lead Gen Validation and Submission
function leadForm() {
  // var formSubmissionUrl = "https://script.google.com/macros/s/AKfycbzIEd29Se1lrGpRagF0qCDGjGVOTclRvXxenMSA8JzHcmRn3KDmkFZlq0CUM9P69iwU_w/exec";
  // var formSubmissionUrl = "https://script.google.com/macros/s/AKfycbym-DhH34ay0EZlelYCW0kMDahectmaNCrvAnvd0EQd4o4I8vgCfUugmOZxLJXzhWYE/exec";
  var dataObj = {};
  $.validator.addMethod(
    "textOnly",
    function (value, element) {
      return /^[A-Za-z\s]+$/.test(value);
    },
    "Please enter text only",
  );
  $(".lead-gen").each(function () {
    $(this).validate({
      rules: {
        name: {
          required: true,
          textOnly: true,
        },
        email: {
          email: true,
          required: true,
        },
        mobile: {
          required: true,
          minlength: 10,
          maxlength: 10,
        },
        message: {
          required: true,
        },
      },
      messages: {
        name: {
          required: "Please enter name",
        },
        email: {
          required: "Please enter email",
          email: "Please enter a valid email",
        },
        mobile: {
          required: "Please enter a mobile number",
          minlength: "Please enter a valid mobile number",
          maxlength: "Please enter a valid mobile number",
        },
        message: {
          required: "Please enter a message",
        },
      },
    });
  });
  if ($(".js-blog-submit").length != 0) {
    $(".lead-gen .js-blog-submit").attr("disabled", "disabled");
    $(".bs-form-modal .lead-gen .form-control").on("blur keyup", function () {
      if ($(".bs-form-modal .lead-gen").validate().checkForm()) {
        $(".lead-gen .js-blog-submit").removeAttr("disabled");
      } else {
        $(".lead-gen .js-blog-submit").attr("disabled", "disabled");
      }
    });
  }
  if ($(".js-submit").length != 0) {
    $(".lead-gen .js-submit").attr("disabled", "disabled");
    $(".lead-gen .form-control").on("blur keyup", function () {
      if ($(".lead-gen").validate().checkForm()) {
        $(".lead-gen .js-submit").removeAttr("disabled");
      } else {
        $(".lead-gen .js-submit").attr("disabled", "disabled");
      }
    });
  }

  $(".lead-gen .js-submit").on("click", function (e) {
    $(this).attr("disabled", "disabled");
    $(this).find("span").first().html("Please Wait...");
    var formObj = $(this).closest("form");
    selTxt = "";
    if (formObj.valid() === true) {
      e.preventDefault();
      // $.ajax({
      //     method: 'POST',
      //     url: 'https://script.google.com/macros/s/AKfycbzIEd29Se1lrGpRagF0qCDGjGVOTclRvXxenMSA8JzHcmRn3KDmkFZlq0CUM9P69iwU_w/exec',
      //     dataType: 'json',
      //     accepts: 'application/json',
      //     data: formObj.serialize(),
      //     success: (data) => {
      //         if (data.success === "true") {
      //             $(formObj).find(".result-wrap").addClass("success");
      //             $(formObj).find(".result-wrap").addClass("active");
      //             setTimeout(function () {
      //                 $(formObj).find(".result-wrap").removeClass("active", "success", "fail");
      //                 location.href = blogUrl;
      //             }, 4e3);
      //         } else {
      //             $(formObj).find(".result-wrap").addClass("fail");
      //             $(formObj).find(".result-wrap").addClass("active");
      //             setTimeout(function () {
      //                 $(formObj).find(".result-wrap").removeClass("active", "success", "fail");
      //             }, 4e3);
      //         }
      //     },
      //     error: (err) => {
      //         $(formObj).find(".result-wrap").addClass("fail");
      //         $(formObj).find(".result-wrap").addClass("active");
      //         setTimeout(function () {
      //             $(formObj).find(".result-wrap").removeClass("active", "success", "fail");
      //         }, 4e3);
      //     }
      // });
      $.ajax({
        url: "https://script.google.com/macros/s/AKfycbx0pEKgVBDiLKsRqGonOr8qFkwlQLE5TYUtz1dY5qj-SDHqH80KsGxGWwoGKai6r53NpA/exec",
        // url: 'https://script.google.com/macros/s/AKfycbzIEd29Se1lrGpRagF0qCDGjGVOTclRvXxenMSA8JzHcmRn3KDmkFZlq0CUM9P69iwU_w/exec',
        method: "POST",
        dataType: "json",
        data: formObj.serialize(),
      })
        .done(function (data) {
          if (data.result === "success") {
            $(formObj).find(".result-wrap").addClass("success");
            $(formObj).find(".result-wrap").addClass("active");
            setCookie("userAlreadyRegistered", "true", 365);
          } else {
            $(formObj).find(".result-wrap").addClass("fail");
            $(formObj).find(".result-wrap").addClass("active");
          }
          setTimeout(function () {
            $(formObj).trigger("reset");
            $(formObj)
              .find(".result-wrap")
              .removeClass("active", "success", "fail");
            location.reload();
          }, 4e3);
        })
        .fail(function (error) {
          $(formObj).find(".result-wrap").addClass("fail");
          $(formObj).find(".result-wrap").addClass("active");
          setTimeout(function () {
            $(formObj).trigger("reset");
            $(formObj)
              .find(".result-wrap")
              .removeClass("active", "success", "fail");
          }, 4e3);
        });
    }
  });
}

// Dropdown Multiselect function
function multiSel() {
  $(".bs-form .dropdown-wrap .bs-checkbox input[type=checkbox]").change(
    function (e) {
      e.stopPropagation();
      $(this).closest(".dropdown-wrap").addClass("show");
      if ($(this).prop("checked") === true) {
        if (selTxt === "") {
          selTxt += $(this).val();
        } else {
          selTxt += "," + $(this).val();
        }
      } else {
        if (selTxt.indexOf("," + $(this).val()) != -1) {
          selTxt = selTxt.replace("," + $(this).val(), "");
        } else if (selTxt.indexOf($(this).val() + ",") != -1) {
          selTxt = selTxt.replace($(this).val() + ",", "");
        } else {
          selTxt = selTxt.replace($(this).val(), "");
        }
      }
      $(this).closest(".form-group").find(".js-dropdown").val(selTxt);
    },
  );
}

/* Home Page: Number Countup Function */
function numberSecCounter(totnum) {
  var tempNumStore = 0;
  $(".bs-number .number-list").each(function () {
    for (var i = 0; i < totnum; i++) {
      var randomNum = Math.floor(Math.random() * 5);
      while (tempNumStore === randomNum) {
        randomNum = Math.floor(Math.random() * 5);
      }
      tempNumStore = randomNum;
      var getNum = Number(
        $(this).find(".count-desc").eq(randomNum).find(".num").text(),
      );
      var options = {
        useEasing: true,
        useGrouping: true,
        separator: ",",
        decimal: ".",
      };

      function chkDecimal() {
        if (
          $(this)
            .find(".count-desc")
            .eq(randomNum)
            .find(".num")
            .text()
            .includes(".")
        ) {
          var temp = $(this)
            .find(".count-desc")
            .eq(randomNum)
            .find(".num")
            .text()
            .split(".");
          var decimalCount = temp[1].length;
          return decimalCount;
        } else {
          return 0;
        }
      }
      var counterObj = new CountUp(
        $(this).find(".count-desc").eq(randomNum).find(".num")[0],
        0,
        getNum,
        chkDecimal(),
        5,
        options,
      );
      if (!counterObj.error) {
        counterObj.start();
      } else {
        console.error(counterObj.error);
      }
    }
    tempNumStore = 0;
  });
}

/* Home Page: Banner Video Slide change */
function videoSlide() {
  var vid = document.getElementById("video-slide");
  var vidStart,
    vidEnd,
    timeDiff = 0;
  vid.addEventListener("timeupdate", function () {
    $(".video-data .mod-num-info").each(function () {
      vidStart = Number($(this).data("vidstart"));
      vidEnd = Number($(this).data("vidend"));
      timeDiff = vidEnd - vidStart;
      if (vid.currentTime >= vidStart && vid.currentTime < vidEnd) {
        $(".video-data .mod-num-info").removeClass("active");
        $(".video-data .line-duration").css({
          "transition-duration": "0.3s",
        });
        $(this).addClass("active");
        $(this)
          .find(".line-duration")
          .css({
            "transition-duration": timeDiff + "s",
          });
      }
    });
  });
}

function swiperImgDesc() {
  imgDescSwiper = new Swiper("#img-desc", {
    slidesPerView: "auto",
    spaceBetween: 24,
    speed: 800,
    navigation: {
      nextEl: "#img-desc .swiper-button-next",
      prevEl: "#img-desc .swiper-button-prev",
    },
    breakpoint: {
      768: {},
    },
  });
}

function swiperAdvantage() {
  filterCardSwiper = new Swiper("#advtg-swiper", {
    slidesPerView: 1,
    effect: "fade",
    loop: false,
    speed: 800,
    noSwiping: true,
    noSwipingSelector: "#advtg-swiper .advtg-card-wrap",
    navigation: {
      nextEl: "#advtg-swiper .btn-next",
      prevEl: "#advtg-swiper .btn-prev",
    },
  });
}

function swiperTeamList() {
  $(".bs-team .swiper-container").each(function () {
    new Swiper(this, {
      slidesPerView: "auto",
      loop: false,
      spaceBetween: 16,
      speed: 800,
      freeMode: true,
      navigation: {
        nextEl: $(this).find(".swiper-button-next")[0],
        prevEl: $(this).find(".swiper-button-prev")[0],
      },
      breakpoints: {
        768: {
          freeMode: false,
        },
      },
    });
  });
}

function swiperVideoList() {
  teamListSwiper = new Swiper("#video-list", {
    slidesPerView: "auto",
    loop: false,
    spaceBetween: 16,
    speed: 800,
    freeMode: true,
    navigation: {
      nextEl: "#video-list .swiper-button-next",
      prevEl: "#video-list .swiper-button-prev",
    },
    breakpoint: {
      768: {
        freeMode: false,
      },
    },
  });
}
function swiperNewsList() {
  newsListSwiper = new Swiper("#news-list", {
    slidesPerView: "auto",
    loop: false,
    spaceBetween: 16,
    speed: 800,
    freeMode: true,
    navigation: {
      nextEl: "#news-list .swiper-button-next",
      prevEl: "#news-list .swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    breakpoint: {
      768: {
        freeMode: false,
      },
    },
  });
}
function swiperLeaderList() {
  leaderListSwiper = new Swiper("#leader-list", {
    slidesPerView: "auto",
    loop: true,
    spaceBetween: 16,
    speed: 800,
    // freeMode: true,
    navigation: {
      nextEl: "#leader-list .swiper-button-next",
      prevEl: "#leader-list .swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    breakpoint: {
      768: {
        freeMode: false,
      },
    },
  });
}
function swiperTestimonialList() {
  testimonialListSwiper = new Swiper("#testimonial-list", {
    slidesPerView: "auto",
    loop: false,
    spaceBetween: 16,
    speed: 800,
    freeMode: true,
    navigation: {
      nextEl: "#testimonial-list .swiper-button-next",
      prevEl: "#testimonial-list .swiper-button-prev",
    },
    pagination: {
      el: "#testimonial-list .swiper-pagination",
      type: "fraction",
    },
    breakpoint: {
      768: {
        freeMode: false,
      },
    },
  });
}
function swiperGalleryList() {
  teamListSwiper = new Swiper("#gallery-list", {
    loop: true,
    freeMode: true,
    spaceBetween: 16,
    grabCursor: true,
    slidesPerView: "auto",
    loop: true,
    autoplay: {
      delay: 1,
      disableOnInteraction: true,
    },
    freeMode: true,
    speed: 5000,
    freeModeMomentum: false,
  });
  galleryListSwiper = new Swiper("#gallery-list1", {
    loop: true,
    freeMode: true,
    spaceBetween: 16,
    grabCursor: true,
    slidesPerView: "auto",
    loop: true,
    autoplay: {
      delay: 1,
      disableOnInteraction: true,
      reverseDirection: true,
    },
    freeMode: true,
    speed: 5000,
    freeModeMomentum: false,
  });
}

function swiperNeoExp() {
  neoExpSwiper = new Swiper("#neo-exp", {
    slidesPerView: "auto",
    spaceBetween: 0,
    speed: 800,
    loop: true,
    loopedSlides: $("#neo-exp .swiper-slide").length,
    freeMode: false,
    navigation: {
      nextEl: "#neo-exp .swiper-button-next",
      prevEl: "#neo-exp .swiper-button-prev",
    },
    breakpoint: {
      768: {
        freeMode: false,
      },
    },
  });
}

function swiperNeoBg() {
  neoBgSwiper = new Swiper("#bg-switch", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    loopedSlides: $("#bg-switch .swiper-slide").length,
    speed: 800,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
  });
  neoExpSwiper.controller.control = neoBgSwiper;
  neoBgSwiper.controller.control = neoExpSwiper;
}

function stageGrowth() {
  stepAnimTLMain = gsap.timeline({
    paused: true,
  });
  $(".bs-stage-growth .stage-step").each(function (e) {
    var obj = this;
    var nextStepDelay = e * 0.4 + 0.2;
    stepAnimTL[e] = gsap.timeline({
      delay: nextStepDelay,
      paused: true,
    });
    stepAnimTL[e]
      .from(obj, {
        duration: 1.2,
        ease: "barEase",
        css: {
          height: 0,
        },
      })
      .from($(obj).find(".step-title"), {
        duration: 0.5,
        ease: "sine.out(10)",
        css: {
          transform: "translateY(-5px)",
          opacity: "0",
        },
      })
      .from(
        $(obj).find(".item span"),
        {
          duration: 0.4,
          ease: "textEase",
          css: {
            opacity: 0,
            transform: "translateY(105%) translateZ(0)",
          },
          stagger: {
            each: 0.1,
            from: "start",
            amount: 0.4,
          },
        },
        "-=0.8",
      );
  });
}

/* General : Page Scroll Effect */
function pageSmoothScroll() {
  var winH = $(window).height();

  function handleMainScroll(scrollTop) {
    $("#proxyScroll").scrollTop(scrollTop);
    if ($(".bs-header").length != 0) {
      headerJs(scrollTop);
    }
    if ($(".prlx-view").length != 0) {
      prlxView(scrollTop);
    }
    if ($(".bs-offerings").length != 0) {
      $(".bs-offerings .offering-item").each(function (e) {
        var obj = this;
        if (
          $(obj).offset().top <= winH &&
          $(obj).offset().top >= -$(obj).outerHeight()
        ) {
          var transitionVal =
            -45 + ($(obj).offset().top / (winH / 2)) * 10 + "%";
          $(obj)
            .find(".info-wrap")
            .css({
              transform: "translateY(" + transitionVal + ")",
            });
        }
      });
    }
    if ($(".bs-number").length != 0) {
      if ($(".bs-number").offset().top <= -$(".bs-number").outerHeight()) {
        clearInterval(counterInterval);
      }
    }
  }

  if ($("#scroll-view").length != 0 && typeof Scrollbar !== "undefined") {
    $("#scroll-view").css({
      height: $(window).height(),
    });
    $("#proxyScroll").css({
      height: $(window).height(),
    });
    smoothScrollbar = Scrollbar.init($("#scroll-view")[0], {
      speed: 1.3,
      damping: 0.1,
      alwaysShowTracks: false,
      continuousScrolling: true,
    });
    $("#proxyScrollContent").height($(".scroll-content")[0].scrollHeight);
    smoothScrollbar.addListener(function (status) {
      handleMainScroll(status.offset.y);
    });
  }

  $(window).on("scroll", function () {
    if (typeof smoothScrollbar === "undefined" || !smoothScrollbar) {
      handleMainScroll($(window).scrollTop() || 0);
    }
  });

  /* Work page - Intial */
  if ($(".prlx-view").length != 0) {
    var transitionVal =
      ($(".prlx-view").offset().top / ($(window).height() / 2)) * -12 + "%";
    $(".prlx-view")
      .eq(0)
      .find(".prlx-box")
      .css({
        transform: "translate3d(0px," + transitionVal + ",0px)",
      });
    $(".prlx-view.bs-footer")
      .find(".prlx-box")
      .css({
        transform: "translate3d(0px," + "-50%" + ",0px)",
      });
  }
}

function prlxView(Yobj) {
  var winH = $(window).height();
  var scrollTop = Yobj;
  var viewBottom = scrollTop + winH;
  var startVal = 25;
  $(".prlx-view").each(function (e) {
    var obj = this;
    if (
      $(obj).offset().top <= winH &&
      $(obj).offset().top >= -$(obj).outerHeight()
    ) {
      if ($(obj).hasClass("bs-footer")) {
        var transitionVal = ($(obj).offset().top / (winH / 2)) * -18;
        transitionVal = transitionVal <= 0 ? transitionVal : 0;
        transitionVal = transitionVal + "%";
      } else if ($(obj).hasClass("prlx-video-full")) {
        var transitionVal = ($(obj).offset().top / (winH / 2)) * -40 + "%";
      } else {
        var transitionVal = ($(obj).offset().top / (winH / 2)) * -12 + "%";
      }
      $(obj)
        .find(".prlx-box")
        .css({
          transform: "translate3d(0px," + transitionVal + ",0px)",
        });
    }
  });
  if ($(".bs-innovation .infography-container").length != 0) {
    if (
      $(".bs-innovation .infography-container").offset().top <= winH &&
      $(".bs-innovation .infography-container").offset().top >=
        -$(".bs-innovation .infography-container").outerHeight()
    ) {
      var transitionVal =
        ($(".bs-innovation .infography-container").offset().top / (winH / 2)) *
          -80 +
        "px";
      $(".bs-innovation .infography-container").css(
        "background-position-y",
        transitionVal,
      );
    }
  }
}

function productCard() {
  cardTimeline = gsap.from(".mod-infography-card", {
    paused: true,
    y: 160,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "textEase",
  });
}
var blogUrl;
function mediumBlog() {
  $.get(rssApi, blogRss, function (response) {
    if (response.status == "ok") {
      if ($(".bs-blog").length != 0) {
        // var output = "";
        // var $content = $(".bs-blog .swiper-wrapper");
        // $(".bs-blog .swiper-wrapper").html("");
        // $.each(response.items, function (k, item) {
        //     var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        //     var tagIndex = item.description.indexOf("<img");
        //     var srcIndex = item.description.substring(tagIndex).indexOf("src=") + tagIndex;
        //     var srcStart = srcIndex + 5;
        //     var srcEnd = item.description.substring(srcStart).indexOf('"') + srcStart;
        //     var src = item.description.substring(srcStart, srcEnd);
        //     var yourString = item.content.replace(/<img[^>]*>/g, "");
        //     var maxLength = 120;
        //     var trimmedString = yourString.substr(0, maxLength);
        //     trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));
        //     output += ' <div class="swiper-slide">';
        //     output += ' <div class="mod-img-desc-card">';
        //     output += ' <div class="img-wrap" style="background-image:url(' + item.thumbnail + ')"></div>';
        //     output += ' <div class="desc-wrap"><h3 class="card-title">' + item.title + "</h3>";
        //     output += ' <p class="card-desc"></p>';
        //     output += ' <button class="btn btn-icon"><span class="icon icon-right-arrow"></span></button></div>';
        //     output += ' <a class="link" target="_bank" href="' + item.link + '"></a>';
        //     output += "</div></div>";
        //     return k < 6;
        // });
        // $content.html(output);
        swiperImgDesc();
      } else if ($(".bs-section.typ-insight").length != 0) {
        // var counter = 0;
        // var output = "";
        // $(".bs-section .more-insight").html("");
        // $.each(response.items, function (k, item) {
        //     if (k <= 1) {
        //         var currTgt = $(".bs-insight .insight-list").find(".item").eq(k);
        //         $(currTgt).find(".insight-title span").html(item.title);
        //         $(currTgt).find(".insight-info a").attr("href", item.link);
        //         $(currTgt).find(".insight-info a").attr("target", "_blank");
        //         $(currTgt).find(".insight-wrap .link").attr("href", item.link);
        //         $(currTgt).find(".insight-wrap .link").attr("target", "_blank");
        //         $(currTgt).find(".insight-img .img-wrap").css("background-image", "url(" + item.thumbnail + ")");
        //     } else {
        //         counter++;
        //         var temp = Math.ceil(counter / 3) - 1;
        //         if (counter % 3 === 1) {
        //             var newEle = document.createElement("div");
        //             $(newEle).addClass("insight-card-list");
        //             $(".bs-section .more-insight").append(newEle);
        //             $(newEle).append('<div class="row"></div>');
        //         }
        //         output += '<div class="col-md-4 item"><div class="mod-img-desc-card fadeReveal wow" data-wow-duration="0.8s" data-wow-offset="50" data-wow-delay="0.3s">';
        //         output += '<div class="img-wrap" style="background-image:url(' + item.thumbnail + ')"></div>';
        //         output += '<div class="desc-wrap"><h3 class="card-title">' + item.title + "</h3>";
        //         output += '<p class="card-desc"></p>';
        //         output += '<button class="btn btn-icon"><span class="icon icon-right-arrow"></span></button></div>';
        //         output += '<a href="' + item.link + '" class="link"></a></div></div>';
        //         $(".bs-section .insight-card-list").eq(temp).find(".row").append(output);
        //         output = "";
        //     }
        // });
      }
    }
  });
  $(".js-blog-item").on("click", function (e) {
    if (e) e.preventDefault();
    $(".bs-form-modal").addClass("active");
    blogUrl = $(this).data("href");
    if (!cookie) {
      $(".bs-form-modal").addClass("active");
    } else {
      location.href = blogUrl;
    }
  });
  $(".js-blog-submit").on("click", function (e) {
    var formObj = $(this).closest("form");
    if (formObj.valid() === true) {
      e.preventDefault();

      // $.ajax({
      //     method: 'POST',
      //     url: 'https://script.google.com/macros/s/AKfycbzIEd29Se1lrGpRagF0qCDGjGVOTclRvXxenMSA8JzHcmRn3KDmkFZlq0CUM9P69iwU_w/exec',
      //     dataType: 'json',
      //     accepts: 'application/json',
      //     data: formObj.serialize(),
      //     success: (data) => {
      //         if (data.success === "true") {
      //             $(formObj).find(".result-wrap").addClass("success");
      //             $(formObj).find(".result-wrap").addClass("active");
      //             setTimeout(function () {
      //                 $(formObj).find(".result-wrap").removeClass("active", "success", "fail");
      //                 location.href = blogUrl;
      //             }, 4e3);
      //         } else {
      //             $(formObj).find(".result-wrap").addClass("fail");
      //             $(formObj).find(".result-wrap").addClass("active");
      //             setTimeout(function () {
      //                 $(formObj).find(".result-wrap").removeClass("active", "success", "fail");
      //             }, 4e3);
      //         }
      //     },
      //     error: (err) => {
      //         $(formObj).find(".result-wrap").addClass("fail");
      //         $(formObj).find(".result-wrap").addClass("active");
      //         setTimeout(function () {
      //             $(formObj).find(".result-wrap").removeClass("active", "success", "fail");
      //         }, 4e3);
      //     }
      // });
      $.ajax({
        url: "https://script.google.com/macros/s/AKfycbzIEd29Se1lrGpRagF0qCDGjGVOTclRvXxenMSA8JzHcmRn3KDmkFZlq0CUM9P69iwU_w/exec",
        method: "POST",
        dataType: "json",
        data: formObj.serialize(),
      })
        .done(function (data) {
          if (data.result === "success") {
            $(formObj).find(".result-wrap").addClass("success");
            $(formObj).find(".result-wrap").addClass("active");
            setCookie("userAlreadyRegistered", "true", 365);
            setTimeout(function () {
              $(formObj).trigger("reset");
              $(formObj)
                .find(".result-wrap")
                .removeClass("active", "success", "fail");
              location.href = blogUrl;
            }, 4e3);
          } else {
            $(formObj).find(".result-wrap").addClass("fail");
            $(formObj).find(".result-wrap").addClass("active");
            setTimeout(function () {
              $(formObj).trigger("reset");
              $(formObj)
                .find(".result-wrap")
                .removeClass("active", "success", "fail");
            }, 4e3);
          }
        })
        .fail(function (error) {
          $(formObj).find(".result-wrap").addClass("fail");
          $(formObj).find(".result-wrap").addClass("active");
          setTimeout(function () {
            $(formObj).trigger("reset");
            $(formObj)
              .find(".result-wrap")
              .removeClass("active", "success", "fail");
          }, 4e3);
        });
    }
  });
  $(".js-close-btn").on("click", function () {
    $(".bs-form-modal").removeClass("active");
    blogUrl = "";
  });
}
function shareArticle() {
  $(".js-share").on("click", function () {
    var ogLink = $(this).attr("data-src");
    var url = window.location.href;
    var targetSrc = ogLink + url;
    $(this).attr("href", targetSrc);
  });
}
function tabSelect() {
  var delayTime = 0;
  $(".js-tab .nav-item").on("click", function () {
    var tab_id = $(this).attr("data-link");
    delayTime = 0;
    $(".js-tab .tab-links .nav-item").removeClass("active");
    $(this).addClass("active");
    $(".tab-content .tab-pane").removeClass("active");
    $(".tab-content .tab-pane .mod-infography-card").removeClass("fadeReveal");
    $("#" + tab_id).addClass("active");
    for (
      var index = 0;
      index < $("#" + tab_id).find(".mod-infography-card").length;
      index++
    ) {
      delayFunc(tab_id, index, delayTime);
      delayTime += 200;
    }
  });

  function delayFunc(obj, i, dc) {
    setTimeout(function () {
      $("#" + obj)
        .find(".mod-infography-card")
        .eq(i)
        .addClass("fadeReveal");
    }, dc);
  }
}

function onPgScroll() {
  var currTgt = localStorage.getItem("scrollto");
  var offsetPos = $("#" + currTgt).offset().top;
  var headrH = $(".bs-header").height();
  $(this).addClass("active");
  if (device.mobile() === false) {
    smoothScrollbar.scrollIntoView(document.getElementById(currTgt), {
      offsetTop: headrH,
      offsetLeft: 0,
    });
  } else {
    $("html").animate(
      {
        scrollTop: offsetPos - headrH,
      },
      800,
    );
  }
  localStorage.removeItem("scrollto");
}
function videoFetch() {
  $(".js-video-btn").on("click", function () {
    var videoUrl = $(this).data("src");
    $(".bs-video-modal").addClass("active");
    $(".js-modal-video-fetch").attr("src", videoUrl);
  });
  $(".bs-video-modal .cls-btn").on("click", function () {
    $(".bs-video-modal").removeClass("active");
    $(".js-modal-video-fetch").attr("src", "");
  });
}
function chatBox() {
  $(".bs-chat").find(".icon").hide();
  $(".js-chat-btn").on("click", function (e) {
    e.stopPropagation();
    $(".bs-chat .bs-form").toggleClass("active");
    if ($(".bs-chat .bs-form").hasClass("active")) {
      $(".bs-chat").find(".image").hide();
      $(".bs-chat").find(".icon").show();
    } else {
      $(".bs-chat").find(".image").show();
      $(".bs-chat").find(".icon").hide();
    }
  });
  $("body").on("click", function (e) {
    if ($($(e.target)[0]).closest(".bs-form").length === 0) {
      if ($(".bs-chat .bs-form").hasClass("active")) {
        $(".bs-chat .bs-form").removeClass("active");
        $(".bs-chat").find(".image").show();
        $(".bs-chat").find(".icon").hide();
      }
    }
  });
}
function wowInit() {
  if (device.mobile() === false && device.tablet() === false) {
    var wow = new WOW({
      boxClass: "wow",
      offset: 0,
      mobile: false,
      live: true,
      scrollContainer: "#proxyScroll",
      callback: function (e) {
        if ($(e).hasClass("bs-number")) {
          setTimeout(function () {
            numberSecCounter(2);
            counterInterval = setInterval(function () {
              numberSecCounter(2);
            }, 4500);
          }, 500);
        }
        if ($(e).hasClass("ach-num")) {
          $(e).text("0");
          setTimeout(function () {
            var demo = new CountUp(e, 0, 150);
            if (!demo.error) {
              demo.start();
            } else {
              console.error(demo.error);
            }
          }, 300);
        }
        if ($(e).hasClass("ach-num-40")) {
          $(e).text("0");
          setTimeout(function () {
            var demo = new CountUp(e, 0, 40);
            if (!demo.error) {
              demo.start();
            } else {
              console.error(demo.error);
            }
          }, 300);
        }
        if ($(e).hasClass("bs-stage-growth")) {
          setTimeout(function () {
            stepAnimTL[0].play();
            stepAnimTL[1].play();
            stepAnimTL[2].play();
            stepAnimTL[3].play();
          }, 100);
        }
      },
    }).init();
  } else if (device.mobile() === true || device.tablet() === true) {
    var wow = new WOW({
      boxClass: "wow",
      offset: 0,
      mobile: true,
      live: true,
      callback: function (e) {
        if ($(e).hasClass("bs-number")) {
          setTimeout(function () {
            numberSecCounter(2);
            counterInterval = setInterval(function () {
              numberSecCounter(2);
            }, 4500);
          }, 500);
        }
        if ($(e).hasClass("ach-num")) {
          $(e).text("0");
          setTimeout(function () {
            var demo = new CountUp(e, 0, 150);
            if (!demo.error) {
              demo.start();
            } else {
              console.error(demo.error);
            }
          }, 300);
        }
      },
    }).init();
  }
}
function countChar(val) {
  var len = val.value.length;
  if (len >= 101) {
    val.value = val.value.substring(0, 100);
  } else {
    $("#charNum").text(len);
  }
}
$(function () {
  if ($("#scroll-view").length != 0) {
    if (device.mobile() === false && device.tablet() === false) {
      pageSmoothScroll();
    }
  }
  wowInit();
  if ($(".bs-header").length != 0) {
    if ($("body").hasClass("pg-light")) {
      $(".bs-header").addClass("typ-white");
    }
    if (device.mobile() === true || device.tablet() === true) {
      $(".bs-header .menu-btn").on("click", function () {
        if ($(".bs-header").hasClass("open") == true) {
          $(".bs-header").removeClass("open");
          $("body").removeClass("scroll-lock");
          $(".nav-list-wrap .nav-item").each(function (e) {
            var obj = this;
            $(obj).find(".nav-link").css({
              "transition-delay": "0.0s",
            });
          });
          $(".connect-info a")
            .each(function (e) {
              var obj = this;
              $(obj).css({
                "transition-delay": "0.0s",
              });
            })
            .promise()
            .done(function () {
              setTimeout(function () {
                $(".connect-info a").css({
                  "transition-delay": "",
                });
              }, 100);
            });
        } else {
          $(".bs-header").addClass("open");
          $("body").addClass("scroll-lock");
          $(".nav-list-wrap .nav-item").each(function (e) {
            var obj = this;
            var delayCounter = e / 10 + 0.8 + "s";
            $(obj).find(".nav-link").css({
              "transition-delay": delayCounter,
            });
          });
        }
      });
      headerJs();
    }
  }
  if (localStorage.getItem("scrollto") !== null) {
    onPgScroll();
  }
  if ($(".bs-banner").length != 0) {
    if (device.mobile() === true && device.tablet() === false) {
      innerWindHt();
    }
  }
  if ($(".js-set-bg").length != 0) {
    setBg();
  }
  if ($(".js-set-pic-bg").length != 0) {
    setPicBg();
  }
  if ($(".grid-lines").length != 0) {
    drawGridLines(8);
  }
  if ($(".js-scroll-to").length != 0) {
    scrollToSec();
  }
  if ($(".bs-form").length != 0) {
    validationDefault();
    dropdownShow();
    multiSel();
    var d = new Date();
    document.getElementById("date").value = d.toDateString();
  }
  if ($(".contact-form").length != 0) {
    contactForm();
  }
  if ($(".lead-gen").length != 0) {
    leadForm();
    // if (!cookie) {
    //     leadForm();
    //     $('.bs-chat').show();
    //     $('.chat-text').show();
    // } else {
    //     $('.bs-chat').hide();
    //     $('.chat-text').hide();
    // }
  }
  if ($("#team-list").length != 0) {
    swiperTeamList();
  }
  if ($("#video-list").length != 0) {
    swiperVideoList();
  }
  if ($("#news-list").length != 0) {
    swiperNewsList();
  }
  if ($("#leader-list").length != 0) {
    swiperLeaderList();
  }
  if ($("#testimonial-list").length != 0) {
    swiperTestimonialList();
  }
  if ($("#gallery-list").length != 0) {
    swiperGalleryList();
  }
  if ($("#neo-exp").length != 0) {
    swiperNeoExp();
    swiperNeoBg();
  }
  if ($(".bs-stage-growth .stage-step").length != 0) {
    if (device.mobile() === false && device.tablet() === false) {
      stageGrowth();
    }
  }
  if ($(".bs-tag").length != 0) {
    tagGlow();
  }
  if ($(".bs-blog").length != 0 || $(".bs-section.typ-insight").length != 0) {
    mediumBlog();
  }
  if ($(".js-tab").length != 0) {
    tabSelect();
  }
  if ($(".js-video-btn").length != 0) {
    videoFetch();
  }
  if ($(".js-chat-btn").length != 0) {
    chatBox();
    // countChar();
  }
  if ($(".js-share").length != 0) {
    shareArticle();
  }
});

/* Window Onload event */
window.addEventListener("load", function () {
  if ($(".js-video-fetch").length != 0) {
    videoIns();
    if ($("#video-slide").length != 0) {
      videoSlide();
    }
  }
  if ($(".bs-header").length != 0) {
    menuActive();
  }
});

/* ==========================================================================
   SERVICES MEGA MENU DROPDOWN LOGIC (Desktop Hover & Mobile Click Toggle)
   Updated to handle 2-column grid links dropdown on phone without image
   ========================================================================== */
$(document).ready(function () {
  var megaTimer;
  var $servicesNavItem = $(
    '.bs-header .nav-list .nav-item[data-route="services"]',
  );
  var $megaPanel = $(".services-mega-panel");

  /* Desktop Hover Logic (Width >= 992px) */
  $servicesNavItem
    .add($megaPanel)
    .on("mouseenter", function () {
      if ($(window).width() >= 992) {
        clearTimeout(megaTimer);
        $servicesNavItem.addClass("active-mega");
        $megaPanel.addClass("show-mega");
      }
    })
    .on("mouseleave", function () {
      if ($(window).width() >= 992) {
        megaTimer = setTimeout(function () {
          $servicesNavItem.removeClass("active-mega");
          $megaPanel.removeClass("show-mega");
        }, 200);
      }
    });

  /* Mobile Arrow Button & Link Click Toggle Logic (Phone Dropdown) */
  $(document).on("click", ".services-dropdown-toggle", function (e) {
    e.preventDefault();
    e.stopPropagation();
    var $parentItem = $(this).closest(".nav-item-has-dropdown");
    var $panel = $parentItem.find(".services-mega-panel");
    $parentItem.toggleClass("active-mobile-mega");
    $panel.toggleClass("show-mega");
  });

  /* Allow tapping "Services" link text on mobile to also toggle dropdown */
  $(document).on(
    "click",
    '.bs-header .nav-list .nav-item[data-route="services"] > .nav-link-wrapper > .nav-link',
    function (e) {
      if ($(window).width() <= 991) {
        e.preventDefault();
        e.stopPropagation();
        var $parentItem = $(this).closest(".nav-item-has-dropdown");
        var $panel = $parentItem.find(".services-mega-panel");
        $parentItem.toggleClass("active-mobile-mega");
        $panel.toggleClass("show-mega");
      }
    },
  );

  /* Services Mega Menu Image Swap Logic (Desktop only) */
  $(document).on(
    "mouseenter click",
    ".services-mega-panel .nav-grid-links, .services-mega-panel .nav-grid-links *",
    function () {
      if ($(window).width() >= 992) {
        var $col = $(this).closest(".nav-grid-links");
        var newImg = $col.attr("data-img");
        var $targetImg = $(this)
          .closest(".services-mega-panel")
          .find("#mega-service-img");
        if (newImg && $targetImg.length && $targetImg.attr("src") !== newImg) {
          $targetImg.css("opacity", 0.2);
          setTimeout(function () {
            $targetImg.attr("src", newImg);
            $targetImg.css("opacity", 1);
          }, 100);
        }
      }
    },
  );

  /* Close Services Mega Menu Panel & Mobile Nav Overlay when any sub-link is clicked */
  $(".services-mega-panel a").on("click", function () {
    $servicesNavItem.removeClass("active-mega active-mobile-mega");
    $megaPanel.removeClass("show-mega");
    if ($(window).width() <= 991) {
      $(".bs-header").removeClass("open");
      $("body").removeClass("scroll-lock");
    }
  });

  var currentHomeCardIndex = 0;

  function updateHomeCardsSlider(index) {
    var $cards = $(".home-cards .home-card");
    if ($cards.length === 0) return;

    var isMobile = window.innerWidth <= 991;

    $cards.each(function (i) {
      if (isMobile) {
        $(this).removeClass("home-card-small home-card-large");
      } else {
        if (i === index) {
          $(this).addClass("home-card-large").removeClass("home-card-small");
        } else {
          $(this).addClass("home-card-small").removeClass("home-card-large");
        }
      }
    });

    var $activeCard = $cards.eq(index);
    var activeImgSrc = $activeCard.find(".home-card-image img").attr("src");
    if (activeImgSrc) {
      $(".home-page-hero").css(
        "background-image",
        'url("' + activeImgSrc + '")',
      );
    }

    var smallWidth = 472;
    var gap = parseInt($(".home-cards").css("gap")) || 24;

    if (isMobile) {
      var containerWidth = $(".cards-gap").width() || window.innerWidth - 32;
      smallWidth = containerWidth;
      gap = 16;
    }

    var offset = index * (smallWidth + gap);

    $(".home-cards").css(
      "transform",
      "translate3d(-" + offset + "px, 0px, 0px)",
    );

    var $leftArrow = $(".cards-arrow .arrow-left");
    var $rightArrow = $(".cards-arrow .arrow-right");

    if (index === 0) {
      $leftArrow.addClass("disabled");
      $rightArrow.removeClass("disabled");
    } else if (index >= $cards.length - 1) {
      $leftArrow.removeClass("disabled");
      $rightArrow.addClass("disabled");
    } else {
      $leftArrow.removeClass("disabled");
      $rightArrow.removeClass("disabled");
    }
  }

  if ($(".home-cards").length) {
    updateHomeCardsSlider(currentHomeCardIndex);
  }

  $(document).on("click", ".home-cards .home-card", function () {
    var idx = $(this).index();
    if (idx !== currentHomeCardIndex) {
      currentHomeCardIndex = idx;
      updateHomeCardsSlider(currentHomeCardIndex);
    }
  });

  $(document).on("click", ".cards-arrow .arrow-right", function () {
    var totalCards = $(".home-cards .home-card").length;
    if (currentHomeCardIndex < totalCards - 1) {
      currentHomeCardIndex++;
      updateHomeCardsSlider(currentHomeCardIndex);
    }
  });

  $(document).on("click", ".cards-arrow .arrow-left", function () {
    if (currentHomeCardIndex > 0) {
      currentHomeCardIndex--;
      updateHomeCardsSlider(currentHomeCardIndex);
    }
  });

  // Touch Swipe support for Home Cards Carousel
  var touchStartX = 0;
  var touchStartY = 0;
  $(document).on("touchstart", ".home-cards, .cards-gap", function (e) {
    if (
      e.originalEvent &&
      e.originalEvent.touches &&
      e.originalEvent.touches[0]
    ) {
      touchStartX = e.originalEvent.touches[0].clientX;
      touchStartY = e.originalEvent.touches[0].clientY;
    }
  });

  $(document).on("touchend", ".home-cards, .cards-gap", function (e) {
    if (!touchStartX) return;
    if (
      e.originalEvent &&
      e.originalEvent.changedTouches &&
      e.originalEvent.changedTouches[0]
    ) {
      var touchEndX = e.originalEvent.changedTouches[0].clientX;
      var touchEndY = e.originalEvent.changedTouches[0].clientY;
      var diffX = touchStartX - touchEndX;
      var diffY = touchStartY - touchEndY;

      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
        var totalCards = $(".home-cards .home-card").length;
        if (diffX > 0 && currentHomeCardIndex < totalCards - 1) {
          currentHomeCardIndex++;
          updateHomeCardsSlider(currentHomeCardIndex);
        } else if (diffX < 0 && currentHomeCardIndex > 0) {
          currentHomeCardIndex--;
          updateHomeCardsSlider(currentHomeCardIndex);
        }
      }
    }
    touchStartX = 0;
    touchStartY = 0;
  });

  // Mouse Wheel support for Home Cards Carousel
  var cardWheelCooldown = false;
  $(document).on("wheel", ".cards-gap, .home-cards", function (e) {
    var delta = e.originalEvent.deltaX || e.originalEvent.deltaY;
    if (Math.abs(delta) > 30 && !cardWheelCooldown) {
      var totalCards = $(".home-cards .home-card").length;
      if (delta > 0 && currentHomeCardIndex < totalCards - 1) {
        cardWheelCooldown = true;
        currentHomeCardIndex++;
        updateHomeCardsSlider(currentHomeCardIndex);
        setTimeout(function () {
          cardWheelCooldown = false;
        }, 400);
      } else if (delta < 0 && currentHomeCardIndex > 0) {
        cardWheelCooldown = true;
        currentHomeCardIndex--;
        updateHomeCardsSlider(currentHomeCardIndex);
        setTimeout(function () {
          cardWheelCooldown = false;
        }, 400);
      }
    }
  });

  $(window).on("resize", function () {
    if ($(".home-cards").length) {
      updateHomeCardsSlider(currentHomeCardIndex);
    }
  });

  /* Pinned Product Cards Scroll Initialization */
  initPinnedProductCards();
});

/* ============================================================
   PINNED PRODUCT & SERVICE CARDS STACKED PARALLAX CONTROLLER
   ============================================================ */
function initPinnedProductCards() {
  var wrapper = document.querySelector(".bs-service-section-wrapper");
  if (!wrapper) return;

  var bsService = wrapper.querySelector(".bs-service");
  var viewWindow = wrapper.querySelector(".cards-view-window");
  var cardsList = wrapper.querySelector(".allProductsCards");
  var productGrid = wrapper.querySelector(".product-grid-section");
  var cards = wrapper.querySelectorAll(".product-cards");

  if (!bsService || !cardsList || !cards.length) return;

  var numCards = cards.length;

  function getPinTopOffset() {
    return window.innerWidth <= 768 ? 20 : 60;
  }

  function updateMetrics() {
    var winH = window.innerHeight;
    var pinTopOffset = getPinTopOffset();

    // Measure natural height of each card
    cards.forEach(function (card) {
      card.style.position = "relative";
      card.style.transform = "none";
    });

    var maxCardH = 0;
    cards.forEach(function (card) {
      maxCardH = Math.max(maxCardH, card.offsetHeight);
    });

    maxCardH = Math.max(maxCardH, window.innerWidth <= 768 ? 380 : 300);

    // Apply absolute positioning for card stacking
    cards.forEach(function (card, idx) {
      card.style.position = "absolute";
      card.style.top = "0px";
      card.style.left = "0px";
      card.style.width = "100%";
      card.style.zIndex = (idx + 1).toString();
    });

    var containerH = maxCardH + 15;
    if (viewWindow) {
      viewWindow.style.height = containerH + "px";
    }
    cardsList.style.height = containerH + "px";

    // Set total scroll track distance for section pinning (halved for compact transitions without extra white gap)
    var scrollPerCard = Math.max(220, Math.round(winH * 0.38));
    var scrollTrackDistance = (numCards - 1) * scrollPerCard;

    wrapper.style.height = winH + scrollTrackDistance + "px";

    return {
      winH: winH,
      pinTopOffset: pinTopOffset,
      maxCardH: maxCardH,
      scrollTrackDistance: scrollTrackDistance,
      numTransitions: numCards - 1,
    };
  }

  var metrics = updateMetrics();

  function renderScroll() {
    var rect = wrapper.getBoundingClientRect();
    var pinTopOffset = metrics.pinTopOffset;
    var pinOffset = pinTopOffset - rect.top;
    var scrollTrackDistance = metrics.scrollTrackDistance;

    if (pinOffset < 0) {
      bsService.style.transform = "translate3d(0, 0px, 0)";

      cards.forEach(function (card, i) {
        if (i === 0) {
          card.style.transform = "translate3d(0, 0px, 0) scale(1)";
          card.style.opacity = "1";
          card.style.pointerEvents = "auto";
        } else {
          var slideDist = metrics.maxCardH + 60;
          card.style.transform =
            "translate3d(0, " + slideDist + "px, 0) scale(1)";
          card.style.opacity = "0";
          card.style.pointerEvents = "none";
        }
      });
    } else if (pinOffset >= 0 && pinOffset <= scrollTrackDistance) {
      bsService.style.transform =
        "translate3d(0, " + pinOffset.toFixed(2) + "px, 0)";

      var progress = pinOffset / scrollTrackDistance;
      progress = Math.max(0, Math.min(1, progress));

      var stepVal = progress * metrics.numTransitions;
      var activeIndex = Math.min(numCards - 1, Math.floor(stepVal));
      var localProgress = stepVal - activeIndex;

      cards.forEach(function (card, i) {
        if (i < activeIndex) {
          // Card is stacked behind active index
          var depth =
            activeIndex - i + (activeIndex < numCards - 1 ? localProgress : 0);
          var scale = Math.max(0.85, 1 - depth * 0.04);
          var opacity = Math.max(0.35, 1 - depth * 0.2);
          card.style.transform = "translate3d(0, 0px, 0) scale(" + scale + ")";
          card.style.opacity = opacity;
          card.style.pointerEvents = "none";
        } else if (i === activeIndex) {
          // Currently active card, being covered by card i+1
          var scale = i === numCards - 1 ? 1 : 1 - localProgress * 0.04;
          var opacity = i === numCards - 1 ? 1 : 1 - localProgress * 0.2;
          card.style.transform = "translate3d(0, 0px, 0) scale(" + scale + ")";
          card.style.opacity = opacity;
          card.style.pointerEvents =
            localProgress > 0.6 && i < numCards - 1 ? "none" : "auto";
        } else if (i === activeIndex + 1) {
          // Card sliding UP over activeIndex
          var slideDist = metrics.maxCardH + 60;
          var translateY = (1 - localProgress) * slideDist;
          card.style.transform =
            "translate3d(0, " + translateY.toFixed(2) + "px, 0) scale(1)";
          card.style.opacity = "1";
          card.style.pointerEvents = "auto";
        } else {
          // Card waiting below
          var slideDist = metrics.maxCardH + 60;
          card.style.transform =
            "translate3d(0, " + slideDist + "px, 0) scale(1)";
          card.style.opacity = "0";
          card.style.pointerEvents = "none";
        }
      });
    } else {
      bsService.style.transform =
        "translate3d(0, " + scrollTrackDistance + "px, 0)";

      cards.forEach(function (card, i) {
        if (i < numCards - 1) {
          var depth = numCards - 1 - i;
          var scale = Math.max(0.85, 1 - depth * 0.04);
          var opacity = Math.max(0.35, 1 - depth * 0.2);
          card.style.transform = "translate3d(0, 0px, 0) scale(" + scale + ")";
          card.style.opacity = opacity;
          card.style.pointerEvents = "none";
        } else {
          card.style.transform = "translate3d(0, 0px, 0) scale(1)";
          card.style.opacity = "1";
          card.style.pointerEvents = "auto";
        }
      });
    }
  }

  if (typeof smoothScrollbar !== "undefined" && smoothScrollbar) {
    smoothScrollbar.addListener(function () {
      renderScroll();
    });
  }

  $(window).on("scroll touchmove resize", function () {
    renderScroll();
  });

  window.addEventListener("resize", function () {
    metrics = updateMetrics();
    renderScroll();
  });

  window.addEventListener("load", function () {
    metrics = updateMetrics();
    renderScroll();
  });

  setTimeout(function () {
    metrics = updateMetrics();
    renderScroll();
  }, 100);

  renderScroll();
}

// Service Worker Registration
// if ("serviceWorker" in navigator) {
//     window.addEventListener("load", function() {
//         navigator.serviceWorker.register("/Work/personal/them/git/sw.js").then(function(registration) {
//             // Registration was successful
//             console.log("ServiceWorker registration successful with scope: ", registration.scope);
//         }, function(err) {
//             // registration failed :(
//             console.log("ServiceWorker registration failed: ", err);
//         });
//     });
// }
