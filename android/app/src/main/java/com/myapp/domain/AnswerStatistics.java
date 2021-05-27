package com.myapp.domain;

import java.util.List;

public class AnswerStatistics {
    private int totalRightCount;
    private int totalWrongCount;
    private List<DayStatistics> days;

    public int getTotalRightCount() {
        return totalRightCount;
    }

    public int getTotalWrongCount() {
        return totalWrongCount;
    }

    public List<DayStatistics> getDays() {
        return days;
    }

    public void setTotalRightCount(int totalRightCount) {
        this.totalRightCount = totalRightCount;
    }

    public void setTotalWrongCount(int totalWrongCount) {
        this.totalWrongCount = totalWrongCount;
    }

    public void setDays(List<DayStatistics> days) {
        this.days = days;
    }

    public static class DayStatistics{
        private Long id;
        private String submitTime;
        private int rightCount;
        private int wrongCount;

        public Long getId() {
            return id;
        }

        public String getSubmitTime() {
            return submitTime;
        }

        public int getRightCount() {
            return rightCount;
        }

        public int getWrongCount() {
            return wrongCount;
        }

        public void setSubmitTime(String submitTime) {
            this.submitTime = submitTime;
        }

        public void setRightCount(int rightCount) {
            this.rightCount = rightCount;
        }

        public void setWrongCount(int wrongCount) {
            this.wrongCount = wrongCount;
        }

        public void setId(long id) {
            this.id = id;
        }
    }
}
