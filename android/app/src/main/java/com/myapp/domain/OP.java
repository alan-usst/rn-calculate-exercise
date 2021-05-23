package com.myapp.domain;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;

public enum OP {
    /**
     * 运算操作
     */
    ADD("+"),
    SUB("-"),
    MUL("×"),
    DIV("÷");

    OP(String s){
        this.symbol = s;

    }
    /**
     * 符号
     */
    private final String symbol;

    public String getSymbol(){
        return this.symbol;
    }

    /**
     * 通过字符串获得对应枚举操作符
     * @param input
     * @return
     */
    public static OP getBySymbol(String input) {
        if (input == null) {
            return null;
        }
        input = input.trim();
        if ("－".equals(input)) {
            return SUB;
        }
        for (OP item : OP.values()) {
            if (item.symbol.equals(input)) {
                return item;
            }

        }
        return null;
    }

    public static List<OP> getByStrings(List<Object> inputs){
        List<OP> res = new ArrayList<>();
        for(Object input: inputs){
            if(input instanceof String){
                for(OP item: OP.values()){
                    if(item.name().equalsIgnoreCase((String)input)){
                        res.add(item);
                    }
                }
            }
        }
        return res;
    }
}
