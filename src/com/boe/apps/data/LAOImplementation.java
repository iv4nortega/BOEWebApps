package com.boe.apps.data;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import java.sql.PreparedStatement;

import com.boe.apps.models.*;
import com.boe.apps.util.DBUtil;
import com.boe.apps.util.ListItem;


public class LAOImplementation implements LAOData {
	
	private Connection conn;

	public LAOImplementation() {
		conn = DBUtil.getConnection();
	}
	/*
	 * Obtiene el listado de oportunidades para mostrarse en el listado
	 * */
	@Override
	public List<LAOModel> getLAORecords(String userLogin) {
		List<LAOModel> laomodel = new ArrayList<LAOModel>();
		try {
			Statement statement = DBUtil.VerifyConnection(conn);
			ResultSet resultSet = statement.executeQuery("DECLARE @BOEUser varchar(250) " +
			"SET @BOEUser = '"+ userLogin + "' " +
			"DECLARE @BOEProfile varchar(250) " +
			"SELECT  @BOEProfile = SDMProfile " +
			"FROM    D_SDMs " +
				"WHERE   SDMBOEFullName = @BOEUser " +
			"IF  @BOEProfile = 'VIP' " + 
			      "SELECT lao.*, Customer.CName as CustomerName, " +
			        "DetectionTime.[Date] as DetectionDate, " +
			        "PlannedTime.[Date] as PlannedDate, " +
			        "RealTime.[Date] as RealDate, " +
			        "CloseTime.[Date] as CloseDate, " +
			        "SDMs.SDMUserName as SDMUser, " +
			        "SDMs.SDMShortName as SDMName " +
			      "FROM LAO as lao " +
			        "INNER JOIN D_Customer as Customer ON lao.IDCustomer = Customer.IDCustomer " + 
			        "INNER JOIN D_SDMs as SDMs ON lao.IDSDM = SDMs.IDSDM " +
			          "LEFT JOIN D_Time as DetectionTime ON lao.IDDetectionTime = DetectionTime.IDTime " + 
			          "LEFT JOIN D_Time as PlannedTime ON lao.IDPlannedTime = PlannedTime.IDTime " +
			          "LEFT JOIN D_Time as RealTime ON lao.IDRealTime = RealTime.IDTime " +
			          "LEFT JOIN D_Time as CloseTime ON lao.IDCloseTime = CloseTime.IDTime " +
			"ELSE " +
			      "SELECT lao.*, Customer.CName as CustomerName, " +
			        "DetectionTime.[Date] as DetectionDate, " +
			        "PlannedTime.[Date] as PlannedDate, " +
			        "RealTime.[Date] as RealDate, " +
			        "CloseTime.[Date] as CloseDate, " +
			        "SDMs.SDMUserName as SDMUser, " +
			        "SDMs.SDMShortName as SDMName " +
			      "FROM LAO as lao " +
			        "INNER JOIN D_Customer as Customer ON lao.IDCustomer = Customer.IDCustomer " + 
			        "INNER JOIN D_SDMs as SDMs ON lao.IDSDM = SDMs.IDSDM " +
			          "LEFT JOIN D_Time as DetectionTime ON lao.IDDetectionTime = DetectionTime.IDTime " + 
			          "LEFT JOIN D_Time as PlannedTime ON lao.IDPlannedTime = PlannedTime.IDTime " +
			          "LEFT JOIN D_Time as RealTime ON lao.IDRealTime = RealTime.IDTime " +
			          "LEFT JOIN D_Time as CloseTime ON lao.IDCloseTime = CloseTime.IDTime " +
			      "where SDMs.SDMBOEFullName = @BOEUser");
			while( resultSet.next() ) {
				LAOModel lao = new LAOModel();
				lao.setIDLAO( resultSet.getInt("IDLAO" ));
				lao.setIDSDM( resultSet.getInt("IDSDM" ));
				lao.setSDMUserName( resultSet.getString("SDMUser" ));
				lao.setSDMShortName( resultSet.getString("SDMName" ));
				lao.setCustomerName( resultSet.getString("CustomerName") );
				lao.setDetectionDate(resultSet.getString("DetectionDate"));
				lao.setPlannedDate(resultSet.getString("PlannedDate"));
				lao.setRealDate(resultSet.getString("RealDate"));
				lao.setCloseDate(resultSet.getString("CloseDate"));
				lao.setSubject( resultSet.getString("Subject") );
				lao.setComments( resultSet.getString("Comments") );
				lao.setStatus( resultSet.getString("Status") );
				lao.setIDCustomer(resultSet.getInt("IDCustomer"));
				laomodel.add(lao);
			}
			resultSet.close();
			statement.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return laomodel;
	}
	/*
	 * Obtiene el listado de oportunidades para mostrarse en el listado
	 * */
	@Override
	public List<CommentsModel> getLAONotes(int laoId) {
		List<CommentsModel> notesmodel = new ArrayList<CommentsModel>();
		try {
			String query = "SELECT * FROM Notes WHERE IDParentItem =?";
			PreparedStatement statement = conn.prepareStatement( query );
			statement.setInt(1, laoId);
			ResultSet resultSet = statement.executeQuery();
			while( resultSet.next() ) {
				CommentsModel notes = new CommentsModel();
				notes.setIDNote( resultSet.getInt("IDNote" ));
				notes.setIDTableName(resultSet.getString("ID_TABLE_NAME" ));
				notes.setNote( resultSet.getString("Note" ));
				notes.setAddedBy( resultSet.getString("AddedBy" ));
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
	public LAOModel getLAOById(int idLAO) throws SQLException {
		LAOModel lao = new LAOModel();
		String query = "SELECT * FROM LAO WHERE IDLAO=?";
		PreparedStatement preparedStatement = conn.prepareStatement( query );
		preparedStatement.setInt(1, idLAO);
		ResultSet resultSet = preparedStatement.executeQuery();
		while( resultSet.next() ) {
			lao.setIDLAO( resultSet.getInt("IDLAO" ));
			lao.setIDSDM( resultSet.getInt("IDSDM" ));
			lao.setIDCustomer(resultSet.getInt("IDCustomer"));
			lao.setIDDetectionTime(resultSet.getInt("IDDetectionTime") );
			lao.setIDPlannedTime(resultSet.getInt("IDPlannedTime") );
			lao.setIDRealTime(resultSet.getInt("IDRealTime") );
			lao.setIDCloseTime(resultSet.getInt("IDCloseTime") );
			lao.setSubject(resultSet.getString("Subject") );
			lao.setComments(resultSet.getString("Comments") );
			lao.setStatus(resultSet.getString("Status") );
		}
		resultSet.close();
		preparedStatement.close();
		return lao; 
	}
	@Override
	public void addLAO(LAOModel lao) throws SQLException {
			String query = "INSERT INTO LAO (IDSDM, IDCustomer, IDDetectionTime, IDPlannedTime,"+ 
					"IDRealTime, IDCloseTime, Subject, Comments, Status ) values (?,?,?,?,?,?,?,?,?)";
			PreparedStatement preparedStatement = conn.prepareStatement( query );
			preparedStatement.setInt( 1, lao.getIDSDM());
			preparedStatement.setInt( 2, lao.getIDCustomer() );
			preparedStatement.setInt( 3, lao.getIDDetectionTime() );
			preparedStatement.setObject( 4, (lao.getIDPlannedTime() != 0) ? lao.getIDPlannedTime() : null);
			preparedStatement.setObject( 5, (lao.getIDRealTime() != 0) ? lao.getIDRealTime() : null);
			preparedStatement.setObject( 6, (lao.getIDCloseTime() != 0) ? lao.getIDCloseTime() : null);
			preparedStatement.setString(7, lao.getSubject());
			preparedStatement.setString(8, lao.getComments());
			preparedStatement.setString(9, lao.getStatus());
			preparedStatement.executeUpdate();
			preparedStatement.close();
	}
	@Override
	public void deleteLAO( int laoId ) {
		try {
			String query = "DELETE FROM Oportunity WHERE IDUpCrossSelling = ?";
			PreparedStatement preparedStatement = conn.prepareStatement(query);
			preparedStatement.setInt(1, laoId);
			preparedStatement.executeUpdate();
			preparedStatement.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	@Override
	public void updateLAO( LAOModel lao ) {
		try {
			String query = "UPDATE LAO SET IDSDM=?, IDCustomer=?, IDDetectionTime=?, IDPlannedTime=?, "+ 
					"IDRealTime=?, IDCloseTime=?, Subject=?, Comments=? , Status =? "+
					"WHERE IDLAO=?";
			PreparedStatement preparedStatement = conn.prepareStatement( query );
			preparedStatement.setInt( 1, lao.getIDSDM());
			preparedStatement.setInt( 2, lao.getIDCustomer() );
			preparedStatement.setInt( 3, lao.getIDDetectionTime() );
			preparedStatement.setObject( 4, (lao.getIDPlannedTime() != 0) ? lao.getIDPlannedTime() : null);
			preparedStatement.setObject( 5, (lao.getIDRealTime() != 0) ? lao.getIDRealTime() : null);
			preparedStatement.setObject( 6, (lao.getIDCloseTime() != 0) ? lao.getIDCloseTime() : null);
			preparedStatement.setString(7, lao.getSubject());
			preparedStatement.setString(8, lao.getComments());
			preparedStatement.setString(9, lao.getStatus());
			preparedStatement.setInt(10, lao.getIDLAO());
			preparedStatement.executeUpdate();
			preparedStatement.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
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
	@Override
	public void changeStatus() throws SQLException{
		Statement statement = DBUtil.VerifyConnection(conn);
		ResultSet resultSet = statement.executeQuery("SELECT IDPlannedTime, IDLAO FROM LAO");
		List<ListItem> list = new ArrayList<ListItem>();
		while( resultSet.next() ) {
			ListItem lisItem = new ListItem();
			lisItem.setText( resultSet.getString("IDPlannedTime") );
			lisItem.setValue( resultSet.getInt("IDLAO" ));
			list.add(lisItem);
		}
		//Obtenemos la fecha actual
		SimpleDateFormat sdfTime = new SimpleDateFormat("yyyy-MM-dd");
	    Date now = new Date();
	    String strTime = sdfTime.format(now);
	    int dateTimeNowToInt = Integer.parseInt(strTime.replace("-", ""));
	    //recorremos el listado y verificamos si la fecha es antigua
		for(ListItem laos: list ){
			//Si la fecha es menor a la actual cambiar� el status
			if(Integer.parseInt(laos.getText()) < dateTimeNowToInt ){
				String updateLao = "UPDATE LAO SET [Status] = 1 WHERE IDLAO = ?";
				PreparedStatement preparedStatement = conn.prepareStatement( updateLao );
				preparedStatement.setInt( 1, laos.getValue());
				preparedStatement.executeUpdate();
				preparedStatement.close();
//				System.out.println ("La fecha: " + laos.getText() + " es antigua.");
			}
//			else{
//				System.out.println ("La fecha: " + laos.getText() + " es actual con el Id "+  laos.getValue() ); 
//			}
		}
		
		resultSet.close();
		statement.close();

	}
}