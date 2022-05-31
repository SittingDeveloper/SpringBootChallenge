package org.zerock.guestbook.service;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.zerock.guestbook.dto.GuestBookDTO;
import org.zerock.guestbook.dto.PageRequestDTO;
import org.zerock.guestbook.dto.PageResultDTO;
import org.zerock.guestbook.entity.GuestBook;
import org.zerock.guestbook.entity.QGuestBook;
import org.zerock.guestbook.repository.GuestBookRepository;

import java.util.Optional;
import java.util.function.Function;

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

    @Override
    public GuestBookDTO read(Long gno) {
        Optional<GuestBook> result = repository.findById(gno);

        return result.isPresent() ? entityToDto(result.get()) : null;
    }

    @Override
    public void modify(GuestBookDTO dto) {
        Optional<GuestBook> result = repository.findById(dto.getGno());

        if (result.isPresent()) {
            GuestBook entity = result.get();

            entity.changeTitle(dto.getTitle());
            entity.changeContent(dto.getContent());

            repository.save(entity);
        }
    }

    @Override
    public void remove(Long gno) {
        repository.deleteById(gno);
    }

    @Override
    public PageResultDTO<GuestBookDTO, GuestBook> getList(PageRequestDTO requestDTO) {
        Pageable pageable = requestDTO.getPageable(Sort.by("gno").descending());

        // 검색 조건 처리
        BooleanBuilder booleanBuilder = getSearch(requestDTO);

        // Query DSL 사용
        Page<GuestBook> result = repository.findAll(booleanBuilder, pageable);

        Function<GuestBook, GuestBookDTO> fn = (entity -> entityToDto(entity));

        return new PageResultDTO<>(result, fn);
    }

    private BooleanBuilder getSearch(PageRequestDTO requestDTO) { // QueryDSL 처리

        String type = requestDTO.getType();
        String keyword = requestDTO.getKeyword();

        BooleanBuilder booleanBuilder = new BooleanBuilder();
        QGuestBook qGuestBook = QGuestBook.guestBook;

        BooleanExpression expression = qGuestBook.gno.gt(0L); // gno > 0
        booleanBuilder.and(expression);

        if (type == null || type.trim().length() == 0) { // 검색조건이 없는 경우
            return booleanBuilder;
        }

        // 검색 조건을 작성
        BooleanBuilder conditionBuilder = new BooleanBuilder();

        if (type.contains("t")) {
            conditionBuilder.or(qGuestBook.title.contains(keyword));
        }
        if (type.contains("c")) {
            conditionBuilder.or(qGuestBook.content.contains(keyword));
        }
        if (type.contains("w")) {
            conditionBuilder.or(qGuestBook.writer.contains(keyword));
        }

        // 모든 조건 통합
        booleanBuilder.and(conditionBuilder);

        return booleanBuilder;
    }

}