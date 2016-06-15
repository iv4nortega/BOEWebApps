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
			if(action.equalsIgnoreCase("list_improvements"))
			{
				response.setContentType("application/json");
			    try {
			    	String userboe =  request.getParameter("user_boe");
			    	String data = json.serialize(det.getImprovements(userboe));
			        out.println("{ \"data\": "+ data + "}");
			    } finally {
			        out.close();
			    }
			}
    	}
    	catch (Exception ex)
    	{
    		response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, ex.getMessage());
			response.flushBuffer();
    	}
    }
}
