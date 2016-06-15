package com.boe.apps.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.boe.apps.data.*;

import flexjson.JSONSerializer;

@WebServlet("/Customers")
public class Customers extends HttpServlet{

	private CustomerImplementation det;
	private static final long serialVersionUID = 1L;
       
    public Customers() {
    	det = new CustomerImplementation();
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
    	    if(action.equalsIgnoreCase("list_customers_by_sdm"))
    	    {
    	    	String sdmName = request.getParameter("sdmName");
    			response.setContentType("application/json");
    			String data = json.serialize(det.getSDMCustomers(sdmName));
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
