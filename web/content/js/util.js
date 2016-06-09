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
		fullusername = 'LUIS MIGUEL LOPEZ MONTES DE OCA';
		if(fullusername == null || fullusername == '')
		{
			fullusername = userunregistered;
		}
		return fullusername;
	};
	var OperationGetIdSDM = function()
    {
    	$.ajax({ type: "GET",   
 	       url: "../SDMController.do?action=list_sdms&BOEUserName=" + BOEWebApp.GetBOEUserName(),   
 	       success : function(data){
 	    	   if(data.SDMProfile != 'VIP' || data.IDSDM == 0){
 	    		  $.notify("No esta dado de alta", "warn");
    		   }else{
    			   /*Obtiene el ID del cliente para dibujar la tabla de operaciones*/
    			   SDM.App.GetCustomerList(data.IDSDM);
    		   }
 	       },
         error: function(error){
         		$.notify("No se pudieron obtener los SDM.", "error");
         	}
    	});
    };
	return {
		GetBOEUserName : GetBOEUserName,
		OperationGetIdSDM: OperationGetIdSDM
	};
}(jQuery, window, document, undefined));