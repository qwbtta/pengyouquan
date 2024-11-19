import { getTagTypes } from "@/assets/js/request";

let tempList1 = []
let tempList2 = []

async function getLabelList(tagGroupName) {
  tempList1 = []
  tempList2 = []

    getTagTypes({ tag_group: tagGroupName }).then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        tempList1 = [...tempList1,...res.data[i].group_children]
        // tempList1 = [...tempList1,...res.data[i]]
      }
      console.log(tempList1);
      for (let y= 0; y < tempList1.length; y++) {
        let tempItem =  {
            value: tempList1[y].tag_name,
            label: tempList1[y].tag_name,
        }
        tempList2.push(tempItem)
      }
      console.log(tempList2,44545);
      resolve(tempList2) 
    });
 

}
// export const timeList =  getLabelList('时辰')
// export const weatherList =  getLabelList('天气')
// export const seasonList = await getLabelList('季节')
// let originString = ''
// let temp1 = []
// let temp2 = []

// function getList(){
//     temp1 = originString.split(",")
//     temp2 = []
//     for (let i = 0; i < temp1.length; i++) {
//         let tempItem =  {
//             value: temp1[i],
//             label: temp1[i],
//         }
//     temp2.push(tempItem)
//     }
// }

// //时辰
//     originString = '早晨,上午,中午,下午,傍晚,晚上,深夜,凌晨,通宵'
//     getList()
// export const timeList = temp2

// //天气
//     originString = '晴,少云,多云,阴,雨,雪,雨夹雪,霰,冰雹,冰粒,冻雨,雾,霜,露,雷暴,飑,龙卷风,台风,沙尘暴,干热风,霾,极光'
//     getList()
// export const weatherList = temp2

// //季节
//     originString = '春季,夏季,秋季,冬季'
//     getList()
// export const seasonList = temp2

