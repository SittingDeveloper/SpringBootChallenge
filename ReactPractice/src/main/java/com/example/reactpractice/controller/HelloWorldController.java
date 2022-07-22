package com.example.reactpractice.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class HelloWorldController {

    @GetMapping("/api/hello")
    public String test() {

        ArrayList<String> arrayList = new ArrayList<>();
        for (int i = 0; i < 3; i++) {
            arrayList.add(i, "사용자"+i);
        }

        return "Hello, world!";
    }
}