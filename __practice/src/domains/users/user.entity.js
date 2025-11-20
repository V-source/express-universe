export class UserEntity {
  constructor(id, name, email, password, age) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.age = age;

    if (this.age < 18) {
      throw Error("Age must be greater than 18", {
        cause: {
          status: 422,
        },
      });
    }
  }
}

export default UserEntity;
