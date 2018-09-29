$(document).ready(function() {mobileHeader(); mobileFooter(); headerHover(); footerHover(); mobileClicker();});
$(window).resize(function() {mobileHeader(); mobileFooter()});
$(window).on("scroll", function() {dropHeader()});

var isMobile = false;

if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
) { isMobile = true; }

function mobileFooter() {
	if($(window).width() < 600 || isMobile) {
		$('footer').css({'display':'block'});
		$('#f-l-links').css({'display':'block'});
	} else {
		$('footer').css({'display':'flex'});
		$('#f-l-links').css({'display':'flex'});
	}
}

function mobileHeader() {
	if($(window).width() < 750 || isMobile) {
		$('#h-r-desktop').addClass('disabled');
		$('#h-r-mobile').removeClass('disabled');

		$("header").css({'background-color':'rgba(0,0,0,.6)', 'height':'49px', 'position':'fixed'});
		$('#h-l-ln-l-img').attr('src','/images/logos/logoinverted.gif');
		$('#h-l-ln-name').css({'color':'white','padding':'15px 5px'});

	} else {
		$('#h-r-mobile').addClass('disabled');
		$('#mobiledropdown').addClass('disabled');
		$('#h-r-desktop').removeClass('disabled');

		$("header").css({'background-color':'transparent', 'height':'101px', 'position':'absolute'});
		$('#h-l-ln-l-img').attr('src','/images/logos/logo.gif');
		$('#h-l-ln-name').css({'color':'black','padding':'41px 5px'});
	}
}

function mobileClicker() {
	$('#h-r-m-clickable').click(function() {
		if($('#mobiledropdown').hasClass('disabled')) {
			$('#mobiledropdown').removeClass('disabled');
		} else {
			$('#mobiledropdown').addClass('disabled');
		}
	});
}

var prevHeight = 0;
var topCheck = 70;

function dropHeader() {
	if(isMobile || $(window).width() < 750) {

	} else if(($(window).scrollTop() > topCheck && prevHeight < topCheck)){
		$("header").stop().animate({'background-color':'rgba(0,0,0,.6)', 'height':'49px'});
		$('header').css({'position':'fixed'});
		$('.h-r-d-i-l-text').stop().animate({'color':'white'});
		$('#h-l-ln-name').stop().animate({'color':'white', 'padding-top':'15px'});
		$('.h-r-d-i-link').stop().animate({'padding-top':'15px'});
		$('#h-l-ln-l-img').attr('src','/images/logos/logoinverted.gif');
	} else if($(window).scrollTop() <= topCheck && prevHeight >= topCheck) {
		$("header").stop().animate({'background-color':'transparent', 'height':'101px', 'position':'absolute'});
		$('.h-r-d-i-l-text').stop().animate({'color':'black'});
		$('#h-l-ln-name').stop().animate({'color':'black', 'padding-top':'41px'});
		$('.h-r-d-i-link').stop().animate({'padding-top':'41px'});
		$('#h-l-ln-l-img').attr('src','/images/logos/logo.gif');
	}
	prevHeight = $(window).scrollTop();
}

function headerHover() {
	$('.h-r-d-i-link').hover(function() {
		var amount = $(this).css('padding-bottom');
		amount = amount.substring(0, amount.length - 2) - 4;
		$(this).css({'padding-bottom': amount + 'px', 'border-bottom':'4px solid #4286f4'});
	}, function() {
		var amount = $(this).css('padding-bottom');
		amount = parseFloat(amount.substring(0, amount.length - 2)) + 4;
		$(this).css({'padding-bottom': amount + 'px', 'border-bottom':'0px solid #4286f4'});
	});
}

function footerHover() {
	$('.f-l-l-i-link').hover(function() {
		$('.f-l-l-i-l-text').stop().animate({'color':'rgba(255, 255, 255, .5)'});
		var text = $(this).find('.f-l-l-i-l-text');
		$(text).stop().css({'color':'white'});
		$(this).stop().animate({'background-color':'rgba(255, 255, 255, .1)'});
	}, function() {
		$('.f-l-l-i-l-text').stop().animate({'color':'rgba(255, 255, 255, 1)'});
		$(this).stop().animate({'background-color':'rgba(255, 255, 255, 0)'});
	});
}
