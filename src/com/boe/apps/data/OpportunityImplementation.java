package com.boe.apps.data;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Calendar;
import java.sql.Timestamp;
import java.util.List;


import java.sql.PreparedStatement;

import com.boe.apps.models.*;
import com.boe.apps.util.DBUtil;


public class OpportunityImplementation implements OpportunityData {
	
	private Connection conn;

	public OpportunityImplementation() {
		conn = DBUtil.getConnection();
	}
	/*
	 * Verifica si la conexión esta cerrada para volver a crearla
	 */
	private Statement VerifyConnection(Connection connection) throws SQLException {
		Statement statement = connection.createStatement();
		try{
			if(connection.isClosed()){
				connection = null;
				connection = DBUtil.getConnection();
			}
			else{
				return statement;
			}
		}
		catch (Exception ex){
			ex.printStackTrace();
		}
		return statement;
	}
	/*
	 * Obtiene el listado de oportunidades para mostrarse en el listado
	 * */
	@Override
	public List<OpportunityModel> getAllOpportunity() throws SQLException {
		List<OpportunityModel> opportunities = new ArrayList<OpportunityModel>();
		Statement statement = VerifyConnection(conn);
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
			opportunity.setType( resultSet.getString("Type"));
			opportunities.add(opportunity);
		}
		resultSet.close();
		statement.close();
		return opportunities;
	}
	/*
	 * Obtiene el listado de oportunidades para mostrarse en el listado
	 * */
	@Override
	public List<CommentsModel> getComments(int idComment) {
		List<CommentsModel> notesmodel = new ArrayList<CommentsModel>();
		try {
			String query = "SELECT * FROM Notes WHERE IDParentItem =? ORDER BY Timestamp DESC";
			PreparedStatement statement = conn.prepareStatement( query );
			statement.setInt(1, idComment);
			ResultSet resultSet = statement.executeQuery();
			while( resultSet.next() ) {
				CommentsModel notes = new CommentsModel();
				notes.setIDNote( resultSet.getInt("IDNote" ));
				notes.setIDTableName(resultSet.getString("ID_TABLE_NAME" ));
				notes.setNote( resultSet.getString("Note" ));
				notes.setAddedBy( resultSet.getString("AddedBy" ));
				notes.setIDParentItem( Integer.parseInt(resultSet.getString("IDParentItem" )));
				notesmodel.add(notes);
			}
			resultSet.close();
			statement.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return notesmodel;
	}
	/*
	 * Obtiene los datos del registro seleccionado
	 * */
	@Override
	public OpportunityModel getOpportunityById(int idUpCrossSelling) throws SQLException {
		OpportunityModel opportunity = new OpportunityModel();
		String query = "SELECT * FROM Oportunity WHERE IDUpCrossSelling=?";
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
			opportunity.setType( resultSet.getString( "Type" ));
		}
		resultSet.close();
		preparedStatement.close();
		return opportunity;
	}
	@Override
	public void addOpportunity(OpportunityModel opportunity) throws SQLException {
		String query = "INSERT INTO Oportunity (IDCustomer, IDService, Cost, Probability,"+ 
				"Description, IDTimeStart, IDTimeEnd, IDTimeTentative, Type ) values (?,?,?,?,?,?,?,?,?)";
		PreparedStatement preparedStatement = conn.prepareStatement( query );
		preparedStatement.setInt( 1, opportunity.getIDCustomer());
		preparedStatement.setInt( 2, opportunity.getIDService() );
		preparedStatement.setString( 3, opportunity.getCost() );
		preparedStatement.setFloat( 4, opportunity.getProbability());
		preparedStatement.setString( 5, opportunity.getDescription());
		preparedStatement.setObject( 6, (opportunity.getIDTimeStart() != 0 ) ? opportunity.getIDTimeStart(): null);
		preparedStatement.setObject( 7, (opportunity.getIDTimeEnd() != 0) ? opportunity.getIDTimeEnd() : null);
		preparedStatement.setInt( 8, opportunity.getIDTimeTentative());
		preparedStatement.setString( 9, opportunity.getType());
		preparedStatement.executeUpdate();
		preparedStatement.close();
	}
	@Override
	public void addComments(CommentsModel comments) throws SQLException{
			String query = "INSERT INTO Notes (IDParentItem, ID_TABLE_NAME, Note, Timestamp,"+ 
					"AddedBy) values (?,?,?,?,?)";
			PreparedStatement preparedStatement = conn.prepareStatement(query);
			preparedStatement.setInt( 1, comments.getIDParentItem());
			preparedStatement.setString( 2, comments.getIDTableName() );
			preparedStatement.setString( 3, comments.getNote() );
			Timestamp date = new Timestamp(Calendar.getInstance().getTime().getTime());
			preparedStatement.setTimestamp(4, date);
			preparedStatement.setString( 5, comments.getAddedBy());
			preparedStatement.executeUpdate();
			preparedStatement.close();
	}
	@Override
	public void deleteOpportunity( int opportunityId ) throws SQLException {
			String query = "DELETE FROM Oportunity WHERE IDUpCrossSelling = ?";
			PreparedStatement preparedStatement = conn.prepareStatement(query);
			preparedStatement.setInt(1, opportunityId);
			preparedStatement.executeUpdate();
			preparedStatement.close();
	}
	@Override
	public void deleteComment( int commentId ) throws SQLException {
			String query = "DELETE FROM Notes WHERE IDNote = ?";
			PreparedStatement preparedStatement = conn.prepareStatement(query);
			preparedStatement.setInt(1, commentId);
			preparedStatement.executeUpdate();
			preparedStatement.close();
	}
	@Override
	public void updateOpportunity( OpportunityModel opportunity ) throws SQLException {
			String query = "UPDATE Oportunity SET Description=?, Cost=?, IDService=?,IDCustomer=?, "+
					"IDTimeTentative=?, IDTimeStart=?, IDTimeEnd=?, Probability=?, Type=? "+
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
			preparedStatement.setString( 9, opportunity.getType());
			preparedStatement.setInt( 10, opportunity.getIDUpCrossSelling());
			preparedStatement.executeUpdate();
			preparedStatement.close();
	}
	@Override
	public List<CustomerModel> getAllCustomers() throws SQLException {
		List<CustomerModel> customers = new ArrayList<CustomerModel>();
		Statement statement = VerifyConnection(conn);
		ResultSet resultSet = statement.executeQuery( "SELECT * FROM D_Customer" );
		while( resultSet.next() ) {
			CustomerModel customer = new CustomerModel();
			customer.setCustomerId( resultSet.getInt("IDCustomer") );
			customer.setCustomerName( resultSet.getString("CName" ));
			customers.add(customer);
		}
		resultSet.close();
		statement.close();
		return customers;
	}
	@Override
	public List<ServiceModel> getAllServices() throws SQLException {
		List<ServiceModel> services = new ArrayList<ServiceModel>();
		Statement statement = VerifyConnection(conn);
		ResultSet resultSet = statement.executeQuery( "SELECT * FROM Cat_Services" );
		while( resultSet.next() ) {
			ServiceModel service = new ServiceModel();
			service.setServiceId( resultSet.getInt("IDService") );
			service.setServiceName( resultSet.getString("Name" ));
			services.add(service);
		}
		resultSet.close();
		statement.close();
		return services;
	}
}