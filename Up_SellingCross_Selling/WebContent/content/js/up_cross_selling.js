/*
 * @author Ivan Hernández Ortega
 */
var delIdRecord = null;
$(document).ajaxStart(function() {
    $(".loader").show();
}).ajaxStop(function() {
	//setTimeout(function () {
	    $(".loader").hide();
    //}, 1000);
});
$(document).ready(function() {
	GetCustomerList();
	/*MASK FOR COSTO*/
	$('#new_record_amount').number( true, 2 );
	/*MASK FOR PROBABILITY*/
	$('#new_record_probability').number( true, 0 );
	$("#new_record_probability").on("blur", function() {
        var value = $(this).val().length == 1 ? $(this).val() + '%' : $(this).val();
        $(this).val( value );
    })
	/*MASK FOR DATE*/
    $('#new_record_date').inputmask({
		mask: 'y-m-d'
	});
	/*MASK FOR DATE START*/
    $('#new_record_date_start').inputmask({
		mask: 'y-m-d'
	});
    /*MASK FOR DATE END*/
    $('#new_record_date_end').inputmask({
		mask: 'y-m-d'
	});
	/*INIT DATEPICKER*/
	DatePickerGral('#new_record_date');
	DatePickerGral('#new_record_date_start');
	DatePickerGral('#new_record_date_end');
   	/*CLOSE MODAL*/
   	$('.closemodal').on('click', function(){
   		$('#modal_delete_record').css('display', 'none');
           $('#modal_new_record').css('display', 'none');
           window.location.href = "/Up_SellingCross_Selling";
   	});
   	/*DELETE CONFIRMATION*/
   	$('#delete_confirm_record').on('click', function(){
		window.location.href = "OpportunityController.do?action=delete&IDUpCrossSelling=" + delIdRecord;
		delIdRecord = null;
	});
   	/*MODAL NEW RECORD*/
  	$('#newRecord').on('click', function(){
       $('#modal_new_record').css('display', 'block');
  	});
  	/*INICIALIZA DATATABLES*/
  	var table = $('#opportunitiesTable').DataTable({
	  		ajax: "OpportunityController?action=list_opportunities",
	        columns: [
	            {
	                className:      'details-control',
	                orderable:      false,
	                data:           null,
	                defaultContent: '',
	            },
	            { data: "customerName"},
	            { data: "serviceName" },
	            { data: "cost",
	            	render: function (data, type, row) {
	                return formatMoney(data, '$');
	            }},
	            { data: "probability",
	            	render: function (data, type, row) {
		                return data + '%';
		        }},
	            { data: "IDTimeStart" },
	            {
	                className:      '',
	                orderable:      false,
	                data:           'IDUpCrossSelling',
	                render: function (data, type, row, meta){
	                	var actions = "<a href='#' onclick='EditOpportunity(" +row.IDUpCrossSelling+ ")'>"+
	                		"<i class='fa fa-edit'></i> Editar</a> | <a href='#' onclick='DeleteOpportunity(" +row.IDUpCrossSelling + 
	                		")'><i class='fa fa-trash'></i> Eliminar</a>";
	                	return actions;
	                },
	            },
	        ],
	  		select: true, 
	  		ordering: true,
	  		 
	  	    language : {
	  	      emptyTable     : 'No existen registros.',
	  	      zeroRecords    : 'No se encontraron resultados.',
	  	      thousands      : ',',
	  	      decimal      	 : ',',
	  	      processing     : 'Procesando...',
	  	      loadingRecords : 'Cargando...',
	  	      info           : 'Página _PAGE_ de _PAGES_',
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
	  	    }
  		});
  	$('#opportunitiesTable tbody').on('click', 'tr td.details-control', function () {
  		var tr = $(this).closest('tr');
        var row = table.row( tr );
 
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child( format(row.data()) ).show();
            tr.addClass('shown');
        }
  	});
  	/*VALIDATION OF FORM BY JQUERY VALIDATE*/
  	$('#form_new_record').validate({
		rules : {
			new_record_amount: 'required',
			new_record_probability: {
				required : true,
				max: 100,
				maxlength: 3
			},
			new_record_date: {
				required: true,
				date: true
			},
			new_record_description: {
				required: true,
				maxlength: 512
			}
		},
		messages:{
			new_record_amount: 'Ingrese el costo',
			new_record_probability: {
				required: 'Ingrese probabilidad',
				max: '0 a {0}',
				maxlength: 'Número máximo de caracteres es {0}'
			},
			new_record_date: 'Seleccione una fecha',
			new_record_description: {
				required: 'Ingrese una descripción',
				maxlength: 'El número máximo de carácteres para descripción es {0}'
			}
		}
	});
});
function format (data) {
      return '<div class="details-container">'+
          '<table cellpadding="5" cellspacing="0" border="0" class="details-table">'+
	          '<tr>'+
                  '<td class="title">Fecha inicial:</td>'+
                  '<td>'+ ((data.timeStart== null) ? '-' : data.timeStart) +'</td>'+
              '</tr>'+
              '<tr>'+
	              '<td class="title">Fecha final:</td>'+
	              '<td>'+ ((data.timeEnd== null) ? '-' : data.timeEnd) +'</td>'+
              '</tr>'+
              '<tr>'+
                  '<td class="title">Fecha tentativa:</td>'+
                  '<td>'+ ((data.timeTentative == null) ? '-': data.timeTentative) +'</td>'+
              '</tr>'+
              '<tr>'+
              	'<td class="title">Descripción:</td>'+
              	'<td>'+ data.description+'</td>'+
            '</tr>'+
          '</table>'+
        '</div>';
  };
