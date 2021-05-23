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
        Record.StatisticsInfo statisticsInfo = record.getStatisticsInfo();
        values.put("createTime", record.getCreateTime());
        values.put("itemAmount", record.getItemAmount());
        values.put("maxNum", record.getMaxNum());
        values.put("rightCount", 0);
        values.put("wrongCount", 0);
        values.put("items", JSON.toJSONString(record.getItems()));
        long id = db.insert(DBConstant.TABLE_NAME_RECORD,null,values);
        if(id==-1){
            throw new RuntimeException("系统异常：创建训练集失败，请稍后再试");
        }
        record.setId(id);
        return record;
    }

    /**
     * 更新题目内容，同时更新正确数和错误数
     * @param record
     */
    public static void submitSingleItem(Record record){
        SQLiteDatabase db = MainActivity.getDatabase();
        ContentValues values = new ContentValues();
        Record.StatisticsInfo statisticsInfo = record.getStatisticsInfo();
        values.put("rightCount", statisticsInfo.getRightCount());
        values.put("wrongCount", statisticsInfo.getWrongCount());
        values.put("items", JSON.toJSONString(record.getItems()));
        db.update(DBConstant.TABLE_NAME_RECORD,values," id = ?", new String[]{record.getId().toString()});
    }
}
