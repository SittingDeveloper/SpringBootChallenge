package com.example.task11.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class InitController {

    String place = "is Null";

    @GetMapping("/api/page")
    public void getPlace(@RequestParam String InputText) {

        place = InputText;

        System.out.println(place);
    }

    @GetMapping("/api/search")
    public String searchPlace() {
        return place;
    }

}
