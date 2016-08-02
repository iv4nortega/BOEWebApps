package com.boe.apps.data;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.boe.apps.models.*;
import com.boe.apps.util.DBUtil;

public class FinanceImplementation implements FinanceData {
	private Connection conn;
	
	public FinanceImplementation(){
		conn = DBUtil.getConnection();
	}

	@Override
	public List<FinanceModel> getFinance(String userboe, int periodimp, String typeimp, int customerimp) throws SQLException{
		List<FinanceModel> financeList = new ArrayList<FinanceModel>();
		String query = "DECLARE @UserBOE VARCHAR(250) = ? " +
		"SELECT DISTINCT a.* "+
		 "FROM Finance AS a "+
		 "INNER JOIN D_SDMs AS b ON b.IDSDM = a.IDSDM "+
		 "WHERE a.IDTime = ? "+
	        "AND a.[Type] = ? "+
	        "AND a.IDCustomer = ? "+
	        "AND b.SDMBOEFullName = CASE "+
		    "WHEN (SELECT SDMProfile FROM D_SDMs "+
		          "WHERE SDMBOEFullName = @UserBOE) = 'VIP' "+
		    "THEN b.SDMBOEFullName "+
		    "ELSE @UserBOE "+ 
		 "END";
		PreparedStatement preparedStatement = conn.prepareStatement(query);
		preparedStatement.setString(1, userboe);
		preparedStatement.setInt(2, periodimp);
		preparedStatement.setString(3, typeimp);
		preparedStatement.setInt(4, customerimp);
		ResultSet resultSet = preparedStatement.executeQuery();
		while( resultSet.next() ) {
			FinanceModel finance = new FinanceModel();
			finance.setIDFinance( resultSet.getInt("IDFinance"));
			finance.setTimeId(Integer.parseInt(resultSet.getString("IDTime" )));
			finance.setCustomerId(Integer.parseInt(resultSet.getString("IDCustomer" )));
			finance.setIDSDM(Integer.parseInt(resultSet.getString("IDSDM" )));
			finance.setTypeFinance(resultSet.getString("Type"));
			finance.setDescription(resultSet.getString("Description" ));
			financeList.add(finance);
		}
		resultSet.close();
		preparedStatement.close();
		return financeList;
	}

	@Override
	public void createImprovement(FinanceModel finance) throws SQLException {
		String query = "INSERT INTO Finance (IDSDM, IDTime, Type, IDCustomer,Description) VALUES (?,?,?,?,?)";
		PreparedStatement preparedStatement = conn.prepareStatement(query);
		preparedStatement.setInt( 1, finance.getIDSDM());
		preparedStatement.setInt(2, finance.getTimeId());
		preparedStatement.setString(3, finance.getTypeFinance());
		preparedStatement.setInt( 4, finance.getCustomerId() );
		preparedStatement.setString( 5, finance.getDescription() );
		preparedStatement.executeUpdate();
		preparedStatement.close();
	}

	@Override
	public FinanceModel getFinanceById(int financeId) throws SQLException {
		FinanceModel finance = new FinanceModel();
		String query = "SELECT * FROM Finance WHERE IDFinance =?";
		PreparedStatement preparedStatement = conn.prepareStatement(query);
		preparedStatement.setInt(1, financeId);
		ResultSet resultSet= preparedStatement.executeQuery();
		while(resultSet.next()){
			finance.setIDFinance( resultSet.getInt("IDFinance") );
			finance.setTimeId(Integer.parseInt(resultSet.getString("IDTime" )));
			finance.setCustomerId(Integer.parseInt(resultSet.getString("IDCustomer" )));
			finance.setIDSDM(Integer.parseInt(resultSet.getString("IDSDM" )));
			finance.setTypeFinance(resultSet.getString("Type" ));
			finance.setDescription(resultSet.getString("Description" ));
		}
		resultSet.close();
		preparedStatement.close();
		return finance;
	}

	@Override
	public void updateFinance(FinanceModel finance) throws SQLException {
		String query = "UPDATE Finance SET IDTime = ?, Type= ?, IDCustomer= ?, Description = ?  WHERE IDFinance = ?";
		PreparedStatement preparedStatement = conn.prepareStatement(query);
		preparedStatement.setInt(1, finance.getTimeId());
		preparedStatement.setString(2, finance.getTypeFinance());
		preparedStatement.setInt(3, finance.getCustomerId() );
		preparedStatement.setString( 4, finance.getDescription() );
		preparedStatement.setInt( 5, finance.getIDFinance() );
		preparedStatement.executeUpdate();
		preparedStatement.close();
	}
}
