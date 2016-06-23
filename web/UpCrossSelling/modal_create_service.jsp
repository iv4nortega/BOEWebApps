<%@ page language="java" contentType="text/html; charset=UTF-8" 
	pageEncoding="UTF-8"%>
<div class="modalapp" id="modal_new_service">
    <div class="modalapp-content">
		<div class="modalapp-header">
	           	<span class="closemodal">x</span>
				<h4 class="modal-title">Formulario para nuevo servicio</h4>
      	</div>
        <form class="form-default" id="form_new_service" name="form_new_service">
        <input style="display:none" type="text" id="service_id" name="service_id">
        <div class="row">
	       	<!--Cliente-->
		  	<div class="large-6 columns">
			  	<label>Nombre:</label>
			  	<input type="text" id="name_service" name="name_service" />
			</div>
        </div>
        <div class="row">
          <div class="large-12 columns">
	          <label>Descripción:</label>
	          <textarea class="textarea-50" id="description_service" name="description_service" ></textarea>
	          <button type="submit" id="save_service" name="save_service"><i class="fa fa-save"></i> Guardar</button>
	          <button type="button" id="closemodal_service" name="closemodal_service"><i class="fa fa-times"></i> Cancelar</button>
          </div>
        </div>
    	</form>
	</div>
</div>