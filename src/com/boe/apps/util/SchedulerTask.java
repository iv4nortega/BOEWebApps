package com.boe.apps.util;

import java.util.TimerTask;

import com.boe.apps.data.LAOData;
import com.boe.apps.data.LAOImplementation;

public class SchedulerTask extends TimerTask {
	
	private LAOData obj;
	
	public SchedulerTask(){
		obj = new LAOImplementation();
	}
	public void run() {
		try {
			obj.changeStatus();
			System.out.println("Working...");
			} 
		catch (Exception ex) {
	        System.out.println("Error running thread " + ex.getMessage());
		}
   }
}
