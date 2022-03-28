const fs = require('fs');
const path = require('path');
const template = require('./template');

function compose (...funcs){
    return function ( values ){
        return funcs.reverse().reduce( ( acc, fn ) => {
            return fn(acc)
        }, values )
    }
}

function getFileData (filePath){
    return fs.readFileSync(path.join(__dirname, filePath), 'utf-8')
}

const templateForNode = compose( template, getFileData );

function getDomData (domId){
    return document.querySelector(domId).innerHTML
}

const templateForDom = compose( template, getDomData );

module.exports = {
    templateForNode,
    templateForDom,
}