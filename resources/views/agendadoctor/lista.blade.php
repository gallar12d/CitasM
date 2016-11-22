<?php
include 'horario/include/config.php';
require_once'horario/include/functions.php';
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Horarios | JHCodes</title>

    <!-- Bootstrap -->
    <link href='https://fonts.googleapis.com/css?family=Maven+Pro' rel='stylesheet' type='text/css'>
    <link href="{{ asset('horario/style.css') }}" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
   <!-- container -->
   <div class="comtainer">
     <div class="row">
       <div class="col-md-8 col-md-offset-2"">
         <h1 class="text-center">Bienvenido al Módulo de Citas Online del Hospital San josé</h1>
         <h2 class="text-center">Por favor seleccione su médico de preferencia para consultar la disponibilidad de citas para esta semana</h2>
       </div>
     </div

   </div>
<div class="container">
  <div class="col-lg-6 col-offset-6 centered">
     <div>

   <label>Medico:</label>
  <select id="nombre" name="nombre" data-style="btn-primary" class="form-control">
   <option selected value="">Seleccione...</option>
    @foreach($medicos as $medic)
     <option id="{{ $medic->id }}" value="{{ $medic->id }}">{{ $medic->Nombres }} {{ $medic->Apellidos }} </option>
    @endforeach
  </select>
     

   </div>
  </div>
</div>
  
      <div id ="listaHorarios" class="container" >
         <div class="panel panel-info" style="margin-top: 20px;">
           <div class="panel-heading"><i class="fa fa-calendar" aria-hidden="true"></i> Listas de Horarios </div>
           <div class="panel-body nopadding">
           <?php
                    if (isset($_GET['page'])){
                      horariostable($_GET['page'], 1);
                    }else{
                      horariostable(1, 1);
                    }
                ?>
            
           </div>
         </div>
      </div>
    <!-- container -->

    <!-- apend data -->
    <div id="appenddata"></div>
    <!-- apend data -->


<!-- append modal set data -->
<div class="modal fade" id="DataEdit" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close canceltask" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"><i class="fa fa-times"></i></span></button>
        <h4 class="modal-title" id="myModalLabel"><i class="fa fa-thumb-tack"></i> Agregar Tarea</h4>
      </div>
      <div class="modal-body">

        <form id="taskfrm">
           <label>Tarea</label>
           <input class="form-control" type="text" id="nametask" >
           <label>Color:</label>
           <select class="form-control" id="idcolortask">
              <option value="purple-label">Purpura</option>
              <option value="red-label">Rojo</option>
              <option value="blue-label">Azul</option>
              <option value="pink-label">Rosa</option>
              <option value="green-label">Verde</option>
           </select>
          <input id="tede" type="hidden" name="tede" >
        </form>

      </div>
      <div class="modal-footer">
        <button type="button" class="savetask btn btn-success"><i class="fa fa-floppy-o"></i> Guardar</button>
        <button type="button" class="canceltask btn btn-danger" data-dismiss="modal"><i class="fa fa-times"></i> Cancelar</button>
      </div>
    </div>
  </div>
</div>
<!-- append modal set data -->

    <!-- alert danger -->
    <div id="alert-error"><i class="fa fa-times fa-2x"></i></div>
    <!-- alert danger -->


    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="{{ asset('horario/js/jquery.min.js') }}"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="{{ asset('horario/js/bootstrap.min.js') }}"></script>
    <!-- datetimepicker -->
    <script src="{{ asset('horario/js/moment-with-locales.js') }}"></script>
    <script src="{{ asset('horario/js/bootstrap-datetimepicker.js') }}"></script>
    <!-- validate -->
    <script src="{{ asset('horario/js/jquery.validate.min.js') }}"></script>
    <script src="{{ asset('horario/js/additional-methods.min.js') }}"></script>
    <!-- script -->
    <script src="{{ asset('horario/js/scripts-custom.js') }}"></script>
     <script src="{{ asset('horario/js/scripts-custom2.js') }}"></script>

  </body>
</html>