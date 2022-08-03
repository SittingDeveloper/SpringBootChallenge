package com.example.task11.service;


import com.example.task11.dto.sidebar_Dto;
import com.example.task11.repository.practiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class sidebar_Service {

    private final practiceRepository repository;

    public List<sidebar_Dto> entityToDTO() {
        return repository.findAll().stream().map(sidebar_Dto::fromEntity).collect(Collectors.toList());
    }

}