<template>
    <i-table strip height="200" :columns="columns1" :data="data2"></i-table>
</template>
<script>
// import {ThresholdWarning} from '../../../backend/api/threshold_warning_api.js'
// var ThresholdWarning = require('../../../backend/api/threshold_warning_api').ThresholdWarning;
    export default {
      name:'ThresholdWarning',
        data () {
            return {
                columns1: [
                    {
                        title: '库存id',
                        key: 'repertoryId'
                    },
                    {
                        title: '存货id',
                        key: 'materialId'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title:'实际库存',
                        key:'remain'
                    },
                    {
                        title:'具体货位',
                        key:'place'
                    },
                    {
                      title:'单位',
                      key:'unit'
                    },
                    {
                      title:'批次',
                      key:'batch'
                    }
                ],
                data2: [
                    {
                        repertoryId: '1234',
                        id: 18,
                        name: '北京市朝阳区芍药居',
                        remain:44,
                        place:'仓库1',
                        unit:'kg',
                        batch:1234
                    }
                ]
            }
        },
        created:function()
        {
            console.log('00000000');
            this.$http({
                url: '/threshold_warning',
                method: 'GET',
            }).then(function (res) {
                console.log(res.body);
                console.log('111111');
            }, function () {
                alert("ajax failure")
            })
        }
    }
</script>
