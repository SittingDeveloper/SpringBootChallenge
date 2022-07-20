package com.example.family.service;

import com.example.family.dto.Family_Dto;
import com.example.family.entity.Family_Entity;
import com.example.family.repository.Family_Repository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class Family_Service {

    private final Family_Repository repository;

    public Family_Dto EntityToDto(Family_Entity entity) {
        Family_Dto dto = Family_Dto.builder()
                .age(entity.getAge())
                .id(entity.getId())
                .Gender(entity.getGender())
                .name(entity.getName())
                .build();

        return dto;
    }

    public Family_Dto read(Long id) {
        Optional<Family_Entity> result = repository.findById(id);

        return result.isPresent() ? EntityToDto(result.get()) : null;
    }

    public List<Family_Entity> readAll() {

        List<Family_Entity> entityList = repository.findAll();

        return entityList;
    }
}