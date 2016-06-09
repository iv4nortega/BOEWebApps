/* INITIALIZE LAO.js 
 * PUBLIC API
 * @author : Iván Hernández Ortega
 * @create date : 06 de Mayo 2016
*/
var SDM = window.SDM || {};
/*Initialize functions for metrics for user sdm*/
SDM.App = (function ($, window, document, undefined) {
	
	var idSDMLogged = null;
	
	var Init = function()
	{
		$(document).ajaxStart(function() {
		    $(".loader").show();
		}).ajaxStop(function() {
			$(".loader").hide();
		});
		/*Get SDM list for verify profile */
		BOEWebApp.OperationGetIdSDM();
		
		$('#new_value').on('click', function(){
    		$('#modal_add_value').css('display', 'block');
    	});
		/*Close the modal */
    	$('.closemodal').on('click', function(){
       		$('#modal_add_value').css('display', 'none');
               window.location.href = "/BOEWebApps/SDM";
       	});
		
	};
	 /*Get list customer for show in select 
	  * of metrics view*/
    var GetCustomerList = function (userId)
    {
    	DrawDataTable(userId);
//    	$( "#selectcustomer" ).autocomplete({
//    	      source: function( request, response ) {
//    	        $.ajax({ type: 'GET',   
//    	    	     url: '../CustomerController.do?action=list_customers',
//  	     	         dataType: "json",
//  	     	         data: { customerName: request.term },
//    	     	     success : function(data){
//    	     	    	 response( $.map( data, function( item ) {
//    	     	    		if ( item.customerName && ( !request.term) ) {
//    	     	    		 return {
//    	     	    			label:item.customerName,
//    	     	    		 	value: item.customerId
//    	     	    		 }
//    	     	    		}
//    	    	    	   }));
//    	    	       },
//    	            error: function(error){
//    	            	$.notify('No se pudo obtener el listado de clientes.', 'error');
//    	            }
//    	    	});
//    	      },
//    	      minLength: 2,
//    	      select: function( event, ui ) {
//    	        console.log( ui.item ?
//    	          "Selected: " + ui.item.label :
//    	          "Nothing selected, input was " + this.value);
//    	      },
//    	      open: function() {
//    	        $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
//    	      },
//    	      close: function() {
//    	        $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
//    	      }
//    	    });
    	
    	
    	/*          */
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
    	$('#metrics_sdm').DataTable({
    		select: true, 
    		ordering: true,
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
    	        { data: 'quantity', width: '20%'}
    	    ],
    	});
    }
    /*return of functions globals - call in html*/
	return {
		Init: Init, 
		GetCustomerList: GetCustomerList
	};	
}(jQuery, window, document, undefined));