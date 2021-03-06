/* INITIALIZE LAO.js 
 * PUBLIC API
 * @author : Iván Hernández Ortega
 * @create date : 06 de Mayo 2016
 * @last update : 09 de Junio 2016
*/
var lao = window.lao || {};

// Módulo de inicialización y funciones genéricas
lao.app = (function ($, window, document, undefined) {
	//Variables
	var ajaxTable, uuids = null,
	userunregistered = 'Usuario no registrado',
	idlao = null;
	
    //Inicialización de módulo
    var InitializeApplication = function () 
    {
    	/*OBTIENE EL LISTADO DE CLIENTES MEDIANTE AJAX*/
    	BOEWebApp.GetCustomerListBySDM('#selectcustomer');
    	var bridgeframe = top.document.getElementsByName('servletBridgeIframe');
    	$(bridgeframe).contents().find('.newWindowIcon').hide();
    	BOEWebApp.GetIDSDMS('#lao_idSDM', '#sdmProfile');
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
		       	url: "../Comments.do?action=delete_comment",   
		       	success : function(data){
		       		GetComments(idlao);
		       		comment_id = null;
		       		idlao = null;
		       	},
		     error: function(jqXHR, textStatus, errorThrown){
		    	 	comment_id = null;
		       		idlao = null;
		     		$.notify("Hubo un problema al eliminar el comentario.", "error");
		     }
			});
		  /*hide notification*/
		  $(this).trigger('notify-hide');
		});
    	var userBOE = BOEWebApp.GetBOEUserName();
    	$('#UserLogin').val(userBOE);
    	if(userBOE == userunregistered){
    		$('#newRecord').hide();
    		$.notify('El usuario no tiene permisos para agregar nuevas acciones y observaciones.', 
    				'warn');
    	};
    	$('.newWindowIcon').hide();
    	
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
        BOEWebApp.DatePickerLAO('#form_create_lao', '#date_planned', '#selectstatus');
        BOEWebApp.DatePickerLAO('#form_create_lao', '#date_real', '#selectstatus');
        BOEWebApp.DatePickerLAO('#form_create_lao', '#date_close', '#selectstatus');
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
    		ajax: "../LAOStadistics?action=list_lao&UserLogin="+ BOEWebApp.GetBOEUserName(),
    	    columns: [
    			{
	                className:      'details-control',
	                orderable:      false,
	                data:           null,
	                defaultContent: '',
	                width: "3%"
	            },
    	        { data: "IDLAO", width: "5%", visible: false},
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
            		$('td', row).eq(6).addClass('defeated_status');
            		$('td', row).eq(6).text("Vencido");
                    return data;
        		}
    	    	if(data.status == "2"){
            		$('td', row).eq(6).addClass('reopen_status');
            		$('td', row).eq(6).text("Reabierto");
                    return data;
        		}
    	    	if(data.status == "3"){
            		$('td', row).eq(6).addClass('inprogress_status');
            		$('td', row).eq(6).text("En progreso");
                    return data;
        		}
    	    	if(data.status == "4"){
            		$('td', row).eq(6).addClass('solved_status');
            		$('td', row).eq(6).text("Solucionado");
                    return data;
        		}
    	    	if(data.status == "5"){
            		$('td', row).eq(6).addClass('close_status');
            		$('td', row).eq(6).text("Cerrado");
                    return data;
        		}
    	    }
    	});
    	/*CLOSE MODAL*/
    	$('.closemodal').on('click', function(){
       		$('#laoModal_delete').css('display', 'none');
            $('#laoModal').css('display', 'none');
            table.ajax.reload();   
            //window.location.href = "/BOEWebApps/LAO";
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
    		if(tableData != undefined){
			    $('#laoModal').css('display', 'block');
			 	$('#laoModal').find('#lao_id').val(tableData.IDLAO);
			 	//$('#laoModal').find('#lao_date').val(tableData.detectionDate);
			 	$('#laoModal').find('#selectcustomer').val(tableData.IDCustomer);
		     	$('#laoModal').find('#date_planned').val(tableData.plannedDate).mouseover();
		     	$('#laoModal').find('#date_real').val(tableData.realDate).mouseover();
		     	$('#laoModal').find('#date_close').val(tableData.closeDate).mouseover();
		     	$('#laoModal').find('#subject').val(tableData.subject);
		     	$('#laoModal').find('#comments').val(tableData.comments);
		     	$('#laoModal').find('#selectstatus').val(tableData.status);
		     	$('#laoModal').find('#lao_idSDM').val(tableData.IDSDM);
	    		ChangeStatusDefault(tableData.status);
    		}
    	} );
    	/* Validate form by jquery validate plugin*/
	  	$('#form_create_lao').validate({
			rules : {
				date_planned: {
					required: true
				},
				subject: {
					required: true,
					maxlength: 150				
				}//,
//				comments: {
//					required: true,
//					maxlength: 512
//				}
			},
			messages:{
				date_planned: { required: 'Ingrese la fecha planeada.'},
				subject: {
					required: 'Ingrese un asunto.',
					maxlength: 'Número máximo de caracteres es {0}.'
				}//,
//				comments: {
//					required: 'Ingrese una nota.',
//					maxlength: 'Número máximo de caracteres es {0}.'
//				}
			}
		});
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
		var user_boe = BOEWebApp.GetBOEUserName();
		if(comment_ != '')
		{
			$.ajax({ 
				type: "POST",
				data: {parentid: idselling, tableName: 'LAO', comment: comment_, useradded: user_boe},
		       	url: "../Comments.do?action=create_comment",   
		       	success : function(data){
		       		GetComments(idselling);
		       		$('#div_text_comment').hide();
		       		$('#text_comment').val('');
		       	},
		     error: function(jqXHR, textStatus, errorThrown){
		     	$.notify("Hubo un problema al guardar el comentario.", "warn");
		     	$('#div_text_comment').hide();
		     	$('#text_comment').val('');
		     }
			});
		}
		else
			$('#text_comment').notify("Es necesario el texto del comentario.", "error");
	};
    /*Get comments */
	function GetComments(idParentItem)
	{
		$.ajax({ type: "GET",   
		       url: "../Comments.do?action=list_notes&tableItemId=" + idParentItem,   
		       success : function(data){
		    	   DrawComments(data)
		       },
	        error: function(error){
	        	$.notify("No se pudieron obtener las notas.", "error");
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
	function format (data) {
		var profileuser = $('#sdmProfile').val();
		var userregister = (profileuser == 'VIP') ? '<td colspan="3"><b> Registrado por:</b> ' + data.SDMShortName +  '</td>': '';
	      return '<div class="details-container">'+
	          '<table cellpadding="5" cellspacing="0" border="0" class="details-table">' +
	          	  '<tr>' +
	          		 userregister  +
	          		 '</tr>' +
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
	       url: "../LAOStadistics.do?action=edit&IDLAO=" + laoId,   
	       success : function(data){
	    	   	$('#laoModal').css('display', 'block');
			 	$('#laoModal').find('#lao_id').val(data.IDLAO);
			 	//$('#laoModal').find('#lao_date').val(data.IDDetectionTime);
			 	$('#laoModal').find('#selectcustomer').val(data.IDCustomer);
		     	$('#laoModal').find('#date_planned').val(data.IDPlannedTime).mouseover();
		     	$('#laoModal').find('#date_real').val(data.IDRealTime).mouseover();
		     	$('#laoModal').find('#date_close').val(data.IDCloseTime).mouseover();
		     	$('#laoModal').find('#subject').val(data.subject);
		     	$('#laoModal').find('#comments').val(data.comments);
		     	$('#laoModal').find('#selectstatus').val(data.status);
		     	$('#laoModal').find('#lao_idSDM').val(data.IDSDM);
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