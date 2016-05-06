package com.finance.controllers;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.finance.data.OpportunityImplementation;
import com.finance.data.OpportunityData;
import com.finance.models.OpportunityModel;

import flexjson.JSONSerializer;
/**
 * @author Iván Hernández Ortega
 * Controller principal de acciones 
 */

@WebServlet("/OpportunityController")
public class OpportunityController extends HttpServlet {

	
	private OpportunityData det;
	private static final long serialVersionUID = 1L;
	public static final String LIST_OPPORTUNITIES = "/Up_SellingCross_Selling";
       
    public OpportunityController() {
    	det = new OpportunityImplementation();
    }
    @Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String forward = "";
		String action = request.getParameter( "action" );
		try{

			if( action.equalsIgnoreCase( "delete" ) ) {
				forward = LIST_OPPORTUNITIES;
				int opportunityId = Integer.parseInt( request.getParameter("IDUpCrossSelling") );
				det.deleteOpportunity(opportunityId);
				request.setAttribute("opportunities", det.getAllOpportunity() );
				response.sendRedirect(LIST_OPPORTUNITIES);
			}
			else if( action.equalsIgnoreCase( "edit" ) ) {
				forward = LIST_OPPORTUNITIES;
				int opportunityId = Integer.parseInt( request.getParameter("IDUpCrossSelling") );
				OpportunityModel opportunity = det.getOpportunityById(opportunityId);
				request.setAttribute("opportunities", opportunity);
				
				response.setContentType("application/json");
			    PrintWriter out = response.getWriter();
			    JSONSerializer json = new JSONSerializer();
			    try {
			        out.println(json.serialize(opportunity));
			    } finally {
			        out.close();
			    }
			}
			else if( action.equalsIgnoreCase( "insert" ) ) {
				RequestDispatcher view = request.getRequestDispatcher( forward );
				view.forward(request, response);
			}
			else if(action.equalsIgnoreCase("list_opportunities")){
				forward = LIST_OPPORTUNITIES;
				response.setContentType("application/json");
			    PrintWriter out = response.getWriter();
			    JSONSerializer json = new JSONSerializer();
			    try {
			    	String data = json.serialize(det.getAllOpportunity());
			        out.println("{ \"data\": "+ data + "}");
			    } finally {
			        out.close();
			    }
			}
			else if(action.equalsIgnoreCase("list_customers")){
				response.setContentType("application/json");
			    PrintWriter out = response.getWriter();
			    JSONSerializer json = new JSONSerializer();
			    try {
			    	String data = json.serialize(det.getAllCustomers());
			        out.println(data);
			    } finally {
			        out.close();
			    }
			}
			else if(action.equalsIgnoreCase("list_services")){
				response.setContentType("application/json");
			    PrintWriter out = response.getWriter();
			    JSONSerializer json = new JSONSerializer();
			    try {
			    	String data = json.serialize(det.getAllServices());
			        out.println(data);
			    } finally {
			        out.close();
			    }
			}
		}
		catch (Exception ex) {
			PrintWriter out = response.getWriter();
			out.println(ex);
		}
	}
    @Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		OpportunityModel opportunity = new OpportunityModel();
		opportunity.setIDCustomer(Integer.parseInt(request.getParameter("new_record_customer")));
		opportunity.setIDService(Integer.parseInt(request.getParameter("new_record_service")));
		opportunity.setCost(request.getParameter( "new_record_amount" ));
		opportunity.setProbability(Float.parseFloat(request.getParameter( "new_record_probability" )));
		opportunity.setDescription(request.getParameter( "new_record_description" ));
		String timeTentative = request.getParameter( "new_record_date" ).replace("-", "");
		opportunity.setIDTimeTentative(Integer.parseInt(timeTentative));
		/*Fecha Inicial*/
		String recordDateStart = request.getParameter( "new_record_date_start" ).replace("-", "");
		if(recordDateStart != null && !recordDateStart.isEmpty()){
			opportunity.setIDTimeStart(Integer.parseInt(recordDateStart));
		}
		/*Fecha final*/
		String recordDateEnd = request.getParameter( "new_record_date_end" ).replace("-", "");
		if(recordDateEnd != null && !recordDateEnd.isEmpty()){
			opportunity.setIDTimeEnd(Integer.parseInt(recordDateEnd));
		}
		String opportunityId = request.getParameter("new_record_id");
		
		if( opportunityId == null || opportunityId.isEmpty()) 
			det.addOpportunity(opportunity);
		else {
			opportunity.setIDUpCrossSelling( Integer.parseInt(opportunityId) );
			det.updateOpportunity(opportunity);
		}
		request.setAttribute("opportunities", det.getAllOpportunity());
		response.sendRedirect(LIST_OPPORTUNITIES);
	}
}