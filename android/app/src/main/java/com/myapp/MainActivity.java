package com.myapp;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.myapp.persistence.SQLRecordInfoHelper;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

import expo.modules.splashscreen.singletons.SplashScreen;
import expo.modules.splashscreen.SplashScreenImageResizeMode;

public class MainActivity extends ReactActivity {

    public static Context context;
    public static SQLRecordInfoHelper helper;

    public static SQLiteDatabase getDatabase() {
        return helper == null ? null : helper.getWritableDatabase();
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        context = this;
        // 初始化数据库
        helper = new SQLRecordInfoHelper(this, "FourOperations.db", null, 2);
        //检测到没有FourOperations这个数据库，会创建该数据库并调用MyDatabaseHelper中的onCreated方法。
        helper.getWritableDatabase();

        super.onCreate(null);
        // SplashScreen.show(...) has to be called after super.onCreate(...)
        // Below line is handled by '@expo/configure-splash-screen' command and it's discouraged to modify it manually
        SplashScreen.show(this, SplashScreenImageResizeMode.CONTAIN, ReactRootView.class, false);
    }


    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "main";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Override
            protected ReactRootView createRootView() {
                return new RNGestureHandlerEnabledRootView(MainActivity.this);
            }
        };
    }
}
