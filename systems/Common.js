function Printer(k) { // 共通部分出力
    console.log(k);
    if (k == null) {
        if (CCLoad()) {
            console.log('Request Of: CercleList extract');
            SideCerclelist();
            localStorage.setItem('cc', 0)
        }
        GetCercleData();
        let HeadHtml = `
            <header>
            <h1><a href="../index.html">タイトル</a></h1>
            <nav id="header-line">
                <ul>
                <li><a href="../LoveLive.html" onclick="SideIndexPrinter(0);">Love LIve!</a></li>
                <li><a href="../BanGDream.html" onclick="SideIndexPrinter(1);">BanG_Dream!</a></li>
                <li id="header-line-right"><a href="add.html">新規追加</a></li>
                </ul>
            </nav>
            </header>
        `
        insertadj(HeadHtml);
        let div3 = Document.getElementById('sercle-data');
        div3.style.display = 'none';
    } else {
        let HeadHtml = `
            <header>
            <h1><a href="index.html">タイトル</a></h1>
            <nav id="header-line">
                <ul>
                <li><a href="LoveLive.html">Love LIve!</a></li>
                <li><a href="BanGDream.html">BanG_Dream!</a></li>
                <li id="header-line-right"><a href="add.html">新規追加</a></li>
                </ul>
            </nav>
            </header>
        `
        insertadj(HeadHtml);
    }

    function insertadj(HeadHtml) {
        let div = document.getElementsByTagName('body');
        div[0].insertAdjacentHTML('afterbegin', HeadHtml);
    }
}

function SideIndexPrinter(k) { // 右側インデックス出力
    if (k == null || k == undefined) {
        // console.log('k is null');
        let wcr = WorkCheck();
        let CercleList = GetCercleList(wcr);
        let div1 = document.getElementById('position-CercleList-1');
        let div2 = document.getElementById('position-CercleList-2');
        for (let i = 0; i < CercleList.length; i++) {
            let html = `<li><a href="` + CercleList[i].ccf + `.html">` + CercleList[i].cerclename + `</a></li>`
            div1.insertAdjacentHTML('beforeend', html);
            div2.insertAdjacentHTML('beforeend', html);
            }
    } else if (k == 0 || k == 1) {
        // console.log('k is 0 or 1');
        if (k == 0) {
            let CercleList = GetCercleList('LoveLive');
            let div1 = document.getElementById('position-CercleList-1');
            let div2 = document.getElementById('position-CercleList-2');
            div1.innerHTML = ''
            div2.innerHTML = ''
            for (let i = 0; i < CercleList.length; i++) {
                let html = `<li><a href="contents/` + CercleList[i].ccf + `.html">` + CercleList[i].cerclename + `</a></li>`
                div1.insertAdjacentHTML('beforeend', html);
                div2.insertAdjacentHTML('beforeend', html);
                }
        } else {
            let CercleList = GetCercleList('BanGDream');
            let div1 = document.getElementById('position-CercleList-1');
            let div2 = document.getElementById('position-CercleList-2');
            div1.innerHTML = ''
            div2.innerHTML = ''
            for (let i = 0; i < CercleList.length; i++) {
                let html = `<li><a href="contents_b/` + CercleList[i].ccf + `.html">` + CercleList[i].cerclename + `</a></li>`;
                div1.insertAdjacentHTML('beforeend', html);
                div2.insertAdjacentHTML('beforeend', html);
                }
        }
    } else {}
}

function GetCercleData() { // サークルページのヘッダー取得
    var url = window.location.href;
    // 拡張子付き // var filename_ex = url.match(".+/(.+?)([\?#;].*)?$")[1];
    // 拡張子無し
    var filename = url.match(".+/(.+?)\.[a-z]+([\?#;].*)?$")[1];
    let CercleList = GetCercleList(WorkCheck());
    CercleList.forEach(function (CercleList) {
        if (CercleList.ccf == filename) {
            let cdata_tw, cdata_ml, cdata_hp = 0;
            let makef = '<h4 onclick="SercleDataDisplay();">' + CercleList.cerclename + ' / ' + CercleList.authname + '</h4>';
            if (CercleList.detail[0] != 0) {
                cdata_tw = `<table><tr><th>Twitter</th><td><a href="` + CercleList.detail[0] + `">` + CercleList.detail[0] + `</a></td></tr>`
            } else {
                cdata_tw = `<table><tr><th>Twitter</th><td><a href="#"></a></td></tr>`
            }
            if (CercleList.detail[1] != 0) {
                cdata_ml = `<tr><th>MelonBooks</th><td><a href="` + CercleList.detail[1] + `">` + CercleList.detail[1] + `</a></td></tr>`
            } else {
                cdata_ml = `<table><tr><th>MelonBooks</th><td><a href="#"></a></td></tr>`
            }

            if (CercleList.detail[2] != 0) {
                cdata_hp = `<tr><th>HomePage</th><td><a href="` + CercleList.detail[2] + `">` + CercleList.detail[2] + `</a></td></tr></table>`
            } else {
                cdata_hp = `<table><tr><th>HomePage</th><td><a href="#"></a></td></tr></table>`
            }
            let cdata = cdata_tw + cdata_ml + cdata_hp;            
            let div1 = document.getElementById('main-serclename');
            let div2 = document.getElementById('sercle-data');
            div1.insertAdjacentHTML('afterbegin', makef);
            div2.insertAdjacentHTML('beforeend', cdata);
        }
    });
}

