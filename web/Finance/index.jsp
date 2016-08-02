<%@ page language="java" contentType="text/html; charset=UTF-8" 
	pageEncoding="UTF-8"%>
<%@ page import="java.io.*,java.util.*" %>
<%@ page import="javax.servlet.*,java.text.*" %>
<!DOCTYPE>
<html>
<head>
	<jsp:include page="../commons/header.jsp"/>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<script src="${pageContext.request.contextPath}/content/js/finance.js" type="text/javascript"></script>
	<title>Finance</title>
</head>
<body>
<div class="loader"></div>
<div class="row">
<!--Cliente-->
	<div class="large-4 columns">
		<label>Cliente:</label>
		<select id="finance_customer" name="finance_customer"></select>
		<!-- <input id="autocomplete_customer" name="autocomplete_customer" autocomplete="on"> -->
	</div>
	<div class="large-5 columns">
		<!-- ESPACIO VACIO ENTRE COLUMNA CLIENTE Y PERIODO -->
	</div>
	<!--Periodo-->
	<div class="large-3 columns">
		<label>Periodo:</label>
		<select class="full-width" id="finance_selectperiod" name="finance_selectperiod"></select>
	</div>
</div>
<div class="row">
<!--Cliente-->
	<div class="large-6 columns">
		<label>Tipo:</label>
	    <select class="full-width" id="finance_type" name="finance_type">
	    	<option value="CM">Contrato Mensual</option>
	    	<option value="AC">Acuerdo de Cambios</option>
	    	<option value="PR">Proyectos</option>
	    </select>
	</div>
</div>
<div class="row">
	<div class="large-6 columns">
		<button id="create_new_finance"><i class="fa fa-plus"></i> Nuevo registro</button>
	</div>
</div>
<table id="finance_table" style="width:100%;" class="display">
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
 <div class="modalapp" id="modal_add_finance">
      <div class="modalapp-content">
           <span class="closemodal">x</span>
           <form id="form_finance" name="form_finance"  >
	           	<input type="text" style="display:none" id="financeId" name="financeId" />
	           	<input type="text" style="display:none" id="sdmId" name="sdmId" />
	           	<input type='text' style='display:none' id='timeId' name='timeId'  />
	           	<div class="row">
	           		<h3>Registro de nueva mejora</h3>
	           	</div>
	           	<div class="row">
					<div class="large-6 columns">
						<label>Cliente:</label>
	           			<select id="customer_selected" name="customer_selected" ></select>
					</div>
					<div class="large-6 columns">
						<label>Tipo de registro:</label>
	           			<select id="finance_type_selected" name="finance_type_selected" >
	           				<option value="CM">Contrato Mensual</option>
					    	<option value="AC">Acuerdo de Cambios</option>
					    	<option value="PR">Proyectos</option>
	           			</select>
					</div>
				</div>
				<div class="row">
					<div class="large-12 columns">
						<label>Descripción:</label>
						<textarea maxlength="250" class="textarea-50"  id="finance_description" name="finance_description"></textarea>
					</div>
				</div>
				<div class="row"><div class="large-12 columns"><button id="save_finance">Guardar</button></div></div>
			</form>
      </div>
    </div>
<script>
$(function() {
	Finance.App.Init();
});
</script>
</body>
</html>