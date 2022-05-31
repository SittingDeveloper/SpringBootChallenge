package org.zerock.guestbook.service;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.zerock.guestbook.dto.GuestBookDTO;
import org.zerock.guestbook.dto.PageRequestDTO;
import org.zerock.guestbook.dto.PageResultDTO;
import org.zerock.guestbook.entity.GuestBook;

import static org.junit.jupiter.api.Assertions.*;



@SpringBootTest
class GuestBookServiceTest {

    @Autowired
    private GuestBookService service;

    @Test
    @DisplayName("DtoToEntity 테스트")
    public void testRegister() {
        //when
        GuestBookDTO guestBookDTO = GuestBookDTO.builder()
                .title("Sample Title ...")
                .content("Sample Content ...")
                .writer("user0")
                .build();

        //then
        System.out.println(service.register(guestBookDTO));
    }

    @Test
    @DisplayName("목록 처리 테스트")
    public void testList() {
        //given
        PageRequestDTO pageRequestDTO = PageRequestDTO.builder()
                .page(1)
                .size(10)
                .build();

        PageResultDTO<GuestBookDTO, GuestBook> pageResultDTO = service.getList(pageRequestDTO);

        //then

        System.out.println("PREV : " + pageResultDTO.isPrev());
        System.out.println("NEXT : " + pageResultDTO.isNext());
        System.out.println("TOTAL : " + pageResultDTO.getTotalPage());
        System.out.println("----------------------------------------");
        for (GuestBookDTO guestBookDTO : pageResultDTO.getDtoList()) {
            System.out.println(guestBookDTO);
        }

        System.out.println("========================================");
        for (int i : pageResultDTO.getPageList()) {
            System.out.println(i);
        }
    }

    @Test
    @DisplayName("검색 처리 테스트")
    public void testSearch() {

        PageRequestDTO pageRequestDTO = PageRequestDTO.builder()
                .page(1)
                .size(10)
                .type("tc") // 검색조건 t,c,w,tc, tcw ...
                .keyword("한글")
                .build();

        PageResultDTO<GuestBookDTO, GuestBook> resultDTO = service.getList(pageRequestDTO);

        System.out.println("PREV : " + resultDTO.isPrev());
        System.out.println("NEXT : " + resultDTO.isNext());
        System.out.println("TOTAL : " + resultDTO.getTotalPage());

        System.out.println("--------------------------------------");
        for (GuestBookDTO guestBookDTO : resultDTO.getDtoList()) {
            System.out.println(guestBookDTO);
        }

        System.out.println("======================================");
        resultDTO.getPageList().forEach(i -> System.out.println(i));
    }

}