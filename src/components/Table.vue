<template>
  <div class="table">
    <el-input
      v-model="search"
      size="mini"
      type="string"
      placeholder="Type to Search"
    />
    <el-table v-if = "items_exists"
      :data="filteredDataset"
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
        label="Category"
        prop="title"
      />
      <el-table-column
        label="price"
        prop="price"
      />
      <el-table-column
        align="right">
        <template slot-scope="scope">
          <button
            type="submit"
            class="submit"
            @click="addItem(dataset[scope.$index].id, dataset[scope.$index].name)"
          >
            Add
          </button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  name: 'table',
  data () {
    return {
      dataset: [],
      search: '',
      postData: {
        id_Item: '',
        id_User: this.$cookies.get('login'),
        count: 1
      },
      length: 0
    }
  },
  methods: {
    addItem (id, name) {
      this.postData.id_Item = id
      this.$http.post('http://localhost/orders/add', JSON.stringify(this.postData))
        .then(function (response) {
          this.getCount()
          this.$message({
            showClose: true,
            message: name + ' был добавлен в корзину',
            type: 'success'
          })
        }, function (error) {
          console.log('Error', error)
        })
    },
    getDataset () {
      this.$http.get('http://localhost/goods').then(function (response) {
        this.dataset = response.body
      }, function (error) {
        console.log(error)
      })
      this.getCount()
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
  computed: {
    filteredDataset () {
      return this.dataset.filter(data =>
        !this.search || data.name.toLowerCase().includes(this.search.toLowerCase())
      )
    },
    items_exists () {
      return this.dataset.length > 0
    }
  },
  mounted: function () {
    this.getDataset()
  }
}
</script>

<style scoped>
  @import url("//unpkg.com/element-ui@2.12.0/lib/theme-chalk/index.css");
  .el-table{
    margin-top: 5%;
  }
  .table{
    width: 80%;
    height: 100%;
    padding: 0;
    margin: 7% auto;
  }
  .el-input{
    width: 30%;
    margin-left:50%;
    top: 7.5%;
  }
  span:hover{
    cursor: pointer;
  }
  .avatar{
    width: 36px;
    height: 36px;
    object-fit: cover;
    border-radius: 50%;
    overflow: hidden;
  }
  .submit{
    border-radius: 30%;
    color: white;
    background: rgb(31, 201, 8);
    height: 20%;
    min-width: 20%;
    cursor: pointer;
  }
</style>
