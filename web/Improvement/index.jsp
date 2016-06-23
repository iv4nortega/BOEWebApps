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
		<select id="improvement_customer" name="improvement_customer"></select>
		<!-- <input id="autocomplete_customer" name="autocomplete_customer" autocomplete="on"> -->
	</div>
	<div class="large-5 columns">
		<!-- ESPACIO VACIO ENTRE COLUMNA CLIENTE Y PERIODO -->
	</div>
	<!--Periodo-->
	<div class="large-3 columns">
		<label>Periodo:</label>
		<select class="full-width" id="improvement_selectperiod" name="improvement_selectperiod"></select>
	</div>
</div>
<div class="row">
<!--Cliente-->
	<div class="large-6 columns">
		<label>Tipo:</label>
	    <select class="full-width" id=improvement_select name="improvement_select"></select>
	</div>
</div>
<div class="row">
	<div class="large-6 columns">
		<button id="create_new_improvement"><i class="fa fa-plus"></i> Agregar nueva mejora</button>
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
 <div class="modalapp" id="modal_add_improvement">
      <div class="modalapp-content">
           <span class="closemodal">x</span>
           <form id="form_improvement" name="form_improvement"  >
	           	<input type="text" style="display:none" id="improvementId" name="improvementId" />
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
	           			<select id="improvement_selected" name="improvement_selected" ></select>
					</div>
				</div>
				<div class="row">
					<div class="large-12 columns">
						<label>Descripción:</label>
						<textarea maxlength="250" class="textarea-50"  id="improvement_description" name="improvement_description"></textarea>
					</div>
				</div>
				<div class="row"><div class="large-12 columns"><button id="save_improvement">Guardar</button></div></div>
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