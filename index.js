
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

let make10ProblemsList = [];
setMake10Problems();//make10の問題と回答数と難問かのフラグが入ったJSONを変数make10ProblemsListに作成
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
//時間を再描画
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
//初回に時間を描画
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
//水分補給の音声を停止
slv.addEventListener('ended',function(){
    slv.pause();
});
//水分補給の音楽を停止
sl.addEventListener('ended',function(){
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
    let num = getRandomInt(522);
    document.getElementById("make10").innerHTML = make10ProblemsList[num].Number+"["+make10ProblemsList[num].Answer+"]";
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



function setMake10Problems(){
    make10ProblemsList = [
    {
        "Number": "1158",
        "Answer": "1",
        "defFlag": "1"
    },
    {
        "Number": "1167",
        "Answer": "1",
        "defFlag": "0"
    },
    {
        "Number": "1189",
        "Answer": "1",
        "defFlag": "0"
    },
    {
        "Number": "1199",
        "Answer": "1",
        "defFlag": "1"
    },
    {
        "Number": "1337",
        "Answer": "1",
        "defFlag": "1"
    },
    {
        "Number": "1388",
        "Answer": "1",
        "defFlag": "0"
    },
    {
        "Number": "1555",
        "Answer": "1",
        "defFlag": "0"
    },
    {
        "Number": "1566",
        "Answer": "1",
        "defFlag": "0"
    },
    {
        "Number": "1599",
        "Answer": "1",
        "defFlag": "0"
    },
    {
        "Number": "2289",
        "Answer": "1",
        "defFlag": "0"
    },
    {
        "Number": "2666",
        "Answer": "1",
        "defFlag": "0"
    },
    {
        "Number": "3357",
        "Answer": "1",
        "defFlag": "0"
    },
    {
        "Number": "3466",
        "Answer": "1",
        "defFlag": "0"
    },
    {
        "Number": "3478",
        "Answer": "1",
        "defFlag": "1"
    },
    {
        "Number": "3577",
        "Answer": "1",
        "defFlag": "0"
    },
    {
        "Number": "3588",
        "Answer": "1",
        "defFlag": "0"
    },
    {
        "Number": "4449",
        "Answer": "1",
        "defFlag": "0"
    },
    {
        "Number": "4466",
        "Answer": "1",
        "defFlag": "1"
    },
    {
        "Number": "4467",
        "Answer": "1",
        "defFlag": "0"
    },
    {
        "Number": "4559",
        "Answer": "1",
        "defFlag": "0"
    },
    {
        "Number": "4679",
        "Answer": "1",
        "defFlag": "0"
    },
    {
        "Number": "5557",
        "Answer": "1",
        "defFlag": "0"
    },
    {
        "Number": "5559",
        "Answer": "1",
        "defFlag": "0"
    },
    {
        "Number": "5679",
        "Answer": "1",
        "defFlag": "0"
    },
    {
        "Number": "5778",
        "Answer": "1",
        "defFlag": "0"
    },
    {
        "Number": "7778",
        "Answer": "1",
        "defFlag": "0"
    },
    {
        "Number": "7779",
        "Answer": "1",
        "defFlag": "0"
    },
    {
        "Number": "7889",
        "Answer": "1",
        "defFlag": "0"
    },
    {
        "Number": "7899",
        "Answer": "1",
        "defFlag": "0"
    },
    {
        "Number": "8888",
        "Answer": "1",
        "defFlag": "0"
    },
    {
        "Number": "8889",
        "Answer": "1",
        "defFlag": "0"
    },
    {
        "Number": "8999",
        "Answer": "1",
        "defFlag": "0"
    },
    {
        "Number": "9999",
        "Answer": "1",
        "defFlag": "1"
    },
    {
        "Number": "1448",
        "Answer": "10",
        "defFlag": "0"
    },
    {
        "Number": "2248",
        "Answer": "10",
        "defFlag": "0"
    },
    {
        "Number": "2368",
        "Answer": "10",
        "defFlag": "0"
    },
    {
        "Number": "3556",
        "Answer": "10",
        "defFlag": "0"
    },
    {
        "Number": "4445",
        "Answer": "10",
        "defFlag": "0"
    },
    {
        "Number": "4469",
        "Answer": "10",
        "defFlag": "0"
    },
    {
        "Number": "5578",
        "Answer": "10",
        "defFlag": "0"
    },
    {
        "Number": "5789",
        "Answer": "10",
        "defFlag": "0"
    },
    {
        "Number": "6668",
        "Answer": "10",
        "defFlag": "0"
    },
    {
        "Number": "0125",
        "Answer": "104",
        "defFlag": "0"
    },
    {
        "Number": "0119",
        "Answer": "105",
        "defFlag": "0"
    },
    {
        "Number": "0248",
        "Answer": "105",
        "defFlag": "0"
    },
    {
        "Number": "0128",
        "Answer": "108",
        "defFlag": "0"
    },
    {
        "Number": "0137",
        "Answer": "108",
        "defFlag": "0"
    },
    {
        "Number": "0146",
        "Answer": "108",
        "defFlag": "0"
    },
    {
        "Number": "1458",
        "Answer": "108",
        "defFlag": "0"
    },
    {
        "Number": "0115",
        "Answer": "11",
        "defFlag": "0"
    },
    {
        "Number": "1133",
        "Answer": "11",
        "defFlag": "0"
    },
    {
        "Number": "1166",
        "Answer": "11",
        "defFlag": "0"
    },
    {
        "Number": "2224",
        "Answer": "11",
        "defFlag": "0"
    },
    {
        "Number": "2235",
        "Answer": "11",
        "defFlag": "0"
    },
    {
        "Number": "3688",
        "Answer": "11",
        "defFlag": "0"
    },
    {
        "Number": "4499",
        "Answer": "11",
        "defFlag": "0"
    },
    {
        "Number": "4799",
        "Answer": "11",
        "defFlag": "0"
    },
    {
        "Number": "5666",
        "Answer": "11",
        "defFlag": "0"
    },
    {
        "Number": "0455",
        "Answer": "12",
        "defFlag": "0"
    },
    {
        "Number": "0555",
        "Answer": "12",
        "defFlag": "0"
    },
    {
        "Number": "0556",
        "Answer": "12",
        "defFlag": "0"
    },
    {
        "Number": "0558",
        "Answer": "12",
        "defFlag": "0"
    },
    {
        "Number": "1115",
        "Answer": "12",
        "defFlag": "0"
    },
    {
        "Number": "1278",
        "Answer": "12",
        "defFlag": "0"
    },
    {
        "Number": "1289",
        "Answer": "12",
        "defFlag": "0"
    },
    {
        "Number": "1446",
        "Answer": "12",
        "defFlag": "0"
    },
    {
        "Number": "1457",
        "Answer": "12",
        "defFlag": "0"
    },
    {
        "Number": "1558",
        "Answer": "12",
        "defFlag": "0"
    },
    {
        "Number": "2446",
        "Answer": "12",
        "defFlag": "0"
    },
    {
        "Number": "2455",
        "Answer": "12",
        "defFlag": "0"
    },
    {
        "Number": "2578",
        "Answer": "12",
        "defFlag": "0"
    },
    {
        "Number": "2667",
        "Answer": "12",
        "defFlag": "0"
    },
    {
        "Number": "2779",
        "Answer": "12",
        "defFlag": "0"
    },
    {
        "Number": "3369",
        "Answer": "12",
        "defFlag": "0"
    },
    {
        "Number": "3448",
        "Answer": "12",
        "defFlag": "0"
    },
    {
        "Number": "4489",
        "Answer": "12",
        "defFlag": "0"
    },
    {
        "Number": "5556",
        "Answer": "12",
        "defFlag": "0"
    },
    {
        "Number": "5589",
        "Answer": "12",
        "defFlag": "0"
    },
    {
        "Number": "1245",
        "Answer": "123",
        "defFlag": "0"
    },
    {
        "Number": "0133",
        "Answer": "13",
        "defFlag": "0"
    },
    {
        "Number": "0247",
        "Answer": "13",
        "defFlag": "0"
    },
    {
        "Number": "2233",
        "Answer": "13",
        "defFlag": "0"
    },
    {
        "Number": "2447",
        "Answer": "13",
        "defFlag": "0"
    },
    {
        "Number": "3358",
        "Answer": "13",
        "defFlag": "0"
    },
    {
        "Number": "3388",
        "Answer": "13",
        "defFlag": "0"
    },
    {
        "Number": "4555",
        "Answer": "13",
        "defFlag": "0"
    },
    {
        "Number": "5567",
        "Answer": "13",
        "defFlag": "0"
    },
    {
        "Number": "0124",
        "Answer": "14",
        "defFlag": "0"
    },
    {
        "Number": "0223",
        "Answer": "14",
        "defFlag": "0"
    },
    {
        "Number": "0225",
        "Answer": "14",
        "defFlag": "0"
    },
    {
        "Number": "0256",
        "Answer": "14",
        "defFlag": "0"
    },
    {
        "Number": "0259",
        "Answer": "14",
        "defFlag": "0"
    },
    {
        "Number": "1379",
        "Answer": "14",
        "defFlag": "0"
    },
    {
        "Number": "1488",
        "Answer": "14",
        "defFlag": "0"
    },
    {
        "Number": "1557",
        "Answer": "14",
        "defFlag": "0"
    },
    {
        "Number": "2244",
        "Answer": "14",
        "defFlag": "0"
    },
    {
        "Number": "2249",
        "Answer": "14",
        "defFlag": "0"
    },
    {
        "Number": "2269",
        "Answer": "14",
        "defFlag": "0"
    },
    {
        "Number": "2277",
        "Answer": "14",
        "defFlag": "0"
    },
    {
        "Number": "2456",
        "Answer": "14",
        "defFlag": "0"
    },
    {
        "Number": "2799",
        "Answer": "14",
        "defFlag": "0"
    },
    {
        "Number": "3459",
        "Answer": "14",
        "defFlag": "0"
    },
    {
        "Number": "3699",
        "Answer": "14",
        "defFlag": "0"
    },
    {
        "Number": "4579",
        "Answer": "14",
        "defFlag": "0"
    },
    {
        "Number": "4599",
        "Answer": "14",
        "defFlag": "0"
    },
    {
        "Number": "2234",
        "Answer": "15",
        "defFlag": "0"
    },
    {
        "Number": "2559",
        "Answer": "15",
        "defFlag": "0"
    },
    {
        "Number": "2788",
        "Answer": "15",
        "defFlag": "0"
    },
    {
        "Number": "3677",
        "Answer": "15",
        "defFlag": "0"
    },
    {
        "Number": "3789",
        "Answer": "15",
        "defFlag": "0"
    },
    {
        "Number": "4566",
        "Answer": "15",
        "defFlag": "0"
    },
    {
        "Number": "0224",
        "Answer": "16",
        "defFlag": "0"
    },
    {
        "Number": "0229",
        "Answer": "16",
        "defFlag": "0"
    },
    {
        "Number": "0267",
        "Answer": "16",
        "defFlag": "0"
    },
    {
        "Number": "0339",
        "Answer": "16",
        "defFlag": "0"
    },
    {
        "Number": "0449",
        "Answer": "16",
        "defFlag": "0"
    },
    {
        "Number": "0488",
        "Answer": "16",
        "defFlag": "0"
    },
    {
        "Number": "0669",
        "Answer": "16",
        "defFlag": "0"
    },
    {
        "Number": "0779",
        "Answer": "16",
        "defFlag": "0"
    },
    {
        "Number": "0889",
        "Answer": "16",
        "defFlag": "0"
    },
    {
        "Number": "0999",
        "Answer": "16",
        "defFlag": "0"
    },
    {
        "Number": "1223",
        "Answer": "16",
        "defFlag": "0"
    },
    {
        "Number": "1233",
        "Answer": "16",
        "defFlag": "0"
    },
    {
        "Number": "2288",
        "Answer": "16",
        "defFlag": "0"
    },
    {
        "Number": "2366",
        "Answer": "16",
        "defFlag": "0"
    },
    {
        "Number": "2389",
        "Answer": "16",
        "defFlag": "0"
    },
    {
        "Number": "2889",
        "Answer": "16",
        "defFlag": "0"
    },
    {
        "Number": "3347",
        "Answer": "16",
        "defFlag": "0"
    },
    {
        "Number": "3578",
        "Answer": "16",
        "defFlag": "0"
    },
    {
        "Number": "4689",
        "Answer": "16",
        "defFlag": "0"
    },
    {
        "Number": "0126",
        "Answer": "17",
        "defFlag": "0"
    },
    {
        "Number": "0135",
        "Answer": "17",
        "defFlag": "0"
    },
    {
        "Number": "0227",
        "Answer": "17",
        "defFlag": "0"
    },
    {
        "Number": "0249",
        "Answer": "17",
        "defFlag": "0"
    },
    {
        "Number": "0568",
        "Answer": "17",
        "defFlag": "0"
    },
    {
        "Number": "0579",
        "Answer": "17",
        "defFlag": "0"
    },
    {
        "Number": "1255",
        "Answer": "17",
        "defFlag": "0"
    },
    {
        "Number": "1345",
        "Answer": "17",
        "defFlag": "0"
    },
    {
        "Number": "2236",
        "Answer": "17",
        "defFlag": "0"
    },
    {
        "Number": "2444",
        "Answer": "17",
        "defFlag": "0"
    },
    {
        "Number": "2449",
        "Answer": "17",
        "defFlag": "0"
    },
    {
        "Number": "4557",
        "Answer": "17",
        "defFlag": "0"
    },
    {
        "Number": "4568",
        "Answer": "17",
        "defFlag": "0"
    },
    {
        "Number": "0139",
        "Answer": "18",
        "defFlag": "0"
    },
    {
        "Number": "0149",
        "Answer": "18",
        "defFlag": "0"
    },
    {
        "Number": "0159",
        "Answer": "18",
        "defFlag": "0"
    },
    {
        "Number": "0169",
        "Answer": "18",
        "defFlag": "0"
    },
    {
        "Number": "0179",
        "Answer": "18",
        "defFlag": "0"
    },
    {
        "Number": "0189",
        "Answer": "18",
        "defFlag": "0"
    },
    {
        "Number": "0199",
        "Answer": "18",
        "defFlag": "0"
    },
    {
        "Number": "0228",
        "Answer": "18",
        "defFlag": "0"
    },
    {
        "Number": "0237",
        "Answer": "18",
        "defFlag": "0"
    },
    {
        "Number": "0246",
        "Answer": "18",
        "defFlag": "0"
    },
    {
        "Number": "0278",
        "Answer": "18",
        "defFlag": "0"
    },
    {
        "Number": "0288",
        "Answer": "18",
        "defFlag": "0"
    },
    {
        "Number": "0337",
        "Answer": "18",
        "defFlag": "0"
    },
    {
        "Number": "0346",
        "Answer": "18",
        "defFlag": "0"
    },
    {
        "Number": "0347",
        "Answer": "18",
        "defFlag": "0"
    },
    {
        "Number": "0357",
        "Answer": "18",
        "defFlag": "0"
    },
    {
        "Number": "0377",
        "Answer": "18",
        "defFlag": "0"
    },
    {
        "Number": "0378",
        "Answer": "18",
        "defFlag": "0"
    },
    {
        "Number": "0466",
        "Answer": "18",
        "defFlag": "0"
    },
    {
        "Number": "0467",
        "Answer": "18",
        "defFlag": "0"
    },
    {
        "Number": "0469",
        "Answer": "18",
        "defFlag": "0"
    },
    {
        "Number": "1124",
        "Answer": "18",
        "defFlag": "0"
    },
    {
        "Number": "1369",
        "Answer": "18",
        "defFlag": "0"
    },
    {
        "Number": "2256",
        "Answer": "18",
        "defFlag": "0"
    },
    {
        "Number": "2379",
        "Answer": "18",
        "defFlag": "0"
    },
    {
        "Number": "2469",
        "Answer": "18",
        "defFlag": "0"
    },
    {
        "Number": "2579",
        "Answer": "18",
        "defFlag": "0"
    },
    {
        "Number": "3356",
        "Answer": "18",
        "defFlag": "0"
    },
    {
        "Number": "3778",
        "Answer": "18",
        "defFlag": "0"
    },
    {
        "Number": "5555",
        "Answer": "18",
        "defFlag": "0"
    },
    {
        "Number": "1228",
        "Answer": "19",
        "defFlag": "0"
    },
    {
        "Number": "1799",
        "Answer": "19",
        "defFlag": "0"
    },
    {
        "Number": "2467",
        "Answer": "19",
        "defFlag": "0"
    },
    {
        "Number": "2478",
        "Answer": "19",
        "defFlag": "0"
    },
    {
        "Number": "2489",
        "Answer": "19",
        "defFlag": "0"
    },
    {
        "Number": "3479",
        "Answer": "19",
        "defFlag": "0"
    },
    {
        "Number": "3668",
        "Answer": "19",
        "defFlag": "0"
    },
    {
        "Number": "4667",
        "Answer": "19",
        "defFlag": "0"
    },
    {
        "Number": "1114",
        "Answer": "2",
        "defFlag": "0"
    },
    {
        "Number": "1116",
        "Answer": "2",
        "defFlag": "0"
    },
    {
        "Number": "1149",
        "Answer": "2",
        "defFlag": "0"
    },
    {
        "Number": "1168",
        "Answer": "2",
        "defFlag": "0"
    },
    {
        "Number": "1277",
        "Answer": "2",
        "defFlag": "0"
    },
    {
        "Number": "1288",
        "Answer": "2",
        "defFlag": "0"
    },
    {
        "Number": "1336",
        "Answer": "2",
        "defFlag": "0"
    },
    {
        "Number": "2222",
        "Answer": "2",
        "defFlag": "0"
    },
    {
        "Number": "2279",
        "Answer": "2",
        "defFlag": "0"
    },
    {
        "Number": "2299",
        "Answer": "2",
        "defFlag": "0"
    },
    {
        "Number": "2477",
        "Answer": "2",
        "defFlag": "0"
    },
    {
        "Number": "3333",
        "Answer": "2",
        "defFlag": "0"
    },
    {
        "Number": "3339",
        "Answer": "2",
        "defFlag": "0"
    },
    {
        "Number": "3366",
        "Answer": "2",
        "defFlag": "0"
    },
    {
        "Number": "3377",
        "Answer": "2",
        "defFlag": "0"
    },
    {
        "Number": "4888",
        "Answer": "2",
        "defFlag": "0"
    },
    {
        "Number": "5889",
        "Answer": "2",
        "defFlag": "0"
    },
    {
        "Number": "6678",
        "Answer": "2",
        "defFlag": "0"
    },
    {
        "Number": "6779",
        "Answer": "2",
        "defFlag": "0"
    },
    {
        "Number": "6788",
        "Answer": "2",
        "defFlag": "1"
    },
    {
        "Number": "6889",
        "Answer": "2",
        "defFlag": "0"
    },
    {
        "Number": "1139",
        "Answer": "20",
        "defFlag": "0"
    },
    {
        "Number": "1157",
        "Answer": "20",
        "defFlag": "0"
    },
    {
        "Number": "1377",
        "Answer": "20",
        "defFlag": "0"
    },
    {
        "Number": "2678",
        "Answer": "20",
        "defFlag": "0"
    },
    {
        "Number": "2689",
        "Answer": "20",
        "defFlag": "0"
    },
    {
        "Number": "2699",
        "Answer": "20",
        "defFlag": "0"
    },
    {
        "Number": "3599",
        "Answer": "20",
        "defFlag": "0"
    },
    {
        "Number": "1344",
        "Answer": "21",
        "defFlag": "0"
    },
    {
        "Number": "1456",
        "Answer": "21",
        "defFlag": "0"
    },
    {
        "Number": "1788",
        "Answer": "21",
        "defFlag": "0"
    },
    {
        "Number": "2344",
        "Answer": "21",
        "defFlag": "0"
    },
    {
        "Number": "2556",
        "Answer": "21",
        "defFlag": "0"
    },
    {
        "Number": "3345",
        "Answer": "21",
        "defFlag": "0"
    },
    {
        "Number": "3348",
        "Answer": "21",
        "defFlag": "0"
    },
    {
        "Number": "3379",
        "Answer": "21",
        "defFlag": "0"
    },
    {
        "Number": "3889",
        "Answer": "21",
        "defFlag": "0"
    },
    {
        "Number": "4457",
        "Answer": "21",
        "defFlag": "0"
    },
    {
        "Number": "4479",
        "Answer": "21",
        "defFlag": "0"
    },
    {
        "Number": "4778",
        "Answer": "21",
        "defFlag": "0"
    },
    {
        "Number": "5667",
        "Answer": "21",
        "defFlag": "0"
    },
    {
        "Number": "5779",
        "Answer": "21",
        "defFlag": "0"
    },
    {
        "Number": "6679",
        "Answer": "21",
        "defFlag": "0"
    },
    {
        "Number": "1118",
        "Answer": "22",
        "defFlag": "0"
    },
    {
        "Number": "1148",
        "Answer": "22",
        "defFlag": "0"
    },
    {
        "Number": "1224",
        "Answer": "22",
        "defFlag": "0"
    },
    {
        "Number": "1246",
        "Answer": "22",
        "defFlag": "0"
    },
    {
        "Number": "1335",
        "Answer": "22",
        "defFlag": "0"
    },
    {
        "Number": "1588",
        "Answer": "22",
        "defFlag": "0"
    },
    {
        "Number": "2247",
        "Answer": "22",
        "defFlag": "0"
    },
    {
        "Number": "3445",
        "Answer": "22",
        "defFlag": "0"
    },
    {
        "Number": "4458",
        "Answer": "22",
        "defFlag": "0"
    },
    {
        "Number": "1577",
        "Answer": "23",
        "defFlag": "0"
    },
    {
        "Number": "2337",
        "Answer": "23",
        "defFlag": "0"
    },
    {
        "Number": "3455",
        "Answer": "23",
        "defFlag": "0"
    },
    {
        "Number": "3468",
        "Answer": "23",
        "defFlag": "0"
    },
    {
        "Number": "1237",
        "Answer": "24",
        "defFlag": "0"
    },
    {
        "Number": "2238",
        "Answer": "24",
        "defFlag": "0"
    },
    {
        "Number": "2488",
        "Answer": "24",
        "defFlag": "0"
    },
    {
        "Number": "2677",
        "Answer": "24",
        "defFlag": "0"
    },
    {
        "Number": "3457",
        "Answer": "24",
        "defFlag": "0"
    },
    {
        "Number": "3589",
        "Answer": "24",
        "defFlag": "0"
    },
    {
        "Number": "4468",
        "Answer": "24",
        "defFlag": "0"
    },
    {
        "Number": "1135",
        "Answer": "25",
        "defFlag": "0"
    },
    {
        "Number": "2359",
        "Answer": "25",
        "defFlag": "0"
    },
    {
        "Number": "0255",
        "Answer": "26",
        "defFlag": "0"
    },
    {
        "Number": "1366",
        "Answer": "27",
        "defFlag": "0"
    },
    {
        "Number": "2568",
        "Answer": "27",
        "defFlag": "0"
    },
    {
        "Number": "3359",
        "Answer": "27",
        "defFlag": "0"
    },
    {
        "Number": "3566",
        "Answer": "27",
        "defFlag": "0"
    },
    {
        "Number": "3567",
        "Answer": "27",
        "defFlag": "0"
    },
    {
        "Number": "4456",
        "Answer": "27",
        "defFlag": "0"
    },
    {
        "Number": "0559",
        "Answer": "28",
        "defFlag": "0"
    },
    {
        "Number": "1225",
        "Answer": "28",
        "defFlag": "0"
    },
    {
        "Number": "2259",
        "Answer": "28",
        "defFlag": "0"
    },
    {
        "Number": "2458",
        "Answer": "28",
        "defFlag": "0"
    },
    {
        "Number": "4678",
        "Answer": "28",
        "defFlag": "0"
    },
    {
        "Number": "0234",
        "Answer": "29",
        "defFlag": "0"
    },
    {
        "Number": "0368",
        "Answer": "29",
        "defFlag": "0"
    },
    {
        "Number": "0446",
        "Answer": "29",
        "defFlag": "0"
    },
    {
        "Number": "0557",
        "Answer": "29",
        "defFlag": "0"
    },
    {
        "Number": "1126",
        "Answer": "29",
        "defFlag": "0"
    },
    {
        "Number": "2239",
        "Answer": "29",
        "defFlag": "0"
    },
    {
        "Number": "2268",
        "Answer": "29",
        "defFlag": "0"
    },
    {
        "Number": "2357",
        "Answer": "29",
        "defFlag": "0"
    },
    {
        "Number": "3446",
        "Answer": "29",
        "defFlag": "0"
    },
    {
        "Number": "1222",
        "Answer": "3",
        "defFlag": "0"
    },
    {
        "Number": "1269",
        "Answer": "3",
        "defFlag": "0"
    },
    {
        "Number": "1347",
        "Answer": "3",
        "defFlag": "0"
    },
    {
        "Number": "2266",
        "Answer": "3",
        "defFlag": "0"
    },
    {
        "Number": "3477",
        "Answer": "3",
        "defFlag": "0"
    },
    {
        "Number": "3555",
        "Answer": "3",
        "defFlag": "0"
    },
    {
        "Number": "6688",
        "Answer": "3",
        "defFlag": "0"
    },
    {
        "Number": "6689",
        "Answer": "3",
        "defFlag": "0"
    },
    {
        "Number": "6799",
        "Answer": "3",
        "defFlag": "0"
    },
    {
        "Number": "1334",
        "Answer": "30",
        "defFlag": "0"
    },
    {
        "Number": "1477",
        "Answer": "30",
        "defFlag": "0"
    },
    {
        "Number": "1688",
        "Answer": "30",
        "defFlag": "0"
    },
    {
        "Number": "2336",
        "Answer": "30",
        "defFlag": "0"
    },
    {
        "Number": "0289",
        "Answer": "31",
        "defFlag": "0"
    },
    {
        "Number": "0118",
        "Answer": "32",
        "defFlag": "0"
    },
    {
        "Number": "0244",
        "Answer": "32",
        "defFlag": "0"
    },
    {
        "Number": "0258",
        "Answer": "32",
        "defFlag": "0"
    },
    {
        "Number": "0334",
        "Answer": "32",
        "defFlag": "0"
    },
    {
        "Number": "1355",
        "Answer": "32",
        "defFlag": "0"
    },
    {
        "Number": "2258",
        "Answer": "32",
        "defFlag": "0"
    },
    {
        "Number": "2468",
        "Answer": "32",
        "defFlag": "0"
    },
    {
        "Number": "4455",
        "Answer": "32",
        "defFlag": "0"
    },
    {
        "Number": "5566",
        "Answer": "32",
        "defFlag": "0"
    },
    {
        "Number": "5577",
        "Answer": "32",
        "defFlag": "0"
    },
    {
        "Number": "5588",
        "Answer": "32",
        "defFlag": "0"
    },
    {
        "Number": "5599",
        "Answer": "32",
        "defFlag": "0"
    },
    {
        "Number": "1244",
        "Answer": "33",
        "defFlag": "0"
    },
    {
        "Number": "0379",
        "Answer": "34",
        "defFlag": "0"
    },
    {
        "Number": "1266",
        "Answer": "34",
        "defFlag": "0"
    },
    {
        "Number": "1268",
        "Answer": "34",
        "defFlag": "0"
    },
    {
        "Number": "2255",
        "Answer": "34",
        "defFlag": "0"
    },
    {
        "Number": "2346",
        "Answer": "34",
        "defFlag": "0"
    },
    {
        "Number": "0238",
        "Answer": "35",
        "defFlag": "0"
    },
    {
        "Number": "0456",
        "Answer": "35",
        "defFlag": "0"
    },
    {
        "Number": "1689",
        "Answer": "35",
        "defFlag": "0"
    },
    {
        "Number": "2888",
        "Answer": "35",
        "defFlag": "0"
    },
    {
        "Number": "3337",
        "Answer": "35",
        "defFlag": "0"
    },
    {
        "Number": "3355",
        "Answer": "35",
        "defFlag": "0"
    },
    {
        "Number": "3777",
        "Answer": "35",
        "defFlag": "0"
    },
    {
        "Number": "4666",
        "Answer": "35",
        "defFlag": "0"
    },
    {
        "Number": "1359",
        "Answer": "36",
        "defFlag": "0"
    },
    {
        "Number": "1467",
        "Answer": "36",
        "defFlag": "0"
    },
    {
        "Number": "1469",
        "Answer": "36",
        "defFlag": "0"
    },
    {
        "Number": "1678",
        "Answer": "36",
        "defFlag": "0"
    },
    {
        "Number": "2466",
        "Answer": "36",
        "defFlag": "0"
    },
    {
        "Number": "3579",
        "Answer": "36",
        "defFlag": "0"
    },
    {
        "Number": "3678",
        "Answer": "36",
        "defFlag": "0"
    },
    {
        "Number": "4446",
        "Answer": "36",
        "defFlag": "0"
    },
    {
        "Number": "4589",
        "Answer": "36",
        "defFlag": "0"
    },
    {
        "Number": "5689",
        "Answer": "36",
        "defFlag": "0"
    },
    {
        "Number": "2459",
        "Answer": "37",
        "defFlag": "0"
    },
    {
        "Number": "2789",
        "Answer": "37",
        "defFlag": "0"
    },
    {
        "Number": "1348",
        "Answer": "38",
        "defFlag": "0"
    },
    {
        "Number": "2347",
        "Answer": "38",
        "defFlag": "0"
    },
    {
        "Number": "2555",
        "Answer": "38",
        "defFlag": "0"
    },
    {
        "Number": "4789",
        "Answer": "38",
        "defFlag": "0"
    },
    {
        "Number": "3568",
        "Answer": "39",
        "defFlag": "0"
    },
    {
        "Number": "1279",
        "Answer": "4",
        "defFlag": "0"
    },
    {
        "Number": "1378",
        "Answer": "4",
        "defFlag": "0"
    },
    {
        "Number": "1445",
        "Answer": "4",
        "defFlag": "0"
    },
    {
        "Number": "1479",
        "Answer": "4",
        "defFlag": "0"
    },
    {
        "Number": "1778",
        "Answer": "4",
        "defFlag": "0"
    },
    {
        "Number": "1888",
        "Answer": "4",
        "defFlag": "0"
    },
    {
        "Number": "2226",
        "Answer": "4",
        "defFlag": "0"
    },
    {
        "Number": "2278",
        "Answer": "4",
        "defFlag": "0"
    },
    {
        "Number": "2334",
        "Answer": "4",
        "defFlag": "0"
    },
    {
        "Number": "2499",
        "Answer": "4",
        "defFlag": "0"
    },
    {
        "Number": "2557",
        "Answer": "4",
        "defFlag": "0"
    },
    {
        "Number": "2777",
        "Answer": "4",
        "defFlag": "0"
    },
    {
        "Number": "3336",
        "Answer": "4",
        "defFlag": "0"
    },
    {
        "Number": "3344",
        "Answer": "4",
        "defFlag": "0"
    },
    {
        "Number": "3349",
        "Answer": "4",
        "defFlag": "0"
    },
    {
        "Number": "4448",
        "Answer": "4",
        "defFlag": "0"
    },
    {
        "Number": "4779",
        "Answer": "4",
        "defFlag": "0"
    },
    {
        "Number": "6669",
        "Answer": "4",
        "defFlag": "0"
    },
    {
        "Number": "0266",
        "Answer": "40",
        "defFlag": "0"
    },
    {
        "Number": "0477",
        "Answer": "40",
        "defFlag": "0"
    },
    {
        "Number": "0688",
        "Answer": "40",
        "defFlag": "0"
    },
    {
        "Number": "0899",
        "Answer": "40",
        "defFlag": "0"
    },
    {
        "Number": "1127",
        "Answer": "40",
        "defFlag": "0"
    },
    {
        "Number": "1136",
        "Answer": "40",
        "defFlag": "0"
    },
    {
        "Number": "1478",
        "Answer": "40",
        "defFlag": "0"
    },
    {
        "Number": "2569",
        "Answer": "40",
        "defFlag": "0"
    },
    {
        "Number": "3489",
        "Answer": "40",
        "defFlag": "0"
    },
    {
        "Number": "2348",
        "Answer": "41",
        "defFlag": "0"
    },
    {
        "Number": "4567",
        "Answer": "41",
        "defFlag": "0"
    },
    {
        "Number": "0355",
        "Answer": "42",
        "defFlag": "0"
    },
    {
        "Number": "1227",
        "Answer": "42",
        "defFlag": "0"
    },
    {
        "Number": "1357",
        "Answer": "42",
        "defFlag": "0"
    },
    {
        "Number": "2225",
        "Answer": "42",
        "defFlag": "0"
    },
    {
        "Number": "1145",
        "Answer": "43",
        "defFlag": "0"
    },
    {
        "Number": "2228",
        "Answer": "43",
        "defFlag": "0"
    },
    {
        "Number": "3458",
        "Answer": "43",
        "defFlag": "0"
    },
    {
        "Number": "3569",
        "Answer": "43",
        "defFlag": "0"
    },
    {
        "Number": "4578",
        "Answer": "43",
        "defFlag": "0"
    },
    {
        "Number": "1256",
        "Answer": "44",
        "defFlag": "0"
    },
    {
        "Number": "1258",
        "Answer": "44",
        "defFlag": "0"
    },
    {
        "Number": "1999",
        "Answer": "44",
        "defFlag": "0"
    },
    {
        "Number": "2378",
        "Answer": "44",
        "defFlag": "0"
    },
    {
        "Number": "3469",
        "Answer": "44",
        "defFlag": "0"
    },
    {
        "Number": "0055",
        "Answer": "45",
        "defFlag": "0"
    },
    {
        "Number": "0268",
        "Answer": "47",
        "defFlag": "0"
    },
    {
        "Number": "2356",
        "Answer": "47",
        "defFlag": "0"
    },
    {
        "Number": "3689",
        "Answer": "47",
        "defFlag": "0"
    },
    {
        "Number": "2479",
        "Answer": "48",
        "defFlag": "0"
    },
    {
        "Number": "5678",
        "Answer": "48",
        "defFlag": "0"
    },
    {
        "Number": "1155",
        "Answer": "49",
        "defFlag": "0"
    },
    {
        "Number": "1579",
        "Answer": "49",
        "defFlag": "0"
    },
    {
        "Number": "1117",
        "Answer": "5",
        "defFlag": "0"
    },
    {
        "Number": "1123",
        "Answer": "5",
        "defFlag": "0"
    },
    {
        "Number": "1556",
        "Answer": "5",
        "defFlag": "0"
    },
    {
        "Number": "2339",
        "Answer": "5",
        "defFlag": "0"
    },
    {
        "Number": "2669",
        "Answer": "5",
        "defFlag": "0"
    },
    {
        "Number": "2999",
        "Answer": "5",
        "defFlag": "0"
    },
    {
        "Number": "3558",
        "Answer": "5",
        "defFlag": "0"
    },
    {
        "Number": "3888",
        "Answer": "5",
        "defFlag": "0"
    },
    {
        "Number": "4447",
        "Answer": "5",
        "defFlag": "0"
    },
    {
        "Number": "4569",
        "Answer": "5",
        "defFlag": "0"
    },
    {
        "Number": "4777",
        "Answer": "5",
        "defFlag": "0"
    },
    {
        "Number": "4788",
        "Answer": "5",
        "defFlag": "0"
    },
    {
        "Number": "4889",
        "Answer": "5",
        "defFlag": "0"
    },
    {
        "Number": "5558",
        "Answer": "5",
        "defFlag": "0"
    },
    {
        "Number": "5669",
        "Answer": "5",
        "defFlag": "0"
    },
    {
        "Number": "5699",
        "Answer": "5",
        "defFlag": "0"
    },
    {
        "Number": "1226",
        "Answer": "50",
        "defFlag": "0"
    },
    {
        "Number": "1899",
        "Answer": "50",
        "defFlag": "0"
    },
    {
        "Number": "2369",
        "Answer": "50",
        "defFlag": "0"
    },
    {
        "Number": "2679",
        "Answer": "50",
        "defFlag": "0"
    },
    {
        "Number": "1238",
        "Answer": "51",
        "defFlag": "0"
    },
    {
        "Number": "1267",
        "Answer": "51",
        "defFlag": "0"
    },
    {
        "Number": "1568",
        "Answer": "51",
        "defFlag": "0"
    },
    {
        "Number": "2457",
        "Answer": "51",
        "defFlag": "0"
    },
    {
        "Number": "2589",
        "Answer": "51",
        "defFlag": "0"
    },
    {
        "Number": "1236",
        "Answer": "52",
        "defFlag": "0"
    },
    {
        "Number": "2349",
        "Answer": "52",
        "defFlag": "0"
    },
    {
        "Number": "2566",
        "Answer": "52",
        "defFlag": "0"
    },
    {
        "Number": "2599",
        "Answer": "52",
        "defFlag": "0"
    },
    {
        "Number": "3447",
        "Answer": "52",
        "defFlag": "0"
    },
    {
        "Number": "3667",
        "Answer": "52",
        "defFlag": "0"
    },
    {
        "Number": "3799",
        "Answer": "52",
        "defFlag": "0"
    },
    {
        "Number": "4699",
        "Answer": "52",
        "defFlag": "0"
    },
    {
        "Number": "1247",
        "Answer": "53",
        "defFlag": "0"
    },
    {
        "Number": "2558",
        "Answer": "53",
        "defFlag": "0"
    },
    {
        "Number": "2588",
        "Answer": "53",
        "defFlag": "0"
    },
    {
        "Number": "2899",
        "Answer": "53",
        "defFlag": "0"
    },
    {
        "Number": "3557",
        "Answer": "53",
        "defFlag": "0"
    },
    {
        "Number": "4556",
        "Answer": "53",
        "defFlag": "0"
    },
    {
        "Number": "0127",
        "Answer": "54",
        "defFlag": "0"
    },
    {
        "Number": "0136",
        "Answer": "54",
        "defFlag": "0"
    },
    {
        "Number": "0145",
        "Answer": "54",
        "defFlag": "0"
    },
    {
        "Number": "0356",
        "Answer": "54",
        "defFlag": "0"
    },
    {
        "Number": "0458",
        "Answer": "54",
        "defFlag": "0"
    },
    {
        "Number": "1156",
        "Answer": "54",
        "defFlag": "0"
    },
    {
        "Number": "1234",
        "Answer": "54",
        "defFlag": "0"
    },
    {
        "Number": "2237",
        "Answer": "54",
        "defFlag": "0"
    },
    {
        "Number": "3788",
        "Answer": "54",
        "defFlag": "0"
    },
    {
        "Number": "4677",
        "Answer": "54",
        "defFlag": "0"
    },
    {
        "Number": "1147",
        "Answer": "55",
        "defFlag": "0"
    },
    {
        "Number": "1249",
        "Answer": "55",
        "defFlag": "0"
    },
    {
        "Number": "2567",
        "Answer": "55",
        "defFlag": "0"
    },
    {
        "Number": "2778",
        "Answer": "55",
        "defFlag": "0"
    },
    {
        "Number": "3346",
        "Answer": "55",
        "defFlag": "0"
    },
    {
        "Number": "0025",
        "Answer": "56",
        "defFlag": "0"
    },
    {
        "Number": "1138",
        "Answer": "56",
        "defFlag": "0"
    },
    {
        "Number": "2577",
        "Answer": "56",
        "defFlag": "0"
    },
    {
        "Number": "1235",
        "Answer": "57",
        "defFlag": "0"
    },
    {
        "Number": "0226",
        "Answer": "58",
        "defFlag": "0"
    },
    {
        "Number": "2335",
        "Answer": "58",
        "defFlag": "0"
    },
    {
        "Number": "2445",
        "Answer": "58",
        "defFlag": "0"
    },
    {
        "Number": "1578",
        "Answer": "59",
        "defFlag": "0"
    },
    {
        "Number": "2338",
        "Answer": "59",
        "defFlag": "0"
    },
    {
        "Number": "1259",
        "Answer": "6",
        "defFlag": "0"
    },
    {
        "Number": "1333",
        "Answer": "6",
        "defFlag": "0"
    },
    {
        "Number": "1447",
        "Answer": "6",
        "defFlag": "0"
    },
    {
        "Number": "1455",
        "Answer": "6",
        "defFlag": "0"
    },
    {
        "Number": "2333",
        "Answer": "6",
        "defFlag": "0"
    },
    {
        "Number": "2388",
        "Answer": "6",
        "defFlag": "0"
    },
    {
        "Number": "2399",
        "Answer": "6",
        "defFlag": "0"
    },
    {
        "Number": "3334",
        "Answer": "6",
        "defFlag": "0"
    },
    {
        "Number": "3449",
        "Answer": "6",
        "defFlag": "0"
    },
    {
        "Number": "3488",
        "Answer": "6",
        "defFlag": "0"
    },
    {
        "Number": "3499",
        "Answer": "6",
        "defFlag": "0"
    },
    {
        "Number": "3559",
        "Answer": "6",
        "defFlag": "0"
    },
    {
        "Number": "4478",
        "Answer": "6",
        "defFlag": "0"
    },
    {
        "Number": "4577",
        "Answer": "6",
        "defFlag": "0"
    },
    {
        "Number": "4669",
        "Answer": "6",
        "defFlag": "1"
    },
    {
        "Number": "5568",
        "Answer": "6",
        "defFlag": "0"
    },
    {
        "Number": "5777",
        "Answer": "6",
        "defFlag": "0"
    },
    {
        "Number": "5888",
        "Answer": "6",
        "defFlag": "0"
    },
    {
        "Number": "5999",
        "Answer": "6",
        "defFlag": "0"
    },
    {
        "Number": "6699",
        "Answer": "6",
        "defFlag": "0"
    },
    {
        "Number": "1229",
        "Answer": "61",
        "defFlag": "0"
    },
    {
        "Number": "1257",
        "Answer": "61",
        "defFlag": "0"
    },
    {
        "Number": "1339",
        "Answer": "61",
        "defFlag": "0"
    },
    {
        "Number": "1449",
        "Answer": "61",
        "defFlag": "0"
    },
    {
        "Number": "1559",
        "Answer": "61",
        "defFlag": "0"
    },
    {
        "Number": "1779",
        "Answer": "61",
        "defFlag": "0"
    },
    {
        "Number": "1889",
        "Answer": "61",
        "defFlag": "0"
    },
    {
        "Number": "4688",
        "Answer": "61",
        "defFlag": "0"
    },
    {
        "Number": "1669",
        "Answer": "62",
        "defFlag": "0"
    },
    {
        "Number": "1119",
        "Answer": "63",
        "defFlag": "0"
    },
    {
        "Number": "1358",
        "Answer": "63",
        "defFlag": "0"
    },
    {
        "Number": "1367",
        "Answer": "63",
        "defFlag": "0"
    },
    {
        "Number": "0155",
        "Answer": "64",
        "defFlag": "0"
    },
    {
        "Number": "2345",
        "Answer": "64",
        "defFlag": "0"
    },
    {
        "Number": "1129",
        "Answer": "65",
        "defFlag": "0"
    },
    {
        "Number": "1368",
        "Answer": "65",
        "defFlag": "0"
    },
    {
        "Number": "1468",
        "Answer": "65",
        "defFlag": "0"
    },
    {
        "Number": "2668",
        "Answer": "66",
        "defFlag": "0"
    },
    {
        "Number": "0235",
        "Answer": "68",
        "defFlag": "0"
    },
    {
        "Number": "1789",
        "Answer": "69",
        "defFlag": "0"
    },
    {
        "Number": "2448",
        "Answer": "69",
        "defFlag": "0"
    },
    {
        "Number": "1134",
        "Answer": "7",
        "defFlag": "0"
    },
    {
        "Number": "1144",
        "Answer": "7",
        "defFlag": "0"
    },
    {
        "Number": "1299",
        "Answer": "7",
        "defFlag": "0"
    },
    {
        "Number": "1346",
        "Answer": "7",
        "defFlag": "0"
    },
    {
        "Number": "1389",
        "Answer": "7",
        "defFlag": "0"
    },
    {
        "Number": "1589",
        "Answer": "7",
        "defFlag": "0"
    },
    {
        "Number": "2227",
        "Answer": "7",
        "defFlag": "0"
    },
    {
        "Number": "2358",
        "Answer": "7",
        "defFlag": "0"
    },
    {
        "Number": "2367",
        "Answer": "7",
        "defFlag": "0"
    },
    {
        "Number": "3335",
        "Answer": "7",
        "defFlag": "0"
    },
    {
        "Number": "3338",
        "Answer": "7",
        "defFlag": "0"
    },
    {
        "Number": "3367",
        "Answer": "7",
        "defFlag": "0"
    },
    {
        "Number": "3399",
        "Answer": "7",
        "defFlag": "0"
    },
    {
        "Number": "5579",
        "Answer": "7",
        "defFlag": "0"
    },
    {
        "Number": "5677",
        "Answer": "7",
        "defFlag": "0"
    },
    {
        "Number": "0138",
        "Answer": "71",
        "defFlag": "0"
    },
    {
        "Number": "0147",
        "Answer": "71",
        "defFlag": "0"
    },
    {
        "Number": "0156",
        "Answer": "71",
        "defFlag": "0"
    },
    {
        "Number": "0239",
        "Answer": "71",
        "defFlag": "0"
    },
    {
        "Number": "0349",
        "Answer": "71",
        "defFlag": "0"
    },
    {
        "Number": "0358",
        "Answer": "71",
        "defFlag": "0"
    },
    {
        "Number": "0459",
        "Answer": "71",
        "defFlag": "0"
    },
    {
        "Number": "0569",
        "Answer": "71",
        "defFlag": "0"
    },
    {
        "Number": "0578",
        "Answer": "71",
        "defFlag": "0"
    },
    {
        "Number": "0679",
        "Answer": "71",
        "defFlag": "0"
    },
    {
        "Number": "0789",
        "Answer": "71",
        "defFlag": "0"
    },
    {
        "Number": "1239",
        "Answer": "72",
        "defFlag": "0"
    },
    {
        "Number": "1349",
        "Answer": "73",
        "defFlag": "0"
    },
    {
        "Number": "1569",
        "Answer": "73",
        "defFlag": "0"
    },
    {
        "Number": "1679",
        "Answer": "73",
        "defFlag": "0"
    },
    {
        "Number": "3456",
        "Answer": "73",
        "defFlag": "0"
    },
    {
        "Number": "1248",
        "Answer": "74",
        "defFlag": "0"
    },
    {
        "Number": "2246",
        "Answer": "74",
        "defFlag": "0"
    },
    {
        "Number": "0019",
        "Answer": "76",
        "defFlag": "0"
    },
    {
        "Number": "0028",
        "Answer": "76",
        "defFlag": "0"
    },
    {
        "Number": "0037",
        "Answer": "76",
        "defFlag": "0"
    },
    {
        "Number": "0046",
        "Answer": "76",
        "defFlag": "0"
    },
    {
        "Number": "1459",
        "Answer": "78",
        "defFlag": "0"
    },
    {
        "Number": "1338",
        "Answer": "8",
        "defFlag": "0"
    },
    {
        "Number": "1466",
        "Answer": "8",
        "defFlag": "0"
    },
    {
        "Number": "1668",
        "Answer": "8",
        "defFlag": "0"
    },
    {
        "Number": "2223",
        "Answer": "8",
        "defFlag": "0"
    },
    {
        "Number": "2245",
        "Answer": "8",
        "defFlag": "0"
    },
    {
        "Number": "2267",
        "Answer": "8",
        "defFlag": "0"
    },
    {
        "Number": "2377",
        "Answer": "8",
        "defFlag": "0"
    },
    {
        "Number": "3368",
        "Answer": "8",
        "defFlag": "0"
    },
    {
        "Number": "3467",
        "Answer": "8",
        "defFlag": "0"
    },
    {
        "Number": "3679",
        "Answer": "8",
        "defFlag": "0"
    },
    {
        "Number": "3899",
        "Answer": "8",
        "defFlag": "0"
    },
    {
        "Number": "5688",
        "Answer": "8",
        "defFlag": "0"
    },
    {
        "Number": "1128",
        "Answer": "81",
        "defFlag": "0"
    },
    {
        "Number": "1137",
        "Answer": "81",
        "defFlag": "0"
    },
    {
        "Number": "1146",
        "Answer": "81",
        "defFlag": "0"
    },
    {
        "Number": "1125",
        "Answer": "84",
        "defFlag": "0"
    },
    {
        "Number": "0245",
        "Answer": "85",
        "defFlag": "0"
    },
    {
        "Number": "0257",
        "Answer": "85",
        "defFlag": "0"
    },
    {
        "Number": "1356",
        "Answer": "86",
        "defFlag": "0"
    },
    {
        "Number": "0129",
        "Answer": "89",
        "defFlag": "0"
    },
    {
        "Number": "0367",
        "Answer": "89",
        "defFlag": "0"
    },
    {
        "Number": "0468",
        "Answer": "89",
        "defFlag": "0"
    },
    {
        "Number": "1489",
        "Answer": "9",
        "defFlag": "0"
    },
    {
        "Number": "1567",
        "Answer": "9",
        "defFlag": "0"
    },
    {
        "Number": "2229",
        "Answer": "9",
        "defFlag": "0"
    },
    {
        "Number": "2355",
        "Answer": "9",
        "defFlag": "0"
    },
    {
        "Number": "2688",
        "Answer": "9",
        "defFlag": "0"
    },
    {
        "Number": "3378",
        "Answer": "9",
        "defFlag": "0"
    },
    {
        "Number": "3389",
        "Answer": "9",
        "defFlag": "0"
    },
    {
        "Number": "3666",
        "Answer": "9",
        "defFlag": "0"
    },
    {
        "Number": "4488",
        "Answer": "9",
        "defFlag": "0"
    },
    {
        "Number": "4588",
        "Answer": "9",
        "defFlag": "0"
    },
    {
        "Number": "4668",
        "Answer": "9",
        "defFlag": "0"
    },
    {
        "Number": "5569",
        "Answer": "9",
        "defFlag": "0"
    },
    {
        "Number": "6789",
        "Answer": "9",
        "defFlag": "0"
    }
]
}
