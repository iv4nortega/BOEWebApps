package com.finance.data;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import java.sql.PreparedStatement;

import com.finance.models.*;
import com.finance.util.DBUtil;


public class OpportunityImplementation implements OpportunityData {
	
	private Connection conn;

	public OpportunityImplementation() {
		conn = DBUtil.getConnection();
	}
	/*
	 * Obtiene el listado de oportunidades para mostrarse en el listado
	 * */
	@Override
	public List<OpportunityModel> getAllOpportunity() {
		List<OpportunityModel> opportunities = new ArrayList<OpportunityModel>();
		try {
			Statement statement = conn.createStatement();
			ResultSet resultSet = statement.executeQuery( "SELECT Opp.*,"+ 
				  "Customers.CName as CustomerName,"+ 
				  "Services.Name as ServiceName,"+
				  "TimeStart.[Date] as DateStart,"+
				  "TimeEnd.[Date] as DateEnd,"+
				  "TimeTentative.[Date] as DateTentative " +
			"FROM Oportunity as Opp "+ 
				"INNER JOIN D_Customer as Customers " +
				"ON Opp.IDCustomer = Customers.IDCustomer "+
					"INNER JOIN Cat_Services as Services "+
					"ON Opp.IDService = Services.IDService "+
						"LEFT JOIN D_Time as TimeStart ON Opp.IDTimeStart = TimeStart.IDTime " +
						"LEFT JOIN D_Time as TimeEnd ON Opp.IDTimeEnd = TimeEnd.IDTime " +
						"LEFT JOIN D_Time as TimeTentative ON Opp.IDTimeTentative = TimeTentative.IDTime");
			while( resultSet.next() ) {
				OpportunityModel opportunity = new OpportunityModel();
				opportunity.setIDUpCrossSelling( resultSet.getInt("IDUpCrossSelling" ));
				opportunity.setServiceName( resultSet.getString("ServiceName") );
				opportunity.setCustomerName( resultSet.getString("CustomerName") );
				opportunity.setCost(resultSet.getString("Cost"));
				opportunity.setTimeStart( resultSet.getString("DateStart") );
				opportunity.setTimeEnd( resultSet.getString("DateEnd"));
				opportunity.setTimeTentative( resultSet.getString("DateTentative"));
				opportunity.setProbability( resultSet.getFloat("Probability"));
				opportunity.setDescription( resultSet.getString("Description"));
				opportunities.add(opportunity);
			}
			resultSet.close();
			statement.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return opportunities;
	}
	/*
	 * Obtiene los datos del registro seleccionado
	 * */
	@Override
	public OpportunityModel getOpportunityById(int idUpCrossSelling) {
		OpportunityModel opportunity = new OpportunityModel();
		try {
			String query = "SELECT * FROM FinanceDB_Dev.dbo.Oportunity WHERE IDUpCrossSelling=?";
			PreparedStatement preparedStatement = conn.prepareStatement( query );
			preparedStatement.setInt(1, idUpCrossSelling);
			ResultSet resultSet = preparedStatement.executeQuery();
			while( resultSet.next() ) {
				opportunity.setIDUpCrossSelling( resultSet.getInt("IDUpCrossSelling" ));
				opportunity.setIDService( resultSet.getInt( "IDService" ) );
				opportunity.setIDCustomer( resultSet.getInt( "IDCustomer" ) );
				opportunity.setCost(resultSet.getString("Cost"));
				opportunity.setIDTimeStart( resultSet.getInt( "IDTimeStart" ) );
				opportunity.setIDTimeEnd( resultSet.getInt( "IDTimeEnd" ));
				opportunity.setIDTimeTentative( resultSet.getInt( "IDTimeTentative" ));
				opportunity.setProbability( resultSet.getFloat( "Probability" ));
				opportunity.setDescription( resultSet.getString( "Description" ));
			}
			resultSet.close();
			preparedStatement.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return opportunity;
	}
	@Override
	public void addOpportunity(OpportunityModel opportunity) {
		try {
			String query = "INSERT INTO Oportunity (IDCustomer, IDService, Cost, Probability,"+ 
					"Description, IDTimeStart, IDTimeEnd, IDTimeTentative ) values (?,?,?,?,?,?,?,?)";
			PreparedStatement preparedStatement = conn.prepareStatement( query );
			preparedStatement.setInt( 1, opportunity.getIDCustomer());
			preparedStatement.setInt( 2, opportunity.getIDService() );
			preparedStatement.setString( 3, opportunity.getCost() );
			preparedStatement.setFloat( 4, opportunity.getProbability());
			preparedStatement.setString( 5, opportunity.getDescription());
			preparedStatement.setInt( 8, opportunity.getIDTimeTentative());
			preparedStatement.setObject( 6, (opportunity.getIDTimeStart() != 0 ) ? opportunity.getIDTimeStart(): null);
			preparedStatement.setObject( 7, (opportunity.getIDTimeEnd() != 0) ? opportunity.getIDTimeEnd() : null);
			preparedStatement.executeUpdate();
			preparedStatement.close();
		} catch (SQLException e){
			e.printStackTrace();
		}
	}
	@Override
	public void deleteOpportunity( int opportunityId ) {
		try {
			String query = "DELETE FROM Oportunity WHERE IDUpCrossSelling = ?";
			PreparedStatement preparedStatement = conn.prepareStatement(query);
			preparedStatement.setInt(1, opportunityId);
			preparedStatement.executeUpdate();
			preparedStatement.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	@Override
	public void updateOpportunity( OpportunityModel opportunity ) {
		try {
			String query = "UPDATE Oportunity SET Description=?, Cost=?, IDService=?, IDCustomer=?, IDTimeTentative=?, IDTimeStart=?, IDTimeEnd=?, Probability=? "+
					"WHERE IDUpCrossSelling=?";
			PreparedStatement preparedStatement = conn.prepareStatement( query );
			preparedStatement.setString( 1, opportunity.getDescription());
			preparedStatement.setString( 2, opportunity.getCost());
			preparedStatement.setInt( 3, opportunity.getIDService());
			preparedStatement.setInt( 4, opportunity.getIDCustomer() );
			preparedStatement.setInt( 5, opportunity.getIDTimeTentative());
			preparedStatement.setObject( 6, (opportunity.getIDTimeStart() != 0 ) ? opportunity.getIDTimeStart(): null);
			preparedStatement.setObject( 7, (opportunity.getIDTimeEnd() != 0) ? opportunity.getIDTimeEnd() : null);
			preparedStatement.setFloat( 8, opportunity.getProbability());
			preparedStatement.setInt( 9, opportunity.getIDUpCrossSelling());
			preparedStatement.executeUpdate();
			preparedStatement.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	@Override
	public List<CustomerModel> getAllCustomers() {
		List<CustomerModel> customers = new ArrayList<CustomerModel>();
		try {
			Statement statement = conn.createStatement();
			ResultSet resultSet = statement.executeQuery( "SELECT * FROM D_Customer" );
			while( resultSet.next() ) {
				CustomerModel customer = new CustomerModel();
				customer.setCustomerId( resultSet.getInt("IDCustomer") );
				customer.setCustomerName( resultSet.getString("CName" ));
				customers.add(customer);
			}
			resultSet.close();
			statement.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return customers;
	}
	@Override
	public List<ServiceModel> getAllServices() {
		List<ServiceModel> services = new ArrayList<ServiceModel>();
		try {
			Statement statement = conn.createStatement();
			ResultSet resultSet = statement.executeQuery( "SELECT * FROM Cat_Services" );
			while( resultSet.next() ) {
				ServiceModel service = new ServiceModel();
				service.setServiceId( resultSet.getInt("IDService") );
				service.setServiceName( resultSet.getString("Name" ));
				services.add(service);
			}
			resultSet.close();
			statement.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return services;
	}
}