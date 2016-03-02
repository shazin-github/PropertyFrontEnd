function echoErrors(form_name, errors, error_div){
	var success_div = 'success_alert';
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
    $("#"+success_div).hide();
    $("#"+error_div).fadeIn(4000, "linear");
    $("#"+error_div).show();
   	$('html, body').animate({'scrollTop': $("#"+error_div).offset().top-100}, 500);    
}


function echoSuccess(form_name, msg, success_div){
    var default_success_div = 'success_alert';
    var error_div = 'alerts_';
    if (typeof success_div === 'undefined') {
        success_div = default_success_div;
    }

    $("#"+form_name+" :input").each(function(){
        $(this).removeClass('has-error');
    });
        
    elist = '<strong>Success</strong><br>'+msg;
    $("#"+success_div).html(elist);
    $("#"+error_div).hide();
    $(".alert-danger").hide();
    $("#"+success_div).fadeIn(1000, "linear");
    $("#"+success_div).show();
    $('html, body').animate({'scrollTop': $("#"+success_div).offset().top-100}, 500);
    setTimeout(function() {
        $("#"+success_div).fadeOut(5000, "linear");
    }, 3000);
}

function readURL(input, imageField) {
    if(input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#'+imageField).attr('src', e.target.result);
            $('#'+imageField).show();
        }
        reader.readAsDataURL(input.files[0]);
    }
}