package com.boe.apps.data;

import java.sql.SQLException;
import java.util.List;

import com.boe.apps.models.*;

/* 
 * @author : Iván Hernández Ortega
 * @create date : 29 de Julio 2016
 * @update date : 
*/
public interface FinanceData {
	
	public List<FinanceModel> getFinance(String userboe,int periodfnce, String typefnce, int customerfnce) throws SQLException;
	public void createImprovement(FinanceModel finance) throws SQLException;
	public void updateFinance(FinanceModel finance) throws SQLException;
	public FinanceModel getFinanceById(int operationId) throws SQLException;
}
