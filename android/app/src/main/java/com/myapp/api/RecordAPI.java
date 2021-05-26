package com.myapp.api;

import android.widget.Toast;

import androidx.annotation.NonNull;

import com.alibaba.fastjson.JSON;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.myapp.domain.Item;
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
        callback.invoke(JSON.toJSONString(records));
    }

    /**
     * 提交单个题目
     * @param recordId
     * @param items
     * @param itemIndex
     * @param callback
     */
    @ReactMethod
    public static void submitSingleItem(int recordId, int itemIndex,String items, Callback callback) {
        Record record = new Record();
        record.setId((long)recordId);
        record.setItems(JSON.parseArray(items, Item.class));
        // 需要计算下指定itemId的状态
        Item item = record.getItems().stream().filter(e->e.getIndex() == itemIndex).findFirst().orElse(new Item());
        item.judge();
        // 提交数据库
        Record newRecord = RecordRepository.submitSingleItem(record);
        callback.invoke(JSON.toJSONString(newRecord));
    }

    @ReactMethod
    public static void getUnCompleteRecordCount(Callback callback) {
        long count = RecordRepository.getUnCompleteRecordCount();
        callback.invoke(Integer.valueOf(String.valueOf(count)));
    }

    @ReactMethod
    public static void delete(int recordId, Callback callback) {
        int deleteCount = RecordRepository.delete(recordId);
        callback.invoke(deleteCount);
    }
}
