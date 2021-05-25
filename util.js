
const getOpStr = function (opEnum){
    if (opEnum == "ADD") {
      return "+";
    } else if (opEnum == "SUB") {
      return "-";
    } else if (opEnum == "MUL") {
      return "×";
    } else if (opEnum == "DIV") {
      return "÷";
    }
    return "";
  }


const getOpListStr = function(opList) {
    let res = [];
    opList.forEach(ele => {
        res.push(getOpStr(ele));
    });
    return res;
}

export {getOpStr, getOpListStr}