package org.zerock.guestbook.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.zerock.guestbook.dto.GuestBookDTO;
import org.zerock.guestbook.entity.GuestBook;
import org.zerock.guestbook.repository.GuestBookRepository;

@Log4j2
@Service
@RequiredArgsConstructor
public class GuestBootServiceImpl implements GuestBookService{

    // RequiredArgsConstructor 주입받기 위해 final 선언
    private final GuestBookRepository repository;

    @Override
    public Long register(GuestBookDTO dto) {
        log.info("DTO-----------------------");
        log.info(dto);

        // DTO -> Entity
        GuestBook entity = dtoToEntity(dto);

        log.info("Entity--------------------");
        log.info(entity);

        repository.save(entity);

        return entity.getGno();
    }
}
