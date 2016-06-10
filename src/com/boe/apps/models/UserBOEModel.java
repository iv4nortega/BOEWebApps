package com.boe.apps.models;
/**
 * @author Ivan Hernández Ortega
 * @version 1.0.0
 * @create 06 de Mayo 2016
 * @update 09 de Junio 2016
 */
public class UserBOEModel 
{
	private int sdmId;
	private String sdmName;
	private String sdnUserName;
	private String sdmProfile;
	private String sdmBOEFullName;
	/*ID del SDM*/
	public int getIDSDM() {
		return sdmId;
	}
	public void setIDSDM(int sdmId) {
		this.sdmId = sdmId;
	}
	/*Nombre del SDM*/
	public String getSDMName() {
		return sdmName;
	}
	public void setSDMName(String sdmName) {
		this.sdmName = sdmName;
	}
	
	public String getSDMUserName() {
		return sdnUserName;
	}
	public void setSDMUserName(String sdnUserName) {
		this.sdnUserName = sdnUserName;
	}
	public String getSDMProfile() {
		return sdmProfile;
	}
	public void setSDMProfile(String sdmProfile) {
		this.sdmProfile = sdmProfile;
	}
	public String getSDMBOEFullName() {
		return sdmBOEFullName;
	}
	public void setSDMBOEFullName(String sdmBOEFullName) {
		this.sdmBOEFullName = sdmBOEFullName;
	}
}
