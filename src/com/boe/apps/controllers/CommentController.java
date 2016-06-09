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
import com.boe.apps.models.*;

import flexjson.JSONSerializer;

/**
 * @author Iván Hernández Ortega
 * Controller principal de acciones para comentarios Up Cross Selling, LAO y Operations
 */
@WebServlet("/CommentController")
public class CommentController extends HttpServlet  {
	
	private OpportunityData det;
	private static final long serialVersionUID = 1L;
      
	//Singleton Methods
    public CommentController() {
    	det = new OpportunityImplementation();
    }
    @Override
   	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	try
	    {
    		String action = request.getParameter("action");
			PrintWriter out = response.getWriter();
		    JSONSerializer json = new JSONSerializer();
			if(action.equalsIgnoreCase("list_notes"))
			{
				response.setContentType("application/json");
			    try {
			    	int idItem =  Integer.parseInt(request.getParameter("tableItemId"));
			    	String data = json.serialize(det.getComments(idItem));
			        out.println(data);
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
    /*
     * Metodo que guarda los comentarios para oportunidad
     * */
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		try
		{
			String action = request.getParameter("action");
			CommentsModel comment = new CommentsModel();
			if(action.equalsIgnoreCase("delete_comment"))
			{
				int commentID = Integer.parseInt(request.getParameter("id"));
				det.deleteComment(commentID);
			}
			else if(action.equalsIgnoreCase("create_comment"))
			{
				comment.setIDParentItem(Integer.parseInt(request.getParameter("parentid")));
				comment.setIDTableName(request.getParameter("tableName"));
				comment.setNote(request.getParameter("comment"));
				comment.setAddedBy(request.getParameter("useradded"));
				det.addComments(comment);
			}
			else
			{
				response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "NO HAY ACCION.");
				response.flushBuffer();
			}
		}catch (Exception ex){
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, ex.getMessage());
			response.flushBuffer();
		}
	}
}
