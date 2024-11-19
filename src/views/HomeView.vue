<template>
  <div class="home">
    <div
      class="router"
      style="bottom: 150px"
      @click="
        logout();
        router.push('/login');
      "
    >
      退出登录
    </div>
    <div class="router" @click="router.push('labelManage')">去标签管理页</div>
    <div class="menu_head flex">
      <div
        class="menu_item"
        :class="{ active_menu_item: index == activeFuncIndex }"
        v-for="(item, index) in headList"
        :key="item.name"
        @click="checkFunc(index)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="func_area flex">
      <div class="search_con">
        <img class="search_icon" src="@/assets/img/search.svg" alt="" />
        <input
          class="search_input"
          type="text"
          placeholder="请输入内容"
          v-model="filterData.content"
        />
      </div>
      <div class="filter_con flex" @click="getList">
        <img src="@/assets/img/filter.svg" alt="" />
      </div>
      <div class="field_management flex">
        <img
          class="field_management_icon"
          src="@/assets/img/field_management.svg"
          alt=""
        />
        <span>字段管理</span>
        <div class="arrow_con column">
          <img src="@/assets/img/down_arrow.svg" alt="" />
        </div>
      </div>
      <div class="func_btn flex">
        <div class="func_btn_item radius_left flex" style="background: #f7f7f7">
          <img src="@/assets/img/share.svg" alt="" />
        </div>
        <div class="func_btn_item radius_right flex">
          <img src="@/assets/img/refresh.svg" alt="" />
        </div>
      </div>
      <div
        v-if="0 == activeFuncIndex"
        class="new_content flex"
        @click="router.push('newAdd')"
      >
        <img src="@/assets/img/plus.svg" alt="" />
        新增内容
      </div>
    </div>
    <div class="table_con">
      <table>
        <thead>
          <tr>
            <th>序号</th>
            <th>文案</th>
            <th>图片/视频</th>
            <th>朋友圈分类</th>
            <th>
              <div class="flex_center">
                朋友圈标签
                <img
                  class="arrow"
                  src="@/assets/img/down_arrow_solid.svg"
                  alt=""
                />
              </div>
            </th>
            <th>适合人群</th>
            <th>{{ 0 == activeFuncIndex ? "创建时间" : "发布时间" }}</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in dataList" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.content }}</td>
            <td>
              <!-- <img v-if="item.img_uri" :src="item.img_uri" alt="" />
              <span v-else>-</span> -->
              <span>-</span>
            </td>

            <td>{{ item.type }}</td>
            <td>
              <div class="flex_center">
                <div
                  class="label label_red"
                  :class="{ label_blue: index2 == 1, label_green: index2 == 2 }"
                  v-for="(tags, index2) in item.tags?.slice(0, 3)"
                  :key="index2"
                >
                  {{ tags }}
                </div>
              </div>
            </td>
            <td>{{ item.fit }}</td>
            <td>{{ item.create_time_text }}</td>
            <td>
              <div class="flex_center">
                <div class="btn btn_green" @click="goDetail(item, 0)">查看</div>
                <div
                  v-if="0 == activeFuncIndex"
                  class="btn btn_blue"
                  @click="goDetail(item, 1)"
                >
                  编辑
                </div>
                <div class="btn btn_red" @click="deleteItem(item.id)">删除</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pagination_con flex">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @change="getList"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script  setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { ElPagination } from "element-plus";
import "element-plus/es/components/pagination/style/css";
import { getMomentsList, deleteMoments, logout } from "@/assets/js/request";
const router = useRouter();

let activeFuncIndex = ref(0); //朋友圈草稿/发布数据
let headList = ref([
  {
    name: "朋友圈草稿",
    path: "",
  },
  {
    name: "发布记录",
    path: "",
  },
]);

let currentPage = ref(1); //当前分页
let pageSize = ref(10); //分页条数
let total = ref(0); //总条数

let filterData = ref({
  content: null,
  publish: null,
});
let dataList = ref([{}]);
//切换菜单
function checkFunc(index) {
  activeFuncIndex.value = index;
}
//查看/编辑
function goDetail(item, isEdit) {
  sessionStorage.setItem("details", JSON.stringify(item));
  router.push({ name: "details", query: { isEdit: isEdit } });
}
//删除朋友圈
function deleteItem(id) {
  deleteMoments({ id: id }).then((res) => {
    getList();
  });
}
let phoneNum = ref("15371006520");
let password = ref("admin123");
//获取朋友圈列表
function getList() {
  let params = {
    content: filterData.value.content,
    publish: filterData.value.publish,
    limit: 10,
    page: currentPage.value,
  };
  getMomentsList(params).then((res) => {
    console.log(res.data);
    for (let i = 0; i < res.data.length; i++) {
      res.data[i].tags = res.data[i].tags ? res.data[i]?.tags.split(",") : [];
    }
    dataList.value = res.data;
    total.value = res.total;
  });
}

