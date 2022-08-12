package com.example.task11.repository;

import com.example.task11.dto.sidebar_Dto;
import com.example.task11.entity.sidebar_Entity;
import com.example.task11.service.sidebar_Service;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class practiceRepositoryTest {

    @Autowired
    practiceRepository repository;

    @Autowired
    sidebar_Service service;

    @Test
    @DisplayName("Create subTitle Test")
    public void createSubTitleTest() {

        for (int i = 1; i <= 4; i++) {
            sidebar_Entity entity = sidebar_Entity.builder()
                    .subTitle("SubTitle" + i)
                    .build();

            repository.save(entity);
        }
    }


    @Test
    @DisplayName("Read All Test")
    public void readAllTest() {
        List<sidebar_Dto> dtoList = service.entityToDTO();

        for (sidebar_Dto dto : dtoList) {
            System.out.println(dto);
        }
    }

}