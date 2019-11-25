<template>
  <div class="cinema_body">
    <ul>
      <li v-for="item in cinemasList" :key="item.id">
        <div>
          <span>{{ item.nm }}</span>
          <span class="q">
            <span class="price">{{ item.sellPrice }}</span> 元起
          </span>
        </div>
        <div class="address">
          <span>{{ item.addr }}</span>
          <span>{{ item.distance }}</span>
        </div>
        <div class="card">
          <!-- 我们只保留value为1的值，为0的默认不渲染 -->
          <!-- item.tag 是一个对象{xxxx:oooo, xxxx:oooo} 里面都是键值对  -->
          <!-- (value, key) in item.tag 取值的时候，
                value标识oooo代表值，key标志键 -->
          <div v-for="(xitem, key) in item.tag" 
                v-show="xitem === 1" :key="key"
                :class="key | classCard"
          >
            {{ key | formatCard }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CiList",
  data() {
    return {
      cinemasList: []
    }
  },
  mounted () {
    this.$axios.get('/api/cinemaList?cityId=10')
    .then(res => {
      let msg = res.data.msg
      let cinemas = res.data.data.cinemas
      if (msg && cinemas) {
        this.cinemasList = cinemas
      } 
    })
    .catch(err => console.log(err))
  },
  filters: {
    formatCard (key) {
      let card = [
        { key: 'allowRefund', value: '改签'},
        { key: 'sell', value: '折扣卡'},
        { key: 'endorse', value: '退'},
        { key: 'snack', value: '小吃'}
      ]
      for (let i = 0; i < card.length; i++) {
        if (card[i].key == key) {
          return card[i].value
        }
      }
      return ''
    },
    classCard (key) {
      let card = [
        { key: 'allowRefund', value: '改签', class: 'bl' },
        { key: 'sell', value: '折扣卡', class: 'or' },
        { key: 'endorse', value: '退', class: 'bl' },
        { key: 'snack', value: '小吃', class: 'or' }
      ]
      for (let i = 0; i < card.length; i++) {
        if (card[i].key == key) {
          return card[i].class
        }
      }
      return ''
    }
  }
};
</script>

<style scoped>
#content .cinema_body {
  flex: 1;
  overflow: auto;
}
.cinema_body ul {
  padding: 20px;
}
.cinema_body li {
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 20px;
}
.cinema_body div {
  margin-bottom: 10px;
}
.cinema_body .q {
  font-size: 11px;
  color: #f03d37;
}
.cinema_body .price {
  font-size: 18px;
}
.cinema_body .address {
  font-size: 13px;
  color: #666;
}
.cinema_body .address span:nth-of-type(2) {
  float: right;
}
.cinema_body .card {
  display: flex;
}
.cinema_body .card div {
  padding: 0 3px;
  height: 15px;
  line-height: 15px;
  border-radius: 2px;
  color: #f90;
  border: 1px solid #f90;
  font-size: 13px;
  margin-right: 5px;
}
.cinema_body .card div.or {
  color: #f90;
  border: 1px solid #f90;
}
.cinema_body .card div.bl {
  color: #589daf;
  border: 1px solid #589daf;
}
</style>