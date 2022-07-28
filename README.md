# win left 按键拦截

用于在指定程序活动时拦截 winLeft 键的`deno`脚本

## 安装

- gitee

  ```bash
  $ deno install --allow-all --unstable --reload -n ki https://gitee.com/sh_winter/keyboard-event/raw/v0.1/main.ts
  ```

- github

  ```bash
  $ deno install --allow-all --unstable --reload -n ki https://raw.githubusercontent.com/sh-winter/key-intercept/v0.1/main.ts
  ```

## 使用

- 语法：`ki [...appName]`

- 示例

  ```bash
  $ ki "League of Legends (TM) Client" "微信"
  ```
