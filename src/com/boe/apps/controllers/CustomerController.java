package com.boe.apps.controllers;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.boe.apps.data.OpportunityData;
import com.boe.apps.data.OpportunityImplementation;

import flexjson.JSONSerializer;

@WebServlet("/CustomerController")
public class CustomerController extends HttpServlet{

	private OpportunityData det;
	private static final long serialVersionUID = 1L;
       
    public CustomerController() {
    	det = new OpportunityImplementation();
    }
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {
    	try
    	{
    		String action = request.getParameter("action");
    	    PrintWriter out = response.getWriter();
    	    JSONSerializer json = new JSONSerializer();
    	    if(action.equalsIgnoreCase("list_customers")){
    			response.setContentType("application/json");
    			String data = json.serialize(det.getAllCustomers());
		        out.println(data);
		        out.close();
    		}
    	}
    	catch(Exception ex) {
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, ex.getMessage());
			response.flushBuffer();
    	}
    }
}