/*DELETE THE OPPORTUNITY*/
function DeleteOpportunity(record){
	$('#modal_delete_record').css('display', 'block');
	delIdRecord = record;
};
/*EDIT THE OPPOTUNITY*/
function EditOpportunity(record){
	$.ajax({ type: "GET",   
       url: "OpportunityController.do?action=edit&IDUpCrossSelling=" + record,   
       success : function(data){
    	   $('#modal_new_record').css('display', 'block');
    	   $('#date_record_end').css('display', 'block');
    	   $('#date_record_start').css('display', 'block');
    	   $('#modal_new_record').find('#new_record_id').val(data.IDUpCrossSelling);
    	   $('#modal_new_record').find('#new_record_customer').val(data.IDCustomer);
    	   $('#modal_new_record').find('#new_record_service').val(data.IDService);
    	   $('#modal_new_record').find('#new_record_amount').val(data.cost);
    	   $('#modal_new_record').find('#new_record_probability').val(data.probability);
    	   $('#modal_new_record').find('#new_record_date').val(data.IDTimeTentative);
    	   $('#modal_new_record').find('#new_record_date_start').val(data.IDTimeStart);
    	   $('#modal_new_record').find('#new_record_date_end').val(data.IDTimeEnd);
    	   $('#modal_new_record').find('#new_record_description').val(data.description);
       },
       error: function(error){
    	   console.debug(error);
       }
    });
};
/*GET CUSTOMER LIST*/
function GetCustomerList()
{
	$.ajax({ type: "GET",   
	       url: "OpportunityController.do?action=list_customers",   
	       success : function(data){
	    	   var listcustomers = $('#new_record_customer');
	    	   listcustomers.find('option').remove().end();
	            $.each(data, function (index, item) {
	            	listcustomers.append(
	                $('<option>', {
	                    value: item.customerId,
	                    text: item.customerName
	                }, '<option/>'));
	            });
	            listcustomers.val(listcustomers);
	            //Carga los servicios
	        	GetServiceList();
	       },
        error: function(error){
     	   console.debug(error);
        }
	});
};
/*GET CUSTOMER LIST*/
function GetServiceList()
{
	$.ajax({ type: "GET",   
	       url: "OpportunityController.do?action=list_services",   
	       success : function(data){
	    	   var listservices = $('#new_record_service');
	    	   listservices.find('option').remove().end();
	            $.each(data, function (index, item) {
	            	listservices.append(
	                $('<option>', {
	                    value: item.serviceId,
	                    text: item.serviceName
	                }, '<option/>'));
	            });
	            listservices.val(listservices);
	       },
        error: function(error){
     	   console.debug(error);
        }
	});
};
/*FORMAT NUMBERS TYPE MONEY*/
function formatMoney(n, currency) {
	var money = parseFloat(n).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    return currency + money;
}
/*GENERAL DATEPICKER OPTIONS*/
function DatePickerGral(inputctrl)
{
	$(inputctrl).datepicker({ 
		dateFormat: 'yy-mm-dd',
		autoclose: true,
		language: 'es',
		showAnim: 'slideDown',
	}).on('change', function(e){
		//console.debug(e);
	});
}