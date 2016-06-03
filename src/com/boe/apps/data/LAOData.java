package com.boe.apps.data;

import java.sql.SQLException;
import java.util.List;

import com.boe.apps.models.*;


/**
 * @author Ivan Hernández Ortega
 */
public interface LAOData 
{
	public void addLAO(LAOModel lao) throws SQLException;
	public void deleteLAO(int laoId );
	public void updateLAO(LAOModel lao);
	public List<LAOModel> getLAORecords(String userLogin);
	public List<NotesModel> getLAONotes(int laoId);
	public LAOModel getLAOById(int laoId) throws SQLException;
	public List<CustomerModel> getAllCustomers();
	public UserBOEModel getUserProfile(String userLogin) throws SQLException;
}