<%@ page language="java" contentType="text/html; charset=UTF-8" 
	pageEncoding="UTF-8"%>
<!DOCTYPE>
<html>
<head>
	<jsp:include page="../commons/header.jsp"/>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<script src="${pageContext.request.contextPath}/content/js/sdm.js" type="text/javascript"></script>
	<title>Métricas por usuario SDM </title>
</head>
<body>
<div class="loader"></div>
<div class="row">
<!--Cliente-->
	<div class="large-4 columns">
		<label>Cliente:</label>
		<input id="autocomplete_customer" name="autocomplete_customer" autocomplete="on">
	</div>
	<div class="large-5 columns">
		<!-- ESPACIO VACIO ENTRE COLUMNA CLIENTE Y PERIODO -->
	</div>
	<!--Periodo-->
	<div class="large-3 columns">
		<label>Periodo:</label>
		<select class="full-width" id="selectstatus" name="selectstatus">
			<option value="1">2016 - Q1</option>
		</select>
	</div>
</div>
<div class="row">
<!--Cliente-->
	<div class="large-6 columns">
		<label>Métrica:</label>
		<select class="full-width" id="selectstatus" name="selectstatus">
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
<table id="metrics_sdm" style="width:100%;" class="display">
    <thead>
        <tr>
            <th>Descripción</th>
            <th>Valor</th>
        </tr>
    </thead>
    <tfoot>
        <tr>
            <th>Descripción</th>
            <th>Valor</th>
        </tr>
    </tfoot>
</table>
 <div class="modalapp" id="modal_add_value">
      <div class="modalapp-content">
           <span class="closemodal">x</span>
           <form id="form_operation_top" name="form_operation_top" class="form-default">
	           <input type="text" style="display:none" id="operationId" name="operationId" />
	           <input type="text" style="display:none" id="sdmId" name="sdmId"/>
	           	<div class="row"><h3>Registro de nuevo valor</h3></div>
	           	<div class="row">
		           	<div class="large-6 columns">
						<label>Cliente:</label>
					    <select class="full-width" id="selectcustomer" name="selectcustomer"></select>
					</div>
					<div class="large-6 columns">
						<label>Nombre del proceso:</label>
						<input type="text" maxlength="100" id="processName" name="processName" />
					</div>
				</div>
				<div class="row">
					<div class="large-4 columns">
						<label>Valor:</label>
						<input type="text" maxlength="8" id="quantity" name="quantity" />
					</div>
					<div class="large-8 columns">
					<!-- Empty space -->
					</div>
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
	SDM.App.Init();
});
</script>
</body>
</html>