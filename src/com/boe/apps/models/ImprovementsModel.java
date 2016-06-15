package com.boe.apps.models;

public class ImprovementsModel {
	
	private int improvementID;
	private int timeId;
	private int customerId;
	private int sdmId;
	private String type;
	private String description;
	
	/*ID del improvement*/
	public int getIDImprovement(){
		return this.improvementID;
	}
	public void setIDImprovement(int improvementId){
		this.improvementID = improvementId;
	}
	/*ID de la fecha*/
	public int getTimeId(){
		return this.timeId;
	}
	public void setTimeId(int timeid){
		this.timeId = timeid;
	}
	/*ID del cliente*/
	public int getCustomerId(){
		return this.customerId;
	}
	public void setCustomerId(int customerid){
		this.customerId = customerid;
	}
	/*ID del SDM*/
	public int getIDSDM(){
		return this.sdmId;
	}
	public void setIDSDM(int sdmid){
		this.sdmId = sdmid;
	}
	/*Tipo de improvement*/
	public String getTypeImprovement(){
		return this.type;
	}
	public void setTypeImprovement(String type){
		this.type = type;
	}
	/*Descripcion del improvement*/
	public String getDescription(){
		return this.description;
	}
	public void setDescription(String descrip){
		this.description = descrip;
	}
}
