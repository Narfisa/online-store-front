<template>
  <div class="registration">
    <el-form status-icon label-width="120px" class="form">
      <p> {{ pValue}} </p>
      <p v-if="errors.length" class="errors">
        <ul v-for="error in errors" :key="error">
          {{ error }}
        </ul>
      </p>
      <el-form-item label="Login" prop="user.login">
        <el-input type="text" v-model="user.login"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="user.password">
        <el-input type="password" v-model="user.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-show="isLog" @click="log()">Submit</el-button>
        <el-button type="primary" v-show="isReg" @click="reg()">Submit</el-button>
        <el-button @click="resetForm()">Reset</el-button>
      </el-form-item>
    </el-form>
    <a class="link" v-show="isLog" @click="toReg()"> {{ regOrLog }} </a>
    <a class="link" v-show="isReg" @click="toLog()"> {{ regOrLog }} </a>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'registration',
  data () {
    return {
      user: {
        login: '',
        password: ''
      },
      errors: [],
      isReg: false,
      isLog: true,
      pValue: 'Авторизация',
      regOrLog: 'Еще не зарегистрированы?'
    }
  },
  methods: {
    ...mapActions({
      authorized: 'Authorized'
    }),
    resetForm () {
      this.user.login = ''
      this.user.password = ''
      this.errors = []
    },
    toLog () {
      this.isReg = false
      this.isLog = true
      this.pValue = 'Авторизация'
      this.regOrLog = 'Еще не зарегистрированы?'
    },
    toReg () {
      this.isReg = true
      this.isLog = false
      this.pValue = 'Регистрация'
      this.regOrLog = 'Уже зарегистрированы?'
    },
    log () {
      this.errors = []
      if (this.user.login && this.user.password) {
        this.$http.post('http://localhost/login', JSON.stringify(this.user)).then(function (response) {
          this.$cookies.set('isAuth', true)
          this.$cookies.set('login', response.body.id_User)
          console.log(this.$cookies.get('login'))
          this.$router.push('/home')
        }, function (error) {
          console.log('Error', error.body)
          this.errors.push('Неверный логин или пароль')
          this.$cookies.set('isAuth', false)
        })
      } else {
        if (!this.user.login) this.errors.push('Введите логин.')
        if (!this.user.password) this.errors.push('Введите пароль.')
      }
    },
    reg () {
      this.errors = []
      if (this.user.login && this.user.password) {
        this.$http.post('http://localhost/reg', JSON.stringify(this.user)).then(function (response) {
          this.$cookies.set('isAuth', true)
          this.$cookies.set('login', response.body.id_User)
          this.$router.push('/home')
        }, function (error) {
          console.log('Error', error.status)
          this.errors.push(error.body)
          this.$cookies.set('isAuth', false)
        })
      } else {
        if (!this.user.login) this.errors.push('Введите логин.')
        if (!this.user.password) this.errors.push('Введите пароль.')
      }
    }
  }
}
</script>

<style scoped>
.registration{
  margin-top: 1%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.el-input{
  width: 100%;
}
p{
  text-align: center;
}
.errors{
  color: red;
}
.link{
  cursor: pointer;
}
</style>
