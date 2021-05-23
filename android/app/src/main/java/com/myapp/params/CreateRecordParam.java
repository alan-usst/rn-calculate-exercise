package com.myapp.params;

import com.myapp.domain.OP;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

public class CreateRecordParam {
    private List<OP> ops;
    private Integer maxNum;
    private Integer itemAmount;

    public CreateRecordParam(List<OP> ops, Integer maxNum, Integer itemAmount) {
        this.ops = ops;
        this.maxNum = maxNum;
        this.itemAmount = itemAmount;
    }

    public CreateRecordParam() {
    }

    public List<OP> getOps() {
        return ops;
    }

    public Integer getMaxNum() {
        return maxNum;
    }

    public Integer getItemAmount() {
        return itemAmount;
    }

    public void setOps(List<OP> ops) {
        this.ops = ops;
    }
}
