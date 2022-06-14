package org.zerock.board.repository;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.zerock.board.entity.Board;
import org.zerock.board.entity.Reply;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ReplyRepositoryTest {

    @Autowired
    private ReplyRepository replyRepository;

    @Test
    @DisplayName("replyInsertTest")
    public void replyInsertTest() {
        for (int i = 1; i <= 300; i++) {

            long bno = (long)(Math.random() * 100) + 1;

            Board board = Board.builder()
                    .bno(bno)
                    .build();

            Reply reply = Reply.builder()
                    .text("Reply......." + i)
                    .board(board)
                    .replyer("guest")
                    .build();

            replyRepository.save(reply);
        }

    }

    @Test
    @DisplayName("readReply")
    public void readReply() {
        Optional<Reply> result = replyRepository.findById(100L);

        Reply reply = result.get();

        System.out.println("reply : " + reply);
        System.out.println(".getBoard : " + reply.getBoard());

    }

    @Test
    @DisplayName("댓글 리스트 조회")
    public void testListByBoard() {
        List<Reply> replyList = replyRepository.getRepliesByBoardOrderByRno(Board.builder().bno(100L).build());
        for (Reply reply : replyList) {
            System.out.println(reply);
        }

    }

}