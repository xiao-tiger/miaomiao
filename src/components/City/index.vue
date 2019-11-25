<template>
  <div class="city-body">
    <div class="city_list" ref="city_list">
      <div class="city_hot">
        <h2>热门城市</h2>
        <ul class="clearfix">
          <li v-for="item of hotList" :key="item.id">{{ item.nm }}</li>
        </ul>
      </div>
      <div class="city_sort" ref="city_sort">
        <div v-for="(items, index) of cityList" :key="index">
          <h2>{{ items.index }}</h2>
          <ul>
            <li 
              v-for="itemList of items.list" 
              :key="itemList.id"
            >
              {{ itemList.nm }}
            </li>
          </ul>
        </div>

      </div>
    </div>
    <div class="city_index">
      <ul>
        <li v-for="(item,index) of cityList" 
          :key="index"
          @touchstart="handleToIndex(index)"
        >
          {{ item.index }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "City",
  data() {
    return {
      hotList: [],
      cityList: []
    };
  },
  methods: {
    formatCityList(cities) {
      let hotList = [];
      let cityList = [];

      for (let i = 0; i < cities.length; i++) {
        if (cities[i].isHot === 1) {
          hotList.push(cities[i]);
        }
      }

      for (let i = 0; i < cities.length; i++) {
        let firstLetter = cities[i].py.substring(0, 1).toUpperCase();
        // 判断 cityList里面是否有index,如果有就添加到此对象的list里面
        // 如果没有，就创建一个对象，添加到cityList中
        if (toCom(firstLetter)) {
          // 为 true 说明没有index，那就添加index
          // index 就是 A B C D E F G ......
          cityList.push({  // 新添加index
            index: firstLetter,
            list: [{ nm: cities[i].nm, id: cities[i].id }]
          });
        } else { // 累加索引index
          for (let j = 0; j < cityList.length; j++) {
            if (cityList[j].index == firstLetter) {
              cityList[j].list.push({ nm: cities[i].nm, id: cities[i].id });
            }
          }
        }
      }

      cityList.sort((n1, n2) => {
        if (n1.index > n2.index) {
          return 1;
        } else if (n1.index < n2.index) {
          return -1;
        } else {
          return 0;
        }
      });

      function toCom(firstLetter) {
        for (let i = 0; i < cityList.length; i++) {
          if (cityList[i].index === firstLetter) {
            return false
          }
        }
        return true;
      }
 
      return {
        hotList,
        cityList
      }
    },
    handleToIndex (index) {
      var h2 = this.$refs.city_sort.getElementsByTagName('h2');
      this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
    }
  },
  mounted() {
    this.$axios
      .get("/api/cityList")
      .then(res => {
        let msg = res.data.msg;
        if (msg === "ok") {
          // cities = [{id: 1, nm: "北京", isHot: 1, py: "beijing"}, ...]
          let cities = res.data.data.cities;
          // 我们要把数据改造成  [{index: 'A', list: [{ nm: '北京', id: 123 }], ...}]
          let { hotList, cityList } = this.formatCityList(cities);
          this.hotList = hotList
          this.cityList = cityList
        }
      })
      .catch(err => console.log(err));
  }
}
</script>

<style scoped>
#content {
  flex: 1;
  overflow: auto;
  margin-bottom: 50px;
  position: relative;
  display: flex;
  flex-direction: column;
}
/* #content .city-body{ display: flex; width:100%;} */
#content .city-body {
  /* margin-top: 45px; */
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  /* position: absolute; */
  /* top: 0; */
  /* bottom: 0; */
}
.city-body .city_list {
  flex: 1;
  overflow: auto;
  background: #fff5f0;
}
.city-body .city_list::-webkit-scrollbar {
  background-color: transparent;
  width: 0;
}
.city-body .city_hot {
  margin-top: 20px;
}
.city-body .city_hot h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city-body .city_hot ul li {
  float: left;
  background: #fff;
  width: 29%;
  height: 33px;
  margin-top: 15px;
  margin-left: 3%;
  padding: 0 4px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  line-height: 33px;
  text-align: center;
  box-sizing: border-box;
}
.city-body .city_sort div {
  margin-top: 20px;
}
.city-body .city_sort h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city-body .city_sort ul {
  padding-left: 10px;
  margin-top: 10px;
}
.city-body .city_sort ul li {
  line-height: 30px;
  line-height: 30px;
}

/* .city-body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;} */
.city-body .city_index {
  width: 20px;
  position: fixed;
  top: 200px;
  right: 0;
  text-align: center;
  border-left: 1px #e6e6e6 solid;
  background-color: #fff;
}
</style>