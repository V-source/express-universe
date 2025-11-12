import UserRepository from "../../domains/users/repositories/user.repository.js";

export default class DbRepository extends UserRepository{

  save(user) {
    return 'user saved'
  }

  findAll() {
    return 'find all'
  }

  findById() {
    return 'find by id'
  }

  deleteById() {
    return 'delete by id'
  }

  findByAge() {
    return 'find by age'
  }

}
