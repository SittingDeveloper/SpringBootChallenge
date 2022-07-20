package com.example.family.service;

import com.example.family.repository.Family_Repository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class Family_ServiceTest {


    @Autowired
    private Family_Service service;

    @Test
    @DisplayName("Single Get")
    public void Test() {
        System.out.println(service.read(1L));
    }

    @Test
    @DisplayName("Family Get")
    public void FamilyTest() {
        System.out.println(service.readAll());
    }

}