package com.myapp.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum OP {
    /**
     * 运算操作
     */
    ADD("+"),
    SUB("-"),
    MUL("×"),
    DIV("÷");

    /**
     * 符号
     */
    private final String symbol;

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
}