function GetCercleList(s) {
    if (s == 'LoveLive' || s === 0) {
        console.log('Request Of: CercleList : LoveLive');
        let getCercleList = localStorage.getItem('cerclelist');
        let CercleList = JSON.parse(getCercleList);
        return CercleList
    } else if (s == 'BanGDream' || s === 1) {
        console.log('Request Of: CercleList : BanGDream');
        let getCercleList = localStorage.getItem('cerclelist_b');
        let CercleList = JSON.parse(getCercleList);
        return CercleList
    }
}

function WorkCheck() {
    if (location.href.indexOf('contents_b') != -1) {
    // BanG Dream!
        return 1
    } else {
    // ラブライブ
        return 0
    }
}

function CCLoad() {
    let chk = localStorage.getItem('cc');
    if (chk == null) {
        return true
    } else {
        return false
    }
}

function WebView(num,dirname) {
    let data = [num,dirname]
    var setjson = JSON.stringify(data);
    localStorage.setItem('webviewdata', setjson);
    location.href = 'webview.html';
}

function WebViewRead() {
    let getjson = localStorage.getItem('webviewdata');
    let getdata = JSON.parse(getjson);// getdata[0]:ファイル番号; getdata[1]:ディレクトリ名;
    let retnum = numarange();//ファイル番号の調整
    let anime = PageAnimeChk();//0:non;　1:ラ;　2:バ
    // let srcf = localStorage.getItem('selectedsercle');
    CerclelistPrint(anime);
    let targetcsv = ''
    if (anime == 1) { targetcsv = 'http://htastenote.starfree.jp/fanbook/image/' + getdata[1] + '/webview' + retnum + '.csv'　}
    if (anime == 2) { targetcsv = 'http://htastenote.starfree.jp/fanbook/image_b/' + getdata[1] + '/webview' + retnum + '.csv' }
    function numarange() {
        let ret = ( '000' + getdata[0] ).slice( -3 );
        return ret
    }
    //csv読み取り
        // CSVファイルを読み込む関数getCSV()の定義
        function getCSV(targetcsv){
            var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
            // req.open("get", "sample.csv", true); // アクセスするファイルを指定
            req.open("get",targetcsv , true); // アクセスするファイルを指定
            req.send(null); // HTTPリクエストの発行
            
            // レスポンスが返ってきたらconvertCSVtoArray()を呼ぶ	
            req.onload = function(){
            convertCSVtoArray(req.responseText); // 渡されるのは読み込んだCSVデータ
            }
        }
        
        // 読み込んだCSVデータを二次元配列に変換する関数convertCSVtoArray()の定義
        function convertCSVtoArray(str){ // 読み込んだCSVデータが文字列として渡される
            var tmp = str.split('\n');
            //tmp[0]:タイトル tmp[1]:出典url tmp[2~]:画像url
            // タイトルの出力
                let cdata = `<table><tr><th>出典URL</th><td><a href="` + tmp[1] + `">` + tmp[1] + `</a></td></tr>
                                    <tr><th>サークル情報</th><td><a href="#" onclick="PassDataExecute('` + localStorage.getItem('selectedsercle') + `' target="_blank");">サークルトップへ</a></td></tr></table>`
                $('#sercle-data').prepend(cdata);
                $('#main-serclename').prepend('<h4 onclick="SercleDataDisplay();">[WebView]' + tmp[0] + '</h4>');
            // 画像の出力
            for (let i = 2; i < tmp.length-1; i++) {
                // result[i] = str.split('\n');
                $('#main-contents').append('<li><img src="' + tmp[i] + '" alt="ウェブヴュー画像' + (i-1) + '"></li>');
            }
        }
        getCSV(targetcsv); //最初に実行される
}

/*----------------モバイル用のプルダウン設定---------------------*/
function MobileListDisplay(){
    const p1 = document.getElementById("mobile-list-display");
    if(p1.style.display=="block"){
        // noneで非表示
        p1.style.display ="none";
    }else{
        // blockで表示
        // p1.style.display ="block";
        fadeIn(p1,600)
    }
}

