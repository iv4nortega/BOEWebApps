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

import flexjson.JSONSerializer;

@WebServlet("/Services")
public class Services extends HttpServlet{

	private OpportunityData det;
	private static final long serialVersionUID = 1L;
       
    public Services() {
    	det = new OpportunityImplementation();
    }
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
    	try
    	{
    		String action = request.getParameter("action");
    	    PrintWriter out = response.getWriter();
    	    JSONSerializer json = new JSONSerializer();
    	    if(action.equalsIgnoreCase("list_services")){
				response.setContentType("application/json");
			    try {
			    	String data = json.serialize(det.getAllServices());
			        out.println(data);
			    } finally {
			        out.close();
			    }
			}
    	}
    	catch(Exception ex) {
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, ex.getMessage());
			response.flushBuffer();
    	}
    }
}
