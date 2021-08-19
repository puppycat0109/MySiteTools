$(document).ready(function () {

    let $input = $("#sticker-id");

    /*----------EVENT-----------*/

    $('#ok').on('click', function () {
        getURLs($input.val());
    });
    
    $("#sticker-id").on("change",function(){
        getURLs($input.val());
    });
    $("#sticker-type").on("change",function(){
        if($("#sticker-id").val() != ""){
            getURLs($input.val());
        }
    });

    /**RESET BTN*/
    $('#reset').on('click', function () {
        reset();
    });

    /**欄位自動全選*/
    $("input, textarea").blur(function () {
        if ($(this).attr("data-selected-all")) {
            $(this).removeAttr("data-selected-all");
        }
    });

    $("input, textarea").click(function () {
        if (!$(this).attr("data-selected-all")) {
            try {
                $(this).selectionStart = 0;
                $(this).selectionEnd = $(this).value.length + 1;
                //add atribute allowing normal selecting post focus
                $(this).attr("data-selected-all", true);
            } catch (err) {
                $(this).select();
                //add atribute allowing normal selecting post focus
                $(this).attr("data-selected-all", true);
            }
        }
    });

    /*-----------FUNCTION----------*/

    /**重置*/
    function reset() {
        $("#sticker-type").val("nor");
        $("#sticker-id").val("");
        $("#output").val("");
        $("#output2").val("");
        $("#message").text("　");
        $('#message').removeClass("showmsg");
    }

    /**取得網址*/
    function getURLs(STCKID) {

        if (!STCKID) {
            return;
        }
        let result;
        let result_S;
        let result2;
        let result2_S;
        result = "dl.stickershop.line.naver.jp/products/0/0/1/" + STCKID + "/iphone/stickers@2x.zip";
        result_S = "dl.stickershop.line.naver.jp/products/0/0/1/" + STCKID + "/iphone/stickerpack@2x.zip";

        result2 = "https://stickershop.line-scdn.net/stickershop/v1/product/" + STCKID + "/iphone/stickers@2x.zip";
        result2_S = "https://stickershop.line-scdn.net/stickershop/v1/product/" + STCKID + "/iphone/stickerpack@2x.zip";

        if ($("#sticker-type").val() == "nor") {
            $('#output').val(result);
            $('#output-link').attr("href", "http://" + result);
            $('#output2').val(result2);
            $('#output-link2').attr("href", result2);
        } else if ($("#sticker-type").val() == "spe") {
            $('#output').val(result_S);
            $('#output-link').attr("href", "http://" + result_S);
            $('#output2').val(result2_S);
            $('#output-link2').attr("href", result2_S);
        }
        $('#message').text("已產生 "+$("#sticker-id").val()+" " +$("#sticker-type option:selected").text());
        $('#message').attr("class", "showmsg");
    }


});
