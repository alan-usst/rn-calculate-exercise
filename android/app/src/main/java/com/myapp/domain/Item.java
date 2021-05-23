package com.myapp.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

public class Item {
    // 题目序号
    private Integer index;
    // 数1
    private Integer n1;
    // 数2
    private Integer n2;
    // 操作符
    private OP op;

    // 期望答案
    private Integer rightAnswer;

    // 已录入结果
    private Integer filledNum;

    // 当前题目状态(默认为未做状态)
    private Status status = Status.UNDO;

    public Item(Integer index, Integer n1, Integer n2, OP op, Integer rightAnswer, Integer filledNum, Status status) {
        this.index = index;
        this.n1 = n1;
        this.n2 = n2;
        this.op = op;
        this.rightAnswer = rightAnswer;
        this.filledNum = filledNum;
        this.status = status;
    }

    public Item() {
    }

    /**
     * 生成等式字符串
     * @return
     */
    @Override
    public String toString(){
        StringBuilder sb = new StringBuilder();
        sb.append(n1).append(" ").append(op.getSymbol()).append(" ").append(n2).append(" = ");
        return sb.toString();
    }

    /**
     * 生成新对象，并计算期望值
     * @param n1
     * @param n2
     * @param op
     */
    public Item(Integer n1, Integer n2, OP op){
        this.n1= n1;
        this.n2 = n2;
        this.op = op;
        this.calculateRightAnswer();
    }

    public enum  Status{
        /**
         * 未做
         * 回答正确
         * 回答错误
         */
        UNDO,
        RIGHT,
        WRONG
    }

    /**
     * 计算期望值
     */
    private void calculateRightAnswer(){
        Integer ans = null;
        switch (this.op){
            case ADD:{
                ans = n1+n2;
                break;
            }
            case SUB:{
                ans = n1-n2;
                break;
            }
            case MUL:{
                ans = n1*n2;
                break;
            }case DIV:{
                ans = n1/n2;
                break;
            }
            default:{
                break;
            }
        }
        this.rightAnswer = ans;
    }

    public Integer getIndex() {
        return index;
    }

    public Integer getN1() {
        return n1;
    }

    public Integer getN2() {
        return n2;
    }

    public OP getOp() {
        return op;
    }

    public Integer getRightAnswer() {
        return rightAnswer;
    }

    public Integer getFilledNum() {
        return filledNum;
    }

    public Status getStatus() {
        return status;
    }

    public void setIndex(Integer index) {
        this.index = index;
    }

    public void setN1(Integer n1) {
        this.n1 = n1;
    }

    public void setN2(Integer n2) {
        this.n2 = n2;
    }

    public void setOp(OP op) {
        this.op = op;
    }

    public void setRightAnswer(Integer rightAnswer) {
        this.rightAnswer = rightAnswer;
    }

    public void setFilledNum(Integer filledNum) {
        this.filledNum = filledNum;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
