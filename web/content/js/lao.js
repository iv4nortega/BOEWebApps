/* INITIALIZE LAO.js 
 * PUBLIC API
 * @author : Iván Hernández Ortega
 * @create date : 06 de Mayo 2016
*/
var lao = window.lao || {};

// Módulo de inicialización y funciones genéricas
lao.app = (function ($, window, document, undefined) {
	/*OBTIENE EL LISTADO DE CLIENTES MEDIANTE AJAX*/
	GetCustomerList();
	//Variables
	var ajaxTable, uuids = null,
	userunregistered = 'Usuario no registrado',
	idlao = null;
	
    //Inicialización de módulo
    var InitializeApplication = function () 
    {
    	var bridgeframe = top.document.getElementsByName('servletBridgeIframe');
    	$(bridgeframe).contents().find('.newWindowIcon').hide();
    	$(document).ajaxStart(function() {
		    $(".loader").show();
		}).ajaxStop(function() {
			$(".loader").hide();
		});
    	ChangeStatusDefault(3);
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
		/*listen for click events from this style*/
		$(document).on('click', '.notifyjs-foo-base .no', function() {
		  /*programmatically trigger propogating hide event*/
			comment_id = null;
	   		idlao = null;
	   		$(this).trigger('notify-hide');
		});
		$(document).on('click', '.notifyjs-foo-base .yes', function() {
		  /*show button text*/
			$.ajax({ 
				type: "POST",
				data: {id: comment_id},
		       	url: "../CommentController.do?action=delete_comment",   
		       	success : function(data){
		       		GetComments(idlao);
		       		comment_id = null;
		       		idlao = null;
		       	},
		     error: function(jqXHR, textStatus, errorThrown){
		    	 	comment_id = null;
		       		idlao = null;
		     		$.notify("Hubo un problema al eliminar el comentario.", "error", options);
		     }
			});
		  /*hide notification*/
		  $(this).trigger('notify-hide');
		});
    	var userBOE = GetUserSessionBOE();
    	$('#UserLogin').val(userBOE);
    	if(userBOE == userunregistered){
    		$('#newRecord').hide();
    		$.notify('El usuario no tiene permisos para agregar nuevas acciones y observaciones.', 
    				'warn');
    	};
    	$('.newWindowIcon').hide();
    	/*CLOSE MODAL*/
    	$('.closemodal').on('click', function(){
       		$('#laoModal_delete').css('display', 'none');
            $('#laoModal').css('display', 'none');
               window.location.href = "/BOEWebApps/LAO";
       	});
    	/*MASK FOR DATE*/
        $('#date_planned').inputmask({
    		mask: 'y-m-d'
    	});
    	/*MASK FOR DATE START*/
        $('#date_real').inputmask({
    		mask: 'y-m-d'
    	});
        /*MASK FOR DATE END*/
        $('#date_close').inputmask({
    		mask: 'y-m-d'
    	});
        /*INIT DATEPICKER*/
    	DatePickerGral('#date_planned');
    	DatePickerGral('#date_real');
    	DatePickerGral('#date_close');
    	/*OBTIENE LA LISTA DE ACTIVIDADES*/
    	var table = $('#lao_table').DataTable({
    		select: true, 
    		ordering: true,
    		order: [8, 'asc'],
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
    		ajax: "../LAOController?action=list_lao&UserLogin="+ GetUserSessionBOE(),
    	    columns: [
    			{
	                className:      'details-control',
	                orderable:      false,
	                data:           null,
	                defaultContent: '',
	                width: "3%"
	            },
    	        { data: "IDLAO", width: "5%", visible: false},
    	        { data: "SDMShortName", width: "17%" },
    	        { data: "customerName",width: "10%" },
    	        { data: "plannedDate", width: "10%"},
    	        { data: "realDate", width: "10%" },
    	        { data: "closeDate", width: "10%" },
    	        { data: "subject",width: "20%" },
    	        { data: "status",width: "10%" },
    	        {
	                className:      '',
	                width: "8%",
	                orderable:      false,
	                data:           'IDLAO',
	                render: function (data, type, row, meta){
	                	var actions = "<a href='#' onclick='lao.app.UpdateLAO(" +row.IDLAO+ ")'>"+
	                		"<i class='fa fa-edit'></i> Editar</a>";
	                	// | <a href='#' onclick='lao.app.DeleteLAO(" +row.IDLAO + 
	                	//	")'><i class='fa fa-trash'></i> Eliminar</a>";
	                	return actions;
	                },
	            },
    	    ],
    	    createdRow: function(row, data, index){
    	    	if(data.status == "1"){
            		$('td', row).eq(7).addClass('defeated_status');
            		$('td', row).eq(7).text("Vencido");
                    return data;
        		}
    	    	if(data.status == "2"){
            		$('td', row).eq(7).addClass('reopen_status');
            		$('td', row).eq(7).text("Reabierto");
                    return data;
        		}
    	    	if(data.status == "3"){
            		$('td', row).eq(7).addClass('inprogress_status');
            		$('td', row).eq(7).text("En progreso");
                    return data;
        		}
    	    	if(data.status == "4"){
            		$('td', row).eq(7).addClass('solved_status');
            		$('td', row).eq(7).text("Solucionado");
                    return data;
        		}
    	    	if(data.status == "5"){
            		$('td', row).eq(7).addClass('close_status');
            		$('td', row).eq(7).text("Cerrado");
                    return data;
        		}
    	    }
    	});
    	$('#lao_table tbody').on('click', 'tr td.details-control', function () {
      		var tr = $(this).closest('tr');
            var row = table.row( tr );
            if ( row.child.isShown() ) {
                // This row is already open - close it
                row.child.hide();
                tr.removeClass('shown');
            }
            else {
                // Open this row
                row.child( format(row.data())).show();
                /*Get notes of record*/
	            GetComments(row.data().IDLAO);
                tr.addClass('shown');
            }
      	});
    	$('#newRecord').on('click', function(){
    		$('#laoModal').css('display', 'block');
    	});
    	$('#lao_table tbody').on( 'dblclick', 'tr', function () {
    		var tableData = table.row(this).data();
		    $('#laoModal').css('display', 'block');
		 	$('#laoModal').find('#lao_id').val(tableData.IDLAO);
		 	//$('#laoModal').find('#lao_date').val(tableData.detectionDate);
		 	$('#laoModal').find('#selectcustomer').val(tableData.IDCustomer);
	     	$('#laoModal').find('#date_planned').val(tableData.plannedDate);
	     	$('#laoModal').find('#date_real').val(tableData.realDate);
	     	$('#laoModal').find('#date_close').val(tableData.closeDate);
	     	$('#laoModal').find('#subject').val(tableData.subject);
	     	$('#laoModal').find('#comments').val(tableData.comments);
	     	$('#laoModal').find('#selectstatus').val(tableData.status);
    		ChangeStatusDefault(tableData.status);
    	} );
    	/* Validate form by jquery validate plugin*/
	  	$('#form_create_lao').validate({
			rules : {
				date_planned: {
					required: true,
					date: true
				},
				subject: {
					required: true,
					maxlength: 512
				},
				comments: {
					required: true,
					maxlength: 512
				}
			},
			messages:{
				date_planned: 'Ingrese la fecha planeada.',
				subject: {
					required: 'Ingrese un asunto.',
					maxlength: 'Número máximo de caracteres es {0}.'
				},
				comments: {
					required: 'Ingrese una nota.',
					maxlength: 'Número máximo de caracteres es {0}.'
				}
			}
		});
    	/*Obtiene un listado de SDMs*/
    	setTimeout(GetSDMS, 500);
    };
    var DeleteComment = function(id_comment, id_lao )
	{
		/*Temps variables*/
		comment_id = id_comment;
		idlao = id_lao;
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
	var CreateComment = function(idselling)
	{
		var comment_ = $('#text_comment').val();
		var user_boe = GetUserSessionBOE();
		if(comment_ != '')
		{
			$.ajax({ 
				type: "POST",
				data: {parentid: idselling, tableName: 'LAO', comment: comment_, useradded: user_boe},
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
    /*GET CUSTOMER LIST*/
    function GetCustomerList()
    {
    	$.ajax({ type: "GET",   
    	       url: "../CustomerController.do?action=list_customers",   
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
            	$.notify("No se pudo obtener el listado de clientes.", "error");
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
		        '&nbsp;<a href="#" id="delete-comment" data-val="'+ item.IDNote +'" onclick="lao.app.DeleteComment('+ 
		        item.IDNote +', '+ item.IDParentItem +');">| '+
		        '<i class="fa fa-trash"></i> Eliminar</a>'+
		        '<br><b>Agregado por: </b><i class="fa fa-user"></i>&nbsp;'+ 
					item.addedBy + '<br>')
		    ).appendTo('#records_table');
		});
	};
    function GetSDMS()
    {
    	$.ajax({ type: "GET",   
 	       url: "../LAOController.do?action=list_sdms&UserLogin=" + GetUserSessionBOE(),   
 	       success : function(data){
 	    	   $('#lao_idSDM').val(data.IDSDM);
 	    	   if(data.SDMProfile != 'VIP'){
 	    		  $('#lao_table td:nth-child(2)').hide();
 	    		  $('#lao_table th:nth-child(2)').hide();
    		   }
 	       },
         error: function(error){
         	$.notify("No se pudieron obtener las notas.", "error");
         }
 	});
    }
	function format (data) {
	      return '<div class="details-container">'+
	          '<table cellpadding="5" cellspacing="0" border="0" class="details-table">'+
		          '<tr>'+
	                  '<td class="title">Fecha:</td>'+
	                  '<td>'+ ((data.detectionDate == null) ? '-' : data.detectionDate) +'</td>'+
	              '</tr>'+
	              '<tr>'+
		              '<td class="title">Notas:</td>'+
		              '<td>'+ ((data.comments== null) ? '-' : data.comments) +'</td>'+
	              '</tr>'+
	              '<tr>'+
	              /* Table of comments */
	              	'<td colspan="3">'+
			  			'<p class="title-comments"><i class="fa fa-comments"></i> Comentarios</p> '+
			  			'<a href="#" id="create_comment" onclick="$(\'#div_text_comment\').show();$(\'#text_comment\').focus();"><i class="fa fa-plus"> Agregar comentario</i></a>'+
			  			'<div id="div_text_comment"><textarea id="text_comment" name="text_comment" class="textarea-50" placeholder="Ingresa tu comentario"></textarea>'+
			  			'<a href="#" id="saveComment" onclick="lao.app.CreateComment('+ data.IDLAO +')"><i class="fa fa-save"> Guardar</i></a></div>'+
			  		'</td>'+
			  	  '</tr>'+
	          '</table>'+
	        '</div>';
	};
	/*GENERAL DATEPICKER OPTIONS*/
	function DatePickerGral(inputctrl)
	{
		$(inputctrl).datepicker({ 
			dateFormat: 'yy-mm-dd',
			autoclose: true,
			language: 'es',
			showAnim: 'slideDown',
		}).on('change', function(e){
			var validator = $( "#form_create_lao" ).validate();
			validator.element( inputctrl );
			
			plannedDate = $('#date_planned').val().split('-');
			realDate = $('#date_real').val().split('-');
			closeDate = $('#date_close').val().split('-');
		    datenow = $('#lao_date').val().split('-');
		    if (new Date(plannedDate[0], plannedDate[1], plannedDate[2]) <
		    new Date(datenow[0], datenow[1], datenow[2])) {
		    	$('#selectstatus').val(1);
		    	$('#selectstatus').css('background-color', '#e20074');
		    	$('#selectstatus').css('color', '#fff');
		    }
		    if (new Date(plannedDate[0], plannedDate[1], plannedDate[2]) >=
				    new Date(datenow[0], datenow[1], datenow[2]))
	    	{
		    	$('#selectstatus').val(3);
		    	$('#selectstatus').css('background-color', '#66ccff');
		    	$('#selectstatus').css('color', '#fff');
	    	}if(new Date(realDate[0], realDate[1], realDate[2]) <
	    		    new Date(datenow[0], datenow[1], datenow[2])){
	    		$('#selectstatus').val(4);
		    	$('#selectstatus').css('background-color', '#4CAF50');
		    	$('#selectstatus').css('color', '#fff');
    		}if(new Date(closeDate[0], closeDate[1], closeDate[2]) <
	    		    new Date(datenow[0], datenow[1], datenow[2])){
	    		$('#selectstatus').val(5);
		    	$('#selectstatus').css('background-color', '#000');
		    	$('#selectstatus').css('color', '#fff');
    		}
		});
	}
	function GetUserSessionBOE(){
		var frame = top.document.getElementsByName('servletBridgeIframe');
		var fullusername = $(frame).contents().find('.bannerUserName').text().trim();
		//fullusername = 'IVAN HERNANDEZ ORTEGA';
		if(fullusername == null || fullusername == '')
		{
			fullusername = userunregistered;
		}
		return fullusername;
	}
	function ChangeStatusDefault(status){
		var select_status = $('#selectstatus');
    	if(status == 1){
    		select_status.css('background-color', '#e20074');
    		select_status.css('color', '#fff');
		}
    	else if(status == 2){
    		select_status.css('background-color', '#a75454');
    		select_status.css('color', '#fff');
    	}
    	else if(status == 3){
    		select_status.css('background-color', '#66ccff');
    		select_status.css('color', '#fff');
    	}else if(status == 4){
    		select_status.css('background-color', '#4CAF50');
    		select_status.css('color', '#fff');
    	}else if(status == 5){
    		select_status.css('background-color', '#000');
    		select_status.css('color', '#fff');
    	}
	};
	var UpdateLAO = function(laoId)
	{
		$.ajax({ type: "GET",   
	       url: "../LAOController.do?action=edit&IDLAO=" + laoId,   
	       success : function(data){
	    	   	$('#laoModal').css('display', 'block');
			 	$('#laoModal').find('#lao_id').val(data.IDLAO);
			 	//$('#laoModal').find('#lao_date').val(data.IDDetectionTime);
			 	$('#laoModal').find('#selectcustomer').val(data.IDCustomer);
		     	$('#laoModal').find('#date_planned').val(data.IDPlannedTime);
		     	$('#laoModal').find('#date_real').val(data.IDRealTime);
		     	$('#laoModal').find('#date_close').val(data.IDCloseTime);
		     	$('#laoModal').find('#subject').val(data.subject);
		     	$('#laoModal').find('#comments').val(data.comments);
		     	$('#laoModal').find('#selectstatus').val(data.status);
	   			ChangeStatusDefault(data.status);
	       },
	       error: function(error){
	    	   $.notify("Error al obtener el ID.", "error");
	       }
		});
	};
    return {
        InitializeApplication: InitializeApplication,
        CreateComment : CreateComment,
        DeleteComment : DeleteComment,
        UpdateLAO : UpdateLAO
    };
}(jQuery, window, document, undefined));