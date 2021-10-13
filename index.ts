import { Builder, By, WebElement } from 'selenium-webdriver'

const isTargetRadioButton = async (element:WebElement)=>{
  const text = await element.getText()
  return text.includes('同意 Agree') ||
    text.includes('額頭溫度計') ||
    text.includes('否 No') ||
    text.includes('未施打過') ||
    text.includes('是 Yes')
}

(async ()=>{

  //開啟測試用瀏覽器
  let driver = await new Builder().forBrowser('chrome').build()

  //開啟網站
  await driver.get('https://zh.surveymonkey.com/r/EmployeeHealthCheck')

  //圓形的選單按鈕
  let targets = await driver.findElements(By.css(".radio-button-label-text"))
  targets.forEach(async (target)=>{
    if(await isTargetRadioButton(target)) target.click()
  })

  //方形的選單按鈕
  targets = await driver.findElements(By.css(".checkbox-button-label-text"))
  targets.forEach(async (target)=>{
    if((await target.getText()).includes('無 No')) target.click()
  })

  // 0: 工號 1: 體溫
  targets = await driver.findElements(By.css(".wds-input"))
  targets[0].sendKeys("999999")
  targets[1].sendKeys("36.5")

  // 送出表單
  const target = await driver.findElement(By.css(".survey-page-button"))
  // target.click()
})();