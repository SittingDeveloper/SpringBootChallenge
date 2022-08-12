package com.example.task11.controller;
import com.example.task11.dto.sidebar_Dto;
import com.example.task11.service.sidebar_Service;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class InitController {

    private final sidebar_Service service;

    @GetMapping("/api/page")
    public List<sidebar_Dto> getPlace() {

        List<sidebar_Dto> dtoList = service.entityToDTO();

        return dtoList;
    }

    @GetMapping("/")
    public String InitPage() {
        return "InitPage";
    }
}
