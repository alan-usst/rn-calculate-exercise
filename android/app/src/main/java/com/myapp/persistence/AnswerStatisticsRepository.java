package com.myapp.persistence;

import android.content.ContentValues;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;

import com.alibaba.fastjson.JSON;
import com.myapp.MainActivity;
import com.myapp.common.DBAnswerStatisticsConstant;
import com.myapp.domain.AnswerStatistics;
import com.myapp.domain.AnswerStatistics.DayStatistics;
import com.myapp.domain.Item;
import com.myapp.domain.OP;
import com.myapp.domain.Record;
import com.myapp.utils.TimeUtil;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class AnswerStatisticsRepository {

    public static void add(boolean ifRight) {
        SQLiteDatabase db = MainActivity.getDatabase();
        String submitTime = TimeUtil.getNowDateStr();
        DayStatistics existOne = getBySubmitTime(submitTime);
        if (existOne != null) {
            ContentValues values = new ContentValues();
            if (ifRight) {
                values.put(DBAnswerStatisticsConstant.COLUMN_RIGHT_COUNT, existOne.getRightCount() + 1);
            } else {
                values.put(DBAnswerStatisticsConstant.COLUMN_WRONG_COUNT, existOne.getWrongCount() + 1);
            }
            db.update(DBAnswerStatisticsConstant.TABLE_NAME, values, String.format("%s = ?", DBAnswerStatisticsConstant.COLUMN_ID), new String[]{existOne.getId().toString()});
        } else {
            ContentValues values = new ContentValues();
            values.put(DBAnswerStatisticsConstant.COLUMN_SUBMIT_TIME, submitTime);
            values.put(DBAnswerStatisticsConstant.COLUMN_RIGHT_COUNT, ifRight ? 1 : 0);
            values.put(DBAnswerStatisticsConstant.COLUMN_WRONG_COUNT, ifRight ? 0 : 1);
            db.insert(DBAnswerStatisticsConstant.TABLE_NAME, null, values);
        }
        db.close();
    }

    public static DayStatistics getBySubmitTime(String submitTIme) {
        SQLiteDatabase db = MainActivity.getDatabase();
        Cursor cursor = db.query(DBAnswerStatisticsConstant.TABLE_NAME, null, String.format("%s = ?", DBAnswerStatisticsConstant.COLUMN_SUBMIT_TIME), new String[]{submitTIme}, null, null, null, null);
        DayStatistics res = new DayStatistics();
        if (cursor.getCount() == 1) {
            //移动到首位
            cursor.moveToFirst();
            long id = cursor.getLong(cursor.getColumnIndex(DBAnswerStatisticsConstant.COLUMN_ID));
            String submitTime = cursor.getString(cursor.getColumnIndex(DBAnswerStatisticsConstant.COLUMN_SUBMIT_TIME));
            int rightCount = cursor.getInt(cursor.getColumnIndex(DBAnswerStatisticsConstant.COLUMN_RIGHT_COUNT));
            int wrongCount = cursor.getInt(cursor.getColumnIndex(DBAnswerStatisticsConstant.COLUMN_WRONG_COUNT));
            res.setId(id);
            res.setSubmitTime(submitTime);
            res.setRightCount(rightCount);
            res.setWrongCount(wrongCount);
        } else {
            res = null;
        }
        cursor.close();
//        db.close();
        return res;
    }

    public static List<DayStatistics> getDayStatistics(Integer dayNum) {
        SQLiteDatabase db = MainActivity.getDatabase();
        Cursor cursor = db.query(DBAnswerStatisticsConstant.TABLE_NAME, null, null, null, null, null, "id desc", dayNum==null?null:dayNum.toString());
        List<DayStatistics> res = new ArrayList<>();
        if (cursor.getCount() > 0) {
            //移动到首位
            cursor.moveToFirst();
            for (int i = 0; i < cursor.getCount(); i++) {
                DayStatistics item = new DayStatistics();
                long id = cursor.getLong(cursor.getColumnIndex(DBAnswerStatisticsConstant.COLUMN_ID));
                String submitTime = cursor.getString(cursor.getColumnIndex(DBAnswerStatisticsConstant.COLUMN_SUBMIT_TIME));
                int rightCount = cursor.getInt(cursor.getColumnIndex(DBAnswerStatisticsConstant.COLUMN_RIGHT_COUNT));
                int wrongCount = cursor.getInt(cursor.getColumnIndex(DBAnswerStatisticsConstant.COLUMN_WRONG_COUNT));
                item.setId(id);
                item.setSubmitTime(submitTime);
                item.setRightCount(rightCount);
                item.setWrongCount(wrongCount);
                res.add(item);
                //移动到下一个
                cursor.moveToNext();
            }
        }
        cursor.close();
        db.close();
        return res;
    }
}
