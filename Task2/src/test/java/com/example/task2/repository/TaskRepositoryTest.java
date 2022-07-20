package com.example.task2.repository;

import com.example.task2.entity.TaskEntity;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class TaskRepositoryTest {

    @Autowired
    TaskRepository repository;

    @Test
    @DisplayName("Create Test")
    public void creatTest() {

        // Create
        for(int i = 1; i <= 5; i++) {
            TaskEntity entity = TaskEntity.builder()
                    .Int_Data(i)
                    .Str_Data("Member"+i)
                    .build();

            repository.save(entity);
        }

    }

    @Test
    @DisplayName("Read Test")
    public void findTest() {

        // Read
        List<TaskEntity> entityList = repository.findAll();

        for (TaskEntity entity : entityList) {
            System.out.println(entity);
        }

    }

    @Test
    @DisplayName("Update Test")
    public void updateTest() {

        // Update

    }

    @Test
    @DisplayName("Delete Test")
    public void deleteTest() {

        // Delete

    }

}