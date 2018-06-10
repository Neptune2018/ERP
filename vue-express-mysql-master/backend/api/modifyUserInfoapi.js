var config = require('../config');
var fs = require('fs');
var path = require('path');
var modifyUserInfo = require('../proxy').modifyUserInfo;
var UserInfor = require('../proxy').UserInfor;
var formidable = require('formidable')
var xlsx = require('node-xlsx');
let XLSX = require('xlsx');
var multer = require('multer')
var upload = multer({ dest: '/uploads/' });

exports.showUserapi = function(req, res) {
	UserInfor.showUser(req.session.user.id, function(data) {
		res.send(data)
	});
}

exports.updateUserapi = function(req, res) {
    console.log(req.body.modify_data);
    
    modifyUserInfo.updateUser(req.body.modify_data);

    if(req.body.modify_data[4]!='Staff'){modifyUserInfo.changePass(req.body.modify_data);}
   
   
	res.send(req.query);
}


exports.removeUserapi = function(req, res) {
    console.log(req.body.new_data);
    
    modifyUserInfo.RemoveUser(req.body.new_data);
    if(req.body.new_data[4]!='Staff'){modifyUserInfo.RemovePass(req.body.new_data);}
   
   
	res.send(req.query);
}

exports.addUserapi = function(req, res) {
    console.log(req.body.new_data);
    
    modifyUserInfo.addUser(req.body.new_data);
    
   
   
	res.send(req.query);
}
exports.uploadapi= (async function(req, res){
    var form = new formidable.IncomingForm();  
    form.encoding = 'utf-8';  
    form.uploadDir = path.join(__dirname,'../uploads/');  
    form.keepExtensions = true;//保留后缀  
    form.maxFieldsSize = 2*1024*1024;  
    form.parse(req,async function(err,fields,files){  
        if(err){  
            console.log('文件上传错误！');  
            
            res.status(500).send('Something broke!');
            return ; 
        }  
        var filename = files.file.name;  
        
        // 对文件名进行处理，以应对上传同名文件的情况  
        var nameArray = filename.split('.');  
        var type = nameArray[nameArray.length-1];  
        var name = '';  
        for(var i=0; i<nameArray.length-1; i++){  
            name = name + nameArray[i];  
        }  
    
        try{
            var avatarName = name +  '.' + type;  
            
            var newPath = form.uploadDir + avatarName ;  
            console.log(newPath);  
            fs.renameSync(files.file.path, newPath);  
            console.log('上传成功！');  
            //对excel文件进行解析读取数据  
            //   ExcelParse(newPath); 
            var obj = xlsx.parse(newPath);
            var excelObj=obj[0].data;
            console.log(excelObj);
            var data=[]

            for(var i=0; i<excelObj.length; i++){  
                data[1]=excelObj[i][0]
                data[2]=excelObj[i][2]
                data[3]=excelObj[i][1].toString()
                data[4]=excelObj[i][3]
                data[5]=excelObj[i][4]
                data[6]=excelObj[i][5].toString()
               
                await modifyUserInfo.addUser(data);
                console.log('insert '+data[1]);
            } 


            res.send('call me y'); 



            
        }
        catch(e){
            console.log("error")
            res.status(500).send('Something broke!');
        }

        
    
         
    });  

})