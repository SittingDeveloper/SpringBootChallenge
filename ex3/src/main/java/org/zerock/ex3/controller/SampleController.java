package org.zerock.ex3.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.zerock.ex3.dto.SampleDTO;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/sample")
@Log4j2
public class SampleController {
    @GetMapping("/ex1")
    public void ex1() {
        log.info("ex1.............");
    }

    // 책과 약간 내용 다르게함.
    // 람다식 제거 / void exModel -> String exModel 로 변경 후 return 타입으로 html 지정해서 연결,
    // html 에서 참조하는 변수 찾아갈 수 있게끔 변경
    @GetMapping("/ex2")
    public String exModel(Model model) {
        List<SampleDTO> list = new ArrayList<>();

        for (Long i = 0L; i < 20L; i++) {
            SampleDTO dto = SampleDTO.builder()
                    .sno(i)
                    .first("first.." + i)
                    .last("last.." + i)
                    .regTime(LocalDateTime.now())
                    .build();
            list.add(dto);
        }

        model.addAttribute("list", list);
        return "sample/ex2";
    }

    @GetMapping("/exSidebar")
    public void exLayout1() {
        log.info("exLayout...........");
    }
}
