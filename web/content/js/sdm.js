/* INITIALIZE LAO.js 
 * PUBLIC API
 * @author : Iván Hernández Ortega
 * @create date : 06 de Junio 2016
 * @last update : 09 de Junio 2016
*/
var SDM = window.SDM || {};
/*Initialize functions for metrics for user sdm*/
SDM.App = (function ($, window, document, undefined) {
	/*Variables iniciales*/
	var idSDMLogged, table = null;
	
	/*funcion inicial para sdm carga todos los elementos iniciales*/
	var Init = function()
	{
		/*Get SDM list for verify profile 
		 * Obtiene el listado de SDM 
		 * En el llamado llega a util.js para obtener el ID
		 * al terminar el llamado llega a GetCustomerList donde llega
		 * dicho ID
		 * */
		BOEWebApp.OperationGetIdSDM();
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
		$('#new_value').on('click', function(){
    		$('#modal_add_value').css('display', 'block');
    		$('#selectcustomer').val($('#select_customer_filter').val());
    		$('#processName').val($('#selectmetric').val());
    	});
		/*Al cerrar el modal carga nuevamente la url */
    	$('.closemodal').on('click', function(){
       		$('#modal_add_value').css('display', 'none');
               window.location.href = "/BOEWebApps/SDM";
       	});
	};
	 /*Get list customer for show in select 
	  * of metrics view / llega el ID desde Util.js*/
    var GetCustomerList = function (userId)
    {
    	/*Metodo ajax para listar los clientes por sdm*/
    	$.ajax({ type: 'GET',   
    	       url: '../CustomerController.do?action=list_customers_by_sdm&sdmName=' + BOEWebApp.GetBOEUserName(),   
    	       success : function(data){
					/*Obtiene el nombre de los procesos*/
					GetProcessName(userId);
					/* Dibuja la tabla de operaciones */
					DrawDataTable(userId);
					var listcustomers = $('#select_customer_filter');
					listcustomers.find('option').remove().end();
    	            $.each(data, function (index, item) {
    	            	listcustomers.append(
    	                $('<option>', {
    	                    value: item.customerId,
    	                    text: item.customerName
    	                }, '<option/>'));
    	            });
    	    		$('#metrics_sdm_wrapper').find('input[type="search"]').val('');
    	       },
            error: function(error){
            	$.notify('No se pudo obtener el listado de clientes.', 'error');
            }
    	});
    };
    /* Función que actualiza la operación mediante ajax*/
    var UpdateOperation = function(idOperation){
    	$.ajax({ type: "GET",   
 	       url: "../OperationController.do?g=edit&operationId=" + idOperation,   
 	       success : function(data){
 	    	   	$('#modal_add_value').css('display', 'block');
 			 	$('#modal_add_value').find('#operationId').val(data.IDOperationTop);
 			 	$('#modal_add_value').find('#sdmId').val(data.IDSDM);
 		     	$('#modal_add_value').find('#selectcustomer').val(data.customerId);
 		     	$('#modal_add_value').find('#description').val(data.description);
 		     	$('#modal_add_value').find('#selectmetric').val(data.processName);
 		     	$('#modal_add_value').find('#quantity').val(data.quantity);
 		     	$('#modal_add_value').find('#timeId').val(data.timeId);
 	       },
 	       error: function(error){
 	    	   $.notify("Error al obtener el ID.", "error");
 	       }
 		});
    	
    	
    };
    /*Get ProcessName/Metrics*
     * */
    function GetProcessName(userId)
    {
    	$.ajax({ type: 'GET',   
 	       url: '../OperationController.do?g=process&userid=' + userId,   
 	       success : function(data){
 	    	   var list_process = $('#selectmetric');
 	    	  list_process.find('option').remove().end();
 	            $.each(data, function (index, item) {
 	            	list_process.append(
 	                $('<option>', {
 	                    value: item.processName,
 	                    text: item.processName
 	                }, '<option/>'));
 	            });
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
  	       url: '../OperationController.do?g=periods',   
  	       success : function(data){
  	    	  var list_process = $('#selectperiod');
  	    	  list_process.find('option').remove().end();
  	            $.each(data, function (index, item) {
  	            	list_process.append(
  	                $('<option>', {
  	                    value: item.idTime,
  	                    text: item.year + " - Q" + item.quarter
  	                }, '<option/>'));
  	            });
  	          $('#selectperiod option:eq(2)').prop('selected', true);
  	          /*Asigna el periodo actual para nuevos registros*/
  	          $('#timeId').val($('#selectperiod option:eq(2)').val());
  	       },
          error: function(error){
          	$.notify('No se pudo obtener los periodos.', 'error');
          }
     	});
    }
    /*Dibuja la tabla apartir del id del usuario que ingresa a la app*/
    function DrawDataTable (userId)
    {
    	/*Le asigna el valor del SDM al modal con input hide
    	 * Necesario para realizar las consultas por SDM 
    	 * */
    	$('#sdmId').val(userId);
    	/*Se Inicializa el datatable*/
    	var table = $('#metrics_sdm').DataTable({
    		select: true, 
    		ordering: true,
    		order: [1, 'asc'],
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
    		ajax: "../OperationController?g=operations&userid="+ userId,
    	    columns: [
    	        { data: 'description', name: 'description', width: '65%'},
    	        { data: 'quantity', name:'quantity', width: '20%'},
    	        {
	                className:      '',
	                width: "15%",
	                orderable:      false,
	                data:           'IDOperationTop',
	                render: function (data, type, row, meta){
	                	var actions = "<a href='#' onclick='SDM.App.UpdateOperation(" + row.IDOperationTop + ")'>"+
	                		"<i class='fa fa-edit'></i> Editar</a>";
	                	return actions;
	                },
	            },
    	        { data: 'processName', name:'processName', visible: false},
    	        { data: 'customerId', name:'customerId',  visible: false},
    	        { data: 'timeId', name: 'timeId', visible: false}
    	    ],
    	});
    	/*Busqueda por default del periodo, muestra el periodo actual*/
    	table.column('timeId:name').search($('#selectperiod').val()).draw();
		/*Filtro para process name/metricas al seleccionar metricas*/
		$('#selectmetric').on('change', function(){
			/*busqueda al seleccionar las metricas*/
			table.column('processName:name').search(this.value).draw();
		});
		/*Filtro para process name/metricas al seleccionar metricas*/
		$('#select_customer_filter').on('change', function(){
			/*busqueda al seleccionar las metricas*/
			table.column('customerId:name').search(this.value).draw();
		});
		/*Filtro para process name/metricas al seleccionar metricas*/
		$('#selectperiod').on('change', function(){
			/*busqueda al seleccionar las metricas*/
			table.column('timeId:name').search(this.value).draw();
		});

    	/* Validate form by jquery validate plugin*/
	  	$('#form_operation_top').validate({
			rules : {
				processName: {
					required: true
				},
				quantity: {
					required: true,
					maxlength: 10
				},
				description: {
					required: true,
					maxlength: 512
				}
			},
			messages:{
				processName: 'Ingrese el nombre del proceso.',
				quantity: {
					required: 'Ingrese un valor.',
					maxlength: 'Número máximo de caracteres es {0}.'
				},
				description: {
					required: 'Ingrese descripción.',
					maxlength: 'Número máximo de caracteres es {0}.'
				}
			},
			submitHandler: function() {
				var operationId = $('#operationId').val(),
				idsdm = $('#sdmId').val(),
				customer = $('#selectcustomer').val(),
				customerName = $('#select_customer_filter option:selected').text(),
				processName = $('#selectmetric').val(), quantity = $('#quantity').val(), 
				description = $('#description').val(), time = $('#timeId').val();
				/*Metodo ajax para listar los clientes por sdm*/
		    	$.ajax({ 
		    		type: 'POST',   
		    	    url: '../OperationController',
		    	    data: {
		    	    	operationId: operationId,
		    	    	sdmId: idsdm, 
		    	    	selectcustomer: customer, 
		    	    	processName: processName, 
		    	    	quantity:quantity , 
		    	    	description: description,
		    	    	timeId: time
		    	    },
		    	    success : function(data){
		    	    	$('#modal_add_value').css('display', 'none');
		    	    	$('#form_operation_top').find('#operationId').val('');
		    	    	$('#form_operation_top').find('#quantity').val('');
		    	    	$('#form_operation_top').find('#description').val('');
		    	    	$.notify('El "'+ processName + '" para "'+ customerName  +'" se ha guardado correctamente.', 'success');
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
	  	}, 20000);
    	/*Auto Complete para la busqueda de clientes en la página principal*/
//		$( "#autocomplete_customer" ).autocomplete({
//  	      source: function( request, response ) {
//  	        $.ajax({ type: 'GET',
//  	    	     url: '../CustomerController.do?action=list_customers_by_sdm&sdmName=' + BOEWebApp.GetBOEUserName() ,
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
//  	    	  $('#selectcustomer').val(ui.item.id);
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
		UpdateOperation : UpdateOperation
	};	
}(jQuery, window, document, undefined));