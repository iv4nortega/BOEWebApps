/*
 * @author Ivan Hernández Ortega
 * @create_date 02 de Mayo 2016
 */
var UpCrossSelling = window.UpCrossSelling || {};

UpCrossSelling.App = (function ($, window, document, undefined) {
	/*Var options for notifications plugin*/
	var delIdRecord = null,
	comment_id = null, 
	opportunity_id = null, options = {
		  /* Whether to hide the notification on click*/
		  clickToHide: true,
		  /* Whether to auto-hide the notification*/
		  autoHide: true,
		  /* If autoHide, hide after milliseconds*/
		  autoHideDelay: 8000,
		  /* Show the arrow pointing at the element*/
		  arrowShow: true,
		  /* Arrow size in pixels*/
		  arrowSize: 9,
		  /* Position defines the notification position though uses the defaults below*/
		  position: 'bottom',
		  /* Default positions*/
		  elementPosition: 'bottom left',
		  globalPosition: 'top right',
		  /* Default style*/
		  style: 'bootstrap',
		  /* Show animation*/
		  showAnimation: 'slideDown',
		  /* Show animation duration*/
		  showDuration: 100,
		  /* Hide animation*/
		  hideAnimation: 'slideUp',
		  /* Hide animation duration*/
		  hideDuration: 200,
		  /* Padding between element and notification*/
		  gap: 2
	};
	/*Function that initialize application */
	var Init = function()
	{
		var frame = top.document.getElementsByName('servletBridgeIframe');
    	$(frame).contents().find('.newWindowIcon').hide();
		$(document).ajaxStart(function() {
		    $(".loader").show();
		}).ajaxStop(function() {
			$(".loader").hide();
		});
		/*Add a new style 'foo' for notifications */
		$.notify.addStyle('foo', {
		  html: 
		    "<div>" +
		      "<div class='clearfix'>" +
		        "<div class='title' data-notify-html='title'/>" +
		        "<div class='buttons'>" +
		          "<button class='yes' data-notify-text='button'></button>" +
		          "<button class='no'>Cancelar</button>" +
		        "</div>" +
		      "</div>" +
		    "</div>"
		});
		/*Mask for costo, show 2 decimal numbers*/
		$('#new_record_amount').number( true, 2 );
		/*Mask for probability is is null, include 0*/
		$('#new_record_probability').number( true, 0 );
		/*Show 0 if probability text is empty*/
		$("#new_record_probability").on("blur", function() {
	        var value = ($(this).val() == '') ? $(this).val('0'): $(this).val();
	        $(this).val(value);
	    });
		/*listen for click events from this style*/
		$(document).on('click', '.notifyjs-foo-base .no', function() {
		  /*programmatically trigger propogating hide event*/
			comment_id = null;
	   		opportunity_id = null;
	   		$(this).trigger('notify-hide');
		});
		$(document).on('click', '.notifyjs-foo-base .yes', function() {
		  /*show button text*/
			$.ajax({ 
				type: "POST",
				data: {id: comment_id},
		       	url: "../CommentController.do?action=delete_comment",   
		       	success : function(data){
		       		GetComments(opportunity_id);
		       		comment_id = null;
		       		opportunity_id = null;
		       	},
		     error: function(jqXHR, textStatus, errorThrown){
		    	 	comment_id = null;
		       		opportunity_id = null;
		     		$.notify("Hubo un problema al eliminar el comentario.", "error", options);
		     }
			});
		  /*hide notification*/
		  $(this).trigger('notify-hide');
		});
		/*Mask for date*/
	    $('#new_record_date').inputmask({
			mask: 'y-m-d'
		});
		/*Mask for date start*/
	    $('#new_record_date_start').inputmask({
			mask: 'y-m-d'
		});
	    /*Mask for date end*/
	    $('#new_record_date_end').inputmask({
			mask: 'y-m-d'
		});
		/*Initialize date pickers*/
		DatePickerGral('#new_record_date');
		DatePickerGral('#new_record_date_start');
		DatePickerGral('#new_record_date_end');
	   	/*Close the modal where hide delete record and new record opportunity*/
	   	$('.closemodal').on('click', function(){
	   		$('#modal_delete_record').css('display', 'none');
	           $('#modal_new_record').css('display', 'none');
	           window.location.href = "/BOEWebApps/UpCrossSelling/";
	   	});
	   	/*Confirm delete record modal*/
	   	$('#delete_confirm_record').on('click', function(){
			window.location.href = "../OpportunityController.do?action=delete&IDUpCrossSelling=" + delIdRecord;
			delIdRecord = null;
		});
	   	/*Show modal of new opportunity*/
	  	$('#newRecord').on('click', function(){
	       $('#modal_new_record').css('display', 'block');
	  	});
	  	/*Initialize datatables plugin opportunity ajax*/
	  	var table = $('#opportunitiesTable').DataTable({
		  		ajax: "../OpportunityController?action=list_opportunities",
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
		            { data: "type" },
		            {
		                className:      '',
		                orderable:      false,
		                data:           'IDUpCrossSelling',
		                render: function (data, type, row, meta){
		                	var actions = "<a href='#' onclick='UpCrossSelling.App.UpdateOpportunity(" +row.IDUpCrossSelling+ ")'>"+
		                		"<i class='fa fa-edit'></i> Editar</a> | <a href='#' onclick='UpCrossSelling.App.DeleteOpportunity(" +row.IDUpCrossSelling + 
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
		  	    }
	  		});
	  	/* Validate form by jquery validate plugin*/
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
				new_record_amount: 'Ingrese el costo.',
				new_record_probability: {
					required: 'Ingrese probabilidad.',
					max: '0 a {0}',
					maxlength: 'Número máximo de caracteres es {0}.'
				},
				new_record_date: 'Seleccione una fecha.',
				new_record_description: {
					required: 'Ingrese una descripción.',
					maxlength: 'El número máximo de carácteres para descripción es {0}.'
				}
			}
		});
	  	/*Get details for opportunities
	  	 * and show after of clicked detail icon
	  	 * */
	  	$('#opportunitiesTable tbody').on('click', 'tr td.details-control', function () {
	  		var tr = $(this).closest('tr');
	        var row = table.row( tr );
	        
	        if ( row.child.isShown() ) {
	            /*This row is already open- close it*/
	            row.child.hide();
	            tr.removeClass('shown');
	        }
	        else {
	            /* Open the row*/
	            row.child( format(row.data()) ).show();
	        	/*Get notes of record*/
	            GetComments(row.data().IDUpCrossSelling);
	            tr.addClass('shown');
	        }
	  	});
	  	/*Get list of customers for
	  	 *  select/combobox of modal create opportunity*/
		GetCustomerList();
	};
	/*Create detail information of opportunity table*/
	function format (data) {
	      return '<div class="details-container">'+
	          '<table cellpadding="5" cellspacing="0" border="0" class="details-table">'+
		          '<tr>'+
			          '<td class="title">Fecha tentativa:</td>'+
		              '<td>'+ ((data.timeTentative == null) ? '-': data.timeTentative) +'</td>'+
	                  '<td class="title">Fecha inicial:</td>'+
	                  '<td>'+ ((data.timeStart== null) ? '-' : data.timeStart) +'</td>'+
	                  '<td class="title">Fecha final:</td>'+
		              '<td>'+ ((data.timeEnd== null) ? '-' : data.timeEnd) +'</td>'+
	              '</tr>'+
	              '<tr>'+
	              	'<td class="title" >Descripción:</td>'+
	              	'<td colspan="5">'+ data.description+'</td>'+
	              '</tr>'+
	              '<tr>'+
	              /* Table of comments */
	              	'<td colspan="3">'+
			  			'<p class="title-comments"><i class="fa fa-comments"></i> Comentarios</p> '+
			  			'<a href="#" id="create_comment" onclick="$(\'#div_text_comment\').show();$(\'#text_comment\').focus();"><i class="fa fa-plus"> Agregar comentario</i></a>'+
			  			'<div id="div_text_comment"><textarea id="text_comment" name="text_comment" class="textarea-50" placeholder="Ingresa tu comentario"></textarea>'+
			  			'<a href="#" id="saveComment" onclick="UpCrossSelling.App.CreateComment('+ data.IDUpCrossSelling +',\''+ data.type +'\')"><i class="fa fa-save"> Guardar</i></a></div>'+
			  		'</td>'+
			  	  '</tr>'+
	          '</table>'+
	        '</div>';
	};
	/*Delete record opportunity.*/
	var DeleteOpportunity = function(record){
		$('#modal_delete_record').css('display', 'block');
		delIdRecord = record;
	};
	/*Modify opportunity record */
	var UpdateOpportunity = function(record){
		$.ajax({ type: "GET",   
	       url: "../OpportunityController.do?action=edit&IDUpCrossSelling=" + record,   
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
	    	   $('#modal_new_record').find('#new_record_type_sale').val(data.type);
	       },
	       error: function(error){
	    	   $.notify("Error al obtener el ID.", "error", options);
	       }
	    });
	};
	/* Get customer list for combobox*/
	function GetCustomerList()
	{
		$.ajax({ type: "GET",   
		       url: "../CustomerController.do?action=list_customers",   
		       success : function(data){
		    	   /*if data is not null show customer list in select customers*/
		    	   if(data != null){
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
	    		   }
		    	   else
	    		   $.notify("Ocurrio un error al obtener los clientes", "error", options);
		       },
	        error: function(error){
	        	console.log(error.statusText);
	        	$.notify(error.statusText, "error", options);
	        }
		});
	};
	/*Get customer list ajax*/
	function GetServiceList()
	{
		$.ajax({ type: "GET",   
		       url: "../ServiceController.do?action=list_services",   
		       success : function(data){
		    	   if(data != null)
	    		   {
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
	    		   }
		    	   else
		    	$.notify("Ocurrio un error al obtener la lista de servicios", "error", options);
		       },
	        error: function(error){
	        	$.notify(error.statusText, "error", options);
	        }
		});
	};
	/*Get comments */
	function GetComments(idParentItem)
	{
		$.ajax({ type: "GET",   
		       url: "../CommentController.do?action=list_notes&tableItemId=" + idParentItem,   
		       success : function(data){
		    	   DrawComments(data)
		       },
	        error: function(error){
	        	$.notify("No se pudieron obtener las notas.", "error", options);
	        }
		});
	};
	/*Draw comments */
	function DrawComments(comments)
	{
		$('#records_table').remove();
		var commentshtml =
		'<table id="records_table" cellpadding="5" cellspacing="0" border="0" class="details-table">';
		$(commentshtml).insertAfter($('.details-container').children());
		$.each(comments, function(i, item) {
			var $tr = $('<tr>').append(
		        $('<td colspan="6">').html(item.note + 
		        '&nbsp;<a href="#" id="delete-comment" data-val="'+ item.IDNote +'" onclick="UpCrossSelling.App.DeleteComment('+ 
		        item.IDNote +', '+ item.IDParentItem +');">| '+
		        '<i class="fa fa-trash"></i> Eliminar</a>'+
		        '<br><b>Agregado por: </b><i class="fa fa-user"></i>&nbsp;'+ 
					item.addedBy + '<br>')
		    ).appendTo('#records_table');
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
			var validator = $( "#form_new_record" ).validate();
			validator.element( inputctrl );
		});
	}
	var CreateComment = function(idselling, type)
	{
		var comment_ = $('#text_comment').val();
		var user_boe = GetUserSessionBOE();
		if(comment_ != '')
		{
			$.ajax({ 
				type: "POST",
				data: {parentid: idselling, tableName: type, comment: comment_, useradded: user_boe},
		       	url: "../CommentController.do?action=create_comment",   
		       	success : function(data){
		       		GetComments(idselling);
		       		$('#div_text_comment').hide();
		       		$('#text_comment').val('');
		       	},
		     error: function(jqXHR, textStatus, errorThrown){
		     	$.notify("Hubo un problema al guardar el comentario.", "warn", options);
		     	$('#div_text_comment').hide();
		     	$('#text_comment').val('');
		     }
			});
		}
		else
			$('#text_comment').notify("Es necesario el texto del comentario.", "error", options);
	};
	var DeleteComment = function(id_comment, id_opportunity )
	{
		/*Temps variables*/
		comment_id = id_comment;
		opportunity_id = id_opportunity;
		/*Notification confirm delete comment*/
		$('#delete-comment[data-val="'+ comment_id+'"]').notify({
		  title: "Esta seguro de eliminar el comentario?",
		  button: 'Si'
		}, {
			style: 'foo',
			autoHide: false,
			clickToHide: false
		});
	};
	function GetUserSessionBOE(){
		var frame = top.document.getElementsByName('servletBridgeIframe');
		var fullusername = $(frame).contents().find('.bannerUserName').text().trim();
		if(fullusername == null || fullusername == '')
		{
			fullusername = 'Usuario no registrado';
		}
		return fullusername;
	}
	return {
	        Init: Init,
	        CreateComment: CreateComment,
	        UpdateOpportunity: UpdateOpportunity,
	        DeleteOpportunity:DeleteOpportunity,
	        DeleteComment : DeleteComment
    };
}(jQuery, window, document, undefined));