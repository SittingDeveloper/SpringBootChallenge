package com.example.family.controller;

import com.example.family.dto.Family_Dto;
import com.example.family.entity.Family_Entity;
import com.example.family.service.Family_Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/my")
@Log4j2
public class Family_Controller {

    private final Family_Service service;

    @GetMapping("/mother")
    public String defaultPage(Model model) {

        Long id = 1L;
        Family_Dto dto = service.read(id);

        log.info("dto is " + dto.getId());

        model.addAttribute("dto", dto);

        return "testPage";
    }

    @GetMapping("/family")
    public String familyPage(Model model) {

        return "familyPage";
    }
}