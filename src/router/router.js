import Vue from 'vue'
import Router from 'vue-router'
import index from '../views/index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      redirect: '/index',
      children: [
        {
          path: 'index',
          name: 'index1',
          component: () => import('../views/index/indexRecommend'),
        },
        {
          path: 'subjects',
          name: 'subjects',
          component: () => import('../views/index/subjectIntro'),
        },
        {
          path: 'category/:name',
          name: 'category',
          component: () => import("../views/index/category"),
        }
      ]
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/index/subjectIntro')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/register')
    },
    { // 词条展示
      path: '/wiki/entry/:name',
      name: 'entryPreview',
      component: () => import('../views/entry/entryPreview')
    },
    { // 词条编辑
      path: '/entryedit',
      name: 'entryEdit',
      component: () => import('../views/entry/myEditor')
    },
    {
      path: '/usercenter',
      name: 'userCenter',
      component: () => import('../views/userCenter'),
      redirect: '/userCenter/mysubject/joinedsubject',
      children: [
        { // 个人中心的推荐任务
          path: 'mytask',
          name: 'myTask',
          component: () => import('../views/userCenter/myTask'),
          redirect: '/userCenter/mytask/recommendedentry',
          children: [
            {
              path: 'recommendedentry',
              name: 'recommendedEntry',
              component: () => import('../views/userCenter/recommendedTask/myRecommendEntry')
            },
            {
              path: 'recommendedsubject',
              name: 'recommendedSubject',
              component: () => import('../views/userCenter/recommendedTask/myRecommendSubject')
            }
          ]
        },
        { // 个人中心的我的词条
          path: 'myentry',
          name: 'MyEntry',
          component: () => import('../views/userCenter/myEntry')
        },
        { // 个人中心的我的专题
          path: 'mysubject',
          name: 'MySubject',
          component: () => import('../views/userCenter/mySubject'),
          redirect: '/userCenter/mysubject/joinedsubject',
          children: [
            {
              path: 'joinedsubject',
              name: 'joinedSubject',
              component: () => import('../views/userCenter/mySubject/joinedSubject/myJoinSubject')
            },
            {
              path: 'createdsubject',
              name: 'createdSubject',
              component: () => import('../views/userCenter/mySubject/createdSubject/myCreatedSubject')
            },
            {
              path: 'subjectmanagement',
              name: 'subjectManagement',
              components: () => import('../views/userCenter/mySubject/createdSubject/subjectManagement')
            }
          ]
        },
        {
          path: 'entrymanagement',
          name: 'entryManagement',
          component: () => import('../views/userCenter/myEntry/entryManagement')
        },
        {
          path: 'identityverification',
          name: 'identityVerification',
          component: () => import('../views/userCenter/myInfo/identityVerification')
        },
        {
          path: 'passwordmodify',
          name: 'passwordModify',
          component: () => import('../views/userCenter/myInfo/passwordModify')
        },
        {
          path: 'emailmodify',
          name: 'emailModify',
          component: () => import('../views/userCenter/myInfo/emailModify')
        }
      ]
    },
    { // 管理员审核页面
      path: '/adminAudit',
      name: 'adminAudit',
      component: () => import('../views/userCenter/adminAudit'),
      redirect: '/adminAudit/entryAudit',
      children: [
        {
          path: 'entryAudit',
          name: 'entryAudit',
          component: () => import('../views/userCenter/admin/entryAudit')
        },
        {
          path: 'subjectMakerAudit',
          name: 'subjectMakerAudit',
          component: () => import('../views/userCenter/admin/subjectMakerAudit')
        }
      ]
    },
    {
      path: '/controlboard',
      name: 'controlBoard',
      component: () => import('../views/controlBoard'),
      redirect: '/controlBoard/subjectManagement',
      children: [
        { // 专题管理
          path: 'subjectmanagement',
          name: 'subjectManagement',
          component: () => import('../views/controlBoard/subjectManagement')
        },
        { // 词条管理
          path: 'entrymanagement',
          name: 'entryManagement',
          component: () => import('../views/controlBoard/entryManagement')
        },
        { // 本体管理
          path: 'entityManagement',
          name: 'entityManagement',
          component: () => import('../views/controlBoard/entityManagement')
        },
        { // 人员管理
          path: 'userManagement',
          name: 'userManagement',
          component: () => import('../views/controlBoard/userManagement')
        }  
      ]
    },
    {
      path: '/subject',
      name: 'subjectIndex',
      component: () => import('../views/subject/subjectIndex')
    },
    {
      path: '/subjectcreate',
      name: 'subjectCreate',
      component: () => import('../views/subject/subjectCreate')
    }
  ]
})
