const S4 = () =>{
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

export const guid = () => {
    return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
}

export const DateMaker = () => {
    const date = new Date();
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}