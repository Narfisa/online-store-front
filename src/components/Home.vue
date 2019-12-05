<template>
  <div class="home">
    <p class="logout" @click="logout"> Выйти </p>
    <p class="show" @click="showOrders"> Мои заказы </p>
    <myOrders v-if="isShowOrders"/>
    <button type="submit" @click="showForm" class="basket"/>
    <p class="count"> {{ count }} </p>
    <orderForm v-model="count" v-if="isShowForm"/>
    <Table v-model="count"/>
  </div>
</template>

<script>
import Table from '@/components/Table.vue'
import orderForm from '@/components/orderForm.vue'
import myOrders from '@/components/myOrders.vue'
import store from '../store'
import { mapActions } from 'vuex'

export default {
  name: 'home',
  components: {
    Table, orderForm, myOrders
  },
  store,
  data () {
    return {
      isShowForm: false,
      isShowOrders: false,
      count: 0,
      postData: {
        id_User: this.$cookies.get('login')
      }
    }
  },
  methods: {
    ...mapActions({
      authorized: 'Authorized'
    }),
    logout () {
      this.$cookies.set('isAuth', false)
      this.$cookies.set('login', null)
      this.$router.push('/auth')
    },
    showForm () {
      this.isShowForm ? this.isShowForm = false : this.isShowForm = true
    },
    showOrders () {
      this.isShowOrders ? this.isShowOrders = false : this.isShowOrders = true
    },
    getCount () {
      this.$http.post('http://localhost/orders', JSON.stringify(this.postData)).then(function (response) {
        this.count = response.body.length
      }, function (error) {
        console.log(error)
      })
    }
  },
  mounted: function () {
    this.getCount()
  }
}
</script>

<style>
  .show{
    cursor: pointer;
    position: absolute;
    top: -2%;
    right: 10%;
    font-size: 1.1em;
  }
  body, html{
    margin: 0;
    padding: 0;
    background: #e6eaf1;
  }
  .home{
    height: 100%;
    width: 100%;
  }
  .basket{
    position: absolute;
    top: 14%;
    right: 15%;
    border: 0;
    cursor: pointer;
    background: no-repeat;
    background-image: url("../../icons/shopping-cart.png");
    width: 36px;
    height: 36px;
  }
  .count{
    position: absolute;
    cursor: pointer;
    top: 9%;
    right: 14%;
    font-size: 1.1em;
    color: blue;
  }
  .logout{
    position: absolute;
    cursor: pointer;
    top: -2%;
    right: 25%;
    font-size: 1.1em;
    color: rgb(4, 4, 49);
  }
</style>
