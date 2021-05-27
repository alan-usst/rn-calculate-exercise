package com.myapp.api;

import androidx.annotation.NonNull;

import com.alibaba.fastjson.JSON;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.myapp.domain.AnswerStatistics;
import com.myapp.domain.AnswerStatistics.DayStatistics;
import com.myapp.domain.Item;
import com.myapp.domain.OP;
import com.myapp.domain.Record;
import com.myapp.domain.RecordInfoFactory;
import com.myapp.params.CreateRecordParam;
import com.myapp.persistence.AnswerStatisticsRepository;
import com.myapp.persistence.RecordRepository;

import org.jetbrains.annotations.NotNull;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import static com.myapp.persistence.AnswerStatisticsRepository.getDayStatistics;

public class StatisticsAPI extends ReactContextBaseJavaModule {

    public StatisticsAPI(final ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @NotNull
    @Override
    public String getName() {
        return "StatisticsAPI";
    }

    @ReactMethod
    public static void getOverviewList(int recentDayNum, Callback callback) {
        AnswerStatistics res = new AnswerStatistics();
        // 统计total
        List<DayStatistics> totalList = AnswerStatisticsRepository.getDayStatistics(null);
        res.setTotalRightCount(totalList.stream().mapToInt(DayStatistics::getRightCount).sum());
        res.setTotalWrongCount(totalList.stream().mapToInt(DayStatistics::getWrongCount).sum());
        // 统计最近 recentDayNum 天
        List<DayStatistics> days = AnswerStatisticsRepository.getDayStatistics(recentDayNum);
        res.setDays(days.stream().sorted(Comparator.comparingLong(DayStatistics::getId)).collect(Collectors.toList()));
        // 回调
        callback.invoke(JSON.toJSONString(res));
    }
}
