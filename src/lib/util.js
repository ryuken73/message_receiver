export const genSequence = function* (){
    let sequence = 0;
    while(true){
        yield sequence++;
    }
}