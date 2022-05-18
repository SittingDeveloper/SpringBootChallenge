package org.zerock.ex2.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;
import org.zerock.ex2.entity.Memo;

import java.util.Optional;
import java.util.stream.IntStream;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class MemoRepositoryTest {

    @Autowired
    MemoRepository memoRepository;

    @Test
    public void testClass() {
        System.out.println(memoRepository.getClass().getName());
    }

    @Test
    public void testInsertDummies() {
        IntStream.rangeClosed(1, 100).forEach(i -> {
            Memo memo = Memo.builder().memoText("Sample..." + i).build();
            memoRepository.save(memo);
        });
    }

    @Test
    public void testInsertDummies_2() {
        for (int i = 1; i <= 100; i++) {
            Memo memo = Memo.builder().memoText("Sample..." + i).build();
            memoRepository.save(memo);
        }
    }

    @Test
    public void testSelect() {
        Long mno = 100L;

        Optional<Memo> result = memoRepository.findById(mno);

        System.out.println("==============");

        if (result.isPresent()) {
            Memo memo = result.get();
            System.out.println(memo);
        }
    }

    @Transactional
    @Test
    public void testSelect_2() {
        Long mno = 100L;

        Memo memo = memoRepository.getOne(mno);

        System.out.println("=======================");

        System.out.println(memo);

    }

    @Test
    public void testUpdate() {
        Memo memo = Memo.builder().mno(100L).memoText("Update Text").build();
        System.out.println(memoRepository.save(memo));
    }

    @Test
    public void testDelete() {
        Long mno = 100L;
        memoRepository.deleteById(mno);
    }

    @Test
    public void testPageDefault() {
        /*
        Pageable    = 페이지 처리에 필요한 정보를 전달하는 용도의 '인터페이스'
        PageRequest = 실제 객체를 생성할 떄 사용하는 구현체.
         */
        Pageable pageable = PageRequest.of(0, 10);

        Page<Memo> result = memoRepository.findAll(pageable);
        System.out.println(result);
        System.out.println("====================================");

        // 총 몇페이지
        System.out.println("Total Pages: " + result.getTotalPages());

        // 전체 개수
        System.out.println("Total Count: " + result.getTotalElements());

        // 현재 페이지 번호 0부터 시작
        System.out.println("Page Number: " + result.getNumber());

        // 페이지당 데이터 개수
        System.out.println("Page Size: " + result.getSize());

        // 다음 페이지 존재 여부
        System.out.println("has next page?: " + result.hasNext());

        // 시작 페이지(0) 여부
        System.out.println("first page?: " + result.isFirst());

        for (Memo memo : result.getContent()) {
            System.out.println(memo);
        }
    }

    @Test
    public void testSort() {
        Sort sort1 = Sort.by("mno").descending();
        Pageable pageable = PageRequest.of(0, 10, sort1);
        Page<Memo> result = memoRepository.findAll(pageable);

        for (Memo memo : result) {
            System.out.println(memo);
        }

    }

}