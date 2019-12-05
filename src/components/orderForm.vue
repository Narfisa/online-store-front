<template>
  <div>
    <el-dialog title="Ваш заказ:" :visible.sync="dialogTableVisible">
      <el-table
      v-if="items_exists"
      :data="dataset"
      >
        <el-table-column
        label="logo">
        <template slot-scope="scope">
          <img class="avatar" :src="dataset[scope.$index].image">
        </template>
        </el-table-column>
        <el-table-column
        label="name"
        prop="name"
        />
          label="Category"
          prop="title"
        />
        <el-table-column
          label="Price"
          prop="price"
        />
        <el-table-column
          label="Count"
        >
        <template slot-scope="scope">
          <div class="oper">
            <button type="submit" class="action" @click="plus(dataset[scope.$index].id, dataset[scope.$index].count)"> + </button>
            <p> {{ dataset[scope.$index].count }} </p>
            <button type="submit" class="action" @click="minus(dataset[scope.$index].id, dataset[scope.$index].count)"> - </button>
          </div>
        </template>
        </el-table-column>
      </el-table>
      <p v-else> Ваша корзина совсем одинока, ей не хватает товаров! </p>
      <button
        type="submit"
        class="buy"
        @click="buy"
      >
        Buy
      </button>
      <hr>
      <h3 class="total"> Сумма заказа: {{ total }} </h3>
    </el-dialog>
  </div>
</template>

<script>
import store from '../store'
export default {
  store,
  data () {
    return {
      dataset: [],
      dialogTableVisible: true,
      postData: {
        id_User: this.$cookies.get('login'),
        id_Item: 0,
        count: 0
      }
    }
  },
  computed: {
    items_exists () {
      return this.dataset.length > 0
    },
    total () {
      let price = 0
      for (let item of this.dataset) {
        price += item.price * item.count
      }
      return price
    }
  },
  methods: {
    upload () {
      console.log(this.postData)
      this.$http.post('http://localhost/orders', JSON.stringify(this.postData)).then(function (response) {
        this.dataset = response.body
      }, function (error) {
        console.log(error)
      })
    },
    buy () {
      this.$http.put('http://localhost/orders', JSON.stringify(this.postData)).then(function (response) {
        this.dialogTableVisible = false
        this.upload()
        this.getCount()
        this.$message({
          showClose: true,
          message: 'Спасибо за покупку!',
          type: 'success'
        })
      }, function (error) {
        console.log(error)
      })
    },
    plus (id, count) {
      this.postData.count = +count + 1
      this.postData.id_Item = id
      this.$http.put('http://localhost/orders/change', JSON.stringify(this.postData)).then(function (response) {
        this.upload()
        this.$message({
          showClose: true,
          message: 'Количество товара успешно изменено',
          type: 'success'
        })
      }, function (error) {
        console.log(error)
      })
    },
    minus (id, count) {
      if (+count === 1) {
        this.postData.count = 0
      } else {
        this.postData.count = +count - 1
      }
      this.postData.id_Item = id
      this.$http.put('http://localhost/orders/change', JSON.stringify(this.postData)).then(function (response) {
        this.getCount()
        this.upload()
        this.$message({
          showClose: true,
          message: 'Количество товара успешно изменено',
          type: 'success'
        })
      }, function (error) {
        console.log(error)
      })
    },
    getCount () {
      this.$http.post('http://localhost/orders', JSON.stringify(this.postData)).then(function (response) {
        this.length = response.body.length
        this.$emit('input', this.length)
      }, function (error) {
        console.log(error)
      })
    }
  },
  mounted: function () {
    this.upload()
  }
}
</script>

<style scoped>
  .avatar{
    width: 36px;
    height: 36px;
    object-fit: cover;
    border-radius: 50%;
    overflow: hidden;
  }
  .el-table_1_column_1 {
    width: 2%;
  }
  .action{
    border-radius: 30%;
    border: 0;
    cursor: pointer;
  }
  .submit{
    border-radius: 30%;
    color: white;
    background: rgb(31, 201, 8);
    height: 20%;
    min-width: 20%;
    cursor: pointer;
  }
  .buy{
    border-radius: 30%;
    color: white;
    margin-top: 5%;
    background: rgb(24, 147, 230);
    width: 15%;
    height: 10%;
    cursor: pointer;
  }
  .oper{
    display: flex;
    justify-content: space-between;
  }
</style>
