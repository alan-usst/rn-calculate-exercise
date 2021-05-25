package com.myapp.persistence;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import com.myapp.common.DBRecordConstant;

public class SQLRecordInfoHelper  extends SQLiteOpenHelper {

    public static final String CREATE_RECORD_INFO = "create table record ( "
            + String.format("%s integer primary key autoincrement,", DBRecordConstant.COLUMN_ID)
            + String.format("%s text,", DBRecordConstant.COLUMN_CREATE_TIME)
            + String.format("%s text,", DBRecordConstant.COLUMN_OPS)
            + String.format("%s integer,", DBRecordConstant.COLUMN_MAX_NUM)
            + String.format("%s integer,", DBRecordConstant.COLUMN_ITEM_AMOUNT)
            + String.format("%s integer,", DBRecordConstant.COLUMN_RIGHT_COUNT)
            + String.format("%s integer,", DBRecordConstant.COLUMN_WRONG_COUNT)
            + String.format("%s text)", DBRecordConstant.COLUMN_ITEMS);

    private Context context;


    public SQLRecordInfoHelper (Context context, String name, SQLiteDatabase.CursorFactory factory, int version) {
        super(context, name, factory, version);
        this.context = context;
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        db.execSQL(CREATE_RECORD_INFO);
    }

    //当打开数据库时传入的版本号与当前的版本号不同时会调用该方法
    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL("drop table if exists record");
        onCreate(db);
    }
}
