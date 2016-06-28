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
		var bridgeframe = top.document.getElementsByName('servletBridgeIframe');
    	$(bridgeframe).contents().find('.newWindowIcon').hide();
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
			GetPeriodsData();
    		$('#modal_add_value').css('display', 'block');
    		$('#selectcustomer').val($('#select_customer_filter').val());
    		$('#processName').val($('#selectmetric').val());
    	});
	};
	 /*Get list customer for show in select 
	  * of metrics view / llega el ID desde Util.js*/
    var GetCustomerList = function (userId)
    {
    	$('#form_operation_top').find('#sdmId').val(userId);
    	/*Metodo ajax para listar los clientes por sdm*/
    	$.ajax({ type: 'GET',   
    	       url: '../Customers.do?action=list_customers_by_sdm&sdmName=' + BOEWebApp.GetBOEUserName(),   
    	       success : function(data){
					/*Obtiene el nombre de los procesos*/
					GetProcessName(userId);
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
 	    	       	if(listcustomers.val() == null){
 	    	       		$('#new_value').css('display', 'none');
 	    	   		}
    	       },
            error: function(error){
            	$.notify('No se pudo obtener el listado de clientes.', 'error');
            }
    	});
    };
    /* Función que actualiza la operación mediante ajax*/
    var UpdateOperation = function(idOperation){
    	$.ajax({ type: "GET",   
 	       url: "../Operations.do?g=edit&operationId=" + idOperation,   
 	       success : function(data){
 	    	   	$('#modal_update_value').css('display', 'block');
 			 	$('#modal_update_value').find('#operationId').val(data.IDOperationTop);
 			 	$('#modal_update_value').find('#sdmId').val(data.IDSDM);
 		     	$('#modal_update_value').find('#selectcustomer').val(data.customerId);
 		     	$('#modal_update_value').find('#description').val(data.description);
 		     	$('#modal_update_value').find('#selectmetric').val(data.processName);
 		     	$('#modal_update_value').find('#quantity').val(data.quantity);
 		     	$('#modal_update_value').find('#timeId').val(data.timeId);
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
 	       url: '../Operations.do?g=process&userid=' + userId,   
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
 	   	    	DrawTable();
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
    function GetPeriodsData(){
    	$.ajax({ 
    		type: 'GET',
    		url: "../Operations?g=operations&BOEUser="+ BOEWebApp.GetBOEUserName() + 
			"&timeId=" + $('#selectperiod option:eq(1)').val()  + 
			"&ProcessName=" + $("#selectmetric").val() + 
			"&CustomerId=" + $("#select_customer_filter").val(),
	        dataType: "json",
	        success : function(data){
	        	var period = $('#selectperiod option:eq(1)').val(),
	        	customerNameSelected = $('#select_customer_filter option:selected').text(),
	        	process = $('#selectmetric').val(),
	        	customer = $('#select_customer_filter').val(),
	        	previousperiod = $('#selectperiod option:eq(1)').text();
	        	$('#form_operation_top').find('#processName').val(process);
	        	$('#form_operation_top').find('#timeId').val($('#selectperiod').val());
	        	if(data.data.length > 0)
        		{
		        	$('#previousperiod').html('del "' + previousperiod + '" : ' + customerNameSelected);
	 	            $('#form_operation_top').find('#sdmId').val();
		        	$('.content_registers').remove();
		        	$('#form_operation_top').find('#timeId').val();
		        	for(i = 0; i <= 9 ; i++){
		        		$('#form_operation_top').find('#quantity'+ i).val(0);
		        		$('#form_operation_top').find('#description'+ i).val((data.data[i] == undefined) ? '': data.data[i].description);
	        		}
//		        	var c = 10;
//		        	$.each(data.data, function(index, item){
//		        		if(period == item.timeId && process == item.processName && parseFloat(customer) == item.customerId ){
//		        			var count = c--;
//		        			$('<div class="content_registers"><div class="large-2 columns">'+
//		        					'<input type="text" name="quantity'+ count +'" id="quantity'+ count +'" value="0" /></div>'+
//		        			'<div class="large-10 columns"><input type="text" name="description'+ count +'" id="description'+ count +'" value="'+ 
//		        			item.description +'" /></div></div>')
//		        					.insertAfter('.previus_registers').children();
//		        		}
//		        	});
        		}
	        	else{
	        		$('#previousperiod').html('para el cliente ' + customerNameSelected);
	        		ClearFormOperationTop();
	        	}
 	       },
         error: function(error){
         	$.notify('No se pudo obtener los registros del periodo anterior.', 'error');
         }
    	});
    };
    function DrawTable()
    {
    	var timeId_ = $("#selectperiod").val();
    	var periodName_ = $("#selectmetric").val();
    	var customerId_ = $("#select_customer_filter").val();
    	/*Se Inicializa el datatable*/
    	var table = $('#metrics_sdm').DataTable({
    		select: true, 
    		ordering: true,
    		order: [1, 'asc'],
    	    language : {
    	      emptyTable     : 'No existen registros.',
    	      zeroRecords    : 'No se encontraron resultados.',
    	      thousands      : ',',
    	      decimal      	 : '.',
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
    		ajax: "../Operations?g=operations&BOEUser="+ BOEWebApp.GetBOEUserName() + 
    			"&timeId=" + timeId_  + 
    			"&ProcessName=" + periodName_ + 
    			"&CustomerId=" + customerId_ ,
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
    	        { data: 'processName', name:'process_name', visible: false},
    	        { data: 'customerId', name:'customerId',  visible: false},
    	        { data: 'timeId', name: 'timeId', visible: false}
    	    ],
    	});

		/*Filtro para process name/metricas al seleccionar metricas*/
		$('#selectmetric').on('change', function(){
			table.ajax.url("../Operations?g=operations&BOEUser="+ BOEWebApp.GetBOEUserName() + 
	    			"&timeId=" + $("#selectperiod").val()  + 
	    			"&ProcessName=" + this.value + 
	    			"&CustomerId=" + $("#select_customer_filter").val()).load();
		});
		/*Filtro para process name/metricas al seleccionar metricas*/
		$('#select_customer_filter').on('change', function(){
			table.ajax.url("../Operations?g=operations&BOEUser="+ BOEWebApp.GetBOEUserName() + 
	    			"&timeId=" + $("#selectperiod").val()  + 
	    			"&ProcessName=" + $("#selectmetric").val() + 
	    			"&CustomerId=" + this.value).load();
		});
		/*Filtro para process name/metricas al seleccionar metricas*/
		$('#selectperiod').on('change', function(){
			table.ajax.url("../Operations?g=operations&BOEUser="+ BOEWebApp.GetBOEUserName() + 
	    			"&timeId=" + this.value  + 
	    			"&ProcessName=" + $("#selectmetric").val() + 
	    			"&CustomerId=" + $("#select_customer_filter").val()).load();
		});
		/*Al cerrar el modal carga nuevamente la url */
    	$('.closemodal').on('click', function(){
       		$('#modal_add_value').css('display', 'none');
    		$('#modal_update_value').css('display', 'none');
       		table.ajax.reload();
               //window.location.href = "/BOEWebApps/SDM";
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
				var customer = $('#select_customer_filter').val(),
				customerName = $('#select_customer_filter option:selected').text(),
				processName = $('#selectmetric').val(),time = $('#timeId').val();
				/*Metodo ajax para listar los clientes por sdm*/
		    	$.ajax({ 
		    		type: 'POST',   
		    	    url: '../Operations',
		    	    data: 'selectcustomer=' + customer +'&'+ $('#form_operation_top').serialize(),
		    	    success : function(data){
		    	    	$('#modal_add_value').css('display', 'none');
		        		ClearFormOperationTop();
		    	    	$.notify('Los "'+ processName + '" para "'+ customerName  +'" se ha guardado correctamente.', 'success');
		    	    	table.ajax.reload();
		    	    },
		            error: function(error){
		            	$.notify('No se pudo guardar el registro.' , 'error');
		            }
		    	});
			}
		});
	  	/* Validate form by jquery validate plugin*/
	  	$('#form_operation_top_update').validate({
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
				customer = $('#select_customer_filter').val(),
				customerName = $('#select_customer_filter option:selected').text(),
				processName = $('#selectmetric').val(), quantity = $('#quantity').val(), 
				description = $('#description').val(), time = $('#timeId').val();
				/*Metodo ajax para listar los clientes por sdm*/
		    	$.ajax({ 
		    		type: 'POST',   
		    	    url: '../Operations',
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
		    	    	$('#modal_update_value').css('display', 'none');
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
	  	}, 30000);
    };
  	function ClearFormOperationTop(){
  		for(i = 0; i <= 9 ; i++){
    		$('#form_operation_top').find('#quantity'+ i).val('0');
    		$('#form_operation_top').find('#description'+ i).val('');
		}
  	};
    /*return of functions globals - call in html*/
	return {
		Init: Init, 
		GetCustomerList: GetCustomerList,
		UpdateOperation : UpdateOperation
	};	
}(jQuery, window, document, undefined));