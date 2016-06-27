package com.boe.apps.data;

import java.sql.SQLException;
import java.util.List;
import com.boe.apps.models.*;
/*Interface para operations top*/
public interface OperationData {
	public List<OperationModel> getAllOperations(String sdmName, int timeId, String processName, int customerId) throws SQLException;
	public void createOperation(OperationModel operation) throws SQLException;
	public void updateOperation(OperationModel operation) throws SQLException;
	public List<OperationModel> getProcess(int idSDM) throws SQLException;
	public List<QuartersModel> getQuarters() throws SQLException;
	public OperationModel getOperationById(int operationId) throws SQLException; 
}
