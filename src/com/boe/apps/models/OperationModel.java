package com.boe.apps.models;
/**
 * @author Ivan Hernández Ortega
 * @version 1.0.0
 * @create 09 de Junio 2016
 * @update 09 de Junio 2016
 */
/*Modelo para operation Top métricas*/
public class OperationModel {

	public int  operationTopId;
	public int sdmId;
	public String sdmName;
	public int timeId;
	public String processName;
	public int customerId;
	public String customerName;
	public String description;
	public int quantity;
	
	/*Id de la operación*/
	public int getIDOperationTop() {
		return operationTopId;
	}
	public void setIDOperationTop(int operationId) {
		this.operationTopId = operationId;
	}
	/*ID del SDM que registra la operación*/
	public int getIDSDM(){
		return sdmId;
	}
	public void setIDSDM(int sdmid){
		this.sdmId = sdmid;
	}
	/*Nombre del SDM que registra la operación*/
	public String getSDMName(){
		return sdmName;
	}
	public void setSDMName(String sdmName){
		this.sdmName = sdmName;
	}
	/*Fecha de registro de la operación*/
	public int getTimeId(){
		return timeId;
	}
	public void setTimeId(int timeId){
		this.timeId = timeId;
	}
	/*Nombre del proceso de operacion*/
	public String getProcessName(){
		return processName;
	}
	public void setProcessName(String processName){
		this.processName = processName;
	}
	/*Cliente de la operacion*/
	public int getCustomerId(){
		return customerId;
	}
	public void setCustomerId(int customerId){
		this.customerId = customerId;
	}
	/*Nombre del cliente */
	public String getCustomerName(){
		return customerName;
	}
	public void setCustomerName(String customerName){
		this.customerName = customerName;
	}
	/*Descripcion de la operacion*/
	public String getDescription(){
		return description;
	}
	public void setDescription(String description){
		this.description = description;
	}
	/*ID del SDM que registra la operación*/
	public int getQuantity(){
		return quantity;
	}
	public void setQuantity(int quantity){
		this.quantity = quantity;
	}
	
}
