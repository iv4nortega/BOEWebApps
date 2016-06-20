/* INITIALIZE LAO.js 
 * PUBLIC API
 * @author : Iván Hernández Ortega
 * @create date : 06 de Junio 2016
*/
var BOEWebApp = window.BOEWebApp || {};

// Módulo de inicialización y funciones genéricas
BOEWebApp = (function ($, window, document, undefined) {
	
	var userunregistered = 'Usuario no registrado';
	
	var GetBOEUserName = function(){
		var frame = top.document.getElementsByName('servletBridgeIframe');
		var fullusername = $(frame).contents().find('.bannerUserName').text().trim();
		
		if(fullusername == null || fullusername == '')
		{
			fullusername = userunregistered;
		}
		return fullusername;
	};
	var OperationGetIdSDM = function()
    {
    	$.ajax({ type: "GET",   
 	       url: "../SDMs.do?action=list_sdms&BOEUserName=" + BOEWebApp.GetBOEUserName(),   
 	       success : function(data){
 	    	   if(data.SDMProfile != 'VIP' || data.IDSDM == 0){
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
    /*GENERAL DATEPICKER OPTIONS*/
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
	}
	return {
		DatePickerGral : DatePickerGral,
		GetBOEUserName : GetBOEUserName,
		OperationGetIdSDM: OperationGetIdSDM
	};
}(jQuery, window, document, undefined));