package com.myapp.persistence;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class SQLRecordInfoHelper  extends SQLiteOpenHelper {

    public static final String CREATE_RECORD_INFO = "create table record ( "
            + "id integer primary key autoincrement,"
            + "createTime text,"
            + "maxNum integer,"
            + "itemAmount integer,"
            + "rightCount integer,"
            + "wrongCount integer,"
            + "items text)";

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
