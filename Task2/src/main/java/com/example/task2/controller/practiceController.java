package com.example.task2.controller;

import com.example.task2.DTO.TaskDTO;
import com.example.task2.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class practiceController {

    private final TaskService service;

    @GetMapping({"/", "home"})
    public void root() {

//        List<TaskDTO> dtoList = service.entityToDTO()

    }
}
