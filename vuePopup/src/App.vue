<template>
  <div id="app">
    <div class="app-header">
      <div class="app-header__company">
        remark <span class="app-header__bracket">[</span><span class="app-header__product">планы</span><span class="app-header__bracket">]</span>
      </div>
      <div class="app-header__settings" @click="settingsOpen = !settingsOpen">
        <i class="el-icon-setting"></i>
      </div>
    </div>
    <Tasks/>
    <Settings v-bind:class="['settings-block', settingsOpen ? ' active' : '']" />
  </div>
</template>

<script>

import Vue from 'vue'
import Tasks from './components/Tasks.vue'
import Settings from './components/Settings.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

import{
  mapActions
} from 'vuex'

export default {
  name: 'app',
  components:{
    Tasks,
    Settings,
  },
  data () {
    return {
      settingsOpen: false
    }
  },
  methods: {
    ...mapActions([
      'initData',
    ]),
  },
  created(){
    this.initData()
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
  
  #app{
    color: #ffffff;
    background: #091E2B;
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    padding: 10px;
    width: 450px;
    height: 550px;
  }
  .app-header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    &__company{
      font-size: 32px;
      line-height: 30px;
      font-weight: 500;
      cursor: default;
      user-select: none;
    }
    &__bracket{
      cursor: default;
      user-select: none;
      color: #FBCD00;
      font-style: italic;
      font-weight: 400;
    }
    &__product{
      cursor: default;
      user-select: none;
      font-style: italic;
      font-weight: 300;
    }
    &__settings{
      .el-icon-setting {
        cursor: pointer;
        font-size: 32px;
        padding-top: 3px;
        transition: .3s;
        &:hover{
          color: #FBCD00;
        }
      }
    }
  }
  .settings-block{
    background: #091E2B;
    position: absolute;
    top: 50px;
    left: 450px;
    width: 450px;
    height: 500px;
    transition: .3s;
    &.active{
      left: 0;
    }
  }
</style>
