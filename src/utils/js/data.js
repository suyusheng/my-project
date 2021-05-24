export const newTaskServiceData = [
    /* 
      serviceType 下拉框展示的内容
      typeCert 对应的下拉框value值 这个值会上传给后端 具体值为什么要跟后端商量
      tagName 对应的标签字段
      applicationInfo hospitalInfo分别展示下面对应显示信息   
      disabled这个字段用来区分哪些输入框是禁用不可填的  
      tagType 用来区分当前展示的form表单元素的类型 （input  select radio checkbox……）
    */
    {
      id: '1',
      serviceType: '儿童齿科',
      typeCert: 'ETCK',
      // 申请信息
      applicationInfo: [
        {
          tagName: '姓名',
          tagType: 'input',
          disabled: false,
        },
        {
          tagName: '手机号',
          tagType: 'input',
          disabled: false,
        },
        {
          tagName: '客户号',
          tagType: 'input',
          disabled: false,
        },
        {
          tagName: '性别',
          tagType: 'radio'
        }
      ],
      // 住院信息
      hospitalInfo: [
        {
          tagName: '姓名',
          tagType: 'input',
          disabled: false,
        },
        {
          tagName: '手机号',
          tagType: 'input',
          disabled: true,
        },
      ]
    },
    {
      id: '2',
      serviceType: '基因检测',
      typeCert: 'JYJC',
      applicationInfo: [
        {
          tagName: '姓名',
          tagType: 'input',
          disabled: false,
        },
        {
          tagName: '性别',
          tagType: 'radio',
          disabled: false,
        }
      ]
    },
    {
      id: '3',
      serviceType: '重疾绿通',
      typeCert: 'ZJLT',
      applicationInfo: [{
          tagName: '姓名',
          tagType: 'input',
          disabled: false,
        },
        {
          tagName: '客户号',
          tagType: 'input',
          disabled: false,
        },
      ]
    },
    {
      id: '4',
      serviceType: '心脑血管',
      typeCert: 'XNXG',
      applicationInfo: [{
          tagName: '姓名',
          tagType: 'input',
          disabled: false,
        },
        {
          tagName: '客户号',
          tagType: 'input',
          disabled: false,
        }
      ]
    }
]
  