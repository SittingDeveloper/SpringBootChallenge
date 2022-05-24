package org.zerock.guestbook.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.zerock.guestbook.entity.GuestBook;
import org.zerock.guestbook.entity.QGuestBook;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class GuestBookRepositoryTest {

    @Autowired
    GuestBookRepository guestBookRepository;

    @Test
    @DisplayName("insert 테스트")
    public void insertDummies() {
        for (int i = 1; i <= 300; i++) {
            GuestBook guestBook = GuestBook.builder()
                    .title("Title ... " + i)
                    .content("Content ... " + i)
                    .writer("user" + (i % 10))
                    .build();
            System.out.println(guestBookRepository.save(guestBook));
        }
    }

    @Test
    @DisplayName("최종 수정 시간 업데이트 테스트")
    public void updateTest() {
        Optional<GuestBook> result = guestBookRepository.findById(300L);

        if (result.isPresent()) {
            GuestBook guestBook = result.get();

            guestBook.changeTitle("Change Title ...");
            guestBook.changeContent("Change Content ...");

            guestBookRepository.save(guestBook);
        }
    }

    @Test
    @DisplayName("QueryDSL 단일 항목 검색")
    public void testQuery1() {
        // Q도메인 클래스를 얻어옴. Q도메인 클래스를 이용하면 엔티티 클래스에 선언된 title, content 같은 필드들을 변수로 사용 가능
        QGuestBook qGuestBook = QGuestBook.guestBook;

        // BooleanBuilder는 where문에 들어가는 조건들을 넣어주는 컨테이너라고 생각하면 됨
        BooleanBuilder builder = new BooleanBuilder();

        // 원하는 조건을 필드 값과 같이 결합해서 생성 ( title에 1이라는 글자가 있는 엔티티를 검색 한다는 조건 )
        String keyword = "1";
        BooleanExpression expression = qGuestBook.title.contains(keyword);

        // 만들어진 조건을 where 문의 and , or 같은 키워드와 결합
        builder.and(expression);

        // findAll 사용 가능
        Pageable pageable = PageRequest.of(0, 10, Sort.by("gno").descending());
        Page<GuestBook> result = guestBookRepository.findAll(builder, pageable);

        for (GuestBook guestBook : result) {
            System.out.println(guestBook.getGno());
            System.out.println(guestBook.getContent());
            System.out.println(guestBook.getTitle());
        }

    }

    @Test
    @DisplayName("QueryDSL 다중 항목 검색")
    public void testQuery2 () {
        // q클래스 도메인 생성
        QGuestBook qGuestBook = QGuestBook.guestBook;

        // Boolean Builder (where절 조건을 담을 컨테이너 생성)
        BooleanBuilder builder = new BooleanBuilder();

        // Boolean Builder 안에 들어갈 조건들 지정
        String keyword = "1";
        BooleanExpression exTitle = qGuestBook.title.contains(keyword);
        BooleanExpression exContent = qGuestBook.content.contains(keyword);
        // 위 두개의 조건을 하나로 합침
        BooleanExpression exAll = exTitle.or(exContent);
        builder.and(exAll);

        // gt : Great Than , gno가 0보다 크다는 조건을 builder에 추가
        builder.and(qGuestBook.gno.gt(0L));
        // 빌더 추가 끝

        Pageable pageable = PageRequest.of(0, 10, Sort.by("gno").descending());
        Page<GuestBook> result = guestBookRepository.findAll(builder, pageable);

        for (GuestBook guestBook : result) {
            System.out.println(guestBook.getTitle() + "\n");
            System.out.println(guestBook.getContent() + "\n");
        }
    }

}