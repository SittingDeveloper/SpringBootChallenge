package org.zerock.board.service;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.zerock.board.dto.ReplyDTO;
import org.zerock.board.repository.ReplyRepository;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ReplyServiceTest {

    @Autowired
    private ReplyService replyService;

    @Test
    @DisplayName("댓글 리스트 조회 테스트")
    public void getListTest() {
        List<ReplyDTO> result = replyService.getList(100L);

        for (ReplyDTO replyDTO : result) {
            System.out.println(replyDTO);
        }
    }

}