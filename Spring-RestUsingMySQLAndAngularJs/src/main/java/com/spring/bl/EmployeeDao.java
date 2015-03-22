package com.spring.bl;

import java.util.List;

public interface EmployeeDao {

	public List<Employee> getEmployeeList();

	public List<Employee> getEmployeeById(Integer id);
	
	public Employee createEmployee(Employee employee);
	
	public Employee modifyEmployee(Employee employee);
	
	public void deleteEmployee(Integer id);
}
