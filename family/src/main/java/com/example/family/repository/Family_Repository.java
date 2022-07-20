package com.example.family.repository;

import com.example.family.entity.Family_Entity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Family_Repository extends JpaRepository<Family_Entity, Long> {

}
