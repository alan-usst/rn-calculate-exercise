package com.myapp.api;

import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.jetbrains.annotations.NotNull;

public class Test extends ReactContextBaseJavaModule {

    public Test(final ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @NotNull
    @Override
    public String getName() {
        return "RNTestMethod";
    }

    @ReactMethod
    public void show(String msg, Callback callback){
        Toast.makeText(getReactApplicationContext(),"Js调用显示原生传递的参数是:"+msg,Toast.LENGTH_LONG).show();
        callback.invoke("RNToastModule 调用JS方法");
    }
}
