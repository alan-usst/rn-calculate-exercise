package com.myapp.domain;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor(suppressConstructorProperties = true)
@NoArgsConstructor
public class Record {

    private Long id;

    private String createTime;

    private Integer itemAmount;

    private Integer maxNum;

    private List<Item> items;


    /**
     * 获取统计信息
     * @return
     */
    public StatisticsInfo getStatisticsInfo(){
        if(items ==null|| items.isEmpty()){
            return new StatisticsInfo(0,0,0,0);
        }
        StatisticsInfo res = new StatisticsInfo();
        res.setTotal(items.size());
        res.setRightCount((int) items.stream().filter(item-> Item.Status.RIGHT.equals(item.getStatus())).count());
        res.setWrongCount((int) items.stream().filter(item-> Item.Status.WRONG.equals(item.getStatus())).count());
        res.setUndoCount((int) items.stream().filter(item-> Item.Status.UNDO.equals(item.getStatus())).count());

        return res;
    }

    @Data
    @AllArgsConstructor(suppressConstructorProperties = true)
    public static class StatisticsInfo{
        private Integer total;
        private Integer rightCount;
        private Integer wrongCount;
        private Integer undoCount;

        public StatisticsInfo(){

        }
    }
}
