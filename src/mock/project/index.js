import Mock from 'mockjs'
import '@/mock/extend'

// const projectArr = Mock.mock({
//   'list|6': [
//     {
//       logo: '@LOGO',
//       desc: '@SAYING'
//     }
//   ]
// }).list
const projectArr = [
  {
    logo: '',
    desc: '2021职级评审'
  }
]
// console.log(projectArr)
Mock.mock('/project', 'get', () => {
  return projectArr
})
