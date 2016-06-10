<%@ page language="java" contentType="text/html; charset=UTF-8" 
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
	<title>Up Cross Selling</title>
	<jsp:include page="../commons/header.jsp"/>
	<script src="${pageContext.request.contextPath}/content/js/up_cross_selling.js" type="text/javascript"></script>
</head>
<body>
<div class="loader"></div>
    <button id="newRecord"><i class="fa fa-plus"></i> Nuevo registro</button>
	<table id="opportunitiesTable" style="width:100%;" class="display" role="grid">
        <thead>
            <tr>
                <th></th>
                <th>Cliente</th>
                <th>Servicio</th>
                <th>Monto</th>
                <th>Probabilidad</th>
                <th>Tipo de venta</th>
                <th></th>
            </tr>
        </thead>
        <tfoot>
            <tr>
                <th></th>
                <th>Cliente</th>
                <th>Servicio</th>
                <th>Monto</th>
                <th>Probabilidad</th>
                <th>Tipo de venta</th>
                <th></th>
            </tr>
        </tfoot>
    </table>
	<jsp:include page="modal_oportunity.jsp"/>
	<jsp:include page="modal_delete.jsp"/>
</body>
<script>
$(function() {
	UpCrossSelling.App.Init();
});
</script>
</html> 