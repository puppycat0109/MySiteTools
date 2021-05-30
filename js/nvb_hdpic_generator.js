$(document).ready(function () {
    
    let $input = $("#addresses");

    /**重置*/
    function reset() {

//        $('input[type="text"], textarea').val("");
//        $('.result-area').css("display", "none");
//        $('.output-link').prop('href', "");
//        $('#files-type').val("webp");
//        $('#files-size').val("maxres");
    }

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
    
    
    /*---------------------*/
    /**取得封面圖片網址*/
    function getImgURLs(URL) {

        if (!URL) {
            return;
        }

        let url_ary;
        let result = "";
        let img_list = "";
        url_ary = $input.val().split('\n');
        console.log("url_ary: ", url_ary);
        
        for(var i = 0 ; i < url_ary.length ; i++){
            
            img_list += "<img src='" + url_ary[i].split('?type=')[0] + "' class='m-1' style='width: 200px;' /> ";
            
            result += url_ary[i].split('?type=')[0] + "\r\n";
            $("#result_count").text("總計: "+(i+1)+" 張");
        }
        
        $('#output').val(result);
        $('#output_img').html(img_list);
        
    }

    $('#ok').on('click', function () {
        getImgURLs($input.val());
    });
});
