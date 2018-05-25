<template>
    <div>
    <div class="row">
        <table class="table">
            <thead>
            <tr>
                <th>序号</th>
                <th>名称</th>
                <th>性质</th>
                <th>安全库存</th>
                <th>实际库存</th>
            </tr>
            </thead>
            <tbody>
            <tr v-show="!tabelEmpty" v-for="item in dataList" :key='item.title'>
                <td>{{item.id}}</td>
                <td>{{item.name}}</td>
                <td>{{item.property}}</td>
                <td>{{item.safe_quantity}}</td>
                <td>{{item.sum_quantity}}</td>
            </tr>
            <tr v-show="tabelEmpty" class="empty">
                <td colspan="5">没有匹配的记录</td>
            </tr>
            </tbody>
        </table>
    </div>
    <Pagebar :page-model="pageModel" @refresh='refresh'></Pagebar>
    </div>
</template>
<script>
    import Pagebar from '../components/table-pagebar.vue'
    export default {//这里是官方的写法，默认导出，ES6
        name: 'MatrialLack',
        components: {
            Pagebar
        },
        data () {
            return {
                allArticle: "",
                dataList: [],
                pageModel: {
                    url: '/getStarve',
                    method: 'GET',
                    menu: [5, 10, 20]
                },
            }
        },
        computed: {
            tabelEmpty: function () {
                if (this.dataList) {
                    return false;
                } else {
                    return true;
                }
            }
        },
        methods:{
            refresh: function(data){
                this.dataList = data;
            }
        }
    }
</script>
<style>
    body, table {
        font-size: 12px;
    }

    table {
        table-layout: fixed;
        empty-cells: show;
        border-collapse: collapse;
        width: 100%;
        margin: 10px 0;
    }

    td {
        height: 30px;
    }

    div.row {
        margin-left: 15px;
        margin-right: 15px;
    }

    h1, h2, h3 {
        font-size: 12px;
        margin: 0;
        padding: 0;
    }

    .table {
        border: 1px solid #ddd;
        background: #fff;
    }

    .table thead tr {
        background: #eee;
    }

    .table th {
        background-repeat: repeat-x;
        height: 30px;
        text-align: left;
        vertical-align: middle;
    }

    .table tr.empty {
        text-align: center;
    }

    .table td, .table th {
        border: 1px solid #ddd;
        padding: 0 1em 0;
    }

    .table tr:nth-child(odd) td {
        background-color: #f5f5f5;

    }
</style>