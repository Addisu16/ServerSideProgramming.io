class Person{
    constructor(name='john'){
        this.name=name;
    }
    getName(){
        console.log(this.name);
    }
}
module.exports=new Person('Bella');