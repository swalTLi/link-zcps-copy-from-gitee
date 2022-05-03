import {users, groups} from './index'

const events = [
  {
    type: 0,
    event: '八月迭代'
  },
  {
    type: 1,
    event: '留言'
  },
  {
    type: 2,
    event: '项目进展'
  }
]

const activities = users.map((user, index) => {
  return {
    user: Object.assign({}, user, {group: groups[user.groupId]}),
    activity: events[index % events.length],
    template: ''
  }
})

const templates = [
  (user) => { return `${user.name} 在2021/12/22提交了填报` },
  (user) => { return `${user.group} 退回了 ${user.name} 的填报 ` },
  (user) => { return `${user.name} 开始一轮打分 ` }
]

export {activities, templates}
