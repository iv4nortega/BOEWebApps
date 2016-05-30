<%@ page language="java" contentType="text/html; charset=UTF-8" 
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<div class="modalapp" id="modal_new_record">
       <div class="modalapp-content">
       		 <div class="modalapp-header">
	           	<span class="closemodal">x</span>
				<h4 class="modal-title">Registro de oportunidad</h4>
      		</div>
           <form class="form-default" id="form_new_record" name="form_new_record" action="OpportunityController.do"  method="post">
           <input style="display:none" type="text" id="new_record_id" name="new_record_id">
           
           	<div class="row">
           		<!--Cliente-->
			  	<div class="large-4 columns">
				  	<label>Cliente:</label>
		          	<select id="new_record_customer" name="new_record_customer"></select>
           		</div>
				<!--Servicio-->
				<div class="large-8 columns">
			        <label>Servicio:</label>
			        <select id="new_record_service" name="new_record_service">
			        </select>
			  	</div>
			</div>
           <div class="row">
               <div class="large-5 columns">
                   <!--Tipo de venta-->
                   <label>Tipo de venta:</label>
                   <select id="new_record_type_sale" name="new_record_type_sale">
                       <option value="UP_SELLING">UP_SELLING</option>
                       <option value="CROSS_SELLING">CROSS_SELLING</option>
                   </select>
               </div>
               <div class="large-4 columns">
	               <label>Costo (USD): </label>
	               <div class="row collapse prefix-radius">
			        <div class="small-1 columns">
			          <span class="prefix">$</span>
			        </div>
			        <div class="small-11 columns">
			          <!--Costo-->
	                   <input type="text" autocomplete="off" maxlength="12" id="new_record_amount" name="new_record_amount"  >
			        </div>
			      </div>
               </div>
               <div class="large-3 columns">
                   <!--Probabilidad-->
                   <label>Probabilidad:</label>
                   <div class="row collapse postfix-radius">
                   	<div class="small-10 columns">
                   		<input type="text" id="new_record_probability" name="new_record_probability"  max="100" maxlength="3">
                   	</div>
               		<div class="small-2 columns">
                   		<span class="postfix">%</span>
                   	</div>
                   </div>
               </div>
           </div>
           <div class="row">
               <div class="large-4 columns">
                   <!--Fecha-->
                   <label>Fecha tentativa:</label>
                   <input type="text" id="new_record_date" name="new_record_date" >
               </div>
               <div class="large-4 columns" id="date_record_start" style="display:none">
                   <!--Fecha-->
                   <label>Fecha inicial:</label>
                   <input type="text" id="new_record_date_start" name="new_record_date_start" >
               </div>
               <div class="large-4 columns" id="date_record_end" style="display:none">
                   <!--Fecha-->
                   <label>Fecha final:</label>
                   <input type="text" id="new_record_date_end" name="new_record_date_end" >
               </div>
           </div>
           <div class="row">
               <div class="large-12 columns">
		           <!--Descripción-->
		           <label>Descripción:</label>
		           <textarea class="textarea-100" id="new_record_description" name="new_record_description" ></textarea>
		           <button type="submit" id="edit_save_button"><i class="fa fa-save"></i> Guardar</button>
               </div>
           </div>
       </form>
       </div>
	</div>
</html>