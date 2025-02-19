
//0-->7     1->4    2->4    3->3    4->3    5->3    6->6    7->3    8->4    9->4
//各変数を宣言
let dt = new Date();    //現在の日時を取得
let FileCnt = [21,18,15,18,20,18,18,19,25,16];//各数字のファイルの数を格納してるよ
let fileCntWc = 38;
let fileCntVoice = 4;
let numInstance = [];
let reNewFlag = 0;//このフラグが1の時は毎秒、時間や分の画像も更新されるよ。
let hourDig1 = document.getElementById('hour1');
let hourDig2 = document.getElementById('hour2');
let minDig1 = document.getElementById('min1');
let minDig2 = document.getElementById('min2');
let secDig1 = document.getElementById('sec1');
let secDig2 = document.getElementById('sec2');
const sl = new Audio('sound/Timeless_Swing.mp3');
sl.volume = 0.1;
let slv = document.getElementById('voice');
document.getElementById('voice').src = "sound/voice/"+getRandomInt(fileCntVoice)+".mp3";
console.log(document.getElementById('voice').src);
slv.volume = 1;




///数字の画像を入れるクラスを宣言
//クラスの使い方は、ここで勉強したよ（https://youtu.be/fYNKzHTUv-8?si=97jz19-gMqGdYU-y)
class Files{
    constructor(trgNum,fileCnt){//このコンストラクターは初期化メソッド(クラスFilesのインスタンスを作った時に最初に絶対実行されるメソッド)
        this.fileCnt = fileCnt;
        this.targetNum = trgNum;
    }
    getPath(){//全てのファイルのタグをもらう
        let imgPath = [];
        let imgTag = [];
        let imgTags = [];
        for(let i = 0;i <= this.fileCnt-1;i++){
            imgPath[i] = "pic/"+this.targetNum+"/"+i+".jpg";
            imgTag[i] = "<img class='allImg' src='"+imgPath[i]+"' />";
            imgTags += imgTag[i];
            console.log(imgTag[i]);
            console.log(imgTags);       
        }
    return imgTags;
    }
}

//すべての数字を表示
/*
let targetElem = document.getElementById("imgWrap");
for(let i = 0;i <= 9;i++){
    numInstance[i] = new Files(i,FileCnt[i]);
    console.log(numInstance[i]);
    //targetElem.children[i].innerHTML = numInstance[i].getPath();//ここを解除するとすべての画像がみえるよ。
    hourDig1.innerHTML += numInstance[i].getPath();//時間を表示するところに全ての画像を格いれる
    hourDig2.innerHTML += numInstance[i].getPath();//分を表示するところに全ての画像をいれる
    minDig1.innerHTML += numInstance[i].getPath();//秒を表示するところに全ての画像をいれる
    minDig2.innerHTML += numInstance[i].getPath();//秒を表示するところに全ての画像をいれる
    secDig1.innerHTML += numInstance[i].getPath();//秒を表示するところに全ての画像をいれる
    secDig2.innerHTML += numInstance[i].getPath();//秒を表示するところに全ての画像をいれる

}
}*/

firstDraw();//初回の描画を実行
setMake10();//初回のmake10の数字を描画

function getRandomInt(max) {//引数maxで指定した数までのランダムな数字を取得
    return Math.floor(Math.random() * max);
  }

function timeRedraw() {
    //console.log(dt.getMinutes()+":"+dt.getSeconds());
    /*
    //水分補給アラートをON
    if(dt.getSeconds() == 0 && dt.getMinutes() == 11){  waterChargeAlartOn();}
    if(dt.getSeconds() == 0 && dt.getMinutes() == 32){  waterChargeAlartOn();}
    
    if(dt.getSeconds() == 0 && dt.getMinutes() == 14){ waterChargeAlartOff();}
    if(dt.getSeconds() == 0 && dt.getMinutes() == 35){ waterChargeAlartOff();}
    */
    

    //秒の1の位を設定
    let bb = "<img class='dig' src = 'pic/"+dt.getSeconds()%10+"/"+getRandomInt(FileCnt[dt.getSeconds()%10])+".jpg'>"; 
    secDig2.innerHTML = bb; 
    if(dt.getSeconds()%10 == 0){//秒の10の位を設定

        let aa = "<img class='dig' src = 'pic/"+Math.floor(dt.getSeconds()/10)+"/"+getRandomInt(FileCnt[Math.floor(dt.getSeconds()/10)])+".jpg'>";
        secDig1.innerHTML = aa;
    }
    if(dt.getSeconds() == 0){//分の1の位を設定
        dt = new Date();//時間を取り直す
        let bbb = "<img class='dig' src = 'pic/"+dt.getMinutes()%10+"/"+getRandomInt(FileCnt[dt.getMinutes()%10])+".jpg'>"; 
        minDig2.innerHTML = bbb; 
    }
    if(dt.getMinutes()%10 == 0 && dt.getSeconds() == 0){//分の10の位を設定
        //分の10の位を設定
        let aaa = "<img class='dig' src = 'pic/"+Math.floor(dt.getMinutes()/10)+"/"+getRandomInt(FileCnt[Math.floor(dt.getMinutes()/10)])+".jpg'>";
        minDig1.innerHTML = aaa;
        setMake10();//make10の数字を更新
    }
    if(dt.getMinutes() == 0 && dt.getSeconds() == 0){
        //時間を設定
        let aaaa = "<img class='dig' src = 'pic/"+Math.floor(dt.getHours()/10)+"/"+getRandomInt(FileCnt[Math.floor(dt.getHours()/10)])+".jpg'>";
        let bbbb = "<img class='dig' src = 'pic/"+dt.getHours()%10+"/"+getRandomInt(FileCnt[dt.getHours()%10])+".jpg'>"; 
        hourDig1.innerHTML = aaaa;
        hourDig2.innerHTML = bbbb;
    }



    
    dt.setSeconds(dt.getSeconds()+1);//日付オブジェクトを1秒すすめる
}

