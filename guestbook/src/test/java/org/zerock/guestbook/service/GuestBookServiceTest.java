package org.zerock.guestbook.service;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.zerock.guestbook.dto.GuestBookDTO;

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
}