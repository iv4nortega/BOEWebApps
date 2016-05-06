<%-- Prevención del cache --%>
<%
    response.setHeader("Cache-Control", "no-cache"); //HTTP 1.1
    response.setHeader("Pragma", "no-cache"); //HTTP 1.0
    response.setDateHeader("Expires", 0); //prevents caching at the proxy server
    response.setHeader("Cache-Control", "no-store");
%>
<title>UpCross Selling</title>
<link href="${pageContext.request.contextPath}/content/css/foundation.min.css" rel="stylesheet" type="text/css" />
<link href="${pageContext.request.contextPath}/content/css/dataTables.foundation.min.css" rel="stylesheet" type="text/css" />
<link href="${pageContext.request.contextPath}/content/css/jquery-ui-1.9.2.custom.min.css" rel="stylesheet" type="text/css" />
<link href="${pageContext.request.contextPath}/content/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
<!--Estilo -->
<link href="${pageContext.request.contextPath}/content/css/appstyle.css" rel="stylesheet" type="text/css" />
<script src="${pageContext.request.contextPath}/content/js/jquery-1.8.3.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/content/js/jquery.dataTables.min.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/content/js/dataTables.foundation.min.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/content/js/jquery-ui-1.9.2.custom.min.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/content/js/jquery.inputmask.bundle.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/content/js/jquery.number.min.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/content/js/jquery.validate.min.js" type="text/javascript"></script>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">