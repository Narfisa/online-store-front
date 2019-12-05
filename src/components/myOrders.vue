<template>
  <div>
    <el-dialog title="Ваши заказы" :visible.sync="dialogTableVisible">
      <el-table
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
        <el-table-column
        label="category"
        prop="title"
        />
        <el-table-column
          label="Price"
          prop="price"
        />
        <el-table-column
          label="Count"
          prop="count"
        />
      </el-table>
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
        id_User: this.$cookies.get('login')
      }
    }
  },
  methods: {
    upload () {
      this.$http.post('http://localhost/orders/my/orders', JSON.stringify(this.postData)).then(function (response) {
        this.dataset = response.body
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
</style>
