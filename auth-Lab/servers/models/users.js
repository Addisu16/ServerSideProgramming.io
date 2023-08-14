const users=[];

module.exports=class User{
constructor(username,password,role){
    this.username=username;
    this.password=password;
    this.role=role;
}
login(){
    return users.find((user)=>user.username===this.username && user.password===this.password);
}

static check(){
    users.push(new User('Addis','1245','admin'));
    users.push(new User('Yanny','45456','user'));
}
}