package com.example.task11.dto;

import com.example.task11.entity.sidebar_Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class sidebar_Dto {

    private Long id;
    private String subTitle;

    public static sidebar_Dto fromEntity(sidebar_Entity entity) {
        return sidebar_Dto.builder()
                .id(entity.getId())
                .subTitle(entity.getSubTitle())
                .build();
    }

}
