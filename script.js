document.getElementsByClassName('in-file')[0].addEventListener('change',function(){
	document.getElementsByClassName('prev')[0].innerHTML="LOADING";
	let f_r=new FileReader();
	let file=this;
	f_r.readAsDataURL(file.files[0]);
	f_r.onload=function(){
		let buffer=f_r.result;
		let data=buffer.split(";base64,")[0].split("data:")[1];
		let tipe=buffer.split(";base64,")[0].split("/")[0].split("data:")[1];
		let namafile=file.files[0].name;
		let size=file.files[0].size;
		if(size<1000){
			size=String(size)+" B";
		}
		else if(size>1000 && size<1000000){
			size=(size/1000).toFixed(2);
			size=String(size)+" Kb";
		}
		else if(size>1000000 && size<1000000000){
			size=(size/1000000).toFixed(2);
			size=String(size)+" Mb";
		}
		else if(size>1000000000 && size<1000000000000){
			size=(size/1000000000).toFixed(2);
			size=String(size)+" Gb";
		}
		let comp="";
		if(tipe=="audio"){
			comp="<audio controls align='middle'><source src=\""+buffer+"\" type=\""+data+"\"></audio>";
			document.getElementsByClassName('prev')[0].classList.add('prev-audio');
			document.getElementsByClassName('prev')[0].classList.remove('prev-image');
			document.getElementsByClassName('prev')[0].classList.remove('prev-video');
		}
		else if(tipe=="video"){
			comp="<video controls><source src=\""+buffer+"\" type=\""+data+"\"></video>";
			document.getElementsByClassName('prev')[0].classList.add('prev-video');
			document.getElementsByClassName('prev')[0].classList.remove('prev-image');
			document.getElementsByClassName('prev')[0].classList.remove('prev-audio');
		}
		else if(tipe=="image"){
			comp="<img src=\""+buffer+"\">";
			document.getElementsByClassName('prev')[0].classList.add('prev-image');
			document.getElementsByClassName('prev')[0].classList.remove('prev-video');
			document.getElementsByClassName('prev')[0].classList.remove('prev-audio');
		}
		comp+="<div class='file-info'>"
		comp+="<p>Nama file="+namafile+"</p>";
		comp+="<p>Ukuran file="+size+"</p>";
		comp+="</div>"
		document.getElementsByClassName('prev')[0].innerHTML=comp;

	}
});
