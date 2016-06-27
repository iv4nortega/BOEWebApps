package com.boe.apps.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

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
    	    	String sdmName  = request.getParameter("BOEUser");
    	    	int timeId = Integer.parseInt(request.getParameter("timeId"));
    	    	String processName = request.getParameter("ProcessName");
    	    	int customerId = Integer.parseInt(request.getParameter("CustomerId"));
    			response.setContentType("application/json");
    			String data = json.serialize(det.getAllOperations(sdmName, timeId, processName, customerId ));
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
			/*Se agrega una condición 
    		 * para realizar su accion respectiva agregar/editar*/
    		operation.setIDSDM(Integer.parseInt(request.getParameter("sdmId")));
			operation.setCustomerId(Integer.parseInt(request.getParameter("selectcustomer")));
			operation.setProcessName(request.getParameter("processName"));
			operation.setTimeId(Integer.parseInt(request.getParameter("timeId")));
    		String operationId = request.getParameter("operationId");
    		if( operationId == null || operationId.isEmpty()) 
    		{
    			List<OperationModel> listoperation = new ArrayList<OperationModel>();
    			int sdmID = Integer.parseInt(request.getParameter("sdmId"));
    			int customerId = Integer.parseInt(request.getParameter("selectcustomer"));
    			int timeId = Integer.parseInt(request.getParameter("timeId"));
    			String processName = request.getParameter("processName");
    			
    			OperationModel operationModel1 = new OperationModel();
    			operationModel1.setIDSDM(sdmID);
    			operationModel1.setCustomerId(customerId);
    			operationModel1.setTimeId(timeId);
    			operationModel1.setProcessName(processName);
    			operationModel1.setQuantity(Integer.parseInt(request.getParameter("quantity1")));
    			operationModel1.setDescription(request.getParameter("description1"));
    			listoperation.add(operationModel1);
    			
    			OperationModel operationModel2 = new OperationModel();
    			operationModel2.setIDSDM(sdmID);
    			operationModel2.setCustomerId(customerId);
    			operationModel2.setTimeId(timeId);
    			operationModel2.setProcessName(processName);
    			operationModel2.setQuantity(Integer.parseInt(request.getParameter("quantity2")));
    			operationModel2.setDescription(request.getParameter("description2"));
    			listoperation.add(operationModel2);
    			
    			OperationModel operationModel3 = new OperationModel();
    			operationModel3.setIDSDM(sdmID);
    			operationModel3.setCustomerId(customerId);
    			operationModel3.setTimeId(timeId);
    			operationModel3.setProcessName(processName);
    			operationModel3.setQuantity(Integer.parseInt(request.getParameter("quantity3")));
    			operationModel3.setDescription(request.getParameter("description3"));
    			listoperation.add(operationModel3);
    			
    			OperationModel operationModel4 = new OperationModel();
    			operationModel4.setIDSDM(sdmID);
    			operationModel4.setCustomerId(customerId);
    			operationModel4.setTimeId(timeId);
    			operationModel4.setProcessName(processName);
    			operationModel4.setQuantity(Integer.parseInt(request.getParameter("quantity4")));
    			operationModel4.setDescription(request.getParameter("description4"));
    			listoperation.add(operationModel4);
    			
    			OperationModel operationModel5 = new OperationModel();
    			operationModel5.setIDSDM(sdmID);
    			operationModel5.setCustomerId(customerId);
    			operationModel5.setTimeId(timeId);
    			operationModel5.setProcessName(processName);
    			operationModel5.setQuantity(Integer.parseInt(request.getParameter("quantity5")));
    			operationModel5.setDescription(request.getParameter("description5"));
    			listoperation.add(operationModel5);
    			
    			OperationModel operationModel6 = new OperationModel();
    			operationModel6.setIDSDM(sdmID);
    			operationModel6.setCustomerId(customerId);
    			operationModel6.setTimeId(timeId);
    			operationModel6.setProcessName(processName);
    			operationModel6.setQuantity(Integer.parseInt(request.getParameter("quantity6")));
    			operationModel6.setDescription(request.getParameter("description6"));
    			listoperation.add(operationModel6);
    			
    			OperationModel operationModel7 = new OperationModel();
    			operationModel7.setIDSDM(sdmID);
    			operationModel7.setCustomerId(customerId);
    			operationModel7.setTimeId(timeId);
    			operationModel7.setProcessName(processName);
    			operationModel7.setQuantity(Integer.parseInt(request.getParameter("quantity7")));
    			operationModel7.setDescription(request.getParameter("description7"));
    			listoperation.add(operationModel7);
    			
    			OperationModel operationModel8 = new OperationModel();
    			operationModel8.setIDSDM(sdmID);
    			operationModel8.setCustomerId(customerId);
    			operationModel8.setTimeId(timeId);
    			operationModel8.setProcessName(processName);
    			operationModel8.setQuantity(Integer.parseInt(request.getParameter("quantity8")));
    			operationModel8.setDescription(request.getParameter("description8"));
    			listoperation.add(operationModel8);
    			
    			OperationModel operationModel9 = new OperationModel();
    			operationModel9.setIDSDM(sdmID);
    			operationModel9.setCustomerId(customerId);
    			operationModel9.setTimeId(timeId);
    			operationModel9.setProcessName(processName);
    			operationModel9.setQuantity(Integer.parseInt(request.getParameter("quantity9")));
    			operationModel9.setDescription(request.getParameter("description9"));
    			listoperation.add(operationModel9);
    			
    			OperationModel operationModel10 = new OperationModel();
    			operationModel10.setIDSDM(sdmID);
    			operationModel10.setCustomerId(customerId);
    			operationModel10.setTimeId(timeId);
    			operationModel10.setProcessName(processName);
    			operationModel10.setQuantity(Integer.parseInt(request.getParameter("quantity10")));
    			operationModel10.setDescription(request.getParameter("description10"));
    			listoperation.add(operationModel10);
    			for(OperationModel item : listoperation ){
    				det.createOperation(item);
    			}
    		}
    		else {
    			operation.setQuantity(Integer.parseInt(request.getParameter("quantity")));
    			operation.setDescription(request.getParameter("description"));
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
