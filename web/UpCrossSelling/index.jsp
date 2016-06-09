<%@ page language="java" contentType="text/html; charset=UTF-8" 
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html>
<html>
<head>
	<title>Up Cross Selling</title>
	<jsp:include page="../commons/header.jsp"/>
	<script src="${pageContext.request.contextPath}/content/js/up_cross_selling.js" type="text/javascript"></script>
	<fmt:setLocale value="en_US"/>
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
    <div class="modalapp" id="modal_delete_record">
      <div class="modalapp-content">
           <span class="closemodal">x</span>
           <h3>Eliminar registro</h3>
           <p>Esta seguro de eliminar el registro? </p>
           <button id="delete_confirm_record">Eliminar</button>
      </div>
    </div>
	<jsp:include page="modal_oportunity.jsp"/>
</body>
<script>
$(function() {
	UpCrossSelling.App.Init();
});
</script>
</html> 