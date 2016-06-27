<%@ page language="java" contentType="text/html; charset=UTF-8" 
	pageEncoding="UTF-8"%>
<%@ page import="java.io.*,java.util.*" %>
<%@ page import="javax.servlet.*,java.text.*" %>
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
		<button id="new_value"><i class="fa fa-plus"></i> Agregar nuevos valores</button>
	</div>
</div>
<table id="metrics_sdm" style="width:100%;" class="display">
    <thead>
        <tr>
            <th>Descripción</th>
            <th>Valor</th>
            <th>Acción</th>
        </tr>
    </thead>
    <tfoot>
        <tr>
            <th>Descripción</th>
            <th>Valor</th>
            <th>Acción</th>
        </tr>
    </tfoot>
</table>
<jsp:include page="modal_update_value.html"/>
<jsp:include page="modal_create_values.html"/>
</body>
<script>
$(function() {
	SDM.App.Init();
});
</script>
</html>