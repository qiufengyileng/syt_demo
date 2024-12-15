<template>
  <div class="subside-container">
    <div class="side-content">

      <section class="section">
        <div class="section-header">
          <h2 class="section-title">常见科室</h2>
          <a href="#" class="view-all">全部<span class="icon">&#x203A;</span></a>
        </div>
        <div class="department-grid">
          <a v-for="dept in departments" :key="dept" href="#" :class="['department']">
            {{ dept }}
          </a>
        </div>
      </section>

      <section class="section">
        <div class="section-header">
          <div class="section-title-with-icon">
            <span class="icon blue">&#x1F50A;</span>
            <h2 class="section-title">平台公告</h2>
          </div>
          <a href="#" class="view-all">全部 <span class="icon">&#x203A;</span></a>
        </div>
        <div class="announcement-list">
          <a v-for="announcement in platformAnnouncements" :key="announcement" href="#" class="announcement">
            {{ announcement }}
          </a>
        </div>
      </section>

      <section class="section">
        <div class="section-header">
          <div class="section-title-with-icon">
            <span class="icon orange">&#x26A0;</span>
            <h2 class="section-title">停诊公告</h2>
          </div>
          <a href="#" class="view-all">全部 <span class="icon">&#x203A;</span></a>
        </div>
        <div class="announcement-list">
          <a v-for="notice in suspensionNotices" :key="notice" href="#" class="announcement">
            {{ notice }}
          </a>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const departments = [
  "神经内科", "消化内科",
  "呼吸内科", "内科",
  "神经外科", "妇科",
  "产科", "儿科"
]

const platformAnnouncements = [
  "关于延长北京大学国际医院...",
  "北京中医药大学东方医院...",
  "武警总医院号源暂停..."
]

const suspensionNotices = [
  "中国人民解放军总医...",
  "首都医科大学附属北...",
  "中日友好医院中西医..."
]
</script>

<style lang="scss" scoped>
*{
  text-decoration: none;
   
}
$size:19px;
.subside-container {
  position: sticky;
  top: 20px;
  width: 100%;
  height: 100%;
  background-color: white;
  
  .side-content {
    width: 120%;
    max-height: 100%;
    background-color: white;
    padding: 1*$size;
    border-radius: 0.5*$size;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
}

.section {
  margin-bottom: 1.5*$size;
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75*$size;

    .section-title {
      font-size: 1.125*$size;
      font-weight: 500;
    }

    .section-title-with-icon {
      display: flex;
      align-items: center;
      gap: 0.5*$size;
    }

    .view-all {
      font-size: 0.875*$size;
      color: #666;
      display: flex;
      margin-right: 11px;
      align-items: center;

      &:hover {
        color: #1a73e8;
      }

      .icon {
        font-size: 33px;
        line-height: 1;
        margin-left: 5px;
        padding-bottom: 6px;
      }
    }
  }
}

.department-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75*$size;

  .department {
    font-size: 0.875*$size;
    color: #666;
    text-decoration: none;

    &:hover, &.active {
      color: #1a73e8;
    }
  }
}

.announcement-list {
  display: flex;
  flex-direction: column;
  gap: 0.5*$size;

  .announcement {
    font-size: 0.875*$size;
    color: #666;
    text-decoration: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
      color: #1a73e8;
    }
  }
}

.icon {
  font-size: 1.25*$size;
  line-height: 1;

  &.blue {
    color: #1a73e8;
  }

  &.orange {
    color: #f5a623;
  }
}
</style>