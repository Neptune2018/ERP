1、BOM管理中物料、货品的假删除
	通过修改物料、货品表中的status字段实现
	给用户提供“停用”和“删除”按钮，对应假/真删除

2、订单分解时的缺料判断
	通过物料id在库存信息表stock中select，sum所有该物料的remain字段
	通过配料表consist查询sum出物料用量
	比较两者判断是否缺料，并更改订单表orderList中的状态字段

3、出库后触发的缺料预警
	在库存信息表stock里查到某个物料的remain的和
	和物料表material里的安全库存量safe_quantity比较

4、关于虚拟占用量
	订单分解后，领料前，减去相应stock表条目的remain，加到occupancy上
	出库后，减去occupancy

欢迎提问补充