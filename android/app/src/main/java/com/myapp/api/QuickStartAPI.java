package com.myapp.api;

import android.widget.Toast;

import androidx.annotation.NonNull;

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

public class QuickStartAPI extends ReactContextBaseJavaModule {

    public QuickStartAPI(final ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @NotNull
    @Override
    public String getName() {
        return "QuickStartAPI";
    }

    @ReactMethod
    public void show(String msg, Callback callback){
        Toast.makeText(getReactApplicationContext(),"Js调用显示原生传递的参数是:"+msg,Toast.LENGTH_LONG).show();
        callback.invoke("RNToastModule 调用JS方法");
    }

    @ReactMethod
    public static void createRecord(ReadableArray opArray, int maxNum, int itemAmount, Callback callback) {

        List<OP> ops = OP.getByStrings(opArray.toArrayList());
        // 创建记录
        Record record = RecordInfoFactory.genRecordInfo(new CreateRecordParam(ops, maxNum, itemAmount));
        record = RecordRepository.add(record);
        callback.invoke(Integer.valueOf(record.getId().toString()));
    }
}
