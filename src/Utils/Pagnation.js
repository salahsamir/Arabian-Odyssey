

export const Pagnation=(page,size=1)=>{
    page=page||1
    size=size||1
    if(page<1){
        page=1
    }
    if(size<1){
        size=1
    }
    page=parseInt(page)
    size=parseInt(size)
    return {
        skip:(size-1)*page,
        limit:size
    }
}