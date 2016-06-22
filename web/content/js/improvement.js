/* INITIALIZE LAO.js 
 * PUBLIC API
 * @author : Iván Hernández Ortega
 * @create date : 06 de Junio 2016
 * @last update : 09 de Junio 2016
*/
var Improvement = window.Improvement || {};
/*Initialize functions for metrics for user sdm*/
Improvement.App = (function ($, window, document, undefined) {
	/*Variables iniciales*/
	var idSDMLogged, table = null;
	
	/*funcion inicial para sdm carga todos los elementos iniciales*/
	var Init = function()
	{
		var bridgeframe = top.document.getElementsByName('servletBridgeIframe');
    	$(bridgeframe).contents().find('.newWindowIcon').hide();
		/*Get SDM list for verify profile 
		 * Obtiene el listado de SDM 
		 * En el llamado llega a util.js para obtener el ID
		 * al terminar el llamado llega a GetCustomerList donde llega
		 * dicho ID
		 * */
		/*Obtiene la lista de los periodos*/
		GetPeriodsForDropDownlist();
		/*Muestra la animación al realizar un llamado ajax*/
		$(document).ajaxStart(function() {
		    $(".loader").show();
		}).ajaxStop(function() {
			$(".loader").hide();
		});
		/*Al presionar el boton nuevo valor despliega el modal y asigna valores
		 * para el nuevo registro
		 * */
		$('#create_new_improvement').on('click', function(){
			VerifyDataVal();
    	});
	};
	
    /* Función que actualiza la operación mediante ajax*/
    var UpdateImprovement = function(improvement_id){
    	$.ajax({ type: "GET",   
  	       url: "../Improvements.do?g=edit&improvementId=" + improvement_id,   
  	       success : function(data){
  	    	   	$('#modal_add_improvement').css('display', 'block');
  			 	$('#modal_add_improvement').find('#improvementId').val(data.IDImprovement);
  			 	$('#modal_add_improvement').find('#sdmId').val(data.IDSDM);
  		     	$('#modal_add_improvement').find('#customer_selected').val(data.customerId);
  		     	$('#modal_add_improvement').find('#improvement_description').val(data.description);
  		     	$('#modal_add_improvement').find('#improvement_selected').val(data.typeImprovement);
  		     	$('#modal_add_improvement').find('#timeId').val(data.timeId);
  	       },
  	       error: function(error){
  	    	   $.notify("Error al obtener el ID.", "error");
  	       }
  		});
    };
    function VerifyDataVal()
    {
    	var customerfilter = $('#improvement_customer').val();
		var improvementfilter = $('#improvement_select').val();
		if(customerfilter == ''){
			$('#improvement_customer').notify(
					'Seleccione un cliente para filtrar, el cliente seleccionado se asignará al nuevo registro.',
					'warn');
			return false;
		}
		else if(improvementfilter == ''){
			$('#improvement_select').notify('Seleccione una mejora para filtrar, la mejora seleccionada se asignará al nuevo registro.','warn');
			return false;
		}
		if(customerfilter == null && improvementfilter == null){
			$('#create_new_improvement').css('display', 'none');
			return false;
		}
		if(customerfilter != '' && improvementfilter != ''){
    		$('#modal_add_improvement').css('display', 'block');
    		$('#customer_selected').val($('#improvement_customer').val());
    		$('#improvement_selected').val($('#improvement_select').val());
			return true;
		}
    }
    /*Get list customer for show in select 
	  * of metrics view / llega el ID desde Util.js*/
	function GetCustomerList()
	{
	   	/*Metodo ajax para listar los clientes por sdm*/
		$.ajax({ type: 'GET',   
	   	       url: '../Customers.do?action=list_customers_by_sdm&sdmName=' + BOEWebApp.GetBOEUserName(),   
	   	       success : function(data){
	   	    	   GetSDMByUserName();
	   	    	   /* Dibuja la tabla de operaciones */
	   	    	   DrawDataTable();
	   	    	   var listcustomers = $('#improvement_customer');
	   	    	   listcustomers.find('option').remove().end();
	   	           $.each(data, function (index, item) {
	   	        	   listcustomers.append(
	   	               $('<option>', {
	   	            	   value: item.customerId,
	   	            	   text: item.customerName
	   	               }, '<option/>'));
	   	           });
	   	        //$("#improvement_customer").prepend("<option value=''></option>").val('');
	   	        $('#improvement_table_wrapper').find('input[type="search"]').val('');
	   	        if(listcustomers.val() == null){
	   	        	$('#new_value').css('display', 'none');
	   	        }
	   	       },
	   	       error: function(error){
	   	    	   $.notify('No se pudo obtener el listado de clientes.', 'error');
	   	       }
		});
	 };
    function GetSDMByUserName()
    {
    	$.ajax({ type: "GET",   
 	       url: "../SDMs.do?action=list_sdms&BOEUserName=" + BOEWebApp.GetBOEUserName(),   
 	       success : function(data){
 	    	   if(data == null || data.IDSDM == 0){
  	    		  $('.loader').show();
 	    		  $.notify("El usuario con el que ingreso no se encuentra dado de alta.", "warn");
    		   }else{
    			   $('#sdmId').val(data.IDSDM);
    		   }
 	       },
         error: function(error){
        	 if(error.responseText.match('conexión')){
        		 $.notify("Hubo un problema con la conexión a la base de datos.", "error");
    		 }
        	 else
         		$.notify("No se pudieron obtener los SDM.", "error");
         }
    	});
    };
    /*Get improvement_selected/Metrics*
     * */
    function GetTypeImprovements()
    {
    	$.ajax({ type: 'GET',   
 	       url: '../Improvements.do?g=typeImprovements&user_boe=' + BOEWebApp.GetBOEUserName(),   
 	       success : function(data){
 	    	   var list_improvements = $('#improvement_select');
 	    	  list_improvements.find('option').remove().end();
 	            $.each(data, function (index, item) {
 	            	list_improvements.append(
 	                $('<option>', {
 	                    value: item.text,
 	                    text: item.text
 	                }, '<option/>'));
 	            });
 	           //$("#improvement_select").prepend("<option value=''></option>").val('');
 	       },
         error: function(error){
         	$.notify('No se pudo obtener el listado de clientes.', 'error');
         }
    	});
    }
    /*Obtiene periodos*/
    function GetPeriodsForDropDownlist()
    {
    	$.ajax({ type: 'GET',   
  	       url: '../Operations.do?g=periods',   
  	       success : function(data){
  	    	 /*Obtiene el listado de clientes por usuario*/
  	    	 GetCustomerList();
  	    	 /*Se agrega al dropdown el listado de periodos*/
  	    	  var list_period_improvement = $('#improvement_selectperiod');
  	    	  list_period_improvement.find('option').remove().end();
  	            $.each(data, function (index, item) {
  	            	list_period_improvement.append(
  	                $('<option>', {
  	                    value: item.idTime,
  	                    text: item.year + " - Q" + item.quarter
  	                }, '<option/>'));
  	            });
  	          $('#improvement_selectperiod option:eq(2)').prop('selected', true);
  	          /*Asigna el periodo actual para nuevos registros*/
  	          $('#timeId').val($('#improvement_selectperiod option:eq(2)').val());
  	       },
          error: function(error){
          	$.notify('No se pudo obtener los periodos.', 'error');
          }
     	});
    }
    /*Dibuja la tabla apartir del id del usuario que ingresa a la app*/
    function DrawDataTable()
    {
    	GetTypeImprovements();
    	/*Le asigna el valor del SDM al modal con input hide
    	 * Necesario para realizar las consultas por SDM 
    	 * */
    	/*Se Inicializa el datatable*/
    	var table = $('#improvement_table').DataTable({
    		select: true, 
    		ordering: true,
    		order: [0, 'asc'],
    	    language : {
    	      emptyTable     : 'No existen registros.',
    	      zeroRecords    : 'No se encontraron resultados.',
    	      thousands      : ',',
    	      decimal      	 : ',',
    	      processing     : 'Procesando...',
    	      loadingRecords : 'Cargando...',
    	      info           : 'Página _PAGE_ de _PAGES_ de _TOTAL_ registros',
    	      infoEmpty      : '0 de 0 registros',
    	      infoFiltered   : '(filtro para _MAX_ registros)',
    	      infoPostFix    : '',
    	      lengthMenu     : 'Mostrar _MENU_ registros',
    	      search         : 'Buscar:',
    	      paginate       : {
    	        first    : 'Primera',
    	        last     : 'Última',
    	        next     : 'Siguiente >',
    	        previous : '< Anterior'
    	      },
    	      aria : {
    	        sortAscending  : ' Ascendente',
    	        sortDescending : ' Descendente'
    	      }
    	    },
    		ajax: "../Improvements?g=list_improvements&user_boe="+ BOEWebApp.GetBOEUserName(),
    	    columns: [
    	        { data: 'description', name: 'improvement_description', width: '80%'},
    	        {
	                className:      '',
	                width: "20%",
	                orderable:      false,
	                data:           'IDImprovement',
	                render: function (data, type, row, meta){
	                	var actions = "<a href='#' onclick='Improvement.App.UpdateImprovement(" + row.IDImprovement + ")'>"+
	                		"<i class='fa fa-edit'></i> Editar</a>";
	                	return actions;
	                },
	            },
    	        { data: 'typeImprovement', name:'typeImprovement', visible: false},
    	        { data: 'customerId', name:'customerId',  visible: false},
    	        { data: 'timeId', name: 'timeId', visible: false}
    	    ],
    	});
    	/*Busqueda por default del periodo, muestra el periodo actual*/
    	table.column('timeId:name').search($('#improvement_selectperiod').val()).draw();
		/*Filtro para process name/metricas al seleccionar metricas*/
		$('#improvement_select').on('change', function(){
			/*busqueda al seleccionar las metricas*/
			table.column('typeImprovement:name').search(this.value).draw();
		});
		/*Filtro para process name/metricas al seleccionar metricas*/
		$('#improvement_customer').on('change', function(){
			/*busqueda al seleccionar las metricas*/
			table.column('customerId:name').search(this.value).draw();
		});
		/*Filtro para process name/metricas al seleccionar metricas*/
		$('#improvement_selectperiod').on('change', function(){
			/*busqueda al seleccionar las metricas*/
			table.column('timeId:name').search(this.value).draw();
		});

    	/* Validate form by jquery validate plugin*/
	  	$('#form_improvement').validate({
			rules : {
				improvement_description: {
					required: true,
					maxlength: 512
				}
			},
			messages:{
				improvement_description: {
					required: 'Ingrese descripción.',
					maxlength: 'Número máximo de caracteres es {0}.'
				}
			},
			submitHandler: function() {
				var customerName = $('#improvement_customer option:selected').text(),
				improvement_id = $('#improvementId').val(),
				idsdm = $('#sdmId').val(),
				customer = $('#customer_selected').val(),
				improvement_selected = $('#improvement_selected').val(),
				improvement_description = $('#improvement_description').val(),
				time = $('#timeId').val();
				/*Metodo ajax para listar los clientes por sdm*/
		    	$.ajax({ 
		    		type: 'POST',   
		    	    url: '../Improvements',
		    	    data: {
		    	    	improvementId: improvement_id,
		    	    	sdmId: idsdm, 
		    	    	customer: customer, 
		    	    	improvement: improvement_selected,
		    	    	description: improvement_description,
		    	    	timeId: time
		    	    },
		    	    success : function(data){
		    	    	$('#modal_add_improvement').css('display', 'none');
		    	    	$('#form_improvement').find('#improvementId').val('');
		    	    	$('#form_improvement').find('#improvement_description').val('');
		    	    	$.notify('El registro para "'+ customerName  +'" se ha guardado correctamente.', 'success');
		    	    	table.ajax.reload();
		    	    },
		            error: function(error){
		            	$.notify('No se pudo guardar el registro.' , 'error');
		            }
		    	});
			}
		});
	  	/*Actualiza la tabla en un intervalo de 30seg*/
	  	setInterval( function () {
	  	    table.ajax.reload();
	  	}, 30000);

		/*Al cerrar el modal carga nuevamente la url */
    	$('.closemodal').on('click', function(){
       		$('#modal_add_improvement').css('display', 'none');
       		$('#form_improvement').find('#improvement_description').val('');
       		$('#form_improvement').find('#improvement_description').removeClass('error');
       		$('#form_improvement').find('#improvement_description-error').remove();
       		table.ajax.reload();
       	});
    	/*Auto Complete para la busqueda de clientes en la página principal*/
//		$( "#autocomplete_customer" ).autocomplete({
//  	      source: function( request, response ) {
//  	        $.ajax({ type: 'GET',
//  	    	     url: '../Customers.do?action=list_customers_by_sdm&sdmName=' + BOEWebApp.GetBOEUserName() ,
//	     	         dataType: "json",
//	     	         data: { customerName: request.term },
//  	     	     success : function(data){
//  	     	    	var array = $.map( data, function( item ) {
// 	     	    		 return {
//	    	     	    			label: item.customerName,
//	    	     	    		 	value: item.customerName,
//	    	     	    		 	id: item.customerId
//    	     	    		 	}
//   	    	    	   });
//  	     	    	 response($.ui.autocomplete.filter(array, request.term) );
//  	    	       },
//  	            error: function(error){
//  	            	$.notify('No se pudo obtener el listado de clientes.', 'error');
//  	            }
//  	    	});
//  	      },
//  	      select: function( event, ui ) {
//  	    	/*Al seleccionar el cliente realiza la busqueda en la tabla
//  	    	 * */
//  	    	  $('#customer_selected').val(ui.item.id);
//  	    	  table.search(ui.item.label).draw();
//  	    	  /*Para no duplicar el valor en el input de busqueda se limpia al realizar la busqueda*/
//  	    	  $('#metrics_sdm_wrapper').find('input[type="search"]').val('');
//  	      },
//	  	  close: function () {
//	  		  /*Se limpia el campo despues de seleccionar el cliente*/
//  	    	  //$('#autocomplete_customer').val('');
//	      }
//  	    });
    }
    /*return of functions globals - call in html*/
	return {
		Init: Init, 
		GetCustomerList: GetCustomerList,
		UpdateImprovement : UpdateImprovement
	};	
}(jQuery, window, document, undefined));