//時計として作る


//0-->7     1->4    2->4    3->3    4->3    5->3    6->6    7->3    8->4    9->4
//各変数を宣言
let dt = new Date();    //現在の日時を取得
let FileCnt = [7,4,4,3,3,3,6,3,4,4];//各数字のファイルの数を格納してるよ
let numInstance = [];
let hourDig1 = document.getElementById('hour1');
let hourDig2 = document.getElementById('hour2');
let minDig1 = document.getElementById('min1');
let minDig2 = document.getElementById('min2');
let secDig1 = document.getElementById('sec1');
let secDig2 = document.getElementById('sec2');





///数字の画像を入れるクラスを宣言
//クラスの使い方は、ここで勉強したよ（https://youtu.be/fYNKzHTUv-8?si=97jz19-gMqGdYU-y)
class Files{
    constructor(trgNum,fileCnt){//このコンストラクターは初期化メソッド(クラスFilesのインスタンスを作った時に最初に絶対実行されるメソッド)
        this.fileCnt = fileCnt;
        this.targetNum = trgNum;
    }
    getPath(){
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




function timeRedraw() {
    
}


setInterval(timeRedraw,1000);