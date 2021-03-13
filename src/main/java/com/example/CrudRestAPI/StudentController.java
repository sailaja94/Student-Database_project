package com.example.CrudRestAPI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class StudentController {

    @Autowired
    private StudentService service;

    @GetMapping("/students/list")
    public List<Student> list() throws SQLException {
        return service.listAll();
    }

    @DeleteMapping("/students/delete/{id}")
    public String delete(@PathVariable Integer id) throws SQLException {
        service.delete(id);
        System.out.println("Deletion Successful");
        return "Successful";
    }

    @PostMapping("/students/create")
    public String create(@RequestBody Student student) throws SQLException {
        service.save(student);
        System.out.println("Insertion Successful");
        return "Successful";
    }

    @PostMapping(value = "/students/update/{id}")
    public String update(@RequestBody Student student, @PathVariable Integer id) throws SQLException {
        service.save(student);
        System.out.println("Updation Successful");
        return "Successful";
    }

}
