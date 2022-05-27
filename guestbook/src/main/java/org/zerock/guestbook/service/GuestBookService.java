package org.zerock.guestbook.service;

import org.zerock.guestbook.dto.GuestBookDTO;
import org.zerock.guestbook.dto.PageRequestDTO;
import org.zerock.guestbook.dto.PageResultDTO;
import org.zerock.guestbook.entity.GuestBook;

public interface GuestBookService {

    Long register(GuestBookDTO dto);

    GuestBookDTO read(Long gno);

    void modify(GuestBookDTO dto);

    void remove(Long gno);

    PageResultDTO<GuestBookDTO, GuestBook> getList(PageRequestDTO requestDTO);

    /*
    인터페이스에 추상 메서드를 생성하면
    모든 하위 클래스에서 해당 추상 메서드를 반드시 구현해야하지만
    default method를 사용하면 필요한 클래스에서만 사용하고 다른 클래스에서는 구현하지 않아도 된다.
     */
    default GuestBook dtoToEntity(GuestBookDTO dto) {
        GuestBook entity = GuestBook.builder()
                .gno(dto.getGno())
                .title(dto.getTitle())
                .content(dto.getContent())
                .writer(dto.getWriter())
                .build();
        return entity;
    }

    default GuestBookDTO entityToDto(GuestBook entity) {
        GuestBookDTO dto = GuestBookDTO.builder()
                .gno(entity.getGno())
                .title(entity.getTitle())
                .content(entity.getContent())
                .writer(entity.getWriter())
                .regDate(entity.getRegDate())
                .modDate(entity.getMoDate())
                .build();

        return dto;
    }
}
