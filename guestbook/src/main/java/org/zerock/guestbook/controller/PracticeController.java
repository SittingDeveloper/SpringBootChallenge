package org.zerock.guestbook.controller;


import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestController;

@Getter
@Setter
class TestModel{
    public String name;
    public int age;
}

@RestController
public class PracticeController {
    @GetMapping("/")
    public String getTestPage(TestModel testModel) {
        System.out.println("이름 : " + testModel.getName());
        System.out.println("나이 : " + testModel.getAge());

        return "test";
    }
}
