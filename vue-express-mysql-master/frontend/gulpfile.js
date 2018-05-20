var gulp = require('gulp');
var exec = require('child_process').exec;
var browserSync = require('browser-sync');
var reload = browserSync.reload;

const BuildWatchFile = ["src/components/*.vue"];//编译源路径
const DestLoc = "dist/";//编译目标根路径

const DestWatchFile = [DestLoc+"*.html", DestLoc+"*.vue", DestLoc+"static/js/*.js", DestLoc+"css/*.css"];

gulp.task('build-watching',()=>{
	console.log("watching..");
	exec('npm run watch',(err,stdout,stderr)=>{
		//gulp.watch(DestWatchFile,{cwd:'dist'},reload({stream:true}));
	});
});

//node build/build.js
gulp.task('default',['build-watching']);



