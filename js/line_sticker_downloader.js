$(document).ready(function () {

    let $input = $("#sticker-id");

    /*----------EVENT-----------*/

    $('#ok').on('click', function () {
        getURLs($input.val());
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

    }

    /**取得封面圖片網址*/
    function getURLs(STCKID) {

        if (!STCKID) {
            return;
        }
        let result;
        let result_S;
        result = "dl.stickershop.line.naver.jp/products/0/0/1/" + STCKID + "/iphone/stickers@2x.zip";
        result_S = "dl.stickershop.line.naver.jp/products/0/0/1/" + STCKID + "/iphone/stickerpack@2x.zip";

        if ($("#sticker-type").val() == "nor") {
            $('#output').val(result);
            $('#output-link').attr("href", "http://" + result);
        } else if ($("#sticker-type").val() == "spe") {
            $('#output').val(result_S);
            $('#output-link').attr("href", "http://" + result_S);
        }


    }


});