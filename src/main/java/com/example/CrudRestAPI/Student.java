package com.example.CrudRestAPI;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
@Entity
public class Student {
    private int id;
    private String name;
    private String email;
    private String universityName;

    public Student() {

    }

    public Student(int id, String name, String email, String universityName) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.universityName = universityName;
    }

    @Override
    public String toString() {
        return "{ Id: " + getId() + " Name: " + getName() + " Email: " + getEmail() + " University Name: " + getUniversityName() + "}";
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer getId() {

        return id;
    }

    public void setId(Integer id) {

        this.id = id;
    }

    public String getName() {

        return name;
    }

    public void setName(String name) {

        this.name = name;
    }

    public String getEmail() {

        return email;
    }

    public void setEmail(String email) {

        this.email = email;
    }

    public String getUniversityName() {

        return universityName;
    }

    public void setUniversityName(String universityName) {

        this.universityName = universityName;
    }


}
