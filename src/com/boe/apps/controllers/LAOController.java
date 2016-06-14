package com.boe.apps.controllers;

import java.io.*;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

import com.boe.apps.data.LAOData;
import com.boe.apps.data.LAOImplementation;
import com.boe.apps.models.LAOModel;

import flexjson.JSONSerializer;

@WebServlet("/LAOController")
public class LAOController extends HttpServlet {
	
	private LAOData obj;
	private static final long serialVersionUID = 1L;
	public static final String INDEX_LAO = "/BOEWebApps/LAO";
	
	public LAOController(){
		obj = new LAOImplementation();
	}
	
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
	    JSONSerializer json = new JSONSerializer();
	    PrintWriter out = response.getWriter();
		String action = request.getParameter("action");
		try{
			if(action.equalsIgnoreCase("list_lao"))
			{
				response.setContentType("application/json");
			    try {

					String userLogin = request.getParameter("UserLogin");
			    	String data = json.serialize(obj.getLAORecords(userLogin));
			        out.println("{ \"data\": "+ data + "}");
			    } finally {
			        out.close();
			    }
			}
			/*Actualiza un registro de accion*/
			else if( action.equalsIgnoreCase( "edit" ) ) {
				int laoId = Integer.parseInt( request.getParameter("IDLAO") );
				LAOModel lao = obj.getLAOById(laoId);
				request.setAttribute("opportunities", lao);
				response.setContentType("application/json");
			    try {
			        out.println(json.serialize(lao));
			    } finally {
			        out.close();
			    }
			}
			else if(action.equalsIgnoreCase("list_notes"))
			{
				response.setContentType("application/json");
			    try {
			    	String data = json.serialize(obj.getLAONotes(Integer.parseInt(request.getParameter("IDLAO"))));
			        out.println("{ \"data\": "+ data + "}");
			    } finally {
			        out.close();
			    }
			}
			else if(action.equalsIgnoreCase("list_sdms"))
			{
				response.setContentType("application/json");
			    try {
			    	String userLogin = request.getParameter("UserLogin");
			    	String data = json.serialize(obj.getUserProfile(userLogin));
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
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		try
		{

			LAOModel lao = new LAOModel();
			request.setCharacterEncoding("UTF-8");
			lao.setIDCustomer(Integer.parseInt(request.getParameter("selectcustomer")));
			lao.setStatus(request.getParameter("selectstatus"));
			lao.setIDDetectionTime(Integer.parseInt(request.getParameter("lao_date").replace("-", "")));
			lao.setIDSDM(Integer.parseInt(request.getParameter("lao_idSDM").trim()));
			lao.setSubject(request.getParameter("subject"));
			lao.setComments(request.getParameter("comments"));
			
			/*Fecha Planeada*/
			String recordDatePlanned = request.getParameter( "date_planned" ).replace("-", "");
			if(recordDatePlanned != null && !recordDatePlanned.isEmpty()){
				lao.setIDPlannedTime(Integer.parseInt(recordDatePlanned));
			}
			/*Fecha Real*/
			String recordDateReal = request.getParameter( "date_real" ).replace("-", "");
			if(recordDateReal != null && !recordDateReal.isEmpty()){
				lao.setIDRealTime(Integer.parseInt(recordDateReal));
			}
			/*Fecha de cierre*/
			String recordDateClose = request.getParameter( "date_close" ).replace("-", "");
			if(recordDateClose != null && !recordDateClose.isEmpty()){
				lao.setIDCloseTime(Integer.parseInt(recordDateClose));
			}
			String laoId = request.getParameter("lao_id");
			if( laoId == null || laoId.isEmpty()) 
				obj.addLAO(lao);
			else {
				lao.setIDLAO( Integer.parseInt(laoId) );
				obj.updateLAO(lao);
			}
			String userLogin = request.getParameter("UserLogin");
			request.setAttribute("lao", obj.getLAORecords(userLogin));
			response.sendRedirect(INDEX_LAO);
		}
		catch (Exception ex)
		{
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, ex.getMessage());
			response.flushBuffer();
		}
	}
}
