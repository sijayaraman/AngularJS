package com.spring.bl;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/employee")
public class EmployeeController {
	@Autowired
	private EmployeeDao dao;

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public List<Employee> getEmployee(@PathVariable Integer id) {
		List<Employee> wt = dao.getEmployeeById(id);
		return wt;
	}

	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public List<Employee> getEmployeeList() {
		List<Employee> wt = dao.getEmployeeList();
		return wt;
	}

	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public Employee createEmployee(@RequestBody @Valid final Employee employee) {
		Employee wt = dao.createEmployee(employee);
		return wt;
	}

	@RequestMapping(value = "/modify", method = RequestMethod.PUT)
	public Employee modifyEmployee(@RequestBody @Valid final Employee employee) {
		System.out.println("employee.getAge()="+employee.getAge()+",employee.getName()"+employee.getName());
		
		Employee wt = dao.modifyEmployee(employee);
		return wt;
	}

	@RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable Integer id) {
		dao.deleteEmployee(id);
	}
}
