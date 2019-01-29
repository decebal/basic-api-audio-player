import "reflect-metadata";
import {User} from "../../model/entities";
import {UserRepository} from "./UserRepository";

const userRepositoryInstance = new UserRepository();
describe("User Repository", () => {
  beforeEach(()=> {
    userRepositoryInstance.userList = [];
  });
  describe("Retrieve a user", () => {
    it("it can retrieve a user from a list by id, when user is in list", async () => {
      // given
      const user = new User({
        id: "bf1c16d5-118c-4ac4-9743-0df21ed29773",
        email: "test.user1@example.com",
        name: "Test User1"
      });
      userRepositoryInstance.userList = [
        user
      ];
      // when
      const got = await userRepositoryInstance.findOne(user.id);
      // then
      expect(got).toEqual(user);
    });
    it("it returns undefined when user is not in list", async () => {
      // given
      const user = new User({
        id: "bf1c16d5-118c-4ac4-9743-0df21ed29773",
        email: "test.user1@example.com",
        name: "Test User1"
      });
      userRepositoryInstance.userList = [
        user
      ];
      // when
      const got = await userRepositoryInstance.findOne("bf1c16d5-118c-4ac4-9743-0df21ed29772");
      // then
      expect(got).toEqual(undefined);
    });
    it("it returns undefined when users list is empty", async () => {
      // given
      // when
      const got = await userRepositoryInstance.findOne("bf1c16d5-118c-4ac4-9743-0df21ed29773");
      // then
      expect(got).toEqual(undefined);
    });
  });
  describe("Create a new user", () => {
    it("add user successfully to storage", async () => {
      // given
      const user = new User({
        id: "bf1c16d5-118c-4ac4-9743-0df21ed29773",
        email: "test.user1@example.com",
        name: "Test User1"
      });
      // when
      const got = await userRepositoryInstance.create(user);
      // then
      expect(userRepositoryInstance.userList).toEqual([user]);
      expect(got).toEqual(true);
    });
  });
});