/*----------------詳細項目の表示設定---------------------*/
function NovelDetailDisplay(){
    const p1 = document.getElementById("novel-detail");
    if(p1.style.display=="block"){
        // noneで非表示
        p1.style.display ="none";
    }else{
        // blockで表示
        p1.style.display ="block";
    }
}

/*----------------サークルデータ表示設定---------------------*/
function SercleDataDisplay(){
    const p1 = document.getElementById("sercle-data");
    if(p1.style.display=="block"){
        // noneで非表示
        p1.style.display ="none";
    }else{
        // blockで表示
        p1.style.display ="block";
    }
}

function SideCerclelist() { //サークルリスト取得後、localstrage格納
    getCSV();
    function getCSV() {
        var req = new XMLHttpRequest();
        req.open("get", "http://htastenote.starfree.jp/CercleList.csv", true); // アクセスするファイルを指定
        req.send(null);
        req.onload = function(){
            convertCSVtoArray(req.responseText); // 渡されるのは読み込んだCSVデータ
        }
    }
    function convertCSVtoArray(str){ // 読み込んだCSVデータが文字列として渡される
        let OneContentPick = str.replace(/\r?\n/g, '');
        OneContentPick = OneContentPick.split('</end>');
        let DATAS = [];
        let DATAS_b = [];
        OneContentPick.forEach(function(OneContentPick) {
            let Classify = OneContentPick.split(';');
            let LoadDatas = { cerclename:0, ccf:0, authname:0, detail:[ 0, 0, 0 ] }
            let ct, tcn, tcf, tan, tdt, tdts = 0;
            let tdts_tw, tdts_ml, tdts_hp = 0;
            Classify.forEach(function(Classify) {
                if (Classify.indexOf('<ct=>') != -1) {
                // 作品分類
                    ct = Classify.replace('<ct=>', '');
                } else if (Classify.indexOf('<cerclename=>') != -1) {
                // サークル名
                    tcn = Classify.replace('<cerclename=>', '');
                    LoadDatas.cerclename = tcn;
                } else if (Classify.indexOf('<ccf=>') != -1) {
                // 参照ファイル名
                    tcf = Classify.replace('<ccf=>', '');
                    LoadDatas.ccf = tcf;
                } else if (Classify.indexOf('<authname=>') != -1) {
                // 著者名
                    tan = Classify.replace('<authname=>', '');
                    LoadDatas.authname = tan;
                } else if (Classify.indexOf('<detail=>') != -1) {
                // 詳細データ
                    tdt = Classify.replace('<detail=>', '');
                    tdts = tdt.split('<d>');
                    for (let k = 0; k < tdts.length-1; k++) {
                        if (tdts[k].indexOf('<d-tw=>') != -1) {
                        // ツイッター
                            tdts_tw = tdts[k].replace('<d-tw=>', '');
                            LoadDatas.detail[0] = tdts_tw;
                        } else if (tdts[k].indexOf('<d-ml=>') != -1) {
                        // メロンブックス
                            tdts_ml = tdts[k].replace('<d-ml=>', '');
                            LoadDatas.detail[1] = tdts_ml;
                        } else if (tdts[k].indexOf('<d-hp=>') != -1) {
                        // ホームページ
                            tdts_hp = tdts[k].replace('<d-hp=>', '');
                            LoadDatas.detail[2] = tdts_hp;
                        }
                    }
                }
            });
            if (OneContentPick != '') {
                if (ct == 0) {
                    // 作品分類 : ラブライブ
                    DATAS.push(LoadDatas);
                } else if (ct == 1) {
                    // 作品分類 : BanG Dream!
                    DATAS_b.push(LoadDatas);
                }
            }
        });
        // console.log('ラブライブ');
        // console.log(DATAS);
        // console.log('BanG Dream!');        
        // console.log(DATAS_b);
        localStorage.removeItem('cerclelist');
        localStorage.removeItem('cerclelist_b');
        localStorage.setItem('cerclelist', JSON.stringify(DATAS));
        localStorage.setItem('cerclelist_b', JSON.stringify(DATAS_b));
    }
} 

function fadeIn(node, duration) {
    // display: noneでないときは何もしない
    if (getComputedStyle(node).display !== 'none') return;
    
    // style属性にdisplay: noneが設定されていたとき
    if (node.style.display === 'none') {
      node.style.display = '';
    } else {
      node.style.display = 'block';
    }
    node.style.opacity = 0;
  
    var start = performance.now();
    
    requestAnimationFrame(function tick(timestamp) {
      // イージング計算式（linear）
      var easing = (timestamp - start) / duration;
  
      // opacityが1を超えないように
      node.style.opacity = Math.min(easing, 1);
  
      // opacityが1より小さいとき
      if (easing < 1) {
        requestAnimationFrame(tick);
      } else {
        node.style.opacity = '';
      }
    });
  }