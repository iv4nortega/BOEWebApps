package com.boe.apps.data;
import java.sql.SQLException;
import java.util.List;

import com.boe.apps.models.*;

/* 
 * @author : Iván Hernández Ortega
 * @create date : 15 de Junio 2016
 * @update date : 
*/
public interface ImprovementsData {

	public List<ImprovementsModel> getImprovements(String user_boe) throws SQLException;
}
