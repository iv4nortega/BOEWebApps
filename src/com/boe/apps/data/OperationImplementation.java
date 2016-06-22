package com.boe.apps.data;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.boe.apps.models.*;
import com.boe.apps.util.DBUtil;

public class OperationImplementation implements OperationData {

	private Connection conn;
	
	public OperationImplementation(){
		conn = DBUtil.getConnection();
	}
	@Override
	public List<OperationModel> getAllOperations(int idSDM) throws SQLException{
		List<OperationModel> operations = new ArrayList<OperationModel>();
		String query = "SELECT OperationTops.*, SDMs.SDMShortName, customer.CName "+
				"FROM F_Operation_TOP  as OperationTops "+
				"INNER JOIN D_SDMs as SDMs "+
				"ON SDMs.IDSDM = OperationTops.IDSDM "+
				"INNER JOIN D_Customer as customer "+ 
				"ON customer.IDCustomer = OperationTops.IDCustomer "+
				  "WHERE SDMs.IDSDM = ?";
		PreparedStatement preparedStatement = conn.prepareStatement(query);
		preparedStatement.setInt(1, idSDM);
		ResultSet resultSet = preparedStatement.executeQuery();
		//ResultSet resultSet = statement.executeQuery(query  + idSDM );
		while( resultSet.next() ) {
			OperationModel operation = new OperationModel();
			operation.setIDOperationTop( resultSet.getInt("IDOperationTop") );
			operation.setIDSDM(Integer.parseInt(resultSet.getString("IDSDM" )));
			operation.setTimeId(Integer.parseInt(resultSet.getString("IDTime" )));
			operation.setProcessName(resultSet.getString("ProcessName" ));
			operation.setCustomerId(Integer.parseInt(resultSet.getString("IDCustomer" )));
			operation.setDescription(resultSet.getString("Description" ));
			operation.setQuantity(Integer.parseInt(resultSet.getString("Quantity" )));
			operation.setSDMName(resultSet.getString("SDMShortName" ));
			operation.setCustomerName(resultSet.getString("CName" ));
			operations.add(operation);
		}
		resultSet.close();
		preparedStatement.close();
		return operations;
	}
	@Override
	public OperationModel getOperationById(int operationId) throws SQLException {
		OperationModel operation = new OperationModel();
		String query = "SELECT * FROM F_Operation_TOP WHERE IDOperationTop =?";
		PreparedStatement preparedStatement = conn.prepareStatement(query);
		preparedStatement.setInt(1, operationId);
		ResultSet resultSet= preparedStatement.executeQuery();
		
		while(resultSet.next()){
			operation.setIDOperationTop(resultSet.getInt("IDOperationTop"));
			operation.setIDSDM(resultSet.getInt("IDSDM"));
			operation.setTimeId(resultSet.getInt("IDTime"));
			operation.setProcessName(resultSet.getString("ProcessName"));
			operation.setCustomerId(resultSet.getInt("IDCustomer"));
			operation.setDescription(resultSet.getString("Description"));
			operation.setQuantity(resultSet.getInt("Quantity"));
		}
		resultSet.close();
		preparedStatement.close();
		return operation;
	}
	@Override
	public List<OperationModel> getProcess(int idSDM) throws SQLException
	{
		List<OperationModel> list_oper = new ArrayList<OperationModel>();
		String query = "SELECT DISTINCT ProcessName "+
				  " FROM F_Operation_TOP "+
				  //" WHERE IDSDM = ? "+
				  " ORDER BY ProcessName ASC ";
		PreparedStatement statement = conn.prepareStatement(query);
		//statement.setInt( 1, idSDM);
		ResultSet resultSet = statement.executeQuery();
		while(resultSet.next()){
			OperationModel op = new OperationModel();
			op.setProcessName(resultSet.getString("ProcessName"));
			list_oper.add(op);
		}
		resultSet.close();
		statement.close();
		return list_oper;
	}
	@Override
	public void createOperation(OperationModel operation) throws SQLException {
		String query = "INSERT INTO F_Operation_TOP (IDSDM, IDTime, ProcessName, IDCustomer, Description,"+ 
				"Quantity) values (?,?,?,?,?,?)";
		PreparedStatement preparedStatement = conn.prepareStatement(query);
		preparedStatement.setInt( 1, operation.getIDSDM());
		preparedStatement.setInt(2, operation.getTimeId());
		preparedStatement.setString( 3, operation.getProcessName() );
		preparedStatement.setInt( 4, operation.getCustomerId() );
		preparedStatement.setString( 5, operation.getDescription() );
		preparedStatement.setInt( 6, operation.getQuantity());
		preparedStatement.executeUpdate();
		preparedStatement.close();
	}
	@Override
	public void updateOperation(OperationModel operation) throws SQLException {
		String query = "UPDATE F_Operation_TOP SET IDSDM = ?, IDTime = ?, ProcessName= ?, IDCustomer=?, Description=?,"+ 
				"Quantity=? WHERE IDOperationTop = ?";
		PreparedStatement preparedStatement = conn.prepareStatement(query);
		preparedStatement.setInt( 1, operation.getIDSDM());
		preparedStatement.setInt(2, operation.getTimeId());
		preparedStatement.setString( 3, operation.getProcessName() );
		preparedStatement.setInt( 4, operation.getCustomerId() );
		preparedStatement.setString( 5, operation.getDescription() );
		preparedStatement.setInt( 6, operation.getQuantity());
		preparedStatement.setInt( 7, operation.getIDOperationTop());
		preparedStatement.executeUpdate();
		preparedStatement.close();
	}
	@Override
	public List<QuartersModel> getQuarters() throws SQLException {
		List<QuartersModel> quarters = new ArrayList<QuartersModel>();
			Statement statement = DBUtil.VerifyConnection(conn);
			ResultSet resultSet = statement.executeQuery("SELECT TOP 4 D_Time.Year, D_Time.Quarter, Max(D_Time.IDTime) IDTime "+
			"From D_Time "+
			"Where D_Time.Date BETWEEN DATEADD ( MONTH, -6,  GETDATE()) and DATEADD ( MONTH, 6,  GETDATE() ) "+
			"Group By D_Time.Year, D_Time.Quarter "+
			"ORDER BY 3");
			while( resultSet.next() ) {
				QuartersModel quarter = new QuartersModel();
				quarter.setYear( resultSet.getInt("Year") );
				quarter.setQuarter(Integer.parseInt(resultSet.getString("Quarter" )));
				quarter.setIdTime(Integer.parseInt(resultSet.getString("IDTime" )));
				quarters.add(quarter);
			}
			resultSet.close();
			statement.close();
			return quarters;
	}
}
