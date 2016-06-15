package com.boe.apps.data;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.boe.apps.models.ImprovementsModel;
import com.boe.apps.util.DBUtil;

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

}
