package org.zerock.guestbook.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class InitController {
    @GetMapping("/")
    public @ResponseBody String init() {
        return "No Root, basic Page";
    }
}
