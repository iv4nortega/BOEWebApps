package com.boe.apps.models;

public class ServiceModel {
	private int idService;
	private String serviceName;
	
	/*ID del servicio*/
	public int getServiceId() {
		return idService;
	}
	public void setServiceId(int serviceId) {
		this.idService = serviceId;
	}
	/*Nombre del servicio*/
	public String getServiceName() {
		return serviceName;
	}
	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}
}
