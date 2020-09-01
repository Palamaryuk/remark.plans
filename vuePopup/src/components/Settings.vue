<template>
  <div>
      <div class="settings">
          <div class="settings__title">
              Настройки
          </div>
          <div class="settings-form">
            <div class="settings-form__line">
              <div class="settings-form__title">
                API ключ
                <el-tooltip class="item" effect="light" placement="top">
                  <div slot="content">Ключ входящего вебхука,<br/>например: z01anfwfi7dw777</div>
                  <i class="el-icon-info"></i>
                </el-tooltip>
              </div>
              <div class="settings-form__input">
                <el-input placeholder="API ключ" v-model="l_apiKey"></el-input>
              </div>
            </div>
            <div class="settings-form__line--inline">
              <div class="settings-form__input">
                <el-switch v-model="l_hyperLink"></el-switch>
              </div>
              <div class="settings-form__title">
                гиперссылка в названии
                <el-tooltip class="item" effect="light" content="Название задачи будет гиперссылкой (кликабельной)" placement="top">
                  <i class="el-icon-info"></i>
                </el-tooltip>
              </div>
            </div>
            <div class="settings-form__line--inline">
              <div class="settings-form__input">
                <el-switch v-model="l_helpExtension"></el-switch>
              </div>
              <div class="settings-form__title">
                указывать название расширения
                <el-tooltip class="item" effect="light" placement="top">
                  <div slot="content">В конце планов будет указано,<br/>что они сформированы с помощью <br/>этого расширения (гиперссылкой)</div>
                  <i class="el-icon-info"></i>
                </el-tooltip>
              </div>
            </div>
          </div>
          <div class="settings__accesses">
            Вебхук должен иметь права к следующим модулям:<br>- Чат и уведомления (im)
          </div>
          <div class="settings__secure">
            API ключ хранится только в вашем аккаунте google (либо локально если вы не авторизованы), и никуда более не передается
          </div>
      </div>
  </div>
</template>

<script>
 
import{
  mapGetters
} from 'vuex'

export default {
  name: "Settings",
  data(){
    return{
    }
  },
  computed: {
    ...mapGetters([
      'apiKey',
      'hyperLink',
      'helpExtension'
    ]),
    l_apiKey: {
      get () {
          return this.apiKey
      },
      set (value) {
          this.$store.commit('set_apiKey', value)
      }
    },
    l_hyperLink: {
      get () {
          return this.hyperLink
      },
      set (value) {
          this.$store.commit('set_hyperLink', value)
      }
    },
    l_helpExtension: {
      get () {
          return this.helpExtension
      },
      set (value) {
          this.$store.commit('set_helpExtension', value)
      }
    },
  }
}
</script>

<style lang="scss">
  .settings{
    padding: 10px;

    &__title{
        font-size: 22px;
    }
    &__secure{
      line-height: 13px;
      font-size: 10px;
      position: absolute;
      bottom: 10px;
      color: #FBCD00;
    }
    &__accesses{
      font-size: 14px;
      line-height: 18px;
    }
  }
  .settings-form{
    margin: 10px 0 25px;

    &__line{
      margin-bottom: 10px;

      &--inline{
        display: inline-flex;
        align-items: center;
        margin-bottom: 5px;

        .settings-form{
          &__input{
            margin-right: 10px;
          }
        }
      }
    }
  }
  .el-switch.is-checked .el-switch__core{
    border-color: #FBCD00;
    background: #FBCD00;
  }
  .el-switch__core:after{
    background: #091E2B;
    top: 2px;
    left: 3px;
  }
  .el-switch.is-checked .el-switch__core::after{
    margin-left: -19px;
  }
  .el-switch__core{
    border: #ffffff;
    background: #ffffff;
  }
</style>