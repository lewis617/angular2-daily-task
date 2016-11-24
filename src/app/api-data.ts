import { InMemoryDbService } from 'angular-in-memory-web-api';

export class ApiData implements InMemoryDbService {
  createDb() {
    const getRandomDate = () => {
      const min = 0;
      const max = 7;
      const days = Math.floor(Math.random() * (max - min + 1) + min);
      const date = new Date();
      date.setDate(date.getDate() - days);
      return date;
    };

    const tasks = [
      {
        id: 0, user: '刘一', content: '主页的设计', date: getRandomDate()
      },
      {
        id: 1, user: '陈二', content: '主页的前端', date: getRandomDate()
      },
      {
        id: 2, user: '张三', content: '主页的后端', date: getRandomDate()
      },
      {
        id: 3, user: '李四', content: '登录页的设计', date: getRandomDate()
      },
      {
        id: 4, user: '王五', content: '登录页的前端', date: getRandomDate()
      },
      {
        id: 5, user: '赵六', content: '登录页的后端', date: getRandomDate()
      },
      {
        id: 6, user: '孙七', content: '任务页的设计', date: getRandomDate()
      },
      {
        id: 7, user: '周八', content: '任务页的前端', date: getRandomDate()
      },
      {
        id: 8, user: '吴九', content: '任务页的后端', date: getRandomDate()
      },
      {
        id: 9, user: '郑十', content: '调研新技术', date: getRandomDate()
      }
    ];
    return {tasks};
  }
}
