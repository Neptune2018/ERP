const state = {
  path: '/'
}

const getters = {
  getPath: (state) => {
    return state.path
  },
  getBigPos: (state) => {
    if (state.path === '/outline') {
        state.path = ''
      }
      if(state.path === '/goods'){
        return 'BOM信息维护'
      }else if(state.path === '/material'){
        return 'BOM信息维护'
      }else if(state.path === '/category'){
        return 'BOM信息维护'
      }else if(state.path === '/costmanage_product'){
        return '成本管理'
      }else if(state.path === '/costmanage_matrial'){
        return '成本管理'
      }else if(state.path === '/ImportWare'){
        return '仓库管理'
      }else if(state.path === '/ioinfo'){
        return '仓库管理'
      }else if(state.path === '/inventory'){
        return '仓库管理'
      }else if(state.path === '/starving'){
        return '采购辅助管理'
      }else if(state.path === '/offerlist'){
        return '采购辅助管理'
      }else if(state.path === '/supplier'){
        return '采购辅助管理'
      }else if(state.path === '/safeStock'){
        return '采购辅助管理'
      }else if(state.path === '/generate'){
        return '生产管理'
      }else if(state.path === '/state'){
        return '生产管理'
      }else if(state.path === '/userInfor'){
        return '个人信息管理'
      }else if(state.path === '/group'){
        return '个人信息管理'
      }else if (state.path === '/' || state.path === '/signin') {
        return '登录'
      }
  },
  getSmallPos: (state) => {
      if (state.path === '/outline') {
        state.path = ''
      }
      if(state.path === '/goods'){
        return '货品信息管理'
      }else if(state.path === '/material'){
        return '物料信息管理'
      }else if(state.path === '/category'){
        return '类别信息管理'
      }else if(state.path === '/costmanage_product'){
        return '货品管理'
      }else if(state.path === '/costmanage_matrial'){
        return '物料管理'
      }else if(state.path === '/ImportWare'){
        return '入库管理'
      }else if(state.path === '/ioinfo'){
        return '出入库信息'
      }else if(state.path === '/inventory'){
        return '库存情况管理'
      }else if(state.path === '/starving'){
        return '缺料浏览' 
      }else if(state.path === '/offerlist'){
        return '报价单管理' 
      }else if(state.path === '/supplier'){
        return '供应商管理'
      }else if(state.path === '/safeStock'){
        return '安全库存'
      }else if(state.path === '/generate'){
        return '生成订单'
      }else if(state.path === '/state'){
        return '订单状态查询'
      }else if(state.path === '/userInfor'){
        return '个人信息'
      }else if(state.path === '/group'){
        return '分组'
      }else if (state.path === '/' || state.path === '/signin') {
        return ''
      }
  }
}

const mutations = {
  changePath(state, path) {
    console.log("changePath", path);
    state.path = path;
  }
}


export default {
  state,
  getters,
  mutations
}