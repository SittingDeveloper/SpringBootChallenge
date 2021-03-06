package org.zerock.board.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
public class Member extends BaseEntity { // 회원

    @Id
    private String email;

    private String password;

    private String name;

    // 작성자는 아직 처리하지 않음
}
