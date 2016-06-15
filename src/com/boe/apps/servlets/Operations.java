package com.boe.apps.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.boe.apps.data.*;
import com.boe.apps.data.OperationData;
import com.boe.apps.models.OperationModel;

import flexjson.JSONSerializer;

@WebServlet("/Operations")
public class Operations extends HttpServlet  {
	/**
	 * Servlet que realiza la obtencion de informacion para las métricas
	 * por usuario. 
	 */
	
	private OperationData det;
	private static final long serialVersionUID = 1L;
	public static final String LIST_OPERATIONS = "/BOEWebApps/SDM";
	
	public Operations(){
		det = new OperationImplementation();
	}
	
	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		try
    	{
    		String action = request.getParameter("g");
    	    PrintWriter out = response.getWriter();
    	    JSONSerializer json = new JSONSerializer();
    	    if(action.equalsIgnoreCase("operations")){
    	    	int idSDM  = Integer.parseInt(request.getParameter("userid"));
    			response.setContentType("application/json");
    			String data = json.serialize(det.getAllOperations(idSDM));
		        out.println("{ \"data\": "+ data + "}");
		        out.close();
    		}
    	    if(action.equalsIgnoreCase("edit")){
    	    	int operationId  = Integer.parseInt(request.getParameter("operationId"));
    			response.setContentType("application/json");
    			String data = json.serialize(det.getOperationById(operationId));
		        out.println(data);
		        out.close();
    		}
    	    if(action.equalsIgnoreCase("process")){
    	    	int idSDM = Integer.parseInt(request.getParameter("userid"));
    	    	response.setContentType("application/json");
    	    	String data = json.serialize(det.getProcess(idSDM));
		        out.println(data);
		        out.close();
    	    }
    	    if(action.equalsIgnoreCase("periods")){
    	    	response.setContentType("application/json");
    	    	String data = json.serialize(det.getQuarters());
		        out.println(data);
		        out.close();
    	    }
    	}
    	catch(Exception ex) {
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, ex.getMessage());
			response.flushBuffer();
    	}
	}

	@Override 
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException,  IOException
	{
		try
    	{
			OperationModel operation = new OperationModel();
			request.setCharacterEncoding("UTF-8");
			operation.setIDSDM(Integer.parseInt(request.getParameter("sdmId")));
			operation.setCustomerId(Integer.parseInt(request.getParameter("selectcustomer")));
			operation.setProcessName(request.getParameter("processName"));
			operation.setQuantity(Integer.parseInt(request.getParameter("quantity")));
			operation.setDescription(request.getParameter("description"));
			operation.setTimeId(Integer.parseInt(request.getParameter("timeId")));
    		/*Se agrega una condición 
    		 * para realizar su accion respectiva agregar/editar*/
    		String operationId = request.getParameter("operationId");
    		if( operationId == null || operationId.isEmpty()) 
    			det.createOperation(operation);
    		else {
    			operation.setIDOperationTop(Integer.parseInt(operationId) );
    			det.updateOperation(operation);
    		}
    	}
		catch(Exception ex) {
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, ex.getMessage());
			response.flushBuffer();
    	}
	}
}
