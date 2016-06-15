<%@ page language="java" contentType="text/html; charset=UTF-8" 
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page import="java.io.*,java.util.*" %>
<%@ page import="javax.servlet.*,java.text.*" %>
<div class="modalapp" id="laoModal">
	 <div class="modalapp-content">
       		 <div class="modalapp-header">
	           	<span class="closemodal">x</span>
				<h5 class="modal-title">Registro de Acciones y Observaciones</h5>
      		</div>
			<form method="post" class="form-default" novalidate="novalidate" id="form_create_lao" name="form_create_lao" action="../LAO.do"  autocomplete="off">
			<input style="display:none" type="text" id="lao_id" name="lao_id">
			<input style="display:none" type="text" id="lao_idSDM" name="lao_idSDM">
			<input style="display:none" type="text" id="UserLogin" name="UserLogin">
			<%
			   Date dNow = new Date();
			   SimpleDateFormat ft = 
			   new SimpleDateFormat ("yyyy-MM-dd");
			   out.print( "<input style='display:none' type='text' id='lao_date' name='lao_date' value='" + ft.format(dNow) + "' >");
			%>
				<div class="row">
	           		<!--Cliente-->
				  	<div class="large-6 columns">
	                    <label>Cliente:</label>
	                    <select class="full-width" id="selectcustomer" name="selectcustomer"></select>
	                </div>
	                <!--Cliente-->
				  	<div class="large-6 columns">
	                    <label>Estado:</label>
	                    <select class="full-width" id="selectstatus" name="selectstatus">
		                    <option value="3">En progreso</option>
				          	<option value="4">Solucionado</option>
				          	<option value="1">Vencido</option>
				          	<option value="5">Cerrado</option>
				          	<option value="2">Reabierto</option>
	                    </select>
	                </div>
	             </div>
	             <div class="row">
	                <div class="large-6 columns">
	                    <label>Fecha planeada:</label>
	                    <div class="row collapse postfix-radius">
		                   	<div class="small-10 columns">
		                   		<input id="date_planned" name="date_planned" class="form-control" maxlength="10" type="text">
		                   	</div>
		               		<div class="small-2 columns">
		                   		<span class="postfix"><i class="fa fa-calendar"></i></span>
		                   	</div>
                   		</div>
                    </div>
                    <div class="large-6 columns">
	                    <label>Fecha real:</label>
	                    <div class="row collapse postfix-radius">
		                   	<div class="small-10 columns">
		                   		<input id="date_real" name="date_real" class="form-control" maxlength="10" type="text">
		                   	</div>
		               		<div class="small-2 columns">
		                   		<span class="postfix"><i class="fa fa-calendar"></i></span>
		                   	</div>
                   		</div>
                    </div>
                </div>
				<div class="row">
                     <div class="large-6 columns">
	                    <label>Fecha cierre:</label>
	                    <div class="row collapse postfix-radius">
		                   	<div class="small-10 columns">
		                   		<input id="date_close" name="date_close" class="form-control" maxlength="10" type="text">
		                   	</div>
		               		<div class="small-2 columns">
		                   		<span class="postfix"><i class="fa fa-calendar"></i></span>
		                   	</div>
                   		</div>
                    </div>
               </div>
              <div class="row">
               	<div class="large-12 columns">
               		<label>Asunto</label>
               		<textarea id="subject" name="subject" ></textarea>
              	</div>
              </div>
              <div class="row">
              	<div class="large-12 columns">
               		<label>Notas:</label>
               		<textarea id="comments" name="comments" ></textarea>
		           <button type="submit" id="edit_save_button"><i class="fa fa-save"></i> Guardar</button>
              	</div>
              </div>
			</form>
			</div>
</div>