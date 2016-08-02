package com.boe.apps.models;
/**
 * @author Ivan Hernández Ortega
 * @version 1.0.0
 * @create 06 de Mayo 2016
 * @update 09 de Junio 2016
 */
public class OpportunityModel 
{
	private int upCrossSellingId;
	private int serviceId;
	private int customerId;
	private int timeStartId;
	private int timeEndId;
	private int timeTentativeId;
	private String timeStart;
	private String timeEnd;
	private String timeTentative;
	private String cost;
	private float probability;
	private String description;
	private String customerName;
	private String serviceName;
	private String type;
	private int idSDM;
	private String SDMName;
	private String status;
	
	/*ID DE OPORTUNITY*/
	public int getIDUpCrossSelling() {
		return upCrossSellingId;
	}
	public void setIDUpCrossSelling(int oportunityId) {
		this.upCrossSellingId = oportunityId;
	}
	/*ID DE SERVICIO*/
	public int getIDService() {
		return serviceId;
	}
	public void setIDService(int serviceID) {
		this.serviceId = serviceID;
	}
	/*ID DE CUSTOMER*/
	public int getIDCustomer() {
		return customerId;
	}
	public void setIDCustomer(int customerId) {
		this.customerId = customerId;
	}
	/*FECHA INICIAL*/
	public int getIDTimeStart() {
		return timeStartId;
	}
	public void setIDTimeStart(int idTimeStart) {
		this.timeStartId = idTimeStart;
	}
	/*FECHA INICIAL STRING*/
	public String getTimeStart() {
		return timeStart;
	}
	public void setTimeStart(String timeStart) {
		this.timeStart = timeStart;
	}
	/*FECHA FINAL*/
	public int getIDTimeEnd() {
		return timeEndId;
	}
	public void setIDTimeEnd(int idTimeEnd) {
		this.timeEndId = idTimeEnd;
	}
	/*FECHA FINAL String*/
	public String getTimeEnd() {
		return timeEnd;
	}
	public void setTimeEnd(String timeEnd) {
		this.timeEnd = timeEnd;
	}
	/*FECHA TENTATIVA*/
	public int getIDTimeTentative() {
		return timeTentativeId;
	}
	public void setIDTimeTentative(int idTimeTentative) {
		this.timeTentativeId = idTimeTentative;
	}
	/*FECHA TENTATIVA STRING */
	public String getTimeTentative() {
		return timeTentative;
	}
	public void setTimeTentative(String timeTentative) {
		this.timeTentative = timeTentative;
	}
	/*COSTO*/
	public String getCost() {
		return cost;
	}
	public void setCost(String cost) {
		this.cost = cost;
	}
	/*PROBABILIDAD*/
	public float getProbability() {
		return probability;
	}
	public void setProbability(float probability) {
		this.probability = probability;
	}
	/*DESCRIPCIÓN*/
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	/*Nombre del cliente*/
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customername) {
		this.customerName = customername;
	}
	/*Nombre del servicio*/
	public String getServiceName() {
		return serviceName;
	}
	public void setServiceName(String servicename) {
		this.serviceName = servicename;
	}
	/*Nombre del tipo de venta*/
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	/*Id del SDM*/
	public int getIDSDM() {
		return idSDM;
	}
	public void setIDSDM(int sdmid) {
		this.idSDM = sdmid;
	}
	/*Nombre del SDM*/
	public String getSDMName() {
		return SDMName;
	}
	public void setSDMName(String name) {
		this.SDMName = name;
	}
	/*Status de oportunidad*/
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
//	@Override
//	public String toString() {
//		return "Oportunity [oportunityId=" + oportunityId + ", customerName=" + customerName + "]";
//	}
}
