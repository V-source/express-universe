export class UserEntity {
  constructor(id, name, email, password, age) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;

    if (this.age < 18) {
      throw new Error("Age must be greater than 18");
    }
  }
}

export default UserEntity;
