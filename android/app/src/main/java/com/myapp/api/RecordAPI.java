package com.myapp.api;

import android.widget.Toast;

import androidx.annotation.NonNull;

import com.alibaba.fastjson.JSON;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.myapp.domain.OP;
import com.myapp.domain.Record;
import com.myapp.domain.RecordInfoFactory;
import com.myapp.params.CreateRecordParam;
import com.myapp.persistence.RecordRepository;

import org.jetbrains.annotations.NotNull;

import java.util.List;

public class RecordAPI extends ReactContextBaseJavaModule {

    public RecordAPI(final ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @NotNull
    @Override
    public String getName() {
        return "RecordAPI";
    }

    /**
     * 新增record
     *
     * @param opArray
     * @param maxNum
     * @param itemAmount
     * @param callback
     */
    @ReactMethod
    public static void add(ReadableArray opArray, int maxNum, int itemAmount, Callback callback) {

        List<OP> ops = OP.getByStrings(opArray.toArrayList());
        // 创建记录
        Record record = RecordInfoFactory.genRecordInfo(new CreateRecordParam(ops, maxNum, itemAmount));
        record = RecordRepository.add(record);
        callback.invoke(Integer.valueOf(record.getId().toString()));
    }

    /**
     * 根据id获取record详情
     *
     * @param recordId
     * @param callback
     */
    @ReactMethod
    public static void getDetailById(int recordId, Callback callback) {
        Record record = RecordRepository.getById((long) recordId);
        callback.invoke(JSON.toJSONString(record));
    }

    @ReactMethod
    public static void getOverviewList(int pageIndex, int pageSize, Callback callback) {
        List<Record> records = RecordRepository.getOverviewList(pageIndex, pageSize);
        System.out.println("getOverviewList");
        System.out.println("records size:" + records.size());
        callback.invoke(JSON.toJSONString(records));
    }
}
