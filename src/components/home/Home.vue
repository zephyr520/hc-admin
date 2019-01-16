<template>
  <el-row class="container">
    <v-header></v-header>
    <el-col :span="24" class="main">
      <v-menu></v-menu>
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>
  </el-row>
</template>

<script>
import VHeader from 'base/header/Header'
import VMenu from 'base/menu/Menu'
export default {
  components: {
    VHeader, VMenu
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
.container {
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  width: 100%;
  .main {
    display: flex;
    // background: #324057;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
    .content-container {
      // background: #f1f2f7;
      flex:1;
      // position: absolute;
      // right: 0px;
      // top: 0px;
      // bottom: 0px;
      // left: 220px;
      // overflow-y: scroll;
      padding: 20px;
      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
}
</style>
