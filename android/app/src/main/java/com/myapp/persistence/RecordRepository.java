package com.myapp.persistence;

import android.content.ContentValues;
import android.database.sqlite.SQLiteDatabase;

import com.alibaba.fastjson.JSON;
import com.myapp.MainActivity;
import com.myapp.common.DBConstant;
import com.myapp.domain.Record;

public class RecordRepository {

    public static Record add(Record record){
        SQLiteDatabase db = MainActivity.getDatabase();
        ContentValues values = new ContentValues();
        values.put("createTime", record.getCreateTime());
        values.put("itemAmount", record.getItemAmount());
        values.put("maxNum", record.getMaxNum());
        values.put("statistics", JSON.toJSONString(record.getStatisticsInfo()));
        values.put("items", JSON.toJSONString(record.getItems()));
        long id = db.insert(DBConstant.TABLE_NAME_RECORD,null,values);
        if(id==-1){
            throw new RuntimeException("系统异常：创建训练集失败，请稍后再试");
        }
        record.setId(id);
        return record;
    }
}
