package com.boe.apps.data;

import java.sql.SQLException;
import java.util.List;

import com.boe.apps.models.*;

/* 
 * @author : Iván Hernández Ortega
 * @create date : 06 de Mayo 2016
*/
public interface LAOData 
{
	public void addLAO(LAOModel lao) throws SQLException;
	public void deleteLAO(int laoId );
	public void updateLAO(LAOModel lao);
	public List<LAOModel> getLAORecords(String userLogin);
	public List<CommentsModel> getLAONotes(int laoId);
	public LAOModel getLAOById(int laoId) throws SQLException;
	public UserBOEModel getUserProfile(String userLogin) throws SQLException;
}