package com.myapp.utils;

import java.text.SimpleDateFormat;

public class TimeUtil {

    /**
     * 获取当前时间
     * @return
     */
    public static String getNowStr() {
        long currentTime = System.currentTimeMillis();
        String timeNow = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(currentTime);
        return timeNow;
    }
}
