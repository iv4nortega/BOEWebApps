package com.boe.apps.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.boe.apps.data.OpportunityData;
import com.boe.apps.data.OpportunityImplementation;
import com.boe.apps.models.OpportunityModel;

import flexjson.JSONSerializer;
/**
 * @author Iván Hernández Ortega
 * Servlet principal de acciones para oportunidades
 */

@WebServlet("/Opportunities")
public class Opportunities extends HttpServlet {

	
	private OpportunityData det;
	private static final long serialVersionUID = 1L;
	public static final String LIST_OPPORTUNITIES = "/BOEWebApps/UpCrossSelling";
       
    public Opportunities() {
    	det = new OpportunityImplementation();
    }
    /*Metodo que obtiene las respectivas acciones desde el HTTPREQUEST*/
    @Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String action = request.getParameter( "action" );
	    PrintWriter out = response.getWriter();
	    JSONSerializer json = new JSONSerializer();
	    response.setContentType("application/json");
		try{
			/*Obtiene el listado de oportunidades*/
			if(action.equalsIgnoreCase("list_opportunities")){
			    try {
					String boeuser = request.getParameter("BOEUser");
			    	String data = json.serialize(det.getAllOpportunity(boeuser));
			        out.println("{ \"data\": "+ data + "}");
			    } finally {
			        out.close();
			    }
			}
			/*Elimina una oportunidad*/
			else if( action.equalsIgnoreCase( "delete" ) ) {
				int opportunityId = Integer.parseInt( request.getParameter("IDUpCrossSelling") );
				det.deleteOpportunity(opportunityId);
				response.sendRedirect(LIST_OPPORTUNITIES);
			}
			/*Actualiza una oportunidad*/
			else if( action.equalsIgnoreCase( "edit" ) ) {
				int opportunityId = Integer.parseInt( request.getParameter("IDUpCrossSelling") );
				OpportunityModel opportunity = det.getOpportunityById(opportunityId);
				request.setAttribute("opportunities", opportunity);
			    try {
			        out.println(json.serialize(opportunity));
			    } finally {
			        out.close();
			    }
			}
		}
		catch (Exception ex) {
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, ex.getMessage());
			response.flushBuffer();
		}
	}
    /*
     * Guarda o actualiza una oportunidad
     * */
    @Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
    	try
    	{
    		OpportunityModel opportunity = new OpportunityModel();
    		request.setCharacterEncoding("UTF-8");
    		opportunity.setIDCustomer(Integer.parseInt(request.getParameter("new_record_customer")));
    		opportunity.setIDService(Integer.parseInt(request.getParameter("new_record_service")));
    		opportunity.setCost(request.getParameter( "new_record_amount" ));
    		opportunity.setProbability(Float.parseFloat(request.getParameter( "new_record_probability" )));
    		opportunity.setDescription(request.getParameter( "new_record_description" ));
    		opportunity.setType(request.getParameter( "new_record_type_sale" ));
    		opportunity.setIDSDM(Integer.parseInt(request.getParameter( "idsdm" )));
    		opportunity.setStatus(request.getParameter( "new_record_status_sale" ));
    		String timeTentative = request.getParameter( "new_record_date" ).replace("-", "");
    		opportunity.setIDTimeTentative(Integer.parseInt(timeTentative));
    		/*Fecha Inicial*/
    		String recordDateStart = request.getParameter( "new_record_date_start" ).replace("-", "");
    		if(recordDateStart != null && !recordDateStart.isEmpty()){
    			opportunity.setIDTimeStart(Integer.parseInt(recordDateStart));
    		}
    		/*Fecha final*/
    		String recordDateEnd = request.getParameter( "new_record_date_end" ).replace("-", "");
    		if(recordDateEnd != null && !recordDateEnd.isEmpty()){
    			opportunity.setIDTimeEnd(Integer.parseInt(recordDateEnd));
    		}
    		/*Se agrega una condición 
    		 * para realizar su accion respectiva agregar/editar*/
    		String opportunityId = request.getParameter("new_record_id");
    		if( opportunityId == null || opportunityId.isEmpty()) 
    			det.createOpportunity(opportunity);
    		else {
    			opportunity.setIDUpCrossSelling( Integer.parseInt(opportunityId));
    			det.updateOpportunity(opportunity);
    		}
    		response.sendRedirect(LIST_OPPORTUNITIES);
    	}
    	catch (Exception ex)
    	{
    		response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, ex.getMessage());
			response.flushBuffer();
    	}
	}
}