function template( str ){
    str = `
        let str = '';
        with(data){
            str+=\`${str}\`
        }
        return str;
    `;
    //处理变量
    const variableReg = /\{\{([^\}]+)\}\}/g;
    str = str.replace(variableReg, (match, p1, offset, string) => `$\{${p1.trim()}\}`);

    //处理js语句
    const jsReg = /\{%([^%]+)%\}/g;
    str = str.replace(jsReg, (match, p1, offset, string) => `\`\n${p1}str+=\``);
    const func = new Function('data', str)

    return func
}

module.exports = template;