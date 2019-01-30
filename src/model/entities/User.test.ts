import {User} from "./User";

describe("User", () => {
  it("creates a new valid user instance with defaults", () => {
    // given
    const userAttr = {
      id: "9448d63c-b679-4b19-a292-24027b0f354c",
    };
    // when
    const user = new User({
      ...userAttr
    });
    // then
    expect(user.id).toEqual(userAttr.id);
    expect(user.email).toEqual(null);
    expect(user.name).toEqual(null);
  });
  it("creates a new valid song instance", () => {
    // given
    const userAttr = {
      id: "9448d63c-b679-4b19-a292-24027b0f354c",
      name: "Test User",
      email: "test@email.com",
      createdAt: 1548843993341,
    };
    // when
    const user = new User({
      ...userAttr
    });
    // then
    expect(user.id).toEqual(userAttr.id);
    expect(user.name).toEqual(userAttr.name);
    expect(user.email).toEqual(userAttr.email);
    expect(user.createdAt).toEqual(userAttr.createdAt);
  });
});
