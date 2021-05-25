package com.myapp.domain;

import com.facebook.common.util.HashCodeUtil;

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
    private Integer filledAnswer;

    // 当前题目状态(默认为未做状态)
    private Status status = Status.UNDO;

    public Item(Integer index, Integer n1, Integer n2, OP op, Integer rightAnswer, Integer filledAnswer, Status status) {
        this.index = index;
        this.n1 = n1;
        this.n2 = n2;
        this.op = op;
        this.rightAnswer = rightAnswer;
        this.filledAnswer = filledAnswer;
        this.status = status;
    }

    public Item() {
    }

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof Item))
            return false;
        if (obj == this)
            return true;
        return this.toString().equals(obj.toString());
    }

    @Override
    public int hashCode(){
        return this.toString().hashCode();
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

    public void judge(){
        if(this.rightAnswer.equals(this.filledAnswer)){
            this.status = Status.RIGHT;
        }else{
            this.status = Status.WRONG;
        }
    }

    public boolean ifDivValid(){
        if(!OP.DIV.equals(this.op)){
            return true;
        }
        if(this.n1.equals(this.n2) || this.n2.equals(1)){
            return false;
        }
        return true;
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

    public Integer getFilledAnswer() {
        return filledAnswer;
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

    public void setFilledAnswer(Integer filledAnswer) {
        this.filledAnswer = filledAnswer;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
