(function($) {
/*
Plugin desenvolvido por Ricardo Kovacs [ricardo.kovacs@gmail.com]
https://github.com/rickov/kmodal/
*/
    jQuery.fn.extend({
        close_kmodal:function(callback){
                $('#kmascara,#kmsg').remove();
                if(typeof(callback)=='function')
                {
                    callback();
                }
        },
        kmodal:function(options){
            link = $(this);
            kmd = $(this).selector;
            kmopt = {};
            if(options == undefined){
                kmopt.width=335;
                kmopt.height=150;
                kmopt.type='html';
                kmopt.callback=undefined;
                kmopt.close=true;
                kmopt.html='<h1>Hello Kmodal!</h1>';
            }else{
                kmopt.width=options.width;
                kmopt.height=options.height;
                kmopt.type=options.type;
                kmopt.callback=options.callback;
                kmopt.close=options.close;
                kmopt.html=options.html;
                kmopt.measure=options.measure;
            }

            var kmsg = link.attr("href");
            if(kmsg == undefined){
                var kmsg = link.attr('data-local');
            }
            
            if(kmopt.url == undefined){
               kmopt.url = '';
            }
            if(kmopt.type == undefined){
               kmopt.type = 'html';
            }
            if(kmopt.html == undefined){
                if(kmopt.type == 'html'){
                    kmopt.html=$(kmsg).html();
                }else{
                    kmopt.html=options.html;
                }
            }
            if(kmopt.close == undefined){
               kmopt.close = true;
            }
            if(kmopt.width == undefined){
               kmopt.width = 300;
            }
            if(kmopt.height == undefined){
               kmopt.height = 150;
            }
            if(kmopt.measure == undefined){
               kmopt.measure = 'px';
            }

            klarg = 0;
            kalt = 0;

            if(kmopt.measure == '%'){
                klarg = ($(window).width()*kmopt.width)/100;
                kalt = ($(window).height()*kmopt.height)/100;
            }else{
                klarg = kmopt.width;
                kalt = kmopt.height;
            }

            ktop = (window.innerHeight/4);//$(window).scrollTop()+(($(window).height()*10)/100);
            kleft = ($(window).width() /2) - ( klarg / 2 );


            $('#kmascara').remove();
            $('#kmsg').remove();
            $('#kfechar').remove();

            $('body').prepend('<div id="kmascara"></div>');
            
            $('#kmascara').css({
                'top':0,
                'bottom':0,
                'left':0,
                'right':0,
                'position':'fixed',
                'z-index':'99',
                'background-color':'#ffffff'
            });

            $('#kmascara').fadeIn(500);
            $('#kmascara').fadeTo("fast",0.8);

            $('body').prepend('<div id="kmsg" style="display:none;"></div>');
        
            $("#kmsg").css({
                'top':ktop,
                'left':kleft,
                'position':'absolute',
                'z-index':'100',
                'background-color':'#ffffff',
                'width':klarg,
                'height':kalt,
                '-webkit-border-radius':'5px',
                '-moz-border-radius':'5px',
                'border-radius':'5px',
                'border':'1px solid #bbbbbb',
                '-moz-box-shadow':'0 0 5px #888',
                '-webkit-box-shadow':'0 0 5px#888',
                'box-shadow':'2px 2px 3px #888'
            });
            if(kmopt.close == true){
                $('#kmsg').append('<div id="kfechar">fechar</div>');
                $('#kfechar').css({
                    'float':'right',
                    'display':'block',
                    'margin':'-16px -1px 0 0',
                    'font-size':'12px',
                    'color':'#ff0000',
                    'background-color':'#ffffff',
                    'padding':'7px 7px 0',
                    'text-transform':'uppercase',
                    'cursor':'pointer',
                    '-webkit-border-top-left-radius':'5px',
                    '-webkit-border-top-right-radius':'5px',
                    '-moz-border-radius-topleft':'5px',
                    '-moz-border-radius-topright':'5px',
                    'border-top-left-radius':'5px',
                    'border-top-right-radius':'5px',
                    'border':'1px solid #bbbbbb',
                    'border-bottom':'none'
                });
            }
            $(window).scrollTop(0);
            $('#kmsg').append('<div id="kpalco"></div>');
            $("#kpalco").css({
                'padding':'10px 0 0 10px',
                'overflow':'auto',
                'overflow-x':'hidden',
                'height': kalt-20,
                'width': klarg-15
            });
            
            if(kmopt.type=='iframe'){
                if(kmopt.url==''){
                    if(kmsg!=undefined){
                        $("#kpalco").html('<iframe src="'+kmsg+'" frameborder="0" width="100%" height="100%"></iframe>');
                    }else{
                        $("#kpalco").html('<p>URL de carregamento não especificado.</p>');
                    }
                }else{
                    $("#kpalco").html('<iframe src="'+kmsg+'" frameborder="0" width="100%" height="100%"></iframe>');
                }
            }else{
                if(kmsg!=undefined){
                    $("#kpalco").html($(kmsg).html());
                }else{
                    $("#kpalco").html(kmopt.html);
                }
            }
            $("#kmsg").fadeIn(500);

            $('#kfechar,#kmascara').click(function(){
                $.fn.close_kmodal();
            });

            if(typeof(kmopt.callback)=='function')
            {
                kmopt.callback(link);
            }

            return $(this);
        }
    });
})(jQuery);