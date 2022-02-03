import axiosInstance from 'axios'

const axios = axiosInstance.create({
  // withCredentials: true,
  headers: {
    'user-agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36',
  },
})

function output(arrs) {
  return { items: arrs }
}

export async function douyin(url) {
  let keyword =
    url ||
    '5.84 PkP:/ 男人养6只企鹅当宠物，别人遛猫遛狗，他上街却是溜企鹅 %%电影%%电影解说@DOU+小助手   https://v.douyin.com/LfWL65s/ 复制此链接，打开Dou音搜索，直接观看视频！'
  // console.error(keyword)
  if (keyword.length > 50) {
    const keywordArr = keyword.match(/https:(.*?)复制/im)
    keyword = 'https:' + keywordArr[1]
    console.log(keyword)
  }
  let result = {}
  try {
    const res = await axios.get(keyword)
    let { path: query = '' } = res.request
    query = query.split('?')[0] ?? ''
    const paths = query.replace(/\/$/, '').split('/')
    const id = paths[paths.length - 1]
    // console.log(query, id)
    const url = `https://www.douyin.com/video/${id}`
    await axios
      .get(url, {
        headers: {
          cookie:
            'MONITOR_WEB_ID=6ff04bdd-bfcd-4a19-a1fe-0494d7f96766; MONITOR_DEVICE_ID=c77ba711-2562-4165-b2bb-d8ad581db064; douyin.com; __ac_referer=__ac_blank; ttcid=71de2795b19d4b3a95654d56d50fa4fd32; _tea_utm_cache_6383=undefined; _tea_utm_cache_1300=undefined; MONITOR_WEB_ID=a2471e19-b240-4dfd-9937-d203c89e18bc; passport_csrf_token_default=64eff11e663d2d0aef44cdd4d5101c07; passport_csrf_token=64eff11e663d2d0aef44cdd4d5101c07; MONITOR_DEVICE_ID=43c191e5-96d1-47ae-bcda-0f15b3570262; n_mh=pxLId9nIkLQhkKWkZSDY9x33LtssJS-RDXGLKa_H4J4; passport_auth_status_ss=2be478cac1f65fd79c79efcf5baf0eb4%2C; passport_auth_status=2be478cac1f65fd79c79efcf5baf0eb4%2C; ttwid=1%7CQpM_GnDEh-aJ9DYVRus8Q46jbRgBn2khCclM0Zpcpp4%7C1643554918%7C70abe9be8ed14873bd31082770698e47f99d1dc13bda598808644aa0d0fb00e0; THEME_STAY_TIME=299471; IS_HIDE_THEME_CHANGE=1; pwa_guide_count=3; s_v_web_id=verify_24a809fc1a3e44d10a0e8396be50d8e0; _tea_utm_cache_2018=undefined; odin_tt=53bff82b1b08f55d95efb772a795b61f896a52344f6dfa88224eab8965a1bf22; AB_LOGIN_GUIDE_TIMESTAMP=1643558449249; msToken=Oa_GOhRr-Iaf7lXTZz_EsI5ITpdAw_HyrhjAT8607lWFOSwDULT09GW1hdeAPiHGOwixWZsCpKIdK9a1cib-_w2v8N8MIPRJnHubimvfse9Csfa_G6MptQ==; douyin.com; __ac_nonce=061f765850097f000ce2e; __ac_signature=_02B4Z6wo00f01Lwk7VgAAIDBxOoGXezZ3zi8AOnAAE8DfuQqnnLmoOdQzsV-P9md6S1UnsRhjJgYW0FDRxbb5Rm6jKxl0xpGB8BJXnWrrOZpfAEbHa2A1T6TVR7uIy4x6OXv9z21-jppqbmHa5; tt_scid=LivqLJmo3ZpXcFS2G7F8SSADMLyHetyVvutToKN49cxCCBsBTpknjuTMJgJlb8upb607; msToken=tXkiStHUFuynfxUo9APn33lciP-lTqV9r4D1pD2XvVGkNfrbVzOEgKTC90wycpJWdni56LHHDJRpfFVKySkUwqVyOlPsS1oB1k6Ykj62_44drjADogwBXA9T3AvliHo=; home_can_add_dy_2_desktop=1',
        },
      })
      .then(res => {
        const reg = new RegExp(
          `<script id="RENDER_DATA" type="application/json">.*?</script>`,
          'im'
        )
        let jsonData = ''
        res.data.replace(reg, (a, b) => {
          jsonData = JSON.parse(
            decodeURIComponent(
              a
                .replace('<script id="RENDER_DATA" type="application/json">', '')
                .replace('</script>', '')
            )
          )
          return b
        })
        const videoUrl = jsonData['34']['aweme']['detail']['video']['playAddr'][0].src ?? ''
        const desc = jsonData['34']['aweme']['detail']['desc'] ?? ''
        result = output([
          {
            title: '无水印视频',
            subtitle: desc,
            arg: `https:${videoUrl}`,
          },
        ])
      })
  } catch (err) {
    result = output([
      {
        title: err.message,
        subtitle: err.message,
      },
    ])
  }

  return result
}
// douyin()
