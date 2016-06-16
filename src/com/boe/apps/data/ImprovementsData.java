package com.boe.apps.data;
import java.sql.SQLException;
import java.util.List;

import com.boe.apps.models.*;
import com.boe.apps.util.ListItem;

/* 
 * @author : Iván Hernández Ortega
 * @create date : 15 de Junio 2016
 * @update date : 
*/
public interface ImprovementsData {

	public List<ImprovementsModel> getImprovements(String user_boe) throws SQLException;
	public List<ListItem> getTypeImprovements(String userboe) throws SQLException;
	public ImprovementsModel getOperationById(int operationId) throws SQLException;
	public void createImprovement(ImprovementsModel improvement) throws SQLException;
	public void updateImprovement(ImprovementsModel improvement) throws SQLException;
}
