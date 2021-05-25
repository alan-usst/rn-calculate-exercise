package com.myapp.domain;

import com.myapp.params.CreateRecordParam;
import com.myapp.utils.TimeUtil;

import java.util.Collections;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;

public class RecordInfoFactory {

    private static final Random rnd = new Random();

    public static Record genRecordInfo(CreateRecordParam param){

        Record res = new Record();
        List<Item> items = genItems(param);
        res.setCreateTime(TimeUtil.getNowStr());
        res.setOps(param.getOps());
        res.setMaxNum(param.getMaxNum());
        res.setItemAmount(items.size());
        res.setItems(items);

        return res;

    }

    /**
     * 生成题目集合
     * @param param
     */
    private static List<Item> genItems(CreateRecordParam param){
        int count = 1;
        int index = 1;
        Set<Item> items = new HashSet<>();
        while(count<=param.getItemAmount()){
            count++;
            Item item = genRandomItem(param);
            // 去重尝试
            int maxRetryTimes = 10;
            while ((item==null || items.contains(item)) && maxRetryTimes>0){
                maxRetryTimes--;
                item = genRandomItem(param);
            }
            if(item!=null){
                item.setIndex(index++);
                items.add(item);
            }
        }
        return items.stream().sorted(Comparator.comparingInt(Item::getIndex)).collect(Collectors.toList());
    }

    /**
     * 生成随机item
     * @param param
     * @return
     */
    private static Item genRandomItem(CreateRecordParam param){
        int totalRetryTime = 10;
        while(totalRetryTime>0){
            totalRetryTime--;
            // 随机获得操作符
            Collections.shuffle(param.getOps());
            OP op = param.getOps().get(0);
            // 获取第一个数
            int n1 = getRandomNum(param.getMaxNum());
            if(!OP.DIV.equals(op)){
                int n2 = getRandomNum(n1);
                return new Item(n1, n2, op);
            }
            // 如果是除法，一定要保证能够被整除
            int maxRetryTime = 10;
            while(maxRetryTime>0){
                maxRetryTime--;
                int n2 = getRandomNum(n1);
                if(n1%n2!=0){
                    // 如果除法无法找到整除的场景，则重试
                    continue;
                }
                return new Item(n1, n2, op);
            }
        }
        return null;
    }

    /**
     * 获取随机数
     * @param maxNum
     * @return
     */
    private static int getRandomNum(Integer maxNum){
        return rnd.nextInt(maxNum) + 1;
    }
}
