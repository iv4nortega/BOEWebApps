package com.boe.apps.data;

import java.sql.Connection;
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
		Statement statement = DBUtil.VerifyConnection(conn);
		ResultSet resultSet = statement.executeQuery( "SELECT OperationTops.*, SDMs.SDMShortName, customer.CName "+
			"FROM FinanceDB_Dev.dbo.F_Operation_TOP  as OperationTops "+
			"INNER JOIN D_SDMs as SDMs "+
			"ON SDMs.IDSDM = OperationTops.IDSDM "+
			"INNER JOIN D_Customer as customer "+ 
			"ON customer.IDCustomer = OperationTops.IDCustomer "+
			  "WHERE SDMs.IDSDM = " + idSDM );
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
		statement.close();
		return operations;
	}
	@Override
	public void createOperation(OperationModel operation) throws SQLException {
		// TODO Auto-generated method stub
		
	}
	@Override
	public void updateOperation(OperationModel operation) throws SQLException {
		// TODO Auto-generated method stub
		
	}
}
