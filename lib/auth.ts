export const users = [
    {
      username: "admin",
      password: "1234",
      name: "Admin",
    },
]

export function validateUser(username: string,password:string){
    return users.find(
        (user)=> user.username ===username && user.password===password
    );
}