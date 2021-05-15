    /*
    https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api
    https://i.ytimg.com/vi_webp/JBEdgsea9sM/maxresdefault.webp
    https://i.ytimg.com/vi/mZ-crmiQ7is/maxresdefault.jpg


    https://img.youtube.com/vi_webp/mZ-crmiQ7is/maxresdefault.webp
    https://img.youtube.com/vi/mZ-crmiQ7is/maxresdefault.jpg


    --------------------


    Each YouTube video has four generated images. 

    They are predictably formatted as follows:

default thumbnail list:
    https://img.youtube.com/vi/<insert-youtube-video-id-here>/0.jpg
    https://img.youtube.com/vi/<insert-youtube-video-id-here>/1.jpg
    https://img.youtube.com/vi/<insert-youtube-video-id-here>/2.jpg
    https://img.youtube.com/vi/<insert-youtube-video-id-here>/3.jpg
    
    https://img.youtube.com/vi/<insert-youtube-video-id-here>/maxres1.jpg
    https://img.youtube.com/vi/<insert-youtube-video-id-here>/maxres2.jpg
    https://img.youtube.com/vi/<insert-youtube-video-id-here>/maxres3.jpg
    


    The first one in the list is a full size image and others are thumbnail images. The default thumbnail image (i.e., one of 1.jpg, 2.jpg, 3.jpg) is:
    https://img.youtube.com/vi/<insert-youtube-video-id-here>/default.jpg

    For the high quality version of the thumbnail use a URL similar to this:
    https://img.youtube.com/vi/<insert-youtube-video-id-here>/hqdefault.jpg

    There is also a medium quality version of the thumbnail, using a URL similar to the HQ:
    https://img.youtube.com/vi/<insert-youtube-video-id-here>/mqdefault.jpg

    For the standard definition version of the thumbnail, use a URL similar to this:
    https://img.youtube.com/vi/<insert-youtube-video-id-here>/sddefault.jpg

    For the maximum resolution version of the thumbnail use a URL similar to this:
    https://img.youtube.com/vi/<insert-youtube-video-id-here>/maxresdefault.jpg
    */

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