function firstDraw(){
    //秒を設定
    let aa = "<img class='dig' src = 'pic/"+Math.floor(dt.getSeconds()/10)+"/"+getRandomInt(FileCnt[Math.floor(dt.getSeconds()/10)])+".jpg'>";
    let bb = "<img class='dig' src = 'pic/"+dt.getSeconds()%10+"/"+getRandomInt(FileCnt[dt.getSeconds()%10])+".jpg'>"; 
    secDig1.innerHTML = aa;
    secDig2.innerHTML = bb; 

  
    //分を設定ss
    let aaa = "<img class='dig' src = 'pic/"+Math.floor(dt.getMinutes()/10)+"/"+getRandomInt(FileCnt[Math.floor(dt.getMinutes()/10)])+".jpg'>";
    let bbb = "<img class='dig' src = 'pic/"+dt.getMinutes()%10+"/"+getRandomInt(FileCnt[dt.getMinutes()%10])+".jpg'>"; 
    minDig1.innerHTML = aaa;
    minDig2.innerHTML = bbb; 

    //時間を設定
    let aaaa = "<img class='dig' src = 'pic/"+Math.floor(dt.getHours()/10)+"/"+getRandomInt(FileCnt[Math.floor(dt.getHours()/10)])+".jpg'>";
    let bbbb = "<img class='dig' src = 'pic/"+dt.getHours()%10+"/"+getRandomInt(FileCnt[dt.getHours()%10])+".jpg'>"; 
    hourDig1.innerHTML = aaaa;
    hourDig2.innerHTML = bbbb;
}
//水分補給の画像を表示
function waterChargeAlartOn(){
    sl.play();
    slv.src = "sound/voice/"+getRandomInt(fileCntVoice)+".mp3";
    console.log("audioFilePath = "+slv.src);
    slv.play();
    document.getElementById('waterChargeImgWrap').innerHTML = "<img id='waterChargeImg' src='pic/hokyu/"+getRandomInt(fileCntWc)+".jpg'>";
    document.getElementById('waterChargeImg').style.display = "block";
    document.getElementById('backGround').style.display = "block";
    
}
slv.addEventListener('ended',function(){//水分補給の音声を停止
    slv.pause();
});
sl.addEventListener('ended',function(){//水分補給の音楽を停止
    sl.pause();
    document.getElementById('waterChargeImg').style.display = "none";
    document.getElementById('backGround').style.display = "none";

});

//水分補給の画像を非表示（時間で）
function waterChargeAlartOff(){
    console.log("sl currentTime = 0");
    sl.pause();
    console.log("sl Paused");

    document.getElementById('waterChargeImg').style.display = "none";
    document.getElementById('backGround').style.display = "none";
}

//設定画面を表示
document.getElementById('settingBtn').addEventListener('click',function(){
});

//設定画面のファイルを選択したら、audioタグのsrcを変更
document.getElementById('fileNameSelector').addEventListener('change',()=>{
    slv.src = "sound/voice/"+document.getElementById('fileNameSelector').value+".mp3";
});
//make10の数字更新
function setMake10(){
    document.getElementById("make10").innerHTML = getRandomInt(10)+""+getRandomInt(10)+""+getRandomInt(10)+getRandomInt(10);
}
//make10の数字更新ボタン
document.getElementById('reloadBtn').addEventListener('click',function(){
    setMake10();
});
//トップウインドウをクリックしたら
document.getElementById('clockLogo').addEventListener('click',()=>{
    document.getElementById('clockLogo').style.display = 'none';
    document.getElementById('backGroundWhite').style.display = 'none';
});
//オーディオのvolumeを変更したら
slv.addEventListener('volumechange',()=>{
    console.log(slv.volume);
});


setInterval(timeRedraw,980);
