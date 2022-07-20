package com.example.task2.DTO;

import com.example.task2.entity.TaskEntity;
import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class TaskDTO {
    private Long id;
    private String Str_Data;
    private int Int_Data;

    public static TaskDTO fromEntity(TaskEntity entity) {
        return TaskDTO.builder()
                .id(entity.getId())
                .Str_Data(entity.getStr_Data())
                .Int_Data(entity.getInt_Data())
                .build();
    }

}
