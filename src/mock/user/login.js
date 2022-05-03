import Mock from "mockjs";
import "@/mock/extend";

const user = Mock.mock({
  name: "@ADMIN",
  avatar: "@AVATAR",
  address: "@CITY",
  position: "@POSITION",
});
Mock.mock(`${process.env.VUE_APP_API_BASE_URL}/login`, "post", ({ body }) => {
  let result = { data: {} };
  const { name, password } = JSON.parse(body);

  let success = false;

  if (name === "admin" && password === "888888") {
    success = true;
    result.data.permissions = [{ id: "admin", operation: ["add", "edit"] }];
    result.data.roles = [{ id: "admin", operation: ["add", "edit", "delete"] }];
  } else if (name === "tea" && password === "888888") {
    success = true;
    result.data.permissions = [{ id: "teacher", operation: ["add", "edit"] }];
    result.data.roles = [
      { id: "teacher", operation: ["add", "edit", "delete"] },
    ];
  } else if (name === "func" && password === "888888") {
    success = true;
    result.data.permissions = [
      { id: "functional", operation: ["add", "edit"] },
    ];
    result.data.roles = [
      { id: "functional", operation: ["add", "edit", "delete"] },
    ];
  } else if (name === "hr" && password === "888888") {
    success = true;
    result.data.permissions = [{ id: "hr", operation: ["add", "edit"] }];
    result.data.roles = [{ id: "hr", operation: ["add", "edit", "delete"] }];
  } else if (name === "su" && password === "888888") {
    success = true;
    result.data.permissions = [{ id: "su", operation: ["add", "edit"] }];
    result.data.roles = [{ id: "su", operation: ["add", "edit", "delete"] }];
  } else if (name === "science" && password === "888888") {
    success = true;
    result.data.permissions = [
      { id: "su", operation: ["add", "edit"] },
      { id: "science", operation: ["add", "edit"] },
    ];
    result.data.roles = [{ id: "su", operation: ["add", "edit", "delete"] }];
  } else if (name === "innovate" && password === "888888") {
    success = true;
    result.data.permissions = [
      { id: "su", operation: ["add", "edit"] },
      { id: "innovate", operation: ["add", "edit"] },
    ];
    result.data.roles = [{ id: "su", operation: ["add", "edit", "delete"] }];
  } else {
    success = false;
  }

  if (success) {
    result.code = 0;
    result.message = Mock.mock("@TIMEFIX").CN + "，欢迎回来";
    result.data.user = user;
    result.data.token = "Authorization:" + Math.random();
    result.data.expireAt = new Date(new Date().getTime() + 30 * 60 * 1000);
  } else {
    result.code = -1;
    result.message = "账户名或密码错误（admin/888888 or test/888888）";
  }
  return result;
});
