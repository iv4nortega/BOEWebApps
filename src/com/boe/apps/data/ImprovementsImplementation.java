package com.boe.apps.data;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.boe.apps.models.ImprovementsModel;
import com.boe.apps.util.DBUtil;
import com.boe.apps.util.ListItem;

public class ImprovementsImplementation implements ImprovementsData {
	
	private Connection conn;
	
	public ImprovementsImplementation(){
		conn = DBUtil.getConnection();
	}
	@Override
	public List<ImprovementsModel> getImprovements(String user_boe) throws SQLException {
		List<ImprovementsModel> improvements = new ArrayList<ImprovementsModel>();
		String query = "SELECT DISTINCT improvements.* "+
			  "FROM F_Improvements as improvements "+
			  "INNER JOIN D_SDMs as sdm "+
			  "ON sdm.IDSDM = improvements.IDSDM "+
			  "WHERE sdm.SDMBOEFullName =?";
		PreparedStatement preparedStatement = conn.prepareStatement(query);
		preparedStatement.setString(1, user_boe);
		ResultSet resultSet = preparedStatement.executeQuery();
		while( resultSet.next() ) {
			ImprovementsModel improvement = new ImprovementsModel();
			improvement.setIDImprovement( resultSet.getInt("IDImprovement") );
			improvement.setTimeId(Integer.parseInt(resultSet.getString("IDTime" )));
			improvement.setCustomerId(Integer.parseInt(resultSet.getString("IDCustomer" )));
			improvement.setIDSDM(Integer.parseInt(resultSet.getString("IDSDM" )));
			improvement.setTypeImprovement(resultSet.getString("Type" ));
			improvement.setDescription(resultSet.getString("Description" ));
			improvements.add(improvement);
		}
		resultSet.close();
		preparedStatement.close();
		return improvements;
	}
	@Override
	public List<ListItem> getTypeImprovements(String userboe) throws SQLException{
		List<ListItem> improvements = new ArrayList<ListItem>();
		String query = "SELECT DISTINCT Type "+
			  "FROM F_Improvements as improvements ";
//			  "INNER JOIN D_SDMs as sdm "+
//			  "ON sdm.IDSDM = improvements.IDSDM "+
//			  "WHERE sdm.SDMBOEFullName =?";
		PreparedStatement preparedStatement = conn.prepareStatement(query);
//		preparedStatement.setString(1, userboe);
		ResultSet resultSet = preparedStatement.executeQuery();
		while( resultSet.next() ) {
			ListItem improvement = new ListItem();
			improvement.setText(resultSet.getString("Type"));
			improvements.add(improvement);
		}
		resultSet.close();
		preparedStatement.close();
		return improvements;
	}
	@Override
	public ImprovementsModel getOperationById(int improvementId) throws SQLException {
		ImprovementsModel improvement = new ImprovementsModel();
		String query = "SELECT * FROM F_Improvements WHERE IDImprovement =?";
		PreparedStatement preparedStatement = conn.prepareStatement(query);
		preparedStatement.setInt(1, improvementId);
		ResultSet resultSet= preparedStatement.executeQuery();
		while(resultSet.next()){
			improvement.setIDImprovement( resultSet.getInt("IDImprovement") );
			improvement.setTimeId(Integer.parseInt(resultSet.getString("IDTime" )));
			improvement.setCustomerId(Integer.parseInt(resultSet.getString("IDCustomer" )));
			improvement.setIDSDM(Integer.parseInt(resultSet.getString("IDSDM" )));
			improvement.setTypeImprovement(resultSet.getString("Type" ));
			improvement.setDescription(resultSet.getString("Description" ));
		}
		resultSet.close();
		preparedStatement.close();
		return improvement;
	}
	@Override
	public void createImprovement(ImprovementsModel improvement) throws SQLException{
		String query = "INSERT INTO F_Improvements(IDSDM, IDTime, Type, IDCustomer, Description) values (?,?,?,?,?)";
		PreparedStatement preparedStatement = conn.prepareStatement(query);
		preparedStatement.setInt( 1, improvement.getIDSDM());
		preparedStatement.setInt(2, improvement.getTimeId());
		preparedStatement.setString(3, improvement.getTypeImprovement());
		preparedStatement.setInt( 4, improvement.getCustomerId() );
		preparedStatement.setString( 5, improvement.getDescription() );
		preparedStatement.executeUpdate();
		preparedStatement.close();
	}
	@Override
	public void updateImprovement(ImprovementsModel improvement) throws SQLException {
		String query = "UPDATE F_Improvements SET IDSDM = ?, IDTime = ?, Type= ?, IDCustomer=?, Description=?"
				+ " WHERE IDImprovement = ?";
		PreparedStatement preparedStatement = conn.prepareStatement(query);
		preparedStatement.setInt( 1, improvement.getIDSDM());
		preparedStatement.setInt(2, improvement.getTimeId());
		preparedStatement.setString(3, improvement.getTypeImprovement());
		preparedStatement.setInt( 4, improvement.getCustomerId() );
		preparedStatement.setString( 5, improvement.getDescription() );
		preparedStatement.setInt( 6, improvement.getIDImprovement() );
		preparedStatement.executeUpdate();
		preparedStatement.close();
	}
}
