package com.spring.bl;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class EmployeeMapper implements RowMapper<Employee>{ 
	public Employee mapRow(ResultSet result, int rowNum) throws SQLException {
		Employee trans = new Employee();
		trans.setId(result.getInt("id"));
		trans.setAge(result.getInt("age"));
		trans.setName(result.getString("name"));
		trans.setLocation(result.getString("location"));
		return trans; 
	}
}