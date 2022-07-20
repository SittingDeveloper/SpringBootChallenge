package com.example.task2.service;

import com.example.task2.DTO.TaskDTO;
import com.example.task2.entity.TaskEntity;
import com.example.task2.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository repository;

    public List<TaskDTO> entityToDTO() {
        return repository.findAll().stream().map(TaskDTO::fromEntity).collect(Collectors.toList());
    }

}
