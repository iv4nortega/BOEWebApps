package com.boe.apps.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.boe.apps.data.ImprovementsData;
import com.boe.apps.data.ImprovementsImplementation;
import com.boe.apps.models.ImprovementsModel;

import flexjson.JSONSerializer;

@WebServlet("/Improvements")
public class Improvements extends HttpServlet{

	private ImprovementsData det;
	private static final long serialVersionUID = 1L;
	
	public Improvements(){
		det = new ImprovementsImplementation();
	}
	/*Metodo que obtiene el listado de improvements
     * */
    @Override
   	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	try
	    {
    		String action = request.getParameter("g");
			PrintWriter out = response.getWriter();
		    JSONSerializer json = new JSONSerializer();
			if(action.equalsIgnoreCase("list_improvements")){
				response.setContentType("application/json");
				String userboe =  request.getParameter("user_boe");
				int periodimp =  Integer.parseInt(request.getParameter("periodimp"));
				int customerimp =  Integer.parseInt(request.getParameter("customerimp"));
				String typeimp =  request.getParameter("typeimp");
		    	String data = json.serialize(det.getImprovements(userboe,periodimp,typeimp, customerimp));
		        out.println("{ \"data\": "+ data + "}");
			    out.close();
			}if(action.equalsIgnoreCase("edit")){
    	    	int operationId  = Integer.parseInt(request.getParameter("improvementId"));
    			response.setContentType("application/json");
    			String data = json.serialize(det.getOperationById(operationId));
		        out.println(data);
		        out.close();
    		}if(action.equalsIgnoreCase("typeImprovements"))
			{
				response.setContentType("application/json");
				String userboe =  request.getParameter("user_boe");
		    	String data = json.serialize(det.getTypeImprovements(userboe));
		        out.println(data);
		        out.close();
			}
    	}
    	catch (Exception ex)
    	{
    		response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, ex.getMessage());
			response.flushBuffer();
    	}
    }
    @Override 
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException,  IOException
	{
		try
    	{
			ImprovementsModel improvement = new ImprovementsModel();
			request.setCharacterEncoding("UTF-8");
			improvement.setIDSDM(Integer.parseInt(request.getParameter("sdmId")));
			improvement.setCustomerId(Integer.parseInt(request.getParameter("customer")));
			improvement.setTypeImprovement(request.getParameter("improvement"));
			improvement.setDescription(request.getParameter("description"));
			improvement.setTimeId(Integer.parseInt(request.getParameter("timeId")));
    		/*Se agrega una condición 
    		 * para realizar su accion respectiva agregar/editar*/
    		String operationId = request.getParameter("improvementId");
    		if( operationId == null || operationId.isEmpty()) 
    			det.createImprovement(improvement);
    		else {
    			improvement.setIDImprovement(Integer.parseInt(operationId) );
    			det.updateImprovement(improvement);
    		}
    	}
		catch(Exception ex) {
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, ex.getMessage());
			response.flushBuffer();
    	}
	}
}
