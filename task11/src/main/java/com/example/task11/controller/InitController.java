package com.example.task11.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class InitController {

    @GetMapping("/api/page")
    public String getPlace() {
        return"Hi";
    }
}
