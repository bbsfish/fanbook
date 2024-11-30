var fs = require('fs');

const jsonObject = JSON.parse(fs.readFileSync('cercles.json', 'utf8'));


fs.readdir('.', function(err, files){
    if (err) throw err;
    var fileList = files.filter(function(file){
        return fs.statSync(file).isFile() && /.*\.html$/.test(file); //絞り込み
    })
    // console.log(fileList);

    const HTMLParser = require('node-html-parser');
    let result_txt = "";
    fileList.forEach(file => {
        // console.log(file);
        let filename_head = "";
        let cid = "";
        jsonObject.forEach(cercle => {
            if (cercle["file_name"]+".html" == file) {
                filename_head = "IMG_"+cercle["id"];
                cid = cercle["id"];
            }
        });
        const fs = require('fs');
        let text = fs.readFileSync(file, 'utf-8');

        const root = HTMLParser.parse(text);
        let h5 = root.getElementsByTagName("h5");
        let img = root.getElementsByTagName("img");

        for (let i = 0; i < h5.length; i++) {
            let fname = "./imgs/"+filename_head+zeropd(i+1,2)+".jpg";
            let srctxt = "";
            if (img[i].getAttribute("src").length < 50) {
                fs.copyFile(img[i].getAttribute("src"), fname, (err) => {
                    if (err) throw err;
                });
                srctxt= fname;
            } else {
                srctxt = img[i].getAttribute("src");
            }
            result_txt += "C"+cid+","+h5[i].innerText+","+img[i].getAttribute("src")+","+srctxt+"\n";
            // console.log("C"+cid+","+h5[i].innerText+","+img[i].getAttribute("src")+","+srctxt+);
            // console.log(fname)
        }
        // console.log("");
    });
    console.log(result_txt);
});

function zeropd(NUM, LEN){
	return ( Array(LEN).join('0') + NUM ).slice( -LEN );
}