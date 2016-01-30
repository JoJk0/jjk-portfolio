   
             function loadLESS ( filename ) {
                            if ( !window.less ) { return;}

                            var $link = $("<link type='text/css' rel='stylesheet/less' />");
                            $link.attr("href", filename + ".less");
                            $("head").append( $link );


                            less.sheets.push( $link[0] );
                            less.refresh();
                        }
            
            $("#top_bar").css("position", "fixed");
                $("#top_bar").css("top", "0");
                if($("#left_menu").css("left") == 0 || $("#left_menu").css("left") == "0px"){
                    $("#top_bar").css("left", "300px");
                } else{
                
                    $("#top_bar").css("left", "10px");
                
                }
                $("#top_bar #logo").css("width", "64px");
                $("#top_bar #logo").css("top", "15px");
                $("#top_bar .title").css("opacity", "0");
                $("#top_bar #arrow_up").css("transform", "rotate(0deg)");
                $("#top_bar #arrow_up:hover").css("transform", "rotate(0deg), scale(1.2)");
            
            $("#splash").ready(function(){
                
                if($(window).height() > $(window).width()){
                    loadLESS("mobile");
                }
                
                $("#splash").css("background-size", "100%");
                $("#splash").css("background-position", "50% 50%");
                $("#splash").css("opacity", "1");
                $("#container").css("opacity", "1");
                $("#left_menu").css("opacity", "1");
            
            });
            
            $("#hamburger").click(function(){
            
                $("#left_menu").css("left", "0");
                $("#top_bar").css("transition", "all 0.3s ease");
                $("#container").css("left", "300px");
                $("#hamburger").css("opacity", "0");
                if($(window).scrollTop() >= 0){
                
                    $("#top_bar").css("left", "300px");
                
                }
                setTimeout(function(){$("#top_bar").css("transition", "")}, 400);
            
            });
            $("#container").click(function(){
                
                if($("#left_menu").css("left") == "0" || $("#left_menu").css("left") == "0px"){
            
                    $("#left_menu").css("left", "-300px");
                    $("#container").css("left", "0");
                    $("#top_bar").css("transition", "all 0.3s ease");
                    $("#hamburger").css("opacity", "1");
                    if($(window).scrollTop() >= 0){

                        $("#top_bar").css("left", "0");

                    }
                    setTimeout(function(){$("#top_bar").css("transition", "")}, 400);
                }
            
            });
            
            $(window).resize(function(){
            
                                if($(window).height() > $(window).width()){
                    loadLESS("mobile");
                }
                
        less.modifyVars({
        
            '@pageWidth': $(window).width(),
            '@pageHeight': $(window).height()
        
        });
    
    });
                $("#top_bar_scaffolding").css("width", $("#top_bar").width()+"px");
                $("#top_bar_scaffolding").css("height", "60px");
        $(window).scroll(function(){
            
            
            if ($(window).scrollTop() >= 0){
                
                $("#top_bar").css("position", "fixed");
                $("#top_bar").css("top", "0");
                if($("#left_menu").css("left") == 0 || $("#left_menu").css("left") == "0px"){
                    $("#top_bar").css("left", "300px");
                } else{
                
                    $("#top_bar").css("left", "10px");
                
                }
                $("#top_bar #logo").css("width", "64px");
                $("#top_bar #logo").css("top", "15px");
                $("#top_bar .title").css("opacity", "0");
                $("#top_bar #arrow_up").css("transform", "rotate(0deg)");
                $("#top_bar #arrow_up:hover").css("transform", "rotate(0deg), scale(1.2)");
                
            } else{
            
                $("#top_bar").css("position", "absolute");
                $("#top_bar").css("top", "");
                $("#top_bar").css("left", "0");
                $("#top_bar #logo").css("width", "");
                $("#top_bar #logo").css("width", $(window).width*0.12+"px");
                $("#top_bar #logo").css("top", "");
                $("#top_bar #logo").css("top", $(window).width*-0.07+"px");
                $("#top_bar .title").css("opacity", "1");
                $("#top_bar #arrow_up").css("transform", "rotate(180deg)");
                $("#top_bar #arrow_up:hover").css("transform", "rotate(180deg), scale(1.2)");
            
            }
        });
            
        $(function() {
          $('a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
              var target = $(this.hash);
              target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
              if (target.length) {
                $('html,body').animate({
                  scrollTop: target.offset().top
                }, 1000);
                return false;
              }
            }
          });
        });
            
		$(function(){
			$.stellar({
				horizontalScrolling: false,
				verticalOffset: 40,
                responsive: true,
                positionProperty: 'transform'
			});
		});
        