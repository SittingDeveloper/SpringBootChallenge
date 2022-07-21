package com.example.task2.controller;

import com.example.task2.DTO.TaskDTO;
import com.example.task2.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class practiceController {

    private final TaskService service;

    @GetMapping({"/", "/home"})
    public List<TaskDTO> showMember() {

        List<TaskDTO> dtoList = service.entityToDTO();

        return dtoList;
    }
}
