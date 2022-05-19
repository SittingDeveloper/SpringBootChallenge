package org.zerock.ex2.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import org.zerock.ex2.entity.Memo;

import java.util.List;

public interface MemoRepository extends JpaRepository<Memo, Long> {

    List<Memo> findByMnoBetweenOrderByMnoDesc(Long from, Long to);

    Page<Memo> findByMnoBetween(Long from, Long to, Pageable pageable);

    void deleteMemoByMnoLessThan(Long num);

    @Transactional
    @Modifying // insert, update, delete 는 Modify, Transactional 필요
    @Query("update Memo m set m.memoText = :memoText where m.mno = :mno ")
    int updateMemoText(@Param("mno") Long memoNum, @Param("memoText") String mText);

    @Query(value = "select m from Memo m where m.mno > :mno")
    Page<Memo> getListWithQuery(@Param("mno") Long memoNum, Pageable pageable);

}
