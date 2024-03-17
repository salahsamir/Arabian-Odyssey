


export class ApiFeature{
    constructor(mongooseQuery,data){
        this.mongooseQuery=mongooseQuery
        this.data=data
    }
    ///*pagenation*/
    Pagenite(){
        let {page,size}=this.data
      
        if(!page||page<1){
            page=1
        }
        if(!size||size<1){
            size=1
        }
        return this.mongooseQuery.limit(parseInt(size)).skip((page-1)*size)
    }
    ////*******Sort */
    Sort(){
        let {sort}=this.data
        sort?sort=sort.replaceAll(',', ' '):undefined
        return this.mongooseQuery.sort(sort)

    }
    /*********search */
    Search(){
        let {search}=this.data
        search?search=new RegExp(search, 'i'):undefined
        return this.mongooseQuery.find({name:search})
    }
    /*/*******filter */
    Fields(){
        let {fields}=this.data
        fields?fields=fields.replaceAll(',', ' '):undefined
        return this.mongooseQuery.find({}).select(fields)
    }
    Filter(){
        let data=this.data
        const deletelist=['page','sort','fields','search','size']
    deletelist.forEach((el)=>delete(data[el]))
    const reqQuery =JSON.parse( JSON.stringify(data).replace(/(lt|lte|gt|gte|eq)/g,match=>`$${match}`))
    return this.mongooseQuery.find(reqQuery)

    }
}