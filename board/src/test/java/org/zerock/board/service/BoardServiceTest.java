package org.zerock.board.service;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.zerock.board.dto.BoardDTO;
import org.zerock.board.dto.PageRequestDTO;
import org.zerock.board.dto.PageResultDTO;
import org.zerock.board.entity.Board;
import org.zerock.board.entity.Member;
import org.zerock.board.repository.BoardRepository;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class BoardServiceTest {

    @Autowired
    private BoardService boardService;

    @Test
    @DisplayName("DTO -> Entity")
    public void dtoToEntity() {

        BoardDTO boardDTO = BoardDTO.builder()
                .title("Test.")
                .content("Test..")
                .writerEmail("user55@aaa.com")
                .build();

        Long bno = boardService.register(boardDTO);
        System.out.println(bno);
    }

    @Test
    @DisplayName("PageResult 테스트")
    public void testList() {
        PageRequestDTO pageRequestDTO = new PageRequestDTO();

        PageResultDTO<BoardDTO, Object[]> result = boardService.getList(pageRequestDTO);

        for (BoardDTO boardDTO : result.getDtoList()) {
            System.out.println(boardDTO);
        }
    }

    @Test
    @DisplayName("게시물 조회 테스트")
    public void testGet() {
        Long bno = 100L;
        BoardDTO boardDTO = boardService.get(bno);
        System.out.println(boardDTO);
    }

    @Test
    @DisplayName("게시물 삭제 테스트")
    public void deleteTest() {
        Long bno = 1L;
        boardService.removeWithReplies(bno);
    }

    @Test
    @DisplayName("게시물 수정 테스트")
    public void modifyTest() {

        BoardDTO boardDTO = BoardDTO.builder()
                .bno(2L)
                .title("제목 변경합니다")
                .content("내용 변경합니다")
                .build();

        boardService.modify(boardDTO);
    }
}