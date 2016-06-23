package com.boe.apps.models;
/**
 * @author Ivan Hernández Ortega
 * @version 1.0.0
 * @create 06 de Mayo 2016
 * @update 09 de Junio 2016
 */
public class ServiceModel {
	private int idService;
	private String serviceName;
	private String serviceDescription;
	
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
	/*Description del servicio*/
	public String getServiceDescription() {
		return serviceDescription;
	}
	public void setServiceDescription(String description) {
		this.serviceDescription = description;
	}
}
