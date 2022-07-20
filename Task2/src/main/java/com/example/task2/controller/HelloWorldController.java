package com.example.task2.controller;

// src/main/java/com.demogroup.demoweb/Controller/HelloWorldController.java

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
public class HelloWorldController {

    @GetMapping("/api/hello")
    public String test() {
        return "안녕하세요. 현재 서버 시간은 " + new Date() + "입니다.\n";
    }
}
