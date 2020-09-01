<template>
  <div>
    <div class="tasks-block">
      <draggable v-model="l_currentTasks" @start="drag=true" @end="drag=false" class="tasks" v-if="listNotEmpty">
        <div v-for="(task, idx) in l_currentTasks" :key="task.id" class="task">
          <div class="task__title">{{task.title}}</div>
          <div class="task-controls">
            <a v-bind:href=task.link target="_blank" class="task-controls__item el-icon-link"></a>
            <div class="task-controls__item el-icon-delete" @click="removeCurrentTaskByID(idx)"></div>
          </div>
        </div>
      </draggable>
      <div class="empty-task-list" v-else>
        Нет выбранных задач
      </div>
      <div class="controls" v-if="listNotEmpty">
        <div class="controls__button" v-if="apiKey.length == 16" @click="sendPlans2Chat()"><i class="el-icon-chat-dot-square"></i> отправить</div>
        <div class="controls__button" v-clipboard=" () => plansToCopy" @click="plansCopyed"><i class="el-icon-copy-document"></i> копировть</div>
        <div class="controls__button" @click="clearTasks()"><i class="el-icon-document-delete"></i> очистить</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import draggable from 'vuedraggable'
import Clipboard from 'v-clipboard'
 
import{
  mapGetters,
  mapActions,
  mapState
} from 'vuex'

Vue.use(Clipboard)
Vue.use(VueAxios, axios)

export default {
  name: "Tasks",
  components: {
    draggable
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'currentTasks'
    ]),
    ...mapState([
      'hyperLink',
      'helpExtension',
      'apiKey',
      'work_chat_id'
    ]),
    l_currentTasks: {
      get () {
          return this.currentTasks
      },
      set (value) {
          this.$store.commit('set_currentTasks', value)
      }
    },
    listNotEmpty: function(){
      return this.currentTasks.length > 0
    },
    plansToCopy: function(){
      let plansString = "/планы\n\n";
      

      if(this.hyperLink == true){
        this.l_currentTasks.forEach(function (task) {
          plansString += "[URL="+task.link+"]"+task.title+"[/URL]\n"
        });
      }else{
        this.l_currentTasks.forEach(function (task) {
          plansString += task.title + "\n"
        });
      }

      if(this.helpExtension == true){
        plansString += "\n\nЯ планирую задачи в 2 клика с [URL=https://chrome.google.com/webstore/detail/%D1%80%D0%B5%D0%BC%D0%B0%D1%80%D0%BA%D0%BF%D0%BB%D0%B0%D0%BD%D1%8B/mphbkdgjekeiiopbgfoaiemejmfjaaop?hl=ru&authuser=1]Ремарк.Планы[/URL]"
      }

      return plansString
    },
    plansToSend: function(){
      let plansString = "/планы[BR][BR]";
      

      if(this.hyperLink == true){
        this.l_currentTasks.forEach(function (task) {
          plansString += "[URL="+task.link+"]"+task.title+"[/URL][BR]"
        });
      }else{
        this.l_currentTasks.forEach(function (task) {
          plansString += task.title + "[BR]"
        });
      }

      if(this.helpExtension == true){
        plansString += "[BR][BR]Я планирую задачи в 2 клика с [URL=https://chrome.google.com/webstore/detail/%D1%80%D0%B5%D0%BC%D0%B0%D1%80%D0%BA%D0%BF%D0%BB%D0%B0%D0%BD%D1%8B/mphbkdgjekeiiopbgfoaiemejmfjaaop?hl=ru&authuser=1]Ремарк.Планы[/URL]"
      }

      return plansString
    },
  },
  methods: {
    ...mapActions([
      'clearTasks',
      'removeCurrentTaskByID'
    ]),
    plansCopyed() {
      this.$message({
        showClose: true,
        message: 'Планы скопированы',
        type: 'success',
      });
    },
    sendPlans2Chat(){
      axios.get("https://marketing.bitrix24.ru/rest/5764/"+this.apiKey+"/im.message.add?DIALOG_ID="+this.work_chat_id+"&MESSAGE="+this.plansToSend+"&URL_PREVIEW=N", {'Access-Control-Allow-Origin': '*'})
        .then((response) => {
          if(typeof response.data.result === "undefined"){
            this.$message({
              showClose: true,
              message: 'Ошибка при отправке планов',
              type: 'error',
              duration: 0
            });
          }else{
            this.$message({
              showClose: true,
              message: 'Планы отправлены',
              type: 'success',
            });
          }
        })
      .catch((error) => {
        this.$message({
          showClose: true,
          message: 'Ошибка при отправке планов '+error,
          type: 'error',
          duration: 0
        });
      });
    }
  }
}
</script>

<style lang="scss">
  .tasks-block{
    margin-top: 20px;
  }
  .tasks{
    max-height: 220px;
    overflow-y: scroll;
  }
  .task{
    background: #fff;
    color: #091E2B;
    border-radius: 4px;
    font-size: 16px;
    margin-bottom: 5px;
    padding: 3px 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    &.sortable-chosen{
      background: darken($color: #ffffff, $amount: 30);
    }

    &__title{
      cursor: default;
      padding-right: 15px;
      line-height: 18px;
    }
  }
  .task-controls{
    font-size: 22px;
    cursor: pointer;

    &__item{      
      color: #091E2B;
      transition: .2s;
      text-decoration: none;

      &:hover{
        color: #FBCD00;
      }
    }
  }
  .empty-task-list{
    font-size: 24px;
  }
  .controls{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;

    &__button{
      background: #ffffff;
      color: #091E2B;
      font-size: 16px;
      border-radius: 4px;
      padding: 5px 8px;
      cursor: pointer;
      display: flex;
      align-items: center;

      &:hover{
        i{
          color: #FBCD00;
        }
      }

      i{
        font-size: 22px;
        padding-right: 3px;
        transition: .2s;
      }
    }
  }
  .el-message{
    &--success,
    &--error{
      border-color: #FBCD00 !important;
      background-color: #091E2B !important;
      color: #ffffff !important;
    }
  }
  .el-message__closeBtn{
    color: #ffffff !important;
  }
  .el-message__content{
    color: #ffffff !important;
    font-family: 'Montserrat', sans-serif;
  }
  .el-icon-success,
  .el-icon-error
  {
    color: #FBCD00 !important;
    cursor: pointer;
  }
</style>