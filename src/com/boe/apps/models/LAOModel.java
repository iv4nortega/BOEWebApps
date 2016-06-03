package com.boe.apps.models;

/**
 * @author Iván Hernández Ortega
 *
 */
public class LAOModel 
{
	private int idLAO;
	private int sdmId;
	private int idcustomer;
	private int detectionTimeId;
	private int plannedTimeId;
	private int realTimeId;
	private int closeTimeId;
	private String detectionDate;
	private String plannedDate;
	private String realDate;
	private String closeDate;
	private String customerName;
	private String subject;
	private String comments;
	private String status;
	private String sdmUserName; 
	private String sdmShortName;
	
	/*ID DE LAO*/
	public int getIDLAO() {
		return idLAO;
	}
	public void setIDLAO(int laoId) {
		this.idLAO = laoId;
	}
	/*ID DE RESPONSABLE*/
	public int getIDSDM() {
		return sdmId;
	}
	public void setIDSDM(int sdmID) {
		this.sdmId = sdmID;
	}
	/*ID DEL cliente*/
	public int getIDCustomer() {
		return idcustomer;
	}
	public void setIDCustomer(int customerId) {
		this.idcustomer = customerId;
	}
	/*USER DEL SDMS*/
	public String getSDMUserName() {
		return sdmUserName;
	}
	public void setSDMUserName(String userName) {
		this.sdmUserName = userName;
	}
	/*NOMBRE CORTO DEL SDMS*/
	public String getSDMShortName() {
		return sdmShortName;
	}
	public void setSDMShortName(String shortName) {
		this.sdmShortName = shortName;
	}
	/*NOMBRE DE CLIENTE*/
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	/*FECHA INICIAL*/
	public int getIDDetectionTime() {
		return detectionTimeId;
	}
	public void setIDDetectionTime(int iddetectionTime) {
		this.detectionTimeId = iddetectionTime;
	}
	/*ASUNTO LAO*/
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	/*FECHA DE PLANEACION*/
	public int getIDPlannedTime() {
		return plannedTimeId;
	}
	public void setIDPlannedTime(int idPlannedTime) {
		this.plannedTimeId = idPlannedTime;
	}
	/*NOTAS*/
	public String getComments() {
		return comments;
	}
	public void setComments(String comment) {
		this.comments = comment;
	}
	/*FECHA REAL*/
	public int getIDRealTime() {
		return realTimeId;
	}
	public void setIDRealTime(int idRealTime) {
		this.realTimeId = idRealTime;
	}
	/*FECHA CIERRE*/
	public int getIDCloseTime() {
		return closeTimeId;
	}
	public void setIDCloseTime(int idCloseTime) {
		this.closeTimeId = idCloseTime;
	}
	/*FECHA TENTATIVA STRING */
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	/*FECHA DETENCION STRING*/
	public String getDetectionDate() {
		return detectionDate;
	}
	public void setDetectionDate(String detectionDate) {
		this.detectionDate = detectionDate;
	}
	/*FECHA PLANEADA STRING*/
	public String getPlannedDate() {
		return plannedDate;
	}
	public void setPlannedDate(String plannedDate) {
		this.plannedDate = plannedDate;
	}
	/*FECHA REAL STRING*/
	public String getRealDate() {
		return realDate;
	}
	public void setRealDate(String realDate) {
		this.realDate = realDate;
	}
	/*FECHA CIERRE STRING*/
	public String getCloseDate() {
		return closeDate;
	}
	public void setCloseDate(String closeDate) {
		this.closeDate = closeDate;
	}
}
