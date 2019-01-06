import { Injectable } from '@nestjs/common';
import { Cron, NestSchedule } from 'nest-schedule';
import puppeteer from 'puppeteer';
import axios from 'axios';

@Injectable()
export class TaskSchedule extends NestSchedule {
  constructor () {
    super()
  }

  @Cron('0 0/5 * * * ?', {
    tz: 'Asia/Shanghai'
  })
  async check () {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://www.baidu.com/', {waitUntil: 'networkidle2'})

    await page.screenshot({ path: 'screen.png' })

    await axios.post('https://oapi.dingtalk.com/robot/send?access_token=', {
      msgtype: 'link',
      link: {
        text: '请相关人员尽快进行检查！',
        title: '网站异常！',
        picUrl: '',
        messageUrl: 'http://www.baidu.com'
      }
    })
  }
}