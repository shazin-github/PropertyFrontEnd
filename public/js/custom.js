function echoErrors(form_name, errors, error_div){
	var default_error_div = 'alerts_';
    if (typeof error_div === 'undefined') {
        error_div = default_error_div;
    }

    $("#"+form_name+" :input").each(function(){
        $(this).removeClass('has-error');
    });

    arr = [] ;
    er = $.parseJSON(errors);
        
    elist = '<strong>Erros:</strong><ul2>';    
    
    $.each(er, function(key, value){                
        $.each(value, function(k, v){            
            if (arr.indexOf(v) == -1) {                
                arr.push(v);                
                elist += '<li>'+v+'</li>';
            }
        });
        $("#"+key).addClass('has-error');
    });

    elist +='</ul2>';

    $("#"+error_div).html(elist);    
    $("#"+error_div).fadeIn(4000, "linear");
    $("#"+error_div).show();
   	$('html, body').animate({'scrollTop': $("#"+error_div).offset().top-70}, 500);    
}