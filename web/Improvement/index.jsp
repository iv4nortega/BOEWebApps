<%@ page language="java" contentType="text/html; charset=UTF-8" 
	pageEncoding="UTF-8"%>
<%@ page import="java.io.*,java.util.*" %>
<%@ page import="javax.servlet.*,java.text.*" %>
<!DOCTYPE>
<html>
<head>
	<jsp:include page="../commons/header.jsp"/>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<script src="${pageContext.request.contextPath}/content/js/improvement.js" type="text/javascript"></script>
	<title>Improvements </title>
</head>
<body>
<div class="loader"></div>
<div class="row">
<!--Cliente-->
	<div class="large-4 columns">
		<label>Cliente:</label>
		<select id="select_customer_filter" name="select_customer_filter"></select>
		<!-- <input id="autocomplete_customer" name="autocomplete_customer" autocomplete="on"> -->
	</div>
	<div class="large-5 columns">
		<!-- ESPACIO VACIO ENTRE COLUMNA CLIENTE Y PERIODO -->
	</div>
	<!--Periodo-->
	<div class="large-3 columns">
		<label>Periodo:</label>
		<select class="full-width" id="selectperiod" name="selectperiod"></select>
	</div>
</div>
<div class="row">
<!--Cliente-->
	<div class="large-6 columns">
		<label>Nombre del proceso:</label>
		<select class="full-width" id="selectmetric" name="selectmetric">
			<option value="1">Incident</option>
			<option value="2">Request</option>
		</select>
	    <!-- <select class="full-width" id="selectmetric" name="selectmetric"></select> -->
	</div>
</div>
<div class="row">
	<div class="large-6 columns">
		<button id="new_value"><i class="fa fa-plus"></i> Agregar nuevo valor</button>
	</div>
</div>
<table id="improvement_table" style="width:100%;" class="display">
    <thead>
        <tr>
            <th>Descripción</th>
            <th>Acción</th>
        </tr>
    </thead>
    <tfoot>
        <tr>
            <th>Descripción</th>
            <th>Acción</th>
        </tr>
    </tfoot>
</table>
 <div class="modalapp" id="modal_add_value">
      <div class="modalapp-content">
           <span class="closemodal">x</span>
           <form id="form_operation_top" name="form_operation_top" class="form-default"  >
	           	<input type="text" style="display:none" id="operationId" name="operationId" />
	           	<input type="text" style="display:none" id="sdmId" name="sdmId" />
	           	<input type="text" style="display:none" id="selectcustomer" name="selectcustomer" />
	           	<input type="text" style="display:none" id="processName" name="processName" />
	           	<input type='text' style='display:none' id='timeId' name='timeId'  />
	           	<div class="row">
	           		<h3>Registro de nuevo valor</h3>
	           	</div>
				<div class="row">
					<div class="large-12 columns">
						<label>Descripción:</label>
						<textarea maxlength="250" class="textarea-50"  id="description" name="description"></textarea>
					</div>
				</div>
				<div class="row"><div class="large-12 columns"><button id="save_operation_top">Guardar</button></div></div>
			</form>
      </div>
    </div>
<script>
$(function() {
	Improvement.App.Init();
});
</script>
</body>
</html>