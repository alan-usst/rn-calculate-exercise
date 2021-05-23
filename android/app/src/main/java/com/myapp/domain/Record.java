package com.myapp.domain;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

public class Record {

    private Long id;

    private String createTime;

    private Integer itemAmount;

    private Integer maxNum;

    private List<Item> items;

    public Record(Long id, String createTime, Integer itemAmount, Integer maxNum, List<Item> items) {
        this.id = id;
        this.createTime = createTime;
        this.itemAmount = itemAmount;
        this.maxNum = maxNum;
        this.items = items;
    }

    public Record() {
    }

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

    public static class StatisticsInfo{
        private Integer total;
        private Integer rightCount;
        private Integer wrongCount;
        private Integer undoCount;

        public StatisticsInfo(){
        }

        public StatisticsInfo(Integer total, Integer rightCount, Integer wrongCount, Integer undoCount) {
            this.total = total;
            this.rightCount = rightCount;
            this.wrongCount = wrongCount;
            this.undoCount = undoCount;
        }

        public void setTotal(Integer total) {
            this.total = total;
        }

        public void setRightCount(Integer rightCount) {
            this.rightCount = rightCount;
        }

        public void setWrongCount(Integer wrongCount) {
            this.wrongCount = wrongCount;
        }

        public void setUndoCount(Integer undoCount) {
            this.undoCount = undoCount;
        }

        public Integer getTotal() {
            return total;
        }

        public Integer getRightCount() {
            return rightCount;
        }

        public Integer getWrongCount() {
            return wrongCount;
        }

        public Integer getUndoCount() {
            return undoCount;
        }
    }

    public Long getId() {
        return id;
    }

    public String getCreateTime() {
        return createTime;
    }

    public Integer getItemAmount() {
        return itemAmount;
    }

    public Integer getMaxNum() {
        return maxNum;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public void setItemAmount(Integer itemAmount) {
        this.itemAmount = itemAmount;
    }

    public void setMaxNum(Integer maxNum) {
        this.maxNum = maxNum;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }
}
