/* INITIALIZE LAO.js 
 * PUBLIC API
 * @author : Iván Hernández Ortega
 * @create date : 06 de Junio 2016
*/
var BOEWebApp = window.BOEWebApp || {};

// Módulo de inicialización y funciones genéricas
BOEWebApp = (function ($, window, document, undefined) {
	
	var userunregistered = 'Usuario no registrado';
	/*Retorna el nombre de usuario que inicia sesion 
	 * en BOE
	 * */
	var GetBOEUserName = function(){
		var frame = top.document.getElementsByName('servletBridgeIframe');
		var fullusername = $(frame).contents().find('.bannerUserName').text().trim();
		//fullusername = 'LUIS MIGUEL LOPEZ MONTES DE OCA';
		//fullusername = 'IVAN HERNANDEZ ORTEGA';
		if(fullusername == null || fullusername == ''){
			fullusername = userunregistered;
		}
		return fullusername;
	};
	/*Metodo que obtiene el id del SDM para las metricas
	 * por usuario
	 * */
	var OperationGetIdSDM = function()
    {
    	$.ajax({ type: "GET",   
 	       url: "../SDMs.do?action=list_sdms&BOEUserName=" + BOEWebApp.GetBOEUserName(),   
 	       success : function(data){
 	    	   if(data == null || data.IDSDM == 0){
  	    		  $('.loader').show();
 	    		  $.notify("El usuario con el que ingreso no se encuentra dado de alta.", "warn");
    		   }else{
    			   /*Obtiene el ID del cliente para dibujar la tabla de operaciones*/
    			   SDM.App.GetCustomerList(data.IDSDM);
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
    /*DatePicker general*/
    var DatePickerGral = function(form, inputctrl)
	{
		$(inputctrl).datepicker({ 
			dateFormat: 'yy-mm-dd',
			autoclose: true,
			language: 'es',
			showAnim: 'slideDown',
			onSelect: function(date) {
				$(inputctrl).val(date);
	            var validator = $(form).validate();
				validator.element( inputctrl );
	        },
		});
	};
	/*DatePicker para la pantalla de acciones y 
	 * estadisticas LAO
	 * */
	var DatePickerLAO  = function( form , inputctrl, status)
	{
		$(inputctrl).datepicker({ 
			dateFormat: 'yy-mm-dd',
			autoclose: true,
			language: 'es',
			showAnim: 'slideDown',
		}).on('change', function(e){
			var validator = $( form ).validate();
			validator.element( inputctrl );
			
			plannedDate = $('#date_planned').val().split('-');
			realDate = $('#date_real').val().split('-');
			closeDate = $('#date_close').val().split('-');
		    datenow = $('#lao_date').val().split('-');
		    if (new Date(plannedDate[0], plannedDate[1], plannedDate[2]) <
		    new Date(datenow[0], datenow[1], datenow[2])) {
		    	$(status).val(1);
		    	$(status).css('background-color', '#e20074');
		    	$(status).css('color', '#fff');
		    }
		    if (new Date(plannedDate[0], plannedDate[1], plannedDate[2]) >=
				    new Date(datenow[0], datenow[1], datenow[2]))
	    	{
		    	$(status).val(3);
		    	$(status).css('background-color', '#66ccff');
		    	$(status).css('color', '#fff');
	    	}if(new Date(realDate[0], realDate[1], realDate[2]) <
	    		    new Date(datenow[0], datenow[1], datenow[2])){
	    		$(status).val(4);
		    	$(status).css('background-color', '#4CAF50');
		    	$(status).css('color', '#fff');
    		}if(new Date(closeDate[0], closeDate[1], closeDate[2]) <
	    		    new Date(datenow[0], datenow[1], datenow[2])){
	    		$(status).val(5);
		    	$(status).css('background-color', '#000');
		    	$(status).css('color', '#fff');
    		}
		});
	};
	 /*Get list customer for show in select 
	  * of metrics view / llega el ID desde Util.js*/
	var GetCustomerListBySDM = function(selectctrl) 
	{
	   	/*Metodo ajax para listar los clientes por sdm*/
		$.ajax({ type: 'GET',   
	   	       url: '../Customers.do?action=list_customers_by_sdm&sdmName=' + BOEWebApp.GetBOEUserName(),   
	   	       success : function(data){
	   	    	   var listcustomers = $(selectctrl);
	   	    	   listcustomers.find('option').remove().end();
	   	           $.each(data, function (index, item) {
	   	        	   listcustomers.append(
	   	               $('<option>', {
	   	            	   value: item.customerId,
	   	            	   text: item.customerName
	   	               }, '<option/>'));
	   	           });
	   	       },
	   	       error: function(error){
	   	    	   $.notify('No se pudo obtener el listado de clientes.', 'error');
	   	       }
		});
	};
	/*Obtiene el IDSDM para asignarlo al control html
	 * */
	var GetIDSDMS = function(inputctrl, profile)
    {
    	$.ajax({ type: "GET",   
 	       url: "../SDMs.do?action=list_sdms&BOEUserName=" + BOEWebApp.GetBOEUserName(),   
 	       success : function(data){
 	    	   $(inputctrl).val(data.IDSDM);
 	    	   $(profile).val(data.SDMProfile);
 	       },
 	       error: function(error){
         	$.notify("No se pudieron obtener los SDMS", "error");
 	       }
    	});
    };
	return {
		DatePickerGral : DatePickerGral,
		DatePickerLAO : DatePickerLAO,
		GetBOEUserName : GetBOEUserName,
		OperationGetIdSDM: OperationGetIdSDM,
		GetCustomerListBySDM: GetCustomerListBySDM,
		GetIDSDMS : GetIDSDMS
	};
}(jQuery, window, document, undefined));