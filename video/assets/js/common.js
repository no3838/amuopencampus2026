// JavaScript Document
// sp menu
var windowWidth = $(window).width();
var windowSm = 767;
if (windowWidth <= windowSm) {
/* sp Only ------------------------------- */
$(document).ready(function() {
 var headerHight = $("#header").outerHeight();
    $('a[href^="#"]:not([href$="#"])').click(function() {
        var href = $(this).attr('href');
        var pos = $(href).offset().top-headerHight;
        var duration = 600;
        $('body, html').animate({ scrollTop: pos }, duration, 'linear');
        return false;
    });
  });
  

} else {
/* pc Only ------------------------------- */
 $(function() {
  var headerHight = $("#header").outerHeight();
    $('a[href^="#"]:not([href$="#"])').click(function() {
        var href = $(this).attr('href');
        var pos = $(href).offset().top-headerHight;
        var duration = 600;
        $('body, html').animate({ scrollTop: pos }, duration, 'linear');
        return false;
    });
});

 $(function() {
var list = 0;
$('#navGlobal > li').each(function() {
    list += $(this).find('span').width();
});
var hWidth = $('#inrHeader').width();
var gatter =  hWidth - list;
var gatNum = [$('#navGlobal > li').length - 1] * 2;
var pdn = gatter / gatNum;
$('#navGlobal > li:not(.pdnOff)').css({
        'padding-left': pdn+'px',
        'padding-right': pdn+'px'
    });
$('#navGlobal > li:first-child').css({
        'padding-right': pdn+'px'
    });
	$('#navGlobal > li:last-child').css({
        'padding-left': pdn+'px'
    });
});

$(window).scroll(function () {
var hHeight = $('#header').height();
  if($(window).scrollTop() > hHeight) {
    $('#header').addClass('fixed');
  } else {
    $('#header').removeClass('fixed');
  }
});
}

// anchor
$(document).ready(function() {
 var headerHight = $("#header").height();
    $('a[href^="#"]:not(a.popup)').click(function() {
        var href = $(this).attr('href');
        var pos = $(href).offset().top-headerHight;
        var duration = 600;
        $('body, html').animate({ scrollTop: pos }, duration, 'linear');
        return false;
    });
  });

/* common ------------------------------- */

// reload
 var timer = 0;
    var currentWidth = window.innerWidth;
	$(window).resize(function(){
        if (currentWidth == window.innerWidth) {
            return;
        }
        if (timer > 0) {
            clearTimeout(timer);
        }
 
        timer = setTimeout(function () {
            location.reload();
        }, 200);
		
	});

//clickable
  $(".clickable").click(function(){
    if($(this).find("a").attr("target")=="_blank"){
         window.open($(this).find("a").attr("href"), '_blank');
     }else{
         window.location=$(this).find("a").attr("href");
     }    return false;
  });

// scroll top
$(document).ready(function(){
    $("#pagetop").hide();
    $(window).on("scroll", function() {
        if ($(this).scrollTop() > 100) {
            $("#pagetop").fadeIn("fast");
        } else {
            $("#pagetop").fadeOut("fast");
        }
    });
});
  

// sp tel
if(window.addEventListener){
	window.addEventListener( "load" , syncerTelephoneLink, false );
}else{
	window.attachEvent( "onload", syncerTelephoneLink );}
function syncerTelephoneLink(){
	var width = window.innerWidth ;
	if( width>=768 ){ return false ; }
	var elms = document.getElementsByClassName( "syncer-tel" ) ;
	for( var i=0,l=elms.length; l>i; i++ ){
		var elm = elms[i] ;
		var number = elm.getAttribute( "data-number" ) ;
		if( number!=null ){
			if( elm.tagName == "A" )	{
				elm.href = "tel:" + number ;
			}else{
				var text = elm.innerHTML ;
				elm.innerHTML = '<a href="tel:' + number + '">' + text + '</a>' ;
			}
		}
	}
}

