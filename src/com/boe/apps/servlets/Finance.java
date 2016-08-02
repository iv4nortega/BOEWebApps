package com.boe.apps.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.boe.apps.data.FinanceData;
import com.boe.apps.data.FinanceImplementation;
import com.boe.apps.models.*;

import flexjson.JSONSerializer;

@WebServlet("/Finance")
public class Finance extends HttpServlet {
	private static final long serialVersionUID = 1L;
    private FinanceData fnance;
    
    public Finance() {
        fnance = new FinanceImplementation();
    }

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try
	    {
    		String action = request.getParameter("g");
			PrintWriter out = response.getWriter();
		    JSONSerializer json = new JSONSerializer();
			if(action.equalsIgnoreCase("list_finance")){
				response.setContentType("application/json");
				String userboe =  request.getParameter("user_boe");
				int periodfnce =  Integer.parseInt(request.getParameter("periodfnance"));
				String typefnce =  request.getParameter("typefnance");
				int customerfnce =  Integer.parseInt(request.getParameter("customerfnance"));
		    	String data = json.serialize(fnance.getFinance(userboe, periodfnce, typefnce, customerfnce));
		        out.println("{ \"data\": "+ data + "}");
			    out.close();
			}
			if(action.equalsIgnoreCase("edit")){
    	    	int operationId  = Integer.parseInt(request.getParameter("financeId"));
    			response.setContentType("application/json");
    			String data = json.serialize(fnance.getFinanceById(operationId));
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
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try
    	{
			FinanceModel finance = new FinanceModel();
			request.setCharacterEncoding("UTF-8");
			finance.setIDSDM(Integer.parseInt(request.getParameter("sdmId")));
			finance.setCustomerId(Integer.parseInt(request.getParameter("customer")));
			finance.setTypeFinance(request.getParameter("finance"));
			finance.setDescription(request.getParameter("description"));
			finance.setTimeId(Integer.parseInt(request.getParameter("timeId")));
    		/*Se agrega una condición 
    		 * para realizar su accion respectiva agregar/editar*/
    		String operationId = request.getParameter("financeId");
    		if( operationId == null || operationId.isEmpty()) 
    			fnance.createImprovement(finance);
    		else {
    			finance.setIDFinance(Integer.parseInt(operationId) );
    			fnance.updateFinance(finance);
    		}
    	}
		catch(Exception ex) {
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, ex.getMessage());
			response.flushBuffer();
    	}
	}
}
