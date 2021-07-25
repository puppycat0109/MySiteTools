$(document).ready(function () {

    let $input = $("#addresses");
    let count = 0;
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
        let resURL = "";
        count = 0;
        
        url_ary = $input.val().split('\n').filter(function (el) {
          return el != "";
        });
        console.log("url_ary: ", url_ary);

        for (var i = 0; i < url_ary.length; i++) {
            count = i + 1;
            resURL = url_ary[i].split('?type=')[0];

            img_list += "<div class='imgdiv m-1' id='img_" + i + "' >";
            img_list += "   <img src='" + resURL + "' class='image' />";
            img_list += "   <div class='topright'>"
            img_list += "       <div class='deleteimg' id='del_" + i + "'><i class='fas fa-times'></i></div>"
            img_list += "   </div>"
            img_list += "</div>"

            result += resURL + "\r\n";


        }
        $('#output').val(result);
        $("#result_count").text("總計: " + count + " 張");
        $('#output_img').html(img_list);

        loadDeleteFun();
    }

    function loadImgFromResult() {

        let url_ary = $("#output").val().split('\n').filter(function (el) {
          return el != "";
        });
        let img_list = "";
        let resURL = "";
        count = 0;
        
        console.log("url_ary: ", url_ary);

        for (var i = 0; i < url_ary.length; i++) {
            count = i + 1;
            resURL = url_ary[i];
            img_list += "<div class='imgdiv m-1' id='img_" + i + "' >";
            img_list += "   <img src='" + resURL + "' class='image' />";
            img_list += "   <div class='topright'>"
            img_list += "       <div class='deleteimg' id='del_" + i + "'><i class='fas fa-times'></i></div>"
            img_list += "   </div>"
            img_list += "</div>"
        }
        $("#result_count").text("總計: " + count + " 張");
        $('#output_img').html(img_list);
        loadDeleteFun();
    }
    
    function loadDeleteFun(){
        $(".deleteimg").on('click', function () {
            let idnum = $(this).attr("id").split('_')[1];
            $("#img_" + idnum).remove();
            count = count - 1;
            $("#result_count").text("總計: " + count + " 張");
        });
    }

    $('#ok').on('click', function () {
        getImgURLs($input.val());
    });

    $('#reset').on('click', function () {
        getImgURLs($input.val());
    });
    
    $('#reload').on('click', function () {
        loadImgFromResult();
    });




});
