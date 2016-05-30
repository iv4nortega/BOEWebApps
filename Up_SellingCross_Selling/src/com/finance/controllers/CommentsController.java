package com.finance.controllers;


import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.finance.data.OpportunityData;
import com.finance.data.OpportunityImplementation;
import com.finance.models.*;

/**
 * @author Iván Hernández Ortega
 * Controller principal de acciones 
 */
@WebServlet("/CommentsController")
public class CommentsController extends HttpServlet  {
	
	private OpportunityData det;
	private static final long serialVersionUID = 1L;
      
	//Singleton Methods
    public CommentsController() {
    	det = new OpportunityImplementation();
    }
    /*
     * Metodo que guarda los comentarios para oportunidad
     * */
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		try
		{
			CommentsModel comment = new CommentsModel();
			String action = request.getParameter("action");
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
				comment.setAddedBy("usuario");
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
