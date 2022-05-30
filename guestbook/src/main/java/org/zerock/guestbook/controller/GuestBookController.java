package org.zerock.guestbook.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.zerock.guestbook.dto.GuestBookDTO;
import org.zerock.guestbook.dto.PageRequestDTO;
import org.zerock.guestbook.dto.PageResultDTO;
import org.zerock.guestbook.entity.GuestBook;
import org.zerock.guestbook.service.GuestBookService;

@Controller
@RequestMapping("/guestbook")
@Log4j2
@RequiredArgsConstructor
public class GuestBookController {

    private final GuestBookService service;

    @GetMapping("/")
    public String index() {
        return "redirect:/guestbook/list";
    }

    @GetMapping("/list")
    public String list(PageRequestDTO pageRequestDTO, Model model) {
        log.info("list............." + pageRequestDTO);
        model.addAttribute("result", service.getList(pageRequestDTO));

        return "/guestbook/list";
    }

    @GetMapping("/register")
    public void register() {
        log.info("register get ... ");
    }

    @PostMapping("/register")
    public String registerPost(GuestBookDTO dto, RedirectAttributes redirectAttributes) {
        log.info("dto ... " + dto);

        // 새로 추가된 엔티티의 번호
        Long gno = service.register(dto);
        redirectAttributes.addFlashAttribute("msg", gno);
        return "redirect:/guestbook/list";
    }

    @GetMapping({"/read", "/modify"})
    public void read(long gno, @ModelAttribute("requestDTO") PageRequestDTO requestDTO, Model model) {
        log.info("gno : " + gno);
        GuestBookDTO dto = service.read(gno);

        model.addAttribute("dto", dto);
    }

    @PostMapping("/remove")
    public String remove(Long gno, RedirectAttributes redirectAttributes) {
        log.info("gno : " + gno);
        service.remove(gno);
        redirectAttributes.addFlashAttribute("msg", gno);
        return "redirect:/guestbook/list";
    }

    // RedirectAttributes 는 데이터가 한번만 전달된 뒤 소멸, return 값으로 redirect:/ 를 써야한다.
    @PostMapping("/modify")
    public String modify(GuestBookDTO dto, @ModelAttribute("requestDTO") PageRequestDTO requestDTO,
                         RedirectAttributes redirectAttributes) {
        log.info("post modify .......... ");
        log.info("dto : " + dto);

        service.modify(dto);

        redirectAttributes.addAttribute("page", requestDTO.getPage());
        redirectAttributes.addAttribute("gno", dto.getGno());

        return "redirect:/guestbook/read";
    }

}