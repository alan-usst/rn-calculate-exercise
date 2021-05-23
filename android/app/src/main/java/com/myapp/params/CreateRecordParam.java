package com.myapp.params;

import com.myapp.domain.OP;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor(suppressConstructorProperties = true)
public class CreateRecordParam {
    private List<OP> ops;
    private Integer maxNum;
    private Integer itemAmount;
}
