package com.example.family.dto;

import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Family_Dto {

    private Long id;

    private String name;

    private int age;

    private String Gender;

}
