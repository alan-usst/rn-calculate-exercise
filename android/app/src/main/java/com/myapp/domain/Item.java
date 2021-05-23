package com.myapp.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor(suppressConstructorProperties = true)
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
}
