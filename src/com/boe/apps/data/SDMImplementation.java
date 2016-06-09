package com.boe.apps.data;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import com.boe.apps.models.UserBOEModel;
import com.boe.apps.util.DBUtil;

public class SDMImplementation implements SDMData{

	private Connection conn;

	public SDMImplementation() {
		conn = DBUtil.getConnection();
	}

	@Override
	public UserBOEModel getUserProfile(String userLogin) throws SQLException{
		Statement statement = DBUtil.VerifyConnection(conn);
		ResultSet resultSet = statement.executeQuery("SELECT * FROM D_SDMs WHERE SDMBOEFullName='"+ userLogin + "'");
		UserBOEModel user = new UserBOEModel();
		while( resultSet.next() ) {
			user.setIDSDM( resultSet.getInt("IDSDM") );
			user.setSDMName( resultSet.getString("SDMName" ));
			user.setSDMUserName( resultSet.getString("SDMUserName" ));
			user.setSDMProfile( resultSet.getString("SDMProfile" ));
			user.setSDMBOEFullName( resultSet.getString("SDMBOEFullName" ));
		}
		resultSet.close();
		statement.close();
		return user;
	}
}
