package org.zerock.board.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.zerock.board.entity.Board;
import org.zerock.board.entity.Reply;

import java.util.List;

public interface ReplyRepository extends JpaRepository<Reply, Long> {

    @Modifying // JPQL 을 사용하여 update, delete 를 할 때 사용
    @Query("delete " +
            " from Reply r " +
            " where r.board.bno = :bno ")
    void deleteByBno(@Param("bno") Long bno);

    // 특정 게시글의 번호에 의해서 댓글의 목록을 가져오는 함수
    List<Reply> getRepliesByBoardOrderByRno(Board board);

}
