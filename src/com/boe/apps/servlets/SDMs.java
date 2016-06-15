package com.boe.apps.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

import com.boe.apps.data.SDMImplementation;

import flexjson.JSONSerializer;

@WebServlet("/SDMs")
public class SDMs extends HttpServlet{
	/**
	 * Servlet que obtiene informacion de los SDM
	 */
	private SDMImplementation det;
	private static final long serialVersionUID = 1L;

	public SDMs(){
		det = new SDMImplementation();
	}
	
	@Override 
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException,  IOException
	{
		try
    	{
    		String action = request.getParameter("action");
    	    PrintWriter out = response.getWriter();
    	    JSONSerializer json = new JSONSerializer();
    	    if(action.equalsIgnoreCase("list_sdms"))
			{
				response.setContentType("application/json");
		    	String userLogin = request.getParameter("BOEUserName");
		    	String data = json.serialize(det.getUserProfile(userLogin));
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
