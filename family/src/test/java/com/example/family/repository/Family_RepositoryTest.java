package com.example.family.repository;

import com.example.family.entity.Family_Entity;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class Family_RepositoryTest {

    @Autowired
    Family_Repository repository;

    @Test
    @DisplayName("Create Entity")
    public void Test() {

        Family_Entity family_entity = Family_Entity.builder()
                .name("Park Jung AE")
                .age(52)
                .Gender("female")
                .build();
        repository.save(family_entity);

        family_entity = Family_Entity.builder()
                .name("Kim Ju hui")
                .age(28)
                .Gender("female")
                .build();
        repository.save(family_entity);

        family_entity = Family_Entity.builder()
                .name("Kim Myung Sik")
                .age(26)
                .Gender("male")
                .build();
        repository.save(family_entity);


    }


    @Test
    @DisplayName("test")
    public void findTest() {
        System.out.println(repository.count());
    }

    @Test
    @DisplayName("findAll Test")
    public void findAll_Test() {
        List<Family_Entity> entityList = repository.findAll();
        System.out.println(entityList);
    }
}