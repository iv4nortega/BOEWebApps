package com.boe.apps.controllers;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.boe.apps.data.*;
import com.boe.apps.data.OperationData;

import flexjson.JSONSerializer;

@WebServlet("/OperationController")
public class OperationController extends HttpServlet  {
	/**
	 * Clase que realiza la obtencion de informacion para las m�tricas
	 * por usuario. 
	 */
	
	private OperationData det;
	private static final long serialVersionUID = 1L;
	
	public OperationController(){
		det = new OperationImplementation();
	}
	
	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		try
    	{
    		String action = request.getParameter("action");
    	    PrintWriter out = response.getWriter();
    	    JSONSerializer json = new JSONSerializer();
    	    if(action.equalsIgnoreCase("list_operation_top"))
    	    {
    	    	int idSDM  = Integer.parseInt(request.getParameter("BOEUserName"));
    			response.setContentType("application/json");
    			String data = json.serialize(det.getAllOperations(idSDM));
		        out.println("{ \"data\": "+ data + "}");
		        out.close();
    		}
    	}
    	catch(Exception ex) {
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, ex.getMessage());
			response.flushBuffer();
    	}
	}
}