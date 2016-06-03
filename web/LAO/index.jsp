<%@ page language="java" contentType="text/html; charset=UTF-8" 
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html>
<html>
<head>
	<title>LAO</title>
	<jsp:include page="../commons/header.jsp"/>
	<script src="${pageContext.request.contextPath}/content/js/lao.js" type="text/javascript"></script>
	<fmt:setLocale value="en_US"/>
</head>
<body>
<div class="loader"></div>
<button id="newRecord"><i class="fa fa-plus"></i> Nuevo registro</button>
<table id="lao_table" style="width:100%;border-spacing:0;" class="display" role="grid">
     <thead>
         <tr>
         	<th></th>
             <th>No.</th>
             <th>SDM</th>
             <th>Cliente</th>
             <th>Fecha planeada solución</th>
             <th>Fecha real solución</th>
             <th>Fecha cierre real</th>
             <th>Asunto</th>
             <!-- <th>Notas</th> -->
             <th>Estatus</th>
             <th></th>
         </tr>
     </thead>
     <tfoot>
         <tr>
         	<th></th>
             <th>No.</th>
             <th>SDM</th>
             <th>Cliente</th>
             <th>Fecha planeada solución</th>
             <th>Fecha real solución</th>
             <th>Fecha cierre real</th>
             <th>Asunto</th>
             <!-- <th>Notas</th> -->
             <th>Estatus</th>
             <th></th>
         </tr>
     </tfoot>
</table>
<jsp:include page="create_lao.jsp"/>
</body>
<script type="text/javascript">
	lao.app.InitializeApplication();
</script>
</html> 