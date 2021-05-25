package com.myapp.persistence;

import android.content.ContentValues;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;

import com.alibaba.fastjson.JSON;
import com.myapp.MainActivity;
import com.myapp.common.DBRecordConstant;
import com.myapp.domain.Item;
import com.myapp.domain.OP;
import com.myapp.domain.Record;

import java.util.ArrayList;
import java.util.List;

public class RecordRepository {

    public static Record add(Record record) {
        SQLiteDatabase db = MainActivity.getDatabase();
        ContentValues values = new ContentValues();
        values.put(DBRecordConstant.COLUMN_CREATE_TIME, record.getCreateTime());
        values.put(DBRecordConstant.COLUMN_ITEM_AMOUNT, record.getItemAmount());
        values.put(DBRecordConstant.COLUMN_OPS, JSON.toJSONString(record.getOps()));
        values.put(DBRecordConstant.COLUMN_MAX_NUM, record.getMaxNum());
        values.put(DBRecordConstant.COLUMN_RIGHT_COUNT, 0);
        values.put(DBRecordConstant.COLUMN_WRONG_COUNT, 0);
        values.put(DBRecordConstant.COLUMN_ITEMS, JSON.toJSONString(record.getItems()));
        long id = db.insert(DBRecordConstant.TABLE_NAME, null, values);
        if (id == -1) {
            throw new RuntimeException("系统异常：创建训练集失败，请稍后再试");
        }
        record.setId(id);
        db.close();
        return record;
    }

    /**
     * 更新题目内容，同时更新正确数和错误数
     *
     * @param record
     */
    public static Record submitSingleItem(Record record) {
        SQLiteDatabase db = MainActivity.getDatabase();
        ContentValues values = new ContentValues();
        Record.StatisticsInfo statisticsInfo = record.calculateStatisticsInfo();
        values.put(DBRecordConstant.COLUMN_RIGHT_COUNT, statisticsInfo.getRightCount());
        values.put(DBRecordConstant.COLUMN_WRONG_COUNT, statisticsInfo.getWrongCount());
        values.put(DBRecordConstant.COLUMN_ITEMS, JSON.toJSONString(record.getItems()));
        db.update(DBRecordConstant.TABLE_NAME, values, String.format("%s = ?", DBRecordConstant.COLUMN_ID), new String[]{record.getId().toString()});
        db.close();
        return getById(record.getId());
    }

    /**
     * 根据id获取record
     *
     * @param recordId
     * @return
     */
    public static Record getById(Long recordId) {
        SQLiteDatabase db = MainActivity.getDatabase();
        Cursor cursor = db.query(DBRecordConstant.TABLE_NAME, null, String.format("%s = ?", DBRecordConstant.COLUMN_ID), new String[]{recordId.toString()}, null, null, null, null);
        Record res = new Record();

        if (cursor.getCount() == 1) {
            //移动到首位
            cursor.moveToFirst();
            long id = cursor.getLong(cursor.getColumnIndex(DBRecordConstant.COLUMN_ID));
            String createTime = cursor.getString(cursor.getColumnIndex(DBRecordConstant.COLUMN_CREATE_TIME));
            String ops = cursor.getString(cursor.getColumnIndex(DBRecordConstant.COLUMN_OPS));
            int itemAmount = cursor.getInt(cursor.getColumnIndex(DBRecordConstant.COLUMN_ITEM_AMOUNT));
            int rightCount = cursor.getInt(cursor.getColumnIndex(DBRecordConstant.COLUMN_RIGHT_COUNT));
            int wrongCount = cursor.getInt(cursor.getColumnIndex(DBRecordConstant.COLUMN_WRONG_COUNT));
            int maxNum = cursor.getInt(cursor.getColumnIndex(DBRecordConstant.COLUMN_MAX_NUM));
            String items = cursor.getString(cursor.getColumnIndex(DBRecordConstant.COLUMN_ITEMS));

            res.setId(id);
            res.setCreateTime(createTime);
            res.setOps(JSON.parseArray(ops, OP.class));
            res.setItemAmount(itemAmount);
            res.setRightCount(rightCount);
            res.setWrongCount(wrongCount);
            res.setMaxNum(maxNum);
            res.setItems(JSON.parseArray(items, Item.class));
        } else {
            res = null;
        }
        cursor.close();
        db.close();
        return res;
    }

    public static List<Record> getOverviewList(int pageIndex, int pageSize) {
        SQLiteDatabase db = MainActivity.getDatabase();
        Cursor cursor = db.query(DBRecordConstant.TABLE_NAME,
                new String[]{DBRecordConstant.COLUMN_ID, DBRecordConstant.COLUMN_CREATE_TIME,
                        DBRecordConstant.COLUMN_OPS, DBRecordConstant.COLUMN_ITEM_AMOUNT,
                        DBRecordConstant.COLUMN_RIGHT_COUNT, DBRecordConstant.COLUMN_WRONG_COUNT,
                        DBRecordConstant.COLUMN_MAX_NUM},
                null, null, null, null, String.format("%s desc", DBRecordConstant.COLUMN_CREATE_TIME),
                String.format("%s,%s", (pageIndex - 1) * pageSize, pageSize)
        );
        List<Record> res = new ArrayList<>();

        if (cursor.getCount() > 0) {
            //移动到首位
            cursor.moveToFirst();
            for (int i = 0; i < cursor.getCount(); i++) {
                long id = cursor.getLong(cursor.getColumnIndex(DBRecordConstant.COLUMN_ID));
                String createTime = cursor.getString(cursor.getColumnIndex(DBRecordConstant.COLUMN_CREATE_TIME));
                String ops = cursor.getString(cursor.getColumnIndex(DBRecordConstant.COLUMN_OPS));
                int itemAmount = cursor.getInt(cursor.getColumnIndex(DBRecordConstant.COLUMN_ITEM_AMOUNT));
                int rightCount = cursor.getInt(cursor.getColumnIndex(DBRecordConstant.COLUMN_RIGHT_COUNT));
                int wrongCount = cursor.getInt(cursor.getColumnIndex(DBRecordConstant.COLUMN_WRONG_COUNT));
                int maxNum = cursor.getInt(cursor.getColumnIndex(DBRecordConstant.COLUMN_MAX_NUM));

                Record record = new Record();
                record.setId(id);
                record.setCreateTime(createTime.split(" ")[0]);
                record.setOps(JSON.parseArray(ops, OP.class));
                record.setItemAmount(itemAmount);
                record.setRightCount(rightCount);
                record.setWrongCount(wrongCount);
                record.setMaxNum(maxNum);
                res.add(record);
                //移动到首位
                cursor.moveToNext();
            }
        }
        cursor.close();
        db.close();
        return res;
    }
}
