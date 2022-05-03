const process = require("child_process");
// const { config } = require('./auto_build_config')

// 执行 npm run build 命令
setInterval(function() {
  (function() {
    git_pull();
  })();
}, 1000 * 5 * 1);
// }, 1000 * 60 * 10);

// 拉取git查看是否更新
function git_pull() {
  const time = new Date();
  console.log("=> 执行 git pull", time);
  process.exec("git pull", (error, stdout) => {
    if (!error) {
      // 成功
      // 未更新
      if (stdout.indexOf("Already up-to-date.") !== -1) {
        console.log("git仓库暂无更新", time);
      }
      // 有新的提交
      if (stdout.indexOf("Fast-forward") !== -1) {
        console.log("git仓库有新的提交", time);
        npm_install();
      }
    } else {
      // 失败
    }
  });
}
// 安装依赖
function npm_install() {
  const time = new Date();
  console.log("=> 执行 yarn", time);
  // clearInterval(clock);
  process.exec("yarn", (error, stdout) => {
    if (!error) {
      // 成功
      console.log(stdout);
      console.log("依赖安装成功", time);
      npm_build();
    } else {
      // 失败
      console.log(error);
    }
  });
}
// // 创建文件夹
// function mkdir(){
//   process.exec("yarn", (error, stdout) => {
//     if (!error) {
//       // 成功
//       console.log(stdout);
//       npm_build();
//     } else {
//       // 失败
//     }
//   });
// }
// 生产环境编译
function npm_build() {
  const time = new Date();
  console.log("=> 执行 npm run build", time);
  process.exec("npm run build", (error, stdout) => {
    console.log(1, stdout, 1);
    if (!error) {
      console.log("项目编译成功", time);
      // 成功
    } else {
      // 失败
      console.log("项目编译失败", time);
    }
  });
}