getList();
</script>
<style  lang="scss" scoped>
::v-deep .el-pager li {
  margin: 0 4px;
}
.home {
  height: 100%;
  padding: 24px;
  .menu_head {
    width: 100%;
    height: 56px;
    background: #ffffff;
    border-radius: 8px;
    border: 1px solid #fcfcfc;
    padding: 12px 24px;
    .menu_item {
      height: 32px;
      border-radius: 3px;
      padding: 0 20px;
      text-align: center;
      line-height: 32px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.9);
      cursor: pointer;
    }
    .active_menu_item {
      background: #f2f3ff;
      color: #0052d9;
    }
  }
  .func_area {
    margin: 20px 0;
    .search_con {
      position: relative;
      .search_icon {
        width: 16px;
        height: 16px;
        position: absolute;
        left: 16px;
        top: 14px;
      }
      .search_input {
        width: 420px;
        height: 44px;
        background: #ffffff;
        border-radius: 4px;
        padding: 0 16px 0 37px;
        font-size: 14px;
        color: #17273d;
        &::placeholder {
          font-family: HarmonyOS Sans SC, HarmonyOS Sans SC;

          color: #c0c4cc;
        }
      }
    }
    .filter_con {
      width: 44px;
      height: 44px;
      background: #ffffff;
      border-radius: 4px;
      justify-content: center;
      margin-left: 8px;
      cursor: pointer;
      > img {
        width: 20px;
        height: 20px;
      }
    }
    .field_management {
      width: 134px;
      height: 44px;
      background: #ffffff;
      border-radius: 4px;
      margin-left: auto;
      cursor: pointer;
      .field_management_icon {
        width: 20px;
        height: 20px;
        margin-left: 12px;
        margin-right: 10px;
      }
      > span {
        font-size: 14px;
        color: #60656e;
      }
      .arrow_con {
        width: 22px;
        height: 44px;
        background: #f7f7f7;
        align-items: center;
        justify-content: center;
        margin-left: auto;
        > img {
          width: 14px;
          height: 14px;
        }
      }
    }
    .func_btn {
      width: 88px;
      height: 44px;
      border-radius: 4px;
      background: #ffffff;
      margin-left: 8px;
      cursor: pointer;
      .func_btn_item {
        width: 44px;
        height: 44px;
        justify-content: center;
        > img {
          width: 24px;
          height: 24px;
        }
      }
      .radius_left {
        border-radius: 4px 0 0 4px;
      }
      .radius_right {
        border-radius: 0 4px 4px 0;
      }
    }
    .new_content {
      justify-content: center;
      width: 116px;
      height: 44px;
      background: #4485ff;
      border-radius: 4px;
      font-weight: 500;
      font-size: 14px;
      color: #ffffff;
      margin-left: 16px;
      cursor: pointer;
      > img {
        width: 20px;
        height: 20px;
        margin-right: 8px;
      }
    }
  }
  .table_con {
    height: calc(100% - 200px);
    table {
      border-radius: 8px;
      border-spacing: 0 1px;
      tr {
        height: 72px;
        background: #fff;
      }
      .flex_center {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      th {
        font-family: Source Han Sans, Source Han Sans;
        font-weight: 500;
        font-size: 18px;
        color: #17273d;
        .arrow {
          width: 12px;
          height: 12px;
          margin-left: 8px;
          cursor: pointer;
        }
      }
      td {
        text-align: center;
        font-size: 14px;
        color: #3d3d3d;

        .label {
          padding: 0 5px;
          height: 30px;
          border-radius: 5px;
          font-weight: 400;
          font-size: 16px;
          text-align: center;
          line-height: 30px;
          margin-right: 12px;
          &:last-of-type {
            margin-right: 0;
          }
        }
        .label_red {
          background: #ffe3e3;
          color: #f53f3f;
        }
        .label_blue {
          background: #dcedff;
          color: #409eff;
        }
        .label_green {
          background: #deffd5;
          color: #00b368;
        }
        .btn {
          padding: 0 21px;
          height: 32px;
          background: #eaf9fb;
          border-radius: 90px;
          font-size: 16px;
          text-align: center;
          line-height: 32px;
          margin-right: 12px;
          cursor: pointer;
          &:last-of-type {
            margin-right: 0;
          }
        }
        .btn_green {
          background: #eaf9fb;
          color: #11c4d0;
        }
        .btn_blue {
          background: #ebf5ff;
          color: #53adff;
        }
        .btn_red {
          background: #fbf0ea;
          color: #f53f3f;
        }
      }
    }
  }
  .pagination_con {
    margin: 24px 0;
    justify-content: flex-end;
  }
}
</style>