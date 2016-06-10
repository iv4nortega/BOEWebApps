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
		$(document).ajaxStart(function() {
		    $(".loader").show();
		}).ajaxStop(function() {
			$(".loader").hide();
		});
		/*Get SDM list for verify profile 
		 * Obtiene el listado de SDM 
		 * En el llamado llega a util.js para obtener el ID
		 * al terminar el llamado llega a GetCustomerList donde llega
		 * dicho ID
		 * */
		BOEWebApp.OperationGetIdSDM();
		$('#new_value').on('click', function(){
    		$('#modal_add_value').css('display', 'block');
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
    	/* Dibuja la tabla de operaciones */
    	DrawDataTable(userId);
    	$.ajax({ type: 'GET',   
    	       url: '../CustomerController.do?action=list_customers',   
    	       success : function(data){
    	    	   var listcustomers = $('#selectcustomer');
    	    	   listcustomers.find('option').remove().end();
    	            $.each(data, function (index, item) {
    	            	listcustomers.append(
    	                $('<option>', {
    	                    value: item.customerId,
    	                    text: item.customerName
    	                }, '<option/>'));
    	            });
    	            listcustomers.val(listcustomers);
    	       },
            error: function(error){
            	$.notify('No se pudo obtener el listado de clientes.', 'error');
            }
    	});
    };
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
    		ajax: "../OperationController?action=list_operation_top&BOEUserName="+ userId,
    	    columns: [
    	        { data: 'description', width: '80%'},
    	        { data: 'quantity', width: '20%'},
    	        { data: 'processName',  visible: false},
    	        { data: 'customerName',  visible: false}
    	    ],
    	});
    	/*Auto Complete para la busqueda de clientes en la página principal*/
		$( "#autocomplete_customer" ).autocomplete({
  	      source: function( request, response ) {
  	        $.ajax({ type: 'GET',
  	    	     url: '../CustomerController.do?action=list_customers',
	     	         dataType: "json",
	     	         data: { customerName: request.term },
  	     	     success : function(data){
  	     	    	var array = $.map( data, function( item ) {
 	     	    		 return {
    	     	    			label:item.customerName,
    	     	    		 	value: item.customerName}
   	    	    	   });
  	     	    	 response($.ui.autocomplete.filter(array, request.term) );
  	    	       },
  	            error: function(error){
  	            	$.notify('No se pudo obtener el listado de clientes.', 'error');
  	            }
  	    	});
  	      },
  	      select: function( event, ui ) {
  	    	/*Al seleccionar el cliente realiza la busqueda en la tabla
  	    	 * */
  	    	  table.search(ui.item.label).draw();
  	    	  /*Para no duplicar el valor en el input de busqueda se limpia al realizar la busqueda*/
  	    	  $('#metrics_sdm_wrapper').find('input[type="search"]').val('');
  	      },
	  	  close: function () {
	  		  /*Se limpia el campo despues de seleccionar el cliente*/
  	    	  $('#autocomplete_customer').val('');
	      }
  	    });
		/*Filtro para process name/metricas al seleccionar metricas*/
		$('#selectmetric').on('change', function(){
			/*busqueda al seleccionar las metricas*/
			table.search(this.value).draw();
			/*Para no duplicar el valor en el input de busqueda se limpia al realizar la busqueda*/
			$('#metrics_sdm_wrapper').find('input[type="search"]').val('');
		});
    }
    /*return of functions globals - call in html*/
	return {
		Init: Init, 
		GetCustomerList: GetCustomerList
	};	
}(jQuery, window, document, undefined));