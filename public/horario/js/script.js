

// funcion no valid
function novalid(){
    $('#alert-error').addClass('animated bounce').fadeIn(500);
    setTimeout(function(){$('#alert-error').removeClass('animated bounce').fadeOut(500);},1500);
}


$(document).ready(function() {
  $(window).load(function() {
//=============================================================================
var curr = new Date; // get current date
var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
var last = first + 6; // last day is the first day + 6

var firstday = new Date(curr.setDate(first)).toDateString();
var lastday = new Date(curr.setDate(last)).toDateString();
//
console.log(firstday);
var semana = (firstday + lastday);

$('#fechaSemana h1').html("Semana del "+firstday+" al "+lastday+"");
  $('#fechaSemana h1').text("Semana del "+firstday+" al "+lastday+"");


$('#time1').datetimepicker({
  format:'LT'
});

$('#time2').datetimepicker({
  format:'LT'
});
// $("#days-list a").live("click", function() {
//        $("#days-list a").removeClass("active-day");  // remove active class from all
//        $(this).addClass("active-day");
//         // $('#days-chose').val( $(this).attr('data-day'));       // add active class to clicked element
//     });

$('#days-list a').on('click', function(){


     var dias = $(this).attr('data-day');
     var dataset = $('#days-chose');
     var addday = dataset.val();
     var removeday = dataset.val().replace(dias+',', '');
     var dum = $(this);
     if (dum.hasClass('active-day')){
         dum.removeClass('active-day');
        dataset.val(removeday);
         dataset.click();
     }else{
         dum.addClass('active-day');
         dataset.val(addday+dias+',');
      dataset.click();
     }

     console.log();
});


$('.cancel-new').on('click', function(){
      var dum = $('#days-list a');
      var chose = $('#days-chose');
      dum.removeClass('active-day');
      chose.val('');
      $('#horariofrm')[0].reset();

});

//quitar la x de para borrar tarea
$('.deltasker').hide();




$('.create-horario').on('click', function(){
jQuery.validator.setDefaults({
  debug: true,
  success: "valid",
  ignore: []
});
var horariofrm = $('#horariofrm');
horariofrm.validate({
  rules: {
    nombre: "required",
    days: "required",
    descripcion: "required",
    tiempo1: "required",
    tiempo2: "required",
    minutos: "required"
  }
});
var dado = horariofrm.valid();
if (dado == true){

      var getdatos = horariofrm.serialize();
      var sender = 'process=1&'+getdatos;


      $.ajax({

         type: 'POST',
         url: base + '/api/v13/agendamiento/creacionagenda',
         data: sender,
         beforeSend: function(){
             $('#mynew').html('');
             $('#MyModal').modal('toggle');
             $('.cancel-new').click();
         },
         success: function(data){
             $('#clockindex').hide();
             $('#mynew').append(data);
             $('#mynew').addClass('animated zoomIn').fadeIn();
             setTimeout(function(){$('#mynew').removeClass('animated zoomIn');},1500);
         //----------------------------------------------------------------------------


                // Mostrar Boton Add
                $(".td-line").hover(
                  function() {
                    $(this).find('button').show();
                 },
                  function() {
                    $(this).find('button').hide();
                  }
                );

                // Agregar Informacion
                $('.addinfo').on('click', function(){
                     var dum = $(this).attr('data-row');
                     $('#DataEdit').modal('show');
                     $('#tede').val(dum);
                });


                // Borrar la tarea
                $('.delinfo').on('click', function(){
                     var dum = $(this).attr('data-row');
                     $('#'+dum).text('').removeClass('purple-label red-label blue-label pink-label').hide();
                });


                // Guardar Tarea
                $('.savetask').on('click', function(){
                     var tede = $('#tede').val();
                     var tasker = $('#nametask').val();
                     var color = $('#idcolortask option:selected').val();
                     $('#DataEdit').modal('toggle');
                     $('#'+tede).append('<label class="label-desc '+color+'">'+tasker+' <a class="deltasker"><i class="fa fa-times"></i></a></label>');
                     //$('#'+tede).text(tasker).addClass(color).show();
                     $('#taskfrm')[0].reset();


                     $('.deltasker').on('click', function(){
                         var element = $(this).parent();
                         element.addClass('animated bounceOut');
                         setTimeout(function(){element.remove();},1000);
                     });

                });



                $('.changethetime').on('click', function(){
                     var theparent = $(this).attr('data-time');
                     $('.hideedittime').hide();
                     $('.timeblock').show();
                     $('#parent'+theparent).hide();
                     $('#edit'+theparent).show();
                });

                $('.savetime').on('click', function(){
                     var savetime = $(this).attr('data-save');
                     var datasavetime = $('#input'+savetime).val();
                     $('#edit'+savetime).hide();
                     $('#parent'+savetime).show();
                     $('#data'+savetime).text(datasavetime);
                     $('#data'+savetime).addClass('animated flash');
                     setTimeout(function(){$('#data'+savetime).removeClass('flash');},1000);
                });

                $('.deleteblock').on('click', function(){
                     var block = $(this).attr('data-block');
                     $('#tr'+block).addClass('animated bounceOutLeft');
                     setTimeout(function(){$('#tr'+block).remove();},1000);
                });

                $('.canceledit').on('click', function(){
                     $('.hideedittime').hide();
                     $('.timeblock').show();
                });


                $('.guardarhorario').on('click', function(){

                    var btnsave = $(this);
                    var descripcion = $('#descripcioninput').val();
                    var tipoatencion = $('#tipoatencion').text();
                    var nombre = $('#nombreinput').val();
                    var horario = $('#mynew').html();
                    var horariodata = 'process=2&nombre='+nombre+'&descripcion='+descripcion+'&tipoatencion='+tipoatencion+'&horario='+horario;

                    $.ajax({

                        type: 'POST',
                        url: base + '/api/v13/agendamiento/insertaragenda',
                        data: horariodata,
                        beforeSend: function(){
                            btnsave.prop('disabled', true);
                            $('#horario-name').addClass('opacityelement');
                            $('#thetable').addClass('opacityelement');
                        },
                        success: function(){
                            $('#thetable').addClass('animated bounceOut');
                            btnsave.prop('disabled', false);
                            setTimeout(function(){
                            window.location='lista'

                            });

                        },
                        error: function(){
                            novalid();
                        }

                    });

                });
         
         },
         error: function(){
            novalid();
         }
      });

}else{
novalid();
}
});
//=============================================================================
    });
});
