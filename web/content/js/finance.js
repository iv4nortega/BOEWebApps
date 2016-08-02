/* INITIALIZE LAO.js 
 * PUBLIC API
 * @author : Iván Hernández Ortega
 * @create date : 06 de Junio 2016
 * @last update : 09 de Junio 2016
*/
var Finance = window.Finance || {};
/*Initialize functions for metrics for user sdm*/
Finance.App = (function ($, window, document, undefined) {
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
		BOEWebApp.GetFinanceCustomerListBySDM('#finance_customer','#customer_selected', GetPeriodsForDropDownlist);
		/*Muestra la animación al realizar un llamado ajax*/
		$(document).ajaxStart(function() {
		    $(".loader").show();
		}).ajaxStop(function() {
			$(".loader").hide();
		});
		/*Al presionar el boton nuevo valor despliega el modal y asigna valores
		 * para el nuevo registro
		 * */
		$('#create_new_finance').on('click', function(){
			VerifyDataVal();
    	});
	};
	
    /* Función que actualiza la operación mediante ajax*/
    var UpdateFinance = function(finance_id){
    	$.ajax({ type: "GET",   
  	       url: "../Finance.do?g=edit&financeId=" + finance_id,   
  	       success : function(data){
  	    	   	$('#modal_add_finance').css('display', 'block');
  			 	$('#modal_add_finance').find('#financeId').val(data.IDFinance);
  			 	$('#modal_add_finance').find('#sdmId').val(data.IDSDM);
  		     	$('#modal_add_finance').find('#customer_selected').val(data.customerId);
  		     	$('#modal_add_finance').find('#finance_description').val(data.description);
  		     	$('#modal_add_finance').find('#finance_selected').val(data.typeFinance);
  		     	$('#modal_add_finance').find('#timeId').val(data.timeId);
  	       },
  	       error: function(error){
  	    	   $.notify("Error al obtener el ID.", "error");
  	       }
  		});
    };
    function VerifyDataVal()
    {
    	var customerfilter = $('#finance_customer').val();
		var financefilter = $('#finance_select').val();
		if(customerfilter == ''){
			$('#finance_customer').notify(
					'Seleccione un cliente para filtrar, el cliente seleccionado se asignará al nuevo registro.',
					'warn');
			return false;
		}
		else if(financefilter == ''){
			$('#finance_select').notify('Seleccione una mejora para filtrar, la mejora seleccionada se asignará al nuevo registro.','warn');
			return false;
		}
		if(customerfilter == null && financefilter == null){
			$('#create_new_finance').css('display', 'none');
			return false;
		}
		if(customerfilter != '' && financefilter != ''){
    		$('#modal_add_finance').css('display', 'block');
    		$('#customer_selected').val($('#finance_customer').val());
    		$('#finance_selected').val($('#finance_select').val());
			return true;
		}
    }
    /*Obtiene la lista de SMD por nombre de usuario*/
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
    /*Obtiene periodos*/
    function GetPeriodsForDropDownlist()
    {
    	$.ajax({ type: 'GET',   
  	       url: '../Operations.do?g=periods',   
  	       success : function(data){
  	    	 /*Se agrega al dropdown el listado de periodos*/
  	    	  var list_period_finance = $('#finance_selectperiod');
  	    	  list_period_finance.find('option').remove().end();
  	            $.each(data, function (index, item) {
  	            	list_period_finance.append(
  	                $('<option>', {
  	                    value: item.idTime,
  	                    text: item.year + " - Q" + item.quarter
  	                }, '<option/>'));
  	            });
  	          $('#finance_selectperiod option:eq(2)').prop('selected', true);
  	          /*Asigna el periodo actual para nuevos registros*/
  	          $('#timeId').val($('#finance_selectperiod option:eq(2)').val());
  	          DrawDataTable();
  	       },
          error: function(error){
          	$.notify('No se pudo obtener los periodos.', 'error');
          }
     	});
    }
    /*Dibuja la tabla apartir del id del usuario que ingresa a la app*/
    function DrawDataTable()
    {
    	var period_ = $("#finance_selectperiod").val();
    	var type_ = $("#finance_type").val();
    	var fnancecustomer_ = $("#finance_customer").val();
    	/*Le asigna el valor del SDM al modal con input hide
    	 * Necesario para realizar las consultas por SDM 
    	 * */
    	/*Se Inicializa el datatable*/
    	var table = $('#finance_table').DataTable({
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
    		ajax: "../Finance?g=list_finance&user_boe="+ BOEWebApp.GetBOEUserName() + 
					"&periodfnance=" + period_  + 
					"&typefnance=" + type_ + 
					"&customerfnance=" + fnancecustomer_ ,
    	    columns: [
    	        { data: 'description', name: 'finance_description', width: '80%'},
    	        {
	                className:      '',
	                width: "20%",
	                orderable:      false,
	                data:           'IDFinance',
	                render: function (data, type, row, meta){
	                	var actions = "<a href='#' onclick='Finance.App.UpdateFinance(" + row.IDFinance + ")'>"+
	                		"<i class='fa fa-edit'></i> Editar</a>";
	                	return actions;
	                },
	            },
    	        { data: 'typeFinance', name:'typeFinance', visible: false},
    	        { data: 'customerId', name:'customerId',  visible: false},
    	        { data: 'timeId', name: 'timeId', visible: false}
    	    ],
    	});
    	/*Busqueda por default del periodo, muestra el periodo actual*/
		/*Filtro para process name/metricas al seleccionar metricas*/
		$('#finance_type').on('change', function(){
			table.ajax.url("../Finance?g=list_finance&user_boe="+ BOEWebApp.GetBOEUserName() +
	    			"&periodfnance=" + $("#finance_selectperiod").val()  + 
	    			"&typefnance=" + this.value + 
	    			"&customerfnance=" + $("#finance_customer").val()).load();
		});
		/*Filtro para process name/metricas al seleccionar metricas*/
		$('#finance_customer').on('change', function(){
			table.ajax.url("../Finance?g=list_finance&user_boe="+ BOEWebApp.GetBOEUserName() +
	    			"&periodfnance=" + $("#finance_selectperiod").val()  + 
	    			"&typefnance=" + $("#finance_type").val() + 
	    			"&customerfnance=" + this.value).load();
		});
		/*Filtro para process name/metricas al seleccionar metricas*/
		$('#finance_selectperiod').on('change', function(){
			table.ajax.url("../Finance?g=list_finance&user_boe="+ BOEWebApp.GetBOEUserName() +
	    			"&periodfnance=" + this.value  + 
	    			"&typefnance=" + $("#finance_type").val() + 
	    			"&customerfnance=" + $("#finance_customer").val()).load();
		});

    	/* Validate form by jquery validate plugin*/
	  	$('#form_finance').validate({
			rules : {
				finance_description: {
					required: true,
					maxlength: 512
				}
			},
			messages:{
				finance_description: {
					required: 'Ingrese descripción.',
					maxlength: 'Número máximo de caracteres es {0}.'
				}
			},
			submitHandler: function() {
				var customerName = $('#finance_customer option:selected').text(),
				finance_id = $('#financeId').val(),
				idsdm = $('#sdmId').val(),
				customer = $('#customer_selected').val(),
				finance_selected = $('#finance_type_selected').val(),
				finance_description = $('#finance_description').val(),
				time = $('#timeId').val();
				/*Metodo ajax para listar los clientes por sdm*/
		    	$.ajax({ 
		    		type: 'POST',   
		    	    url: '../Finance',
		    	    data: {
		    	    	financeId: finance_id,
		    	    	sdmId: idsdm, 
		    	    	customer: customer, 
		    	    	finance: finance_selected,
		    	    	description: finance_description,
		    	    	timeId: time
		    	    },
		    	    success : function(data){
		    	    	$('#modal_add_finance').css('display', 'none');
		    	    	$('#form_finance').find('#financeId').val('');
		    	    	$('#form_finance').find('#finance_description').val('');
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
	  	}, 100000);

		/*Al cerrar el modal carga nuevamente la url */
    	$('.closemodal').on('click', function(){
       		$('#modal_add_finance').css('display', 'none');
       		$('#form_finance').find('#finance_description').val('');
       		$('#form_finance').find('#finance_description').removeClass('error');
       		$('#form_finance').find('#finance_description-error').remove();
       		table.ajax.reload();
       	});
    	GetSDMByUserName();
    }
    /*return of functions globals - call in html*/
	return {
		Init: Init, 
		UpdateFinance : UpdateFinance
	};	
}(jQuery, window, document, undefined));