package com.myapp.service;

import com.myapp.domain.OP;
import com.myapp.domain.Record;
import com.myapp.domain.RecordInfoFactory;
import com.myapp.params.CreateRecordParam;
import com.myapp.persistence.RecordRepository;

import java.util.List;

public class QuickStartService {

    public Long createRecord(List<OP> ops, int maxNum, int itemAmount) {
        // 创建记录
        Record record = RecordInfoFactory.genRecordInfo(new CreateRecordParam(ops, maxNum, itemAmount));
        if (record == null) {
            return null;
        }
        record = RecordRepository.add(record);
        return record.getId();
    }
}
